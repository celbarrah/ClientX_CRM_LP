import { Check, ShieldCheck } from "lucide-react";
import { HERO, CTA } from "@/lib/content";
import { Accent, Button, Eyebrow, Highlight, Sticker, Target } from "@/components/ui";
import { DemoForm } from "@/components/DemoForm";
import { LogoMarquee } from "@/components/LogoMarquee";

/* Painted in its final state on the first frame: no entrance fades, no scroll parallax. */
export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 sm:pt-40">
      <div className="absolute inset-0 -z-10 bg-paper [mask-image:radial-gradient(ellipse_75%_65%_at_50%_10%,black,transparent)]" />
      <div
        className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(50_220_50/0.35),transparent)]"
      />
      <div className="pointer-events-none absolute -left-48 top-[55%] -z-10 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(50_220_50/0.22),transparent)]" />

      <div className="container-x grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <div>
            <Eyebrow>{HERO.eyebrow}</Eyebrow>
          </div>

          <h1 className="relative mt-8 text-[2.9rem] font-semibold leading-[1.02] tracking-[-0.05em] sm:text-7xl lg:text-[5.2rem]">
            <span className="block">
              Réservez votre
            </span>
            <span className="block">
              <Highlight>démo</Highlight> <Accent>gratuite</Accent>
            </span>
            <span className="flex items-center gap-4">
              aujourd&apos;hui.
              <Sticker rotate={-8} className="hidden sm:inline-flex">
                Audit offert
              </Sticker>
            </span>
            <span className="absolute -top-2 right-[8%] hidden lg:block">
              <Target />
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:mt-8">
            <span className="font-medium text-ink">& recevez un audit offert de vos outils.</span>{" "}
            <span className="hidden sm:inline">{HERO.subtitle}</span>
          </p>

          <ul className="mt-6 grid gap-3 sm:mt-8">
            {HERO.perks.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px] text-ink-soft">
                <span className="grid size-6 place-items-center rounded-full bg-brand text-ink">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="mt-10 hidden flex-wrap items-center gap-x-6 gap-y-4 sm:flex">
            <Button href="#plateforme" variant="ghost" size="lg">
              {CTA.secondary}
            </Button>
            <div className="flex items-center gap-2.5 text-sm text-muted">
              <ShieldCheck className="size-5 text-brand-deep" />
              <span>
                Certifié <span className="font-medium text-ink">ISO 9001</span> · 50+ marques nous font confiance
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <DemoForm />
        </div>
      </div>

      <div className="mt-16 sm:mt-24">
        <LogoMarquee />
      </div>
    </section>
  );
}
