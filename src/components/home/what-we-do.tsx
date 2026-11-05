import type { CSSProperties } from "react";
import { home } from "@content/pages/home";
import { Burst, Heart, Numeral, Pin, TeamIcon } from "../ui/doodles";
import { Container, Section, SectionHeading } from "../ui/section";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

function VolunteerArt() {
  // Three schematic figures carrying a crate together.
  return (
    <svg viewBox="0 0 240 150" aria-hidden className="h-full w-full">
      <path d="M0 136h240" stroke="#0d0d0d" strokeWidth="5" />
      {[40, 120, 200].map((x, i) => (
        <g key={x} stroke="#0d0d0d" strokeWidth="4">
          <circle cx={x} cy={i === 1 ? 26 : 40} r="13" fill={i === 1 ? "#ff2e4c" : "#fff"} />
          <rect x={x - 16} y={i === 1 ? 44 : 58} width="32" height={i === 1 ? 92 : 78} fill={i === 1 ? "#ff2e4c" : "#fff"} />
        </g>
      ))}
      <rect x="58" y="72" width="124" height="48" fill="#ffd100" stroke="#0d0d0d" strokeWidth="5" />
      <path d="M58 92h124" stroke="#0d0d0d" strokeWidth="4" />
    </svg>
  );
}

function PhoneArt() {
  return (
    <svg viewBox="0 0 150 230" aria-hidden className="h-full w-auto">
      <rect x="6" y="4" width="138" height="222" fill="#fff" stroke="#0d0d0d" strokeWidth="5" />
      <rect x="56" y="14" width="38" height="7" fill="#0d0d0d" />
      <circle cx="75" cy="100" r="28" fill="#ff2e4c" stroke="#0d0d0d" strokeWidth="5" />
      <path d="m66 86 26 14-26 14Z" fill="#fff" stroke="#0d0d0d" strokeWidth="3" strokeLinejoin="round" />
      <rect x="22" y="160" width="106" height="9" fill="#0d0d0d" />
      <rect x="22" y="178" width="66" height="9" fill="#0d0d0d" opacity=".35" />
      <rect x="22" y="202" width="106" height="8" fill="#fff" stroke="#0d0d0d" strokeWidth="3" />
      <rect x="22" y="202" width="62" height="8" fill="#ffd100" stroke="#0d0d0d" strokeWidth="3" />
    </svg>
  );
}

const card = "relative border-4 border-ink shadow-comic-md";

export function WhatWeDo() {
  const { whatWeDo } = home;
  const [volunteer, story] = whatWeDo.pillars;

  return (
    <Section tone="base" labelledBy="what-title">
      <Container>
        <SectionHeading id="what-title" eyebrow={whatWeDo.eyebrow} title={whatWeDo.title} intro={whatWeDo.intro} />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          <article data-reveal className={`${card} on-yellow overflow-hidden bg-spark p-7 text-ink sm:p-8 lg:col-span-2`}>
            <Heart className="size-11" />
            <h3 className="mt-4 text-[clamp(2.25rem,4vw,3rem)] leading-none">{volunteer.title}</h3>
            <p className="relative mt-3 max-w-xl text-[1.05rem] leading-relaxed">{volunteer.body}</p>
            <Numeral value="01" className="absolute -bottom-3 right-2 h-32 w-auto text-ink/10" />
          </article>

          <figure data-reveal style={delay(80)} className={`${card} on-paper flex min-h-[260px] flex-col bg-white`}>
            <div className="min-h-0 flex-1 p-5">
              <VolunteerArt />
            </div>
            <figcaption className="absolute bottom-4 left-4 border-[3px] border-ink bg-signal-deep px-3 py-1 font-display text-[1.25rem] leading-none tracking-[0.04em] text-white shadow-comic-sm">
              {whatWeDo.handsCaption}
            </figcaption>
          </figure>

          <article data-reveal style={delay(140)} className={`${card} overflow-hidden bg-navy-900 p-7 sm:p-8`}>
            <TeamIcon team="reels" className="size-11 text-spark" />
            <h3 className="mt-4 text-[clamp(2rem,3.2vw,2.5rem)] leading-none text-spark">{story.title}</h3>
            <p className="relative mt-3 text-[1.02rem] leading-relaxed text-navy-100">{story.body}</p>
            <Numeral value="02" className="absolute -bottom-3 right-2 h-24 w-auto text-white/[0.07]" />
          </article>

          <article data-reveal style={delay(200)} className={`${card} on-paper bg-white p-7 text-ink sm:p-8`}>
            <ul className="space-y-5">
              {whatWeDo.facts.map((fact, i) => (
                <li key={fact.label} className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center border-[3px] border-ink bg-tape">
                    {i === 0 ? <Pin className="h-6 w-5" /> : i === 1 ? <TeamIcon team="reels" className="size-6" /> : <TeamIcon team="production" className="size-6" />}
                  </span>
                  <p>
                    <span className="block text-sm text-navy-500">{fact.label}</span>
                    <span className="block font-display text-[1.35rem] leading-tight tracking-[0.03em]">{fact.value}</span>
                  </p>
                </li>
              ))}
            </ul>
          </article>

          <figure data-reveal style={delay(260)} className={`${card} on-paper flex min-h-[300px] items-start justify-center overflow-hidden bg-signal p-5`}>
            <div className="h-[210px]">
              <PhoneArt />
            </div>
            <Burst aria-hidden className="absolute right-3 top-3 size-14 text-spark" />
            <figcaption className="absolute inset-x-4 bottom-4 border-[3px] border-ink bg-white px-3 py-2 font-marker text-[0.92rem] leading-snug text-ink shadow-comic-sm">
              “{whatWeDo.bubble}”
              <span aria-hidden className="absolute -bottom-[11px] left-6 size-4 rotate-45 border-b-[3px] border-r-[3px] border-ink bg-white" />
            </figcaption>
          </figure>
        </div>
      </Container>
    </Section>
  );
}
