import Button from "@/app/components/Button";
import prisma from "@/lib/db";
import Link from "next/link";

export default async function TestComponent() {
  const products = await prisma.product.findMany();
  return (
    <section>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <h1 className="text-4xl font-sans">{product.title}</h1>
            <p>{product.description}</p>
          </div>
        );
      })}

      <Button>Add to cart</Button>
    </section>
  );
}
