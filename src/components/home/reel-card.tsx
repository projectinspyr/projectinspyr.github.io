"use client";

import Image from "next/image";
import { useState } from "react";
import type { Reel } from "@content/reels";
import { parseReelUrl } from "@/lib/youtube";
import { ArrowUpRight, InstagramGlyph, Spark } from "../ui/doodles";

/**
 * YouTube reels show a lightweight thumbnail and only load the player when
 * pressed. Instagram reels link out to Instagram with a styled card.
 */
export function ReelCard({ reel }: { reel: Reel }) {
  const parsed = parseReelUrl(reel.url);
  const [playing, setPlaying] = useState(false);

  if (parsed.platform === "youtube") {
    return (
      <figure className="group relative aspect-[9/16] overflow-hidden rounded-[24px] border border-white/10 bg-navy-900">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${parsed.id}?autoplay=1&rel=0&playsinline=1`}
            title={reel.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="absolute inset-0 size-full text-left"
          >
            <Image
              src={`https://i.ytimg.com/vi/${parsed.id}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 80vw"
              className="object-cover transition-transform duration-700 ease-[var(--ease-spring)] group-hover:scale-105"
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />
            <span aria-hidden className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-signal-deep shadow-[0_10px_40px_-8px_rgb(242_58_58/0.8)] transition-transform duration-500 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-white"><path d="M7 4.5v15l13-7.5Z" /></svg>
            </span>
            <span className="absolute inset-x-0 bottom-0 p-5">
              <span className="sr-only">Play video: </span>
              <span className="block font-display text-xl font-bold leading-tight">{reel.title}</span>
              {reel.partner && <span className="mt-1 block text-sm text-navy-200">with {reel.partner}</span>}
            </span>
          </button>
        )}
      </figure>
    );
  }

  return (
    <a
      href={parsed.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex aspect-[9/16] flex-col justify-between overflow-hidden rounded-[24px] border border-white/10 bg-navy-700 p-6 transition-colors hover:border-spark/60"
    >
      <span aria-hidden className="dot-grid absolute inset-0 opacity-60" />
      <span className="relative flex items-center justify-between">
        <InstagramGlyph className="size-7" />
        <ArrowUpRight className="size-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </span>
      <Spark className="relative mx-auto size-16 text-spark transition-transform duration-700 group-hover:rotate-90" />
      <span className="relative">
        <span className="block font-display text-xl font-bold leading-tight">{reel.title}</span>
        {reel.partner && <span className="mt-1 block text-sm text-navy-200">with {reel.partner}</span>}
        <span className="mt-4 inline-flex text-sm font-semibold text-spark">
          Watch on Instagram<span className="sr-only"> (opens in a new tab)</span>
        </span>
      </span>
    </a>
  );
}
