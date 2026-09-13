import { db } from "@/db";
import { AdminPageHeader, AdminCard } from "@/components/admin/AdminUI";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { ChangePasswordForm } from "@/components/admin/ChangePasswordForm";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const settings = await db.query.siteSettings.findFirst();

  return (
    <div className="space-y-10">
      <div>
        <AdminPageHeader
          title="Site Settings"
          description="Contact details and homepage content shown across the website."
        />
        <AdminCard>
          <SettingsForm settings={settings ?? null} />
        </AdminCard>
      </div>

      <div>
        <h2 className="mb-4 font-serif text-xl text-charcoal">Change Password</h2>
        <AdminCard>
          <ChangePasswordForm />
        </AdminCard>
      </div>
    </div>
  );
}
