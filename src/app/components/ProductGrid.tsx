import prisma from "@/lib/db";
import ProductCard from "@/app/components/ProductCard";

export default async function ProductGrid() {
  const products = await prisma.product.findMany();
  return (
    <section className="w-full flex flex-wrap gap-16 p-7">
      {products.map((product) => {
        return (
          <ProductCard
            id={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            quantity={product.quantity}
            height={product.height}
          />
        );
      })}
    </section>
  );
}
