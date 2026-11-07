# Project INSPYR — website

The public site for Project INSPYR, a student-led initiative from Pune bridging NGOs and the public through hands-on volunteering and short-form video.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Motion. The team edits all text and images in the built-in editor at `/keystatic`, without touching code.

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

## Editing the site (no code)

The team edits the site at **https://project-inspyr.vercel.app/keystatic**. Sign in with GitHub, pick a section on the left, change it and press **Save**. The change is saved to GitHub and the live site updates about 1–2 minutes later. Every save is kept in the history, so nothing is ever lost.

| In the editor | What it controls |
| --- | --- |
| **Bulletin board** | The pinned note on the yellow wall (headline, text, buttons) and the posters in the slider. Upload posters here. |
| **Pages** | Every word on Home, About, Partners, Contact, Privacy and the 404 page |
| **Lists → FAQs** | Questions on About and Partners |
| **Lists → Reels** | Featured reels, and the switch that shows or hides the reels section |
| **Lists → Partner organizations** | Partner names and logos (the logo strip appears once there is one) |
| **Lists → Team and milestones** | People with photos, and the timeline on About (each appears once it has entries) |
| **Lists → Numbers** | The numbers panel (hidden while empty) |
| **Settings → Site settings** | Tagline, contact email, Instagram, YouTube, bio, reply time |

**Highlighting words.** In headlines, wrap words in `[[double brackets]]` to make them red, or `{{double braces}}` to make them yellow. Use red only in big headlines, where it stays readable.

**Posting an announcement.** Open **Bulletin board**. Change the pinned note, and add buttons (for example *Read more* and *Register!*) once there are real links. Untick *Show the pinned announcement* to show the "Nothing pinned" note instead. For the slider, open a poster frame, press **Choose file**, describe the poster, then **Done** and **Save**. Posters are 16:9 (1600 × 900 works well).

