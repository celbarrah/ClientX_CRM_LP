import { handleLead } from "@/lib/lead";
import { countryFromHeaders } from "@/lib/market";

// Node hosts (`next start`). On Cloudflare Pages the same logic runs in functions/api/lead.ts.
export async function POST(req: Request) {
  return handleLead(req, process.env, countryFromHeaders(req.headers, process.env));
}
