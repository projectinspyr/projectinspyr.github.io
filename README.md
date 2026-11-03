# Project INSPYR — website

The public site for Project INSPYR, a student-led initiative from Pune bridging NGOs and the public through hands-on volunteering and short-form video.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Motion. All copy lives in `/content`, so text can be edited without touching components.

Pages: Home, About, Partners ("Become a partner"), Contact, Privacy, and a designed 404.

---

## Local setup

You need Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in values (optional for local work)
npm run dev                  # http://localhost:3000
```

Useful scripts:

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build (also type-checks) |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

Without `RESEND_API_KEY`, local development does not send email: form submissions are printed in the terminal running `npm run dev`, so both forms can be tested end to end.

---

## Editing content

Everything a non-developer needs is in `/content`. Each file is plain TypeScript: edit the text between the quotes and save.

| File | What it controls |
| --- | --- |
| `content/site.ts` | Name, tagline, email, Instagram, YouTube, response time, navigation, production URL |
| `content/social.ts` | Builds the social link list from `site.ts` (no need to edit) |
| `content/pages/home.ts` | All Home page copy, including the manifesto |
| `content/pages/about.ts` | About page: story, mission, values, the four teams |
| `content/pages/partners.ts` | Partners page: why partner, what each partner type gets, process |
| `content/pages/contact.ts` | Contact page: who to contact for what |
| `content/pages/privacy.ts` | Privacy page |
| `content/pages/not-found.ts` | 404 page |
| `content/faqs.ts` | FAQs on About and Partners |
| `content/forms.ts` | Form labels, placeholders, dropdown options and messages |
| `content/reels.ts` | Featured reels on the Home page |
| `content/partners.ts` | Partner logo strip (hidden until it has entries) |
| `content/impact.ts` | Impact counters (hidden until it has entries) |
| `content/team.ts` | Team members and timeline on About (hidden until they have entries) |

**Highlighting words.** In headlines, wrap words in `[[double brackets]]` to make them yellow, or `{{double braces}}` to make them red (use red only in big headlines, where it stays readable).

**Changing the tagline.** `content/site.ts` lists three options in `taglines`. Change `taglines[0]` to `taglines[1]` or `taglines[2]` on the `tagline:` line. That one change updates the hero and the default page title.

**Adding a featured reel.** Add an entry to `content/reels.ts`:

```ts
{ url: "https://www.youtube.com/shorts/VIDEO_ID", title: "A morning at the food drive", partner: "Organization name" },
{ url: "https://www.instagram.com/reel/REEL_ID/", title: "Behind the scenes" },
```

YouTube videos and Shorts show a thumbnail and play on the page (the player only loads when pressed, using YouTube's privacy-enhanced mode). Instagram reels show a styled card that opens the reel on Instagram; no Instagram scripts are loaded.

**Impact numbers, partners, team, timeline.** These sections stay hidden until their file has entries, so the site never shows placeholder data. Only add real, countable numbers and people who have agreed to be shown. Photos go in `/public/team`, partner logos in `/public/partners`.

**Adding the YouTube channel.** In `content/site.ts`, replace `youtube: null` with the object shown in the comment above it. Links appear in the footer, contact page and structured data.

**Swapping in the original logo.** The lockup is recreated as SVG in `src/components/brand/wordmark.tsx`. To use an exported file instead, put it in `/public/brand/` and replace the `<svg>` in that component with `<Image src="/brand/logo.svg" … />`.

---

## Environment variables

Documented in `.env.example`. Set them in `.env.local` locally and in Vercel → Project → Settings → Environment Variables for production. None of them reach the browser except those starting with `NEXT_PUBLIC_`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, in production | Sends form submissions via [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | No | Inbox(es) for submissions. Defaults to `contactinspyrproject@gmail.com` |
| `CONTACT_FROM_EMAIL` | Recommended | Sender, e.g. `Project INSPYR <hello@yourdomain.org>`. Must be on a domain verified in Resend |
| `FORMS_DRY_RUN` | No | `true` logs submissions instead of sending (for testing) |
| `NEXT_PUBLIC_SITE_URL` | Once you have a domain | Canonical URL for SEO, sitemap and share images |
| `NEXT_PUBLIC_ANALYTICS` | No | `off` (default), `vercel` or `plausible` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Only with Plausible | Your domain as registered in Plausible |

### Setting up email (Resend)

1. Create a free account at resend.com and an API key. Put it in `RESEND_API_KEY`.
2. Until a domain is verified, Resend's test sender `onboarding@resend.dev` only delivers to the email address that owns the Resend account. Sign up with `contactinspyrproject@gmail.com` so submissions arrive there from day one.
3. Once you own a domain, add it in Resend → Domains, add the DNS records it shows, and set `CONTACT_FROM_EMAIL` to an address on that domain.

Replies work naturally: every email sets Reply-To to the person who filled in the form.

Forms are protected by zod validation (in the browser and again on the server), a hidden honeypot field, and a basic rate limit of 5 submissions per 10 minutes per IP. The limiter is in memory, which stops casual abuse; for stricter limits across server instances, swap `src/lib/rate-limit.ts` for a shared store such as Upstash Redis.

---

## Deploying to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the detected Next.js settings.
3. Add the environment variables above (at least `RESEND_API_KEY` and `CONTACT_FROM_EMAIL`).
4. Deploy. Until a custom domain is connected, canonical URLs and share images use the Vercel production URL automatically.

### Connecting a custom domain

1. Vercel → Project → Settings → Domains → add your domain (for example `projectinspyr.org`), and follow the DNS instructions at your registrar.
2. Set `NEXT_PUBLIC_SITE_URL=https://projectinspyr.org` (or set `url` in `content/site.ts`) and redeploy.
3. Verify the same domain in Resend and update `CONTACT_FROM_EMAIL`.

