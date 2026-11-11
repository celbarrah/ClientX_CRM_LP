"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { copy, type Lang } from "@/lib/i18n";
import { Reveal, SectionHeading, Sticker } from "@/components/ui";
import { cn } from "@/lib/utils";

export function Faq({ items, lang = "fr" }: { items?: readonly { q: string; a: string }[]; lang?: Lang }) {
  const { FAQ, CONTACT, UI } = copy(lang);
  const list = items ?? FAQ;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="scroll-mt-24 pb-24 pt-8 sm:pb-32 sm:pt-12">
      <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading align="left" eyebrow={UI.faq.eyebrow} title={UI.faq.title} accent={UI.faq.accent} />
          <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center gap-3 text-muted">
            {UI.faq.other}
            <a href={`mailto:${CONTACT.email}`}>
              <Sticker rotate={-3}>{CONTACT.email}</Sticker>
            </a>
          </Reveal>
        </div>
        <div className="border-b border-line-strong lg:col-span-7">
          {list.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.06} className="border-t border-line-strong">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className={cn("font-mono text-[11px]", isOpen ? "text-brand-deep" : "text-muted")}>0{i + 1}</span>
                    <span className="text-lg font-semibold tracking-tight sm:text-xl">{f.q}</span>
                  </span>
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full border",
                      isOpen ? "rotate-45 border-brand bg-brand text-ink" : "border-line-strong group-hover:bg-ink group-hover:text-white",
                    )}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
                {isOpen && <p className="max-w-2xl pb-7 pl-8 text-[15px] leading-relaxed text-muted">{f.a}</p>}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
