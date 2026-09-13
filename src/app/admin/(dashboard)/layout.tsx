import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";
import { MobileAdminNav } from "@/components/admin/MobileAdminNav";
import { SessionProviderWrapper } from "@/components/admin/SessionProviderWrapper";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <SessionProviderWrapper>
      <div className="min-h-screen bg-ivory-100 font-sans text-charcoal md:grid md:grid-cols-[240px_1fr]">
        <aside className="hidden md:block">
          <AdminNav adminName={session.user?.name ?? session.user?.email} />
        </aside>

        <div className="flex flex-col">
          <MobileAdminNav />
          <main className="flex-1 p-6 md:p-10">{children}</main>
        </div>
      </div>
    </SessionProviderWrapper>
  );
}
