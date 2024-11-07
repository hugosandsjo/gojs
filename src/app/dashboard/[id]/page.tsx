import { auth } from "@/lib/auth";
import { getProduct, getUser, getCategory } from "@/lib/actions";
import { redirect, notFound } from "next/navigation";
import UpdateProductForm from "@/app/components/form/UpdateProductForm";
import { Suspense } from "react";

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
    <section className="flex flex-col px-36 py-16 justify-center gap-8 items-center">
      <Suspense fallback={<p>Loading form...</p>}>
        <UpdateProductForm
          productId={params.id}
          userId={user.id}
          product={product}
          category={category}
        />
      </Suspense>
    </section>
  );
}
