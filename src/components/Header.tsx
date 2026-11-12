"use client";

import { useEffect, useState } from "react";
import { copy, homeOf, type Lang } from "@/lib/i18n";
import { Button, Logo } from "@/components/ui";
import { LangSwitch } from "@/components/LangSwitch";
import { cn, navHref } from "@/lib/utils";

/** `home`: rendered on the home page, where section links scroll instead of navigating. */
export function Header({ home = true, lang = "fr" }: { home?: boolean; lang?: Lang }) {
  const { NAV, CTA, UI } = copy(lang);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    // Passive listener; React skips the render when the boolean doesn't change.
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1440px] items-center justify-between rounded-full border pl-5 pr-2",
          scrolled || open ? "border-line bg-canvas/95 shadow-card" : "border-transparent",
        )}
      >
        <a href={home ? "#top" : homeOf(lang)} aria-label={UI.home}>
          <Logo className="h-6 sm:h-7" />
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={navHref(n.href, home, lang)}
              className="rounded-full px-4 py-2 text-sm text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangSwitch lang={lang} label={UI.langSwitch} className="max-sm:hidden" />
          <Button href={navHref("#demo", home, lang)} className="max-sm:pl-4 max-sm:text-[13px]">
            {CTA.primary}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full text-ink hover:bg-ink/5 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile menu: full-screen sheet under the header bar. */}
      <div
        className={cn(
          "fixed inset-0 -z-10 flex flex-col bg-canvas px-6 pb-8 pt-28 transition-all duration-300 md:hidden",
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
        )}
      >
        <nav className="flex flex-col">
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={navHref(n.href, home, lang)}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              className={cn(
                "group flex items-center justify-between border-b border-line py-5 text-[26px] font-medium tracking-tight text-ink transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
            >
              {n.label}
              <svg viewBox="0 0 24 24" className="size-5 text-ink-soft transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <div onClick={() => setOpen(false)}>
            <Button href={navHref("#demo", home, lang)} className="w-full justify-center py-4 text-base">
              {CTA.primary}
            </Button>
          </div>
          <div className="flex justify-center">
            <LangSwitch lang={lang} label={UI.langSwitch} />
          </div>
        </div>
      </div>
    </header>
  );
}
