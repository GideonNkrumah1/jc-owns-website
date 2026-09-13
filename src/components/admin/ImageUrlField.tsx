"use client";

import { useState } from "react";
import { Field, inputClass } from "@/components/admin/AdminUI";

export function ImageUrlField({
  name,
  label,
  defaultValue = "",
  hint,
}: {
  name: string;
  label: string;
  defaultValue?: string;
  hint?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File) {
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Upload failed.");
        return;
      }
      setValue(json.url);
    } catch {
      setError("Upload failed. Check your connection and try again.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Field label={label} htmlFor={name} optional hint={hint}>
      <div className="space-y-2">
        <input
          id={name}
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={inputClass}
          placeholder="https://... (paste an image link)"
        />
        <div className="flex items-center gap-3">
          <label className="inline-flex cursor-pointer items-center rounded-sm border border-charcoal/25 px-3 py-1.5 text-xs font-medium text-charcoal hover:border-forest-700">
            {uploading ? "Uploading..." : "Upload from computer"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
            />
          </label>
          {value && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={value} alt="" className="h-10 w-10 rounded-sm object-cover" />
          )}
        </div>
        {error && <p className="text-xs text-burgundy-600">{error}</p>}
      </div>
    </Field>
  );
}
