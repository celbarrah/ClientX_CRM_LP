"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Loader2, Lock } from "lucide-react";
import { SECTORS, TEAM_SIZES, stepOneSchema, stepTwoSchema } from "@/lib/schema";
import { CTA } from "@/lib/content";
import { cn } from "@/lib/utils";

const formSchema = stepOneSchema.extend(stepTwoSchema.shape).extend({ website: z.string().optional() });
type FormValues = z.infer<typeof formSchema>;

const STEP_ONE: FieldPath<FormValues>[] = ["firstName", "lastName", "email", "phone"];
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"];

function getUtm() {
  const params = new URLSearchParams(window.location.search);
  return Object.fromEntries(UTM_KEYS.flatMap((k) => (params.get(k) ? [[k, params.get(k)!]] : [])));
}

async function send(body: object) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    keepalive: true,
  });
  return res.ok;
}

export function DemoForm() {
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const utm = useRef<Record<string, string>>({});

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema), mode: "onTouched" });

  useEffect(() => {
    utm.current = getUtm();
  }, []);

  const teamSize = watch("teamSize");

  const next = async () => {
    if (await trigger(STEP_ONE)) setStep(2);
  };

  // Data is sent once, only on final submission.
  const onSubmit = async (v: FormValues) => {
    setStatus("sending");
    const ok = await send({ ...v, utm: utm.current, page: window.location.href }).catch(() => false);
    setStatus(ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <div id="demo" className="relative scroll-mt-28">
        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand/20 blur-3xl" />
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[1.75rem] border border-line-strong bg-surface/80 p-1.5 shadow-float backdrop-blur-xl"
        >
          <div className="flex flex-col items-center rounded-[1.4rem] border border-line bg-canvas/70 px-6 py-12 text-center sm:px-8">
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.15 }}
              className="grid size-16 place-items-center rounded-full bg-brand text-ink shadow-glow"
            >
              <Check className="size-7" strokeWidth={2.8} />
            </motion.span>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-deep">Demande envoyée</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">Merci, c&apos;est bien reçu !</h3>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted">
              Un eXpert ClientX AI vous contacte sous 24h pour planifier votre démo et votre audit offert.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div id="demo" className="relative scroll-mt-28">
      {/* Glow halo behind the card */}
      <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[1.75rem] border border-line-strong bg-surface/80 p-1.5 shadow-float backdrop-blur-xl">
        <div className="rounded-[1.4rem] border border-line bg-canvas/70 p-5 sm:p-7">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-deep">
                Étape {step} sur 2
              </p>
              <h3 className="mt-1.5 text-xl font-semibold tracking-tight sm:text-[1.4rem]">
                {step === 1 ? "Vos coordonnées" : "Votre entreprise"}
              </h3>
            </div>
            <div className="flex items-center gap-1.5 pt-1">
              {[1, 2].map((s) => (
                <span
                  key={s}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    s <= step ? "w-8 bg-brand" : "w-4 bg-ink/10",
                  )}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Honeypot */}
            <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("website")} />

            <AnimatePresence mode="wait" initial={false}>
              {step === 1 ? (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-3.5"
                >
                  <div className="grid gap-3.5 sm:grid-cols-2">
                    <Field label="Prénom" error={errors.firstName?.message}>
                      <input {...register("firstName")} autoComplete="given-name" placeholder="Sarah" className={inputCls(!!errors.firstName)} />
                    </Field>
                    <Field label="Nom" error={errors.lastName?.message}>
                      <input {...register("lastName")} autoComplete="family-name" placeholder="Benali" className={inputCls(!!errors.lastName)} />
                    </Field>
                  </div>
                  <Field label="E-mail professionnel" error={errors.email?.message}>
                    <input {...register("email")} type="email" autoComplete="email" inputMode="email" placeholder="sarah@entreprise.com" className={inputCls(!!errors.email)} />
                  </Field>
                  <Field label="Téléphone" error={errors.phone?.message}>
                    <input {...register("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="+33 6 12 34 56 78" className={inputCls(!!errors.phone)} />
                  </Field>
                  <button type="button" onClick={next} className={submitCls}>
                    Continuer
                    <span className="grid size-9 place-items-center rounded-full bg-brand text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                      <ArrowRight className="size-4" strokeWidth={2.2} />
                    </span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-3.5"
                >
                  <Field label="Entreprise" error={errors.company?.message}>
                    <input {...register("company")} autoComplete="organization" placeholder="Nom de votre entreprise" className={inputCls(!!errors.company)} />
                  </Field>
                  <Field label="Secteur d'activité" error={errors.sector?.message}>
                    <div className="relative">
                      <select {...register("sector")} defaultValue="" className={cn(inputCls(!!errors.sector), "appearance-none pr-10")}>
                        <option value="" disabled>Sélectionnez votre secteur</option>
                        {SECTORS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
                    </div>
                  </Field>
                  <Field group label="Taille de l'équipe" error={errors.teamSize?.message}>
                    <div role="radiogroup" className="grid grid-cols-5 gap-1.5">
                      {TEAM_SIZES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          role="radio"
                          aria-checked={teamSize === t}
                          onClick={() => setValue("teamSize", t, { shouldValidate: true })}
                          className={cn(
                            "h-11 rounded-xl border text-[13px] font-medium tabular-nums transition-all",
                            teamSize === t
                              ? "border-ink bg-ink text-white shadow-[0_0_0_3px_rgb(50_220_50/0.35)]"
                              : "border-line-strong bg-canvas text-ink-soft hover:border-ink/40",
                          )}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </Field>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      aria-label="Retour"
                      className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-line-strong transition-colors hover:bg-surface"
                    >
                      <ArrowLeft className="size-4" />
                    </button>
                    <button type="submit" disabled={status === "sending"} className={cn(submitCls, "flex-1")}>
                      {status === "sending" ? "Envoi…" : CTA.primary}
                      <span className="grid size-9 place-items-center rounded-full bg-brand text-ink">
                        {status === "sending" ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" strokeWidth={2.4} />}
                      </span>
                    </button>
                  </div>
                  {status === "error" && (
                    <p role="alert" className="text-[13px] text-red-500">
                      L&apos;envoi a échoué. Réessayez, ou écrivez-nous à contact@clientx.ai.
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <p className="mt-5 flex items-start gap-2 text-[12px] leading-relaxed text-muted">
            <Lock className="mt-0.5 size-3.5 shrink-0" />
            <span>
              Vos données sont chiffrées et ne sont jamais revendues. En continuant, vous acceptez notre{" "}
              <a href="/politique-de-confidentialite" className="underline decoration-line-strong underline-offset-2 hover:text-ink">
                politique de confidentialité
              </a>
              .
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const inputCls = (invalid: boolean) =>
  cn(
    "h-12 w-full rounded-xl border bg-canvas px-4 text-[15px] text-ink outline-none transition-all placeholder:text-ink/30",
    "focus:border-ink focus:shadow-[0_0_0_4px_rgb(50_220_50/0.22)]",
    invalid ? "border-red-400" : "border-line-strong hover:border-ink/30",
  );

const submitCls =
  "group mt-1 inline-flex h-14 w-full items-center justify-between rounded-full bg-ink pl-6 pr-2.5 text-[15px] font-medium text-white transition-all duration-300 hover:shadow-glow disabled:opacity-80";

function Field({ label, error, group, children }: { label: string; error?: string; group?: boolean; children: React.ReactNode }) {
  const Tag = group ? "div" : "label";
  return (
    <Tag className="grid gap-1.5">
      <span className="text-[13px] font-medium text-ink-soft">{label}</span>
      {children}
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[12px] text-red-500"
          >
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </Tag>
  );
}
