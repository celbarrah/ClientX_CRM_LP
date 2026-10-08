import { Check } from "lucide-react";
import { THANK_YOU } from "@/lib/content";
import type { Market } from "@/lib/market";
import { Accent, Button, Eyebrow, Logo } from "@/components/ui";
import { LeadConfirmed } from "@/app/merci/LeadConfirmed";

/** Shared layout of the two thank-you pages (/merci and /merci-maroc). */
export function ThankYou({ market }: { market: Market }) {
  const t = THANK_YOU[market];
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
        <span className="mx-auto grid size-20 place-items-center rounded-full bg-brand text-ink shadow-glow">
          <Check className="size-9" strokeWidth={2.6} />
        </span>
        <Eyebrow className="mt-8">{t.eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-3xl text-balance text-[2.6rem] font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl">
          Merci<LeadConfirmed market={market} /> ! Votre demande est <Accent>bien reçue</Accent>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-muted">Voici les prochaines étapes.</p>

        <div className="mt-14 grid w-full max-w-4xl gap-4 text-left md:grid-cols-3">
          {t.steps.map((s, i) => (
            <div key={s.title} className="h-full rounded-3xl border border-line bg-surface p-7">
              <span className="grid size-10 place-items-center rounded-full bg-ink font-mono text-sm text-brand">{i + 1}</span>
              <h2 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4">
          <Button href="/" variant="ghost">Retour au site</Button>
          <p className="text-sm text-muted">
            Une question ? {t.email} · {t.phone}
          </p>
        </div>
      </div>
    </main>
  );
}
