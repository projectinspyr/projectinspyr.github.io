import { home } from "@content/pages/home";
import { ButtonLink } from "./ui/button";
import { Spark } from "./ui/doodles";
import { Rich } from "./ui/rich";
import { Container } from "./ui/section";

/** The closing call to action, shared by every page. */
export function CtaBand() {
  const { closing } = home;

  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-navy-800 py-24 sm:py-32">
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-0 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/10 blur-[140px]" />
      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center" data-reveal>
          <Spark className="mx-auto mb-8 size-10 text-spark motion-safe:animate-[spin_12s_linear_infinite]" />
          <h2 id="cta-title" className="text-[clamp(2.6rem,9vw,6.75rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
            <Rich text={closing.title} underline />
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-navy-200 sm:text-xl">{closing.body}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={closing.primary.href} magnetic>
              {closing.primary.label}
            </ButtonLink>
            <ButtonLink href={closing.secondary.href} variant="secondary" magnetic>
              {closing.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
