// Minimal Cloudflare Pages Function context (avoids depending on @cloudflare/workers-types).
export type PagesContext = {
  request: Request & { cf?: { country?: string } };
  env: Record<string, string | undefined>;
};

/** Country Cloudflare computed from the visitor's IP. It can't be set by the visitor (unlike request headers). */
export const ipCountry = (request: PagesContext["request"]) => {
  const c = request.cf?.country;
  return c && /^[A-Z]{2}$/.test(c) && c !== "XX" && c !== "T1" ? c : null;
};
