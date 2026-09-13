"use server";

import { headers } from "next/headers";
import { db } from "@/db";
import { enquiries } from "@/db/schema";
import { contactFormSchema } from "@/lib/validations";
import { isRateLimited } from "@/lib/rate-limit";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

const MIN_FILL_TIME_MS = 2000;

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    subject: formData.get("subject")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? "",
    company: formData.get("company")?.toString() ?? "",
    renderedAt: formData.get("renderedAt")?.toString() ?? "0",
  };

  const parsed = contactFormSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0]?.toString();
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const data = parsed.data;

  // Honeypot: a real visitor never fills this hidden field.
  if (data.company) {
    // Pretend success so bots don't learn anything, but do not save.
    return { status: "success" };
  }

  // Anti-bot timer: the form must have been visible for a couple of seconds.
  if (Date.now() - data.renderedAt < MIN_FILL_TIME_MS) {
    return {
      status: "error",
      message: "Please try submitting again.",
    };
  }

  const ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(`contact:${ip}`)) {
    return {
      status: "error",
      message:
        "You've sent a few messages recently. Please wait a little before sending another, or message us directly on WhatsApp.",
    };
  }

  try {
    await db.insert(enquiries).values({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      subject: data.subject || null,
      message: data.message,
      source: "contact_form",
    });

    // The client records the contact_form_submit conversion event (GA4 +
    // first-party analytics) once it sees this success state, so the event
    // is only counted for messages that actually saved successfully.
    return {
      status: "success",
      message: "Thank you — your message has been sent. We'll get back to you shortly.",
    };
  } catch (err) {
    console.error("Contact form submission failed", err);
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again, or reach us directly on WhatsApp.",
    };
  }
}
