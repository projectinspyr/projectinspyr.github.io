import { BRIDGE, archY, burstPoints, leftBank, rightBank } from "./bridge-geometry";

const { width, height, deckY, left, right } = BRIDGE;
const mid = (left + right) / 2;
const gap = 70;
const INK = "#0d0d0d";

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
      <g stroke={INK} strokeWidth="5">
        <path d={leftBank} fill="#1e2c4f" />
        <path d={rightBank} fill="#1e2c4f" />
      </g>

      <path d={`M${left - 40} ${deckY} H${mid - gap}`} stroke={INK} strokeWidth="9" />
      <path d={`M${mid + gap} ${deckY} H${right + 40}`} stroke={INK} strokeWidth="9" />

      <path d={halfArch(left, mid - gap)} fill="none" stroke={INK} strokeWidth="9" />
      <path d={halfArch(mid + gap, right)} fill="none" stroke={INK} strokeWidth="9" />
      <path d={halfArch(mid - gap, mid + gap)} fill="none" stroke={INK} strokeOpacity="0.45" strokeWidth="4" strokeDasharray="8 14" />

      <circle cx={left} cy={deckY} r="13" fill="#ff2e4c" stroke={INK} strokeWidth="5" />
      <circle cx={right} cy={deckY} r="13" fill="#fff" stroke={INK} strokeWidth="5" />

      <g transform={`translate(${mid - gap} ${archY(mid - gap)})`}>
        <polygon points={burstPoints(32, 14, 8)} fill="#ffd100" stroke={INK} strokeWidth="4" />
      </g>
    </svg>
  );
}
