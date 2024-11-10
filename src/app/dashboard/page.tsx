import Button from "@/app/components/buttons/Button";
import { getUser, getUserProducts } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import H2 from "@/app/components/typography/H2";
import H3 from "@/app/components/typography/H3";
import ProductListGrid from "@/app/components/ProductListGrid";
import UserInfo from "@/app/components/UserInfo";

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

  const products = (await getUserProducts(user.id)) || [];

  return (
    <>
      <section className="flex flex-col gap-8 items-center border-black my-10 mx-40">
        {" "}
        <H2>Dashboard</H2>
        <section className="flex flex-col w-full py-12 px-28 rounded-xl gap-8">
          <section className="w-full flex justify-between">
            <Link href="dashboard/createproduct">
              <Button type="submit">Create product</Button>
            </Link>
            <UserInfo user={user} />
          </section>
          <section className="flex flex-col w-full gap-8">
            <H3>My artwork:</H3>
            <ProductListGrid products={products} user={user} />
          </section>
        </section>
      </section>
    </>
  );
}
