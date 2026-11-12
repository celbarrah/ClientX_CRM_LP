import type { Metadata } from "next";
import { ThankYou } from "@/components/ThankYou";

export const metadata: Metadata = {
  title: "Merci — Votre demande de démo ClientX AI est envoyée",
  robots: { index: false },
};

/** Thank-you page for visitors outside Morocco. */
export default function Merci() {
  return <ThankYou market="global" />;
}
