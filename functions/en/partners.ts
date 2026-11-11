// Cloudflare Pages Function: GET /en/partners — French or English version by IP country (see functions/_lang.ts).
import { langRoute } from "../_lang";

export const onRequestGet = langRoute;
