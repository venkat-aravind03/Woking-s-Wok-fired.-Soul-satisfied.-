export function MenuCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col">
      {/* Image skeleton */}
      <div className="h-[220px] w-full animate-shimmer bg-gradient-to-r from-[#F0F0F0] via-[#E8E8E8] to-[#F0F0F0] bg-[length:200%_100%]" />

      {/* Content skeleton */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="h-5 w-[70%] rounded-md animate-shimmer bg-gradient-to-r from-[#F0F0F0] via-[#E8E8E8] to-[#F0F0F0] bg-[length:200%_100%] mb-2" />
        <div className="h-3.5 w-full rounded-md animate-shimmer bg-gradient-to-r from-[#F0F0F0] via-[#E8E8E8] to-[#F0F0F0] bg-[length:200%_100%] mb-1.5" />
        <div className="h-3.5 w-[80%] rounded-md animate-shimmer bg-gradient-to-r from-[#F0F0F0] via-[#E8E8E8] to-[#F0F0F0] bg-[length:200%_100%] mb-6" />

        <hr className="border-[#F5F5F5] mb-6" />

        <div className="flex justify-between items-center mt-auto">
          <div className="h-7 w-[60px] rounded-full animate-shimmer bg-gradient-to-r from-[#F0F0F0] via-[#E8E8E8] to-[#F0F0F0] bg-[length:200%_100%]" />
          <div className="h-9 w-[96px] rounded-full animate-shimmer bg-gradient-to-r from-[#F0F0F0] via-[#E8E8E8] to-[#F0F0F0] bg-[length:200%_100%]" />
        </div>
      </div>
    </div>
  );
}
