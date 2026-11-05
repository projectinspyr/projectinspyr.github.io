"use client";

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
      className="inline-flex h-11 items-center gap-2 border-[3px] border-ink bg-navy-800 px-4 font-display text-[1.15rem] leading-none tracking-[0.05em] text-white shadow-comic-sm transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
    >
      {copied && <Check className="size-4 text-spark" />}
      {copied ? copiedLabel : label}
      <span className="sr-only" role="status">
        {copied ? copiedLabel : ""}
      </span>
    </button>
  );
}
