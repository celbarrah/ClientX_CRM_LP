"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CheckCircle2, Loader2, Lock } from "lucide-react";
import { PARTNER_PLANS, partnerSchema, type PartnerPayload } from "@/lib/schema";
import { PARTNERS } from "@/lib/content";
import { phoneHint } from "@/lib/phone";
import { getAttribution } from "@/lib/attribution";
import { detectCountry } from "@/lib/geo";
import { cn } from "@/lib/utils";
import { Field, PhoneInput, inputCls, submitCls, usePhone } from "@/components/form";

/** "Devenir partenaire": the application becomes a CRM contact tagged "ClientX Partner Program" (see lib/partner.ts). */
export function PartnerForm() {
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

            <Field group label="Formule" error={errors.plan?.message}>
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
                    {p}
                  </button>
                ))}
              </div>
            </Field>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <Field label="Prénom" error={errors.firstName?.message}>
                <input {...register("firstName")} autoComplete="given-name" placeholder="Sarah" className={inputCls(!!errors.firstName)} />
              </Field>
              <Field label="Nom" error={errors.lastName?.message}>
                <input {...register("lastName")} autoComplete="family-name" placeholder="Benali" className={inputCls(!!errors.lastName)} />
              </Field>
            </div>
            <Field label="E-mail" error={errors.email?.message}>
              <input {...register("email")} type="email" autoComplete="email" inputMode="email" placeholder="sarah@agence.com" className={inputCls(!!errors.email)} />
            </Field>
            <Field group label="Téléphone" error={errors.phone?.message} hint={errors.phone ? phoneHint(phone.country) : undefined}>
              <PhoneInput {...phone.inputProps} invalid={!!errors.phone} />
            </Field>
            <div className="grid gap-3.5 sm:grid-cols-2">
              <Field label="Société (facultatif)">
                <input {...register("company")} autoComplete="organization" placeholder="Votre agence ou activité" className={inputCls(false)} />
              </Field>
              <Field label="Site ou réseau social (facultatif)">
                <input {...register("link")} inputMode="url" placeholder="https://" className={inputCls(false)} />
              </Field>
            </div>
            <Field label="Votre audience ou vos clients (facultatif)">
              <textarea
                {...register("message")}
                rows={3}
                placeholder="Qui comptez-vous recommander ou équiper ?"
                className={cn(inputCls(false), "h-auto py-3")}
              />
            </Field>
            <button type="submit" disabled={status === "sending"} className={submitCls}>
              {status === "sending" ? "Envoi…" : PARTNERS.cta}
              <span className="grid size-9 place-items-center rounded-full bg-brand text-ink">
                {status === "sending" ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" strokeWidth={2.4} />}
              </span>
            </button>
            {status === "error" && (
              <p role="alert" className="text-[13px] text-red-500">
                L&apos;envoi a échoué. Réessayez, ou écrivez-nous à contact@clientx.ai.
              </p>
            )}
          </form>
        )}

        <p className="mt-5 flex items-start gap-2 text-[12px] leading-relaxed text-muted">
          <Lock className="mt-0.5 size-3.5 shrink-0" />
          <span>
            Vos données sont chiffrées et ne sont jamais revendues. En envoyant ce formulaire, vous acceptez notre{" "}
            <a href="/politique-de-confidentialite" className="underline decoration-line-strong underline-offset-2 hover:text-ink">
              politique de confidentialité
            </a>
            .
          </span>
        </p>
      </div>
    </div>
  );
}
