"use client";

import { useEffect, useState } from "react";
import { Check, Minus, Sparkles, Wallet } from "lucide-react";
import type { Billing, Currency } from "@/lib/content";
import { copy, type Lang } from "@/lib/i18n";
import { detectCountry } from "@/lib/geo";
import { Button, Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/lib/utils";

/** Pill switch shared by the billing period and the currency. */
function Switch<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: Record<T, { label: string }>; onChange: (v: T) => void }) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-full border border-line-strong bg-surface p-1">
      {(Object.keys(options) as T[]).map((o) => (
        <button
          key={o}
          type="button"
          role="radio"
          aria-checked={value === o}
          onClick={() => onChange(o)}
          className={cn("rounded-full px-5 py-2 text-[13px] font-medium", value === o ? "bg-ink text-white" : "text-ink-soft")}
        >
          {options[o].label}
        </button>
      ))}
    </div>
  );
}

export function Pricing({ lang = "fr" }: { lang?: Lang }) {
  const { PRICING, CTA, CURRENCIES, BILLING, UI } = copy(lang);
  const t = UI.pricing;
  // Everyone sees euros. Visitors in Morocco get DH by default plus a switch.
  const [inMorocco, setInMorocco] = useState(false);
  const [currency, setCurrency] = useState<Currency>("eur");
  const [billing, setBilling] = useState<Billing>("monthly");

  useEffect(() => {
    detectCountry().then((c) => {
      if (c !== "MA") return;
      setInMorocco(true);
      setCurrency("mad");
    });
  }, []);

  const symbol = CURRENCIES[currency].symbol;
  // France pays online with the payment links; Morocco books a demo and pays by invoice afterwards.
  const buysOnline = currency === "eur";
  const setup = `${PRICING.setup[currency]} ${symbol}`;
  const terms =
    billing === "monthly"
      ? t.monthlyTerms(setup)
      : t.yearlyTerms(setup); // the setup fee is charged on yearly plans too (France and Morocco)

  return (
    <section id="tarifs" className="scroll-mt-24 py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          accent={t.accent}
          subtitle={t.subtitle}
        />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Switch label={t.billing} value={billing} options={BILLING} onChange={setBilling} />
          {inMorocco && <Switch label={t.currency} value={currency} options={CURRENCIES} onChange={setCurrency} />}
        </div>

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-3">
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
                <div className="pointer-events-none absolute -top-16 left-1/2 h-40 w-2/3 -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(50_220_50/0.52),transparent)]" />
              )}
              <div className={cn("relative flex flex-1 flex-col rounded-[1.6rem] p-7 sm:p-8", p.popular ? "text-white" : "")}>
                <div className="flex items-center justify-between">
                  <h3 className="font-mono text-[12px] uppercase tracking-[0.16em]">{p.name}</h3>
                  {p.popular && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand px-3 py-1 text-[12px] font-semibold text-ink">
                      <Sparkles className="size-3.5" /> {t.popular}
                    </span>
                  )}
                </div>
                <p className={cn("mt-3 text-[15px] italic", p.popular ? "text-white/70" : "text-ink-soft")}>{p.problem}</p>
                <p className="mt-8 flex flex-wrap items-baseline gap-1.5">
                  <span className="flex items-baseline gap-1.5 whitespace-nowrap">
                    <span className="text-5xl font-semibold tracking-[-0.05em] tabular-nums sm:text-6xl">{p.price[billing][currency]}</span>
                    <span className="text-2xl font-semibold">{symbol}</span>
                  </span>
                  <span className={cn("ml-1 text-sm", p.popular ? "text-white/50" : "text-muted")}>/ {BILLING[billing].unit}</span>
                </p>
                <p className={cn("mt-3 text-[13px]", p.popular ? "text-white/60" : "text-muted")}>{terms}</p>
                <div className={cn("my-8 h-px", p.popular ? "bg-white/10" : "bg-line")} />
                {p.intro && <p className={cn("mb-3.5 text-[14px] font-medium", p.popular ? "text-white/70" : "text-ink-soft")}>{p.intro}</p>}
                <ul className="grid gap-3.5 text-[15px]">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-ink">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="font-medium">{f}</span>
                    </li>
                  ))}
                  {p.note && (
                    <li className={cn("flex items-center gap-3", p.popular ? "text-white/50" : "text-muted")}>
                      <span className={cn("grid size-5 shrink-0 place-items-center rounded-full", p.popular ? "bg-white/10" : "bg-line")}>
                        <Minus className="size-3" strokeWidth={3} />
                      </span>
                      {p.note}
                    </li>
                  )}
                </ul>
                <div className="mt-auto pt-10">
                  <Button href={buysOnline ? p.paymentLinks[billing] : "#demo"} variant={p.popular ? "brand" : "dark"} className="w-full justify-between">
                    {buysOnline ? t.choose(p.name) : CTA.primary}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-3 rounded-2xl border border-line bg-surface px-6 py-5 text-center sm:flex-row sm:text-left">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ink text-brand">
            <Wallet className="size-4" />
          </span>
          <p className="text-[14px] leading-relaxed text-ink-soft">
            <span className="font-medium text-ink">{PRICING.credits.offer}</span> {PRICING.credits.text}
            {!buysOnline && <span className="mt-1 block font-medium text-ink">{t.vat}</span>}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
