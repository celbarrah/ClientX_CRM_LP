// Cloudflare Pages Function: POST /api/lead. Same logic as src/app/api/lead/route.ts.
import { handleLead } from "../../src/lib/lead";
import { ipCountry, type PagesContext } from "../_types";

export const onRequestPost = ({ request, env }: PagesContext) => handleLead(request, env, ipCountry(request));
