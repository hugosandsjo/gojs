import { auth } from "@/lib/auth";
import { getProduct, getUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import UpdateProductForm from "@/app/components/UpdateProductForm";

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
  console.log("The product:", product);

  return (
    <section className="flex flex-col px-36 py-16 justify-center gap-8 items-center">
      <UpdateProductForm productId={params.id} userId={user.id} />
    </section>
  );
}
