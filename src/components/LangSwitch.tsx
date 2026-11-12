"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { pathIn, type Lang } from "@/lib/lang";
import { cn } from "@/lib/utils";

const LANGS: Lang[] = ["fr", "en"];

/**
 * FR / EN links to the same page in the other language. The link carries ?lang=, which the server remembers
 * (cookie), so the visitor's choice wins over the IP country afterwards. UTMs and other parameters are kept.
 */
export function LangSwitch({ lang, label, dark, className }: { lang: Lang; label: string; dark?: boolean; className?: string }) {
  const pathname = usePathname();
  const [search, setSearch] = useState("");
  useEffect(() => setSearch(window.location.search), []);

  const href = (l: Lang) => {
    const q = new URLSearchParams(search);
    q.set("lang", l);
    return `${pathIn(pathname || "/", l)}?${q}`;
  };

  return (
    <nav aria-label={label} className={cn("flex items-center rounded-full border p-0.5 text-[12px] font-medium", dark ? "border-white/15" : "border-line-strong", className)}>
      {LANGS.map((l) => (
        <a
          key={l}
          href={href(l)}
          hrefLang={l}
          lang={l}
          aria-current={l === lang ? "true" : undefined}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase",
            l === lang ? (dark ? "bg-white text-ink" : "bg-ink text-white") : dark ? "text-white/60 hover:text-white" : "text-ink-soft hover:text-ink",
          )}
        >
          {l}
        </a>
      ))}
    </nav>
  );
}
