import Link from "next/link";
import type { CSSProperties } from "react";
import { partnerFaqs } from "@content/faqs";
import { partnersPage } from "@content/pages/partners";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Briefcase, Check, TeamIcon } from "@/components/ui/doodles";
import { FaqList } from "@/components/ui/faq";
import { Container, Section, SectionHeading } from "@/components/ui/section";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: partnersPage.meta.title,
  description: partnersPage.meta.description,
  path: "/partners",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
const whyIcons = ["production", "reels", "outreach"];
const whyCards = ["bg-spark on-yellow", "bg-white on-paper", "bg-tape on-paper"];

export default function PartnersPage() {
  const { hero, why, perks, process, faq } = partnersPage;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro} sticker="BOOM!">
        <ButtonLink href={hero.cta.href} magnetic>
          {hero.cta.label}
        </ButtonLink>
      </PageHero>

      {/* Why */}
      <Section tone="base" labelledBy="why-title">
        <Container>
          <SectionHeading id="why-title" eyebrow={why.eyebrow} eyebrowColor="spark" title={why.title} />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {why.items.map((item, i) => (
              <li key={item.title} data-reveal style={delay(i * 80)} className={cn("border-4 border-ink p-7 text-ink shadow-comic-md sm:p-8", whyCards[i])}>
                <TeamIcon team={whyIcons[i]} className="size-11" />
                <h3 className="mt-4 text-[2.1rem] leading-none">{item.title}</h3>
                <p className="mt-3 leading-relaxed">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* What a partner gets */}
      <Section tone="deep" labelledBy="perks-title">
        <Container>
          <SectionHeading id="perks-title" eyebrow={perks.eyebrow} title={perks.title} />
          <div className="mt-12 grid gap-7 lg:grid-cols-3">
            {perks.groups.map((group, i) => (
              <article
                key={group.type}
                data-reveal
                style={delay(i * 90)}
                className={cn(
                  "on-paper relative flex flex-col border-4 border-ink bg-paper p-7 text-ink shadow-comic-md sm:p-8",
                  i === 1 ? "lg:rotate-[0.6deg]" : "lg:-rotate-[0.6deg]",
                )}
              >
                <span aria-hidden className={i === 1 ? "tape -top-3 right-8 rotate-3" : "tape -top-3 left-8 -rotate-3"} />
                <span>
                  {group.type === "sponsor" ? <Briefcase className="h-11 w-12" /> : <TeamIcon team={group.type === "service" ? "outreach" : "scripts"} className="size-11" />}
                </span>
                <h3 className="mt-4 text-[2.1rem] leading-[1.02]">{group.title}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((perk) => (
                    <li key={perk} className="flex gap-3 leading-snug">
                      <span className="mt-0.5 grid size-6 shrink-0 place-items-center border-2 border-ink bg-spark">
                        <Check className="size-4" />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-7">
                  <Link
                    href="/contact?as=partner"
                    className="inline-block border-[3px] border-ink bg-navy-800 px-4 py-2 font-display text-[1.2rem] leading-none tracking-[0.05em] text-white shadow-comic transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic-md"
                  >
                    {group.cta}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="base" labelledBy="process-title">
        <Container>
          <SectionHeading id="process-title" eyebrow={process.eyebrow} eyebrowColor="navy" title={process.title} />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {process.steps.map((step, i) => (
              <li key={step.title} data-reveal style={delay(i * 70)} className="on-paper border-4 border-ink bg-white p-5 text-ink shadow-comic">
                <span className="inline-block border-[3px] border-ink bg-spark px-2.5 py-0.5 font-display text-[1.6rem] leading-none tracking-[0.04em] shadow-comic-sm">
                  {i + 1}
                </span>
                <h3 className="mt-3 text-[1.9rem] leading-none">{step.title}</h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-navy-500">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="deep" labelledBy="partner-faq-title">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading id="partner-faq-title" eyebrow={faq.eyebrow} title={faq.title} />
          <FaqList items={partnerFaqs} />
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
