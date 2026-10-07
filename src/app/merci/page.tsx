import type { Metadata } from "next";
import { Check } from "lucide-react";
import { THANK_YOU_STEPS, CONTACT } from "@/lib/content";
import { Accent, Button, Eyebrow, Logo, Reveal } from "@/components/ui";
import { LeadConfirmed } from "./LeadConfirmed";

export const metadata: Metadata = {
  title: "Merci — Votre demande de démo ClientX AI est envoyée",
  robots: { index: false },
};

export default function Merci() {
  return (
    <main className="relative isolate min-h-dvh overflow-hidden pb-24">
      <div className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[560px] w-[1000px] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(50_220_50/0.3),transparent)]" />

      <div className="container-x flex justify-center pt-10">
        <a href="/" aria-label="ClientX AI — accueil">
          <Logo className="h-7" />
        </a>
      </div>

      <div className="container-x mt-20 flex flex-col items-center text-center sm:mt-28">
        <Reveal>
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-brand text-ink shadow-glow">
            <Check className="size-9" strokeWidth={2.6} />
          </span>
        </Reveal>
        <Reveal delay={0.1} className="mt-8">
          <Eyebrow>Demande envoyée</Eyebrow>
        </Reveal>
        <Reveal delay={0.15}>
          <h1 className="mt-6 max-w-3xl text-balance text-[2.6rem] font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl">
            Merci<LeadConfirmed /> ! Votre demande est <Accent>bien reçue</Accent>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-lg text-lg text-muted">Voici les prochaines étapes.</p>
        </Reveal>

        <div className="mt-14 grid w-full max-w-4xl gap-4 text-left md:grid-cols-3">
          {THANK_YOU_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={0.25 + i * 0.1}>
              <div className="h-full rounded-3xl border border-line bg-surface p-7">
                <span className="grid size-10 place-items-center rounded-full bg-ink font-mono text-sm text-brand">{i + 1}</span>
                <h2 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h2>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5} className="mt-14 flex flex-col items-center gap-4">
          <Button href="/" variant="ghost">Retour au site</Button>
          <p className="text-sm text-muted">
            Une question ? {CONTACT.email} · {CONTACT.phone}
          </p>
        </Reveal>
      </div>
    </main>
  );
}
