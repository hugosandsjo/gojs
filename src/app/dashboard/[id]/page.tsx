import { auth } from "@/lib/auth";
import { getProduct, getUser, getCategory } from "@/lib/actions";
import { redirect, notFound } from "next/navigation";
import UpdateProductForm from "@/app/components/form/UpdateProductForm";

export default async function UpdateProductPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const user = await getUser(session?.user?.id);

  if (!user) {
    redirect("/login");
  }

  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const category = await getCategory(product.category_id);

  if (!category) {
    notFound();
  }
  return (
    <section className="flex flex-col gap-10 w-full max-w-4xl mx-auto px-6 py-16">
      <UpdateProductForm
        productId={params.id}
        userId={user.id}
        product={product}
        category={category}
      />
    </section>
  );
}
