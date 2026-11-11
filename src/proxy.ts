// Language routing for `next dev` / `next start`: same rule as production (functions/_lang.ts), see lib/lang.ts.
// Not part of the Cloudflare static export (only .tsx files are built there); the Pages Functions do this job instead.
import { NextResponse, type NextRequest } from "next/server";
import { decideLang, langCookie } from "@/lib/lang";
import { countryFromHeaders } from "@/lib/market";

export function proxy(req: NextRequest) {
  const d = decideLang(
    new URL(req.url),
    countryFromHeaders(req.headers, process.env),
    req.headers.get("cookie"),
    req.headers.get("user-agent"),
  );
  const res = d.redirect ? NextResponse.redirect(new URL(d.redirect, req.url), 302) : NextResponse.next();
  if (d.redirect) res.headers.set("Cache-Control", "private, no-store");
  if (d.remember) res.headers.append("Set-Cookie", langCookie(d.remember));
  return res;
}

// Must be literal strings (Next.js reads them at build time): the pages listed in EN_PATHS (lib/lang.ts).
export const config = {
  matcher: [
    "/", "/partenaires", "/mentions-legales", "/politique-de-confidentialite", "/merci", "/merci-maroc",
    "/en", "/en/partners", "/en/legal-notice", "/en/privacy-policy", "/en/thank-you", "/en/thank-you-morocco",
  ],
};
