export default function DashboardLoading() {
  return (
    <section className="flex flex-col gap-8 items-center border-black my-10 mx-10">
      <section className="flex relative flex-col w-full py-12 lg:px-28 rounded-xl gap-8">
        {/* Header section */}
        <div className="w-full flex justify-between items-center gap-8">
          {/* Create product button skeleton */}
          <div className="w-32 h-10 bg-gray-200 animate-pulse rounded-md" />
          {/* Welcome message skeleton */}
          <div className="w-48 h-8 bg-gray-200 animate-pulse rounded" />
          {/* User edit button skeleton */}
          <div className="w-10 h-10 bg-gray-200 animate-pulse rounded-full" />
        </div>

        {/* Products Grid Section */}
        <section className="flex flex-col w-full gap-8">
          {/* "My artwork" header skeleton */}
          <div className="w-32 h-8 bg-gray-200 animate-pulse rounded" />

          {/* Product Lists */}
          {["PUBLISHED", "DRAFT", "ARCHIVED"].map((status) => (
            <section
              key={status}
              className="flex flex-col rounded-xl py-12 px-16 gap-8 shadow-[0_4px_14px_0_rgb(0,0,0,0.2)]"
            >
              {/* Status header */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-200 animate-pulse" />
                <div className="w-24 h-6 bg-gray-200 animate-pulse rounded" />
              </div>

              {/* Product cards */}
              <article className="flex gap-8">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    {/* Product card skeleton */}
                    <div className="w-[250px] rounded-xl overflow-hidden shadow-lg">
                      {/* Image skeleton */}
                      <div className="w-full h-[250px] bg-gray-200 animate-pulse" />

                      {/* Content skeleton */}
                      <div className="p-4 space-y-4">
                        {/* Title skeleton */}
                        <div className="w-3/4 h-6 bg-gray-200 animate-pulse rounded" />

                        {/* Category skeleton */}
                        <div className="w-1/2 h-4 bg-gray-200 animate-pulse rounded" />

                        {/* Price skeleton */}
                        <div className="w-1/4 h-4 bg-gray-200 animate-pulse rounded" />

                        {/* Description skeleton */}
                        <div className="space-y-2">
                          <div className="w-full h-3 bg-gray-200 animate-pulse rounded" />
                          <div className="w-3/4 h-3 bg-gray-200 animate-pulse rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </article>
            </section>
          ))}
        </section>
      </section>
    </section>
  );
}
