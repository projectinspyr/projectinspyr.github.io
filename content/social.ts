import { site, type SocialLink } from "./site";

/** Every social profile that currently exists, in display order. */
export const socialLinks: SocialLink[] = [site.social.instagram, site.social.youtube].filter(
  (link): link is SocialLink => link !== null,
);
