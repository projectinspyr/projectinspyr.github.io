import type { CSSProperties } from "react";
import { BRIDGE, archPath, hangers } from "./bridge-geometry";

const { width, height, deckY, left, right, apexY } = BRIDGE;
const LOOP = "4.2s";
const START = "2s";
const crowd = [0, 1, 2, 3, 4, 5, 6].map((i) => ({
  x: right + 52 + (i % 4) * 32 + (i >= 4 ? 16 : 0),
  y: deckY - 16 - Math.floor(i / 4) * 24,
}));

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Hero bridge. Draws itself in with CSS, then a spark crosses on a loop using
 * SVG animation (no JavaScript). With reduced motion it renders complete and
 * still, with the spark resting at the top of the arch.
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
        <radialGradient id="apex-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f5c518" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f5c518" stopOpacity="0" />
        </radialGradient>
        <pattern id="hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="rgba(255,255,255,0.14)" strokeWidth="2" />
        </pattern>
        <path id="arch" d={archPath} />
      </defs>

      <ellipse cx={(left + right) / 2} cy={apexY + 30} rx="300" ry="150" fill="url(#apex-glow)" className="bridge-pop" style={d(1400)} />

      {/* Banks */}
      <g className="bridge-pop" style={d(0)}>
        <path d={`M0 ${deckY} H${left + 30} L${left + 6} ${height} H0 Z`} fill="#1b3d70" />
        <path d={`M0 ${deckY} H${left + 30} L${left + 6} ${height} H0 Z`} fill="url(#hatch)" />
        <path d={`M${width} ${deckY} H${right - 30} L${right - 6} ${height} H${width} Z`} fill="#1b3d70" />
        <path d={`M${width} ${deckY} H${right - 30} L${right - 6} ${height} H${width} Z`} fill="url(#hatch)" />
      </g>

      {/* Deck */}
      <path
        d={`M${left - 40} ${deckY} H${right + 40}`}
        pathLength={1000}
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="5"
        strokeLinecap="round"
        className="bridge-draw"
        style={d(100)}
      />
      <path
        d={`M${left} ${deckY + 14} H${right}`}
        pathLength={1000}
        stroke="rgba(255,255,255,0.22)"
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
          stroke="rgba(255,255,255,0.28)"
          strokeWidth="2"
          className="bridge-hanger"
          style={d(1000 + i * 30)}
        />
      ))}

      {/* Arch */}
      <use
        href="#arch"
        fill="none"
        stroke="#fbf8f2"
        strokeWidth="6"
        strokeLinecap="round"
        pathLength={1000}
        className="bridge-draw"
        style={d(250)}
      />

      {/* End nodes: the two sides being connected */}
      <circle cx={left} cy={deckY} r="9" fill="#f23a3a" className="bridge-pop" style={d(200)} />
      <circle cx={right} cy={deckY} r="9" fill="#fbf8f2" className="bridge-pop" style={d(600)} />

      {/* The public: a small crowd that lights up when the spark lands */}
      <g className="bridge-pop" style={d(900)}>
        {crowd.map((p) => (
          <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r="6" fill="#fbf8f2" fillOpacity="0.35" />
        ))}
      </g>
      <g className="bridge-anim" fill="#f5c518" opacity="0">
        {crowd.map((p) => (
          <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r="6" />
        ))}
        <animate
          attributeName="opacity"
          values="0;0;1;1;0"
          keyTimes="0;0.78;0.84;0.95;1"
          dur={LOOP}
          begin={START}
          repeatCount="indefinite"
        />
      </g>

      {/* Spark (animated) */}
      <g className="bridge-anim">
        <use
          href="#arch"
          fill="none"
          stroke="#f5c518"
          strokeWidth="6"
          strokeLinecap="round"
          pathLength={1000}
          strokeDasharray="130 1000"
          strokeDashoffset="130"
          opacity="0"
        >
          <animate
            attributeName="stroke-dashoffset"
            values="130;130;-870;-870"
            keyTimes="0;0.1;0.8;1"
            calcMode="spline"
            keySplines="0 0 1 1;0.45 0 0.55 1;0 0 1 1"
            dur={LOOP}
            begin={START}
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;1;1;0;0"
            keyTimes="0;0.1;0.8;0.94;1"
            dur={LOOP}
            begin={START}
            repeatCount="indefinite"
          />
        </use>

        <circle cx={right} cy={deckY} r="10" fill="none" stroke="#f5c518" strokeWidth="3" opacity="0">
          <animate attributeName="r" values="10;10;46;46" keyTimes="0;0.8;0.97;1" dur={LOOP} begin={START} repeatCount="indefinite" />
          <animate
            attributeName="opacity"
            values="0;0;0.9;0;0"
            keyTimes="0;0.799;0.8;0.97;1"
            dur={LOOP}
            begin={START}
            repeatCount="indefinite"
          />
        </circle>

        <g opacity="0">
          <circle r="22" fill="#f5c518" opacity="0.22" />
          <circle r="8" fill="#ffe27a" />
          <circle r="3.5" fill="#fff" />
          <animateMotion
            dur={LOOP}
            begin={START}
            repeatCount="indefinite"
            keyPoints="0;0;1;1"
            keyTimes="0;0.1;0.8;1"
            calcMode="spline"
            keySplines="0 0 1 1;0.45 0 0.55 1;0 0 1 1"
          >
            <mpath href="#arch" />
          </animateMotion>
          <animate
            attributeName="opacity"
            values="0;1;1;1;0"
            keyTimes="0;0.06;0.8;0.92;1"
            dur={LOOP}
            begin={START}
            repeatCount="indefinite"
          />
        </g>
      </g>

      {/* Spark (still, for reduced motion) */}
      <g className="bridge-static">
        <circle cx={(left + right) / 2} cy={apexY} r="22" fill="#f5c518" opacity="0.22" />
        <circle cx={(left + right) / 2} cy={apexY} r="8" fill="#ffe27a" />
      </g>
    </svg>
  );
}
