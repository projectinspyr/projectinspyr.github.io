import type { CSSProperties } from "react";
import { BRIDGE, archPath, burstPoints, hangers, leftBank, rightBank } from "./bridge-geometry";

const { width, height, deckY, left, right, apexY } = BRIDGE;
const LOOP = "4.6s";
const START = "2.1s";
const mid = (left + right) / 2;
const INK = "#0d0d0d";

// The public: a small crowd standing on the right bank.
const crowd = [
  { x: 1000, y: deckY - 34 },
  { x: 1044, y: deckY - 40 },
  { x: 1088, y: deckY - 34 },
  { x: 1132, y: deckY - 40 },
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Shared SMIL timing so every animated part stays in step with the spark. */
const loop = { dur: LOOP, begin: START, repeatCount: "indefinite" } as const;

function Person({ x, y, fill }: { x: number; y: number; fill: string }) {
  return (
    <g fill={fill} stroke={INK} strokeWidth="4">
      <circle cx={x} cy={y} r="11" />
      <path d={`M${x - 14} ${deckY - 2} V${y + 24} Q${x} ${y + 10} ${x + 14} ${y + 24} V${deckY - 2} Z`} />
    </g>
  );
}

/**
 * The bridge as a comic panel. It inks itself in with CSS, then a spark leaves
 * the organizations' side, crosses the arch and lights up the public's side,
 * on a loop driven by SVG animation (no JavaScript). With reduced motion it
 * renders complete and still, with the spark resting at the top of the arch.
 */
export function BridgeHero({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      role="img"
      aria-label="An arched bridge connecting NGOs on one side to the public on the other, with a spark travelling across it"
    >
      <defs>
        <pattern id="hero-dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="8" cy="8" r="3" fill="#ffd100" />
        </pattern>
        <path id="hero-arch" d={archPath} />
      </defs>

      {/* Halftone sun behind the arch */}
      <circle cx={mid} cy={apexY + 90} r="170" fill="url(#hero-dots)" className="bridge-pop" style={d(1200)} />

      {/* Banks */}
      <g className="bridge-pop" style={d(0)} stroke={INK} strokeWidth="5" strokeLinejoin="miter">
        <path d={leftBank} fill="#1e2c4f" />
        <path d={rightBank} fill="#1e2c4f" />
      </g>

      {/* The organization: a simple building on the left bank */}
      <g className="bridge-pop" style={d(500)} stroke={INK} strokeWidth="5" strokeLinejoin="miter">
        <path d={`M112 ${deckY - 2} V${deckY - 56} L156 ${deckY - 88} L200 ${deckY - 56} V${deckY - 2} Z`} fill="#fff" />
        <rect x="144" y={deckY - 38} width="24" height="36" fill="#ff2e4c" />
      </g>

      {/* Hangers */}
      {hangers.map((h, i) => (
        <line
          key={h.x}
          x1={h.x}
          x2={h.x}
          y1={h.top}
          y2={deckY}
          stroke={INK}
          strokeWidth="3"
          className="bridge-hanger"
          style={d(1000 + i * 34)}
        />
      ))}

      {/* Deck */}
      <path d={`M${left - 40} ${deckY} H${right + 40}`} pathLength={1000} stroke={INK} strokeWidth="9" className="bridge-draw" style={d(100)} />

      {/* Arch */}
      <path d={archPath} fill="none" stroke={INK} strokeWidth="9" pathLength={1000} className="bridge-draw" style={d(250)} />

      {/* End nodes: the two sides being connected */}
      <circle cx={left} cy={deckY} r="13" fill="#ff2e4c" stroke={INK} strokeWidth="5" className="bridge-pop" style={d(200)} />
      <circle cx={right} cy={deckY} r="13" fill="#fff" stroke={INK} strokeWidth="5" className="bridge-pop" style={d(600)} />

      {/* The public */}
      <g className="bridge-pop" style={d(900)}>
        {crowd.map((p) => (
          <Person key={p.x} x={p.x} y={p.y} fill="#fff" />
        ))}
      </g>

      {/* ── Animated layer ── */}
      <g className="bridge-anim">
        {/* Crowd lights up when the spark lands */}
        <g opacity="0">
          {crowd.map((p) => (
            <Person key={p.x} x={p.x} y={p.y} fill="#ffd100" />
          ))}
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.8;0.81;0.95;1" {...loop} />
        </g>

        {/* Trail that follows the spark along the arch */}
        <path
          d={archPath}
          fill="none"
          stroke="#ff2e4c"
          strokeWidth="5"
          pathLength={1000}
          strokeDasharray="110 1000"
          strokeDashoffset="110"
          opacity="0"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="110;110;-890;-890"
            keyTimes="0;0.1;0.8;1"
            calcMode="spline"
            keySplines="0 0 1 1;0.45 0 0.55 1;0 0 1 1"
            {...loop}
          />
          <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.12;0.16;0.76;0.8;1" {...loop} />
        </path>

        {/* The spark */}
        <g opacity="0">
          <polygon points={burstPoints(30, 13, 8)} fill="#ffd100" stroke={INK} strokeWidth="4" />
          <animateMotion
            keyPoints="0;0;1;1"
            keyTimes="0;0.1;0.8;1"
            calcMode="spline"
            keySplines="0 0 1 1;0.45 0 0.55 1;0 0 1 1"
            {...loop}
          >
            <mpath href="#hero-arch" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0;0.06;0.8;0.88;1" {...loop} />
        </g>
      </g>

      {/* Spark at rest, for reduced motion */}
      <g className="bridge-static" transform={`translate(${mid} ${apexY})`}>
        <polygon points={burstPoints(30, 13, 8)} fill="#ffd100" stroke={INK} strokeWidth="4" />
      </g>
    </svg>
  );
}
