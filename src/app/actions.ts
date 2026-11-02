"use server";

import { headers } from "next/headers";
import {
  contactTopics,
  formCopy,
  partnerTypes,
  schoolRoleOptions,
  serviceHelpOptions,
  sponsorInterestOptions,
  sponsorKindOptions,
} from "@content/forms";
import { site } from "@content/site";
import { sendToTeam, type SendResult } from "@/lib/email";
import { fieldErrorsFrom, formToObject, HONEYPOT, type FormState } from "@/lib/form-data";
import { rateLimit } from "@/lib/rate-limit";
import { contactSchema, parsePartner } from "@/lib/schemas";

const labelOf = (options: ReadonlyArray<{ value: string; label: string }>, value?: string) =>
  options.find((o) => o.value === value)?.label ?? value;

async function clientKey(scope: string) {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  return `${scope}:${ip}`;
}

function afterSend(result: SendResult): FormState {
  if (result.ok) return { status: "success", message: site.responseTime };
  return {
    status: "error",
    message: result.reason === "config" ? formCopy.notConfigured : formCopy.generic,
  };
}

export async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = formToObject(formData);
  if (raw[HONEYPOT]) return { status: "success", message: site.responseTime };

  if (!rateLimit(await clientKey("contact"))) {
    return { status: "error", message: formCopy.rateLimited };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: formCopy.errorSummary,
      fieldErrors: fieldErrorsFrom(parsed.error.issues),
    };
  }

  const { name, email, topic, message } = parsed.data;
  const topicLabel = labelOf(contactTopics, topic);

  const result = await sendToTeam({
    subject: `[Contact] ${topicLabel}: ${name}`,
    replyTo: email,
    rows: [
      ["Name", name],
      ["Email", email],
      ["Topic", topicLabel],
      ["Message", message],
    ],
  });
  return afterSend(result);
}

export async function submitPartner(_prev: FormState, formData: FormData): Promise<FormState> {
  const raw = formToObject(formData);
  if (raw[HONEYPOT]) return { status: "success", message: site.responseTime };

  if (!rateLimit(await clientKey("partner"))) {
    return { status: "error", message: formCopy.rateLimited };
  }

  const parsed = parsePartner(raw);
  if (!parsed.success) {
    return {
      status: "error",
      message: formCopy.errorSummary,
      fieldErrors: parsed.fieldErrors ?? fieldErrorsFrom(parsed.issues),
    };
  }

  const data = parsed.data;
  const typeLabel = labelOf(partnerTypes, data.partnerType) ?? data.partnerType;
  const rows: Array<[string, string | undefined]> = [
    ["Partner type", typeLabel],
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone],
  ];

  let who = data.name;
  if (data.partnerType === "service") {
    who = data.organization;
    rows.push(
      ["Organization", data.organization],
      ["Works on", data.focus],
      ["Looking for", labelOf(serviceHelpOptions, data.help)],
      ["Based in", data.location],
      ["Website or Instagram", data.link],
    );
  } else if (data.partnerType === "sponsor") {
    who = data.sponsorOrg || data.name;
    rows.push(
      ["Sponsor is", labelOf(sponsorKindOptions, data.sponsorKind)],
      ["Company or organization", data.sponsorOrg],
      ["Wants to support", labelOf(sponsorInterestOptions, data.sponsorInterest)],
    );
  } else {
    who = data.institution;
    rows.push(
      ["Institution", data.institution],
      ["Role", labelOf(schoolRoleOptions, data.role)],
      ["Group size", data.groupSize],
    );
  }
  rows.push(["Message", data.message]);

  const result = await sendToTeam({
    subject: `[Partner] ${typeLabel}: ${who}`,
    replyTo: data.email,
    rows,
  });
  return afterSend(result);
}
