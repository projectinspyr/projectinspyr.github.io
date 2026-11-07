import { config, fields, singleton } from "@keystatic/core";

/**
 * The content editor at /keystatic.
 *
 * Everything the team edits lives in content/data/*.json. On the live site,
 * saving commits to GitHub and Vercel redeploys in a minute or two. For local
 * testing, set NEXT_PUBLIC_KEYSTATIC_STORAGE=local to edit the files directly.
 */

const HIGHLIGHT = "Wrap words in [[double brackets]] to make them red, or {{double braces}} for yellow.";

const text = (label: string, description?: string) => fields.text({ label, description });
const required = (label: string, description?: string) =>
  fields.text({ label, description, validation: { length: { min: 1 } } });
const paragraph = (label: string, description?: string) => fields.text({ label, description, multiline: true });
const headline = (label = "Headline") => required(label, HIGHLIGHT);
const link = (label: string) =>
  fields.object({ label: required("Button text"), href: required("Link", "A page like /contact, or a full web address.") }, { label });
const meta = fields.object(
  {
    title: required("Browser tab title"),
    description: paragraph("Search and share description", "One or two sentences shown on Google and in link previews."),
    ogTitle: text("Share image headline", HIGHLIGHT),
  },
  { label: "Search and sharing" },
);
const heading = (label: string) => fields.object({ eyebrow: text("Small label"), title: headline() }, { label });
const titledItems = (label: string, itemLabel: string) =>
  fields.array(fields.object({ title: required("Title"), body: paragraph("Text") }), {
    label,
    itemLabel: (props) => props.fields.title.value || itemLabel,
  });
const strings = (label: string, itemLabel: string, multiline = false) =>
  fields.array(multiline ? paragraph(itemLabel) : required(itemLabel), { label, itemLabel: (props) => props.value || itemLabel });

const note = (label: string) =>
  fields.object(
    {
      tag: text("Small tag", "The hand-written line at the top, like “pinned announcement”."),
      title: strings("Headline lines", "Line"),
      body: paragraph("Text", "To link words, write [the words](https://the-address), or [the words](#essay-competition) for a section on this page."),
      actions: fields.array(
        fields.object({
          label: required("Button text"),
          href: required("Link", "A page like /contact, or a full web address such as a Google Form."),
          style: fields.select({
            label: "Colour",
            options: [
              { label: "Red", value: "primary" },
              { label: "Navy", value: "navy" },
              { label: "Small text link", value: "link" },
            ],
            defaultValue: "primary",
          }),
        }),
        { label: "Buttons", description: "Leave empty for no buttons.", itemLabel: (props) => props.fields.label.value || "Button" },
      ),
    },
    { label },
  );

const json = { data: "json" } as const;

