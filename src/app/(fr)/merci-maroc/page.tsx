import type { Metadata } from "next";
import { ThankYou } from "@/components/ThankYou";

export const metadata: Metadata = {
  title: "Merci — Votre demande de démo ClientX AI (Maroc) est envoyée",
  robots: { index: false },
};

/** Thank-you page for visitors in Morocco (by IP). */
export default function MerciMaroc() {
  return <ThankYou market="MA" />;
}
