"use client";

import { m } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Page transition: a spark crosses the top of the screen while the new page
 * eases in. Skipped on first load and for reduced motion.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [prev, setPrev] = useState(pathname);
  const [run, setRun] = useState(0);

  if (prev !== pathname) {
    setPrev(pathname);
    setRun((n) => n + 1);
  }

  useEffect(() => {
    if (run === 0 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.getElementById("main")?.animate(
      [
        { opacity: 0, transform: "translate3d(0, 14px, 0)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 550, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
  }, [run]);

  if (run === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] motion-reduce:hidden">
      <m.div
        key={run}
        className="relative h-full origin-left bg-spark"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: 1, opacity: [1, 1, 0] }}
        transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1], opacity: { times: [0, 0.75, 1], duration: 0.85 } }}
      />
    </div>
  );
}
