"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CheckCircle2, Loader2, Lock } from "lucide-react";
import { PARTNER_PLANS, partnerSchema, type PartnerPayload } from "@/lib/schema";
import { copy, type Lang } from "@/lib/i18n";
import { pathIn } from "@/lib/lang";
import { getAttribution } from "@/lib/attribution";
import { detectCountry } from "@/lib/geo";
import { cn } from "@/lib/utils";
import { Field, PhoneInput, inputCls, phoneHint, submitCls, usePhone } from "@/components/form";

/** "Devenir partenaire": the application becomes a CRM contact tagged "ClientX Partner Program" (see lib/partner.ts). */
export function PartnerForm({ lang = "fr" }: { lang?: Lang }) {
  const { PARTNERS, UI, ERRORS, PHONE_NAMES, PARTNER_PLAN_LABELS } = copy(lang);
  const f = UI.form;
  const pf = UI.partnerForm;
  const err = (m?: string) => (m ? (ERRORS[m] ?? m) : undefined);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<PartnerPayload>({ resolver: zodResolver(partnerSchema), mode: "onTouched", defaultValues: { phone: "" } });
  const phone = usePhone((e164, tidy) => setValue("phone", e164, { shouldValidate: Boolean(errors.phone) || tidy }));
  const plan = watch("plan");

  const onSubmit = async (v: PartnerPayload) => {
    setStatus("sending");
    const country = await detectCountry().catch(() => null);
    const res = await fetch("/api/partner", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...v, utm: getAttribution(), page: window.location.href, country }),
      keepalive: true,
    }).catch(() => null);
    setStatus(res?.ok ? "success" : "error");
  };

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] border border-line-strong bg-surface p-1.5 shadow-float">
      <div className="rounded-[1.4rem] border border-line bg-canvas/70 p-5 sm:p-7">
        <h3 className="text-xl font-semibold tracking-tight sm:text-[1.4rem]">{PARTNERS.form.title}</h3>

        {status === "success" ? (
          <p role="status" className="mt-6 flex items-start gap-3 text-[15px] leading-relaxed">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-deep" />
            {PARTNERS.form.success}
          </p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-6 grid gap-3.5">
            {/* Honeypot */}
            <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("website")} />

            <Field group label={pf.plan} error={err(errors.plan?.message)}>
              <div role="radiogroup" className="grid gap-1.5 sm:grid-cols-2">
                {PARTNER_PLANS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    role="radio"
                    aria-checked={plan === p}
                    onClick={() => setValue("plan", p, { shouldValidate: true })}
                    className={cn(
                      "h-12 rounded-xl border text-[14px] font-medium",
                      plan === p
                        ? "border-ink bg-ink text-white shadow-[0_0_0_3px_rgb(50_220_50/0.35)]"
                        : "border-line-strong bg-canvas text-ink-soft hover:border-ink/40",
                    )}
                  >
                    {PARTNER_PLAN_LABELS[p] ?? p}
                  </button>
                ))}
              </div>
            </Field>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <Field label={f.firstName} error={err(errors.firstName?.message)}>
                <input {...register("firstName")} autoComplete="given-name" placeholder="Sarah" className={inputCls(!!errors.firstName)} />
              </Field>
              <Field label={f.lastName} error={err(errors.lastName?.message)}>
                <input {...register("lastName")} autoComplete="family-name" placeholder="Benali" className={inputCls(!!errors.lastName)} />
              </Field>
            </div>
            <Field label={f.email} error={err(errors.email?.message)}>
              <input {...register("email")} type="email" autoComplete="email" inputMode="email" placeholder={pf.emailPlaceholder} className={inputCls(!!errors.email)} />
            </Field>
            <Field group label={f.phone} error={err(errors.phone?.message)} hint={errors.phone ? phoneHint(phone.country, f) : undefined}>
              <PhoneInput {...phone.inputProps} invalid={!!errors.phone} t={f} names={PHONE_NAMES} />
            </Field>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <Field label={pf.company}>
                <input {...register("company")} autoComplete="organization" placeholder={pf.companyPlaceholder} className={inputCls(false)} />
              </Field>
              <Field label={pf.link}>
                <input {...register("link")} inputMode="url" placeholder="https://" className={inputCls(false)} />
              </Field>
            </div>
            <Field label={pf.message}>
              <textarea
                {...register("message")}
                rows={3}
                placeholder={pf.messagePlaceholder}
                className={cn(inputCls(false), "h-auto py-3")}
              />
            </Field>
            <button type="submit" disabled={status === "sending"} className={submitCls}>
              {status === "sending" ? f.sending : PARTNERS.cta}
              <span className="grid size-9 place-items-center rounded-full bg-brand text-ink">
                {status === "sending" ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" strokeWidth={2.4} />}
              </span>
            </button>
            {status === "error" && (
              <p role="alert" className="text-[13px] text-red-500">
                {f.error}
              </p>
            )}
          </form>
        )}

        <p className="mt-5 flex items-start gap-2 text-[12px] leading-relaxed text-muted">
          <Lock className="mt-0.5 size-3.5 shrink-0" />
          <span>
            {f.privacyPartner}{" "}
            <a href={pathIn("/politique-de-confidentialite", lang)} className="underline decoration-line-strong underline-offset-2 hover:text-ink">
              {f.privacyLink}
            </a>
            .
          </span>
        </p>
      </div>
    </div>
  );
}
