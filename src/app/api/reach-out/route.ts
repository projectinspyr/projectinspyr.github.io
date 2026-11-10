import { formCopy, reachOutOptions } from "@content/forms";
import { site } from "@content/site";
import { sendToTeam } from "@/lib/email";
import { fieldErrorsFrom, formToObject, HONEYPOT, type FormState } from "@/lib/form-data";
import { rateLimit } from "@/lib/rate-limit";
import { reachOutSchema } from "@/lib/schemas";

/**
 * Contact form endpoint. The public site is a static build on GitHub Pages
 * (https://projectinspyr.github.io); this route stays on Vercel and is called
 * from there, so it answers cross-origin requests from that site only.
 */
const ALLOWED_ORIGINS = ["https://projectinspyr.github.io", "http://localhost:3000", "http://127.0.0.1:3000"];

function cors(request: Request) {
  const origin = request.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    Vary: "Origin",
  };
}

function reply(request: Request, state: FormState, status = 200) {
  return Response.json(state, { status, headers: cors(request) });
}

export function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: cors(request) });
}

export async function POST(request: Request) {
  const raw = formToObject(await request.formData());
  if (raw[HONEYPOT]) return reply(request, { status: "success", message: site.responseTime });

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
  if (!rateLimit(`reach-out:${ip}`)) {
    return reply(request, { status: "error", message: formCopy.rateLimited }, 429);
  }

  const parsed = reachOutSchema.safeParse(raw);
  if (!parsed.success) {
    return reply(request, {
      status: "error",
      message: formCopy.errorSummary,
      fieldErrors: fieldErrorsFrom(parsed.error.issues),
    });
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

  if (result.ok) return reply(request, { status: "success", message: site.responseTime });
  return reply(request, {
    status: "error",
    message: result.reason === "config" ? formCopy.notConfigured : formCopy.generic,
  });
}
