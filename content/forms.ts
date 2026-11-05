/**
 * Wording for the Reach out form on the Contact page. Option `value`s are
 * stored in emails and validated on the server; edit `label`s freely.
 */

export const reachOutOptions = [
  {
    value: "partner",
    label: "As an organization / partner",
    description: "NGOs, service groups, sponsors, donors and schools.",
  },
  {
    value: "student",
    label: "As a student",
    description: "You want to volunteer or get involved.",
  },
] as const;

export const formCopy = {
  required: "Required",
  optional: "Optional",
  sending: "Sending…",
  errorSummary: "A few fields need another look.",
  generic: "Something went wrong on our side. Please try again, or email us directly.",
  rateLimited: "Too many messages from this connection. Please wait a few minutes and try again.",
  notConfigured: "Our form is not connected yet. Please email us directly while we fix it.",

  legend: "I am reaching out…",
  name: { label: "Your name", placeholder: "Full name" },
  email: { label: "Email", placeholder: "you@example.com" },
  organization: { label: "Organization name", placeholder: "Who are you with?" },
  message: {
    label: "Message",
    placeholder: {
      partner: "What do you do, and how can we help?",
      student: "Tell us what you would like to do.",
      none: "Tell us what is on your mind.",
    },
  },
  submit: "Send message",
  successTitle: "Message received.",
  again: "Send another message",
};
