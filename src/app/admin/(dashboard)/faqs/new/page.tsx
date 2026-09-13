import { AdminPageHeader, AdminCard } from "@/components/admin/AdminUI";
import { FaqForm } from "@/components/admin/FaqForm";
import { createFaq } from "../actions";

export default function NewFaqPage() {
  return (
    <div>
      <AdminPageHeader title="Add FAQ" />
      <AdminCard>
        <FaqForm action={createFaq} />
      </AdminCard>
    </div>
  );
}
