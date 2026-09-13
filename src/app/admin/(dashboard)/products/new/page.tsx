import { AdminPageHeader, AdminCard } from "@/components/admin/AdminUI";
import { ProductForm } from "@/components/admin/ProductForm";
import { getAllCategoriesAdmin } from "@/lib/data";
import { createProduct } from "../actions";

export default async function NewProductPage() {
  const categories = await getAllCategoriesAdmin();

  return (
    <div>
      <AdminPageHeader
        title="Add Product"
        description="You can add sizes/variants and extra photos after saving."
      />
      <AdminCard>
        <ProductForm categories={categories} action={createProduct} />
      </AdminCard>
    </div>
  );
}
