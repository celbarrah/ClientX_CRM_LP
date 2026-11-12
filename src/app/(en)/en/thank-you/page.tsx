import type { Metadata } from "next";
import { ThankYou } from "@/components/ThankYou";
import { copy } from "@/lib/i18n";

export const metadata: Metadata = { title: copy("en").UI.thankYou.title, robots: { index: false } };

/** English thank-you page for visitors outside Morocco. */
export default function ThankYouPage() {
  return <ThankYou market="global" lang="en" />;
}
