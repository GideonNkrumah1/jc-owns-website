"use client";

import { useFormState } from "react-dom";
import { DangerButton } from "@/components/admin/AdminUI";

type Action = (
  prevState: { error?: string } | undefined,
  formData: FormData
) => Promise<{ error?: string } | undefined>;

export function ConfirmDeleteForm({
  action,
  confirmText = "Are you sure? This cannot be undone.",
  label = "Delete",
}: {
  action: Action;
  confirmText?: string;
  label?: string;
}) {
  const [state, formAction] = useFormState(action, undefined);

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <DangerButton>{label}</DangerButton>
      {state?.error && <p className="mt-2 text-xs text-burgundy-600">{state.error}</p>}
    </form>
  );
}
