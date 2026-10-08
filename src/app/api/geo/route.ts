import { NextResponse } from "next/server";
import { countryFromHeaders } from "@/lib/market";

export const dynamic = "force-dynamic";

/** Visitor country from the IP geolocation header set by the host (Netlify, Vercel or Cloudflare). */
export async function GET(req: Request) {
  return NextResponse.json({ country: countryFromHeaders(req.headers) }, { headers: { "Cache-Control": "private, no-store" } });
}
