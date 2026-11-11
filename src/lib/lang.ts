// Language of each page, and which version a visitor gets.
// Shared by the Cloudflare Pages Functions (production) and src/proxy.ts (next dev).
// Web-standard APIs and no imports: also bundled into the Pages Functions.
//
// Rule: visitors in France or Morocco get French, everyone else gets English, by IP country.
// Testing: ?lang=en / ?lang=fr forces the language (and is remembered in a cookie, like the switch);
// ?pays=FR, ?pays=MA, ?pays=US… pretends to be in that country.

export type Lang = "fr" | "en";

export const LANG_COOKIE = "cx_lang";

/** French page → its English translation. */
export const EN_PATHS: Record<string, string> = {
  "/": "/en",
  "/partenaires": "/en/partners",
  "/mentions-legales": "/en/legal-notice",
  "/politique-de-confidentialite": "/en/privacy-policy",
  "/merci": "/en/thank-you",
  "/merci-maroc": "/en/thank-you-morocco",
};

const FR_PATHS: Record<string, string> = Object.fromEntries(Object.entries(EN_PATHS).map(([fr, en]) => [en, fr]));

const FRENCH_COUNTRIES = new Set(["FR", "MA"]);

// Search engines and link previews get the page they asked for, never a redirect based on their IP.
const BOT = /bot|crawl|spider|slurp|facebookexternalhit|Google-InspectionTool|Mediapartners|Lighthouse/i;

const clean = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "").replace(/\.html$/, "") : path) || "/";

export function langOf(path: string): Lang | null {
  const p = clean(path);
  return p in EN_PATHS ? "fr" : p in FR_PATHS ? "en" : null;
}

/** Same page in the other language (null for pages that have no translation). */
export function counterpart(path: string): string | null {
  const p = clean(path);
  return EN_PATHS[p] ?? FR_PATHS[p] ?? null;
}

/** Same page in `lang`. */
export function pathIn(path: string, lang: Lang): string {
  return langOf(path) === lang ? clean(path) : (counterpart(path) ?? (lang === "en" ? "/en" : "/"));
}

const asLang = (v: string | null | undefined): Lang | null => (v === "fr" || v === "en" ? v : null);

export function cookieLang(cookieHeader: string | null): Lang | null {
  const m = cookieHeader?.match(new RegExp(`(?:^|;\\s*)${LANG_COOKIE}=(fr|en)`));
  return asLang(m?.[1]);
}

export type LangDecision = {
  /** Where to send the visitor, or null to serve the requested page. */
  redirect: string | null;
  /** Language to remember (an explicit ?lang= choice). */
  remember: Lang | null;
};

/**
 * Which version of a page the visitor should see.
 * Priority: ?lang= > remembered choice (cookie, set by ?lang= and the language switch) > ?pays= > IP country.
 * Unknown country: the requested page is served as is.
 */
export function decideLang(url: URL, ipCountry: string | null, cookieHeader: string | null, userAgent: string | null): LangDecision {
  const page = langOf(url.pathname);
  const forced = asLang(url.searchParams.get("lang"));
  if (!page) return { redirect: null, remember: null };

  let want: Lang | null = forced ?? cookieLang(cookieHeader);
  if (!want && !(userAgent && BOT.test(userAgent))) {
    const pays = url.searchParams.get("pays");
    const country = pays && /^[A-Za-z]{2}$/.test(pays) ? pays.toUpperCase() : ipCountry;
    if (country) want = FRENCH_COUNTRIES.has(country) ? "fr" : "en";
  }

  // The query string (UTMs, gclid, fbclid, pays…) is kept on the redirect.
  const redirect = want && want !== page ? `${counterpart(url.pathname)}${url.search}` : null;
  return { redirect, remember: forced };
}

export const langCookie = (lang: Lang) => `${LANG_COOKIE}=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
