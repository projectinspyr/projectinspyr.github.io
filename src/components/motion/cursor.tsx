"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "./use-media-query";

const INTERACTIVE = "a, button, summary, label, select, [role='button'], [data-cursor]";

/** A soft ring that trails the mouse and swells over anything clickable. Desktop only. */
export function Cursor() {
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  return enabled ? <CursorRing /> : null;
}

function CursorRing() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.5 });
  const [state, setState] = useState<"hidden" | "idle" | "hover">("hidden");

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target instanceof Element ? e.target.closest(INTERACTIVE) : null;
      setState(target ? "hover" : "idle");
    };
    const hide = () => setState("hidden");
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [x, y]);

  return (
    <>
      <m.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-spark/70"
        style={{ x: sx, y: sy }}
        animate={{
          scale: state === "hover" ? 1.7 : 1,
          opacity: state === "hidden" ? 0 : 1,
          backgroundColor: state === "hover" ? "rgba(245,197,24,0.12)" : "rgba(245,197,24,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
      />
      <m.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-spark"
        style={{ x, y }}
        animate={{ opacity: state === "hidden" ? 0 : 1 }}
      />
    </>
  );
}
