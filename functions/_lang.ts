// Language routing on Cloudflare Pages (production): French for France and Morocco, English elsewhere, by IP.
// One tiny function per page (functions/index.ts, functions/en/partners.ts…) so assets never trigger it.
import { decideLang, langCookie } from "../src/lib/lang";
import { ipCountry, type PagesContext } from "./_types";

export async function langRoute({ request, next }: PagesContext): Promise<Response> {
  const d = decideLang(new URL(request.url), ipCountry(request), request.headers.get("cookie"), request.headers.get("user-agent"));

  if (d.redirect) {
    const headers = new Headers({ Location: d.redirect, "Cache-Control": "private, no-store" });
    if (d.remember) headers.append("Set-Cookie", langCookie(d.remember));
    return new Response(null, { status: 302, headers });
  }

  const res = await next();
  if (!d.remember) return res;
  const out = new Response(res.body, res);
  out.headers.append("Set-Cookie", langCookie(d.remember));
  return out;
}
