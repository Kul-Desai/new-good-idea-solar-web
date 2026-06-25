"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactInput } from "@/lib/validation";

type FieldErrors = Partial<Record<keyof ContactInput, string>>;

function getErrors(result: ReturnType<typeof contactSchema.safeParse>): FieldErrors {
  if (result.success) {
    return {};
  }

  const fieldErrors = result.error.flatten().fieldErrors;
  return {
    name: fieldErrors.name?.[0],
    email: fieldErrors.email?.[0],
    propertyLocation: fieldErrors.propertyLocation?.[0],
    acreage: fieldErrors.acreage?.[0],
    message: fieldErrors.message?.[0],
  };
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "fallback" | "error">("idle");

  function focusFirstError() {
    window.requestAnimationFrame(() => {
      const firstInvalid = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");

    const formData = new FormData(event.currentTarget);
    const input = Object.fromEntries(formData.entries());
    const parsed = contactSchema.safeParse(input);

    if (!parsed.success) {
      setErrors(getErrors(parsed));
      focusFirstError();
      return;
    }

    setErrors({});
    setStatus("submitting");

    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(parsed.data),
      headers: { "Content-Type": "application/json" },
    });
    const result = (await response.json()) as { ok: boolean; fallback?: boolean };

    if (response.ok && result.ok) {
      setStatus(result.fallback ? "fallback" : "success");
      event.currentTarget.reset();
      return;
    }

    setStatus("error");
  }

  return (
    <form className="grid gap-5" noValidate onSubmit={onSubmit} ref={formRef}>
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input autoComplete="off" id="company" name="company" tabIndex={-1} />
      </div>
      <Field error={errors.name} label="Name" name="name" required />
      <Field error={errors.email} label="Email" name="email" required type="email" />
      <Field error={errors.propertyLocation} label="Property Location" name="propertyLocation" required />
      <Field error={errors.acreage} label="Approximate Acreage" name="acreage" />
      <div>
        <label className="font-heading text-sm font-medium text-ink" htmlFor="message">
          Message
        </label>
        <textarea
          aria-describedby={errors.message ? "message-error" : undefined}
          aria-invalid={Boolean(errors.message)}
          className="mt-2 min-h-36 w-full rounded-md border border-charcoal/20 px-4 py-3 focus-visible:outline-focus"
          id="message"
          name="message"
          required
        />
        {errors.message ? (
          <p className="mt-2 text-sm text-red-700" id="message-error">
            {errors.message}
          </p>
        ) : null}
      </div>
      <Button disabled={status === "submitting"} type="submit">
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
      <StatusMessage status={status} />
    </form>
  );
}

function Field({
  error,
  label,
  name,
  required = false,
  type = "text",
}: {
  error?: string;
  label: string;
  name: keyof ContactInput;
  required?: boolean;
  type?: string;
}) {
  const errorId = `${name}-error`;

  return (
    <div>
      <label className="font-heading text-sm font-medium text-ink" htmlFor={name}>
        {label}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className="mt-2 w-full rounded-md border border-charcoal/20 px-4 py-3 focus-visible:outline-focus"
        id={name}
        name={name}
        required={required}
        type={type}
      />
      {error ? (
        <p className="mt-2 text-sm text-red-700" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function StatusMessage({ status }: { status: "idle" | "submitting" | "success" | "fallback" | "error" }) {
  if (status === "idle" || status === "submitting") {
    return null;
  }

  const message =
    status === "success"
      ? "Thanks. We will be in touch."
      : status === "fallback"
        ? "Thanks. Email delivery is not configured here, so please email info@goodideasolar.com directly too."
        : "Something went wrong. Please email info@goodideasolar.com directly.";

  return (
    <p className="rounded-md bg-mist p-4 text-charcoal" role="alert">
      {message}
    </p>
  );
}
