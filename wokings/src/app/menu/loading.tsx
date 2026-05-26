import { MenuCardSkeleton } from "@/components/menu/MenuCardSkeleton";

export default function MenuLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="h-[280px] max-md:h-[200px] bg-charcoal animate-pulse" />

      {/* Filter bar skeleton */}
      <div className="sticky top-[72px] z-40 bg-white border-b border-border-light py-6 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-4">
          <div className="h-12 w-full max-w-[480px] mx-auto rounded-lg bg-[#F0F0F0] animate-pulse" />
          <div className="flex gap-2.5 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-24 rounded-full bg-[#F0F0F0] animate-pulse shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="bg-cream px-6 md:px-16 py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <MenuCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
