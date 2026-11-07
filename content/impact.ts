/**
 * The numbers panel on the home page. Edited in /keystatic (Lists → Numbers);
 * stored in data/impact.json. Hidden while empty. Use real, countable numbers
 * only; a number left empty shows "TBA".
 */
import data from "./data/impact.json";

export type ImpactStat = {
  value: number | null;
  suffix?: string;
  label: string;
};

export const impact: ImpactStat[] = (data.stats as Array<{ value: number | null; suffix: string; label: string }>).map((s) => ({
  value: s.value,
  suffix: s.suffix || undefined,
  label: s.label,
}));
