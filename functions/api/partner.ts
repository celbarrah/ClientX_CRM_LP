// Cloudflare Pages Function: POST /api/partner. Same logic as src/app/api/partner/route.ts.
import { handlePartner } from "../../src/lib/partner";
import { ipCountry, type PagesContext } from "../_types";

export const onRequestPost = ({ request, env }: PagesContext) => handlePartner(request, env, ipCountry(request));
