"use client";

import { AnimatePresence, m } from "motion/react";
import { useState, useSyncExternalStore } from "react";
import {
  formCopy,
  partnerTypes,
  schoolRoleOptions,
  serviceHelpOptions,
  sponsorInterestOptions,
  sponsorKindOptions,
} from "@content/forms";
import { submitPartner } from "@/app/actions";
import { fieldErrorsFrom } from "@/lib/form-data";
import { isPartnerType, parsePartner, type PartnerType } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { ChoiceGroup, FormAlert, Honeypot, SubmitButton, TextArea, TextField } from "./fields";
import { FormSuccess } from "./form-success";
import { useValidatedForm } from "./use-validated-form";

const copy = formCopy.partner;

function validate(raw: Record<string, string>) {
  const result = parsePartner(raw);
  if (result.success) return null;
  return result.fieldErrors ?? fieldErrorsFrom(result.issues);
}

/** Reads ?type=sponsor (etc.) so links can preselect a partner type. */
function useTypeFromUrl() {
  return useSyncExternalStore(
    () => () => {},
    () => new URLSearchParams(window.location.search).get("type"),
    () => null,
  );
}

function PartnerFormInner({ onReset }: { onReset: () => void }) {
  const { state, formAction, pending, errors, onSubmit, clearError, showSummary, summary } = useValidatedForm(submitPartner, validate);
  const fromUrl = useTypeFromUrl();
  const [picked, setPicked] = useState<PartnerType | null>(null);
  const type = picked ?? (isPartnerType(fromUrl) ? fromUrl : null);

  if (state.status === "success") {
    return <FormSuccess title={copy.successTitle} body={state.message} again={copy.again} onAgain={onReset} />;
  }

  return (
    <form action={formAction} onSubmit={onSubmit} onInput={clearError} noValidate className="relative space-y-8">
      {showSummary && <FormAlert>{summary ?? formCopy.errorSummary}</FormAlert>}
      <Honeypot />

      <fieldset aria-describedby={errors.partnerType ? "f-partnerType-error" : undefined}>
        <legend className="mb-3 text-[0.95rem] font-bold text-ink">{copy.typeLegend}</legend>
        <div className="grid gap-3 md:grid-cols-3">
          {partnerTypes.map((t) => (
            <label key={t.value} className="relative block cursor-pointer">
              <input
                type="radio"
                name="partnerType"
                value={t.value}
                checked={type === t.value}
                onChange={() => setPicked(t.value)}
                className="peer sr-only"
              />
              <span
                className={cn(
                  "flex h-full flex-col border-[3px] bg-white p-5 shadow-comic transition-colors duration-150",
                  "peer-checked:bg-navy-800 peer-checked:text-white",
                  "peer-focus-visible:outline peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ink",
                  errors.partnerType ? "border-signal-ink" : "border-ink hover:bg-tape/50",
                )}
              >
                <span className="flex items-start justify-between gap-3 font-display text-[1.5rem] leading-[1.05] tracking-[0.03em]">
                  {t.label}
                  <span
                    aria-hidden
                    className={cn(
                      "mt-0.5 grid size-5 shrink-0 place-items-center border-[3px] transition-colors",
                      type === t.value ? "border-ink bg-spark" : "border-ink bg-white",
                    )}
                  >
                    {type === t.value && <span className="size-1.5 bg-ink" />}
                  </span>
                </span>
                <span className={cn("mt-2 text-sm leading-snug", type === t.value ? "text-navy-100" : "text-navy-500")}>
                  {t.description}
                </span>
              </span>
            </label>
          ))}
        </div>
        {errors.partnerType && (
          <p id="f-partnerType-error" className="mt-2 text-sm font-medium text-signal-ink">
            {errors.partnerType}
          </p>
        )}
      </fieldset>

      <AnimatePresence mode="wait" initial={false}>
        {type && (
          <m.div
            key={type}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {type === "service" && (
              <>
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextField name="organization" label={copy.organization.label} placeholder={copy.organization.placeholder} autoComplete="organization" required error={errors.organization} />
                  <TextField name="focus" label={copy.focus.label} placeholder={copy.focus.placeholder} required error={errors.focus} />
                </div>
                <ChoiceGroup name="help" label={copy.help.label} options={serviceHelpOptions} required error={errors.help} />
                <div className="grid gap-6 sm:grid-cols-2">
                  <TextField name="location" label={copy.location.label} placeholder={copy.location.placeholder} error={errors.location} />
                  <TextField name="link" label={copy.link.label} placeholder={copy.link.placeholder} error={errors.link} />
                </div>
              </>
            )}

            {type === "sponsor" && (
              <>
                <ChoiceGroup name="sponsorKind" label={copy.sponsorKind.label} options={sponsorKindOptions} required error={errors.sponsorKind} />
                <TextField name="sponsorOrg" label={copy.sponsorOrg.label} placeholder={copy.sponsorOrg.placeholder} autoComplete="organization" error={errors.sponsorOrg} />
                <ChoiceGroup name="sponsorInterest" label={copy.sponsorInterest.label} options={sponsorInterestOptions} required error={errors.sponsorInterest} />
              </>
            )}

            {type === "school" && (
              <>
                <TextField name="institution" label={copy.institution.label} placeholder={copy.institution.placeholder} autoComplete="organization" required error={errors.institution} />
                <ChoiceGroup name="role" label={copy.role.label} options={schoolRoleOptions} required error={errors.role} />
                <TextField name="groupSize" label={copy.groupSize.label} placeholder={copy.groupSize.placeholder} inputMode="numeric" error={errors.groupSize} />
              </>
            )}

            <div className="h-[3px] bg-ink/15" />

            <div className="grid gap-6 sm:grid-cols-2">
              <TextField name="name" label={copy.name.label} placeholder={copy.name.placeholder} autoComplete="name" required error={errors.name} />
              <TextField name="email" type="email" label={copy.email.label} placeholder={copy.email.placeholder} autoComplete="email" inputMode="email" required error={errors.email} />
            </div>
            <TextField name="phone" type="tel" label={copy.phone.label} placeholder={copy.phone.placeholder} hint={copy.phone.hint} autoComplete="tel" error={errors.phone} />
            <TextArea name="message" label={copy.message[type].label} placeholder={copy.message[type].placeholder} required error={errors.message} />

            <SubmitButton pending={pending} label={copy.submit} pendingLabel={formCopy.sending} />
          </m.div>
        )}
      </AnimatePresence>
    </form>
  );
}

export function PartnerForm() {
  const [key, setKey] = useState(0);
  return <PartnerFormInner key={key} onReset={() => setKey((k) => k + 1)} />;
}
