"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { submitContactForm, type ContactFormState } from "@/app/contact/actions";
import { trackEvent } from "@/lib/analytics";

const initialState: ContactFormState = { status: "idle" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-forest-700 px-6 py-3.5 text-sm font-medium text-ivory-50 transition-colors hover:bg-forest-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
    >
      {pending ? (
        <>
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
            <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="3" />
          </svg>
          Sending...
        </>
      ) : (
        "Send Message"
      )}
    </button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);
  const [renderedAt] = useState(() => Date.now());
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      trackEvent("contact_form_submit");
      formRef.current?.reset();
    }
  }, [state.status]);

  const err = (field: string) => state.fieldErrors?.[field];

  return (
    <form ref={formRef} action={formAction} noValidate className="space-y-5">
      {/* Honeypot field — hidden from real visitors via CSS, not `type=hidden`,
          since some bots skip hidden inputs specifically. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="renderedAt" value={renderedAt} />

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-charcoal">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          aria-invalid={!!err("name")}
          aria-describedby={err("name") ? "name-error" : undefined}
          className="w-full rounded-sm border border-charcoal/25 bg-ivory-50 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/60 focus:border-forest-700"
          placeholder="Your name"
        />
        {err("name") && (
          <p id="name-error" className="mt-1.5 text-xs text-burgundy-600">
            {err("name")}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-charcoal">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            aria-invalid={!!err("phone")}
            aria-describedby={err("phone") ? "phone-error" : undefined}
            className="w-full rounded-sm border border-charcoal/25 bg-ivory-50 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/60 focus:border-forest-700"
            placeholder="050 000 0000"
          />
          {err("phone") && (
            <p id="phone-error" className="mt-1.5 text-xs text-burgundy-600">
              {err("phone")}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-charcoal">
            Email <span className="font-normal text-charcoal/65">(optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!err("email")}
            aria-describedby={err("email") ? "email-error" : undefined}
            className="w-full rounded-sm border border-charcoal/25 bg-ivory-50 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/60 focus:border-forest-700"
            placeholder="you@example.com"
          />
          {err("email") && (
            <p id="email-error" className="mt-1.5 text-xs text-burgundy-600">
              {err("email")}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-charcoal">
          Subject <span className="font-normal text-charcoal/65">(optional)</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          className="w-full rounded-sm border border-charcoal/25 bg-ivory-50 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/60 focus:border-forest-700"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-charcoal">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          aria-invalid={!!err("message")}
          aria-describedby={err("message") ? "message-error" : undefined}
          className="w-full rounded-sm border border-charcoal/25 bg-ivory-50 px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/60 focus:border-forest-700"
          placeholder="How can we help?"
        />
        {err("message") && (
          <p id="message-error" className="mt-1.5 text-xs text-burgundy-600">
            {err("message")}
          </p>
        )}
      </div>

      <SubmitButton />

      <div aria-live="polite">
        {state.status === "success" && (
          <p className="rounded-sm bg-forest-50 px-4 py-3 text-sm text-forest-700">
            {state.message}
          </p>
        )}
        {state.status === "error" && (
          <p className="rounded-sm bg-burgundy-50 px-4 py-3 text-sm text-burgundy-600">
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}
