// Captures campaign parameters from the URL and keeps them for the session,
// so a visitor who lands with UTMs and browses around still converts with them.

export const TRACKED_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
  "ttclid",
] as const;

const KEY = "cx_attribution";

type Attribution = Record<string, string>;

function read(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? "{}");
  } catch {
    return {};
  }
}

/** Call on every page load: stores any campaign params present in the URL. */
export function captureAttribution() {
  const params = new URLSearchParams(window.location.search);
  const found: Attribution = {};
  for (const k of TRACKED_PARAMS) {
    const v = params.get(k);
    if (v) found[k] = v.slice(0, 300);
  }
  const stored = read();
  // A new campaign click replaces the previous one (last-touch).
  const next: Attribution = Object.keys(found).length
    ? { ...found, landing_page: window.location.href, referrer: document.referrer || stored.referrer || "" }
    : { ...stored };
  if (!next.landing_page) next.landing_page = window.location.href;
  if (!next.referrer && document.referrer) next.referrer = document.referrer;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
}

function cookie(name: string) {
  return document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`))?.[1];
}

/** Everything we know about where the lead came from, ready to send. */
export function getAttribution(): Attribution {
  const a = { ...read() };
  // Meta browser identifiers, useful for Conversions API matching downstream.
  const fbp = cookie("_fbp");
  const fbc = cookie("_fbc") ?? (a.fbclid ? `fb.1.${Date.now()}.${a.fbclid}` : undefined);
  if (fbp) a.fbp = fbp;
  if (fbc) a.fbc = fbc;
  return a;
}
