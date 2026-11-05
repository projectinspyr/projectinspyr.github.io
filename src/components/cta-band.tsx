import { home } from "@content/pages/home";
import { ButtonLink } from "./ui/button";
import { Burst } from "./ui/doodles";
import { Rich } from "./ui/rich";
import { Container } from "./ui/section";

/** The closing call to action, shared by every page. */
export function CtaBand() {
  const { closing } = home;

  return (
    <section aria-labelledby="cta-title" className="on-yellow relative overflow-hidden bg-spark py-16 text-ink sm:py-20">
      <div aria-hidden className="halftone-blue absolute inset-0" />
      <Container className="relative">
        <div className="mx-auto max-w-3xl text-center" data-reveal>
          <Burst aria-hidden className="mx-auto mb-5 size-14 text-signal" />
          <h2 id="cta-title" className="text-[clamp(3rem,8vw,5.5rem)] leading-[0.95]">
            <Rich text={closing.title} surface="yellow" />
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed">{closing.body}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href={closing.primary.href} magnetic>
              {closing.primary.label}
            </ButtonLink>
            <ButtonLink href={closing.secondary.href} variant="navy" magnetic>
              {closing.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
