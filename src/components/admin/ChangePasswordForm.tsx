"use client";

import { useFormState } from "react-dom";
import { Field, inputClass, SaveButton } from "@/components/admin/AdminUI";
import { changePassword } from "@/app/admin/(dashboard)/settings/actions";

type State = { error?: string; success?: boolean } | undefined;

export function ChangePasswordForm() {
  const [state, formAction] = useFormState(changePassword as (s: State, f: FormData) => Promise<State>, undefined);

  return (
    <form action={formAction} className="max-w-md space-y-4">
      <Field label="Current password" htmlFor="currentPassword">
        <input id="currentPassword" name="currentPassword" type="password" required autoComplete="current-password" className={inputClass} />
      </Field>
      <Field label="New password" htmlFor="newPassword" hint="At least 8 characters.">
        <input id="newPassword" name="newPassword" type="password" required autoComplete="new-password" className={inputClass} />
      </Field>
      <Field label="Confirm new password" htmlFor="confirmPassword">
        <input id="confirmPassword" name="confirmPassword" type="password" required autoComplete="new-password" className={inputClass} />
      </Field>

      {state?.error && (
        <p className="rounded-sm bg-burgundy-50 px-4 py-3 text-sm text-burgundy-600">{state.error}</p>
      )}
      {state?.success && (
        <p className="rounded-sm bg-forest-50 px-4 py-3 text-sm text-forest-700">Password updated.</p>
      )}

      <SaveButton>Update Password</SaveButton>
    </form>
  );
}
