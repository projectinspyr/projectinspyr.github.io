import type { CSSProperties } from "react";
import { home } from "@content/pages/home";
import { site } from "@content/site";
import { BridgeHero } from "../brand/bridge-hero";
import { ButtonLink } from "../ui/button";
import { Spark } from "../ui/doodles";
import { Rich } from "../ui/rich";
import { Container } from "../ui/section";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const { hero } = home;
  // One line per sentence of the tagline.
  const lines = site.tagline.split(/(?<=[.!?])\s+/);

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-800 pt-28 sm:pt-32 lg:pt-36">
      <div aria-hidden className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_20%,black_10%,transparent_70%)]" />
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[520px] rounded-full bg-spark/10 blur-[120px]" />
      <div aria-hidden className="absolute -left-48 bottom-10 -z-10 size-[420px] rounded-full bg-signal/10 blur-[120px]" />

      <Container>
        <p className="fade-up flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold uppercase tracking-[0.18em] text-navy-200" style={delay(0)}>
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-spark/70 motion-reduce:hidden" />
            <span className="relative inline-flex size-2.5 rounded-full bg-spark" />
          </span>
          {hero.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="mt-6 max-w-[15ch] text-[clamp(3rem,12.2vw,9.75rem)] font-extrabold leading-[0.9] tracking-[-0.045em]"
        >
          {lines.map((line, i) => (
            <span key={line} className="rise-mask">
              <span style={delay(120 + i * 140)}>
                <Rich text={line} underline />
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <p className="fade-up max-w-xl text-lg leading-relaxed text-navy-100 sm:text-xl" style={delay(420)}>
            {hero.valueProp}
          </p>
          <div className="fade-up flex flex-col gap-3 sm:flex-row" style={delay(560)}>
            <ButtonLink href={hero.primaryCta.href} magnetic>
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink href={site.social.instagram.href} variant="secondary" magnetic>
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>

      <div className="relative mt-14 sm:mt-16">
        <div className="overflow-hidden">
          <BridgeHero className="ml-[-28%] block h-auto w-[156%] max-w-none sm:mx-auto sm:w-full sm:max-w-[1500px]" />
        </div>
        <Container className="-mt-3 flex items-start justify-between pb-10 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-navy-200 sm:-mt-6 sm:text-sm">
          <span className="fade-up flex max-w-[44%] items-center gap-2" style={delay(900)}>
            <span aria-hidden className="size-2 shrink-0 rounded-full bg-signal" />
            {hero.bridgeLeft}
          </span>
          <span className="fade-up hidden items-center gap-1.5 font-hand text-lg normal-case tracking-normal text-spark sm:flex" style={delay(1500)}>
            <Spark className="size-3.5" /> {site.shortName}
          </span>
          <span className="fade-up flex max-w-[44%] items-center justify-end gap-2 text-right" style={delay(1100)}>
            {hero.bridgeRight}
            <span aria-hidden className="size-2 shrink-0 rounded-full bg-cream" />
          </span>
        </Container>
      </div>
    </section>
  );
}
