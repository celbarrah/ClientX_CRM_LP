import { CLIENTS } from "@/lib/content";
import { cn } from "@/lib/utils";

const HALF = Math.ceil(CLIENTS.length / 2);
const ROWS = [CLIENTS.slice(0, HALF), CLIENTS.slice(HALF)];

export function LogoMarquee() {
  return (
    <div aria-label="Ils nous font confiance" className="border-y border-line py-10">
      <p className="container-x mb-8 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
        Plus de 50 grandes marques & institutions nous font confiance
      </p>
      <div className="grid gap-6 sm:gap-8">
        {ROWS.map((row, r) => (
          <div key={r} className="mask-fade-x group flex overflow-hidden">
            {/* Two identical copies make the loop seamless */}
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1}
                className={cn(
                  "flex shrink-0 items-center gap-12 pr-12 group-hover:[animation-play-state:paused] sm:gap-16 sm:pr-16",
                  r === 0 ? "animate-marquee" : "animate-marquee-reverse",
                )}
              >
                {row.map((c) => (
                  <li key={c.name} className="shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.src}
                      alt={copy === 0 ? c.name : ""}
                      title={c.name}
                      width={260}
                      height={108}
                      loading="lazy"
                      decoding="async"
                      className={cn(
                        "h-11 w-auto object-contain transition-all duration-500 hover:scale-105 hover:opacity-100 hover:filter-none sm:h-14",
                        c.tone === "gray" ? "opacity-55 grayscale" : "opacity-45 brightness-0",
                      )}
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
