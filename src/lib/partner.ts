// Partner Program application, shared by the Next.js route (Node hosts) and the Cloudflare Pages Function.
// Web-standard APIs and relative imports only. The applicant becomes a CRM contact tagged "ClientX Partner Program",
// and the team is told in the partners' Google Chat space (GOOGLE_CHAT_WEBHOOK_URL_PARTNERS).
import { partnerSchema, type PartnerPayload } from "./schema";
import { UTM_LABELS, clean, ghl, postChat } from "./lead";
import { ghlConfig, isCountry, marketOf, type Env, type Market } from "./market";

const GHL_DEFAULT = "https://services.leadconnectorhq.com";
const SOURCE = "ClientX Partner Program";

type Application = Omit<PartnerPayload, "website" | "country">;
type Outcome = { contactId: string | null; error: string | null };

export async function handlePartner(req: Request, env: Env, ipCountry: string | null): Promise<Response> {
  const parsed = partnerSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ ok: false, error: "invalid" }, { status: 400 });

  const { website, country: hint, ...p } = parsed.data;
  // Honeypot filled: pretend success so bots learn nothing.
  if (website) return Response.json({ ok: true });

  // Same accounts as the demo leads: Morocco (by IP) → *_MA credentials, everyone else → global ones.
  const country = ipCountry ?? (isCountry(hint) ? hint.toUpperCase() : null);
  const market = marketOf(country);
  const cfg = ghlConfig(env, market);

  const outcome = await saveToCrm(p, market, cfg, env.GHL_API_BASE || GHL_DEFAULT);
  // Sent even when the CRM failed, so the team still gets the application.
  await notifyPartnerChat(env, p, { market, country, subaccountId: cfg.subaccountId, ...outcome });

  if (outcome.error === "not_configured") return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
  if (outcome.error) return Response.json({ ok: false, error: "upstream" }, { status: 502 });
  return Response.json({ ok: true });
}

async function saveToCrm(p: Application, market: Market, cfg: ReturnType<typeof ghlConfig>, api: string): Promise<Outcome> {
  if (!cfg.privateKey || !cfg.subaccountId) {
    console.error("[partner] GHL not configured — application not saved:", JSON.stringify({ ...p, market }));
    return { contactId: null, error: "not_configured" };
  }
  const utm = p.utm ?? {};
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
    return { contactId: contact.id, error: null };
  } catch (e) {
    // Logged in full so the application can still be recovered from the host's logs.
    console.error("[partner] APPLICATION NOT DELIVERED:", e, JSON.stringify({ ...p, market }));
    return { contactId: null, error: "upstream" };
  }
}

/* ---------- Google Chat notification (partners' space) ---------- */

type ChatCtx = Outcome & { market: Market; country: string | null; subaccountId: string };

/** Language of the page the form was sent from: /en/... is the English version. */
const pageLang = (page?: string) => {
  try {
    return new URL(page ?? "").pathname.startsWith("/en") ? "Anglais" : "Français";
  } catch {
    return "—";
  }
};

async function notifyPartnerChat(env: Env, p: Application, ctx: ChatCtx) {
  const url = env.GOOGLE_CHAT_WEBHOOK_URL_PARTNERS?.trim();
  if (!url) return;
  const utm = p.utm ?? {};
  const date = new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: ctx.market === "MA" ? "Africa/Casablanca" : "Europe/Paris",
  }).format(new Date());
  const others = Object.entries(utm)
    .filter(([k]) => !UTM_LABELS.some(([u]) => u === k) && k !== "landing_page" && k !== "referrer")
    .map(([k, v]) => `${k} : ${clean(v)}`);

  const lines = [
    `🤝 *Nouvelle candidature — ${SOURCE}* (${ctx.market === "MA" ? "Maroc 🇲🇦" : "Global 🌍"})`,
    "",
    `*Formule :* ${clean(p.plan)}`,
    `*Nom :* ${clean(p.firstName)} ${clean(p.lastName)}`,
    `*Email :* ${clean(p.email)}`,
    `*Téléphone :* ${clean(p.phone)}`,
    `*Société :* ${clean(p.company)}`,
    `*Site / réseau social :* ${clean(p.link)}`,
    `*Audience / clients :* ${clean(p.message)}`,
    `*Pays (IP) :* ${ctx.country ?? "inconnu"}`,
    `*Langue du site :* ${pageLang(p.page)}`,
    "",
    ...UTM_LABELS.filter(([k]) => utm[k]).map(([k, label]) => `*${label} :* ${clean(utm[k])}`),
    ...(utm.landing_page ? [`*Page d'arrivée :* ${clean(utm.landing_page)}`] : []),
    ...(utm.referrer ? [`*Site d'origine :* ${clean(utm.referrer)}`] : []),
    ...others,
    `*Date :* ${date}`,
    ...(ctx.error === "not_configured" ? ["⚠️ CRM non configuré : candidature NON enregistrée dans le CRM."] : []),
    ...(ctx.error === "upstream" ? ["⚠️ Erreur CRM : candidature NON enregistrée dans le CRM, à saisir manuellement."] : []),
  ];
  await postChat(url, lines, "partner");
}
