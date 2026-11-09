/**
 * The essay competition page at /essay-competition.
 * Edited in /keystatic (Bulletin board > Essay competition); stored in data/essay.json.
 */
import data from "./data/essay.json";

export type EssayCategory = { name: string; vke: string; others: string };
export type EssayPrompt = { title: string; question: string };
export type EssayLink = { label: string; href: string };

export const essay = {
  show: data.show,
  meta: data.meta,
  eyebrow: data.eyebrow,
  title: data.title,
  intro: data.intro,
  categories: data.categories as EssayCategory[],
  prompts: data.prompts as EssayPrompt[],
  rulesTitle: data.rulesTitle,
  rules: data.rules,
  signups: data.signups as EssayLink[],
};
