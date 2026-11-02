"use client";

import { useState } from "react";
import { contactTopics, formCopy } from "@content/forms";
import { submitContact } from "@/app/actions";
import { fieldErrorsFrom } from "@/lib/form-data";
import { contactSchema } from "@/lib/schemas";
import { FormAlert, Honeypot, SelectField, SubmitButton, TextArea, TextField } from "./fields";
import { FormSuccess } from "./form-success";
import { useValidatedForm } from "./use-validated-form";

const copy = formCopy.contact;

function validate(raw: Record<string, string>) {
  const result = contactSchema.safeParse(raw);
  return result.success ? null : fieldErrorsFrom(result.error.issues);
}

function ContactFormInner({ onReset }: { onReset: () => void }) {
  const { state, formAction, pending, errors, onSubmit, clearError, showSummary, summary } = useValidatedForm(submitContact, validate);

  if (state.status === "success") {
    return <FormSuccess title={copy.successTitle} body={state.message} again={copy.again} onAgain={onReset} />;
  }

  return (
    <form action={formAction} onSubmit={onSubmit} onInput={clearError} noValidate className="relative space-y-6">
      {showSummary && <FormAlert>{summary ?? formCopy.errorSummary}</FormAlert>}
      <Honeypot />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField name="name" label={copy.name.label} placeholder={copy.name.placeholder} autoComplete="name" required error={errors.name} />
        <TextField name="email" type="email" label={copy.email.label} placeholder={copy.email.placeholder} autoComplete="email" inputMode="email" required error={errors.email} />
      </div>
      <SelectField name="topic" label={copy.topic.label} placeholder={copy.topic.placeholder} options={contactTopics} required error={errors.topic} />
      <TextArea name="message" label={copy.message.label} placeholder={copy.message.placeholder} required error={errors.message} />
      <SubmitButton pending={pending} label={copy.submit} pendingLabel={formCopy.sending} />
    </form>
  );
}

export function ContactForm() {
  const [key, setKey] = useState(0);
  return <ContactFormInner key={key} onReset={() => setKey((k) => k + 1)} />;
}
