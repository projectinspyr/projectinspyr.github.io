import type { Metadata } from "next";
import { notFoundPage } from "@content/pages/not-found";
import { BrokenBridge } from "@/components/brand/broken-bridge";
import { ButtonLink } from "@/components/ui/button";
import { Rich } from "@/components/ui/rich";
import { Container, Eyebrow } from "@/components/ui/section";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="relative overflow-hidden bg-navy-800 pb-20 pt-32 sm:pt-40">
      <Container className="text-center">
        <Eyebrow className="justify-center">{notFoundPage.eyebrow}</Eyebrow>
        <h1 id="nf-title" className="mx-auto mt-6 max-w-[14ch] text-[clamp(2.75rem,9vw,7rem)] font-extrabold leading-[0.92] tracking-[-0.045em]">
          <Rich text={notFoundPage.title} />
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-lg text-navy-200">{notFoundPage.body}</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href={notFoundPage.primary.href}>{notFoundPage.primary.label}</ButtonLink>
          <ButtonLink href={notFoundPage.secondary.href} variant="secondary">
            {notFoundPage.secondary.label}
          </ButtonLink>
        </div>
      </Container>
      <div className="mt-16 overflow-hidden">
        <BrokenBridge className="ml-[-28%] h-auto w-[156%] max-w-none sm:mx-auto sm:w-full sm:max-w-[1400px]" />
      </div>
    </section>
  );
}
