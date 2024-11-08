import Button from "@/app/components/buttons/Button";
import { getUser, getUserProducts } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import H2 from "@/app/components/typography/H2";
import H3 from "@/app/components/typography/H3";
import ProductListGrid from "@/app/components/ProductListGrid";

export default async function Dashboard() {
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

  const dbProducts = (await getUserProducts(user.id)) || [];

  return (
    <section className="flex flex-col gap-4 items-center py-12 px-28 border rounded-lg border-black my-10 mx-40">
      <article>
        {" "}
        <H2>Dashboard</H2>
      </article>
      <section className="w-full flex justify-between">
        <article>
          <Link href="dashboard/createproduct">
            <Button type="submit">Create product</Button>
          </Link>
        </article>

        <article className="flex">
          <div className="text-right">
            <p>{user?.name}</p>
            <p>{user?.email}</p>
            <p>{user?.role}</p>
          </div>
        </article>
      </section>
      <section className="flex flex-col w-full gap-4">
        <div>
          <H3>My artwork:</H3>
        </div>
        <section className="flex flex-col gap-8 w-full">
          <ProductListGrid products={dbProducts} user={user} />
        </section>
      </section>
    </section>
  );
}
