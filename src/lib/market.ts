// Server only: visitor market from the IP country, and the GHL credentials for it.
// One landing page serves everyone. Visitors in Morocco use the *_MA variables, everyone else the global ones.
// Shared by the Next.js API routes (Node hosts) and the Cloudflare Pages Functions, so it only uses
// web-standard APIs and relative imports, and receives the environment as a parameter.

export type Market = "MA" | "global";
export type Env = Record<string, string | undefined>;

/** Netlify sends geolocation as base64-encoded JSON: { country: { code: "MA" }, ... } */
function netlifyCountry(h: Headers) {
  const raw = h.get("x-nf-geo");
  if (!raw) return null;
  try {
    return JSON.parse(atob(raw))?.country?.code ?? null;
  } catch {
    return null;
  }
}

export const isCountry = (v?: string | null): v is string => !!v && /^[A-Z]{2}$/i.test(v) && v.toUpperCase() !== "XX";

/** Country from the header set by the host edge (Netlify, Vercel or Cloudflare). Null when there is none (local dev). */
export function countryFromHeaders(h: Headers, env: Env): string | null {
  // When the host is known (e.g. GEO_HEADER=x-vercel-ip-country), trust only its header:
  // the others are not overwritten by that host, so a visitor could send them to pick a market.
  const only = env.GEO_HEADER?.trim().toLowerCase();
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

export const marketOf = (country: string | null): Market => (country === "MA" ? "MA" : "global");

/**
 * GHL credentials for a market. Morocco uses the *_MA set when its private key is configured,
 * otherwise falls back to the global set as a whole (never a mix of the two accounts).
 */
export function ghlConfig(env: Env, market: Market) {
  const get = (k: string) => env[k]?.trim() || "";
  const suffix = market === "MA" && get("GHL_PRIVATE_INTEGRATION_KEY_MA") ? "_MA" : "";
  return {
    account: suffix ? "MA" : "global",
    privateKey: get(`GHL_PRIVATE_INTEGRATION_KEY${suffix}`),
    subaccountId: get(`GHL_SUBACCOUNT_ID${suffix}`),
    workflowId: get(`GHL_WORKFLOW_ID${suffix}`),
  } as const;
}

/** Google Chat incoming-webhook URL for a market, passed to n8n so it can notify the right space. */
export function chatWebhook(env: Env, market: Market) {
  const get = (k: string) => env[k]?.trim() || "";
  return (market === "MA" && get("GOOGLE_CHAT_WEBHOOK_URL_MA")) || get("GOOGLE_CHAT_WEBHOOK_URL");
}
