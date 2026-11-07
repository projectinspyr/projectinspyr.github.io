import { notFoundPage } from "@content/pages/not-found";
import { BrokenBridge } from "./brand/broken-bridge";
import { ButtonLink } from "./ui/button";
import { Rich } from "./ui/rich";
import { Container, Eyebrow } from "./ui/section";

/** The 404 page body: an unfinished bridge. */
export function NotFoundView() {
  return (
    <section aria-labelledby="nf-title" className="on-yellow relative overflow-hidden bg-spark pb-16 pt-28 text-ink sm:pt-32">
      <div aria-hidden className="halftone-blue absolute inset-0" />
      <Container className="relative">
        <div className="on-paper relative mx-auto max-w-4xl -rotate-1 border-4 border-ink bg-paper px-5 py-10 text-center shadow-comic-lg sm:px-10">
          <span aria-hidden className="tape -top-3 left-8 -rotate-6" />
          <span aria-hidden className="tape -top-3 right-8 rotate-6" />
          <Eyebrow color="spark">{notFoundPage.eyebrow}</Eyebrow>
          <h1 id="nf-title" className="mx-auto mt-5 max-w-[16ch] text-[clamp(3.25rem,9vw,6.5rem)] leading-[0.92]">
            <Rich text={notFoundPage.title} surface="paper" />
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-navy-500">{notFoundPage.body}</p>
          <BrokenBridge className="mt-6 h-auto w-full" />
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href={notFoundPage.primary.href}>{notFoundPage.primary.label}</ButtonLink>
            <ButtonLink href={notFoundPage.secondary.href} variant="navy">
              {notFoundPage.secondary.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
