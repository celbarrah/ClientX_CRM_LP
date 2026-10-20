// Lead submission, shared by the Next.js route (Node hosts) and the Cloudflare Pages Function.
// Web-standard APIs and relative imports only; the environment and the IP country are passed in.
import { payloadSchema, type LeadPayload } from "./schema";
import { chatWebhook, ghlConfig, isCountry, marketOf, type Env, type Market } from "./market";

const GHL_DEFAULT = "https://services.leadconnectorhq.com";
const CRM_DEFAULT = "https://crm.clientx.ai";
const SOURCE = "LP Démo ClientX AI";

type Lead = Omit<LeadPayload, "website" | "country">;
type Ctx = { market: Market; country: string | null; ghl: ReturnType<typeof ghlConfig>; api: string };
/** Where the lead landed, and the GHL contact id when the destination returned one. */
type Delivery = { via: "webhook" | "ghl"; contactId: string | null };

/**
 * `ipCountry` comes from the host (Cloudflare `request.cf.country`, or the edge header on Node hosts).
 * The browser's own guess (`country` in the body, which honours ?pays=MA for QA) is only used when the
 * host gives no country, i.e. in local development.
 */
export async function handleLead(req: Request, env: Env, ipCountry: string | null): Promise<Response> {
  const body = await req.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const { website, country: hint, ...lead } = parsed.data;
  // Honeypot filled: pretend success so bots learn nothing.
  if (website) return Response.json({ ok: true, market: "global" });

  // Morocco (by IP) → *_MA credentials, everyone else → global ones.
  const country = ipCountry ?? (isCountry(hint) ? hint.toUpperCase() : null);
  const market = marketOf(country);
  // GHL_API_BASE is only overridden for local testing against a mock.
  const ctx: Ctx = { market, country, ghl: ghlConfig(env, market), api: env.GHL_API_BASE || GHL_DEFAULT };

  const hook = env.LEAD_WEBHOOK_URL?.trim();
  const canGhl = Boolean(ctx.ghl.privateKey && ctx.ghl.subaccountId);
  // n8n test URLs only accept one call after "Execute workflow" is clicked: every other lead is rejected.
  if (hook?.includes("/webhook-test/")) console.error("[lead] LEAD_WEBHOOK_URL is an n8n TEST url — use the /webhook/ production url");

  const jobs: Promise<Delivery>[] = [];
  if (hook) jobs.push(sendWebhook(hook, lead, ctx));
  // By default the webhook workflow talks to GHL with the credentials it receives.
  // Set GHL_SEND_DIRECT=true to also push the contact from here (would duplicate it if the workflow does too).
  const direct = env.GHL_SEND_DIRECT === "true" && canGhl;
  if (direct) jobs.push(sendToGhl(lead, ctx));

  if (!jobs.length && !canGhl) {
    console.error("[lead] no destination configured (LEAD_WEBHOOK_URL / GHL_*) — lead lost:", lead.email);
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const results = await Promise.allSettled(jobs);
  results.forEach((r) => r.status === "rejected" && console.error("[lead]", r.reason));
  // The lead is safe as soon as one destination accepted it.
  const delivered = results.filter((r) => r.status === "fulfilled").map((r) => (r as PromiseFulfilledResult<Delivery>).value);

  // Safety net: the webhook is missing or refused the lead and GHL wasn't already called directly,
  // so create the contact in GHL from here rather than losing it.
  if (!delivered.length && !direct && canGhl) {
    console.error("[lead] webhook failed — falling back to GHL directly for", lead.email);
    try {
      delivered.push(await sendToGhl(lead, ctx));
    } catch (e) {
      console.error("[lead] GHL fallback failed:", e);
    }
  }
  if (!delivered.length) {
    // Logged in full so the lead can still be recovered from the host's logs.
    console.error("[lead] LEAD NOT DELIVERED:", JSON.stringify({ ...lead, market, submitted_at: new Date().toISOString() }));
    return Response.json({ ok: false, error: "upstream" }, { status: 502 });
  }

  // Team notification in the market's Google Chat space. Never blocks or fails the lead.
  const contactId = delivered.find((d) => d.contactId)?.contactId ?? null;
  await notifyChat(env, lead, ctx, contactId, delivered[0].via);

  // `market` tells the form which thank-you page to open (/merci or /merci-maroc).
  return Response.json({ ok: true, delivered: delivered.map((d) => d.via), market });
}

/* ---------- Webhook ---------- */

async function sendWebhook(url: string, lead: Lead, ctx: Ctx): Promise<Delivery> {
  const utm = lead.utm ?? {};
  // UTMs travel both in the query string and in the JSON body.
  const target = new URL(url);
  for (const [k, v] of Object.entries(utm)) if (k.startsWith("utm_") || k.endsWith("clid")) target.searchParams.set(k, v);

  const res = await fetch(target, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      first_name: lead.firstName,
      last_name: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      company_name: lead.company,
      sector: lead.sector,
      team_size: lead.teamSize,
      source: SOURCE,
      page: lead.page,
      ...utm,
      submitted_at: new Date().toISOString(),
      // GHL credentials for the receiving workflow. Body only, never in the URL (URLs get logged).
      private_integration_key: ctx.ghl.privateKey,
      subaccount_id: ctx.ghl.subaccountId,
      workflow_id: ctx.ghl.workflowId,
    }),
    // The workflow now answers once the contact exists (to return its id), so allow it time to run.
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  // n8n "Respond to Webhook" can return the id as a response header (contact_id) or in the JSON body.
  const header = (res.headers.get("contact_id") ?? res.headers.get("x-contact-id") ?? "").trim();
  const contactId = /^[A-Za-z0-9]{8,64}$/.test(header) ? header : findContactId(await res.json().catch(() => null));
  if (!contactId) console.error("[lead] webhook answered without a contact id — set n8n to respond with it (Respond to Webhook node)");
  return { via: "webhook", contactId };
}

