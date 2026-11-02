"use client";

import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { Check } from "./ui/doodles";

/** Copies the email address and confirms it on screen. */
export function CopyEmail({ email, label, copiedLabel }: { email: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-full border border-white/20 px-4 text-sm font-semibold transition-colors hover:border-spark hover:text-spark"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={copied ? "done" : "idle"}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex items-center gap-2"
        >
          {copied && <Check className="size-4 text-spark" />}
          {copied ? copiedLabel : label}
        </m.span>
      </AnimatePresence>
      <span className="sr-only" role="status">
        {copied ? copiedLabel : ""}
      </span>
    </button>
  );
}
