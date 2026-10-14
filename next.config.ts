import type { NextConfig } from "next";

// Cloudflare Pages sets CF_PAGES=1 during its builds (STATIC_EXPORT=1 does the same locally).
// The site is then exported as static files to `out/`, and the two API routes are served by
// Pages Functions (functions/api/*.ts) instead of the Next.js route handlers. Pages and layouts
// are .tsx, route handlers are .ts, so limiting extensions to .tsx leaves the handlers out of the export.
const staticExport = Boolean(process.env.CF_PAGES || process.env.STATIC_EXPORT);

const nextConfig: NextConfig = {
  poweredByHeader: false,
  ...(staticExport && { output: "export", pageExtensions: ["tsx"] }),
};

export default nextConfig;
