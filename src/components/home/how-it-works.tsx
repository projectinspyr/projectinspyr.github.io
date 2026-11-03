"use client";

import { m, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { home } from "@content/pages/home";
import { cn } from "@/lib/utils";
import { BRIDGE, archPath, hangers, leftBank, rightBank } from "../brand/bridge-geometry";
import { ButtonLink } from "../ui/button";
import { Rich } from "../ui/rich";
import { Container, Eyebrow, Section } from "../ui/section";

const { width, height, deckY, left, right, apexY } = BRIDGE;
const mid = (left + right) / 2;
const ease = [0.65, 0, 0.35, 1] as const;

/** The bridge, built up one stage per step: 0 connect, 1 show up, 2 tell the story. */
function StepBridge({ step, className }: { step: number; className?: string }) {
  const built = step >= 1;
  const told = step >= 2;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn("h-auto w-full", className)} aria-hidden>
      <path d={leftBank} fill="#16305a" />
      <path d={rightBank} fill="#16305a" />

      {/* Ghost of the bridge still to come */}
      <path d={archPath} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" />
      <path d={`M${left} ${deckY} H${right}`} stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" />

      <m.path
        d={`M${left - 70} ${deckY} H${right + 70}`}
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="5"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: built ? 1 : 0, opacity: built ? 1 : 0 }}
        transition={{ duration: 0.9, ease }}
      />
      {hangers.map((h, i) => (
        <m.line
          key={h.x}
          x1={h.x}
          x2={h.x}
          y1={h.top}
          y2={deckY}
          stroke="rgba(255,255,255,0.26)"
          strokeWidth="2"
          initial={false}
          animate={{ opacity: built ? 1 : 0 }}
          transition={{ delay: built ? 0.35 + i * 0.03 : 0, duration: 0.3 }}
        />
      ))}
      <m.path
        d={archPath}
        fill="none"
        stroke="#fbf8f2"
        strokeWidth="6"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: built ? 1 : 0, opacity: built ? 1 : 0 }}
        transition={{ duration: 1.1, ease }}
      />

      {/* Volunteers on the deck */}
      {[0.36, 0.46, 0.56].map((t, i) => (
        <m.circle
          key={t}
          cx={left + (right - left) * t}
          cy={deckY - 16}
          r="10"
          fill="#f23a3a"
          initial={false}
          animate={{ opacity: built ? 1 : 0, y: built ? 0 : 12 }}
          transition={{ delay: built ? 0.8 + i * 0.08 : 0, duration: 0.5 }}
        />
      ))}

      {/* Your organization, calling out */}
      <circle cx={left} cy={deckY} r="11" fill="#f23a3a" />
      {step === 0 && (
        <m.circle
          cx={left}
          cy={deckY}
          fill="none"
          stroke="#f23a3a"
          strokeWidth="3"
          initial={{ r: 12, opacity: 0.9 }}
          animate={{ r: 44, opacity: 0 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      {/* The public */}
      <m.circle cx={right} cy={deckY} r="11" initial={false} animate={{ fill: told ? "#f5c518" : "#fbf8f2" }} />

      {/* The spark: rests on the arch once built, lands on the public at the end */}
      <m.g
        initial={false}
        animate={{ x: told ? right - mid : 0, y: told ? deckY - apexY : 0, opacity: built ? 1 : 0 }}
        transition={{ duration: 0.9, ease }}
      >
        <circle cx={mid} cy={apexY} r="24" fill="#f5c518" opacity="0.22" />
        <circle cx={mid} cy={apexY} r="9" fill="#ffe27a" />
      </m.g>
      {told &&
        [0, 1, 2].map((ring) => (
          <m.circle
            key={ring}
            cx={right}
            cy={deckY}
            fill="none"
            stroke="#f5c518"
            strokeWidth="2"
            initial={{ r: 14, opacity: 0.7 }}
            animate={{ r: 96, opacity: 0 }}
            transition={{ duration: 2.4, delay: ring * 0.8, repeat: Infinity, ease: "easeOut" }}
          />
        ))}
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
    <li
      ref={ref}
      className="rounded-[24px] border border-white/10 bg-navy-850 p-6 sm:p-8 lg:flex lg:min-h-[62svh] lg:items-center lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0"
    >
      <div
        className={cn(
          "transition-opacity duration-500 sm:grid sm:grid-cols-[1fr_1.1fr] sm:items-center sm:gap-8 lg:block",
          active ? "lg:opacity-100" : "lg:opacity-35",
        )}
      >
        <div>
          <p className="flex items-baseline gap-3">
            <span aria-hidden className="font-display text-2xl font-extrabold text-spark lg:text-[5rem] lg:leading-none lg:tracking-[-0.05em]">
              0{index + 1}
            </span>
            <span className="sr-only">Step {index + 1}</span>
          </p>
          <h3 className="mt-2 text-[clamp(1.75rem,4.4vw,3.25rem)] font-extrabold leading-none tracking-[-0.03em] lg:mt-4">{title}</h3>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-navy-200">{body}</p>
        </div>
        <StepBridge step={seen ? index : -1} className="mt-6 sm:mt-0 lg:hidden" />
      </div>
    </li>
  );
}

export function HowItWorks() {
  const { howItWorks } = home;
  const [active, setActive] = useState(0);

  return (
    <Section tone="deep" labelledBy="how-title" className="lg:py-0">
      <div>
        <Container>
          <div className="lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:self-start lg:pb-8 lg:pt-28">
              <div data-reveal>
                <Eyebrow className="mb-5">{howItWorks.eyebrow}</Eyebrow>
                <h2 id="how-title" className="text-[clamp(2.25rem,7vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
                  <Rich text={howItWorks.title} />
                </h2>
              </div>

              <div className="hidden lg:block">
                <StepBridge step={active} className="mt-12" />
                <ol aria-hidden className="mt-8 grid grid-cols-3 gap-4">
                  {howItWorks.steps.map((s, i) => (
                    <li key={s.title}>
                      <span className="block h-[3px] overflow-hidden rounded-full bg-white/10">
                        <span
                          className="block h-full origin-left bg-spark transition-transform duration-700 ease-[var(--ease-spring)]"
                          style={{ transform: `scaleX(${i <= active ? 1 : 0})` }}
                        />
                      </span>
                      <span className={cn("mt-3 block text-sm font-semibold transition-colors", i === active ? "text-white" : "text-navy-300")}>
                        0{i + 1} · {s.title}
                      </span>
                    </li>
                  ))}
                </ol>
                <div className="mt-10">
                  <ButtonLink href={howItWorks.cta.href} magnetic>
                    {howItWorks.cta.label}
                  </ButtonLink>
                </div>
              </div>
            </div>

            <ol className="mt-12 space-y-5 lg:mt-0 lg:space-y-0 lg:py-[19svh]">
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
      </div>
    </Section>
  );
}
