"use client";

import { getProduct } from "@/lib/actions";
import { useEffect, useState } from "react";
import { getImgixUrl } from "@/lib/utils";
import SingleProductParagraph from "@/app/components/typography/SingleProductParagraph";
import BackButton from "@/app/components/buttons/BackButton";
import { Product, Category, Image as PrismaImage, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ProductWithCategoryAndImages = Product & {
  category: Category;
  images: PrismaImage[];
  imageUrls: string[];
  user: User;
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
    <section className="flex flex-col justify-center p-10 w-full h-auto gap-10">
      <div className="flex">
        <BackButton size={12} />
      </div>

      <section className="flex gap-20 w-full items-center px-20">
        <div className="p-10 flex justify-center gap-8 w-full">
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

          <section className="text-lg flex flex-col justify-between gap-2">
            <div>
              <div className="mb-2 underline-offset-2 underline">
                <SingleProductParagraph>{product.title}</SingleProductParagraph>
              </div>

              <SingleProductParagraph>
                {product.category.title}
              </SingleProductParagraph>
              <Link href={`/artists/${product.user.id}`}>
                <SingleProductParagraph>
                  {product.user.name}
                </SingleProductParagraph>
              </Link>
              <SingleProductParagraph>
                {product.price} kr
              </SingleProductParagraph>
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
                {product.height ? `Height: ${product.height} mm` : null}
              </SingleProductParagraph>
              <SingleProductParagraph>
                {product.weight ? `Weight: ${product.weight} kg` : null}
              </SingleProductParagraph>
              <SingleProductParagraph>
                {product.weight ? `Depth: ${product.depth} mm` : null}
              </SingleProductParagraph>
              <SingleProductParagraph>
                {product.weight ? ` Width: ${product.width} mm` : null}
              </SingleProductParagraph>
            </div>
          </section>
        </div>
      </section>
    </section>
  );
}
