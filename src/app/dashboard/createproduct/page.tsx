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
    // <section className="flex flex-col px-6 lg:px-36 py-16 justify-center mx-auto gap-12 items-center">
    <section className="flex flex-col gap-10 w-full max-w-4xl mx-auto px-6 py-16">
      <CreateProductForm userId={user.id} />
    </section>
  );
}
