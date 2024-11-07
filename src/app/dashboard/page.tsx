import Button from "@/app/components/buttons/Button";
import { getUser, getUserProducts } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getImgixUrl } from "@/lib/utils";
import H2 from "@/app/components/typography/H2";
import ProductList from "@/app/components/ProductList";
import H3 from "@/app/components/typography/H3";

export default async function Dashboard() {
  unstable_noStore();

  const session = await auth();

  const user = await getUser(session?.user?.id);

  const products = await getUserProducts(user?.id);

  const productsWithUrls = products?.map((product) => {
    const imageUrls = product.images.map((image) =>
      getImgixUrl(image.image_key, {
        w: "400",
        h: "400",
        fit: "crop",
        auto: "format",
        q: "75",
      })
    );

    return {
      ...product,
      imageUrls,
      user: product.user?.name,
    };
  });

  if (!session) {
    redirect("/");
  }

  const publishedProducts = productsWithUrls?.filter(
    (product) => product.status === "PUBLISHED"
  );
  const draftProducts = productsWithUrls?.filter(
    (product) => product.status === "DRAFT"
  );
  const archivedProducts = productsWithUrls?.filter(
    (product) => product.status === "ARCHIVED"
  );

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
          <ProductList products={publishedProducts} status="PUBLISHED" />
          <ProductList products={draftProducts} status="DRAFT" />
          <ProductList products={archivedProducts} status="ARCHIVED" />
        </section>
      </section>
    </section>
  );
}
