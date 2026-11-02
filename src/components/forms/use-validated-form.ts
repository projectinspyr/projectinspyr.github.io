"use client";

import { startTransition, useActionState, useState, type FormEvent } from "react";
import { formToObject, initialFormState, type FormState } from "@/lib/form-data";

type Validate = (raw: Record<string, string>) => Record<string, string> | null;

/**
 * Runs zod validation in the browser before the server action, so people see
 * mistakes instantly. The server validates again either way.
 *
 * Submission is dispatched by hand (not through the form's native action) so
 * React does not clear what people typed when the server returns an error.
 * Without JavaScript the form still posts through the server action.
 */
export function useValidatedForm(action: (prev: FormState, data: FormData) => Promise<FormState>, validate: Validate) {
  const [state, formAction, pending] = useActionState(action, initialFormState);
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(0);

  const errors = Object.keys(clientErrors).length > 0 ? clientErrors : (state.fieldErrors ?? {});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(formToObject(data));
    setSubmitted((n) => n + 1);

    if (found) {
      setClientErrors(found);
      requestAnimationFrame(() => {
        form.querySelector<HTMLElement>("[aria-invalid='true'], fieldset[aria-describedby] input")?.focus();
      });
      return;
    }

    setClientErrors({});
    startTransition(() => formAction(data));
  }

  function clearError(e: FormEvent<HTMLFormElement>) {
    const name = (e.target as HTMLInputElement).name;
    if (name && clientErrors[name]) {
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  const hasErrors = Object.keys(errors).length > 0 || state.status === "error";
  const showSummary = submitted > 0 && !pending && hasErrors;
  const summary = Object.keys(clientErrors).length > 0 ? null : state.status === "error" ? state.message : null;

  return { state, formAction, pending, errors, onSubmit, clearError, showSummary, summary };
}
