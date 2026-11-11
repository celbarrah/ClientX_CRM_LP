import type { Lang } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { ModulesTabs } from "@/components/ModulesTabs";
import { Archive } from "@/components/Archive";
import { Proof } from "@/components/Proof";
import { ToolsVsPlatform } from "@/components/ToolsVsPlatform";
import { Pricing } from "@/components/Pricing";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { MobileCta } from "@/components/MobileCta";

/** Home page, shared by / (French) and /en (English). */
export function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <Header lang={lang} />
      <main>
        <Hero lang={lang} />
        <Manifesto lang={lang} />
        <ModulesTabs lang={lang} />
        <Archive lang={lang} />
        <Proof lang={lang} />
        <ToolsVsPlatform lang={lang} />
        <Pricing lang={lang} />
        <Faq lang={lang} />
      </main>
      <Footer cta lang={lang} />
      <MobileCta lang={lang} />
    </>
  );
}
