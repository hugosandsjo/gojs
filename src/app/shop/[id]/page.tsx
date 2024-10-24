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
    (Product & { imageUrls: string[] }) | null
  >(null);

  useEffect(() => {
    (async () => {
      const data = await getProduct(params.id);

      if (data) {
        const imageUrls = data.images.map((image) =>
          getImgixUrl(image.image_key, {
            w: "400",
            h: "400",
            fit: "crop",
            auto: "format",
            q: "75",
          })
        );

        setProduct({ ...data, imageUrls });
      }
    })();
  }, [params.id]);

  if (!product) {
    return <p>Loading...</p>;
  }
  return (
    <section className="flex flex-col items-center gap-8 p-10">
      <h1 className="text-3xl font-bold">{product.title}</h1>

      {product.imageUrls && product.imageUrls.length > 0 ? (
        <Image
          src={product.imageUrls[0]} // Display the first image
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
      {/* Optionally, display all images */}
      <div className="flex gap-4">
        {product.imageUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`${product.title} ${index + 1}`}
            width={100}
            height={100}
            className="w-20 h-20 object-cover"
          />
        ))}
      </div>

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
