"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  ...rest
}: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children, dark, className }: { children: React.ReactNode; dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em]",
        dark ? "border-white/12 bg-white/5 text-white/70" : "border-line bg-surface/80 text-ink-soft",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-brand animate-pulse-dot" />
      {children}
    </span>
  );
}

/** Serif italic accent word, the signature typographic gesture of the page. */
export function Accent({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span className={cn("font-serif font-normal italic tracking-normal", dark ? "text-brand" : "text-brand-deep")}>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  accent,
  subtitle,
  dark,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  accent?: string;
  subtitle?: string;
  dark?: boolean;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <Reveal className={cn("flex flex-col gap-5", align === "center" ? "items-center text-center" : "items-start", className)}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "max-w-3xl text-balance text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl lg:text-[3.5rem]",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title} {accent && <Accent dark={dark}>{accent}</Accent>}
      </h2>
      {subtitle && (
        <p className={cn("max-w-xl text-pretty text-base leading-relaxed sm:text-lg", dark ? "text-white/60" : "text-muted")}>
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "brand" | "ghost" | "light";
  size?: "md" | "lg";
  className?: string;
  icon?: boolean;
};

export function Button({ href, children, variant = "dark", size = "md", className, icon = true }: ButtonProps) {
  const styles = {
    dark: "bg-ink text-white hover:shadow-glow",
    brand: "bg-brand text-ink hover:bg-[#3ee83e] hover:shadow-glow",
    light: "bg-white text-ink hover:shadow-glow",
    ghost: "border border-line-strong bg-transparent text-ink hover:bg-surface",
  }[variant];
  const iconStyles = {
    dark: "bg-brand text-ink",
    brand: "bg-ink text-brand",
    light: "bg-ink text-brand",
    ghost: "bg-ink text-white",
  }[variant];

  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-tight transition-all duration-300 ease-out active:scale-[0.98]",
        size === "lg" ? "h-14 pl-7 pr-2 text-[15px]" : "h-11 pl-5 pr-1.5 text-sm",
        !icon && (size === "lg" ? "pr-7" : "pr-5"),
        styles,
        className,
      )}
    >
      <span>{children}</span>
      {icon && (
        <span
          className={cn(
            "grid place-items-center rounded-full transition-transform duration-300 group-hover:rotate-45",
            size === "lg" ? "size-10" : "size-8",
            iconStyles,
          )}
        >
          <ArrowUpRight className={size === "lg" ? "size-4.5" : "size-4"} strokeWidth={2.2} />
        </span>
      )}
    </a>
  );
}

export function Logo({ dark, className }: { dark?: boolean; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={dark ? "/logo-white.png" : "/logo-dark.png"}
      alt="ClientX AI"
      width={965}
      height={204}
      className={cn("h-7 w-auto", className)}
    />
  );
}

/** Tilted green tag that pops in like a sticker slapped on the page. */
export function Sticker({
  children,
  rotate = -6,
  delay = 0,
  dark,
  className,
}: {
  children: React.ReactNode;
  rotate?: number;
  delay?: number;
  dark?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, scale: 0.4, rotate: rotate - 18 }}
      whileInView={{ opacity: 1, scale: 1, rotate }}
      whileHover={{ rotate: rotate + 4, scale: 1.06 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 260, damping: 14, delay }}
      className={cn(
        "inline-flex select-none items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium tracking-tight shadow-sticker sm:text-sm",
        dark ? "bg-ink text-brand" : "bg-brand text-ink",
        className,
      )}
    >
      {children}
    </motion.span>
  );
}

/** Marker highlight with text-selection handles, sweeping in on view. */
export function Highlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className={cn("relative inline-block px-[0.12em]", className)}>
      <motion.span
        aria-hidden
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
        className="absolute inset-y-[0.06em] inset-x-0 origin-left bg-brand/30 ring-1 ring-brand/60"
      />
      <motion.span
        aria-hidden
        initial={reduce ? false : { opacity: 0, y: -6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="absolute -left-[0.18em] -top-[0.32em] flex flex-col items-center"
      >
        <svg viewBox="0 0 12 10" className="h-[0.22em] w-[0.26em] text-brand" fill="currentColor"><path d="M0 0h12L6 10z" /></svg>
        <span className="h-[0.9em] w-[2px] bg-brand" />
      </motion.span>
      <motion.span
        aria-hidden
        initial={reduce ? false : { opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1 }}
        className="absolute -bottom-[0.32em] -right-[0.18em] flex flex-col items-center"
      >
        <span className="h-[0.9em] w-[2px] bg-brand" />
        <svg viewBox="0 0 12 10" className="h-[0.22em] w-[0.26em] text-brand" fill="currentColor"><path d="M6 0l6 10H0z" /></svg>
      </motion.span>
      <span className="relative">{children}</span>
    </span>
  );
}

/** Small target / cursor glyph used next to stickers. */
export function Target({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-6 text-brand", className)} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1.2" fill="currentColor" />
      <path d="M15 9l5-5M17 4h3v3" strokeLinecap="round" />
    </svg>
  );
}
