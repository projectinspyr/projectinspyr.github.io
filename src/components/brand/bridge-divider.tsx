"use client";

import { m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const SAMPLES = Array.from({ length: 13 }, (_, i) => i / 12);
// Arch: y = 40 - 128 t (1 - t) inside a 48-unit-tall box.
const LEFTS = SAMPLES.map((t) => `${t * 100}%`);
const TOPS = SAMPLES.map((t) => `${((40 - 128 * t * (1 - t)) / 48) * 100}%`);

/** A thin arch between sections. A spark crosses it once as it scrolls into view. */
export function BridgeDivider({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className={cn("relative mx-auto h-10 w-full max-w-[1320px] px-5 sm:h-12 sm:px-8 lg:px-12", className)}>
      <div className="relative h-full w-full">
        <svg viewBox="0 0 1200 48" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          <m.path
            d="M0 40 Q600 -24 1200 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
            initial={reduced ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          />
        </svg>
        {!reduced && (
          <m.span
            className="absolute size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spark shadow-[0_0_14px_4px_rgb(245_197_24/0.55)]"
            initial={{ left: "0%", top: TOPS[0], opacity: 0 }}
            whileInView={{ left: LEFTS, top: TOPS, opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0] }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 1.6, ease: "linear", delay: 0.2 }}
          />
        )}
      </div>
    </div>
  );
}
