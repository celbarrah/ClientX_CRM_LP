import { Mail, Phone } from "lucide-react";
import { CONTACT, NAV, CTA } from "@/lib/content";
import { Accent, Button, Eyebrow, Logo, Reveal, Sticker } from "@/components/ui";

/** Dark closing block: final CTA and footer live in the same surface. */
export function Footer({ cta = false }: { cta?: boolean }) {
  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="grain relative isolate mx-auto max-w-[1600px] overflow-hidden rounded-[2.5rem] bg-ink text-white">
        <div className="absolute inset-0 -z-10 bg-grid-dark [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
        <div className="pointer-events-none absolute -top-48 left-1/2 -z-10 h-[420px] w-[900px] max-w-[160vw] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(50_220_50/0.26),transparent)]" />

        {cta && (
          <Reveal className="container-x flex flex-col items-center pb-20 pt-24 text-center sm:pb-28 sm:pt-32">
            <Eyebrow dark>Démo live + audit gratuit</Eyebrow>
            <h2 className="mt-7 max-w-4xl text-balance text-[2.5rem] font-semibold leading-[1] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
              Prêt à tout réunir dans <Accent dark>une seule plateforme ?</Accent>
            </h2>
            <p className="mt-6 max-w-xl text-lg text-white/60">
              Un eXpert vous montre ClientX AI sur votre propre activité, et identifie ce que vous pouvez économiser.
            </p>
            <div className="relative mt-10">
              <Button href="#demo" variant="brand" size="lg">{CTA.primary}</Button>
              <span className="absolute -right-24 -top-8 hidden sm:block">
                <Sticker rotate={8} className="bg-canvas">Réponse sous 24h</Sticker>
              </span>
            </div>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-white/45">
              Démo gratuite · Sans engagement
            </p>
          </Reveal>
        )}

        <div className={cta ? "border-t border-white/10" : ""}>
          <div className="container-x grid gap-12 py-14 md:grid-cols-12">
            <div className="md:col-span-5">
              <Logo dark className="h-8" />
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/55">
                Le CRM IA tout-en-un qui remplace plus de 20 outils. Certifié ISO 9001.
              </p>
            </div>
            <div className="md:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">Navigation</p>
              <ul className="mt-5 grid gap-3 text-[15px]">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={cta ? n.href : `/${n.href}`} className="text-white/70 transition-colors hover:text-brand">{n.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40">Contact</p>
              <ul className="mt-5 grid gap-3 text-[15px]">
                <li>
                  <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2.5 text-white/70 hover:text-brand">
                    <Mail className="size-4 text-brand" /> {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a href={`tel:${CONTACT.phoneHref}`} className="inline-flex items-center gap-2.5 text-white/70 hover:text-brand">
                    <Phone className="size-4 text-brand" /> {CONTACT.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10">
            <div className="container-x flex flex-col gap-3 py-6 text-[13px] text-white/45 md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} {CONTACT.entities}. Tous droits réservés.</p>
              <div className="flex gap-6">
                <a href="/mentions-legales" className="hover:text-white">Mentions légales</a>
                <a href="/politique-de-confidentialite" className="hover:text-white">Politique de confidentialité</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
