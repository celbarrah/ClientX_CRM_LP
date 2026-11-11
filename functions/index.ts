// Cloudflare Pages Function: GET / — French or English version by IP country (see functions/_lang.ts).
import { langRoute } from "./_lang";

export const onRequestGet = langRoute;
