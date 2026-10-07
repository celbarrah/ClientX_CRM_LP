"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TESTIMONIALS, TRUST, SUPPORT, USE_CASES } from "@/lib/content";
import { SECTOR_ICONS } from "@/components/Archive";
import { Accent, Eyebrow, Reveal, Sticker } from "@/components/ui";
import { cn } from "@/lib/utils";

/** Testimonials + trust + support in one section. */
export function Proof() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  const t = TESTIMONIALS[i];
  const Icon = SECTOR_ICONS[t.sector];
  const sector = USE_CASES.find((u) => u.key === t.sector)?.sector;
  const go = (d: number) => setI((v) => (v + d + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => go(1), 8000);
    return () => clearTimeout(id);
  }, [i, reduce]);

  return (
    <section className="relative isolate overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-paper [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]" />
      <div className="container-x">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow>Ils en parlent mieux que nous</Eyebrow>
        </Reveal>

        <div className="relative mx-auto mt-24 max-w-4xl text-center sm:mt-28">
          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-serif text-[9rem] leading-none text-brand/40 sm:-top-16 sm:text-[12rem]">
            “
          </span>
          <div className="relative min-h-[15rem] sm:min-h-[13rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="text-balance font-serif text-[1.9rem] leading-[1.15] sm:text-5xl">{t.quote}</blockquote>
                <figcaption className="mt-8 flex items-center justify-center gap-3">
                  <span className="grid size-11 place-items-center rounded-full bg-ink text-brand">
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <span className="text-left">
                    <span className="block font-semibold">{t.role}</span>
                    <span className="block text-sm text-muted">{sector}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <button onClick={() => go(-1)} aria-label="Témoignage précédent" className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:bg-ink hover:text-white">
              <ArrowLeft className="size-4" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, k) => (
                <button
                  key={k}
                  onClick={() => setI(k)}
                  aria-label={`Témoignage ${k + 1}`}
                  className={cn("h-1.5 rounded-full transition-all duration-500", k === i ? "w-8 bg-brand" : "w-3 bg-ink/15")}
                />
              ))}
            </div>
            <button onClick={() => go(1)} aria-label="Témoignage suivant" className="grid size-11 place-items-center rounded-full border border-line-strong transition-colors hover:bg-ink hover:text-white">
              <ArrowRight className="size-4" />
            </button>
          </div>
        </div>

        {/* Trust strip */}
        <Reveal className="mt-20 grid grid-cols-2 border-y border-line-strong lg:grid-cols-4">
          {TRUST.map((x, k) => (
            <div
              key={x.value}
              className={cn(
                "px-4 py-8 text-center",
                k % 2 === 1 && "border-l border-line-strong",
                k >= 2 && "border-t border-line-strong lg:border-t-0",
                k === 2 && "lg:border-l",
              )}
            >
              <p className="text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{x.value}</p>
              <p className="mx-auto mt-2 max-w-[22ch] text-[13px] leading-snug text-muted">{x.label}</p>
            </div>
          ))}
        </Reveal>

        {/* Support, written as an editorial line instead of three cards */}
        <Reveal className="mx-auto mt-16 max-w-4xl text-center">
          <p className="text-balance text-2xl font-medium leading-snug tracking-[-0.02em] sm:text-4xl">
            Et vous n&apos;êtes jamais seul : <Accent>onboarding 1:1</Accent>, support dédié et migration
            simplifiée par nos eXperts.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {SUPPORT.items.map((s, k) => (
              <Sticker key={s.title} rotate={[-4, 3, -2][k]} delay={0.1 * k} dark={k === 1}>
                {s.title}
              </Sticker>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
