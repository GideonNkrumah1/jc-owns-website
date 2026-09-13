"use client";

export function ConfirmDeleteFormSimple({
  action,
  confirmText = "Are you sure? This cannot be undone.",
  label = "Delete",
}: {
  action: () => Promise<void>;
  confirmText?: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
    >
      <button type="submit" className="text-xs font-medium text-burgundy-600 hover:underline">
        {label}
      </button>
    </form>
  );
}
