import { BRIDGE, archY } from "./bridge-geometry";

const { width, height, deckY, left, right } = BRIDGE;
const mid = (left + right) / 2;
const gap = 70;

function halfArch(from: number, to: number) {
  const pts: string[] = [];
  const steps = 24;
  for (let i = 0; i <= steps; i++) {
    const x = from + ((to - from) * i) / steps;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)} ${archY(x).toFixed(1)}`);
  }
  return pts.join(" ");
}

/** The 404 illustration: the bridge, unfinished, with the spark waiting at the edge. */
export function BrokenBridge({ className }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden>
      <path d={`M0 ${deckY} H${left + 30} L${left + 6} ${height} H0 Z`} fill="#1b3d70" />
      <path d={`M${width} ${deckY} H${right - 30} L${right - 6} ${height} H${width} Z`} fill="#1b3d70" />

      <path d={`M${left - 40} ${deckY} H${mid - gap}`} stroke="rgba(255,255,255,0.75)" strokeWidth="5" strokeLinecap="round" />
      <path d={`M${mid + gap} ${deckY} H${right + 40}`} stroke="rgba(255,255,255,0.75)" strokeWidth="5" strokeLinecap="round" />

      <path d={halfArch(left, mid - gap)} fill="none" stroke="#fbf8f2" strokeWidth="6" strokeLinecap="round" />
      <path d={halfArch(mid + gap, right)} fill="none" stroke="#fbf8f2" strokeWidth="6" strokeLinecap="round" />
      <path
        d={halfArch(mid - gap, mid + gap)}
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="3"
        strokeDasharray="6 12"
        strokeLinecap="round"
      />

      <circle cx={left} cy={deckY} r="9" fill="#f23a3a" />
      <circle cx={right} cy={deckY} r="9" fill="#fbf8f2" />

      <g transform={`translate(${mid - gap} ${archY(mid - gap)})`}>
        <circle r="22" fill="#f5c518" opacity="0.22">
          <animate attributeName="r" values="18;26;18" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle r="8" fill="#ffe27a" />
      </g>
    </svg>
  );
}
