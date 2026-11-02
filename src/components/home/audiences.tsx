import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { home } from "@content/pages/home";
import { site } from "@content/site";
import { cn, isExternal } from "@/lib/utils";
import { Arrow, Briefcase, Circled, Paperclip } from "../ui/doodles";
import { Container, Section, SectionHeading } from "../ui/section";

const art: Record<string, ReactNode> = {
  public: (
    <svg viewBox="0 0 64 56" aria-hidden className="h-12 w-14">
      <circle cx="18" cy="16" r="7" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <circle cx="46" cy="16" r="7" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <circle cx="32" cy="22" r="8" fill="currentColor" />
      <path d="M6 46c1-9 6-14 12-14M58 46c-1-9-6-14-12-14M18 52c1-11 7-17 14-17s13 6 14 17" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  ),
  sponsors: <Briefcase className="h-12 w-14" />,
  students: (
    <svg viewBox="0 0 64 56" aria-hidden className="h-12 w-14">
      <path d="M4 20 32 8l28 12-28 12Z" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M16 26v12c4 5 10 7 16 7s12-2 16-7V26" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M56 22v16" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  ),
};

const tilt = ["sm:-rotate-[1.6deg]", "sm:rotate-[1.2deg] sm:translate-y-6", "sm:-rotate-[0.8deg]"];

export function Audiences() {
  const { audiences } = home;

  return (
    <Section tone="deep" labelledBy="audiences-title" className="overflow-hidden">
      <Container>
        <SectionHeading id="audiences-title" eyebrow={audiences.eyebrow} title={audiences.title} />

        <ul className="mt-14 grid gap-8 sm:mt-20 md:grid-cols-3 md:gap-6 lg:gap-10">
          {audiences.cards.map((card, i) => {
            const href = card.href ?? site.social.instagram.href;
            const external = isExternal(href);
            const linkClass =
              "mt-8 inline-flex items-center gap-2 font-semibold text-navy-900 after:absolute after:inset-0 after:content-['']";
            const linkInner = (
              <>
                {card.cta}
                <Arrow className="size-5 transition-transform duration-300 group-hover:translate-x-1" />
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </>
            );

            return (
              <li
                key={card.key}
                data-reveal
                style={{ "--reveal-delay": `${i * 110}ms` } as CSSProperties}
              >
                <article
                  className={cn(
                    "on-paper group relative h-full rounded-[6px] bg-paper p-7 pt-10 text-navy-900 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.65)] transition-transform duration-500 ease-[var(--ease-spring)] hover:-translate-y-2 hover:rotate-0 sm:p-8 sm:pt-12",
                    tilt[i],
                  )}
                >
                  {i === 1 ? (
                    <Paperclip className="absolute -top-5 right-8 h-14 w-7 text-navy-700" />
                  ) : (
                    <span className={cn("tape -top-3", i === 0 ? "left-6 -rotate-6" : "right-6 rotate-3")} />
                  )}
                  <span className="text-navy-800">{art[card.key]}</span>
                  <h3 className="relative mt-6 inline-block text-3xl font-extrabold tracking-[-0.025em]">
                    {card.title}
                    {i === 0 && <Circled className="absolute -inset-x-3 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+1.5rem)] text-signal-deep/70" />}
                  </h3>
                  <p className="mt-3 text-[1.05rem] leading-relaxed text-navy-800/90">{card.body}</p>
                  {external ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {linkInner}
                    </a>
                  ) : (
                    <Link href={href} className={linkClass}>
                      {linkInner}
                    </Link>
                  )}
                </article>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
