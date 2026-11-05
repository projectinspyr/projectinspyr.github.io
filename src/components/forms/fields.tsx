import type { ComponentProps, ReactNode } from "react";
import { formCopy } from "@content/forms";
import { HONEYPOT } from "@/lib/form-data";
import { cn } from "@/lib/utils";

const control =
  "w-full border-[3px] bg-white px-4 text-[1rem] font-medium text-ink shadow-comic-sm placeholder:text-navy-500/80 transition-[box-shadow,translate] duration-150 focus:-translate-x-px focus:-translate-y-px focus:shadow-comic-md focus:outline-none";

function controlClass(error?: string) {
  return cn(control, error ? "border-signal-ink" : "border-ink");
}

type BaseProps = {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
};

function Label({ htmlFor, label, required }: { htmlFor: string; label: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-baseline justify-between gap-3 text-[0.95rem] font-bold text-ink">
      <span>{label}</span>
      <span className="text-xs font-medium text-navy-500">{required ? formCopy.required : formCopy.optional}</span>
    </label>
  );
}

function Meta({ id, error, hint }: { id: string; error?: string; hint?: string }) {
  if (error) {
    return (
      <p id={`${id}-error`} className="mt-2 flex items-start gap-1.5 text-sm font-medium text-signal-ink">
        <svg viewBox="0 0 16 16" aria-hidden className="mt-0.5 size-4 shrink-0 fill-current">
          <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm.75 9.75h-1.5v-1.5h1.5Zm0-3h-1.5v-4h1.5Z" />
        </svg>
        {error}
      </p>
    );
  }
  if (hint) return <p id={`${id}-hint`} className="mt-2 text-sm text-navy-500">{hint}</p>;
  return null;
}

function describedBy(id: string, error?: string, hint?: string) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

export function TextField({
  name,
  label,
  error,
  hint,
  required,
  className,
  ...props
}: BaseProps & Omit<ComponentProps<"input">, "name">) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={required} />
      <input
        id={id}
        name={name}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClass(error), "h-12")}
        {...props}
      />
      <Meta id={id} error={error} hint={hint} />
    </div>
  );
}

export function TextArea({
  name,
  label,
  error,
  hint,
  required,
  className,
  ...props
}: BaseProps & Omit<ComponentProps<"textarea">, "name">) {
  const id = `f-${name}`;
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} required={required} />
      <textarea
        id={id}
        name={name}
        required={required}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, error, hint)}
        className={cn(controlClass(error), "min-h-36 resize-y py-3 leading-relaxed")}
        {...props}
      />
      <Meta id={id} error={error} hint={hint} />
    </div>
  );
}

/** Hidden from people and assistive tech; bots tend to fill it. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={`f-${HONEYPOT}`}>Leave this field empty</label>
      <input id={`f-${HONEYPOT}`} type="text" name={HONEYPOT} tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function FormAlert({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="flex items-start gap-3 border-[3px] border-ink bg-tape px-4 py-3 text-[0.95rem] font-semibold text-signal-ink shadow-comic-sm">
      <svg viewBox="0 0 16 16" aria-hidden className="mt-0.5 size-4 shrink-0 fill-current">
        <path d="M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13Zm.75 9.75h-1.5v-1.5h1.5Zm0-3h-1.5v-4h1.5Z" />
      </svg>
      <span>{children}</span>
    </div>
  );
}

export function SubmitButton({ pending, label, pendingLabel }: { pending: boolean; label: string; pendingLabel: string }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="group inline-flex h-14 w-full items-center justify-center gap-3 border-[3px] border-ink bg-signal-deep px-8 font-display text-[1.6rem] leading-none tracking-[0.05em] text-white shadow-comic transition-[translate,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-comic-md active:translate-x-1 active:translate-y-1 active:shadow-none disabled:cursor-wait disabled:opacity-80"
    >
      {pending && <span aria-hidden className="size-4 animate-spin border-[3px] border-white/40 border-t-white" />}
      {pending ? pendingLabel : label}
      {!pending && (
        <svg viewBox="0 0 24 24" aria-hidden className="size-5 transition-transform duration-300 group-hover:translate-x-1">
          <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}
