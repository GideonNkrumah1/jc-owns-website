"use client";

import { useFormState } from "react-dom";
import { Field, inputClass, SaveButton } from "@/components/admin/AdminUI";
import type { Faq } from "@/db/schema";

type ActionState = { error?: string } | undefined;
type Action = (prevState: ActionState, formData: FormData) => Promise<ActionState>;

export function FaqForm({ faq, action }: { faq?: Faq; action: Action }) {
  const [state, formAction] = useFormState(action, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <Field label="Question" htmlFor="question">
        <input id="question" name="question" required defaultValue={faq?.question} className={inputClass} />
      </Field>
      <Field label="Answer" htmlFor="answer">
        <textarea id="answer" name="answer" rows={4} required defaultValue={faq?.answer} className={inputClass} />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Group / category" htmlFor="category" optional hint="Optional label to group related questions.">
          <input id="category" name="category" defaultValue={faq?.category ?? ""} className={inputClass} />
        </Field>
        <Field label="Sort order" htmlFor="sortOrder" hint="Lower numbers appear first">
          <input id="sortOrder" name="sortOrder" type="number" defaultValue={faq?.sortOrder ?? 0} className={inputClass} />
        </Field>
      </div>
      <label className="flex items-center gap-2 text-sm text-charcoal">
        <input type="checkbox" name="isPublished" defaultChecked={faq?.isPublished ?? true} className="h-4 w-4 rounded border-charcoal/30" />
        Published on the website
      </label>

      {state?.error && (
        <p className="rounded-sm bg-burgundy-50 px-4 py-3 text-sm text-burgundy-600">{state.error}</p>
      )}

      <SaveButton>{faq ? "Save Changes" : "Add FAQ"}</SaveButton>
    </form>
  );
}
