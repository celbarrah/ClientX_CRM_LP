"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { detectCountry, knownCountry } from "@/lib/geo";
import { PHONE_COUNTRIES, OTHER, findCountry, normalizePhone } from "@/lib/phone";
import type { Copy } from "@/lib/i18n";

type FormText = Copy["UI"]["form"];

/** Help text under the phone field, e.g. "9 chiffres après +212". */
export function phoneHint(code: string, t: FormText) {
  const c = findCountry(code);
  if (!c) return t.phoneFull;
  return t.phoneDigits(c.min === c.max ? `${c.min}` : t.range(c.min, c.max), c.dial);
}

// Form building blocks shared by the demo form and the partner application form.

export const inputCls = (invalid: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-canvas px-4 text-[15px] text-ink outline-none placeholder:text-ink/30",
    "focus:border-ink focus:shadow-[0_0_0_4px_rgb(50_220_50/0.22)]",
    invalid ? "border-red-400" : "border-line-strong hover:border-ink/30",
  );

export const submitCls =
  "group mt-1 inline-flex h-14 w-full items-center justify-between rounded-full bg-ink pl-6 pr-2.5 text-[15px] font-medium text-white hover:shadow-glow disabled:opacity-80";

export function Field({
  label,
  error,
  hint,
  group,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  group?: boolean;
  children: React.ReactNode;
}) {
  const Tag = group ? "div" : "label";
  return (
    <Tag className="grid gap-1.5">
      <span className="text-[13px] font-medium text-ink-soft">{label}</span>
      {children}
      {error && (
        <span className="text-[12px] text-red-500">
          {error}
          {hint && <span className="text-muted"> ({hint})</span>}
        </span>
      )}
    </Tag>
  );
}

/**
 * Phone: country selector (preset from the visitor's IP country) + digits only.
 * `onNumber` receives the E.164 number ("+212691357226") built from both, and whether the field was tidied
 * (blur / paste / country change), i.e. whether it should be validated now.
 * No default country: the selector stays blank (space reserved) until the real one is known,
 * so a Moroccan visitor never sees +33 switch to +212.
 */
export function usePhone(onNumber: (e164: string, tidy: boolean) => void) {
  const [detected, setDetected] = useState<string | null>(null);
  const country = detected ?? "FR";
  const [digits, setDigits] = useState("");
  const picked = useRef(false);
  // Layout effect: runs before the browser paints, so an already-known country shows on the first frame.
  useLayoutEffect(() => {
    const now = findCountry(knownCountry());
    if (now) setDetected(now.code);
    detectCountry()
      .then((c) => {
        if (picked.current) return;
        // Country outside the list: "Autre pays", where the visitor types the full international number.
        setDetected(findCountry(c)?.code ?? (c ? OTHER : now?.code ?? "FR"));
      })
      .catch(() => setDetected((v) => v ?? "FR"));
  }, []);
  const update = (raw: string, c: string, tidy = false) => {
    const n = normalizePhone(raw, c);
    if (n.country !== c) {
      picked.current = true;
      setDetected(n.country);
    }
    // While typing, keep what was typed (digits only, so a leading 0 stays visible); tidy up on blur/paste.
    setDigits(tidy ? n.national : raw.replace(/\D/g, "").slice(0, 15));
    onNumber(n.e164, tidy);
  };

  return {
    country,
    inputProps: {
      country: detected,
      digits,
      onCountry: (c: string) => {
        picked.current = true;
        setDetected(c);
        update(digits, c, digits.length > 0);
      },
      onInput: (raw: string, pasted: boolean) => update(raw, country, pasted),
      onBlur: () => update(digits, country, true),
    },
  };
}

/**
 * Country selector + national number. Digits only: letters, spaces and symbols are dropped as they are typed.
 * A pasted number keeps its own country code ("+33 6…" switches the selector to France).
 */
export function PhoneInput({
  country,
  digits,
  invalid,
  onCountry,
  onInput,
  onBlur,
  t,
  names,
}: {
  t: FormText;
  names: Record<string, string>;
  country: string | null; // null while the visitor's country is still being detected
  digits: string;
  invalid: boolean;
  onCountry: (code: string) => void;
  onInput: (raw: string, pasted: boolean) => void;
  onBlur: () => void;
}) {
  const c = country ? findCountry(country) : undefined;
  return (
    <div
      className={cn(
        "flex h-12 w-full items-stretch rounded-xl border bg-canvas text-[15px] focus-within:border-ink focus-within:shadow-[0_0_0_4px_rgb(50_220_50/0.22)]",
        invalid ? "border-red-400" : "border-line-strong hover:border-ink/30",
      )}
    >
      {/* Native select (accessible, light) under a compact "MA +212" label */}
      <div className="relative flex shrink-0 items-center gap-1 border-r border-line-strong pl-3.5 pr-2.5">
        <span aria-hidden className={cn("font-medium tabular-nums text-ink", !country && "invisible")}>
          {c ? `${c.code} +${c.dial}` : country ? "+…" : "FR +33"}
        </span>
        <ChevronDown aria-hidden className="size-3.5 text-muted" />
        <select
          aria-label={t.phoneCountry}
          value={c ? c.code : OTHER}
          onChange={(e) => onCountry(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {PHONE_COUNTRIES.map((p) => (
            <option key={p.code} value={p.code}>
              {names[p.code] ?? p.name} (+{p.dial})
            </option>
          ))}
          <option value={OTHER}>{t.otherCountry}</option>
        </select>
      </div>
      <input
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        aria-label={t.phoneNumber}
        placeholder={c ? c.example : country ? t.phonePlaceholder : ""}
        value={digits}
        maxLength={16}
        onChange={(e) => onInput(e.target.value, false)}
        onPaste={(e) => {
          e.preventDefault();
          onInput(e.clipboardData.getData("text"), true);
        }}
        onBlur={onBlur}
        className="min-w-0 flex-1 rounded-r-xl bg-transparent px-3.5 tabular-nums text-ink outline-none placeholder:text-ink/30"
      />
    </div>
  );
}
