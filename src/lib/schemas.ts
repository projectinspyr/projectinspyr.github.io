import { z } from "zod";
import {
  contactTopics,
  partnerTypes,
  schoolRoleOptions,
  serviceHelpOptions,
  sponsorInterestOptions,
  sponsorKindOptions,
} from "@content/forms";

type Options = ReadonlyArray<{ value: string }>;
const values = <T extends Options>(options: T) =>
  options.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

const name = z
  .string({ error: "Please enter your name." })
  .min(2, "Please enter your full name.")
  .max(80, "Please keep this under 80 characters.");

const email = z
  .email({ error: "Please enter a valid email address." })
  .max(120, "Please use a shorter email address.");

const message = (min: number) =>
  z
    .string({ error: "Please add a few words." })
    .min(min, `Please write at least ${min} characters.`)
    .max(3000, "Please keep this under 3000 characters.");

const optionalText = (max: number) =>
  z.string().max(max, `Please keep this under ${max} characters.`).optional();

export const contactSchema = z.object({
  name,
  email,
  topic: z.enum(values(contactTopics), { error: "Please choose a topic." }),
  message: message(10),
});

export type ContactInput = z.infer<typeof contactSchema>;

const partnerBase = {
  name,
  email,
  phone: z
    .string()
    .regex(/^\+?[\d\s()-]{7,20}$/, "Please enter a valid phone number.")
    .optional(),
  message: message(10),
};

const serviceSchema = z.object({
  partnerType: z.literal("service"),
  ...partnerBase,
  organization: z
    .string({ error: "Please enter your organization's name." })
    .min(2, "Please enter your organization's name.")
    .max(120),
  focus: z
    .string({ error: "Tell us briefly what your organization works on." })
    .min(3, "Tell us briefly what your organization works on.")
    .max(200),
  help: z.enum(values(serviceHelpOptions), { error: "Please choose what would help most." }),
  location: optionalText(120),
  link: optionalText(200),
});

const sponsorSchema = z.object({
  partnerType: z.literal("sponsor"),
  ...partnerBase,
  sponsorKind: z.enum(values(sponsorKindOptions), { error: "Please choose one." }),
  sponsorOrg: optionalText(120),
  sponsorInterest: z.enum(values(sponsorInterestOptions), {
    error: "Please choose what you would like to support.",
  }),
});

const schoolSchema = z.object({
  partnerType: z.literal("school"),
  ...partnerBase,
  institution: z
    .string({ error: "Please enter your school, college or group." })
    .min(2, "Please enter your school, college or group.")
    .max(120),
  role: z.enum(values(schoolRoleOptions), { error: "Please choose your role." }),
  groupSize: optionalText(40),
});

export const partnerSchema = z.discriminatedUnion("partnerType", [
  serviceSchema,
  sponsorSchema,
  schoolSchema,
]);

export type PartnerInput = z.infer<typeof partnerSchema>;
export type PartnerType = (typeof partnerTypes)[number]["value"];

export function isPartnerType(value: unknown): value is PartnerType {
  return partnerTypes.some((t) => t.value === value);
}

/** Validates partner input, with a friendly message when no type is chosen. */
export function parsePartner(raw: Record<string, string>) {
  if (!isPartnerType(raw.partnerType)) {
    return {
      success: false as const,
      fieldErrors: { partnerType: "Please choose who you are reaching out as." },
    };
  }
  const result = partnerSchema.safeParse(raw);
  return result.success
    ? { success: true as const, data: result.data }
    : { success: false as const, issues: result.error.issues };
}
