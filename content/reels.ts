/**
 * Featured reels on the home page.
 *
 * Paste the public link to a YouTube video or Short, or an Instagram reel.
 * YouTube links play on the page; Instagram links show a styled card that
 * opens the reel on Instagram.
 *
 * Example:
 * { url: "https://www.youtube.com/shorts/VIDEO_ID", title: "A morning at the food drive", partner: "Organization name" },
 * { url: "https://www.instagram.com/reel/REEL_ID/", title: "Behind the scenes" },
 */
export type Reel = {
  url: string;
  title: string;
  /** Optional: the organization featured in the reel. */
  partner?: string;
};

export const reels: Reel[] = [];

/** The "Short films, real work" section is hidden for now. Set to true to show it again. */
export const showReelsSection = false;
