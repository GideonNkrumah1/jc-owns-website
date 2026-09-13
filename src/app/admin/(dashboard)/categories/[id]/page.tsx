import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { AdminPageHeader, AdminCard } from "@/components/admin/AdminUI";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { updateCategory } from "../actions";

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const category = await db.query.categories.findFirst({
    where: eq(categories.id, params.id),
  });
  if (!category) notFound();

  const action = updateCategory.bind(null, category.id);

  return (
    <div>
      <AdminPageHeader title={`Edit: ${category.name}`} />
      <AdminCard>
        <CategoryForm category={category} action={action} />
      </AdminCard>
    </div>
  );
}
