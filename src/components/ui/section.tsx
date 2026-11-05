import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Rich, type Surface } from "./rich";

const tones = {
  base: "bg-navy-800",
  deep: "bg-navy-900",
  deepest: "bg-navy-950",
  none: "",
} as const;

type SectionProps = {
  id?: string;
  tone?: keyof typeof tones;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
};

export function Section({ id, tone = "base", className, children, labelledBy }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative border-b-4 border-ink py-20 lg:py-28", tones[tone], className)}
    >
      {children}
    </section>
  );
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

const tagColors = {
  tape: "bg-tape text-ink",
  spark: "bg-spark text-ink",
  navy: "bg-navy-900 text-white",
  white: "bg-white text-ink",
} as const;

/** A hand-lettered label, like a sticker slapped above a headline. */
export function Eyebrow({
  children,
  className,
  color = "tape",
}: {
  children: ReactNode;
  className?: string;
  color?: keyof typeof tagColors;
}) {
  return (
    <p
      className={cn(
        "inline-block -rotate-1 border-[3px] border-ink px-3 py-1 font-marker text-[0.85rem] leading-snug shadow-comic-sm",
        tagColors[color],
        className,
      )}
    >
      {children}
    </p>
  );
}

type HeadingProps = {
  id?: string;
  eyebrow?: string;
  eyebrowColor?: keyof typeof tagColors;
  title: string;
  intro?: string;
  className?: string;
  align?: "left" | "center";
  surface?: Surface;
};

export function SectionHeading({
  id,
  eyebrow,
  eyebrowColor,
  title,
  intro,
  className,
  align = "left",
  surface = "navy",
}: HeadingProps) {
  return (
    <div className={cn("max-w-4xl", align === "center" && "mx-auto text-center", className)} data-reveal>
      {eyebrow && <Eyebrow color={eyebrowColor} className="mb-4">{eyebrow}</Eyebrow>}
      <h2 id={id} className="text-[clamp(2.75rem,6.4vw,4.5rem)] leading-[0.98]">
        <Rich text={title} surface={surface} />
      </h2>
      {intro && (
        <p className={cn("mt-5 max-w-2xl text-lg leading-relaxed", surface === "navy" ? "text-navy-100" : "text-ink", align === "center" && "mx-auto")}>
          {intro}
        </p>
      )}
    </div>
  );
}
