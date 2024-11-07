import { Suspense } from "react";
import ShopProductList from "@/app/components/ShopProductList";
function ProductSkeleton() {
  return (
    <div className="max-w-40 flex flex-col gap-4">
      {/* Image skeleton */}
      <div className="flex flex-col gap-2">
        <div className="w-32 h-40 bg-gray-200 animate-pulse" />

        {/* Title skeleton */}
        <div className="h-4 w-28 bg-gray-200 animate-pulse" />

        {/* User skeleton */}
        <div className="h-3 w-20 bg-gray-200 animate-pulse" />
      </div>

      {/* Price, quantity, category skeletons */}
      <div>
        <div className="h-3 w-16 bg-gray-200 animate-pulse mb-2" />
        <div className="h-3 w-12 bg-gray-200 animate-pulse mb-2" />
        <div className="h-3 w-24 bg-gray-200 animate-pulse" />
      </div>

      {/* Description skeleton */}
      <div>
        <div className="h-3 w-32 bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}

export function ProductLoadingState() {
  return (
    <div className="w-full flex flex-wrap gap-16 p-7">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
