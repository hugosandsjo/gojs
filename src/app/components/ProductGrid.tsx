import ShopProductList from "@/app/components/ShopProductList";
import { Suspense } from "react";
import { ProductLoadingState } from "@/app/components/ProductSkeleton";

export default async function ProductGrid() {
  return (
    <section className="w-full flex flex-wrap gap-16 p-7">
      <Suspense fallback={<ProductLoadingState />}>
        {" "}
        <ShopProductList />
      </Suspense>
    </section>
  );
}
