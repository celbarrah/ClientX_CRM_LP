"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { NAV, CTA } from "@/lib/content";
import { Button, Logo } from "@/components/ui";
import { cn } from "@/lib/utils";

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
    >
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1440px] items-center justify-between rounded-full pl-5 pr-2 transition-all duration-500",
          scrolled ? "border border-line bg-canvas/95 shadow-card" : "border border-transparent",
        )}
      >
        <a href="#top" aria-label="ClientX AI — accueil">
          <Logo className="h-6 sm:h-7" />
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-2 text-sm text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <Button href="#demo" className="max-sm:pl-4 max-sm:text-[13px]">
          {CTA.primary}
        </Button>
      </div>
    </motion.header>
  );
}
