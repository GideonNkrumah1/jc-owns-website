"use client";

import { useFormState } from "react-dom";
import { Field, inputClass, SaveButton } from "@/components/admin/AdminUI";
import { updateSettings } from "@/app/admin/(dashboard)/settings/actions";
import type { SiteSetting } from "@/db/schema";

type State = { error?: string; success?: boolean } | undefined;

export function SettingsForm({ settings }: { settings: SiteSetting | null }) {
  const [state, formAction] = useFormState(updateSettings as (s: State, f: FormData) => Promise<State>, undefined);

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="WhatsApp number"
          htmlFor="whatsappNumber"
          hint="Digits only, e.g. 233559038376 or 0501660135"
        >
          <input
            id="whatsappNumber"
            name="whatsappNumber"
            required
            defaultValue={settings?.whatsappNumber ?? ""}
            className={inputClass}
          />
        </Field>
        <Field label="Displayed phone number" htmlFor="phoneNumber">
          <input
            id="phoneNumber"
            name="phoneNumber"
            required
            defaultValue={settings?.phoneNumber ?? ""}
            className={inputClass}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Locations" htmlFor="locations">
          <input id="locations" name="locations" required defaultValue={settings?.locations ?? ""} className={inputClass} />
        </Field>
        <Field label="Delivery note" htmlFor="deliveryNote">
          <input id="deliveryNote" name="deliveryNote" required defaultValue={settings?.deliveryNote ?? ""} className={inputClass} />
        </Field>
      </div>

      <Field label="Contact email" htmlFor="contactEmail" optional>
        <input id="contactEmail" name="contactEmail" type="email" defaultValue={settings?.contactEmail ?? ""} className={inputClass} />
      </Field>

      <fieldset className="rounded-sm border border-charcoal/10 p-4">
        <legend className="px-1 text-xs font-semibold uppercase tracking-widest text-charcoal/65">
          Homepage content
        </legend>
        <div className="space-y-4">
          <Field label="Hero headline" htmlFor="heroHeadline" optional>
            <input id="heroHeadline" name="heroHeadline" defaultValue={settings?.heroHeadline ?? ""} className={inputClass} />
          </Field>
          <Field label="Hero subheadline" htmlFor="heroSubheadline" optional>
            <textarea id="heroSubheadline" name="heroSubheadline" rows={2} defaultValue={settings?.heroSubheadline ?? ""} className={inputClass} />
          </Field>
          <Field label="Brand intro" htmlFor="brandIntro" optional hint="Shown just below the hero.">
            <textarea id="brandIntro" name="brandIntro" rows={3} defaultValue={settings?.brandIntro ?? ""} className={inputClass} />
          </Field>
          <Field label="Brand story" htmlFor="brandStory" optional hint="Shown in the Our Story section and used as a fallback on the About page.">
            <textarea id="brandStory" name="brandStory" rows={5} defaultValue={settings?.brandStory ?? ""} className={inputClass} />
          </Field>
          <Field label="About page content" htmlFor="aboutContent" optional>
            <textarea id="aboutContent" name="aboutContent" rows={5} defaultValue={settings?.aboutContent ?? ""} className={inputClass} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="rounded-sm border border-charcoal/10 p-4">
        <legend className="px-1 text-xs font-semibold uppercase tracking-widest text-charcoal/65">
          Social links (optional — leave blank if you don&apos;t have an account yet)
        </legend>
        <div className="space-y-4">
          <Field label="Facebook URL" htmlFor="facebookUrl" optional>
            <input id="facebookUrl" name="facebookUrl" defaultValue={settings?.facebookUrl ?? ""} className={inputClass} />
          </Field>
          <Field label="Instagram URL" htmlFor="instagramUrl" optional>
            <input id="instagramUrl" name="instagramUrl" defaultValue={settings?.instagramUrl ?? ""} className={inputClass} />
          </Field>
          <Field label="TikTok URL" htmlFor="tiktokUrl" optional>
            <input id="tiktokUrl" name="tiktokUrl" defaultValue={settings?.tiktokUrl ?? ""} className={inputClass} />
          </Field>
        </div>
      </fieldset>

      {state?.error && (
        <p className="rounded-sm bg-burgundy-50 px-4 py-3 text-sm text-burgundy-600">{state.error}</p>
      )}
      {state?.success && (
        <p className="rounded-sm bg-forest-50 px-4 py-3 text-sm text-forest-700">Settings saved.</p>
      )}

      <SaveButton>Save Settings</SaveButton>
    </form>
  );
}
