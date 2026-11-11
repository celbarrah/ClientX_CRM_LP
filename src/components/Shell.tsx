import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics, GtmNoScript } from "@/components/Analytics";
import { ChatWidget } from "@/components/ChatWidget";
import { copy, type Lang } from "@/lib/i18n";
import "@/app/globals.css";

// <html> and <body> shared by the French and English root layouts (app/(fr) and app/(en)).

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://clientx.ai";

export function siteMetadata(lang: Lang): Metadata {
  const m = copy(lang).UI.meta;
  return {
    metadataBase: new URL(siteUrl),
    title: m.title,
    description: m.description,
    openGraph: { title: m.ogTitle, description: m.ogDescription, locale: m.locale, type: "website" },
    icons: { icon: "/favicon.png" },
  };
}

export function Shell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang} className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body>
        <GtmNoScript />
        {children}
        <Analytics />
        <ChatWidget />
      </body>
    </html>
  );
}
