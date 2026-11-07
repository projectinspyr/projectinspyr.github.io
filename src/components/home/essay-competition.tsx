import { essay } from "@content/essay";
import { cn } from "@/lib/utils";
import { ButtonLink } from "../ui/button";
import { Container, Section, SectionHeading } from "../ui/section";

/** The essay competition, in detail, under the bulletin board. Wording lives in content/essay.ts. */
export function EssayCompetition() {
  if (!essay.show) return null;

  return (
    <Section id="essay-competition" tone="deep" labelledBy="essay-title" className="scroll-mt-[76px]">
      <Container>
        <SectionHeading id="essay-title" eyebrow={essay.eyebrow} eyebrowColor="spark" title={essay.title} intro={essay.intro} />

        <div data-reveal className="mt-12 grid gap-6 sm:grid-cols-2">
          {essay.categories.map((c, i) => (
            <div
              key={c.name}
              className={cn(
                "on-paper border-4 border-ink bg-paper p-6 text-ink shadow-comic-md sm:p-8",
                i % 2 === 0 ? "-rotate-[0.5deg]" : "rotate-[0.5deg]",
              )}
            >
              <h3 className="text-[clamp(2rem,4vw,2.75rem)] leading-none">{c.name}</h3>
              <dl className="mt-5 space-y-4">
                <div>
                  <dt className="font-marker text-sm text-signal-ink">VKE</dt>
                  <dd className="mt-1 text-[1.05rem] leading-relaxed">{c.vke}</dd>
                </div>
                <div>
                  <dt className="font-marker text-sm text-signal-ink">Other schools</dt>
                  <dd className="mt-1 text-[1.05rem] leading-relaxed">{c.others}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>

        <h3 data-reveal className="mt-20 text-[clamp(2.25rem,4.4vw,3.25rem)] leading-none">
          Choose <span className="text-spark">one</span> prompt
        </h3>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ol className="contents">
            {essay.prompts.map((p, i) => (
              <li
                key={p.title}
                data-reveal
                className={cn(
                  "on-paper flex flex-col border-4 border-ink bg-white p-6 text-ink shadow-comic",
                  // An odd last prompt fills its row on two columns; on three, the rules sit beside it.
                  essay.prompts.length % 2 === 1 && i === essay.prompts.length - 1 && "md:col-span-2 lg:col-span-1",
                )}
              >
                <span
                  aria-hidden
                  className="self-start border-[3px] border-ink bg-spark px-2.5 py-0.5 font-display text-[1.6rem] leading-none tracking-[0.04em] shadow-comic-sm"
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <h4 className="mt-4 font-display text-[1.75rem] leading-none tracking-[0.03em]">{p.title}</h4>
                <p className="mt-3 leading-relaxed text-navy-500">{p.question}</p>
              </li>
            ))}
          </ol>

          <div data-reveal className="on-paper border-4 border-ink bg-tape p-6 text-ink shadow-comic-red sm:p-8 md:col-span-2">
            <h3 className="text-[clamp(1.9rem,3.6vw,2.5rem)] leading-none">{essay.rulesTitle}</h3>
            <p className="mt-4 text-[1.05rem] leading-relaxed">{essay.rules}</p>
          </div>
        </div>

        <div data-reveal className="mt-16 flex flex-wrap items-center gap-5">
          <p className="w-full font-marker text-lg text-spark sm:w-auto sm:pr-2">Ready to write?</p>
          {essay.signups.map((s, i) => (
            <ButtonLink key={s.href} href={s.href} variant={i === 0 ? "primary" : "white"}>
              {s.label}
            </ButtonLink>
          ))}
        </div>
      </Container>
    </Section>
  );
}
