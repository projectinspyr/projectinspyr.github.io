"use client";

import { m, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { home } from "@content/pages/home";
import { cn } from "@/lib/utils";
import { BRIDGE, archPath, hangers } from "../brand/bridge-geometry";
import { ButtonLink } from "../ui/button";
import { Rich } from "../ui/rich";
import { Container, Eyebrow, Section } from "../ui/section";

const { width, height, deckY, left, right, apexY } = BRIDGE;

/** The bridge, built up one stage per step. */
function StepBridge({ step }: { step: number }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" aria-hidden>
      <path d={`M0 ${deckY} H${left + 30} L${left + 6} ${height} H0 Z`} fill="#1b3d70" />
      <path d={`M${width} ${deckY} H${right - 30} L${right - 6} ${height} H${width} Z`} fill="#1b3d70" />

      <path d={archPath} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeDasharray="4 14" strokeLinecap="round" />

      <m.path
        d={`M${left - 40} ${deckY} H${right + 40}`}
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="5"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: step >= 1 ? 1 : 0 }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      />
      {hangers.map((h, i) => (
        <m.line
          key={h.x}
          x1={h.x}
          x2={h.x}
          y1={h.top}
          y2={deckY}
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="2"
          initial={false}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ delay: step >= 1 ? 0.3 + i * 0.025 : 0, duration: 0.3 }}
        />
      ))}
      <m.path
        d={archPath}
        fill="none"
        stroke="#fbf8f2"
        strokeWidth="6"
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: step >= 1 ? 1 : 0 }}
        transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1] }}
      />

      {/* Volunteers on the deck */}
      {[0.32, 0.42, 0.52].map((t, i) => (
        <m.circle
          key={t}
          cx={left + (right - left) * t}
          cy={deckY - 14}
          r="9"
          fill="#f23a3a"
          initial={false}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 12 }}
          transition={{ delay: step >= 1 ? 0.8 + i * 0.08 : 0, duration: 0.5 }}
        />
      ))}

      <circle cx={left} cy={deckY} r="12" fill="#f23a3a" />
      <m.circle
        cx={left}
        cy={deckY}
        r="12"
        fill="none"
        stroke="#f23a3a"
        strokeWidth="3"
        initial={false}
        animate={{ r: step === 0 ? [12, 34] : 12, opacity: step === 0 ? [0.9, 0] : 0 }}
        transition={{ duration: 1.6, repeat: step === 0 ? Infinity : 0 }}
      />

      <m.circle
        cx={right}
        cy={deckY}
        r="12"
        initial={false}
        animate={{ fill: step >= 2 ? "#f5c518" : "#fbf8f2" }}
      />

      {/* The spark lands on the public side */}
      <m.g
        initial={false}
        animate={{
          x: step >= 2 ? right - (left + right) / 2 : 0,
          y: step >= 2 ? deckY - apexY : 0,
          opacity: step >= 1 ? 1 : 0,
        }}
        transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1] }}
      >
        <circle cx={(left + right) / 2} cy={apexY} r="24" fill="#f5c518" opacity="0.25" />
        <circle cx={(left + right) / 2} cy={apexY} r="9" fill="#ffe27a" />
      </m.g>
      {[0, 1, 2].map((ring) => (
        <m.circle
          key={ring}
          cx={right}
          cy={deckY}
          fill="none"
          stroke="#f5c518"
          strokeWidth="2"
          initial={false}
          animate={step >= 2 ? { r: [14, 90], opacity: [0.7, 0] } : { r: 14, opacity: 0 }}
          transition={{ duration: 2.4, delay: ring * 0.8, repeat: step >= 2 ? Infinity : 0, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

function Step({
  index,
  title,
  body,
  onActive,
}: {
  index: number;
  title: string;
  body: string;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="flex flex-col justify-center py-10 lg:min-h-[64svh] lg:py-0">
      <span
        aria-hidden
        className={cn(
          "font-display text-[5.5rem] font-extrabold leading-none tracking-[-0.05em] transition-colors duration-500 sm:text-[7rem]",
          inView ? "text-spark" : "text-transparent [-webkit-text-stroke:1.5px_rgb(188_203_226/0.5)]",
        )}
      >
        0{index + 1}
      </span>
      <h3 className="mt-3 text-[clamp(2rem,4.6vw,3.25rem)] font-extrabold leading-none tracking-[-0.03em]">
        <span className="sr-only">Step {index + 1}: </span>
        {title}
      </h3>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-navy-200">{body}</p>
    </li>
  );
}

export function HowItWorks() {
  const { howItWorks } = home;
  const [active, setActive] = useState(0);

  return (
    <Section tone="deep" labelledBy="how-title">
      <Container>
        <div data-reveal className="max-w-3xl">
          <Eyebrow className="mb-5">{howItWorks.eyebrow}</Eyebrow>
          <h2 id="how-title" className="text-[clamp(2.25rem,7vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
            <Rich text={howItWorks.title} />
          </h2>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-6 lg:grid-cols-2 lg:gap-16">
          <div className="lg:order-2">
            <div className="sticky top-[84px] z-10 -mx-5 bg-navy-900/95 px-5 py-4 backdrop-blur-sm sm:-mx-8 sm:px-8 lg:top-0 lg:mx-0 lg:flex lg:h-svh lg:items-center lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-none">
              <div className="w-full">
                <StepBridge step={active} />
                <div className="mt-3 flex justify-between text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-navy-300 sm:text-xs">
                  <span>Your organization</span>
                  <span aria-hidden className="font-hand text-base normal-case tracking-normal text-spark">
                    {howItWorks.steps[active].title}
                  </span>
                  <span>The public</span>
                </div>
              </div>
            </div>
          </div>

          <ol className="lg:order-1 lg:py-[18svh]">
            {howItWorks.steps.map((step, i) => (
              <Step key={step.title} index={i} title={step.title} body={step.body} onActive={setActive} />
            ))}
          </ol>
        </div>

        <div data-reveal className="mt-6">
          <ButtonLink href={howItWorks.cta.href} magnetic>
            {howItWorks.cta.label}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
