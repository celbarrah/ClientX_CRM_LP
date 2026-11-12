import { countryFromHeaders } from "@/lib/market";

export const dynamic = "force-dynamic";

// Node hosts (`next start`). On Cloudflare Pages the same answer comes from functions/api/geo.ts.
/** Visitor country from the IP geolocation header set by the host (Netlify, Vercel or Cloudflare). */
export async function GET(req: Request) {
  return Response.json(
    { country: countryFromHeaders(req.headers, process.env) },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
