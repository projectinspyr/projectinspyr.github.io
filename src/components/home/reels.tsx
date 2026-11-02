import type { CSSProperties } from "react";
import { home } from "@content/pages/home";
import { reels } from "@content/reels";
import { site } from "@content/site";
import { socialLinks } from "@content/social";
import { ButtonLink } from "../ui/button";
import { InstagramGlyph } from "../ui/doodles";
import { Container, Section, SectionHeading } from "../ui/section";
import { ReelCard } from "./reel-card";

function EmptyReels() {
  const { reels: copy } = home;
  return (
    <div
      data-reveal
      className="relative mt-14 grid items-center gap-10 overflow-hidden rounded-[28px] border border-dashed border-white/20 bg-navy-850 p-7 sm:p-12 md:grid-cols-[auto_1fr]"
    >
      <div aria-hidden className="relative mx-auto flex gap-3 md:mx-0">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="relative h-48 w-28 rounded-[18px] border border-white/15 bg-navy-900 sm:h-56 sm:w-32"
            style={{ transform: `rotate(${(i - 1) * 5}deg) translateY(${i === 1 ? -10 : 0}px)` }}
          >
            <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/10">
              <svg viewBox="0 0 24 24" className="ml-0.5 size-4 fill-white/60"><path d="M7 4.5v15l13-7.5Z" /></svg>
            </span>
            <span className="absolute inset-x-3 bottom-4 h-1 rounded-full bg-white/10">
              <span className="block h-full w-1/3 rounded-full bg-spark/70" />
            </span>
            {i === 1 && <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-6" />}
          </div>
        ))}
      </div>
      <div>
        <p className="font-hand text-2xl text-spark">Coming soon</p>
        <h3 className="mt-2 text-[clamp(1.6rem,3.6vw,2.5rem)] font-extrabold leading-tight tracking-[-0.025em]">{copy.emptyTitle}</h3>
        <p className="mt-3 max-w-lg text-lg text-navy-200">{copy.emptyBody}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <ButtonLink href={site.social.instagram.href} variant="secondary" icon="external">
            <span className="inline-flex items-center gap-2">
              <InstagramGlyph className="size-5" /> {site.social.instagram.handle}
            </span>
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}

export function Reels() {
  const { reels: copy } = home;

  return (
    <Section tone="base" labelledBy="reels-title">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="reels-title" eyebrow={copy.eyebrow} title={copy.title} intro={copy.intro} />
          {reels.length > 0 && (
            <div data-reveal className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <ButtonLink key={link.href} href={link.href} variant="secondary">
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          )}
        </div>

        {reels.length === 0 ? (
          <EmptyReels />
        ) : (
          <ul className="-mx-5 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {reels.map((reel, i) => (
              <li
                key={reel.url}
                data-reveal
                style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}
                className="w-[72vw] max-w-[300px] shrink-0 snap-start sm:w-auto sm:max-w-none"
              >
                <ReelCard reel={reel} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
