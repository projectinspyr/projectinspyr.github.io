import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { home } from "@content/pages/home";
import { site } from "@content/site";
import { cn, isExternal } from "@/lib/utils";
import { Arrow, Briefcase } from "../ui/doodles";
import { Container, Section, SectionHeading } from "../ui/section";

const art: Record<string, ReactNode> = {
  public: (
    <svg viewBox="0 0 64 56" aria-hidden className="h-11 w-12">
      <circle cx="18" cy="16" r="7" fill="none" stroke="currentColor" strokeWidth="3.4" />
      <circle cx="46" cy="16" r="7" fill="none" stroke="currentColor" strokeWidth="3.4" />
      <circle cx="32" cy="22" r="8" fill="currentColor" />
      <path d="M6 46c1-9 6-14 12-14M58 46c-1-9-6-14-12-14M18 52c1-11 7-17 14-17s13 6 14 17" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  ),
  sponsors: <Briefcase className="h-11 w-12" />,
  students: (
    <svg viewBox="0 0 64 56" aria-hidden className="h-11 w-12">
      <path d="M4 20 32 8l28 12-28 12Z" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinejoin="round" />
      <path d="M16 26v12c4 5 10 7 16 7s12-2 16-7V26" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
      <path d="M56 22v16" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" />
    </svg>
  ),
};

const avatar = ["bg-signal", "bg-spark", "bg-tape"];

export function Audiences() {
  const { audiences } = home;

  return (
    <Section tone="deep" labelledBy="audiences-title">
      <Container>
        <SectionHeading id="audiences-title" eyebrow={audiences.eyebrow} eyebrowColor="navy" title={audiences.title} />

        <ul className="mt-12 grid gap-7 md:grid-cols-3">
          {audiences.cards.map((card, i) => {
            const href = card.href ?? site.social.instagram.href;
            const external = isExternal(href);
            const linkClass =
              "mt-6 inline-flex items-center gap-2 border-[3px] border-ink bg-spark px-3 py-1.5 font-display text-[1.2rem] leading-none tracking-[0.05em] text-ink shadow-comic-sm after:absolute after:inset-0 after:content-['']";
            const linkInner = (
              <>
                {card.cta}
                <Arrow className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </>
            );

            return (
              <li key={card.key} data-reveal style={{ "--reveal-delay": `${i * 90}ms` } as CSSProperties}>
                <article className="on-paper group relative h-full border-4 border-ink bg-white p-7 text-center text-ink shadow-comic-md transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic-lg">
                  <span className={cn("mx-auto grid size-24 place-items-center rounded-full border-4 border-ink shadow-comic-md", avatar[i % avatar.length])}>
                    {art[card.key]}
                  </span>
                  <h3 className="mt-6 text-[2.1rem] leading-none">{card.title}</h3>
                  <p className="mt-3 leading-relaxed text-navy-500">{card.body}</p>
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