**Featured reels.** YouTube videos and Shorts play on the page (the player only loads when pressed, using YouTube's privacy-enhanced mode). Instagram reels show a styled card that opens the reel on Instagram.

**Only real content.** Sections that would otherwise show placeholders stay hidden until they have real entries. Only add real, countable numbers, and only people who have agreed to be shown.

**Swapping in the original logo.** The logo on the cards is `/public/brand/logo.png`, cut from the supplied image. For a sharper result, replace that file with the original export under the same name.

### Adding team members as editors

Each editor needs a free GitHub account. On GitHub, open the `project-inspyr` repository → **Settings → Collaborators → Add people**, and invite them. Once they accept, they can sign in at `/keystatic`.

### One-time editor setup

The editor needs a small GitHub app to save changes. This is done once:

1. Start the setup page on this computer (`/keystatic/setup` on the local dev server) and open it in a browser that is signed in to GitHub as the repository owner.
2. Under **Deployed App URL**, enter `https://project-inspyr.vercel.app`. Leave the organization blank. Press **Create GitHub App**, then **Create GitHub App** again on GitHub.
3. When GitHub sends you back, the keys are written to a private `.env` file in the project folder. That file is never uploaded to GitHub.
4. In Vercel → the project → **Settings → Environment Variables**, choose **Import .env** and pick that `.env` file. It adds four `KEYSTATIC_…` values. Save.
5. Redeploy (Vercel → **Deployments** → the latest one → **Redeploy**).
6. Open `https://project-inspyr.vercel.app/keystatic`, sign in with GitHub, and allow the app to access the `project-inspyr` repository when asked.

Until this is done, the rest of the site works normally and `/keystatic` just says the editor isn't connected yet.

### Content files (for developers)

The editor reads and writes JSON in `content/data/`, and uploaded images go into `public/` (`board`, `partners`, `team`). The fields are defined in `keystatic.config.ts`. The TypeScript modules in `/content` (`site.ts`, `bulletin.ts`, `pages/*.ts` and the lists) load that JSON and give the components typed data. `content/forms.ts` (form wording, tied to server validation) and `content/social.ts` stay in code. To edit the files locally through the editor, run the dev server with `NEXT_PUBLIC_KEYSTATIC_STORAGE=local`.

---

## Environment variables

Documented in `.env.example`. Set them in `.env.local` locally and in Vercel → Project → Settings → Environment Variables for production. None of them reach the browser except those starting with `NEXT_PUBLIC_`.

| Variable | Required | Purpose |
| --- | --- | --- |
| `RESEND_API_KEY` | Yes, in production | Sends form submissions via [Resend](https://resend.com) |
| `CONTACT_TO_EMAIL` | No | Inbox(es) for submissions. Defaults to `inspyrproject@gmail.com` |
| `CONTACT_FROM_EMAIL` | Recommended | Sender, e.g. `Project INSPYR <hello@yourdomain.org>`. Must be on a domain verified in Resend |
| `FORMS_DRY_RUN` | No | `true` logs submissions instead of sending (for testing) |
| `NEXT_PUBLIC_SITE_URL` | Once you have a domain | Canonical URL for SEO, sitemap and share images |
| `NEXT_PUBLIC_ANALYTICS` | No | `off` (default), `vercel` or `plausible` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Only with Plausible | Your domain as registered in Plausible |
| `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | For the editor | Created by the one-time editor setup above; import them from the generated `.env` |

### Setting up email (Resend)

1. Create a free account at resend.com and an API key. Put it in `RESEND_API_KEY`.
2. Until a domain is verified, Resend's test sender `onboarding@resend.dev` only delivers to the email address that owns the Resend account. Sign up with `inspyrproject@gmail.com` so submissions arrive there from day one.
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
2. Set `NEXT_PUBLIC_SITE_URL=https://projectinspyr.org` (or set the website address in the editor under Site settings) and redeploy.
3. On GitHub → Settings → Developer settings → GitHub Apps → the Keystatic app, add `https://projectinspyr.org/api/keystatic/github/oauth/callback` as a callback URL so the editor works on the new domain.
4. Verify the same domain in Resend and update `CONTACT_FROM_EMAIL`.

---

## Launch checklist

- [ ] `RESEND_API_KEY` and `CONTACT_FROM_EMAIL` set in Vercel; send one test message from each form on the live site
- [ ] Custom domain connected and `NEXT_PUBLIC_SITE_URL` set
- [ ] Analytics: set `NEXT_PUBLIC_ANALYTICS=vercel` and enable Web Analytics in the Vercel dashboard (or use Plausible)
- [ ] Google Search Console: add the domain, verify it, and submit `https://yourdomain/sitemap.xml`
- [ ] Update the Instagram link in bio to the site URL
- [ ] Test the share preview: paste the URL into WhatsApp, a LinkedIn post draft ([Post Inspector](https://www.linkedin.com/post-inspector/)) and an Instagram story link sticker
- [ ] Finish the one-time editor setup and invite the team as GitHub collaborators
- [ ] Add the first featured reels in the editor (Lists → Reels) and switch the section on
- [ ] Add the YouTube channel in the editor (Site settings) when it exists
- [ ] Replace the recreated logo with the original file, if preferred
- [ ] Have the team read the policy-style copy listed below and confirm it matches how you work

---

## Defaults chosen (please review)

These were decided without explicit answers and are easy to change:

- **Logo:** cut from the supplied image (`public/brand/logo.png`).
- **Pinned announcement:** names the essay competition with details marked TBA (editor → Bulletin board).
- **Domain:** none yet. URLs fall back to the Vercel production URL.
- **YouTube:** no channel yet, so YouTube links are hidden.
- **Tagline stand-in:** "We show up. Then we tell the story." (two alternatives listed in the editor under Site settings).
- **Response time:** "We reply within 3 working days" (Site settings).
- **What partners get** (Pages → Partners page): service organizations get volunteers and a reel with credit; sponsors get named credit in supported reels and on the site; schools get volunteering opportunities for students.
- **Policy-style statements to confirm** (Lists → FAQs, Pages → Partners page): partners see the reel before it is published; filming always comes with volunteering; on-the-ground work is in Pune.
- **Team descriptions** for Scripts, Reels, Outreach and Production are written from the team names (Pages → About page). Adjust them to match who actually does what.
- **Numbers panel, reels, team members, partners and timeline** are empty or switched off, so those sections are hidden.

---

## How it is built

- **Style: comic book.** Flat colour, thick ink outlines, hard offset shadows, square corners, slightly tilted cards, halftone dots, tape, pins and stickers.
- **Signature: the bridge.** One arch from the organizations' bank to the public's bank, crossed by a spark, inked like a comic panel. It appears in the poster on the Home page (drawn in CSS, looped with SVG animation, no JavaScript), the How it works story, the 404 (an unfinished bridge) and the favicon.
- **Design tokens** live at the top of `src/app/globals.css`: the navy scale, ink, signal red (actions), spark yellow (emphasis), tape and paper tones, and the hard shadows. Contrast notes are next to them. To make the navy darker or lighter, change `--color-navy-800`.
- **Type:** Bebas Neue for headlines, Plus Jakarta Sans for body, Permanent Marker for hand-lettered tags. All self-hosted through `next/font`.
- **Motion** respects `prefers-reduced-motion` everywhere: entrances settle instantly, the bridge renders still, stickers stop floating, smooth scrolling and the custom cursor turn off.
- **SEO:** per-page metadata and canonical URLs, generated Open Graph and Twitter images per page, `sitemap.xml`, `robots.txt`, web manifest and Organization JSON-LD.

### Previous styling (backup)

The navy "bridge" styling used before the comic restyle is saved on the `backup/navy-bridge-style` branch and the `style-navy-bridge-v1` tag. Vercel keeps a preview link for that branch under Project → Deployments.

```
content/            typed content modules; content/data/ holds the JSON the editor edits
keystatic.config.ts the editor's fields
src/app/(site)/     the public pages
src/app/keystatic/  the editor at /keystatic
src/app/            server actions, share images, sitemap, robots, 404
src/components/     brand (bridge, logo), home sections, forms, layout, motion, ui
src/lib/            schemas, email, rate limit, metadata, helpers
```

## Quality checks (last run)

Lighthouse (mobile) on the production build, comic restyle: Performance 94–98 across Home, About, Partners and Contact, with Accessibility 100, Best Practices 100 and SEO 100 on each. The Reach out form was tested end to end: validation, the two choices, preselection by link, honeypot, rate limiting, server-side validation with JavaScript off, and delivery (logged in dry-run mode).
