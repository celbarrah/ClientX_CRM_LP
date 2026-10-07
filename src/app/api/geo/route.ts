import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/** Visitor country from the IP geolocation header set by the hosting edge (Vercel or Cloudflare). */
export async function GET(req: Request) {
  const h = req.headers;
  const raw = h.get("x-vercel-ip-country") ?? h.get("cf-ipcountry") ?? h.get("x-country-code");
  const country = raw && /^[A-Z]{2}$/i.test(raw) && raw.toUpperCase() !== "XX" ? raw.toUpperCase() : null;
  return NextResponse.json({ country }, { headers: { "Cache-Control": "private, no-store" } });
}
