import { site } from "@content/site";
import { cn } from "@/lib/utils";
import { Spark } from "../ui/doodles";

/**
 * Text recreation of the PROJECT INSPYR lockup until the original logo file
 * is supplied. To use the real logo, replace the markup below with an
 * <Image src="/brand/logo.svg" ... /> and keep the same props.
 */
export function Wordmark({ className, showLine = true }: { className?: string; showLine?: boolean }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span className="flex items-baseline gap-[0.28em] font-display font-extrabold tracking-[-0.02em]">
        <span className="text-[0.62em] tracking-[0.14em]">PROJECT</span>
        <span className="relative">
          INSPYR
          <Spark className="absolute -right-[0.55em] -top-[0.3em] size-[0.5em] text-spark" />
        </span>
      </span>
      {showLine && (
        <span className="mt-[0.12em] self-end pr-[0.2em] font-hand text-[0.62em] leading-none text-spark">
          {site.lockupLine}
        </span>
      )}
    </span>
  );
}
