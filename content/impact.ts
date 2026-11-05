/**
 * The numbers panel on the home page. It stays hidden while this list is
 * empty. Add it back once there is real work to count: use real, countable
 * numbers only. `value: null` shows "TBA" on a card.
 *
 * Example:
 * { value: 12, label: "Partner organizations" },
 * { value: 40, suffix: "+", label: "Reels published" },
 * { value: 25, label: "Volunteer days" },
 * { value: 60, label: "Students involved" },
 */
export type ImpactStat = {
  value: number | null;
  suffix?: string;
  label: string;
};

export const impact: ImpactStat[] = [];
