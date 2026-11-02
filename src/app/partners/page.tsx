import type { CSSProperties } from "react";
import { partnerFaqs } from "@content/faqs";
import { partnersPage } from "@content/pages/partners";
import { CtaBand } from "@/components/cta-band";
import { PartnerForm } from "@/components/forms/partner-form";
import { PageHero } from "@/components/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { Briefcase, Check, Paperclip, TeamIcon } from "@/components/ui/doodles";
import { FaqList } from "@/components/ui/faq";
import { Rich } from "@/components/ui/rich";
import { Container, Eyebrow, Section, SectionHeading } from "@/components/ui/section";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: partnersPage.meta.title,
  description: partnersPage.meta.description,
  path: "/partners",
});

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;
const whyIcons = ["production", "reels", "outreach"];

export default function PartnersPage() {
  const { hero, why, perks, process, faq, form } = partnersPage;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} intro={hero.intro}>
        <ButtonLink href={hero.cta.href} magnetic>
          {hero.cta.label}
        </ButtonLink>
      </PageHero>

      {/* Why */}
      <Section tone="base" labelledBy="why-title" className="pt-10 sm:pt-12 lg:pt-16">
        <Container>
          <SectionHeading id="why-title" eyebrow={why.eyebrow} title={why.title} />
          <ul className="mt-14 grid gap-5 md:grid-cols-3">
            {why.items.map((item, i) => (
              <li key={item.title} data-reveal style={delay(i * 90)} className="group rounded-[24px] border border-white/10 bg-navy-850 p-7 transition-colors duration-500 hover:border-spark/40 sm:p-8">
                <span className="grid size-14 place-items-center rounded-2xl bg-navy-700 text-spark transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6 group-hover:scale-110">
                  <TeamIcon team={whyIcons[i]} className="size-8" />
                </span>
                <h3 className="mt-6 text-2xl font-extrabold tracking-[-0.02em]">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-navy-200">{item.body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* What a partner gets */}
      <Section tone="deep" labelledBy="perks-title">
        <Container>
          <SectionHeading id="perks-title" eyebrow={perks.eyebrow} title={perks.title} />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {perks.groups.map((group, i) => (
              <article
                key={group.type}
                data-reveal
                style={delay(i * 100)}
                className="on-paper relative flex flex-col rounded-[8px] bg-paper p-7 text-navy-900 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] sm:p-8"
              >
                {i === 1 ? <Paperclip className="absolute -top-5 right-8 h-14 w-7 text-navy-700" /> : <span className={i === 0 ? "tape -top-3 left-6 -rotate-3" : "tape -top-3 right-6 rotate-3"} />}
                <span className="text-navy-800">
                  {group.type === "sponsor" ? <Briefcase className="h-10 w-12" /> : <TeamIcon team={group.type === "service" ? "outreach" : "scripts"} className="size-10" />}
                </span>
                <h3 className="mt-5 text-2xl font-extrabold leading-tight tracking-[-0.02em]">{group.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  {group.items.map((perk) => (
                    <li key={perk} className="flex gap-3 leading-snug text-navy-800">
                      <Check className="mt-0.5 size-5 shrink-0 text-signal-ink" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href={`?type=${group.type}#inquiry`}
                  className="mt-auto inline-flex items-center gap-2 pt-8 font-semibold text-navy-900 underline decoration-navy-800/30 decoration-2 underline-offset-4 transition-colors hover:decoration-signal-ink"
                >
                  {group.cta}
                </a>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section tone="base" labelledBy="process-title">
        <Container>
          <SectionHeading id="process-title" eyebrow={process.eyebrow} title={process.title} />
          <ol className="relative mt-16 grid gap-10 md:grid-cols-5 md:gap-6">
            <svg aria-hidden viewBox="0 0 1000 60" preserveAspectRatio="none" className="absolute left-[10%] right-[10%] top-[-34px] hidden h-[60px] w-[80%] md:block">
              <path d="M0 52 Q500 -30 1000 52" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="5 8" vectorEffect="non-scaling-stroke" />
            </svg>
            <span aria-hidden className="absolute bottom-4 left-[1.45rem] top-4 w-px bg-white/15 md:hidden" />
            {process.steps.map((step, i) => (
              <li key={step.title} data-reveal style={delay(i * 90)} className="relative flex gap-5 md:block md:text-center">
                <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full border-2 border-spark bg-navy-800 font-display text-lg font-extrabold text-spark md:mx-auto">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-xl font-extrabold tracking-[-0.015em] md:mt-5">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-navy-200">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="deep" labelledBy="partner-faq-title">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading id="partner-faq-title" eyebrow={faq.eyebrow} title={faq.title} />
          <FaqList items={partnerFaqs} />
        </Container>
      </Section>

      {/* Inquiry */}
      <section id="inquiry" aria-labelledby="inquiry-title" className="scroll-mt-20 bg-navy-800 py-20 sm:py-28">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div data-reveal className="mb-10 text-center">
              <Eyebrow className="mb-5 justify-center">{form.eyebrow}</Eyebrow>
              <h2 id="inquiry-title" className="text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
                <Rich text={form.title} />
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-navy-200">{form.intro}</p>
            </div>
            <div className="on-paper relative rounded-[20px] bg-paper p-6 text-navy-900 shadow-[0_40px_90px_-40px_rgb(0_0_0/0.8)] sm:p-10">
              <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />
              <PartnerForm />
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
