import { nothingPinned, pinned, slides } from "@content/bulletin";
import { ButtonLink } from "../ui/button";
import { PushPin } from "../ui/doodles";
import { Rich } from "../ui/rich";
import { Container } from "../ui/section";
import { BulletinSlides } from "./bulletin-slides";

/** The note pinned to the yellow wall. All wording lives in content/bulletin.ts. */
export function Bulletin() {
  const note = pinned ?? nothingPinned;

  return (
    <>
      <section aria-labelledby="bulletin-title" className="relative overflow-hidden border-b-4 border-ink bg-spark px-4 pb-16 pt-28 sm:px-6">
        <div aria-hidden className="halftone-blue absolute inset-0" />
        <div aria-hidden className="absolute inset-3 top-[84px] border-[3px] border-ink/30" />

        <div className="relative mx-auto max-w-3xl">
          <span aria-hidden className="sticker absolute -top-7 right-2 rotate-6 font-display text-6xl text-signal [text-shadow:4px_4px_0_#0d0d0d] sm:-right-10 sm:-top-8 sm:text-8xl">
            !
          </span>
          <span aria-hidden className="sticker absolute -top-4 right-9 -rotate-3 font-display text-4xl text-signal [animation-delay:1s] [text-shadow:3px_3px_0_#0d0d0d] sm:-top-5 sm:right-2 sm:text-6xl">
            !
          </span>

          <div className="on-paper slap-in relative -rotate-1 border-4 border-ink bg-paper px-6 py-12 text-center text-ink shadow-comic-lg sm:px-12">
            <span aria-hidden className="tape -top-4 left-8 -rotate-6" />
            <span aria-hidden className="tape -top-4 right-8 rotate-6" />
            <span aria-hidden className="absolute left-1/2 top-3 size-6 -translate-x-1/2 rounded-full border-[3px] border-ink bg-signal shadow-[2px_3px_0_0_#0d0d0d]" />

            <p className="inline-flex rotate-1 items-center gap-2 font-marker text-sm text-signal-ink sm:text-base">
              <PushPin className="size-4 shrink-0" />
              {note.tag}
            </p>

            <h2 id="bulletin-title" className="mt-4 text-[clamp(2.5rem,6.4vw,3.75rem)] leading-none tracking-[0.03em]">
              {note.title.map((line) => (
                <span key={line} className="block">
                  <Rich text={line} surface="paper" />
                </span>
              ))}
            </h2>

            <p className="mx-auto mt-4 max-w-md text-navy-500">{note.body}</p>

            {note.actions && note.actions.length > 0 && (
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {note.actions.map((action) => (
                  <ButtonLink key={action.label} href={action.href} variant={action.style ?? "primary"}>
                    {action.label}
                  </ButtonLink>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-label="Bulletin board posters" className="bg-navy-800 px-4 pb-16 pt-14 sm:px-6">
        <Container className="max-w-5xl px-0 sm:px-0 lg:px-0">
          <BulletinSlides slides={slides} />
        </Container>
      </section>
    </>
  );
}
