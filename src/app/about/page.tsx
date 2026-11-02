import Image from "next/image";
import type { CSSProperties } from "react";
import { aboutFaqs } from "@content/faqs";
import { about } from "@content/pages/about";
import { team, timeline } from "@content/team";
import { CtaBand } from "@/components/cta-band";
import { PageHero } from "@/components/page-hero";
import { FaqList } from "@/components/ui/faq";
import { Spark, TeamIcon } from "@/components/ui/doodles";
import { Rich } from "@/components/ui/rich";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: about.meta.title,
  description: about.meta.description,
  path: "/about",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow={about.hero.eyebrow} title={about.hero.title} intro={about.hero.intro} />

      {/* Story */}
      <Section tone="base" labelledBy="story-title" className="pt-10 sm:pt-12 lg:pt-16">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start" data-reveal>
            <Eyebrow className="mb-5">{about.story.eyebrow}</Eyebrow>
            <h2 id="story-title" className="text-[clamp(2.25rem,6vw,4.25rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
              <Rich text={about.story.title} />
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-navy-100 sm:text-xl">
            {about.story.paragraphs.map((p, i) => (
              <p key={i} data-reveal style={delay(i * 80)} className={i === 0 ? "text-white first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[4.2em] first-letter:font-extrabold first-letter:leading-[0.8] first-letter:text-spark" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </Container>
      </Section>

      {/* Mission */}
      <section aria-labelledby="mission-title" className="bg-navy-800 pb-20 sm:pb-28">
        <Container>
          <figure data-reveal className="on-paper relative rounded-[8px] bg-paper px-7 py-12 text-navy-900 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.7)] sm:px-14 sm:py-16 lg:px-20">
            <span className="tape -top-3 left-10 -rotate-3" />
            <span className="tape -top-3 right-10 rotate-6" />
            <p id="mission-title" className="text-sm font-bold uppercase tracking-[0.18em] text-navy-700">
              {about.mission.eyebrow}
            </p>
            <blockquote className="mt-5 font-display text-[clamp(1.6rem,4.2vw,3.1rem)] font-bold leading-[1.1] tracking-[-0.025em]">
              <Rich text={about.mission.statement} onPaper />
            </blockquote>
          </figure>
        </Container>
      </section>

      {/* Values */}
      <Section tone="deep" labelledBy="values-title">
        <Container>
          <SectionHeading id="values-title" eyebrow={about.values.eyebrow} title={about.values.title} />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-2">
            {about.values.items.map((v, i) => (
              <li key={v.title} data-reveal style={delay(i * 80)} className="group relative bg-navy-900 p-8 transition-colors duration-500 hover:bg-navy-850 sm:p-10">
                <span aria-hidden className="font-display text-sm font-bold text-navy-300">0{i + 1}</span>
                <h3 className="mt-6 flex items-center gap-3 text-[clamp(1.6rem,3vw,2.2rem)] font-extrabold tracking-[-0.025em]">
                  {v.title}
                  <Spark className="size-5 -translate-x-2 text-spark opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                </h3>
                <p className="mt-3 max-w-md text-lg leading-relaxed text-navy-200">{v.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Teams */}
      <Section tone="base" labelledBy="teams-title">
        <Container>
          <SectionHeading id="teams-title" eyebrow={about.teams.eyebrow} title={about.teams.title} intro={about.teams.intro} />
          <ol className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden className="absolute left-0 right-0 top-[3.25rem] hidden h-px bg-gradient-to-r from-transparent via-white/25 to-transparent lg:block" />
            {about.teams.items.map((t, i) => (
              <li key={t.key} data-reveal style={delay(i * 90)} className="relative rounded-[24px] border border-white/10 bg-navy-850 p-7">
                <span className="relative grid size-[4.5rem] place-items-center rounded-2xl border border-white/10 bg-navy-700 text-spark">
                  <TeamIcon team={t.key} className="size-10" />
                </span>
                <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-navy-300">Team 0{i + 1}</p>
                <h3 className="mt-1 text-2xl font-extrabold tracking-[-0.02em]">{t.title}</h3>
                <p className="mt-3 leading-relaxed text-navy-200">{t.body}</p>
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
            <ul className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {team.map((person, i) => (
                <li key={person.name} data-reveal style={delay(i * 60)}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] bg-navy-700">
                    {person.photo ? (
                      <Image src={person.photo} alt={`${person.name}, ${person.role}`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
                    ) : (
                      <span aria-hidden className="grid size-full place-items-center font-display text-5xl font-extrabold text-navy-300">
                        {person.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <p className="mt-4 font-display text-lg font-bold">{person.name}</p>
                  <p className="text-sm text-navy-200">
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
            <ol className="relative mt-14 space-y-10 border-l border-white/15 pl-8 sm:pl-12">
              {timeline.map((item, i) => (
                <li key={`${item.date}-${item.title}`} data-reveal style={delay(i * 60)} className="relative">
                  <span aria-hidden className="absolute -left-[calc(2rem+5px)] top-1.5 size-2.5 rounded-full bg-spark sm:-left-[calc(3rem+5px)]" />
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-spark">{item.date}</p>
                  <h3 className="mt-1 text-2xl font-extrabold tracking-[-0.02em]">{item.title}</h3>
                  {item.body && <p className="mt-2 max-w-xl text-navy-200">{item.body}</p>}
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      )}

      {/* FAQ */}
      <Section tone="deep" labelledBy="about-faq-title">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="about-faq-title" eyebrow={about.faq.eyebrow} title={about.faq.title} />
          <FaqList items={aboutFaqs} />
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
