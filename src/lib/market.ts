// Server only: visitor market from the IP geolocation header, and the GHL credentials for it.
// One landing page serves everyone. Visitors in Morocco use the *_MA variables, everyone else the global ones.

export type Market = "MA" | "global";

/** Netlify sends geolocation as base64-encoded JSON: { country: { code: "MA" }, ... } */
function netlifyCountry(h: Headers) {
  const raw = h.get("x-nf-geo");
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, "base64").toString("utf8"))?.country?.code ?? null;
  } catch {
    return null;
  }
}

const isCountry = (v?: string | null): v is string => !!v && /^[A-Z]{2}$/i.test(v) && v.toUpperCase() !== "XX";

/** Country from the header set by the host edge (Netlify, Vercel or Cloudflare). Null when there is none (local dev). */
export function countryFromHeaders(h: Headers): string | null {
  // When the host is known (e.g. GEO_HEADER=cf-ipcountry on Cloudflare), trust only its header:
  // the others are not overwritten there, so a visitor could send them to pick a market.
  const only = process.env.GEO_HEADER?.trim().toLowerCase();
  if (only) {
    const v = only === "x-nf-geo" ? netlifyCountry(h) : h.get(only);
    return isCountry(v) ? v.toUpperCase() : null;
  }
  const raw =
    netlifyCountry(h) ??
    h.get("x-vercel-ip-country") ??
    h.get("cf-ipcountry") ??
    h.get("x-country") ??
    h.get("x-country-code");
  return isCountry(raw) ? raw.toUpperCase() : null;
}

/**
 * The IP header always wins. The browser's own detection (`hint`, which honours ?pays=MA for QA)
 * is only used when the host sends no geolocation header, i.e. in local development.
 */
export function resolveCountry(h: Headers, hint?: string | null): string | null {
  return countryFromHeaders(h) ?? (isCountry(hint) ? hint.toUpperCase() : null);
}

export const marketOf = (country: string | null): Market => (country === "MA" ? "MA" : "global");

const env = (k: string) => process.env[k]?.trim() || "";

/**
 * GHL credentials for a market. Morocco uses the *_MA set when its private key is configured,
 * otherwise falls back to the global set as a whole (never a mix of the two accounts).
 */
export function ghlConfig(market: Market) {
  const suffix = market === "MA" && env("GHL_PRIVATE_INTEGRATION_KEY_MA") ? "_MA" : "";
  return {
    account: suffix ? "MA" : "global",
    privateKey: env(`GHL_PRIVATE_INTEGRATION_KEY${suffix}`),
    subaccountId: env(`GHL_SUBACCOUNT_ID${suffix}`),
    workflowId: env(`GHL_WORKFLOW_ID${suffix}`),
  } as const;
}
