import type { CSSProperties, ReactNode } from "react";
import { BridgeDivider } from "./brand/bridge-divider";
import { Rich } from "./ui/rich";
import { Container, Eyebrow } from "./ui/section";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
};

/** The opening block for inner pages. */
export function PageHero({ eyebrow, title, intro, children }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-navy-800 pt-32 sm:pt-40">
      <div aria-hidden className="dot-grid absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_30%_10%,black_10%,transparent_65%)]" />
      <div aria-hidden className="absolute -right-32 top-0 -z-10 size-[460px] rounded-full bg-spark/10 blur-[120px]" />
      <Container>
        <Eyebrow className="fade-up" >
          {eyebrow}
        </Eyebrow>
        <h1
          id="page-title"
          className="mt-6 max-w-[16ch] text-[clamp(2.9rem,10vw,8rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
        >
          <span className="rise-mask">
            <span style={delay(100)}>
              <Rich text={title} underline />
            </span>
          </span>
        </h1>
        {intro && (
          <p className="fade-up mt-8 max-w-2xl text-lg leading-relaxed text-navy-100 sm:text-xl" style={delay(300)}>
            {intro}
          </p>
        )}
        {children && (
          <div className="fade-up mt-10" style={delay(420)}>
            {children}
          </div>
        )}
      </Container>
      <div className="mt-16 pb-4 text-white/20 sm:mt-24">
        <BridgeDivider />
      </div>
    </section>
  );
}
