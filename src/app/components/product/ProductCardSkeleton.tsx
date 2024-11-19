export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 max-w-40">
      <div className="flex flex-col gap-2">
        <div className="w-32 h-40 bg-gray-200 rounded animate-[pulse_2s_infinite]" />
        <div className="h-4 w-24 bg-gray-200 rounded animate-[pulse_2s_infinite]" />
        <div className="h-4 w-20 bg-gray-200 rounded animate-[pulse_2s_infinite]" />
      </div>
      <div>
        <div className="h-4 w-16 bg-gray-200 rounded animate-[pulse_2s_infinite]" />
        <div className="h-4 w-14 bg-gray-200 rounded animate-[pulse_2s_infinite] mt-1" />
        <div className="h-4 w-12 bg-gray-200 rounded animate-[pulse_2s_infinite] mt-1" />
      </div>
      <div className="h-4 w-32 bg-gray-200 rounded animate-[pulse_2s_infinite]" />
    </div>
  );
}
