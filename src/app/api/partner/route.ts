import { handlePartner } from "@/lib/partner";
import { countryFromHeaders } from "@/lib/market";

// Node hosts (`next start`). On Cloudflare Pages the same logic runs in functions/api/partner.ts.
export async function POST(req: Request) {
  return handlePartner(req, process.env, countryFromHeaders(req.headers, process.env));
}
