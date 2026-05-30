export default function ReviewsLoading() {
  return (
    <>
      <div className="bg-charcoal py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="h-12 w-3/4 bg-white/10 rounded animate-pulse" />
            <div className="h-5 w-full bg-white/10 rounded animate-pulse" />
          </div>
          <div className="bg-white rounded-xl p-8 h-[180px] animate-pulse" />
        </div>
      </div>
      <div className="bg-cream py-16 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl h-[240px] animate-pulse" />
          ))}
        </div>
      </div>
    </>
  );
}
