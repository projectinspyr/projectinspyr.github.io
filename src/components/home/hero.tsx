import type { CSSProperties } from "react";
import { home } from "@content/pages/home";
import { site } from "@content/site";
import { cn } from "@/lib/utils";
import { BRIDGE, bankShare } from "../brand/bridge-geometry";
import { BridgeHero } from "../brand/bridge-hero";
import { ButtonLink } from "../ui/button";
import { Rich } from "../ui/rich";
import { Container } from "../ui/section";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const labelTop = `${((BRIDGE.deckY + 30) / BRIDGE.height) * 100}%`;
const labelWidth = `${(bankShare - 0.045) * 100}%`;

function BankLabel({
  side,
  text,
  inline,
  className,
}: {
  side: "left" | "right";
  text: string;
  inline?: boolean;
  className?: string;
}) {
  const dot = <span aria-hidden className={cn("mt-[0.3em] size-2 shrink-0 rounded-full", side === "left" ? "bg-signal" : "bg-cream")} />;
  return (
    <span
      className={cn(
        "fade-up items-start gap-2 text-[0.68rem] font-semibold uppercase leading-snug tracking-[0.14em] text-navy-200 sm:text-[clamp(0.62rem,0.9vw,0.82rem)]",
        inline ? "flex max-w-[46%]" : "absolute",
        side === "right" && "flex-row-reverse text-right",
        className,
      )}
      style={{
        ...delay(side === "left" ? 900 : 1100),
        ...(inline ? {} : { top: labelTop, width: labelWidth, [side]: "2%" }),
      }}
    >
      {dot}
      {text}
    </span>
  );
}

export function Hero() {
  const { hero } = home;
  // One line per sentence of the tagline.
  const lines = site.tagline.split(/(?<=[.!?])\s+/);

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-navy-800 pt-28 sm:pt-32 lg:pt-36">
      <div aria-hidden className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_50%_20%,black_10%,transparent_70%)]" />
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[520px] rounded-full bg-spark/[0.06] blur-[120px]" />
      <div aria-hidden className="absolute -left-48 bottom-10 -z-10 size-[420px] rounded-full bg-signal/[0.07] blur-[120px]" />

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

      <div className="relative mt-12 sm:mt-14">
        {/* Labels sit on their own bank: inside the drawing from sm up, beneath it on phones. */}
        <div className="relative mx-auto w-full max-w-[1500px]">
          <BridgeHero className="block h-auto w-full" />
          <BankLabel side="left" text={hero.bridgeLeft} className="hidden sm:flex" />
          <BankLabel side="right" text={hero.bridgeRight} className="hidden sm:flex" />
        </div>
        <div className="flex justify-between gap-6 px-5 pb-8 pt-3 sm:hidden">
          <BankLabel side="left" text={hero.bridgeLeft} inline />
          <BankLabel side="right" text={hero.bridgeRight} inline />
        </div>
      </div>
    </section>
  );
}
