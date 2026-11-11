// Partner Program application, shared by the Next.js route (Node hosts) and the Cloudflare Pages Function.
// Web-standard APIs and relative imports only. The applicant becomes a CRM contact tagged "ClientX Partner Program".
import { partnerSchema } from "./schema";
import { ghl } from "./lead";
import { ghlConfig, isCountry, marketOf, type Env } from "./market";

const GHL_DEFAULT = "https://services.leadconnectorhq.com";
const SOURCE = "ClientX Partner Program";

export async function handlePartner(req: Request, env: Env, ipCountry: string | null): Promise<Response> {
  const parsed = partnerSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const { website, country: hint, utm = {}, ...p } = parsed.data;
  // Honeypot filled: pretend success so bots learn nothing.
  if (website) return Response.json({ ok: true });

  // Same accounts as the demo leads: Morocco (by IP) → *_MA credentials, everyone else → global ones.
  const market = marketOf(ipCountry ?? (isCountry(hint) ? hint.toUpperCase() : null));
  const cfg = ghlConfig(env, market);
  const api = env.GHL_API_BASE || GHL_DEFAULT;
  if (!cfg.privateKey || !cfg.subaccountId) {
    console.error("[partner] GHL not configured — application lost:", p.email);
    return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  try {
    const { contact } = await ghl(api, cfg.privateKey, "/contacts/upsert", {
      locationId: cfg.subaccountId,
      firstName: p.firstName,
      lastName: p.lastName,
      name: `${p.firstName} ${p.lastName}`,
      email: p.email,
      phone: p.phone,
      companyName: p.company || undefined,
      website: p.link || undefined,
      source: SOURCE,
      // A GHL workflow can start on these tags (no demo workflow is triggered from here).
      tags: [SOURCE, p.plan, market === "MA" ? "Maroc" : "Global"],
    });
    if (!contact?.id) throw new Error("GHL upsert returned no contact id");

    const note = [
      `Candidature — ${SOURCE}`,
      `Formule : ${p.plan}`,
      `Marché : ${market === "MA" ? "Maroc" : "Global"}`,
      p.company && `Société : ${p.company}`,
      p.link && `Site / réseau : ${p.link}`,
      p.message && `Message : ${p.message}`,
      `Page : ${p.page ?? ""}`,
      ...Object.entries(utm).map(([k, v]) => `${k} : ${v}`),
    ].filter(Boolean).join("\n");
    await ghl(api, cfg.privateKey, `/contacts/${contact.id}/notes`, { body: note }).catch((e) =>
      console.error("[partner] GHL note failed:", e),
    );
  } catch (e) {
    // Logged in full so the application can still be recovered from the host's logs.
    console.error("[partner] APPLICATION NOT DELIVERED:", e, JSON.stringify({ ...p, market }));
    return Response.json({ ok: false, error: "upstream" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
