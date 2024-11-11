import type { User } from "@prisma/client";
import Link from "next/link";
import Button from "@/app/components/buttons/Button";
import H3 from "@/app/components/typography/H3";
import ProductListGrid from "@/app/components/ProductListGrid";
import UserInfo from "@/app/components/UserInfo";
import UserEdit from "@/app/components/UserEdit";
import { ProductWithRelations } from "@/lib/types";

type DashboardProps = {
  user: User;
  products: ProductWithRelations[];
};

export default function Dashboard({ user, products }: DashboardProps) {
  return (
    <section className="flex flex-col w-full py-12 px-28 rounded-xl gap-8">
      <section className="w-full flex justify-between">
        <Link href="dashboard/createproduct">
          <Button type="button">Create product</Button>
        </Link>
        <UserInfo user={user} />
        <UserEdit user={user} />
      </section>
      <section className="flex flex-col w-full gap-8">
        <H3>My artwork:</H3>
        <ProductListGrid products={products} user={user} />
      </section>
    </section>
  );
}
