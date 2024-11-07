"use client";
import { getProduct } from "@/lib/actions";
import { useEffect, useState } from "react";
import { getImgixUrl } from "@/lib/utils";
import SingleProductParagraph from "@/app/components/typography/SingleProductParagraph";
import BackButton from "@/app/components/buttons/BackButton";
import { Product, Category, Image as PrismaImage } from "@prisma/client";
import Image from "next/image";

type ProductWithCategoryAndImages = Product & {
  category: Category;
  images: PrismaImage[];
  imageUrls: string[];
};

export default function SingleProduct({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductWithCategoryAndImages | null>(
    null
  );

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
    <section className="flex flex-col justify-center gap-8 p-10 w-full">
      <div className="flex">
        <BackButton size={12} />
      </div>

      <section className="flex flex-col gap-4 w-full px-20">
        <div className="flex flex-col gap-4">
          {product.imageUrls && product.imageUrls.length > 0 ? (
            <Image
              src={product.imageUrls[0]}
              alt={product.title}
              width={400}
              height={400}
              className="w-80 h-80 object-cover"
            />
          ) : (
            <div className="w-80 h-80 flex items-center justify-center">
              <span>No Image Available</span>
            </div>
          )}
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
        </div>

        <section className="text-lg flex justify-between gap-2">
          <div>
            <div className="mb-2 underline-offset-2 underline">
              <SingleProductParagraph>{product.title}</SingleProductParagraph>
            </div>

            <SingleProductParagraph>
              {product.category.title}
            </SingleProductParagraph>
            <SingleProductParagraph>{product.price} kr</SingleProductParagraph>
            <SingleProductParagraph>
              {product.quantity || "N/A"} st
            </SingleProductParagraph>
          </div>
          <div className="max-w-96">
            <SingleProductParagraph>
              {product.description || "No description available"}
            </SingleProductParagraph>
          </div>
          <div>
            <SingleProductParagraph>
              Height: {product.height ? `${product.height} cm` : "N/A"}
            </SingleProductParagraph>
            <SingleProductParagraph>
              Weight: {product.weight ? `${product.weight} kg` : "N/A"}
            </SingleProductParagraph>
            <SingleProductParagraph>
              Depth: {product.weight ? `${product.depth} mm` : "N/A"}
            </SingleProductParagraph>
            <SingleProductParagraph>
              Width: {product.weight ? `${product.width} mm` : "N/A"}
            </SingleProductParagraph>
          </div>
        </section>
      </section>
    </section>
  );
}
