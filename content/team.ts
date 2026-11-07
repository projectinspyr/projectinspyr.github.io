/**
 * Team members and milestones for the About page. Edited in /keystatic
 * (Lists → Team and milestones); stored in data/team.json. Each section only
 * appears once it has entries. Only add people who have agreed to be shown.
 */
import data from "./data/team.json";

export type TeamMember = {
  name: string;
  role: string;
  team?: "Scripts" | "Reels" | "Outreach" | "Production";
  photo?: string;
};

export type Milestone = {
  date: string;
  title: string;
  body?: string;
};

export const team: TeamMember[] = (
  data.team as Array<{ name: string; role: string; team: TeamMember["team"] | ""; photo: string | null }>
).map((t) => ({ name: t.name, role: t.role, team: t.team || undefined, photo: t.photo || undefined }));

export const timeline: Milestone[] = (data.timeline as Array<{ date: string; title: string; body: string }>).map((m) => ({
  date: m.date,
  title: m.title,
  body: m.body || undefined,
}));
