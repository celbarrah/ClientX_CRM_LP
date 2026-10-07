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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <ModulesTabs />
        <Archive />
        <Proof />
        <ToolsVsPlatform />
        <Pricing />
        <Faq />
      </main>
      <Footer cta />
      <MobileCta />
    </>
  );
}
