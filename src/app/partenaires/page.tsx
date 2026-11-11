import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PARTNERS } from "@/lib/content";
import { Accent, Button, Eyebrow, Reveal, SectionHeading, Sticker } from "@/components/ui";
import { Header } from "@/components/Header";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { PartnerForm } from "@/components/PartnerForm";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "ClientX Partner Program — Recommandez ou revendez le CRM ClientX",
  description: "Apporteur d'affaires (20 %) ou partenaire agence (30 %) : des commissions chaque mois, tant que vos clients restent abonnés.",
};

export default function Partenaires() {
  return (
    <>
      <Header home={false} />
      <main>
        <section id="top" className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
          <div className="absolute inset-0 -z-10 bg-paper [mask-image:radial-gradient(ellipse_75%_65%_at_50%_10%,black,transparent)]" />
          <div className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(50_220_50/0.35),transparent)]" />
          <div className="container-x flex flex-col items-center text-center">
            <Eyebrow>{PARTNERS.eyebrow}</Eyebrow>
            <h1 className="mt-8 max-w-5xl text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              {PARTNERS.title} <Accent>{PARTNERS.accent}</Accent>
            </h1>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button href="#candidature" size="lg">
                {PARTNERS.cta}
              </Button>
              <Sticker rotate={-4}>Jusqu&apos;à 30 % chaque mois</Sticker>
            </div>
          </div>
        </section>

        {/* The two plans */}
        <section className="pb-20 sm:pb-28">
          <div className="container-x grid gap-4 lg:grid-cols-2">
            {PARTNERS.plans.map((p) => (
              <Reveal
                key={p.key}
                className={cn("relative flex flex-col rounded-[2rem] p-1.5", p.popular ? "bg-ink shadow-float" : "border border-line bg-surface")}
              >
                <div className={cn("flex flex-1 flex-col rounded-[1.6rem] p-7 sm:p-9", p.popular && "text-white")}>
                  <h2 className="font-mono text-[12px] uppercase tracking-[0.16em]">{p.name}</h2>
                  <p className={cn("mt-3 text-[15px]", p.popular ? "text-white/60" : "text-muted")}>{p.who}</p>
                  <p className="mt-8 flex items-baseline gap-2">
                    <span className="text-6xl font-semibold tracking-[-0.05em]">{p.commission}</span>
                    <span className={cn("text-sm", p.popular ? "text-white/50" : "text-muted")}>{p.period}</span>
                  </p>
                  <div className={cn("my-8 h-px", p.popular ? "bg-white/10" : "bg-line")} />
                  <ul className="grid gap-3.5 text-[15px]">
                    {p.points.map((x) => (
                      <li key={x} className="flex items-center gap-3">
                        <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-ink">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        <span className="font-medium">{x}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-10">
                    <Button href="#candidature" variant={p.popular ? "brand" : "dark"} className="w-full justify-between">
                      {PARTNERS.cta}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 sm:py-28">
          <div className="container-x">
            <SectionHeading eyebrow="Avantages" title="Pourquoi devenir" accent="partenaire ?" />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PARTNERS.benefits.map((b) => (
                <Reveal key={b.title} className="rounded-[1.75rem] border border-line bg-surface p-7">
                  <span className="grid size-9 place-items-center rounded-full bg-brand text-ink">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">{b.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{b.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-20 sm:py-28">
          <div className="container-x">
            <SectionHeading eyebrow="Comment ça marche" title="4 étapes pour" accent="commencer" />
            <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PARTNERS.steps.map((s, i) => (
                <li key={s.title} className="rounded-[1.75rem] border border-line bg-surface p-7">
                  <span className="font-mono text-[12px] text-brand-deep">0{i + 1}</span>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Application form */}
        <section id="candidature" className="scroll-mt-24 py-20 sm:py-28">
          <div className="container-x grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading align="left" eyebrow="Candidature" title="Devenez partenaire" accent="ClientX" />
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                Choisissez votre formule et laissez-nous vos coordonnées : nous vous envoyons votre lien et votre kit marketing.
              </p>
            </div>
            <div className="lg:col-span-7">
              <PartnerForm />
            </div>
          </div>
        </section>

        <Faq items={PARTNERS.faq} />
      </main>
      <Footer />
    </>
  );
}
