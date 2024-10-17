import Button from "@/app/components/Button";
import prisma from "@/lib/db";

export default async function TestComponent() {
  const products = await prisma.product.findMany();
  return (
    <section>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <p>{product.title}</p>
              <p>{product.description}</p>
            </li>
          );
        })}
      </ul>
      <Button>Add to cart</Button>
    </section>
  );
}
