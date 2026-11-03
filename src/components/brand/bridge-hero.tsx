import type { CSSProperties } from "react";
import { BRIDGE, archPath, hangers, leftBank, rightBank } from "./bridge-geometry";

const { width, height, deckY, left, right, apexY } = BRIDGE;
const LOOP = "4.6s";
const START = "2.1s";
const mid = (left + right) / 2;

// The public: a small crowd standing on the right bank.
const crowd = [
  { x: 1000, y: deckY - 30 },
  { x: 1036, y: deckY - 34 },
  { x: 1072, y: deckY - 30 },
  { x: 1108, y: deckY - 34 },
  { x: 1144, y: deckY - 30 },
];

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Shared SMIL timing so every animated part stays in step with the spark. */
const loop = { dur: LOOP, begin: START, repeatCount: "indefinite" } as const;

/**
 * Hero bridge. Draws itself in with CSS, then a spark leaves the
 * organizations' side, crosses the arch and lights up the public's side, on a
 * loop driven by SVG animation (no JavaScript). With reduced motion it renders
 * complete and still, with the spark resting at the top of the arch.
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
        <radialGradient id="hero-apex-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5c518" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#f5c518" stopOpacity="0" />
        </radialGradient>
        <pattern id="hero-hatch" width="11" height="11" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="11" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
        </pattern>
        <path id="hero-arch" d={archPath} />
      </defs>

      <ellipse cx={mid} cy={apexY + 60} rx="280" ry="150" fill="url(#hero-apex-glow)" className="bridge-pop" style={d(1300)} />

      {/* Banks */}
      <g className="bridge-pop" style={d(0)}>
        <path d={leftBank} fill="#16305a" />
        <path d={leftBank} fill="url(#hero-hatch)" />
        <path d={rightBank} fill="#16305a" />
        <path d={rightBank} fill="url(#hero-hatch)" />
      </g>

      {/* The organization: a simple building on the left bank */}
      <g className="bridge-pop" style={d(500)} fill="none" stroke="#fbf8f2" strokeOpacity="0.55" strokeWidth="3" strokeLinejoin="round">
        <path d={`M118 ${deckY - 2} V${deckY - 48} L156 ${deckY - 74} L194 ${deckY - 48} V${deckY - 2}`} />
        <rect x="147" y={deckY - 30} width="18" height="28" fill="#f23a3a" fillOpacity="0.85" stroke="none" rx="2" />
      </g>

      {/* Deck */}
      <path
        d={`M${left - 70} ${deckY} H${right + 70}`}
        pathLength={1000}
        stroke="rgba(255,255,255,0.8)"
        strokeWidth="5"
        strokeLinecap="round"
        className="bridge-draw"
        style={d(100)}
      />
      <path
        d={`M${left} ${deckY + 13} H${right}`}
        pathLength={1000}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="2"
        className="bridge-draw"
        style={d(300)}
      />

      {/* Hangers */}
      {hangers.map((h, i) => (
        <line
          key={h.x}
          x1={h.x}
          x2={h.x}
          y1={h.top}
          y2={deckY}
          stroke="rgba(255,255,255,0.26)"
          strokeWidth="2"
          className="bridge-hanger"
          style={d(1000 + i * 34)}
        />
      ))}

      {/* Arch */}
      <path
        d={archPath}
        fill="none"
        stroke="#fbf8f2"
        strokeWidth="6"
        strokeLinecap="round"
        pathLength={1000}
        className="bridge-draw"
        style={d(250)}
      />

      {/* End nodes: the two sides being connected */}
      <g className="bridge-pop" style={d(200)}>
        <circle cx={left} cy={deckY} r="16" fill="none" stroke="#f23a3a" strokeOpacity="0.35" strokeWidth="2" />
        <circle cx={left} cy={deckY} r="9" fill="#f23a3a" />
      </g>
      <g className="bridge-pop" style={d(600)}>
        <circle cx={right} cy={deckY} r="16" fill="none" stroke="#fbf8f2" strokeOpacity="0.3" strokeWidth="2" />
        <circle cx={right} cy={deckY} r="9" fill="#fbf8f2" />
      </g>

      {/* The public */}
      <g className="bridge-pop" style={d(900)} fill="#fbf8f2" fillOpacity="0.4">
        {crowd.map((p) => (
          <g key={p.x}>
            <circle cx={p.x} cy={p.y} r="8" />
            <rect x={p.x - 11} y={p.y + 11} width="22" height={deckY - p.y - 13} rx="10" />
          </g>
        ))}
      </g>

      {/* ── Animated layer ── */}
      <g className="bridge-anim">
        {/* Crowd lights up when the spark lands */}
        <g fill="#f5c518" opacity="0">
          {crowd.map((p) => (
            <g key={p.x}>
              <circle cx={p.x} cy={p.y} r="8" />
              <rect x={p.x - 11} y={p.y + 11} width="22" height={deckY - p.y - 13} rx="10" />
            </g>
          ))}
          <animate attributeName="opacity" values="0;0;0.95;0.95;0" keyTimes="0;0.8;0.85;0.94;1" {...loop} />
        </g>

        {/* Departure ripple */}
        <circle cx={left} cy={deckY} r="10" fill="none" stroke="#f23a3a" strokeWidth="3" opacity="0">
          <animate attributeName="r" values="10;10;40;40" keyTimes="0;0.04;0.2;1" {...loop} />
          <animate attributeName="opacity" values="0;0.8;0;0" keyTimes="0;0.04;0.2;1" {...loop} />
        </circle>

        {/* Trail that follows the spark along the arch */}
        <path
          d={archPath}
          fill="none"
          stroke="#f5c518"
          strokeWidth="4"
          strokeLinecap="butt"
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
          <animate attributeName="opacity" values="0;0;0.9;0.9;0;0" keyTimes="0;0.12;0.2;0.72;0.8;1" {...loop} />
        </path>

        {/* Arrival burst */}
        <circle cx={right} cy={deckY} r="10" fill="none" stroke="#f5c518" strokeWidth="3" opacity="0">
          <animate attributeName="r" values="10;10;52;52" keyTimes="0;0.8;0.97;1" {...loop} />
          <animate attributeName="opacity" values="0;0;0.9;0;0" keyTimes="0;0.799;0.8;0.97;1" {...loop} />
        </circle>

        {/* The spark */}
        <g opacity="0">
          <circle r="22" fill="#f5c518" opacity="0.2" />
          <circle r="8" fill="#ffe27a" />
          <circle r="3.5" fill="#fff" />
          <animateMotion
            keyPoints="0;0;1;1"
            keyTimes="0;0.1;0.8;1"
            calcMode="spline"
            keySplines="0 0 1 1;0.45 0 0.55 1;0 0 1 1"
            {...loop}
          >
            <mpath href="#hero-arch" />
          </animateMotion>
          <animate attributeName="opacity" values="0;1;1;1;0" keyTimes="0;0.06;0.8;0.9;1" {...loop} />
        </g>
      </g>

      {/* Spark at rest, for reduced motion */}
      <g className="bridge-static">
        <circle cx={mid} cy={apexY} r="22" fill="#f5c518" opacity="0.22" />
        <circle cx={mid} cy={apexY} r="8" fill="#ffe27a" />
      </g>
    </svg>
  );
}
