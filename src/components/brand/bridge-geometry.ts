/**
 * The bridge: the signature shape of Project INSPYR.
 * A tied arch spanning from the left bank (NGOs and service organizations)
 * to the right bank (the public), crossed by a spark.
 */
export const BRIDGE = {
  width: 1200,
  height: 360,
  deckY: 262,
  left: 262,
  right: 938,
  apexY: 78,
} as const;

const { width, height, deckY, left, right, apexY } = BRIDGE;
const span = right - left;
// Quadratic control point that puts the curve's peak at apexY.
const controlY = 2 * apexY - deckY;

export const archPath = `M${left} ${deckY} Q${left + span / 2} ${controlY} ${right} ${deckY}`;

/** The two banks: wide shelves with a sloped inner face. */
export const leftBank = `M0 ${deckY} H${left + 14} L${left - 22} ${height} H0 Z`;
export const rightBank = `M${width} ${deckY} H${right - 14} L${right + 22} ${height} H${width} Z`;

/** Share of the drawing width each bank's flat top covers, for placing labels on it. */
export const bankShare = (left - 22) / width;

/** Corner points for a comic impact star centred on 0,0. */
export function burstPoints(outer: number, inner: number, tips: number) {
  return Array.from({ length: tips * 2 }, (_, i) => {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI * i) / tips - Math.PI / 2;
    return `${(r * Math.cos(a)).toFixed(1)},${(r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

/** y on the arch for a given x. */
export function archY(x: number) {
  const t = (x - left) / span;
  return deckY - 4 * (deckY - apexY) * t * (1 - t);
}

export const hangers = Array.from({ length: 15 }, (_, i) => {
  const x = left + span * ((i + 1) / 16);
  return { x, top: archY(x) };
});
