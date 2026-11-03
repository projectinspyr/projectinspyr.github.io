"use client";

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { home } from "@content/pages/home";
import { parseRich, toneClass, type Tone } from "../ui/rich";
import { Container, Eyebrow } from "../ui/section";

/** `glue` marks a word that touches the previous one, like the full stop after a highlight. */
type Word = { text: string; tone: Tone; index: number; glue: boolean };

function toWords(paragraphs: string[]) {
  let index = 0;
  return paragraphs.map((p) => {
    const segs = parseRich(p);
    return segs.flatMap((seg, s) => {
      const touchesPrev = s > 0 && !/^\s/.test(seg.text) && !/\s$/.test(segs[s - 1].text);
      return seg.text
        .split(/\s+/)
        .filter(Boolean)
        .map((text, w) => ({ text, tone: seg.tone, index: index++, glue: w === 0 && touchesPrev }) as Word);
    });
  });
}

const paragraphs = toWords(home.manifesto.paragraphs);
const total = paragraphs.flat().length;

// Unlit words stay readable (3.4:1 on the section background) and warm to their colour as they light up.
const UNLIT = "#5a6780";
const LIT: Record<Tone, string> = { plain: "#ffffff", spark: "#f5c518", signal: "#f23a3a" };

function ScrollWord({ word, progress }: { word: Word; progress: MotionValue<number> }) {
  const start = word.index / total;
  const color = useTransform(progress, [start, start + 1.5 / total], [UNLIT, LIT[word.tone]]);
  return (
    <m.span style={{ color }} className="inline-block">
      {word.text}
    </m.span>
  );
}

/** Words light up one by one as the reader scrolls through the statement. */
export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.78", "end 0.62"] });

  return (
    <section aria-labelledby="manifesto-title" className="relative overflow-hidden bg-navy-950 py-24 sm:py-32 lg:py-40">
      <div aria-hidden className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-spark/40 to-transparent" />
      <Container>
        <Eyebrow className="mb-10">
          <span id="manifesto-title">{home.manifesto.eyebrow}</span>
        </Eyebrow>
        <div ref={ref} className="max-w-[22ch] space-y-[1.3em] font-display text-[clamp(1.7rem,5vw,4.1rem)] font-bold leading-[1.13] tracking-[-0.028em] sm:max-w-[24ch]">
          {paragraphs.map((words, p) => (
            <p key={p} className={p === 0 ? "pb-[0.25em] text-[1.18em] font-extrabold leading-[1.04]" : undefined}>
              {words.map((word, i) => (
                <span key={word.index}>
                  {i > 0 && !word.glue ? " " : ""}
                  {reduced ? (
                    <span className={toneClass[word.tone]}>{word.text}</span>
                  ) : (
                    <ScrollWord word={word} progress={scrollYProgress} />
                  )}
                </span>
              ))}
            </p>
          ))}
        </div>
        <p data-reveal className="mt-14 font-hand text-3xl text-spark">— {home.manifesto.signature}</p>
      </Container>
    </section>
  );
}
