import { formCopy } from "@content/forms";
import type { FormState } from "@/lib/form-data";

/** Where the form posts. On GitHub Pages this points at the Vercel deployment. */
const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "/api/reach-out";

export async function submitReachOut(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const res = await fetch(ENDPOINT, { method: "POST", body: formData });
    return (await res.json()) as FormState;
  } catch {
    return { status: "error", message: formCopy.generic };
  }
}
