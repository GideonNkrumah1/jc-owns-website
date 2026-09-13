import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { faqs } from "@/db/schema";
import { AdminPageHeader, AdminCard } from "@/components/admin/AdminUI";
import { FaqForm } from "@/components/admin/FaqForm";
import { updateFaq } from "../actions";

export default async function EditFaqPage({ params }: { params: { id: string } }) {
  const faq = await db.query.faqs.findFirst({ where: eq(faqs.id, params.id) });
  if (!faq) notFound();

  return (
    <div>
      <AdminPageHeader title="Edit FAQ" />
      <AdminCard>
        <FaqForm faq={faq} action={updateFaq.bind(null, faq.id)} />
      </AdminCard>
    </div>
  );
}
