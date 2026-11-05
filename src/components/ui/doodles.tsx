import type { SVGProps } from "react";

/* Hand-drawn doodles carried over from the Instagram look: squiggles,
   paper clips, briefcases and sparks. All stroke-based, all currentColor. */

type DoodleProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** A comic impact star, for sparks and POWs. */
export function Burst(props: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden {...props}>
      <polygon
        points="24,2 28.6,13.3 39.6,8.4 35.3,19.6 46,24 35.3,28.4 39.6,39.6 28.6,34.7 24,46 19.4,34.7 8.4,39.6 12.7,28.4 2,24 12.7,19.6 8.4,8.4 19.4,13.3"
        fill="currentColor"
        stroke="#0d0d0d"
        strokeWidth="2.5"
        strokeLinejoin="miter"
      />
    </svg>
  );
}

/** A big faint number behind a card. Drawn as SVG so it reads as artwork, not text. */
export function Numeral({ value, ...props }: DoodleProps & { value: string }) {
  return (
    <svg viewBox="0 0 110 90" aria-hidden {...props}>
      <text x="108" y="88" textAnchor="end" fill="currentColor" fontFamily="var(--font-bebas), Impact, sans-serif" fontSize="112">
        {value}
      </text>
    </svg>
  );
}

export function Heart(props: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden {...props}>
      <path d="M24 41S6 30 6 17c0-6 4.5-10 10-10 3.500 0 6.500 2 8 5 1.500-3 4.500-5 8-5 5.500 0 10 4 10 10 0 13-18 24-18 24Z" {...stroke} strokeWidth={3} />
    </svg>
  );
}

export function PushPin(props: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M12 17v5M8 3h8l-1 7 3 4H6l3-4-1-7Z" {...stroke} strokeWidth={2.2} />
    </svg>
  );
}

export function Spark(props: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        d="M12 1.5c.6 5.3 2.2 7.6 7.4 8.5.6.1.6 1 0 1.1-5.2.9-6.8 3.2-7.4 8.4-.1.6-1 .6-1.1 0-.6-5.2-2.2-7.5-7.4-8.4-.6-.1-.6-1 0-1.1 5.2-.9 6.8-3.2 7.4-8.5.1-.6 1-.6 1.1 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Paperclip(props: DoodleProps) {
  return (
    <svg viewBox="0 0 32 64" aria-hidden {...props}>
      <path
        d="M22 18v30c0 5-3 9-7 9s-7-4-7-9V12c0-4 2.5-7 6-7s6 3 6 7v34c0 2.4-1.4 4-3.5 4S13 48.4 13 46V18"
        {...stroke}
        strokeWidth={2.6}
      />
    </svg>
  );
}

export function Briefcase(props: DoodleProps) {
  return (
    <svg viewBox="0 0 64 56" aria-hidden {...props}>
      <path d="M6 18.5c0-2.6 1.9-4.4 4.6-4.5l43-.6c2.7 0 4.5 1.8 4.5 4.5l-.5 27.6c0 2.6-2 4.3-4.6 4.4l-42 .4c-2.7 0-4.7-1.8-4.7-4.4Z" {...stroke} strokeWidth={2.6} />
      <path d="M23 13.5V9c0-2 1.4-3.3 3.4-3.3h11.4c2 0 3.3 1.3 3.3 3.3v4.4" {...stroke} strokeWidth={2.6} />
      <path d="M6.5 29c8 3.4 17 5 25.5 5s17.5-1.7 25.6-5.2" {...stroke} strokeWidth={2.6} />
      <path d="M28.5 31.5h7v5h-7z" {...stroke} strokeWidth={2.4} />
    </svg>
  );
}

export function Arrow(props: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" {...stroke} strokeWidth={2.2} />
    </svg>
  );
}

export function ArrowUpRight(props: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M7 17 17 7M9 7h8v8" {...stroke} strokeWidth={2.2} />
    </svg>
  );
}

export function Pin(props: DoodleProps) {
  return (
    <svg viewBox="0 0 48 56" aria-hidden {...props}>
      <path d="M24 52c-1.5-6-15-17-15-29a15 15 0 0 1 30 0c0 12-13.5 23-15 29Z" {...stroke} strokeWidth={2.6} />
      <circle cx="24" cy="23" r="5.5" {...stroke} strokeWidth={2.6} />
    </svg>
  );
}

export function InstagramGlyph(props: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" {...stroke} strokeWidth={2} />
      <circle cx="12" cy="12" r="4.2" {...stroke} strokeWidth={2} />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function YouTubeGlyph(props: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="4" {...stroke} strokeWidth={2} />
      <path d="m10 9 5 3-5 3Z" fill="currentColor" />
    </svg>
  );
}

export function MailGlyph(props: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" {...stroke} strokeWidth={2} />
      <path d="m4 7 8 6 8-6" {...stroke} strokeWidth={2} />
    </svg>
  );
}

export function Check(props: DoodleProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path d="M4.5 12.5 9.5 17.5 19.5 6.5" {...stroke} strokeWidth={2.6} />
    </svg>
  );
}

/* Team marks: simple schematic shapes, one per team. */
export function TeamIcon({ team, ...props }: DoodleProps & { team: string }) {
  switch (team) {
    case "scripts":
      return (
        <svg viewBox="0 0 48 48" aria-hidden {...props}>
          <path d="M12 6h18l8 8v28H12Z" {...stroke} strokeWidth={2.4} />
          <path d="M30 6v8h8M18 22h14M18 28h14M18 34h9" {...stroke} strokeWidth={2.4} />
        </svg>
      );
    case "reels":
      return (
        <svg viewBox="0 0 48 48" aria-hidden {...props}>
          <rect x="14" y="4" width="20" height="40" rx="5" {...stroke} strokeWidth={2.4} />
          <path d="m21 18 8 6-8 6Z" fill="currentColor" />
          <path d="M18 38h12" {...stroke} strokeWidth={2.4} />
        </svg>
      );
    case "outreach":
      return (
        <svg viewBox="0 0 48 48" aria-hidden {...props}>
          <path d="M6 20v9l7 1 21 9V10L13 19l-7 1Z" {...stroke} strokeWidth={2.6} />
          <path d="m14 30 3 10h6l-3-8" {...stroke} strokeWidth={2.6} />
          <path d="M40 18c3 4 3 9 0 13" {...stroke} strokeWidth={2.6} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" aria-hidden {...props}>
          <rect x="5" y="15" width="28" height="22" rx="4" {...stroke} strokeWidth={2.4} />
          <path d="m33 22 10-5v18l-10-5" {...stroke} strokeWidth={2.4} />
          <circle cx="19" cy="26" r="5" {...stroke} strokeWidth={2.4} />
        </svg>
      );
  }
}
