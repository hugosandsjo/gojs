"use client";
import { getProduct } from "@/lib/actions";
import { useEffect, useState } from "react";

export default function SingleArwork({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getProduct(params.id);
      setProduct(data);
    })();
  }, []);
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
