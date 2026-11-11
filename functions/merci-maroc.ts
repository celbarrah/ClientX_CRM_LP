// Cloudflare Pages Function: GET /merci-maroc — French or English version by IP country (see functions/_lang.ts).
import { langRoute } from "./_lang";

export const onRequestGet = langRoute;
