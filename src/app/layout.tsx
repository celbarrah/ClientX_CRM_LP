import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "ClientX AI — Réservez votre démo du CRM IA tout-en-un",
  description:
    "Sites, funnels, CRM, e-mails, SMS, WhatsApp, agendas, paiements, formations et agents IA dans une seule plateforme. Démo live + audit gratuit de vos outils.",
  openGraph: {
    title: "ClientX AI — Le CRM IA tout-en-un",
    description: "Remplacez +20 outils et économisez plus de 15 000 € par an. Réservez votre démo gratuite.",
    locale: "fr_FR",
    type: "website",
  },
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = { themeColor: "#f4f7f5" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${geist.variable} ${geistMono.variable} ${instrument.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
