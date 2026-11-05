import Image from "next/image";
import { cn } from "@/lib/utils";

/** The name in the header: yellow PROJECT, red INSPYR. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[2rem] leading-none tracking-[0.03em]", className)}>
      <span className="text-spark">PROJECT</span> <span className="text-signal">INSPYR</span>
    </span>
  );
}

/**
 * The real logo artwork, on its own navy card. The file lives at
 * /public/brand/logo.png and was cut from the supplied image; replace it with
 * the original export (same name) for a sharper result.
 */
export function LogoCard({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <div className={cn("border-4 border-ink bg-[#132d50] shadow-comic-red", className)}>
      <Image
        src="/brand/logo.png"
        alt="Project INSPYR logo: led by students"
        width={620}
        height={276}
        priority={priority}
        sizes="(min-width: 1024px) 520px, 90vw"
        className="h-auto w-full"
      />
    </div>
  );
}