export default config({
  storage:
    process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "local"
      ? { kind: "local" }
      : { kind: "github", repo: { owner: "ImZack12751", name: "project-inspyr" } },

  ui: {
    brand: { name: "Project INSPYR" },
    navigation: {
      "Bulletin board": ["bulletin", "essay"],
      Pages: ["home", "about", "partnersPage", "contact", "privacy", "notFound"],
      Lists: ["faqs", "reels", "partners", "team", "impact"],
      Settings: ["site"],
    },
  },

  singletons: {
    bulletin: singleton({
      label: "Bulletin board",
      path: "content/data/bulletin",
      format: json,
      schema: {
        showPinned: fields.checkbox({
          label: "Show the pinned announcement",
          description: "Untick to show the “Nothing pinned” note instead.",
          defaultValue: true,
        }),
        pinned: note("Pinned announcement"),
        nothingPinned: note("“Nothing pinned” note"),
        slides: fields.array(
          fields.object({
            image: fields.image({
              label: "Poster",
              description: "16:9 works best, for example 1600 × 900 pixels. Leave empty to show a TBA frame.",
              directory: "public/board",
              publicPath: "/board/",
            }),
            alt: text("Describe the poster", "For people who can't see it. Needed when there is a poster."),
            href: text("Link when pressed", "Optional. A full web address."),
          }),
          {
            label: "Posters in the slider",
            description: "Each poster is one slide. Drag to reorder.",
            itemLabel: (props) => props.fields.alt.value || (props.fields.image.value ? "Poster" : "Empty frame (TBA)"),
          },
        ),
      },
    }),

    essay: singleton({
      label: "Essay competition",
      path: "content/data/essay",
      format: json,
      schema: {
        show: fields.checkbox({ label: "Show this section on the home page", defaultValue: true }),
        eyebrow: text("Small label"),
        title: headline(),
        intro: paragraph("Intro"),
        categories: fields.array(
          fields.object({
            name: required("Category"),
            vke: required("Who it covers at VKE"),
            others: required("Who it covers at other schools"),
          }),
          { label: "Age groups", itemLabel: (props) => props.fields.name.value || "Category" },
        ),
        prompts: fields.array(
          fields.object({ title: required("Prompt title"), question: paragraph("Prompt") }),
          { label: "Prompts", itemLabel: (props) => props.fields.title.value || "Prompt" },
        ),
        rulesTitle: text("Rules heading"),
        rules: paragraph("Rules"),
        signups: fields.array(
          fields.object({ label: required("Button text"), href: required("Link", "The full address of the sign-up form.") }),
          { label: "Sign-up buttons", itemLabel: (props) => props.fields.label.value || "Button" },
        ),
      },
    }),

    home: singleton({
      label: "Home page",
      path: "content/data/home",
      format: json,
      schema: {
        meta,
        hero: fields.object(
          {
            valueProp: paragraph("One-sentence pitch", "Shown under the tagline."),
            primaryCta: link("Main button"),
            secondaryCta: fields.object({ label: required("Button text", "This button opens Instagram.") }, { label: "Second button" }),
          },
          { label: "Intro" },
        ),
        bridge: fields.object(
          { title: required("Title"), body: paragraph("Text"), left: required("Left bank label"), right: required("Right bank label") },
          { label: "Bridge poster" },
        ),
        intro: fields.object(
          { line: required("Line under the name"), stickers: strings("Stickers", "Sticker") },
          { label: "Name block" },
        ),
        marquee: strings("Yellow scrolling banner", "Phrase"),
        marqueeAction: strings("Red scrolling banner", "Phrase"),
        whatWeDo: fields.object(
          {
            eyebrow: text("Small label"),
            title: headline(),
            handsCaption: text("Caption on the volunteering picture"),
            bubble: text("Speech bubble"),
            intro: paragraph("Intro"),
            pillars: titledItems("The two pillars", "Pillar"),
            facts: fields.array(fields.object({ label: required("Label"), value: required("Value") }), {
              label: "Facts card",
              itemLabel: (props) => props.fields.label.value || "Fact",
            }),
          },
          { label: "What we do" },
        ),
        howItWorks: fields.object(
          { eyebrow: text("Small label"), title: headline(), steps: titledItems("Steps", "Step"), cta: link("Button") },
          { label: "How it works" },
        ),
        manifesto: fields.object(
          { eyebrow: text("Small label"), paragraphs: strings("Paragraphs", "Paragraph", true), signature: text("Signature") },
          { label: "Manifesto", description: HIGHLIGHT },
        ),
        reels: fields.object(
          {
            eyebrow: text("Small label"),
            title: headline(),
            intro: paragraph("Intro"),
            emptyTag: text("Tag while there are no reels"),
            emptyTitle: text("Title while there are no reels"),
            emptyBody: paragraph("Text while there are no reels"),
          },
          { label: "Reels section" },
        ),
        audiences: fields.object(
          {
            eyebrow: text("Small label"),
            title: headline(),
            cards: fields.array(
              fields.object({
                key: fields.select({
                  label: "Picture",
                  options: [
                    { label: "People (the public)", value: "public" },
                    { label: "Briefcase (sponsors)", value: "sponsors" },
                    { label: "Graduation cap (students)", value: "students" },
                  ],
                  defaultValue: "public",
                }),
                title: required("Title"),
                body: paragraph("Text"),
                cta: required("Button text"),
                href: text("Button link", "Leave empty to link to Instagram."),
              }),
              { label: "Cards", itemLabel: (props) => props.fields.title.value || "Card" },
            ),
          },
          { label: "Who this is for" },
        ),
        impact: fields.object(
          { eyebrow: text("Small label"), title: headline(), intro: paragraph("Intro") },
          { label: "Numbers panel heading", description: "The numbers themselves are under Lists → Numbers." },
        ),
        partnersStrip: fields.object({ eyebrow: text("Label above partner logos") }, { label: "Partner logos heading" }),
        closing: fields.object(
          { title: headline(), body: paragraph("Text"), primary: link("First button"), secondary: link("Second button") },
          { label: "Closing yellow band (shown on every page)" },
        ),
      },
    }),

    about: singleton({
      label: "About page",
      path: "content/data/about",
      format: json,
      schema: {
        meta,
        hero: fields.object({ eyebrow: text("Small label"), title: headline(), intro: paragraph("Intro") }, { label: "Top of page" }),
        story: fields.object(
          { eyebrow: text("Small label"), title: headline(), paragraphs: strings("Paragraphs", "Paragraph", true) },
          { label: "Why we exist" },
        ),
        mission: fields.object({ eyebrow: text("Small label"), statement: paragraph("Statement", HIGHLIGHT) }, { label: "Mission" }),
        values: fields.object({ eyebrow: text("Small label"), title: headline(), items: titledItems("Values", "Value") }, { label: "Values" }),
        teams: fields.object(
          {
            eyebrow: text("Small label"),
            title: headline(),
            intro: paragraph("Intro"),
            items: fields.array(
              fields.object({
                key: fields.select({
                  label: "Icon",
                  options: [
                    { label: "Script page", value: "scripts" },
                    { label: "Phone with play button", value: "reels" },
                    { label: "Megaphone", value: "outreach" },
                    { label: "Camera", value: "production" },
                  ],
                  defaultValue: "scripts",
                }),
                title: required("Team name"),
                body: paragraph("What they do"),
              }),
              { label: "Teams", itemLabel: (props) => props.fields.title.value || "Team" },
            ),
          },
          { label: "How we work (the four teams)" },
        ),
        team: heading("People heading (people are under Lists → Team)"),
        timeline: heading("Milestones heading (milestones are under Lists → Team)"),
        faq: heading("Questions heading (questions are under Lists → FAQs)"),
      },
    }),

    partnersPage: singleton({
      label: "Partners page",
      path: "content/data/partners-page",
      format: json,
      schema: {
        meta,
        hero: fields.object(
          { eyebrow: text("Small label"), title: headline(), intro: paragraph("Intro"), cta: link("Button") },
          { label: "Top of page" },
        ),
        why: fields.object({ eyebrow: text("Small label"), title: headline(), items: titledItems("Reasons", "Reason") }, { label: "Why partner with us" }),
        perks: fields.object(
          {
            eyebrow: text("Small label"),
            title: headline(),
            groups: fields.array(
              fields.object({
                type: fields.select({
                  label: "Icon",
                  options: [
                    { label: "Megaphone (organizations)", value: "service" },
                    { label: "Briefcase (sponsors)", value: "sponsor" },
                    { label: "Script page (schools)", value: "school" },
                  ],
                  defaultValue: "service",
                }),
                title: required("Title"),
                cta: required("Button text"),
                items: strings("What they get", "Point"),
              }),
              { label: "Partner types", itemLabel: (props) => props.fields.title.value || "Partner type" },
            ),
          },
          { label: "What a partner gets" },
        ),
        process: fields.object({ eyebrow: text("Small label"), title: headline(), steps: titledItems("Steps", "Step") }, { label: "The process" }),
        faq: heading("Questions heading (questions are under Lists → FAQs)"),
      },
    }),

    contact: singleton({
      label: "Contact page",
      path: "content/data/contact",
      format: json,
      schema: {
        meta,
        hero: fields.object({ eyebrow: text("Small label"), title: headline(), intro: paragraph("Intro") }, { label: "Top of page" }),
        direct: fields.object({ prefix: text("Words before the email address") }, { label: "Line under the form" }),
      },
    }),

    privacy: singleton({
      label: "Privacy page",
      path: "content/data/privacy",
      format: json,
      schema: {
        meta,
        title: headline(),
        updated: text("Last updated line"),
        sections: fields.array(
          fields.object({ heading: required("Heading"), body: strings("Paragraphs", "Paragraph", true) }),
          { label: "Sections", itemLabel: (props) => props.fields.heading.value || "Section" },
        ),
      },
    }),

    notFound: singleton({
      label: "Page not found (404)",
      path: "content/data/not-found",
      format: json,
      schema: {
        eyebrow: text("Small label"),
        title: headline(),
        body: paragraph("Text"),
        primary: link("First button"),
        secondary: link("Second button"),
      },
    }),

    faqs: singleton({
      label: "FAQs",
      path: "content/data/faqs",
      format: json,
      schema: {
        about: fields.array(fields.object({ question: required("Question"), answer: paragraph("Answer") }), {
          label: "About page questions",
          itemLabel: (props) => props.fields.question.value || "Question",
        }),
        partners: fields.array(fields.object({ question: required("Question"), answer: paragraph("Answer") }), {
          label: "Partners page questions",
          itemLabel: (props) => props.fields.question.value || "Question",
        }),
      },
    }),

    reels: singleton({
      label: "Reels",
      path: "content/data/reels",
      format: json,
      schema: {
        show: fields.checkbox({ label: "Show the reels section on the home page", defaultValue: false }),
        reels: fields.array(
          fields.object({
            url: required("Link to the reel", "A YouTube video or Short, or an Instagram reel."),
            title: required("Title"),
            partner: text("Organization featured", "Optional."),
          }),
          { label: "Featured reels", itemLabel: (props) => props.fields.title.value || "Reel" },
        ),
      },
    }),

    partners: singleton({
      label: "Partner organizations",
      path: "content/data/partners",
      format: json,
      schema: {
        partners: fields.array(
          fields.object({
            name: required("Name"),
            type: fields.select({
              label: "Type",
              options: [
                { label: "Service or volunteer organization", value: "service" },
                { label: "Sponsor or donor", value: "sponsor" },
                { label: "School or student group", value: "school" },
              ],
              defaultValue: "service",
            }),
            url: text("Website", "Optional."),
            logo: fields.image({ label: "Logo", description: "Optional. Without a logo the name is shown.", directory: "public/partners", publicPath: "/partners/" }),
          }),
          {
            label: "Partners",
            description: "The logo strip on the home page appears once there is at least one partner.",
            itemLabel: (props) => props.fields.name.value || "Partner",
          },
        ),
      },
    }),

    team: singleton({
      label: "Team and milestones",
      path: "content/data/team",
      format: json,
      schema: {
        team: fields.array(
          fields.object({
            name: required("Name"),
            role: required("Role"),
            team: fields.select({
              label: "Team",
              options: [
                { label: "None", value: "" },
                { label: "Scripts", value: "Scripts" },
                { label: "Reels", value: "Reels" },
                { label: "Outreach", value: "Outreach" },
                { label: "Production", value: "Production" },
              ],
              defaultValue: "",
            }),
            photo: fields.image({ label: "Photo", description: "Optional. Only add people who agreed to be shown.", directory: "public/team", publicPath: "/team/" }),
          }),
          {
            label: "People",
            description: "The team section on the About page appears once there is at least one person.",
            itemLabel: (props) => props.fields.name.value || "Person",
          },
        ),
        timeline: fields.array(
          fields.object({ date: required("Date"), title: required("Title"), body: paragraph("Text") }),
          {
            label: "Milestones",
            description: "The timeline on the About page appears once there is at least one milestone.",
            itemLabel: (props) => props.fields.title.value || "Milestone",
          },
        ),
      },
    }),

    impact: singleton({
      label: "Numbers",
      path: "content/data/impact",
      format: json,
      schema: {
        stats: fields.array(
          fields.object({
            value: fields.integer({ label: "Number", description: "Leave empty to show TBA." }),
            suffix: text("After the number", "Optional, for example +."),
            label: required("Label"),
          }),
          {
            label: "Numbers panel",
            description: "Hidden while empty. Use real, countable numbers only.",
            itemLabel: (props) => props.fields.label.value || "Number",
          },
        ),
      },
    }),

    site: singleton({
      label: "Site settings",
      path: "content/data/site",
      format: json,
      schema: {
        tagline: required(
          "Tagline",
          `${HIGHLIGHT} Alternatives: “Where good work gets [[seen]].” or “Young hands. [[Loud]] stories.”`,
        ),
        description: paragraph("Site description", "Used by search engines and link previews."),
        instagramBio: paragraph("Short bio", "Shown in the footer."),
        city: required("City"),
        country: required("Country"),
        email: required("Contact email", "Shown on the site. Form messages go to the inbox set in Vercel."),
        responseTime: text("Reply time line"),
        url: text("Website address", "Leave empty until there is a domain, e.g. https://projectinspyr.org"),
        instagramHandle: required("Instagram handle"),
        instagramUrl: required("Instagram link"),
        youtubeHandle: text("YouTube handle", "Optional."),
        youtubeUrl: text("YouTube link", "Leave empty to hide YouTube links."),
      },
    }),
  },
});
