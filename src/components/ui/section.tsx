import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Rich } from "./rich";
import { Spark } from "./doodles";

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
      className={cn("relative py-20 sm:py-24 lg:py-32", tones[tone], className)}
    >
      {children}
    </section>
  );
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-navy-200", className)}>
      <Spark className="size-3.5 text-spark" />
      {children}
    </p>
  );
}

type HeadingProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
  align?: "left" | "center";
};

export function SectionHeading({ id, eyebrow, title, intro, className, align = "left" }: HeadingProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)} data-reveal>
      {eyebrow && <Eyebrow className={cn("mb-5", align === "center" && "justify-center")}>{eyebrow}</Eyebrow>}
      <h2
        id={id}
        className="text-[clamp(2.25rem,7vw,4.75rem)] font-extrabold leading-[0.95] tracking-[-0.035em]"
      >
        <Rich text={title} />
      </h2>
      {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-navy-200 sm:text-xl">{intro}</p>}
    </div>
  );
}
