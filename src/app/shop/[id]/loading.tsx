// loading.tsx
export default function LoadingSkeleton() {
  return (
    <section className="flex flex-col justify-center p-10 w-full h-auto gap-10">
      <div className="flex">
        {/* Back button skeleton */}
        <div className="w-20 h-6 bg-gray-200 animate-pulse rounded" />
      </div>

      <section className="flex gap-20 w-full items-center md:px-20">
        <div className="md:p-10 flex flex-col md:flex-row justify-center gap-8 w-full">
          <div className="flex flex-col gap-4">
            {/* Main image skeleton */}
            <div className="w-80 h-80 bg-gray-200 animate-pulse rounded" />

            {/* Thumbnail images skeleton */}
            <div className="flex gap-4">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="w-20 h-20 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </div>
          </div>

          <section className="text-lg flex md:flex-col justify-between gap-2">
            <div className="space-y-4">
              {/* Title skeleton */}
              <div className="mb-2">
                <div className="w-48 h-7 bg-gray-200 animate-pulse rounded" />
              </div>

              {/* Category, Artist, Price, Quantity skeletons */}
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="w-32 h-6 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </div>

            {/* Description skeleton */}
            <div className="max-w-96 space-y-2">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="w-full h-4 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </div>

            {/* Dimensions skeleton */}
            <div className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="w-40 h-6 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </div>
          </section>
        </div>
      </section>
    </section>
  );
}
