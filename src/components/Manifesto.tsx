import { QUESTIONS, CTA } from "@/lib/content";
import { Accent, Button, Highlight, Reveal, Sticker, Target } from "@/components/ui";
import { VideoPlayer } from "@/components/VideoPlayer";

/** Editorial manifesto: replaces the value prop, stats and questions blocks in one section. */
export function Manifesto() {
  return (
    <section id="plateforme" className="relative isolate scroll-mt-24 overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 -z-10 bg-paper" />
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(50_220_50/0.46),transparent)]" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 -z-10 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgb(50_220_50/0.33),transparent)]" />

      <div className="container-x">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">Qui sommes-nous :</p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-12 text-[2.6rem] font-medium leading-[1.12] tracking-[-0.045em] text-ink sm:text-6xl lg:text-[4.6rem]">
              Nous réunissons{" "}
              <Sticker rotate={-5} delay={0.3} className="relative -top-3 mx-1 align-middle sm:-top-5">
                +20 outils en 1
              </Sticker>{" "}
              <Highlight className="font-bold italic">vos outils</Highlight> dans une seule plateforme.{" "}
              <span className="relative inline-block">
                <Target className="absolute -right-4 -top-6 size-7 sm:-right-8 sm:-top-8 sm:size-8" />
              </span>
              <br className="hidden sm:block" />
              De la <span className="font-bold italic">capture</span>{" "}
              <Sticker rotate={4} delay={0.5} className="relative -top-2 mx-1 align-middle sm:-top-4">
                0 € de coûts cachés
              </Sticker>{" "}
              à la <Accent>signature.</Accent>{" "}
              <Sticker rotate={-3} delay={0.7} dark className="relative -top-2 align-middle sm:-top-4">
                ISO 9001
              </Sticker>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative mx-auto mt-20 max-w-6xl">
          <div className="absolute -left-3 -top-5 z-10 sm:-left-6">
            <Sticker rotate={-7}>La plateforme en action</Sticker>
          </div>
          <VideoPlayer />
        </Reveal>

        <div className="mx-auto mt-20 grid max-w-6xl grid-cols-1 divide-y divide-line-strong border-y border-line-strong md:grid-cols-3 md:divide-x md:divide-y-0">
          {QUESTIONS.items.map((it, i) => (
            <Reveal key={it.q} delay={i * 0.08} className="group relative px-1 py-8 md:px-8">
              <span className="font-serif text-5xl italic leading-none text-brand-deep">{i + 1}.</span>
              <h3 className="mt-4 text-xl font-semibold leading-tight tracking-tight">{it.q}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{it.a}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Button href="#demo" size="lg">{CTA.primary}</Button>
        </Reveal>
      </div>
    </section>
  );
}
