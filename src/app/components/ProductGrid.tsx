import prisma from "@/lib/db";
import ProductCard from "@/app/components/ProductCard";
import { getImgixUrl } from "@/lib/utils";
import Link from "next/link";
import { truncateText } from "@/lib/utils";

export default async function ProductGrid() {
  const products = await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      images: true,
      user: {
        select: {
          name: true,
        },
      },
      category: true,
    },
  });

  const productsWithUrls = products.map((product) => {
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
      shortDescription: truncateText(product.description || "", 90),
    };
  });

  return (
    <section className="w-full flex flex-wrap gap-16 p-7">
      {productsWithUrls.map((product) => {
        return (
          <Link key={product.id} href={`shop/${product.id}`}>
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.shortDescription}
              price={product.price}
              category={product.category.title}
              quantity={product.quantity}
              imageUrls={product.imageUrls}
              user={product.user}
            />
          </Link>
        );
      })}
    </section>
  );
}
