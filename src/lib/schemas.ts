import { z } from "zod";
import { reachOutOptions } from "@content/forms";

type Options = ReadonlyArray<{ value: string }>;
const values = <T extends Options>(options: T) =>
  options.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]];

export const reachOutSchema = z.object({
  as: z.enum(values(reachOutOptions), { error: "Please choose who you are reaching out as." }),
  name: z
    .string({ error: "Please enter your name." })
    .min(2, "Please enter your full name.")
    .max(80, "Please keep this under 80 characters."),
  email: z
    .email({ error: "Please enter a valid email address." })
    .max(120, "Please use a shorter email address."),
  organization: z.string().max(120, "Please keep this under 120 characters.").optional(),
  message: z
    .string({ error: "Please add a few words." })
    .min(10, "Please write at least 10 characters.")
    .max(3000, "Please keep this under 3000 characters."),
});

export type ReachOutInput = z.infer<typeof reachOutSchema>;
export type ReachOutAs = ReachOutInput["as"];

export function isReachOutAs(value: unknown): value is ReachOutAs {
  return reachOutOptions.some((o) => o.value === value);
}
