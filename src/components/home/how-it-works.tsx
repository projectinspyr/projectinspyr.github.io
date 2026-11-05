"use client";

import { m, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { home } from "@content/pages/home";
import { cn } from "@/lib/utils";
import { BRIDGE, archPath, burstPoints, hangers, leftBank, rightBank } from "../brand/bridge-geometry";
import { ButtonLink } from "../ui/button";
import { Rich } from "../ui/rich";
import { Container, Eyebrow, Section } from "../ui/section";

const { width, height, deckY, left, right, apexY } = BRIDGE;
const mid = (left + right) / 2;
const ease = [0.65, 0, 0.35, 1] as const;
const INK = "#0d0d0d";

/** The bridge, built up one stage per step: 0 connect, 1 show up, 2 tell the story. */
function StepBridge({ step, className }: { step: number; className?: string }) {
  const built = step >= 1;
  const told = step >= 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn("h-auto w-full", className)} aria-hidden>
      <g stroke={INK} strokeWidth="5">
        <path d={leftBank} fill="#1e2c4f" />
        <path d={rightBank} fill="#1e2c4f" />
      </g>

      {/* Ghost of the bridge still to come */}
      <path d={archPath} fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="4" strokeDasharray="6 16" />
      <path d={`M${left} ${deckY} H${right}`} stroke={INK} strokeOpacity="0.35" strokeWidth="4" strokeDasharray="6 16" />

      {hangers.map((h, i) => (
        <m.line
          key={h.x}
          x1={h.x}
          x2={h.x}
          y1={h.top}
          y2={deckY}
          stroke={INK}
          strokeWidth="3"
          initial={false}
          animate={{ opacity: built ? 1 : 0 }}
          transition={{ delay: built ? 0.35 + i * 0.03 : 0, duration: 0.2 }}
        />
      ))}
      <m.path
        d={`M${left - 40} ${deckY} H${right + 40}`}
        stroke={INK}
        strokeWidth="9"
        initial={false}
        animate={{ pathLength: built ? 1 : 0, opacity: built ? 1 : 0 }}
        transition={{ duration: 0.7, ease }}
      />
      <m.path
        d={archPath}
        fill="none"
        stroke={INK}
        strokeWidth="9"
        initial={false}
        animate={{ pathLength: built ? 1 : 0, opacity: built ? 1 : 0 }}
        transition={{ duration: 0.9, ease }}
      />

      {/* Volunteers on the deck */}
      {[0.36, 0.46, 0.56].map((t, i) => (
        <m.circle
          key={t}
          cx={left + (right - left) * t}
          cy={deckY - 20}
          r="13"
          fill="#ff2e4c"
          stroke={INK}
          strokeWidth="4"
          initial={false}
          animate={{ opacity: built ? 1 : 0, y: built ? 0 : 12 }}
          transition={{ delay: built ? 0.7 + i * 0.08 : 0, duration: 0.3 }}
        />
      ))}

      {/* Your organization, calling out */}
      <circle cx={left} cy={deckY} r="13" fill="#ff2e4c" stroke={INK} strokeWidth="5" />
      {step === 0 && (
        <m.circle
          cx={left}
          cy={deckY}
          fill="none"
          stroke="#ff2e4c"
          strokeWidth="5"
          initial={{ r: 14, opacity: 1 }}
          animate={{ r: 48, opacity: 0 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* The public */}
      <m.circle cx={right} cy={deckY} r="13" stroke={INK} strokeWidth="5" initial={false} animate={{ fill: told ? "#ffd100" : "#ffffff" }} />

      {/* The spark: rests on the arch once built, lands on the public at the end */}
      <m.g
        initial={false}
        animate={{ x: told ? right : mid, y: told ? deckY : apexY, opacity: built ? 1 : 0 }}
        transition={{ duration: 0.8, ease }}
      >
        <polygon points={burstPoints(34, 15, 8)} fill="#ffd100" stroke={INK} strokeWidth="4" />
      </m.g>
    </svg>
  );
}

type StepProps = {
  index: number;
  title: string;
  body: string;
  active: boolean;
  onActive: (i: number) => void;
};

function Step({ index, title, body, active, onActive }: StepProps) {
  const ref = useRef<HTMLLIElement>(null);
  // Desktop: the step crossing the middle of the screen drives the sticky bridge.
  const centred = useInView(ref, { margin: "-50% 0px -50% 0px" });
  // Phones: each card builds its own small bridge once it is on screen.
  const seen = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  useEffect(() => {
    if (centred) onActive(index);
  }, [centred, index, onActive]);

  return (
    <li ref={ref} className="lg:flex lg:min-h-[62svh] lg:items-center">
      <div
        className={cn(
          "on-paper w-full border-4 border-ink bg-white p-6 text-ink shadow-comic-md transition-[opacity,rotate] duration-300 sm:p-8",
          index % 2 === 0 ? "-rotate-[0.6deg]" : "rotate-[0.6deg]",
          active ? "lg:rotate-0 lg:opacity-100" : "lg:opacity-50",
        )}
      >
        <div className="sm:grid sm:grid-cols-[1fr_1.1fr] sm:items-center sm:gap-8 lg:block">
          <div>
            <p>
              <span aria-hidden className="inline-block border-[3px] border-ink bg-spark px-3 py-0.5 font-display text-[2rem] leading-none tracking-[0.04em] shadow-comic-sm">
                0{index + 1}
              </span>
              <span className="sr-only">Step {index + 1}</span>
            </p>
            <h3 className="mt-4 text-[clamp(2.25rem,4.4vw,3.25rem)] leading-none">{title}</h3>
            <p className="mt-3 max-w-md text-[1.05rem] leading-relaxed text-navy-500">{body}</p>
          </div>
          <StepBridge step={seen ? index : -1} className="mt-6 sm:mt-0 lg:hidden" />
        </div>
      </div>
    </li>
  );
}

export function HowItWorks() {
  const { howItWorks } = home;
  const [active, setActive] = useState(0);

  return (
    <Section id="how" tone="deep" labelledBy="how-title" className="scroll-mt-[76px] lg:py-0">
      <Container>
        <div className="lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:self-start lg:pb-6 lg:pt-24">
            <div data-reveal>
              <Eyebrow color="spark" className="mb-4">{howItWorks.eyebrow}</Eyebrow>
              <h2 id="how-title" className="text-[clamp(2.75rem,6vw,4.25rem)] leading-[0.98]">
                <Rich text={howItWorks.title} />
              </h2>
            </div>

            <div className="hidden lg:block">
              <div className="mt-8 border-4 border-ink bg-white p-4 shadow-comic-red">
                <StepBridge step={active} />
              </div>
              <ol aria-hidden className="mt-6 grid grid-cols-3 gap-3">
                {howItWorks.steps.map((s, i) => (
                  <li
                    key={s.title}
                    className={cn(
                      "border-[3px] border-ink px-2 py-1.5 text-center font-display text-[1.05rem] leading-tight tracking-[0.03em] transition-colors",
                      i === active ? "bg-spark text-ink" : i < active ? "bg-tape text-ink" : "bg-navy-800 text-navy-100",
                    )}
                  >
                    {s.title}
                  </li>
                ))}
              </ol>
              <div className="mt-6">
                <ButtonLink href={howItWorks.cta.href} magnetic>
                  {howItWorks.cta.label}
                </ButtonLink>
              </div>
            </div>
          </div>

          <ol className="mt-12 space-y-6 lg:mt-0 lg:space-y-0 lg:pb-[14svh] lg:pt-[19svh]">
            {howItWorks.steps.map((step, i) => (
              <Step key={step.title} index={i} title={step.title} body={step.body} active={i === active} onActive={setActive} />
            ))}
          </ol>

          <div data-reveal className="mt-10 lg:hidden">
            <ButtonLink href={howItWorks.cta.href} magnetic>
              {howItWorks.cta.label}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
