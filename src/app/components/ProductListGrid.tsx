"use client";

import ProductList from "@/app/components/ProductList";
import { getImgixUrl } from "@/lib/utils";
import type { User } from "@prisma/client";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { updateProductStatus } from "@/lib/actions";
import { ProductWithRelations } from "@/lib/types";

type ProductListGridProps = {
  products: ProductWithRelations[];
  user: User;
};

type ProductWithUrls = ProductWithRelations & {
  imageUrls: string[];
  user: string | undefined;
};

export default function ProductListGrid({ products }: ProductListGridProps) {
  const initialProductsWithUrls = products?.map((product) => ({
    ...product,
    imageUrls: product.images.map((image) =>
      getImgixUrl(image.image_key, {
        w: "400",
        h: "400",
        fit: "crop",
        auto: "format",
        q: "75",
      })
    ),
    user: product.user?.name,
  }));

  const [items, setItems] = useState(initialProductsWithUrls || []);

  const publishedProducts = items.filter(
    (product) => product.status === "PUBLISHED"
  );
  const draftProducts = items.filter((product) => product.status === "DRAFT");
  const archivedProducts = items.filter(
    (product) => product.status === "ARCHIVED"
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const productId = active.id as string;
    const newStatus = over.id as ProductWithUrls["status"];

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, status: newStatus } : item
      )
    );

    await updateProductStatus(productId, newStatus);
  }

  return (
    <>
      <DndContext onDragEnd={handleDragEnd}>
        <ProductList products={publishedProducts} status="PUBLISHED" />
        <ProductList products={draftProducts} status="DRAFT" />
        <ProductList products={archivedProducts} status="ARCHIVED" />
      </DndContext>
    </>
  );
}
