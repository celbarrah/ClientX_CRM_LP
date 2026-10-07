"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Building2, Car, Dumbbell, GraduationCap, Home,
  ShoppingBag, Sun, UtensilsCrossed, X, type LucideIcon,
} from "lucide-react";
import { USE_CASES, CTA, type SectorKey } from "@/lib/content";
import { Accent, Eyebrow, Reveal, Sticker } from "@/components/ui";
import { cn } from "@/lib/utils";

const ICONS: Record<SectorKey, LucideIcon> = {
  assurance: Building2,
  auto: Car,
  ecoles: GraduationCap,
  ecommerce: ShoppingBag,
  energie: Sun,
  immobilier: Home,
  restauration: UtensilsCrossed,
  bienetre: Dumbbell,
};

const EASE = [0.22, 1, 0.36, 1] as const;
const TOTAL = USE_CASES.reduce((n, s) => n + s.cases.length, 0);

export function Archive() {
  const [open, setOpen] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const lenis = useLenis();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open === null) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % USE_CASES.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + USE_CASES.length) % USE_CASES.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  return (
    <section id="cas-usage" className="relative isolate scroll-mt-24 overflow-hidden bg-ink py-24 text-white sm:py-32">
      <div className="absolute inset-0 -z-10 bg-grid-dark [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[1000px] max-w-[160vw] -translate-x-1/2 rounded-full bg-brand/15 blur-[130px]" />

      <div className="container-x">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow dark>Archives · Cas d&apos;usage</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-balance text-[2.4rem] font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl">
            Ouvrez le dossier de <Accent dark>votre secteur</Accent>
          </h2>
          <p className="mt-5 max-w-lg text-white/55 sm:text-lg">
            Des workflows concrets, déjà éprouvés. Cliquez sur un dossier pour l&apos;ouvrir.
          </p>
          <div className="mt-6">
            <Sticker rotate={-4}>
              {USE_CASES.length} secteurs · {TOTAL} cas d&apos;usage
            </Sticker>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4">
          {USE_CASES.map((s, i) => (
            <Reveal key={s.key} delay={(i % 4) * 0.07} y={30}>
              <Folder index={i} onOpen={() => setOpen(i)} />
            </Reveal>
          ))}
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>{open !== null && <OpenedFolder index={open} setIndex={setOpen} />}</AnimatePresence>,
          document.body,
        )}
    </section>
  );
}

function Folder({ index, onOpen }: { index: number; onOpen: () => void }) {
  const s = USE_CASES[index];
  const Icon = ICONS[s.key];
  const reduce = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      initial="rest"
      animate="rest"
      whileHover={reduce ? undefined : "hover"}
      whileTap={{ scale: 0.97 }}
      aria-label={`Ouvrir le dossier ${s.sector}`}
      className="group relative block aspect-[5/4] w-full text-left [perspective:1100px]"
    >
      {/* Back panel + tab */}
      <div className="absolute left-0 top-0 h-[16%] w-[44%] rounded-t-xl border border-b-0 border-brand/40 bg-brand/25" />
      <div className="absolute inset-x-0 bottom-0 top-[10%] rounded-2xl rounded-tl-none border border-brand/40 bg-gradient-to-b from-brand/30 to-brand/10" />

      {/* Papers peeking out */}
      <motion.div
        variants={{ rest: { y: 0, rotate: -4 }, hover: { y: "-16%", rotate: -8 } }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute left-[9%] right-[22%] top-[6%] bottom-[30%] overflow-hidden rounded-lg bg-[#121512] p-3 shadow-float ring-1 ring-white/10"
      >
        <Icon className="size-5 text-brand" strokeWidth={1.7} />
        <div className="mt-3 h-1.5 w-2/3 rounded-full bg-white/25" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/15" />
        <div className="absolute -bottom-6 -right-6 size-20 rounded-full bg-brand/40 blur-2xl" />
      </motion.div>
      <motion.div
        variants={{ rest: { y: 0, rotate: 3 }, hover: { y: "-24%", rotate: 6 } }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.03 }}
        className="absolute left-[24%] right-[8%] top-[10%] bottom-[30%] rounded-lg bg-canvas p-3 text-ink shadow-float"
      >
        <p className="font-mono text-[9px] uppercase tracking-wider text-brand-deep">Cas 01</p>
        <p className="mt-1 line-clamp-2 text-[11px] font-semibold leading-tight sm:text-[12px]">{s.cases[0].title}</p>
        <div className="mt-2 h-1 w-3/4 rounded-full bg-ink/10" />
        <div className="mt-1 h-1 w-1/2 rounded-full bg-ink/10" />
      </motion.div>

      {/* Count badge */}
      <span className="absolute right-[5%] top-[13%] z-10 grid size-7 place-items-center rounded-full bg-canvas font-mono text-[10px] font-semibold text-ink shadow-sticker">
        {String(s.cases.length).padStart(2, "0")}
      </span>

      {/* Glass front flap */}
      <motion.div
        variants={{ rest: { rotateX: -8 }, hover: { rotateX: -26 } }}
        transition={{ duration: 0.55, ease: EASE }}
        style={{ transformOrigin: "50% 100%" }}
        className="absolute inset-x-0 bottom-0 z-20 flex h-[64%] flex-col justify-end overflow-hidden rounded-2xl border border-white/25 bg-gradient-to-b from-brand/45 via-brand/25 to-brand/15 p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.45),0_24px_50px_-16px_rgba(50,220,50,0.45)] backdrop-blur-md sm:p-5"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent" />
        <p className="relative font-mono text-[9px] uppercase tracking-[0.14em] text-white/80 sm:text-[10px]">
          {String(index + 1).padStart(2, "0")} — {s.cases.length} cas d&apos;usage
        </p>
        <p className="relative mt-1 text-balance text-[15px] font-semibold leading-[1.05] tracking-[-0.02em] text-white drop-shadow sm:text-xl">
          {s.sector}
        </p>
        <span className="absolute bottom-3.5 right-3.5 grid size-7 place-items-center rounded-full bg-ink/80 text-brand transition-transform duration-500 group-hover:rotate-45 sm:bottom-5 sm:right-5 sm:size-8">
          <ArrowUpRight className="size-3.5 sm:size-4" />
        </span>
      </motion.div>
    </motion.button>
  );
}

