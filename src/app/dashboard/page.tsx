import Button from "@/app/components/buttons/Button";
import { getUser, getUserProducts } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { unstable_noStore } from "next/cache";
import { redirect } from "next/navigation";
import Link from "next/link";
import ProductCard from "@/app/components/ProductCard";
import { getImgixUrl } from "@/lib/utils";
import H2 from "@/app/components/typography/H2";
import DeleteButton from "@/app/components/buttons/DeleteButton";

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

  return (
    <section className="flex flex-col gap-4 items-center p-10">
      <section>
        <H2>Dashboard</H2>
      </section>

      <section className="flex justify-between w-full">
        <div>
          <p>Hello {user?.name}</p>
          <p>Email: {user?.email}</p>
          <p>Role: {user?.role}</p>
        </div>
      </section>

      <section className="flex flex-col w-full gap-4">
        <div>
          <H2>My artworks:</H2>
        </div>
        <div className="flex flex-wrap gap-4">
          {productsWithUrls?.map((product) => {
            return (
              <div key={product.id}>
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  quantity={product.quantity}
                  height={product.height}
                  imageUrls={product.imageUrls}
                  user={product.user}
                />
                <Link href={`/dashboard/${product.id}`}>
                  <Button type="button"> Edit</Button>
                </Link>
                <DeleteButton id={product.id} />
              </div>
            );
          })}
        </div>
        <div>
          <Link href="dashboard/createproduct">
            <Button type="submit">
              <p className="font-sans text-sm">Create product</p>{" "}
            </Button>
          </Link>
        </div>
      </section>
    </section>
  );
}
