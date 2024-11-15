export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 max-w-40 animate-pulse">
      <div className="w-32 h-40 bg-gray-200 rounded" />
      <div className="h-4 w-24 bg-gray-200 rounded" />
      <div className="h-4 w-20 bg-gray-200 rounded" />
      <div className="h-4 w-16 bg-gray-200 rounded" />
    </div>
  );
}

// Add default export for page-level loading
export default function Loading() {
  return (
    <section className="flex flex-col w-full items-center gap-8 p-10">
      <div className="w-full flex flex-wrap gap-16 p-7">
        {Array.from({ length: 12 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
