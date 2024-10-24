import prisma from "@/lib/db";
import ProductCard from "@/app/components/ProductCard";
import { getImgixUrl } from "@/lib/utils";

export default async function ProductGrid() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
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

    return { ...product, imageUrls };
  });

  return (
    <section className="w-full flex flex-wrap gap-16 p-7">
      {productsWithUrls.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            quantity={product.quantity}
            height={product.height}
            imageUrls={product.imageUrls}
          />
        );
      })}
    </section>
  );
}
