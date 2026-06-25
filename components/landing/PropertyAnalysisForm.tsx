"use client";

import { useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { propertyAnalysisSchema, type PropertyAnalysisInput } from "@/lib/validation";

type FieldErrors = Partial<Record<keyof PropertyAnalysisInput, string>>;

const steps = ["Your Info", "Your Land", "Notes"];

function getErrors(result: ReturnType<typeof propertyAnalysisSchema.safeParse>): FieldErrors {
  if (result.success) {
    return {};
  }

  const fieldErrors = result.error.flatten().fieldErrors;
  return {
    name: fieldErrors.name?.[0],
    email: fieldErrors.email?.[0],
    phone: fieldErrors.phone?.[0],
    propertyLocation: fieldErrors.propertyLocation?.[0],
    acreage: fieldErrors.acreage?.[0],
    landUse: fieldErrors.landUse?.[0],
    message: fieldErrors.message?.[0],
    consent: fieldErrors.consent?.[0],
  };
}

export function PropertyAnalysisForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "fallback" | "error">("idle");

  function focusFirstError() {
    window.requestAnimationFrame(() => {
      const firstInvalid = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
    });
  }

  function focusStep() {
    window.requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>("[data-step-heading]")?.focus();
    });
  }

  function validateCurrentStep(form: HTMLFormElement) {
    const data = new FormData(form);
    const requiredByStep: Array<Array<keyof PropertyAnalysisInput>> = [
      ["name", "email"],
      ["propertyLocation", "acreage", "landUse"],
      ["consent"],
    ];
    const currentErrors: FieldErrors = {};

    for (const key of requiredByStep[step]) {
      if (key === "consent") {
        if (data.get("consent") !== "on") {
          currentErrors.consent = "Please confirm Good Idea Solar may contact you about your property.";
        }
      } else if (!String(data.get(key) || "").trim()) {
        currentErrors[key] = "This field is required.";
      }
    }

    if (step === 0) {
      const email = String(data.get("email") || "");
      if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        currentErrors.email = "Enter a valid email address.";
      }
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  }

  function nextStep() {
    if (!formRef.current || !validateCurrentStep(formRef.current)) {
      focusFirstError();
      return;
    }
    setStep((value) => Math.min(value + 1, steps.length - 1));
    focusStep();
  }

  function previousStep() {
    setStep((value) => Math.max(value - 1, 0));
    focusStep();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("idle");

    const formData = new FormData(event.currentTarget);
    const input = Object.fromEntries(formData.entries());
    const parsed = propertyAnalysisSchema.safeParse(input);

    if (!parsed.success) {
      setErrors(getErrors(parsed));
      focusFirstError();
      return;
    }

    setErrors({});
    setStatus("submitting");

    const response = await fetch("/api/property-analysis", {
      method: "POST",
      body: JSON.stringify(parsed.data),
      headers: { "Content-Type": "application/json" },
    });
    const result = (await response.json()) as { ok: boolean; fallback?: boolean };

    if (response.ok && result.ok) {
      setStatus(result.fallback ? "fallback" : "success");
      event.currentTarget.reset();
      setStep(0);
      return;
    }

    setStatus("error");
  }

  return (
    <form className="rounded-lg border border-charcoal/10 bg-white p-6 shadow-soft sm:p-8" noValidate onSubmit={onSubmit} ref={formRef}>
      <div className="mb-8">
        <p className="font-heading text-sm font-semibold uppercase tracking-[0.12em] text-brand-blue">
          Step {step + 1} of {steps.length}
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-mist">
          <div className="h-full rounded-full bg-brand-green transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="lead-company">Company</label>
        <input autoComplete="off" id="lead-company" name="company" tabIndex={-1} />
      </div>

      <h3 className="font-heading text-2xl font-medium text-ink" data-step-heading tabIndex={-1}>
        {steps[step]}
      </h3>

      <div className="mt-6 grid gap-5">
        <div className={step === 0 ? "grid gap-5" : "hidden"}>
          <Field error={errors.name} label="Name" name="name" required />
          <Field error={errors.email} label="Email" name="email" required type="email" />
          <Field error={errors.phone} label="Phone (optional)" name="phone" type="tel" />
        </div>
        <div className={step === 1 ? "grid gap-5" : "hidden"}>
          <Field error={errors.propertyLocation} label="Property location or county/state" name="propertyLocation" required />
          <Field error={errors.acreage} label="Approximate acreage" name="acreage" required />
          <Field error={errors.landUse} label="Current land use" name="landUse" required />
        </div>
        <div className={step === 2 ? "grid gap-5" : "hidden"}>
          <div>
            <label className="font-heading text-sm font-medium text-ink" htmlFor="lead-message">
              Notes or questions
            </label>
            <textarea
              aria-describedby={errors.message ? "lead-message-error" : undefined}
              aria-invalid={Boolean(errors.message)}
              className="mt-2 min-h-32 w-full rounded-md border border-charcoal/20 px-4 py-3 focus-visible:outline-focus"
              id="lead-message"
              name="message"
            />
            {errors.message ? (
              <p className="mt-2 text-sm text-red-700" id="lead-message-error">
                {errors.message}
              </p>
            ) : null}
          </div>
          <div>
            <label className="flex gap-3 rounded-md border border-charcoal/15 p-4">
              <input
                aria-describedby={errors.consent ? "consent-error" : undefined}
                aria-invalid={Boolean(errors.consent)}
                className="mt-1 size-4 focus-visible:outline-focus"
                name="consent"
                type="checkbox"
              />
              <span className="leading-7 text-charcoal/80">
                I agree that Good Idea Solar may contact me about my property analysis request.
              </span>
            </label>
            {errors.consent ? (
              <p className="mt-2 text-sm text-red-700" id="consent-error">
                {errors.consent}
              </p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        {step > 0 ? (
          <Button onClick={previousStep} type="button" variant="secondary">
            Back
          </Button>
        ) : null}
        {step < steps.length - 1 ? (
          <Button onClick={nextStep} type="button">
            Continue
          </Button>
        ) : (
          <Button disabled={status === "submitting"} type="submit">
            {status === "submitting" ? "Sending..." : "Get a Free Property Analysis"}
          </Button>
        )}
      </div>
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
  name: keyof PropertyAnalysisInput;
  required?: boolean;
  type?: string;
}) {
  const errorId = `lead-${name}-error`;

  return (
    <div>
      <label className="font-heading text-sm font-medium text-ink" htmlFor={`lead-${name}`}>
        {label}
      </label>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className="mt-2 w-full rounded-md border border-charcoal/20 px-4 py-3 focus-visible:outline-focus"
        id={`lead-${name}`}
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
      ? "Thanks. We will review your property and be in touch."
      : status === "fallback"
        ? "Thanks. Email delivery is not configured here, so please email info@goodideasolar.com directly too."
        : "Something went wrong. Please email info@goodideasolar.com directly.";

  return (
    <p className="mt-5 rounded-md bg-mist p-4 text-charcoal" role="alert">
      {message}
    </p>
  );
}
