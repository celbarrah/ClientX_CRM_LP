"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Check } from "lucide-react";
import { MODULES, CTA } from "@/lib/content";
import { Accent, Button, Eyebrow, Reveal, Sticker } from "@/components/ui";
import { ModuleMock } from "@/components/mocks";
import { cn } from "@/lib/utils";

const DURATION = 7000;
const EASE = [0.22, 1, 0.36, 1] as const;

/** All six modules in one interactive section (replaces the engine + six alternating blocks). */
export function ModulesTabs() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20%" });
  const reduce = useReducedMotion();
  const running = inView && !paused && !reduce;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % MODULES.length), DURATION);
    return () => clearTimeout(t);
  }, [active, running]);

  const m = MODULES[active];

  return (
    <section id="modules" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="container-x">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow>Capturer → Nourrir → Conclure</Eyebrow>
          <h2 className="mt-6 max-w-3xl text-balance text-[2.4rem] font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl">
            Une plateforme, <Accent>six super-pouvoirs</Accent>
          </h2>
        </Reveal>

        <div
          ref={ref}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12"
        >
          {/* Tab list */}
          <div className="lg:col-span-5">
            <div
              role="tablist"
              data-lenis-prevent
              className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-slim lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
            >
              {MODULES.map((mod, i) => {
                const on = i === active;
                const label = mod.eyebrow.split("— ")[1];
                return (
                  <button
                    key={mod.key}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setActive(i)}
                    className={cn(
                      "group relative shrink-0 text-left transition-colors",
                      "rounded-full border px-4 py-2 text-sm lg:rounded-none lg:border-0 lg:border-t lg:px-0 lg:py-5",
                      on ? "border-ink bg-ink text-white lg:border-line-strong lg:bg-transparent lg:text-ink" : "border-line-strong text-ink-soft lg:border-line-strong",
                    )}
                  >
                    {/* progress bar on the divider (desktop) */}
                    <span className="absolute inset-x-0 -top-px hidden h-[2px] overflow-hidden lg:block">
                      {on && (
                        <motion.span
                          key={`${active}-${running}`}
                          initial={{ scaleX: running ? 0 : 1 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: running ? DURATION / 1000 : 0, ease: "linear" }}
                          className="block h-full origin-left bg-brand"
                        />
                      )}
                    </span>
                    <span className="flex items-baseline gap-4">
                      <span className={cn("hidden font-mono text-[11px] lg:inline", on ? "text-brand-deep" : "text-muted")}>
                        0{i + 1}
                      </span>
                      <span
                        className={cn(
                          "font-semibold tracking-tight lg:text-3xl lg:tracking-[-0.03em]",
                          !on && "lg:text-ink/35 lg:group-hover:text-ink/70",
                        )}
                      >
                        {label}
                      </span>
                    </span>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease: EASE }}
                          className="hidden overflow-hidden lg:block"
                        >
                          <p className="pl-9 pt-3 text-[15px] leading-relaxed text-muted">{mod.subtitle}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Visual + bullets */}
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface p-6 sm:p-10">
              <div className="pointer-events-none absolute inset-0 bg-paper opacity-80" />
              <div className="pointer-events-none absolute -bottom-16 left-1/2 h-48 w-2/3 -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" />
              <div className="absolute right-5 top-5 z-20">
                <AnimatePresence mode="wait">
                  <motion.div key={m.key} exit={{ opacity: 0, scale: 0.8 }}>
                    <Sticker rotate={5}>
                      {m.title} {m.accent}
                    </Sticker>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="relative min-h-[340px] pt-10 sm:min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={m.key}
                    initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <ModuleMock name={m.key} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={m.key}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 grid gap-4 sm:grid-cols-3"
              >
                {m.bullets.map((b, i) => (
                  <motion.li
                    key={b.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                    className="border-t border-line-strong pt-4"
                  >
                    <span className="flex items-center gap-2 font-semibold tracking-tight">
                      <Check className="size-4 text-brand-deep" strokeWidth={3} /> {b.title}
                    </span>
                    <span className="mt-1.5 block text-[14px] leading-relaxed text-muted">{b.text}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </div>

        <Reveal className="mt-14 flex justify-center">
          <Button href="#demo" size="lg">{CTA.primary}</Button>
        </Reveal>
      </div>
    </section>
  );
}
