"use client";

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { home } from "@content/pages/home";
import { parseRich, type Tone } from "../ui/rich";
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

// Unlit words stay readable (4:1 on the section background) and warm to their colour as they light up.
const UNLIT = "#6f7b96";
const LIT: Record<Tone, string> = { plain: "#ffffff", accent: "#ff2e4c", alt: "#ffd100" };

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
    <section aria-labelledby="manifesto-title" className="relative overflow-hidden border-b-4 border-ink bg-navy-950 py-24 sm:py-32">
      <Container>
        <Eyebrow color="spark" className="mb-10">
          <span id="manifesto-title">{home.manifesto.eyebrow}</span>
        </Eyebrow>
        <div ref={ref} className="max-w-[34ch] space-y-[1em] font-display text-[clamp(2.25rem,5.6vw,4.5rem)] leading-[1.06] tracking-[0.015em]">
          {paragraphs.map((words, p) => (
            <p key={p} className={p === 0 ? "pb-[0.2em] text-[1.25em] leading-[1]" : undefined}>
              {words.map((word, i) => (
                <span key={word.index}>
                  {i > 0 && !word.glue ? " " : ""}
                  {reduced ? (
                    <span style={{ color: LIT[word.tone] }}>{word.text}</span>
                  ) : (
                    <ScrollWord word={word} progress={scrollYProgress} />
                  )}
                </span>
              ))}
            </p>
          ))}
        </div>
        <p data-reveal className="mt-12 font-marker text-2xl text-spark">— {home.manifesto.signature}</p>
      </Container>
    </section>
  );
}
