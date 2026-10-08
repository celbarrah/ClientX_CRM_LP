

import { Check, X } from "lucide-react";
import { TOOLS, CTA } from "@/lib/content";
import { Button, Logo, Reveal, SectionHeading } from "@/components/ui";

export function ToolsVsPlatform() {
  return (
    <section className="py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="+20 outils vs 1 plateforme"
          title="Arrêtez de payer pour"
          accent="20 outils"
          subtitle="Chaque abonnement en moins, c'est une connexion, une facture et une source d'erreurs en moins."
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-5">
          <Reveal className="rounded-[2rem] border border-line bg-surface p-6 sm:p-8 lg:col-span-3">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Aujourd'hui</p>
              <span className="rounded-full bg-red-50 px-3 py-1 text-[12px] font-medium text-red-600">+20 abonnements</span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight">Votre stack actuelle</h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {TOOLS.map((t) => (
                <li
                  key={t}
                  className="relative inline-flex items-center gap-1.5 rounded-full border border-line bg-canvas px-3 py-1.5 text-[13px] text-ink-soft"
                >
                  <X className="size-3 text-red-500" strokeWidth={2.6} />
                  <span className="line-through decoration-ink/40">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.15}
            className="grain relative flex flex-col overflow-hidden rounded-[2rem] bg-ink p-6 text-white sm:p-8 lg:col-span-2"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-[radial-gradient(closest-side,rgb(50_220_50/0.39),transparent)]" />
            <p className="relative font-mono text-[11px] uppercase tracking-[0.14em] text-brand">Avec ClientX AI</p>
            <Logo dark className="relative mt-5 h-8 self-start" />
            <p className="relative mt-4 text-white/60">Une seule plateforme, pilotée par l'IA.</p>
            <ul className="relative mt-7 grid gap-3">
              {["1 abonnement, 1 connexion", "1 base de données client unifiée", "1 équipe support dédiée", "Données chiffrées, conformes RGPD"].map((x) => (
                <li key={x} className="flex items-center gap-3 text-[15px]">
                  <span className="grid size-5 place-items-center rounded-full bg-brand text-ink">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
            <div className="relative mt-auto pt-10">
              <p className="text-sm text-white/50">Économies estimées</p>
              <p className="mt-1 text-5xl font-semibold tracking-[-0.05em]">
                15 000 €<span className="text-brand">+</span>
                <span className="ml-2 text-lg font-normal tracking-normal text-white/50">/ an</span>
              </p>
              <Button href="#demo" variant="brand" className="mt-7 w-full justify-between">
                {CTA.primary}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
