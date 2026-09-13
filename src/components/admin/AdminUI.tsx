"use client";

import Link from "next/link";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="font-serif text-2xl text-charcoal md:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 text-sm text-charcoal/65">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-sm border border-charcoal/10 bg-ivory-50 p-6 shadow-soft",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
  optional,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-charcoal">
        {label} {optional && <span className="font-normal text-charcoal/65">(optional)</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-charcoal/65">{hint}</p>}
      {error && <p className="mt-1 text-xs text-burgundy-600">{error}</p>}
    </div>
  );
}

export const inputClass =
  "w-full rounded-sm border border-charcoal/25 bg-white px-3.5 py-2.5 text-sm text-charcoal focus:border-forest-700";

export function SaveButton({ children = "Save" }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-sm bg-forest-700 px-5 py-2.5 text-sm font-medium text-ivory-50 hover:bg-forest-800 disabled:opacity-60"
    >
      {pending ? "Saving..." : children}
    </button>
  );
}

export function DangerButton({ children = "Delete" }: { children?: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-sm border border-burgundy-300 px-4 py-2 text-sm font-medium text-burgundy-600 hover:bg-burgundy-50 disabled:opacity-60"
    >
      {pending ? "Working..." : children}
    </button>
  );
}

export function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-sm bg-forest-700 px-5 py-2.5 text-sm font-medium text-ivory-50 hover:bg-forest-800"
    >
      {children}
    </Link>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-sm border border-dashed border-charcoal/20 px-6 py-14 text-center text-sm text-charcoal/65">
      {children}
    </div>
  );
}
