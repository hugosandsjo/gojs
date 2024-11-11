import CreateProductForm from "@/app/components/form/CreateProductForm";
import { auth } from "@/lib/auth";
import { getUser } from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function CreateProductPage() {
  const session = await auth();

  const user = await getUser(session?.user?.id);

  if (!user) {
    redirect("/login");
  }

  return (
    <section className="flex flex-col px-36 py-16 justify-center gap-12 items-center">
      <CreateProductForm userId={user.id} />
    </section>
  );
}
