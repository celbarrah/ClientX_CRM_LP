import type { Metadata, Viewport } from "next";
import { Shell, siteMetadata } from "@/components/Shell";

// French pages. The URLs are unchanged: the "(fr)" folder name is not part of the address.
export const metadata: Metadata = siteMetadata("fr");

export const viewport: Viewport = { themeColor: "#f4f7f5" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Shell lang="fr">{children}</Shell>;
}
