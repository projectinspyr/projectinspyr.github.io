"use client";

import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import type { BulletinSlide } from "@content/bulletin";
import { cn } from "@/lib/utils";

const arrow =
  "absolute top-1/2 z-10 -translate-y-1/2 border-[3px] border-ink bg-spark p-2 text-ink shadow-comic transition-[translate,box-shadow] duration-150 hover:-translate-x-px hover:-translate-y-[calc(50%+2px)] hover:shadow-comic-md active:shadow-comic-sm";

function Slide({ slide, index, total }: { slide: BulletinSlide; index: number; total: number }) {
  if (!slide.image) {
    return (
      <div className="flex size-full flex-col items-center justify-center text-ink">
        <p className="font-display text-[clamp(3rem,10vw,6rem)] leading-none tracking-[0.04em]">TBA</p>
        <p className="mt-2 font-marker text-sm sm:text-base">
          Poster {index + 1} of {total}
        </p>
      </div>
    );
  }

  const isVideo = /\.(mp4|webm|mov|m4v|ogv)$/i.test(slide.image);
  const picture = isVideo ? (
    <video
      src={slide.image}
      aria-label={slide.alt || undefined}
      className="absolute inset-0 size-full object-contain"
      autoPlay
      muted
      loop
      playsInline
      controls={!slide.href}
      preload="metadata"
    />
  ) : (
    <Image src={slide.image} alt={slide.alt ?? ""} fill sizes="(min-width: 1024px) 1024px, 100vw" className="object-contain" />
  );
  if (!slide.href) return picture;
  return (
    <a href={slide.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 block">
      {picture}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** The poster slider under the note. Arrows, dots, arrow keys and swiping all work. */
export function BulletinSlides({ slides }: { slides: BulletinSlide[] }) {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchX = useRef<number | null>(null);
  const total = slides.length;
  const many = total > 1;

  if (total === 0) return null;

  const goTo = (next: number, dir: number) => {
    setDirection(dir);
    setActive((next + total) % total);
  };
  const step = (dir: number) => goTo(active + dir, dir);

  const current = slides[active];

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Posters"
      onKeyDown={(e) => {
        if (!many) return;
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      }}
    >
      <div className="relative">
        <div
          className="overflow-hidden border-4 border-ink bg-white shadow-comic-red"
          onTouchStart={(e) => {
            touchX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchX.current === null || !many) return;
            const delta = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(delta) > 40) step(delta < 0 ? 1 : -1);
          }}
        >
          <div className="relative aspect-video" aria-live="polite">
            <AnimatePresence initial={false} mode="wait">
              <m.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 28 * direction }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 * direction }}
                transition={{ duration: 0.18 }}
              >
                <Slide slide={current} index={active} total={total} />
              </m.div>
            </AnimatePresence>
            {!current.image && <div aria-hidden className="pointer-events-none absolute inset-4 border-[3px] border-dashed border-ink/25 sm:inset-8" />}
          </div>
        </div>

        {many && (
          <>
            <button type="button" aria-label="Previous poster" onClick={() => step(-1)} className={cn(arrow, "-left-3 sm:-left-6")}>
              <svg viewBox="0 0 24 24" aria-hidden className="size-6">
                <path d="m15 5-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.6" />
              </svg>
            </button>
            <button type="button" aria-label="Next poster" onClick={() => step(1)} className={cn(arrow, "-right-3 sm:-right-6")}>
              <svg viewBox="0 0 24 24" aria-hidden className="size-6">
                <path d="m9 5 7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.6" />
              </svg>
            </button>
          </>
        )}
      </div>

      {many && (
        <div className="mt-6 flex flex-wrap justify-center gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to poster ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i, i > active ? 1 : -1)}
              className="grid size-7 place-items-center"
            >
              <span aria-hidden className={cn("size-4 border-[3px] border-ink transition-colors", i === active ? "bg-signal" : "bg-white hover:bg-spark")} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
