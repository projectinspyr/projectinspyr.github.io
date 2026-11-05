import { Fragment } from "react";
import { cn } from "@/lib/utils";

export type Tone = "plain" | "accent" | "alt";
export type Segment = { text: string; tone: Tone };
export type Surface = "navy" | "paper" | "yellow";

/** Splits "[[red]]" and "{{yellow}}" markers into styled segments. */
export function parseRich(text: string): Segment[] {
  return text
    .split(/(\[\[.+?\]\]|\{\{.+?\}\})/g)
    .filter(Boolean)
    .map((part) => {
      if (part.startsWith("[[")) return { text: part.slice(2, -2), tone: "accent" as const };
      if (part.startsWith("{{")) return { text: part.slice(2, -2), tone: "alt" as const };
      return { text: part, tone: "plain" as const };
    });
}

// Red reads only at headline sizes; yellow and paper surfaces get a deeper red to stay legible.
const toneBySurface: Record<Surface, Record<Exclude<Tone, "plain">, string>> = {
  navy: { accent: "text-signal", alt: "text-spark" },
  paper: { accent: "text-signal-deep", alt: "bg-spark px-[0.14em] box-decoration-clone" },
  yellow: { accent: "text-signal-ink", alt: "text-navy-800" },
};

export function Rich({ text, surface = "navy" }: { text: string; surface?: Surface }) {
  return (
    <>
      {parseRich(text).map((seg, i) =>
        seg.tone === "plain" ? (
          <Fragment key={i}>{seg.text}</Fragment>
        ) : (
          <span key={i} className={cn("whitespace-nowrap", toneBySurface[surface][seg.tone])}>
            {seg.text}
          </span>
        ),
      )}
    </>
  );
}
