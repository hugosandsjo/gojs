import prisma from "@/lib/db";
import ProductCard from "@/app/components/ProductCard";
import { getPreSignedUrl } from "@/lib/actions";

export default async function ProductGrid() {
  const products = await prisma.product.findMany();
  const productsWithUrls = await Promise.all(
    products.map(async (product) => {
      let imageUrl = null;
      if (product.image_key) {
        imageUrl = await getPreSignedUrl(product.image_key);
      }
      return { ...product, image_url: imageUrl };
    })
  );
  return (
    <section className="w-full flex flex-wrap gap-16 p-7">
      {productsWithUrls.map((product) => {
        return (
          <ProductCard
            key={product.id}
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
