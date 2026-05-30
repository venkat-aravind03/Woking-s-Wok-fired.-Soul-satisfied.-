export default function AboutLoading() {
  return (
    <>
      <div className="h-[320px] max-md:h-[240px] bg-charcoal animate-pulse" />
      <div className="bg-cream py-20 px-6 md:px-16">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-[55%] space-y-4">
            <div className="h-3 w-12 bg-primary/20 rounded animate-pulse" />
            <div className="h-10 w-3/4 bg-[#F0F0F0] rounded animate-pulse" />
            <div className="h-4 w-full bg-[#F0F0F0] rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-[#F0F0F0] rounded animate-pulse" />
          </div>
          <div className="w-full md:w-[45%] h-[480px] bg-[#F0F0F0] rounded-3xl animate-pulse" />
        </div>
      </div>
    </>
  );
}