/**
 * Reads the GHL contact id from the n8n response, whatever its shape: `{ contact_id }`, `{ contactId }`,
 * `{ id }`, GHL's own `{ contact: { id } }`, or any of these wrapped in an array (n8n "all items").
 */
function findContactId(data: unknown, depth = 0): string | null {
  if (depth > 4 || data == null) return null;
  if (Array.isArray(data)) {
    for (const item of data) {
      const id = findContactId(item, depth + 1);
      if (id) return id;
    }
    return null;
  }
  if (typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  for (const k of ["contact_id", "contactId", "id"]) {
    const v = o[k];
    if (typeof v === "string" && /^[A-Za-z0-9]{8,64}$/.test(v)) return v;
  }
  for (const k of ["contact", "json", "body", "data"]) {
    const id = findContactId(o[k], depth + 1);
    if (id) return id;
  }
  return null;
}

/* ---------- GoHighLevel (Private Integration) ---------- */

async function ghl(api: string, key: string, path: string, body: object) {
  const res = await fetch(`${api}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`GHL ${path} responded ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json().catch(() => ({}));
}

async function sendToGhl(lead: Lead, { market, ghl: cfg, api }: Ctx): Promise<Delivery> {
  const utm = lead.utm ?? {};
  const tags = [
    "LP Démo ClientX",
    market === "MA" ? "Maroc" : "Global",
    lead.sector,
    utm.utm_source && `source:${utm.utm_source}`,
  ].filter(Boolean);

  const { contact } = await ghl(api, cfg.privateKey, "/contacts/upsert", {
    locationId: cfg.subaccountId,
    firstName: lead.firstName,
    lastName: lead.lastName,
    name: `${lead.firstName} ${lead.lastName}`,
    email: lead.email,
    phone: lead.phone.replace(/[^\d+]/g, ""),
    companyName: lead.company,
    source: SOURCE,
    tags,
  });
  if (!contact?.id) throw new Error("GHL upsert returned no contact id");

  const note = [
    `Demande de démo — ${SOURCE}`,
    `Marché : ${market === "MA" ? "Maroc" : "Global"}`,
    `Entreprise : ${lead.company}`,
    `Secteur : ${lead.sector}`,
    `Taille d'équipe : ${lead.teamSize}`,
    `Page : ${lead.page ?? ""}`,
    ...Object.entries(utm).map(([k, v]) => `${k} : ${v}`),
  ].join("\n");

  const extra: Promise<unknown>[] = [ghl(api, cfg.privateKey, `/contacts/${contact.id}/notes`, { body: note })];
  if (cfg.workflowId) extra.push(ghl(api, cfg.privateKey, `/contacts/${contact.id}/workflow/${cfg.workflowId}`, {}));
  const done = await Promise.allSettled(extra);
  done.forEach((r) => r.status === "rejected" && console.error("[lead] GHL follow-up failed:", r.reason));

  return { via: "ghl", contactId: contact.id };
}

/* ---------- Google Chat notification ---------- */

const UTM_LABELS: [string, string][] = [
  ["utm_source", "Source"],
  ["utm_medium", "Support"],
  ["utm_campaign", "Campagne"],
  ["utm_content", "Contenu / annonce"],
  ["utm_term", "Terme"],
  ["utm_id", "ID campagne"],
  ["gclid", "Google Ads (gclid)"],
  ["fbclid", "Meta (fbclid)"],
];

/** Visitor text can't inject Google Chat links (`<url|text>`); other characters are kept (emails, URLs). */
const clean = (v?: string | null) => (v ?? "").replace(/[<>]/g, "").trim() || "—";

async function notifyChat(env: Env, lead: Lead, ctx: Ctx, contactId: string | null, via: Delivery["via"]) {
  const url = chatWebhook(env, ctx.market);
  if (!url) return;
  const utm = lead.utm ?? {};
  const crm = (env.CRM_BASE_URL?.trim() || CRM_DEFAULT).replace(/\/$/, "");
  const link = contactId
    ? `${crm}/v2/location/${ctx.ghl.subaccountId}/contacts/detail/${contactId}`
    : "indisponible (le webhook n'a pas renvoyé l'ID du contact)";
  const date = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: ctx.market === "MA" ? "Africa/Casablanca" : "Europe/Paris",
  }).format(new Date());
  const others = Object.entries(utm)
    .filter(([k]) => !UTM_LABELS.some(([u]) => u === k) && k !== "landing_page" && k !== "referrer")
    .map(([k, v]) => `${k} : ${clean(v)}`);

  const lines = [
    `🚀 *Nouveau lead — ${SOURCE}* (${ctx.market === "MA" ? "Maroc 🇲🇦" : "Global 🌍"})`,
    "",
    `*Nom :* ${clean(lead.firstName)} ${clean(lead.lastName)}`,
    `*Email :* ${clean(lead.email)}`,
    `*Téléphone :* ${clean(lead.phone)}`,
    `*Entreprise :* ${clean(lead.company)}`,
    `*Secteur :* ${clean(lead.sector)}`,
    `*Taille de l'équipe :* ${clean(lead.teamSize)}`,
    `*Pays (IP) :* ${ctx.country ?? "inconnu"}`,
    "",
    ...UTM_LABELS.filter(([k]) => utm[k]).map(([k, label]) => `*${label} :* ${clean(utm[k])}`),
    ...(utm.landing_page ? [`*Page d'arrivée :* ${clean(utm.landing_page)}`] : []),
    ...(utm.referrer ? [`*Site d'origine :* ${clean(utm.referrer)}`] : []),
    ...others,
    `*Date :* ${date}`,
    ...(via === "ghl" ? ["⚠️ Webhook n8n indisponible : contact créé directement dans le CRM."] : []),
    "",
    `*Contact :* ${link}`,
  ];

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ text: lines.join("\n") }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) console.error(`[lead] Google Chat responded ${res.status}: ${(await res.text()).slice(0, 200)}`);
  } catch (e) {
    console.error("[lead] Google Chat notification failed:", e);
  }
}
