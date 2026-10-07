import { Check, Sparkles } from "lucide-react";
import { PRICING, CTA } from "@/lib/content";
import { Button, Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="tarifs" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Tarifs"
          title="Combien coûte"
          accent="ClientX AI ?"
          subtitle="Des formules annuelles simples et transparentes. 0 € de coûts cachés."
        />

        <div className="mt-16 grid items-stretch gap-4 lg:grid-cols-3">
          {PRICING.plans.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 0.1}
              className={cn(
                "relative flex flex-col rounded-[2rem] p-1.5",
                p.popular ? "bg-ink shadow-float lg:-my-4" : "border border-line bg-surface",
              )}
            >
              {p.popular && (
                <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-2/3 -translate-x-1/2 rounded-full bg-brand/40 blur-[70px]" />
              )}
              <div className={cn("relative flex flex-1 flex-col rounded-[1.6rem] p-7 sm:p-8", p.popular ? "text-white" : "")}>
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-[12px] uppercase tracking-[0.16em]">{p.name}</h3>
                  {p.popular && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[12px] font-semibold text-ink">
                      <Sparkles className="size-3.5" /> Le plus populaire
                    </span>
                  )}
                </div>
                <p className={cn("mt-3 text-[15px]", p.popular ? "text-white/60" : "text-muted")}>{p.tagline}</p>
                <p className="mt-8 flex items-baseline gap-1.5">
                  <span className="text-6xl font-semibold tracking-[-0.05em] tabular-nums">{p.price}</span>
                  <span className="text-2xl font-semibold">€</span>
                  <span className={cn("ml-1 text-sm", p.popular ? "text-white/50" : "text-muted")}>/ an</span>
                </p>
                <div className={cn("my-8 h-px", p.popular ? "bg-white/10" : "bg-line")} />
                <ul className="grid gap-3.5 text-[15px]">
                  {[...p.features, ...PRICING.included].map((f, fi) => (
                    <li key={f} className="flex items-center gap-3">
                      <span
                        className={cn(
                          "grid size-5 shrink-0 place-items-center rounded-full",
                          fi < p.features.length ? "bg-brand text-ink" : p.popular ? "bg-white/10 text-brand" : "bg-brand-soft text-brand-deep",
                        )}
                      >
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className={cn(fi < p.features.length && "font-medium")}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  <Button href="#demo" variant={p.popular ? "brand" : "dark"} className="w-full justify-between">
                    {CTA.primary}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-line bg-surface px-6 py-5 text-center sm:flex-row sm:text-left">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-brand">
            <Sparkles className="size-4" />
          </span>
          <p className="text-[14px] leading-relaxed text-ink-soft">
            <span className="font-medium text-ink">Tous les plans sont facturés annuellement.</span> {PRICING.aiNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
