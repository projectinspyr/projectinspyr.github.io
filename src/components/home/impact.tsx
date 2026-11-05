"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, type CSSProperties } from "react";
import type { ImpactStat } from "@content/impact";
import { cn } from "@/lib/utils";
import { Container, Section, SectionHeading } from "../ui/section";

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const format = (n: number) => new Intl.NumberFormat("en-IN").format(Math.round(n));

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => (el.textContent = format(n)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <>
      <span ref={ref} aria-hidden>
        {format(value)}
      </span>
      {suffix && <span aria-hidden>{suffix}</span>}
      <span className="sr-only">
        {format(value)}
        {suffix}
      </span>
    </>
  );
}

const cards = [
  "bg-spark text-ink -rotate-1",
  "bg-white text-ink rotate-1",
  "bg-signal text-ink -rotate-1",
  "bg-tape text-ink rotate-1",
];

/** The scoreboard. Cards read "TBA" until a real number is set in content/impact.ts. */
export function ImpactStrip({
  eyebrow,
  title,
  intro,
  stats,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  stats: ImpactStat[];
}) {
  if (stats.length === 0) return null;

  return (
    <Section tone="base" labelledBy="impact-title">
      <Container>
        <SectionHeading id="impact-title" eyebrow={eyebrow} eyebrowColor="spark" title={title} intro={intro} align="center" />
        <dl className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as CSSProperties}
              className={cn("flex flex-col-reverse border-4 border-ink px-4 py-7 text-center shadow-comic-md sm:py-9", cards[i % cards.length])}
            >
              <dt className="mt-2 font-display text-[1.25rem] leading-tight tracking-[0.05em]">{stat.label}</dt>
              <dd className="font-display text-[clamp(3.25rem,6vw,4.5rem)] leading-none">
                {stat.value === null ? "TBA" : <Counter value={stat.value} suffix={stat.suffix} />}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
