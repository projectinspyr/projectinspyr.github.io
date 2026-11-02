"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import type { ImpactStat } from "@content/impact";

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = useReducedMotion();
  const format = (n: number) => new Intl.NumberFormat("en-IN").format(Math.round(n));

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.8,
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
      {suffix && <span aria-hidden className="text-spark">{suffix}</span>}
      <span className="sr-only">{format(value)}{suffix}</span>
    </>
  );
}

/** Real numbers only. Renders nothing unless content/impact.ts has entries. */
export function ImpactStrip({ title, eyebrow, stats }: { title: string; eyebrow: string; stats: ImpactStat[] }) {
  if (stats.length === 0) return null;

  return (
    <section aria-label={eyebrow} className="border-y border-white/10 bg-navy-850 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <p className="mb-10 text-sm font-semibold uppercase tracking-[0.18em] text-navy-300">{title.replace(/\[\[|\]\]/g, "")}</p>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse border-l-2 border-spark/70 pl-5">
              <dt className="mt-2 text-sm text-navy-200 sm:text-base">{stat.label}</dt>
              <dd className="font-display text-[clamp(2.75rem,7vw,5rem)] font-extrabold leading-none tracking-[-0.04em]">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
