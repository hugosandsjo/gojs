import { getUser, getUserProducts } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import Dashboard from "@/app/components/dashboard/Dashboard";

export default async function DashboardPage() {
  unstable_noStore();

  const session = await auth();

  if (!session) {
    redirect("/");
  }

  if (!session.user) {
    redirect("/");
  }

  const user = await getUser(session.user.id);

  if (!user) {
    redirect("/");
  }

  const products = (await getUserProducts(user.id)) || [];

  return (
    <section className="flex flex-col gap-8 items-center border-black my-10 mx-10">
      {" "}
      <Dashboard user={user} products={products} />
    </section>
  );
}
