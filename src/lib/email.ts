import { Resend } from "resend";
import { site } from "@content/site";
import { escapeHtml } from "./utils";

type Outgoing = {
  subject: string;
  replyTo: string;
  rows: Array<[label: string, value: string | undefined]>;
};

export type SendResult = { ok: true; mode: "sent" | "logged" } | { ok: false; reason: "config" | "provider" };

function render(rows: Outgoing["rows"]) {
  const filled = rows.filter((row): row is [string, string] => Boolean(row[1]));
  const text = filled.map(([label, value]) => `${label}:\n${value}`).join("\n\n");
  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#f6f1e7;font-family:Arial,Helvetica,sans-serif;color:#0a1a33">
<table role="presentation" width="100%" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e9e0cd">
<tr><td style="padding:20px 24px;background:#14305a;border-radius:12px 12px 0 0;color:#ffffff;font-weight:bold;letter-spacing:.08em">PROJECT INSPYR <span style="color:#f5c518">&#10022;</span></td></tr>
${filled
  .map(
    ([label, value]) =>
      `<tr><td style="padding:14px 24px;border-bottom:1px solid #f0ebe0"><div style="font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#5b6b85">${escapeHtml(label)}</div><div style="font-size:15px;line-height:1.5;white-space:pre-wrap;margin-top:4px">${escapeHtml(value)}</div></td></tr>`,
  )
  .join("")}
</table></body></html>`;
  return { text, html };
}

/**
 * Sends a form submission to the team inbox through Resend.
 * Without RESEND_API_KEY, or with FORMS_DRY_RUN=true, the message is written
 * to the server log instead (allowed outside production only, or when the
 * dry run is switched on explicitly).
 */
export async function sendToTeam(message: Outgoing): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const dryRun =
    process.env.FORMS_DRY_RUN === "true" || (!apiKey && process.env.NODE_ENV !== "production");
  const { text, html } = render(message.rows);

  if (dryRun) {
    console.info(`[forms] Dry run, email not sent.\nSubject: ${message.subject}\nReply-To: ${message.replyTo}\n\n${text}`);
    return { ok: true, mode: "logged" };
  }

  if (!apiKey) {
    console.error("[forms] RESEND_API_KEY is not set. Form submissions cannot be delivered.");
    return { ok: false, reason: "config" };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Project INSPYR <onboarding@resend.dev>",
    to: (process.env.CONTACT_TO_EMAIL || site.email).split(",").map((s) => s.trim()),
    replyTo: message.replyTo,
    subject: message.subject,
    text,
    html,
  });

  if (error) {
    console.error("[forms] Resend error:", error.name, error.message);
    return { ok: false, reason: "provider" };
  }
  return { ok: true, mode: "sent" };
}
