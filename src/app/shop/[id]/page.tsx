"use client";
import { getProduct } from "@/lib/actions";
import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import ProductParagraph from "@/app/components/typography/ProductParagraph";
import Link from "next/link";
import Image from "next/image";
import { getImgixUrl } from "@/lib/utils";

export default function SingleProduct({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<
    (Product & { image_url: string | null }) | null
  >(null);

  useEffect(() => {
    (async () => {
      const data = await getProduct(params.id);
      let imgUrl: string | null = null; // Initialize as null

      if (data?.image_key) {
        imgUrl = getImgixUrl(data.image_key, {
          w: "400",
          h: "400",
          fit: "crop",
          auto: "format",
        });
      }

      setProduct(data ? { ...data, image_url: imgUrl } : null);
    })();
  }, [params.id]);

  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <section className="flex flex-col items-center gap-8 p-10">
      <h1 className="text-3xl font-bold">{product.title}</h1>

      {product.image_url ? (
        <Image
          src={product.image_url}
          alt={product.title}
          width={400}
          height={400}
          className="w-80 h-80 object-cover"
        />
      ) : (
        <div className="w-80 h-80 bg-gray-200 flex items-center justify-center">
          <span>No Image Available</span>
        </div>
      )}

      <div className="text-lg flex flex-col gap-4">
        <ProductParagraph>Price: ${product.price}</ProductParagraph>
        <ProductParagraph>
          Quantity: {product.quantity || "N/A"}
        </ProductParagraph>
        <ProductParagraph>
          Height: {product.height ? `${product.height} cm` : "N/A"}
        </ProductParagraph>
        <ProductParagraph>
          Description: {product.description || "No description available"}
        </ProductParagraph>
      </div>

      {/* Back Button */}
      <div>
        <Link href="/shop">
          <button className="bg-blue-500 text-white px-6 py-2 rounded">
            Back to Shop
          </button>
        </Link>
      </div>
    </section>
  );
}
