"use client";

import Lenis from "lenis";
import { useEffect } from "react";
import { useMediaQuery } from "./use-media-query";

/** The active Lenis instance, so menus can pause scrolling. */
export const scroller: { lenis: Lenis | null } = { lenis: null };

/** Smooth wheel scrolling on desktop. Touch keeps native scrolling. */
export function SmoothScroll() {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.12, autoRaf: true, anchors: { offset: -96 } });
    scroller.lenis = lenis;
    return () => {
      lenis.destroy();
      scroller.lenis = null;
    };
  }, [reduced]);

  return null;
}
