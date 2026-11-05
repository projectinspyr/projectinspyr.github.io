import { home } from "@content/pages/home";
import { site } from "@content/site";
import { plain } from "@/lib/utils";
import { LogoCard } from "../brand/wordmark";
import { ButtonLink } from "../ui/button";
import { Container } from "../ui/section";

/** Who we are, right under the bulletin board: the name, the promise, the logo. */
export function Intro() {
  const { hero, intro } = home;
  const [boom, pow, power] = intro.stickers;

  return (
    <section aria-labelledby="intro-title" className="relative overflow-hidden bg-navy-800 pb-20 pt-10 sm:pb-24">
      <div aria-hidden className="halftone-light absolute inset-0" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-2">
        <div data-reveal>
          <h1 id="intro-title" className="leading-none">
            <span className="block text-[clamp(2.75rem,6vw,4.25rem)] tracking-[0.3em] text-spark">Project</span>
            <span className="block text-[clamp(6rem,15vw,11rem)] leading-[0.9] text-signal">INSPYR</span>
            <span className="mt-2 block text-[clamp(2.5rem,5vw,3.75rem)] text-white">{intro.line}</span>
          </h1>
          <p className="mt-5 font-display text-[clamp(1.75rem,3.2vw,2.4rem)] leading-tight tracking-[0.03em] text-spark">
            {plain(site.tagline)}
          </p>
          <p className="mt-3 max-w-xl text-lg leading-relaxed text-navy-100">{hero.valueProp}</p>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row">
            <ButtonLink href={hero.primaryCta.href} magnetic>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={site.social.instagram.href} variant="spark" magnetic>
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        {/* Stickers sit on the card's corners, clear of the logo itself. */}
        <div data-reveal className="relative mx-auto mb-8 mt-6 w-full max-w-[540px] px-3">
          <div className="rotate-3">
            <LogoCard />
          </div>
          <span aria-hidden className="sticker absolute -left-1 -top-10 -rotate-6 border-[3px] border-ink bg-spark px-3 py-1 font-display text-2xl tracking-wider text-ink shadow-comic">
            {boom}
          </span>
          <span aria-hidden className="sticker absolute -top-5 right-0 rotate-6 border-[3px] border-ink bg-signal px-3 py-1 font-display text-2xl tracking-wider text-ink shadow-comic [animation-delay:1.2s]">
            {pow}
          </span>
          <span aria-hidden className="sticker absolute -bottom-11 left-2 -rotate-2 border-[3px] border-ink bg-tape px-3 py-1 font-display text-xl tracking-wider text-ink shadow-comic [animation-delay:2.4s]">
            ★ {power}
          </span>
        </div>
      </Container>
    </section>
  );
}
