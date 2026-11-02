/**
 * Team members and milestones for the About page.
 * Each section only appears once its list has entries.
 *
 * Only add people who have agreed to be shown. Photos go in /public/team.
 *
 * Team example:
 * { name: "First Last", role: "Lead", team: "Production", photo: "/team/first-last.jpg" },
 *
 * Timeline example:
 * { date: "2026", title: "First partner reel published", body: "One sentence on what happened." },
 */
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

export const team: TeamMember[] = [];

export const timeline: Milestone[] = [];
