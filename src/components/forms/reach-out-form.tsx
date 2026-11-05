"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { formCopy, reachOutOptions } from "@content/forms";
import { submitReachOut } from "@/app/actions";
import { fieldErrorsFrom } from "@/lib/form-data";
import { isReachOutAs, reachOutSchema, type ReachOutAs } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { FormAlert, Honeypot, SubmitButton, TextArea, TextField } from "./fields";
import { FormSuccess } from "./form-success";
import { useValidatedForm } from "./use-validated-form";

function validate(raw: Record<string, string>) {
  const result = reachOutSchema.safeParse(raw);
  return result.success ? null : fieldErrorsFrom(result.error.issues);
}

function FormBody({ fromUrl, onReset }: { fromUrl: ReachOutAs | null; onReset: () => void }) {
  const { state, formAction, pending, errors, onSubmit, clearError, showSummary, summary } = useValidatedForm(submitReachOut, validate);
  const [picked, setPicked] = useState<ReachOutAs | null>(null);
  const [lastUrl, setLastUrl] = useState(fromUrl);

  // A new link (such as ?as=student) overrides an earlier choice.
  if (lastUrl !== fromUrl) {
    setLastUrl(fromUrl);
    setPicked(null);
  }
  const as = picked ?? fromUrl;

  if (state.status === "success") {
    return <FormSuccess title={formCopy.successTitle} body={state.message} again={formCopy.again} onAgain={onReset} />;
  }

  return (
    <form action={formAction} onSubmit={onSubmit} onInput={clearError} noValidate className="relative space-y-6">
      {showSummary && <FormAlert>{summary ?? formCopy.errorSummary}</FormAlert>}
      <Honeypot />

      <fieldset aria-describedby={errors.as ? "f-as-error" : undefined}>
        <legend className="mb-3 text-[0.95rem] font-bold text-ink">{formCopy.legend}</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {reachOutOptions.map((option) => (
            <label key={option.value} className="relative block cursor-pointer">
              <input
                type="radio"
                name="as"
                value={option.value}
                checked={as === option.value}
                onChange={() => setPicked(option.value)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex h-full flex-col border-[3px] bg-white p-5 shadow-comic transition-colors duration-150",
                  "peer-checked:bg-navy-800 peer-checked:text-white",
                  "peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink",
                  errors.as ? "border-signal-ink" : "border-ink hover:bg-tape/50",
                )}
              >
                <span className="flex items-start justify-between gap-3 font-display text-[1.7rem] leading-[1.05] tracking-[0.03em]">
                  {option.label}
                  <span
                    aria-hidden
                    className={cn("mt-0.5 grid size-5 shrink-0 place-items-center border-[3px] border-ink transition-colors", as === option.value ? "bg-spark" : "bg-white")}
                  >
                    {as === option.value && <span className="size-1.5 bg-ink" />}
                  </span>
                </span>
                <span className={cn("mt-2 text-sm leading-snug", as === option.value ? "text-navy-100" : "text-navy-500")}>{option.description}</span>
              </span>
            </label>
          ))}
        </div>
        {errors.as && (
          <p id="f-as-error" className="mt-2 text-sm font-medium text-signal-ink">
            {errors.as}
          </p>
        )}
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="name" label={formCopy.name.label} placeholder={formCopy.name.placeholder} autoComplete="name" required error={errors.name} />
        <TextField name="email" type="email" label={formCopy.email.label} placeholder={formCopy.email.placeholder} autoComplete="email" inputMode="email" required error={errors.email} />
      </div>
      {as === "partner" && (
        <TextField name="organization" label={formCopy.organization.label} placeholder={formCopy.organization.placeholder} autoComplete="organization" error={errors.organization} />
      )}
      <TextArea name="message" label={formCopy.message.label} placeholder={formCopy.message.placeholder[as ?? "none"]} required error={errors.message} />
      <SubmitButton pending={pending} label={formCopy.submit} pendingLabel={formCopy.sending} />
    </form>
  );
}

/** Links can preselect a choice with ?as=partner or ?as=student. */
function WithUrlChoice({ onReset }: { onReset: () => void }) {
  const value = useSearchParams().get("as");
  return <FormBody fromUrl={isReachOutAs(value) ? value : null} onReset={onReset} />;
}

export function ReachOutForm() {
  const [key, setKey] = useState(0);
  const reset = () => setKey((k) => k + 1);
  return (
    <Suspense key={key} fallback={<FormBody fromUrl={null} onReset={reset} />}>
      <WithUrlChoice onReset={reset} />
    </Suspense>
  );
}
