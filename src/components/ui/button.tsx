import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";
import { Arrow, ArrowUpRight } from "./doodles";
import { Magnetic } from "../motion/magnetic";

type Variant = "primary" | "navy" | "spark" | "tape" | "white";

const variants: Record<Variant, string> = {
  primary: "bg-signal-deep text-white",
  navy: "bg-navy-800 text-white",
  spark: "bg-spark text-ink",
  tape: "bg-tape text-ink",
  white: "bg-white text-ink",
};

const base =
  "group relative inline-flex h-[3.25rem] items-center justify-center gap-2.5 border-[3px] border-ink px-7 font-display text-[1.3rem] leading-none tracking-[0.05em] shadow-comic transition-[translate,box-shadow] duration-150 select-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic-md active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  magnetic?: boolean;
  className?: string;
  icon?: "arrow" | "external" | "none";
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  magnetic = false,
  className,
  icon,
}: ButtonLinkProps) {
  const external = isExternal(href);
  const glyph = icon ?? (external ? "external" : "arrow");
  const content = (
    <>
      <span className="pt-[0.08em]">{children}</span>
      {glyph === "arrow" && <Arrow className="size-[1em] transition-transform duration-200 group-hover:translate-x-1" />}
      {glyph === "external" && (
        <ArrowUpRight className="size-[0.95em] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  const classes = cn(base, variants[variant], className);
  const link = external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );

  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}
