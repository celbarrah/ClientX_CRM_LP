import { copy, homeOf, type Lang } from "@/lib/i18n";
import { Logo } from "@/components/ui";
import { Footer } from "@/components/Footer";

export function LegalPage({ title, lang = "fr", children }: { title: string; lang?: Lang; children: React.ReactNode }) {
  return (
    <>
      <header className="container-x flex h-20 items-center">
        <a href={homeOf(lang)} aria-label={copy(lang).UI.home}>
          <Logo className="h-7" />
        </a>
      </header>
      <main className="container-x max-w-3xl py-16">
        <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">{title}</h1>
        <div className="mt-10 grid gap-8 text-[15px] leading-relaxed text-ink-soft [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink [&_p]:mt-3">
          {children}
        </div>
      </main>
      <Footer lang={lang} />
    </>
  );
}