function OpenedFolder({ index, setIndex }: { index: number; setIndex: (i: number | null) => void }) {
  const s = USE_CASES[index];
  const Icon = ICONS[s.key];
  const lenis = useLenis();
  const go = useCallback(
    (d: number) => setIndex((index + d + USE_CASES.length) % USE_CASES.length),
    [index, setIndex],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/70 backdrop-blur-md sm:items-center sm:p-6"
      onClick={() => setIndex(null)}
      role="dialog"
      aria-modal="true"
      aria-label={`Cas d'usage — ${s.sector}`}
    >
      <motion.div
        initial={{ y: 80, scale: 0.92, rotateX: 12, opacity: 0 }}
        animate={{ y: 0, scale: 1, rotateX: 0, opacity: 1 }}
        exit={{ y: 60, scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative max-h-[92dvh] w-full max-w-5xl overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-slim rounded-t-[2rem] bg-canvas text-ink shadow-float sm:rounded-[2rem]"
      >
        <div className="pointer-events-none absolute inset-0 bg-paper" />
        <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-brand/35 blur-[90px]" />

        {/* Folder tab header */}
        <div className="relative flex items-start justify-between gap-4 p-6 sm:p-10">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink text-brand sm:size-14">
              <Icon className="size-6" strokeWidth={1.7} />
            </span>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-deep">
                Dossier {String(index + 1).padStart(2, "0")} / {String(USE_CASES.length).padStart(2, "0")}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="mt-1 text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">{s.sector}</h3>
                  <p className="mt-2 font-serif text-xl italic text-ink-soft sm:text-2xl">{s.tagline}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <button
            onClick={() => setIndex(null)}
            aria-label="Fermer"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong transition-colors hover:bg-ink hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Documents */}
        <AnimatePresence mode="wait">
          <motion.div key={s.key} className="relative grid gap-4 px-6 sm:grid-cols-2 sm:px-10">
            {s.cases.map((c, i) => (
              <motion.article
                key={c.title}
                initial={{ opacity: 0, y: 60, rotate: i % 2 ? 6 : -6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, rotate: i % 2 ? 0.8 : -0.8, scale: 1 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.15 } }}
                whileHover={{ rotate: 0, y: -4 }}
                transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.1 + i * 0.07 }}
                className="relative rounded-2xl border border-line bg-surface p-6 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
                    Cas {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="size-2 rounded-full bg-brand" />
                </div>
                <h4 className="mt-4 text-xl font-semibold leading-tight tracking-tight">{c.title}</h4>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.text}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {c.tags.map((t, ti) => (
                    <span
                      key={t}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[12px] font-medium",
                        ti === 0 ? "bg-brand text-ink" : "border border-line-strong text-ink-soft",
                      )}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer: navigation + CTA */}
        <div className="relative flex flex-col-reverse items-stretch gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex items-center gap-2">
            <button onClick={() => go(-1)} aria-label="Dossier précédent" className="grid size-12 place-items-center rounded-full border border-line-strong transition-colors hover:bg-ink hover:text-white">
              <ArrowLeft className="size-4" />
            </button>
            <button onClick={() => go(1)} aria-label="Dossier suivant" className="grid size-12 place-items-center rounded-full border border-line-strong transition-colors hover:bg-ink hover:text-white">
              <ArrowRight className="size-4" />
            </button>
            <span className="ml-2 text-sm text-muted">{USE_CASES[(index + 1) % USE_CASES.length].sector} →</span>
          </div>
          <a
            href="#demo"
            onClick={(e) => {
              e.preventDefault();
              setIndex(null);
              setTimeout(() => lenis?.scrollTo("#demo", { offset: -88 }), 350);
            }}
            className="group inline-flex h-14 items-center justify-between gap-4 rounded-full bg-ink pl-6 pr-2 font-medium text-white transition-shadow hover:shadow-glow"
          >
            {CTA.primary} pour ce secteur
            <span className="grid size-10 place-items-center rounded-full bg-brand text-ink transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="size-4" />
            </span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
