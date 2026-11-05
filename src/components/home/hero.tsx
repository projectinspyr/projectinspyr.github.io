import type { CSSProperties } from "react";
import { home } from "@content/pages/home";
import { site } from "@content/site";
import { ButtonLink } from "../ui/button";
import { PushPin } from "../ui/doodles";
import { Rich } from "../ui/rich";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** The front of the site: a note pinned to a yellow halftone wall. */
export function Hero() {
  const { hero } = home;
  // One line per sentence of the tagline.
  const lines = site.tagline.split(/(?<=[.!?])\s+/);

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b-4 border-ink bg-spark px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32">
      <div aria-hidden className="halftone-blue absolute inset-0" />
      <div aria-hidden className="absolute inset-3 top-[84px] border-[3px] border-ink/30" />

      <div className="on-paper slap-in relative mx-auto max-w-4xl -rotate-1 border-4 border-ink bg-paper px-5 pb-11 pt-12 text-center text-ink shadow-comic-lg sm:px-12 sm:pb-14">
        <span aria-hidden className="tape -top-3 left-6 -rotate-6 sm:left-10" />
        <span aria-hidden className="tape -top-3 right-6 rotate-6 sm:right-10" />
        <span aria-hidden className="absolute left-1/2 top-4 size-7 -translate-x-1/2 rounded-full border-4 border-ink bg-signal shadow-comic-sm" />
        <span aria-hidden className="sticker absolute -right-2 -top-12 hidden rotate-12 font-marker text-7xl text-signal-deep [text-shadow:3px_3px_0_#0d0d0d] sm:block">
          !
        </span>

        <p className="mt-5 flex items-center justify-center gap-2 font-marker text-[0.92rem] text-signal-ink">
          <PushPin className="size-4 shrink-0" />
          {hero.eyebrow}
        </p>

        <h1 id="hero-title" className="mt-4 text-[clamp(3.25rem,10.5vw,7.5rem)] leading-[0.92]">
          {lines.map((line) => (
            <span key={line} className="block">
              <Rich text={line} surface="paper" />
            </span>
          ))}
        </h1>

        <p className="fade-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-500" style={delay(180)}>
          {hero.valueProp}
        </p>

        <div className="fade-up mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row" style={delay(280)}>
          <ButtonLink href={hero.primaryCta.href} magnetic>
            {hero.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={site.social.instagram.href} variant="navy" magnetic>
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
