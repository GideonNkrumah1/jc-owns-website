"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="rounded-sm border border-burgundy-200 bg-burgundy-50 p-8 text-center">
      <h2 className="font-serif text-xl text-charcoal">Something went wrong</h2>
      <p className="mt-2 text-sm text-charcoal/70">
        Please try again. If this keeps happening, check your database
        connection or contact your developer.
      </p>
      <button
        onClick={() => reset()}
        className="mt-5 rounded-sm bg-forest-700 px-5 py-2.5 text-sm font-medium text-ivory-50 hover:bg-forest-800"
      >
        Try Again
      </button>
    </div>
  );
}
