"use client";

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { home } from "@content/pages/home";
import { cn } from "@/lib/utils";
import { parseRich, toneClass, type Tone } from "../ui/rich";
import { Container, Eyebrow } from "../ui/section";

type Word = { text: string; tone: Tone; index: number };

function toWords(paragraphs: string[]) {
  let index = 0;
  return paragraphs.map((p) =>
    parseRich(p).flatMap((seg) =>
      seg.text
        .split(/\s+/)
        .filter(Boolean)
        .map((text) => ({ text, tone: seg.tone, index: index++ }) as Word),
    ),
  );
}

const paragraphs = toWords(home.manifesto.paragraphs);
const total = paragraphs.flat().length;

function ScrollWord({ word, progress }: { word: Word; progress: MotionValue<number> }) {
  const start = word.index / total;
  const opacity = useTransform(progress, [start, start + 1.5 / total], [0.16, 1]);
  return (
    <m.span style={{ opacity }} className={cn("inline-block", toneClass[word.tone])}>
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
        <div ref={ref} className="max-w-[22ch] space-y-[0.7em] font-display text-[clamp(1.85rem,5.4vw,4.5rem)] font-bold leading-[1.06] tracking-[-0.03em] sm:max-w-[24ch]">
          {paragraphs.map((words, p) => (
            <p key={p} className={p === 0 ? "text-[1.18em] font-extrabold" : undefined}>
              {words.map((word, i) => (
                <span key={word.index}>
                  {reduced ? (
                    <span className={toneClass[word.tone]}>{word.text}</span>
                  ) : (
                    <ScrollWord word={word} progress={scrollYProgress} />
                  )}
                  {i < words.length - 1 ? " " : ""}
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
