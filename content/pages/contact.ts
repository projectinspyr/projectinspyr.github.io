export const contactPage = {
  meta: {
    title: "Contact us",
    description:
      "Get in touch with Project INSPYR by form, email or Instagram. Here is who to contact for what.",
    ogTitle: "Say [[hello]].",
  },

  hero: {
    eyebrow: "Contact",
    title: "Say [[hello]].",
    intro: "A real student reads every message. Here is the fastest way to reach the right person.",
  },

  routes: {
    title: "Who to contact for what",
    items: [
      {
        who: "Organizations that want volunteers or a reel",
        how: "Use the partner inquiry form. It asks the right questions up front.",
        link: { label: "Partner inquiry", href: "/partners#inquiry" },
      },
      {
        who: "Sponsors and donors",
        how: "Use the partner form and choose “Sponsor or donor”.",
        link: { label: "Back the work", href: "/partners?type=sponsor#inquiry" },
      },
      {
        who: "Students who want to get involved",
        how: "Message us on Instagram or use this form. Tell us what you are good at.",
      },
      {
        who: "Press, collaborations and everything else",
        how: "Use this form or email us directly.",
      },
    ],
  },

  direct: {
    title: "Direct lines",
    emailLabel: "Email",
    copyLabel: "Copy email",
    copiedLabel: "Email copied",
  },

  form: {
    title: "Send a message",
  },
};
