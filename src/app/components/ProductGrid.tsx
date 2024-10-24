import prisma from "@/lib/db";
import ProductCard from "@/app/components/ProductCard";
import { getImgixUrl } from "@/lib/utils";

export default async function ProductGrid() {
  const products = await prisma.product.findMany();

  const productsWithUrls = products.map((product) => {
    let imageUrl = null;
    if (product.image_key) {
      imageUrl = getImgixUrl(product.image_key, {
        // Add transformation parameters as needed
        w: "400", // width
        h: "400", // height
        fit: "crop", // crop to fit dimensions
        auto: "format", // automatically choose the best image format
        q: "75", // quality
      });
    }
    return { ...product, image_url: imageUrl };
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
            image_url={product.image_url}
          />
        );
      })}
    </section>
  );
}
