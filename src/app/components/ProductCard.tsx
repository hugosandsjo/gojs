"use client";

import ProductParagraph from "@/app/components/typography/ProductParagraph";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import Link from "next/link";
import EditButton from "@/app/components/buttons/EditButton";
import GoToArtButton from "@/app/components/buttons/GoToArtButton";
import { Grip } from "lucide-react";

type ProductCardProps = {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  quantity?: number | null;
  imageUrls: string[];
  user: string | undefined;
  category: string;
  variant?: "shop" | "dashboard";
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
  variant = "shop",
}: ProductCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  const handleClass =
    "cursor-move bg-white active:cursor-grabbing hover:bg-gray-100 p-2 rounded transition-colors";

  return (
    <div
      ref={setNodeRef}
      className="relative max-w-40 flex flex-col gap-4"
      style={style}
    >
      {/* Drag Handle */}
      {variant === "dashboard" && (
        <div
          {...listeners}
          {...attributes}
          className={`${handleClass} absolute left-2 top-2 z-10`}
        >
          <Grip className="w-4 h-4 text-gray-500" />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="relative">
          {variant === "dashboard" && (
            <div className="flex justify-start absolute bottom-4 w-full px-2 gap-2">
              <Link href={`/dashboard/${id}`}>
                <EditButton />
              </Link>
              <Link href={`/shop/${id}`}>
                <GoToArtButton />
              </Link>
            </div>
          )}
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
        </div>
        <p className="font-sans underline-offset-2 underline text-xs">
          {title}
        </p>
        <ProductParagraph>{user}</ProductParagraph>
      </div>
      <div>
        <ProductParagraph>{price} kr</ProductParagraph>

        <ProductParagraph>{quantity} st</ProductParagraph>
        <ProductParagraph>{category}</ProductParagraph>
      </div>
      <div>
        <ProductParagraph>{description}</ProductParagraph>
      </div>
    </div>
  );
}
