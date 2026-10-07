import { NextResponse } from "next/server";
import { payloadSchema } from "@/lib/schema";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const { website, ...lead } = parsed.data;
  // Honeypot filled: pretend success so bots learn nothing.
  if (website) return NextResponse.json({ ok: true });

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.error("[lead] LEAD_WEBHOOK_URL is not set — lead not forwarded:", lead.email);
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const payload = {
    first_name: lead.firstName,
    last_name: lead.lastName,
    email: lead.email,
    phone: lead.phone,
    company_name: lead.company,
    sector: lead.sector,
    team_size: lead.teamSize,
    source: "LP Démo ClientX AI",
    page: lead.page,
    ...lead.utm,
    submitted_at: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("[lead] forward failed", err);
    return NextResponse.json({ ok: false, error: "upstream" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
