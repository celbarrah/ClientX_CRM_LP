import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Netlify sends geolocation as base64-encoded JSON: { country: { code: "MA" }, ... } */
function netlifyCountry(h: Headers) {
  const raw = h.get("x-nf-geo");
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, "base64").toString("utf8"))?.country?.code ?? null;
  } catch {
    return null;
  }
}

/** Visitor country from the IP geolocation header set by the host (Netlify, Vercel or Cloudflare). */
export async function GET(req: Request) {
  const h = req.headers;
  const raw =
    netlifyCountry(h) ??
    h.get("x-country") ??
    h.get("x-vercel-ip-country") ??
    h.get("cf-ipcountry") ??
    h.get("x-country-code");
  const country = raw && /^[A-Z]{2}$/i.test(raw) && raw.toUpperCase() !== "XX" ? raw.toUpperCase() : null;
  return NextResponse.json({ country }, { headers: { "Cache-Control": "private, no-store" } });
}
