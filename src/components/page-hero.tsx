import type { CSSProperties, ReactNode } from "react";
import { Rich } from "./ui/rich";
import { Container, Eyebrow } from "./ui/section";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  sticker?: string;
  children?: ReactNode;
};

/** The opening block for inner pages. */
export function PageHero({ eyebrow, title, intro, sticker, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden border-b-4 border-ink bg-navy-800 pb-16 pt-32 sm:pb-20 sm:pt-40">
      <div aria-hidden className="halftone-light absolute inset-0 -z-10" />
      <Container className="relative">
        <Eyebrow className="fade-up">{eyebrow}</Eyebrow>
        <h1 id="page-title" className="mt-5 max-w-[17ch] text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.92]">
          <span className="slap-in block" style={delay(80)}>
            <Rich text={title} />
          </span>
        </h1>
        {intro && (
          <p className="fade-up mt-7 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl" style={delay(220)}>
            {intro}
          </p>
        )}
        {children && (
          <div className="fade-up mt-9" style={delay(320)}>
            {children}
          </div>
        )}
        {sticker && (
          <span
            aria-hidden
            className="sticker absolute right-8 top-2 hidden rotate-6 border-[3px] border-ink bg-spark px-4 py-1.5 font-display text-3xl tracking-wider text-ink shadow-comic md:block"
          >
            {sticker}
          </span>
        )}
      </Container>
    </section>
  );
}
