"use client";

import {
  BellRing, Bot, Check, CreditCard, FileSignature, GraduationCap, Mail, MessageCircle,
  MessageSquare, MousePointerClick, PlayCircle, Radio, Sparkles, Zap,
} from "lucide-react";
import type { ModuleKey } from "@/lib/content";
import type { Copy } from "@/lib/i18n";

type T = Copy["UI"]["mocks"];
import { cn } from "@/lib/utils";

/* ---------- shared pieces ---------- */

function Window({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-line bg-[#f7f9f7] shadow-float", className)}>
      <div className="flex items-center gap-2 border-b border-line bg-canvas/60 px-4 py-3">
        <span className="size-2.5 rounded-full bg-ink/10" />
        <span className="size-2.5 rounded-full bg-ink/10" />
        <span className="size-2.5 rounded-full bg-ink/10" />
        <span className="ml-3 truncate font-mono text-[11px] text-muted">{title}</span>
      </div>
      {children}
    </div>
  );
}

function Float({ children, className }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <div
      className={cn("absolute z-10", className)}
    >
      <div
        className="flex items-center gap-2.5 rounded-xl border border-line bg-canvas/95 px-3.5 py-2.5 text-[13px] font-medium shadow-float"
      >
        {children}
      </div>
    </div>
  );
}

function Bar({ w, className }: { w: string; className?: string }) {
  return <div className={cn("h-2 rounded-full bg-ink/[0.07]", className)} style={{ width: w }} />;
}

function Dot({ className }: { className?: string }) {
  return (
    <span className={cn("grid size-6 place-items-center rounded-full bg-brand text-ink", className)}>
      <Check className="size-3.5" strokeWidth={3} />
    </span>
  );
}

/* ---------- module mocks ---------- */

