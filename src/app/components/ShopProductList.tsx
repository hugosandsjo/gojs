import ProductCard from "@/app/components/ProductCard";
import { Suspense } from "react";
import { getImgixUrl } from "@/lib/utils";
import Link from "next/link";
import { getPublishedProducts } from "@/lib/actions";
import { ProductCardProps } from "@/app/components/ProductCard";
import { ProductCardSkeleton } from "@/app/shop/loading";

interface Product {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  quantity?: number | null;
  images: { image_key: string }[];
  user?: { name: string };
  category: { title: string };
}

type ProcessedProduct = Omit<ProductCardProps, "variant">;

export default async function ShopProductList() {
  const products = await getPublishedProducts();

  async function processProduct(product: Product): Promise<ProcessedProduct> {
    const imageUrls = product.images.map((image) =>
      getImgixUrl(image.image_key, {
        w: "400",
        h: "400",
        fit: "crop",
        auto: "format",
        q: "75",
      })
    );

    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      imageUrls,
      user: product.user?.name || "",
      category: product.category.title,
    };
  }

  return Promise.all(
    products.map(async (product) => {
      const processedProduct = await processProduct(product);
      return (
        <Suspense key={product.id} fallback={<ProductCardSkeleton />}>
          <Link href={`shop/${product.id}`}>
            <ProductCard {...processedProduct} />
          </Link>
        </Suspense>
      );
    })
  );
}
