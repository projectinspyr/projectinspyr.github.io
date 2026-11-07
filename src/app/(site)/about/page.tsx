import Image from "next/image";
import type { CSSProperties } from "react";
import { aboutFaqs } from "@content/faqs";
import { about } from "@content/pages/about";
import { team, timeline } from "@content/team";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/ui/faq";
import { Numeral, TeamIcon } from "@/components/ui/doodles";
import { Rich } from "@/components/ui/rich";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { pageMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: about.meta.title,
  description: about.meta.description,
  path: "/about",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
const valueCards = ["bg-spark text-ink on-yellow", "bg-white text-ink on-paper", "bg-signal text-ink on-yellow", "bg-tape text-ink on-paper"];
const teamAvatars = ["bg-signal", "bg-spark", "bg-tape", "bg-navy-900 text-spark"];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={about.hero.eyebrow} title={about.hero.title} intro={about.hero.intro} sticker="POW!" />

      {/* Story */}
      <Section tone="base" labelledBy="story-title">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start" data-reveal>
            <Eyebrow className="mb-4">{about.story.eyebrow}</Eyebrow>
            <h2 id="story-title" className="text-[clamp(2.75rem,6vw,4.5rem)] leading-[0.98]">
              <Rich text={about.story.title} />
            </h2>
          </div>
          <div data-reveal className="on-paper relative rotate-[0.5deg] border-4 border-ink bg-paper p-6 text-ink shadow-comic-red sm:p-9">
            <span aria-hidden className="tape -top-3 left-8 -rotate-3" />
            <div className="space-y-5 text-[1.08rem] leading-relaxed">
              {about.story.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Mission */}
      <section aria-labelledby="mission-title" className="on-yellow relative overflow-hidden border-b-4 border-ink bg-spark py-16 text-ink sm:py-20">
        <div aria-hidden className="halftone-blue absolute inset-0" />
        <Container className="relative">
          <figure data-reveal className="on-paper relative mx-auto max-w-4xl -rotate-1 border-4 border-ink bg-paper px-6 py-11 text-center shadow-comic-lg sm:px-12">
            <span aria-hidden className="tape -top-3 left-8 -rotate-6" />
            <span aria-hidden className="tape -top-3 right-8 rotate-6" />
            <p id="mission-title" className="font-marker text-[0.95rem] text-signal-ink">
              {about.mission.eyebrow}
            </p>
            <blockquote className="mt-4 font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.03] tracking-[0.02em]">
              <Rich text={about.mission.statement} surface="paper" />
            </blockquote>
          </figure>
        </Container>
      </section>

      {/* Values */}
      <Section tone="deep" labelledBy="values-title">
        <Container>
          <SectionHeading id="values-title" eyebrow={about.values.eyebrow} eyebrowColor="spark" title={about.values.title} />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2">
            {about.values.items.map((v, i) => (
              <li key={v.title} data-reveal style={delay(i * 70)} className={cn("relative overflow-hidden border-4 border-ink p-7 shadow-comic-md sm:p-8", valueCards[i])}>
                <h3 className="text-[clamp(2.1rem,3.4vw,2.75rem)] leading-none">{v.title}</h3>
                <p className="relative mt-3 max-w-md text-[1.05rem] leading-relaxed">{v.body}</p>
                <Numeral value={`0${i + 1}`} className="absolute -bottom-2 right-2 h-24 w-auto text-ink/10" />
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Teams */}
      <Section tone="base" labelledBy="teams-title">
        <Container>
          <SectionHeading id="teams-title" eyebrow={about.teams.eyebrow} eyebrowColor="navy" title={about.teams.title} intro={about.teams.intro} />
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {about.teams.items.map((t, i) => (
              <li key={t.key} data-reveal style={delay(i * 80)} className="on-paper border-4 border-ink bg-white p-6 text-center text-ink shadow-comic-md">
                <span className={cn("mx-auto grid size-24 place-items-center rounded-full border-4 border-ink shadow-comic-md", teamAvatars[i])}>
                  <TeamIcon team={t.key} className="size-12" />
                </span>
                <h3 className="mt-5 text-[2.1rem] leading-none">{t.title}</h3>
                <p className="mt-2 inline-block border-[3px] border-ink bg-spark px-2 py-0.5 font-display text-[1rem] tracking-[0.06em]">Team 0{i + 1}</p>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-navy-500">{t.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* People: only when supplied */}
      {team.length > 0 && (
        <Section tone="deep" labelledBy="team-title">
          <Container>
            <SectionHeading id="team-title" eyebrow={about.team.eyebrow} title={about.team.title} />
            <ul className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {team.map((person, i) => (
                <li key={person.name} data-reveal style={delay(i * 60)} className="on-paper border-4 border-ink bg-white p-5 text-center text-ink shadow-comic-md">
                  <div className="relative mx-auto size-28 overflow-hidden rounded-full border-4 border-ink bg-spark">
                    {person.photo ? (
                      <Image src={person.photo} alt={`${person.name}, ${person.role}`} fill sizes="112px" className="object-cover" />
                    ) : (
                      <span aria-hidden className="grid size-full place-items-center font-display text-5xl">
                        {person.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 font-display text-[1.6rem] leading-none tracking-[0.03em]">{person.name}</p>
                  <p className="mt-2 text-sm text-navy-500">
                    {person.role}
                    {person.team ? ` · ${person.team}` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      )}

      {/* Timeline: only when supplied */}
      {timeline.length > 0 && (
        <Section tone="base" labelledBy="timeline-title">
          <Container>
            <SectionHeading id="timeline-title" eyebrow={about.timeline.eyebrow} title={about.timeline.title} />
            <ol className="relative mt-12 space-y-6 border-l-4 border-ink pl-7 sm:pl-10">
              {timeline.map((item, i) => (
                <li key={`${item.date}-${item.title}`} data-reveal style={delay(i * 60)} className="on-paper relative border-4 border-ink bg-white p-5 text-ink shadow-comic">
                  <span aria-hidden className="absolute -left-[2.45rem] top-5 size-5 border-[3px] border-ink bg-spark sm:-left-[3.2rem]" />
                  <p className="font-marker text-sm text-signal-ink">{item.date}</p>
                  <h3 className="mt-1 text-[1.9rem] leading-none">{item.title}</h3>
                  {item.body && <p className="mt-2 max-w-xl text-navy-500">{item.body}</p>}
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      )}

      {/* FAQ */}
      <Section tone="deep" labelledBy="about-faq-title">
        <Container className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
          <SectionHeading id="about-faq-title" eyebrow={about.faq.eyebrow} title={about.faq.title} />
          <FaqList items={aboutFaqs} />
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
