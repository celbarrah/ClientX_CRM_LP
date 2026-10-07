import { NextResponse } from "next/server";
import { payloadSchema, type LeadPayload } from "@/lib/schema";

// Overridable only for local testing against a mock.
const GHL_API = process.env.GHL_API_BASE ?? "https://services.leadconnectorhq.com";
const SOURCE = "LP Démo ClientX AI";

type Lead = Omit<LeadPayload, "website">;

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const { website, ...lead } = parsed.data;
  // Honeypot filled: pretend success so bots learn nothing.
  if (website) return NextResponse.json({ ok: true });

  const jobs: Promise<string>[] = [];
  if (process.env.LEAD_WEBHOOK_URL) jobs.push(sendWebhook(process.env.LEAD_WEBHOOK_URL, lead));
  // By default the webhook workflow talks to GHL with the credentials it receives.
  // Set GHL_SEND_DIRECT=true to also push the contact from here (would duplicate it if the workflow does too).
  if (process.env.GHL_SEND_DIRECT === "true" && process.env.GHL_PRIVATE_INTEGRATION_KEY && process.env.GHL_SUBACCOUNT_ID) {
    jobs.push(sendToGhl(lead));
  }

  if (!jobs.length) {
    console.error("[lead] no destination configured (LEAD_WEBHOOK_URL / GHL_*) — lead lost:", lead.email);
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const results = await Promise.allSettled(jobs);
  results.forEach((r) => r.status === "rejected" && console.error("[lead]", r.reason));
  // The lead is safe as soon as one destination accepted it.
  const delivered = results.filter((r) => r.status === "fulfilled").map((r) => (r as PromiseFulfilledResult<string>).value);
  if (!delivered.length) return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });

  return NextResponse.json({ ok: true, delivered });
}

/* ---------- Webhook ---------- */

async function sendWebhook(url: string, lead: Lead) {
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
      private_integration_key: process.env.GHL_PRIVATE_INTEGRATION_KEY ?? "",
      subaccount_id: process.env.GHL_SUBACCOUNT_ID ?? "",
      workflow_id: process.env.GHL_WORKFLOW_ID ?? "",
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  return "webhook";
}

/* ---------- GoHighLevel (Private Integration) ---------- */

async function ghl(path: string, body: object) {
  const res = await fetch(`${GHL_API}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.GHL_PRIVATE_INTEGRATION_KEY}`,
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

async function sendToGhl(lead: Lead) {
  const utm = lead.utm ?? {};
  const tags = ["LP Démo ClientX", lead.sector, utm.utm_source && `source:${utm.utm_source}`].filter(Boolean);

  const { contact } = await ghl("/contacts/upsert", {
    locationId: process.env.GHL_SUBACCOUNT_ID,
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
    `Entreprise : ${lead.company}`,
    `Secteur : ${lead.sector}`,
    `Taille d'équipe : ${lead.teamSize}`,
    `Page : ${lead.page ?? ""}`,
    ...Object.entries(utm).map(([k, v]) => `${k} : ${v}`),
  ].join("\n");

  const extra: Promise<unknown>[] = [ghl(`/contacts/${contact.id}/notes`, { body: note })];
  if (process.env.GHL_WORKFLOW_ID) extra.push(ghl(`/contacts/${contact.id}/workflow/${process.env.GHL_WORKFLOW_ID}`, {}));
  const done = await Promise.allSettled(extra);
  done.forEach((r) => r.status === "rejected" && console.error("[lead] GHL follow-up failed:", r.reason));

  return "ghl";
}
