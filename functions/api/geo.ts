// Cloudflare Pages Function: GET /api/geo. Visitor country from Cloudflare's IP data.
import { ipCountry, type PagesContext } from "../_types";

export const onRequestGet = ({ request }: PagesContext) =>
  Response.json({ country: ipCountry(request) }, { headers: { "Cache-Control": "private, no-store" } });
