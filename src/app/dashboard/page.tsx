import { getUser, getUserProducts } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import H3 from "@/app/components/typography/H3";
import Button from "@/app/components/buttons/Button";
import { Suspense } from "react";
import Link from "next/link";
import { ProductsSection } from "@/app/components/dashboard/ProductsSection";

// DashboardPage.tsx
export default async function DashboardPage() {
  unstable_noStore();

  const session = await auth();
  if (!session?.user) redirect("/");

  const user = await getUser(session.user.id);
  if (!user) redirect("/");

  return (
    <section className="flex flex-col gap-8 items-center border-black my-10 mx-10">
      <section className="w-full flex justify-between items-center gap-8">
        <Link href="dashboard/createproduct">
          <Button type="button">Create product</Button>
        </Link>
        <H3>Good day {user?.name}!</H3>
      </section>

      <Suspense
        fallback={
          <div className="grid grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-full">
                <div className="animate-pulse bg-gray-200 h-40 w-32 rounded mb-2" />
                <div className="animate-pulse bg-gray-200 h-4 w-24 rounded mb-2" />
                <div className="animate-pulse bg-gray-200 h-4 w-16 rounded" />
              </div>
            ))}
          </div>
        }
      >
        <ProductsSection userId={user.id} />
      </Suspense>
    </section>
  );
}
