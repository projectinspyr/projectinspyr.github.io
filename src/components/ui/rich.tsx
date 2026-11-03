import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { Squiggle } from "./doodles";

export type Tone = "plain" | "spark" | "signal";
export type Segment = { text: string; tone: Tone };

/** Splits "[[yellow]]" and "{{red}}" markers into styled segments. */
export function parseRich(text: string): Segment[] {
  return text
    .split(/(\[\[.+?\]\]|\{\{.+?\}\})/g)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith("[[")) return { text: part.slice(2, -2), tone: "spark" as const };
      if (part.startsWith("{{")) return { text: part.slice(2, -2), tone: "signal" as const };
      return { text: part, tone: "plain" as const };
    });
}

export const toneClass: Record<Tone, string> = {
  plain: "",
  spark: "text-spark",
  signal: "text-signal",
};

type RichProps = {
  text: string;
  /** Draw a hand-made squiggle under yellow highlights. */
  underline?: boolean;
  /** Use dark-on-light highlight colours (for paper surfaces). */
  onPaper?: boolean;
};

export function Rich({ text, underline, onPaper }: RichProps) {
  return (
    <>
      {parseRich(text).map((seg, i) => {
        if (seg.tone === "plain") return <Fragment key={i}>{seg.text}</Fragment>;
        const color = onPaper
          ? seg.tone === "spark"
            ? "bg-spark/70 px-[0.12em] box-decoration-clone"
            : "text-signal-ink"
          : toneClass[seg.tone];
        return (
          <span key={i} className={cn("relative whitespace-nowrap", color)}>
            {seg.text}
            {underline && seg.tone === "spark" && !onPaper && (
              <Squiggle className="pointer-events-none absolute -bottom-[0.08em] left-[2%] h-[0.11em] w-[96%] w-full text-signal" draw />
            )}
          </span>
        );
      })}
    </>
  );
}
