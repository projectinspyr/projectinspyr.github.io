"use client";

import Image from "next/image";
import { useState } from "react";
import type { Reel } from "@content/reels";
import { parseReelUrl } from "@/lib/youtube";
import { ArrowUpRight, Burst, InstagramGlyph } from "../ui/doodles";

/**
 * YouTube reels show a lightweight thumbnail and only load the player when
 * pressed. Instagram reels link out to Instagram with a styled card.
 */
export function ReelCard({ reel }: { reel: Reel }) {
  const parsed = parseReelUrl(reel.url);
  const [playing, setPlaying] = useState(false);

  if (parsed.platform === "youtube") {
    return (
      <figure className="group relative aspect-[9/16] overflow-hidden border-4 border-ink bg-navy-900 shadow-comic-md">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${parsed.id}?autoplay=1&rel=0&playsinline=1`}
            title={reel.title}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="absolute inset-0 size-full text-left">
            <Image
              src={`https://i.ytimg.com/vi/${parsed.id}/hqdefault.jpg`}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 80vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <span aria-hidden className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center border-[3px] border-ink bg-signal-deep shadow-comic transition-transform duration-200 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 size-7 fill-white"><path d="M7 4.5v15l13-7.5Z" /></svg>
            </span>
            <span className="absolute inset-x-3 bottom-3 border-[3px] border-ink bg-white p-3 text-ink shadow-comic-sm">
              <span className="sr-only">Play video: </span>
              <span className="block font-display text-[1.35rem] leading-tight tracking-[0.03em]">{reel.title}</span>
              {reel.partner && <span className="mt-1 block text-sm text-navy-500">with {reel.partner}</span>}
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
      className="group relative flex aspect-[9/16] flex-col justify-between overflow-hidden border-4 border-ink bg-spark p-5 text-ink shadow-comic-md transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic-lg"
    >
      <span aria-hidden className="halftone-blue absolute inset-0" />
      <span className="relative flex items-center justify-between">
        <InstagramGlyph className="size-7" />
        <ArrowUpRight className="size-6 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" />
      </span>
      <Burst className="relative mx-auto size-20 text-signal transition-transform duration-500 group-hover:rotate-45" />
      <span className="relative border-[3px] border-ink bg-white p-3 shadow-comic-sm">
        <span className="block font-display text-[1.35rem] leading-tight tracking-[0.03em]">{reel.title}</span>
        {reel.partner && <span className="mt-1 block text-sm text-navy-500">with {reel.partner}</span>}
        <span className="mt-2 inline-flex font-marker text-sm text-signal-ink">
          Watch on Instagram<span className="sr-only"> (opens in a new tab)</span>
        </span>
      </span>
    </a>
  );
}
