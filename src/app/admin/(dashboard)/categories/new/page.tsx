import { AdminPageHeader, AdminCard } from "@/components/admin/AdminUI";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { createCategory } from "../actions";

export default function NewCategoryPage() {
  return (
    <div>
      <AdminPageHeader title="Add Category" />
      <AdminCard>
        <CategoryForm action={createCategory} />
      </AdminCard>
    </div>
  );
}
