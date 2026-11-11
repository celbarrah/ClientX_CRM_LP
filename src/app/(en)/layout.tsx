import type { Metadata, Viewport } from "next";
import { Shell, siteMetadata } from "@/components/Shell";

// English pages (/en/...), shown to visitors outside France and Morocco (see lib/lang.ts).
export const metadata: Metadata = siteMetadata("en");

export const viewport: Viewport = { themeColor: "#f4f7f5" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Shell lang="en">{children}</Shell>;
}
