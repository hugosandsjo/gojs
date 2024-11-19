import { ProductCardSkeleton } from "@/app/shop/loading";

export function ProductsLoadingGrid() {
  return (
    <div className="w-full flex flex-wrap gap-16 p-7">
      {Array.from({ length: 12 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
