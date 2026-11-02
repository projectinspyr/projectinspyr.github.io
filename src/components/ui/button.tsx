import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";
import { Arrow, ArrowUpRight } from "./doodles";
import { Magnetic } from "../motion/magnetic";

type Variant = "primary" | "secondary" | "ink" | "spark";

const variants: Record<Variant, string> = {
  primary:
    "bg-signal-deep text-white shadow-[0_0_0_0_rgb(242_58_58/0)] hover:shadow-[0_14px_44px_-12px_rgb(242_58_58/0.85)]",
  secondary:
    "border border-white/25 text-white hover:border-spark hover:text-spark bg-white/[0.03] backdrop-blur-sm",
  ink: "bg-navy-800 text-white hover:bg-navy-700",
  spark: "bg-spark text-navy-900 hover:bg-spark-soft",
};

const base =
  "group relative inline-flex h-12 items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 text-[0.98rem] font-semibold tracking-[-0.005em] transition-[background-color,border-color,color,box-shadow] duration-300 ease-[var(--ease-spring)] select-none disabled:cursor-not-allowed disabled:opacity-60";

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
      <span>{children}</span>
      {glyph === "arrow" && (
        <Arrow className="size-[1.1em] transition-transform duration-300 ease-[var(--ease-spring)] group-hover:translate-x-1" />
      )}
      {glyph === "external" && (
        <ArrowUpRight className="size-[1.05em] transition-transform duration-300 ease-[var(--ease-spring)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
