import prisma from "@/lib/db";

export default async function TestComponent() {
  const products = await prisma.product.findMany();
  console.log(products);
  return (
    <section>
      <div>TestComponent hello</div>
      <ul>
        {products.map((product) => {
          return (
            <li key={product.id}>
              <p>{product.title}</p>
              <p>{product.content}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
