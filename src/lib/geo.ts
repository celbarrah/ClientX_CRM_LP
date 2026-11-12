// Visitor country, shared by the pricing (MAD prices) and the chat widget.
// Source of truth: the IP country header from the hosting edge, via /api/geo.
// Fallback when no header is available (e.g. local dev): the browser timezone.
// QA override: add ?pays=MA (or ?pays=FR) to the URL; it is kept for the session.

const KEY = "cx_country";
let pending: Promise<string | null> | null = null;

function fromTimezone(): string | null {
  try {
    if (Intl.DateTimeFormat().resolvedOptions().timeZone === "Africa/Casablanca") return "MA";
  } catch {}
  return null;
}

/**
 * Best answer available right now, without waiting for the network: the ?pays= override, the country
 * already detected earlier in this visit, else a Moroccan timezone. Null when only the IP lookup can tell.
 * Lets the UI show the right country on its first paint instead of switching a moment later.
 */
export function knownCountry(): string | null {
  try {
    const forced = new URLSearchParams(window.location.search).get("pays");
    if (forced && /^[A-Z]{2}$/i.test(forced)) return forced.toUpperCase();
    const cached = sessionStorage.getItem(KEY);
    if (cached) return cached;
  } catch {}
  return fromTimezone();
}

export function detectCountry(): Promise<string | null> {
  if (pending) return pending;
  pending = (async () => {
    try {
      const forced = new URLSearchParams(window.location.search).get("pays");
      if (forced && /^[A-Z]{2}$/i.test(forced)) sessionStorage.setItem(KEY, forced.toUpperCase());
      const cached = sessionStorage.getItem(KEY);
      if (cached) return cached;
    } catch {}

    let country: string | null = null;
    try {
      const res = await fetch("/api/geo", { cache: "no-store", signal: AbortSignal.timeout(2500) });
      country = (await res.json()).country ?? null;
    } catch {}
    country ??= fromTimezone();

    try {
      if (country) sessionStorage.setItem(KEY, country);
    } catch {}
    return country;
  })();
  return pending;
}
