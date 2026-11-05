/**
 * The scoreboard on the home page.
 *
 * Use real, countable numbers only. While `value` is null the card shows "TBA".
 * Example once you have numbers:
 * { value: 12, label: "Partner organizations" },
 * { value: 40, suffix: "+", label: "Reels published" },
 *
 * To hide the whole scoreboard, empty this list.
 */
export type ImpactStat = {
  value: number | null;
  suffix?: string;
  label: string;
};

export const impact: ImpactStat[] = [
  { value: null, label: "Partner organizations" },
  { value: null, label: "Reels published" },
  { value: null, label: "Volunteer days" },
  { value: null, label: "Students involved" },
];
