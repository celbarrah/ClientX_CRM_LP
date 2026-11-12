import type { Metadata } from "next";
import { ThankYou } from "@/components/ThankYou";
import { copy } from "@/lib/i18n";

export const metadata: Metadata = { title: copy("en").UI.thankYou.titleMA, robots: { index: false } };

/** English thank-you page for visitors in Morocco (by IP) who chose English. */
export default function ThankYouMorocco() {
  return <ThankYou market="MA" lang="en" />;
}
