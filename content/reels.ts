/**
 * Featured reels on the home page. Edited in /keystatic (Lists → Reels);
 * stored in data/reels.json. YouTube links play on the page; Instagram links
 * show a styled card that opens the reel on Instagram.
 */
import data from "./data/reels.json";

export type Reel = {
  url: string;
  title: string;
  /** The organization featured in the reel. */
  partner?: string;
};

export const reels: Reel[] = (data.reels as Array<{ url: string; title: string; partner: string }>).map((r) => ({
  url: r.url,
  title: r.title,
  partner: r.partner || undefined,
}));

/** The "Short films, real work" section is hidden until this is switched on. */
export const showReelsSection: boolean = data.show;
