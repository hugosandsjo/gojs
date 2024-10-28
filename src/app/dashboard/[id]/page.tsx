import { auth } from "@/lib/auth";
import { getProduct, getUser } from "@/lib/actions";
import { redirect } from "next/navigation";
import UpdateProductForm from "@/app/components/UpdateProductForm";
import H2 from "@/app/components/typography/H2";

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
      <H2>Update product</H2>
      <UpdateProductForm productId={params.id} userId={user.id} />
    </section>
  );
}
