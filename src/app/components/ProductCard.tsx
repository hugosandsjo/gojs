"use client";

import ProductParagraph from "@/app/components/typography/ProductParagraph";
import { useDraggable } from "@dnd-kit/core";
import ProductCardImage from "@/app/components/ProductCardImage";
import EditButton from "@/app/components/buttons/EditButton";
import GoToArtButton from "@/app/components/buttons/GoToArtButton";
import { Grip } from "lucide-react";

export type ProductCardProps = {
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
      className={`relative flex flex-col gap-4 sm:w-40 w-full rounded-xl  ${
        variant === "dashboard"
          ? "shadow-[0_4px_14px_0_rgb(0,0,0,0.2)] py-6 px-8 sm:40 "
          : ""
      }`}
      style={style}
    >
      {/* Drag Handle and Buttons */}
      {variant === "dashboard" && (
        <div className="absolute left-5 top-5 z-10 flex items-center gap-2">
          <div
            {...listeners}
            {...attributes}
            className={`${handleClass} shadow-[0_4px_14px_0_rgb(0,0,0,0.2)]`}
          >
            <Grip className="w-5 h-5 text-gray-600" />
          </div>
          <EditButton id={id} />
          <GoToArtButton id={id} />
        </div>
      )}

      <div className="flex flex-col gap-2">
        <div className="relative">
          {imageUrls ? (
            <ProductCardImage src={imageUrls[0]} alt={title} />
          ) : (
            <div className="w-32 h-40 bg-lime-300"></div>
          )}
        </div>
        <p className="font-sans underline-offset-2 underline text-xs">
          {title}
        </p>
      </div>

      {variant === "shop" && (
        <>
          <div>
            <ProductParagraph>{user}</ProductParagraph>
            <ProductParagraph>{price} kr</ProductParagraph>
            <ProductParagraph>{quantity} st</ProductParagraph>
            <ProductParagraph>{category}</ProductParagraph>
          </div>
          <div>
            <ProductParagraph>{description}</ProductParagraph>
          </div>
        </>
      )}
    </div>
  );
}
