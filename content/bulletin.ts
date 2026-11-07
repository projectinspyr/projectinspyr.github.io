/**
 * The bulletin board at the top of the home page: the pinned note and the
 * poster slider. Edited in /keystatic (Bulletin board); stored in data/bulletin.json.
 */
import data from "./data/bulletin.json";

export type BulletinAction = { label: string; href: string; style?: "primary" | "navy" };

export type Announcement = {
  tag: string;
  title: string[];
  body: string;
  actions?: BulletinAction[];
};

export type BulletinSlide = {
  image?: string;
  /** Describes the poster for people who can't see it. */
  alt?: string;
  /** Where the poster links to when pressed. */
  href?: string;
};

const toAnnouncement = (note: typeof data.pinned): Announcement => ({
  tag: note.tag,
  title: note.title.filter(Boolean),
  body: note.body,
  actions: note.actions.map((a) => ({ label: a.label, href: a.href, style: a.style === "navy" ? "navy" : "primary" })),
});

export const pinned: Announcement | null = data.showPinned ? toAnnouncement(data.pinned) : null;

/** Shown on the note when nothing is pinned. */
export const nothingPinned: Announcement = toAnnouncement(data.nothingPinned);

export const slides: BulletinSlide[] = (data.slides as Array<{ image: string | null; alt: string; href: string }>).map((s) => ({
  image: s.image || undefined,
  alt: s.alt || undefined,
  href: s.href || undefined,
}));