---

## Launch checklist

- [ ] `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` set in Vercel; send one test message from each form on the live site
- [ ] Custom domain connected and `NEXT_PUBLIC_SITE_URL` set
- [ ] Analytics: set `NEXT_PUBLIC_ANALYTICS=vercel` and enable Web Analytics in the Vercel dashboard (or use Plausible)
- [ ] Google Search Console: add the domain, verify it, and submit `https://yourdomain/sitemap.xml`
- [ ] Update the Instagram link in bio to the site URL
- [ ] Test the share preview: paste the URL into WhatsApp, a LinkedIn post draft ([Post Inspector](https://www.linkedin.com/post-inspector/)) and an Instagram story link sticker
- [ ] Add the first featured reels to `content/reels.ts`
- [ ] Add the YouTube channel to `content/site.ts` when it exists
- [ ] Replace the recreated logo with the original file, if preferred
- [ ] Have the team read the policy-style copy listed below and confirm it matches how you work

---

## Defaults chosen (please review)

These were decided without explicit answers and are easy to change:

- **Logo:** recreated as SVG from the brand artwork (arched yellow PROJECT, red INSPYR, white "led by students").
- **Domain:** none yet. URLs fall back to the Vercel production URL.
- **YouTube:** no channel yet, so YouTube links are hidden.
- **Tagline stand-in:** "We show up. Then we tell the story." (two alternatives in `content/site.ts`).
- **Response time:** "We reply within 3 working days" (`content/site.ts`).
- **What partners get** (`content/pages/partners.ts`): service organizations get volunteers and a reel with credit; sponsors get named credit in supported reels and on the site; schools get volunteering opportunities for students.
- **Policy-style statements to confirm** (`content/faqs.ts`, `content/pages/partners.ts`): partners see the reel before it is published; filming always comes with volunteering; on-the-ground work is in Pune.
- **Team descriptions** for Scripts, Reels, Outreach and Production are written from the team names (`content/pages/about.ts`). Adjust them to match who actually does what.
- **Team members, impact numbers, partners and timeline** are empty, so those sections are hidden.

---

## How it is built

- **Signature: the bridge.** One arch from the organizations' bank to the public's bank, crossed by a yellow spark. It appears in the hero (drawn in CSS, looped with SVG animation, no JavaScript), the How it works story, the section dividers, the page-transition bar, the 404 (an unfinished bridge), the favicon and every share image.
- **Design tokens** live at the top of `src/app/globals.css`: the navy scale, signal red (actions), spark yellow (emphasis), paper tones. Contrast notes are next to them.
- **Type:** Bricolage Grotesque for headlines, Instrument Sans for body, Fredoka for the logo, Caveat for small hand-written notes. All self-hosted through `next/font`.
- **Motion** respects `prefers-reduced-motion` everywhere: entrances settle instantly, the bridge renders still, smooth scrolling and the custom cursor turn off.
- **SEO:** per-page metadata and canonical URLs, generated Open Graph and Twitter images per page, `sitemap.xml`, `robots.txt`, web manifest and Organization JSON-LD.

```
content/            all copy and data
src/app/            routes, server actions, share images, sitemap, robots
src/components/     brand (bridge, logo), home sections, forms, layout, motion, ui
src/lib/            schemas, email, rate limit, metadata, helpers
```

## Quality checks (last run)

Lighthouse (mobile) on the production build: Performance 99–100, Accessibility 100, Best Practices 100, SEO 100 across Home, About, Partners and Contact. Both forms were tested end to end: validation, field switching by partner type, preselection by link, honeypot, rate limiting, server-side validation with JavaScript off, and delivery (logged in dry-run mode).
