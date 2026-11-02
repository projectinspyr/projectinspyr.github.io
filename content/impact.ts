/**
 * Impact numbers on the home page. The strip only appears once this list
 * has entries. Use real, countable numbers only.
 *
 * Example:
 * { value: 12, label: "Partner organizations" },
 * { value: 40, suffix: "+", label: "Reels published" },
 */
export type ImpactStat = {
  value: number;
  suffix?: string;
  label: string;
};

export const impact: ImpactStat[] = [];
