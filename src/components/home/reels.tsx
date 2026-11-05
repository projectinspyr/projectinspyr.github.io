import type { CSSProperties } from "react";
import { home } from "@content/pages/home";
import { reels } from "@content/reels";
import { site } from "@content/site";
import { socialLinks } from "@content/social";
import { ButtonLink } from "../ui/button";
import { InstagramGlyph } from "../ui/doodles";
import { Container, Section, SectionHeading } from "../ui/section";
import { ReelCard } from "./reel-card";

/** The blank poster frame, until real reels are listed in content/reels.ts. */
function EmptyReels() {
  const { reels: copy } = home;
  return (
    <div data-reveal className="on-paper mx-auto mt-12 max-w-5xl border-4 border-ink bg-white p-4 text-ink shadow-comic-red-lg sm:p-7">
      <div className="flex min-h-[320px] flex-col items-center justify-center border-[3px] border-dashed border-ink/25 px-5 py-12 text-center">
        <p className="-rotate-1 border-[3px] border-ink bg-spark px-3 py-1 font-marker text-[0.85rem] shadow-comic-sm">{copy.emptyTag}</p>
        <h3 className="mt-5 text-[clamp(2.75rem,6vw,4.5rem)] leading-none">{copy.emptyTitle}</h3>
        <p className="mt-3 max-w-md text-lg text-navy-500">{copy.emptyBody}</p>
        <div className="mt-7">
          <ButtonLink href={site.social.instagram.href} variant="navy" icon="external">
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
          <SectionHeading id="reels-title" eyebrow={copy.eyebrow} eyebrowColor="navy" title={copy.title} intro={copy.intro} />
          {reels.length > 0 && (
            <div data-reveal className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <ButtonLink key={link.href} href={link.href} variant="spark">
                  {link.label}
                </ButtonLink>
              ))}
            </div>
          )}
        </div>

        {reels.length === 0 ? (
          <EmptyReels />
        ) : (
          <ul className="-mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {reels.map((reel, i) => (
              <li
                key={reel.url}
                data-reveal
                style={{ "--reveal-delay": `${i * 80}ms` } as CSSProperties}
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
