/**
 * The bulletin board at the top of the home page.
 *
 * `pinned` is the note on the yellow wall: change it whenever there is news.
 * Each line of `title` becomes its own line; [[words]] turn red.
 * Add `actions` once there are real links, for example:
 * actions: [
 *   { label: "Read more", href: "https://example.org/details", style: "navy" },
 *   { label: "Register!", href: "https://forms.gle/your-form", style: "primary" },
 * ],
 * Set `pinned` to null when there is nothing to announce.
 */
export type BulletinAction = { label: string; href: string; style?: "primary" | "navy" };

export type Announcement = {
  tag: string;
  title: string[];
  body: string;
  actions?: BulletinAction[];
};

export const pinned: Announcement | null = {
  tag: "pinned announcement",
  title: ["Project [[INSPYR]]", "Essay competition"],
  body: "Details: TBA. Follow us on Instagram to hear first.",
  actions: [{ label: "Follow for updates", href: "https://instagram.com/projectinspyr", style: "primary" }],
};

/** Shown on the note when `pinned` is null. */
export const nothingPinned: Announcement = {
  tag: "bulletin board",
  title: ["Nothing pinned", "right [[now]]"],
  body: "Check back soon, or follow us on Instagram to hear first.",
  actions: [{ label: "Follow for updates", href: "https://instagram.com/projectinspyr", style: "primary" }],
};

/**
 * The posters in the slider under the note. They are 16:9 (1600 x 900 works well).
 * Put poster images in /public/board, then fill in a slide, for example:
 * { image: "/board/essay-competition.png", alt: "Essay competition poster", href: "https://forms.gle/your-form" },
 * A slide without an image shows an empty frame marked TBA.
 */
export type BulletinSlide = {
  image?: string;
  /** Describe the poster for people who can't see it. Required with an image. */
  alt?: string;
  /** Optional: where the poster links to when pressed. */
  href?: string;
};

export const slides: BulletinSlide[] = [{}, {}, {}, {}];
