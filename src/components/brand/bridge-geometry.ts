/**
 * The bridge: the signature shape of Project INSPYR.
 * A tied arch spanning from the left bank (NGOs and service organizations)
 * to the right bank (the public), crossed by a spark.
 */
export const BRIDGE = {
  width: 1200,
  height: 340,
  deckY: 270,
  left: 170,
  right: 1030,
  apexY: 110,
} as const;

const { deckY, left, right, apexY } = BRIDGE;
const span = right - left;
// Quadratic control point that puts the curve's peak at apexY.
const controlY = 2 * apexY - deckY;

export const archPath = `M${left} ${deckY} Q${left + span / 2} ${controlY} ${right} ${deckY}`;

/** y on the arch for a given x. */
export function archY(x: number) {
  const t = (x - left) / span;
  return deckY - 4 * (deckY - apexY) * t * (1 - t);
}

export const hangers = Array.from({ length: 19 }, (_, i) => {
  const x = left + 52 + i * ((span - 104) / 18);
  return { x, top: archY(x) };
});
