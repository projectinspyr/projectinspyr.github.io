"use server";

import { headers } from "next/headers";
import { formCopy, reachOutOptions } from "@content/forms";
import { site } from "@content/site";
import { sendToTeam } from "@/lib/email";
import { fieldErrorsFrom, formToObject, HONEYPOT, type FormState } from "@/lib/form-data";
import { rateLimit } from "@/lib/rate-limit";
import { reachOutSchema } from "@/lib/schemas";

async function clientKey(scope: string) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return `${scope}:${ip}`;
}

export async function submitReachOut(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = formToObject(formData);
  if (raw[HONEYPOT]) return { status: "success", message: site.responseTime };

  if (!rateLimit(await clientKey("reach-out"))) {
    return { status: "error", message: formCopy.rateLimited };
  }

  const parsed = reachOutSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: formCopy.errorSummary,
      fieldErrors: fieldErrorsFrom(parsed.error.issues),
    };
  }

  const { as, name, email, organization, message } = parsed.data;
  const asLabel = reachOutOptions.find((o) => o.value === as)?.label ?? as;
  const who = organization || name;

  const result = await sendToTeam({
    subject: `[${as === "partner" ? "Partner" : "Student"}] ${who}`,
    replyTo: email,
    rows: [
      ["Reaching out", asLabel],
      ["Name", name],
      ["Email", email],
      ["Organization", organization],
      ["Message", message],
    ],
  });

  if (result.ok) return { status: "success", message: site.responseTime };
  return {
    status: "error",
    message: result.reason === "config" ? formCopy.notConfigured : formCopy.generic,
  };
}