function CaptureMock({ t: { capture: t } }: { t: T }) {
  return (
    <div className="relative">
      <Window title={t.window}>
        <div className="grid gap-5 p-5 sm:p-6">
          <div className="grid gap-2.5">
            <Bar w="38%" className="h-2.5 bg-brand/40" />
            <Bar w="86%" className="h-4 bg-ink/80" />
            <Bar w="64%" className="h-4 bg-ink/80" />
            <Bar w="72%" className="mt-1" />
            <div className="mt-2 flex gap-2">
              <div className="h-9 w-32 rounded-full bg-ink" />
              <div className="h-9 w-24 rounded-full border border-line-strong" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {t.steps.map((s, i) => (
              <div key={s} className="rounded-xl border border-line bg-canvas/70 p-3">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{t.step} {i + 1}</p>
                <p className="mt-1 truncate text-[12px] font-medium">{s}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                  <div
                    style={{ width: ["100%", "62%", "41%"][i] }}
                    className="h-full rounded-full bg-brand"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Window>
      <Float className="-right-3 -top-5 sm:-right-6">
        <MousePointerClick className="size-4 text-brand-deep" /> {t.sent}
      </Float>
      <Float className="-bottom-5 -left-3 sm:-left-6" delay={0.4}>
        <Dot /> {t.added}
      </Float>
    </div>
  );
}

function NurtureMock({ t: { nurture: t } }: { t: T }) {
  const icons = [Mail, MessageSquare, MessageCircle, Radio];
  const steps = t.steps.map((s, i) => ({ ...s, icon: icons[i] }));
  return (
    <div className="relative">
      <Window title={t.window}>
        <div className="relative grid gap-3 p-5 sm:p-6">
          <div className="absolute bottom-10 left-[51px] top-10 w-px bg-line-strong sm:left-[55px]" />
          {steps.map((s, i) => (
            <div
              key={s.ch}
              className="relative flex items-center gap-3 rounded-xl border border-line bg-canvas p-3"
            >
              <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", i === 2 ? "bg-brand text-ink" : "bg-ink text-white")}>
                <s.icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{s.d} · {s.ch}</p>
                <p className="truncate text-[13px] font-medium">{s.t}</p>
              </div>
              <span className="hidden shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-[11px] font-medium text-brand-deep sm:block">{s.rate}</span>
            </div>
          ))}
        </div>
      </Window>
      <Float className="-right-3 -top-5 sm:-right-6">
        <MessageCircle className="size-4 text-brand-deep" /> {t.reply}
      </Float>
    </div>
  );
}

function BookingMock({ t: { booking: t } }: { t: T }) {
  const days = t.days;
  const booked = new Set(["0-1", "1-0", "1-2", "2-1", "3-0", "3-3", "4-2"]);
  return (
    <div className="relative">
      <Window title={t.window}>
        <div className="p-5 sm:p-6">
          <div className="grid grid-cols-5 gap-2">
            {days.map((d) => (
              <p key={d} className="text-center font-mono text-[10px] uppercase tracking-wider text-muted">{d}</p>
            ))}
            {Array.from({ length: 4 }).flatMap((_, r) =>
              days.map((_, c) => {
                const on = booked.has(`${c}-${r}`);
                const hl = c === 1 && r === 2;
                return (
                  <div
                    key={`${c}-${r}`}
                    className={cn(
                      "flex h-12 flex-col justify-center rounded-lg border px-2",
                      hl ? "border-brand bg-brand text-ink shadow-glow" : on ? "border-ink bg-ink text-white" : "border-dashed border-line-strong",
                    )}
                  >
                    {(on || hl) && (
                      <>
                        <span className="text-[10px] font-medium leading-none opacity-70">{9 + r * 2}:00</span>
                        <span className="mt-1 truncate text-[11px] font-medium leading-none">{hl ? t.byAi : t.demo}</span>
                      </>
                    )}
                  </div>
                );
              }),
            )}
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-line bg-canvas/70 p-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-ink text-brand"><Bot className="size-4" /></span>
            <p className="text-[13px] leading-snug text-ink-soft">
              {t.botA}<b className="text-ink">{t.botTime}</b>{t.botB}
            </p>
          </div>
        </div>
      </Window>
      <Float className="-right-3 -top-5 sm:-right-6">
        <BellRing className="size-4 text-brand-deep" /> {t.reminder}
      </Float>
      <Float className="-bottom-5 -left-3 sm:-left-6" delay={0.4}>
        <Dot /> {t.confirmed}
      </Float>
    </div>
  );
}

function CoursesMock({ t: { courses: t } }: { t: T }) {
  const mods = t.modules.map((m, i) => ({ t: m, p: [100, 72, 24][i] }));
  return (
    <div className="relative">
      <Window title={t.window}>
        <div className="grid gap-4 p-5 sm:grid-cols-5 sm:p-6">
          <div className="relative grid aspect-video place-items-center overflow-hidden rounded-xl bg-ink sm:col-span-2 sm:aspect-auto">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgb(50_220_50/0.35),transparent_60%)]" />
            <PlayCircle className="relative size-10 text-white" strokeWidth={1.4} />
            <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold uppercase text-white">
              <span className="size-1.5 rounded-full bg-white" /> Live
            </span>
          </div>
          <div className="grid gap-2.5 sm:col-span-3">
            {mods.map((m, i) => (
              <div key={m.t} className="rounded-xl border border-line p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[12px] font-medium">{m.t}</p>
                  <span className="font-mono text-[10px] text-muted">{m.p}%</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-ink/[0.06]">
                  <div
                    style={{ width: `${m.p}%` }}
                    className="h-full rounded-full bg-brand"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Window>
      <Float className="-right-3 -top-5 sm:-right-6">
        <GraduationCap className="size-4 text-brand-deep" /> {t.enrolled}
      </Float>
    </div>
  );
}

function CloseMock({ t: { close: t } }: { t: T }) {
  const deals = [
    [["Groupe Atlas", "3 200 €"], ["Studio Nova", "1 450 €"]],
    [["Immo Prestige", "6 900 €"], ["Clinique Azur", "2 800 €"]],
    [["Auto Premium", "4 900 €"]],
  ];
  const cols = t.cols.map((c, i) => ({ t: c, deals: deals[i] }));
  return (
    <div className="relative">
      <Window title={t.window}>
        <div className="grid grid-cols-3 gap-2.5 p-4 sm:p-6">
          {cols.map((c, ci) => (
            <div key={c.t} className="rounded-xl bg-canvas/80 p-2">
              <div className="mb-2 flex items-center justify-between px-1">
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted">{c.t}</p>
                <span className="text-[10px] text-muted">{c.deals.length}</span>
              </div>
              <div className="grid gap-2">
                {c.deals.map(([n, v], di) => (
                  <div
                    key={n}
                    className={cn("rounded-lg border bg-canvas p-2.5", ci === 2 ? "border-brand shadow-[0_0_0_3px_rgb(50_220_50/0.15)]" : "border-line")}
                  >
                    <p className="truncate text-[11px] font-medium sm:text-[12px]">{n}</p>
                    <p className={cn("mt-1 text-[11px] font-semibold tabular-nums", ci === 2 ? "text-brand-deep" : "text-ink-soft")}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Window>
      <Float className="-right-3 -top-5 sm:-right-6">
        <FileSignature className="size-4 text-brand-deep" /> {t.signed}
      </Float>
      <Float className="-bottom-5 -left-3 sm:-left-6" delay={0.4}>
        <CreditCard className="size-4 text-brand-deep" /> {t.paid}
      </Float>
    </div>
  );
}

function AutomateMock({ t: { automate: t } }: { t: T }) {
  const look = [
    { icon: Zap, tone: "ink" },
    { icon: Bot, tone: "brand" },
    { icon: MessageCircle, tone: "white" },
    { icon: Sparkles, tone: "white" },
  ];
  const nodes = t.nodes.map((n, i) => ({ ...n, ...look[i] }));
  return (
    <div className="relative">
      <Window title={t.window}>
        <div className="relative grid gap-3 bg-grid p-5 sm:p-6">
          <div className="absolute bottom-10 left-1/2 top-10 w-px -translate-x-1/2 bg-line-strong">
          </div>
          {nodes.map((n, i) => (
            <div
              key={n.t}
              className={cn(
                "relative mx-auto flex w-full max-w-xs items-center gap-3 rounded-xl border p-3",
                n.tone === "ink" ? "border-ink bg-ink text-white" : n.tone === "brand" ? "border-brand bg-brand text-ink" : "border-line bg-canvas",
              )}
            >
              <span className={cn("grid size-8 place-items-center rounded-lg", n.tone === "white" ? "bg-canvas" : "bg-white/15")}>
                <n.icon className="size-4" />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider opacity-60">{n.t}</p>
                <p className="text-[13px] font-medium">{n.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Window>
      <Float className="-right-3 -top-5 sm:-right-6">
        <Bot className="size-4 text-brand-deep" /> {t.active}
      </Float>
    </div>
  );
}

const MOCKS: Record<ModuleKey, (p: { t: T }) => React.JSX.Element> = {
  capture: CaptureMock,
  nurture: NurtureMock,
  booking: BookingMock,
  courses: CoursesMock,
  close: CloseMock,
  automate: AutomateMock,
};

export function ModuleMock({ name, t }: { name: ModuleKey; t: T }) {
  const Mock = MOCKS[name];
  return <Mock t={t} />;
}
