// Lead submission, shared by the Next.js route (Node hosts) and the Cloudflare Pages Function.
// Web-standard APIs and relative imports only; the environment and the IP country are passed in.
import { payloadSchema, type LeadPayload } from "./schema";
import { ghlConfig, isCountry, marketOf, type Env, type Market } from "./market";

const GHL_DEFAULT = "https://services.leadconnectorhq.com";
const SOURCE = "LP Démo ClientX AI";

type Lead = Omit<LeadPayload, "website" | "country">;
type Ctx = { market: Market; country: string | null; ghl: ReturnType<typeof ghlConfig>; api: string };

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

  const jobs: Promise<string>[] = [];
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
  const delivered = results.filter((r) => r.status === "fulfilled").map((r) => (r as PromiseFulfilledResult<string>).value);

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

  // `market` tells the form which thank-you page to open (/merci or /merci-maroc).
  return Response.json({ ok: true, delivered, market });
}

/* ---------- Webhook ---------- */

async function sendWebhook(url: string, lead: Lead, ctx: Ctx) {
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
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  return "webhook";
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

async function sendToGhl(lead: Lead, { market, ghl: cfg, api }: Ctx) {
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

  return "ghl";
}
