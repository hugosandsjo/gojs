"use client";

import ProductParagraph from "@/app/components/typography/ProductParagraph";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import Link from "next/link";
import EditButton from "@/app/components/buttons/EditButton";

type ProductCardProps = {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  quantity?: number | null;
  imageUrls: string[];
  user: string | undefined;
  category: string;
};

export default function ProductCard({
  title,
  price,
  quantity,
  imageUrls,
  description,
  user,
  category,
  id,
}: ProductCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  console.log("id from ProductCard", id);

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="relative max-w-40 flex flex-col gap-4"
      style={style}
    >
      <div className="flex flex-col gap-2">
        {imageUrls ? (
          <Image
            src={imageUrls[0]}
            alt={title}
            width={400}
            height={400}
            className="w-32 h-40 object-cover"
          />
        ) : (
          <div className="w-32 h-40 bg-lime-300"></div>
        )}

        <p className="font-sans underline-offset-2 underline text-xs">
          {title}
        </p>
        <ProductParagraph>{user} </ProductParagraph>
      </div>
      <div>
        <ProductParagraph>{price} kr</ProductParagraph>

        <ProductParagraph>{quantity} st</ProductParagraph>
        <ProductParagraph>{category}</ProductParagraph>
      </div>
      <div>
        <ProductParagraph>{description}</ProductParagraph>
      </div>
      <div className="absolute top-1 right-3">
        <Link href={`/dashboard/${id}`}>
          <EditButton></EditButton>
        </Link>
      </div>
    </div>
  );
}
