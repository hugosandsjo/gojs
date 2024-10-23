"use client";
import { getProduct } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";

export default function SingleArwork({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    (async () => {
      const data = await getProduct(params.id);
      setProduct(data);
    })();
  }, [params.id]);
  return (
    <section>
      {product ? (
        <div>
          <h1>{product.title}</h1>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </section>
  );
}
