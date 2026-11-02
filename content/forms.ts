/**
 * Form wording and options. Option `value`s are stored in emails and
 * validated on the server; edit `label`s freely.
 */

export const contactTopics = [
  { value: "general", label: "General question" },
  { value: "volunteering", label: "Getting involved as a student" },
  { value: "partnership", label: "Partnering with us" },
  { value: "media", label: "Press or collaboration" },
  { value: "other", label: "Something else" },
] as const;

export const partnerTypes = [
  {
    value: "service",
    label: "Service or volunteer organization",
    description: "You run drives, programs or services and want volunteers, a reel, or both.",
  },
  {
    value: "sponsor",
    label: "Sponsor or donor",
    description: "You want to back student-led service and the stories it creates.",
  },
  {
    value: "school",
    label: "School or student group",
    description: "You want your students volunteering and creating alongside us.",
  },
] as const;

export const serviceHelpOptions = [
  { value: "volunteers", label: "Volunteers on the ground" },
  { value: "reel", label: "A reel about our work" },
  { value: "both", label: "Both" },
] as const;

export const sponsorKindOptions = [
  { value: "individual", label: "An individual" },
  { value: "organization", label: "A company or organization" },
] as const;

export const sponsorInterestOptions = [
  { value: "project", label: "Back a specific drive or project" },
  { value: "production", label: "Support our production costs" },
  { value: "inkind", label: "In-kind support (equipment, venues, services)" },
  { value: "other", label: "Something else" },
] as const;

export const schoolRoleOptions = [
  { value: "student", label: "Student" },
  { value: "teacher", label: "Teacher or staff" },
  { value: "coordinator", label: "Club or group coordinator" },
  { value: "other", label: "Other" },
] as const;

export const formCopy = {
  required: "Required",
  optional: "Optional",
  sending: "Sending…",
  errorSummary: "A few fields need another look.",
  generic: "Something went wrong on our side. Please try again, or email us directly.",
  rateLimited: "Too many messages from this connection. Please wait a few minutes and try again.",
  notConfigured:
    "Our form is not connected yet. Please email us directly while we fix it.",

  contact: {
    name: { label: "Your name", placeholder: "Full name" },
    email: { label: "Email", placeholder: "you@example.com" },
    topic: { label: "What is this about?", placeholder: "Choose a topic" },
    message: { label: "Message", placeholder: "Tell us what is on your mind." },
    submit: "Send message",
    successTitle: "Message received.",
    again: "Send another message",
  },

  partner: {
    typeLegend: "I am reaching out as a…",
    name: { label: "Your name", placeholder: "Full name" },
    email: { label: "Email", placeholder: "you@example.com" },
    phone: { label: "Phone", placeholder: "+91", hint: "Only if you prefer a call." },

    organization: { label: "Organization name", placeholder: "Who are you with?" },
    focus: {
      label: "What does your organization work on?",
      placeholder: "e.g. meals for children, animal welfare, education",
    },
    help: { label: "What would help most?" },
    location: { label: "Where is your work based?", placeholder: "Pune" },
    link: {
      label: "Website or Instagram",
      placeholder: "https:// or @handle",
    },

    sponsorKind: { label: "You are" },
    sponsorOrg: { label: "Company or organization", placeholder: "Name, if applicable" },
    sponsorInterest: { label: "What would you like to support?" },

    institution: { label: "School, college or group", placeholder: "Name of your institution" },
    role: { label: "Your role" },
    groupSize: {
      label: "How many students, roughly?",
      placeholder: "e.g. 20",
    },

    message: {
      service: { label: "Tell us about your work", placeholder: "What do you do, and what is coming up?" },
      sponsor: { label: "Anything we should know?", placeholder: "Ideas, budget range, timing…" },
      school: { label: "What would you like to do together?", placeholder: "Volunteering, a project, a visit…" },
    },

    submit: "Send inquiry",
    successTitle: "Inquiry received.",
    again: "Send another inquiry",
  },
};
