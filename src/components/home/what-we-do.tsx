import type { CSSProperties } from "react";
import { home } from "@content/pages/home";
import { Container, Section, SectionHeading } from "../ui/section";
import { Paperclip, Pin, Spark, TeamIcon } from "../ui/doodles";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

function VolunteerArt() {
  // Three schematic figures carrying a crate together.
  return (
    <svg viewBox="0 0 240 150" aria-hidden className="h-auto w-full max-w-[260px]">
      <rect x="62" y="70" width="116" height="44" rx="6" fill="#f5c518" />
      <path d="M62 86h116" stroke="#071328" strokeOpacity=".25" strokeWidth="3" />
      {[40, 120, 200].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={i === 1 ? 26 : 40} r="13" fill={i === 1 ? "#f23a3a" : "#fbf8f2"} />
          <rect x={x - 16} y={i === 1 ? 44 : 58} width="32" height="56" rx="16" fill={i === 1 ? "#f23a3a" : "#fbf8f2"} opacity={i === 1 ? 1 : 0.9} />
        </g>
      ))}
      <path d="M8 138h224" stroke="#fbf8f2" strokeOpacity=".3" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PhoneArt() {
  return (
    <svg viewBox="0 0 150 230" aria-hidden className="h-auto w-[132px] sm:w-[150px]">
      <rect x="6" y="4" width="138" height="222" rx="24" fill="#071328" stroke="#fbf8f2" strokeOpacity=".7" strokeWidth="3" />
      <rect x="56" y="14" width="38" height="7" rx="3.5" fill="#fbf8f2" fillOpacity=".35" />
      <circle cx="75" cy="104" r="26" fill="#f23a3a" />
      <path d="m68 92 20 12-20 12Z" fill="#fff" />
      <rect x="22" y="170" width="86" height="7" rx="3.5" fill="#fbf8f2" fillOpacity=".7" />
      <rect x="22" y="184" width="56" height="7" rx="3.5" fill="#fbf8f2" fillOpacity=".35" />
      <rect x="22" y="204" width="106" height="4" rx="2" fill="#fbf8f2" fillOpacity=".2" />
      <rect x="22" y="204" width="64" height="4" rx="2" fill="#f5c518" />
    </svg>
  );
}

export function WhatWeDo() {
  const { whatWeDo } = home;
  const [volunteer, story] = whatWeDo.pillars;

  return (
    <Section tone="base" labelledBy="what-title">
      <Container>
        <SectionHeading id="what-title" eyebrow={whatWeDo.eyebrow} title={whatWeDo.title} intro={whatWeDo.intro} />

        <div className="mt-14 grid gap-4 sm:mt-20 lg:grid-cols-6 lg:gap-5">
          <article
            data-reveal
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-navy-700 p-7 sm:p-10 lg:col-span-3 lg:row-span-2"
          >
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-spark">01 · Hands</p>
            <h3 className="mt-4 text-[clamp(1.9rem,4.4vw,3rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">{volunteer.title}</h3>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-navy-100">{volunteer.body}</p>
            <div className="mt-10 flex justify-end transition-transform duration-700 ease-[var(--ease-spring)] group-hover:-translate-y-1">
              <VolunteerArt />
            </div>
          </article>

          <article
            data-reveal
            style={delay(100)}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-navy-900 p-7 sm:p-10 lg:col-span-3 lg:row-span-2"
          >
            <Paperclip className="absolute -top-2 right-10 h-16 w-8 rotate-12 text-navy-300/70" />
            <p className="font-display text-sm font-bold uppercase tracking-[0.16em] text-spark">02 · Stories</p>
            <h3 className="mt-4 text-[clamp(1.9rem,4.4vw,3rem)] font-extrabold leading-[0.98] tracking-[-0.03em]">{story.title}</h3>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-navy-100">{story.body}</p>
            <div className="mt-8 flex items-end justify-between gap-6">
              <ul className="space-y-2 text-sm font-semibold text-navy-200">
                <li className="flex items-center gap-2"><Spark className="size-3 text-spark" /> Scripted</li>
                <li className="flex items-center gap-2"><Spark className="size-3 text-spark" /> Shot on the ground</li>
                <li className="flex items-center gap-2"><Spark className="size-3 text-spark" /> Cut for phones</li>
              </ul>
              <div className="-rotate-3 transition-transform duration-700 ease-[var(--ease-spring)] group-hover:rotate-0">
                <PhoneArt />
              </div>
            </div>
          </article>

          {whatWeDo.facts.map((fact, i) => (
            <div
              key={fact.label}
              data-reveal
              style={delay(160 + i * 80)}
              className="flex items-center gap-5 rounded-[24px] border border-white/10 bg-navy-850 p-6 lg:col-span-2"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/[0.06] text-spark">
                {i === 0 ? <Pin className="h-8 w-7" /> : i === 1 ? <TeamIcon team="reels" className="size-8" /> : <TeamIcon team="outreach" className="size-8" />}
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-navy-300">{fact.label}</p>
                <p className="mt-1 font-display text-lg font-bold leading-snug">{fact.value}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
