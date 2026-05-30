import Link from "next/link";
import { getFeaturedReviews } from "@/lib/reviews";
import { ReviewCard } from "@/components/reviews/ReviewCard";

export default async function ReviewsTeaserSection() {
  const reviews = await getFeaturedReviews(6);

  if (reviews.length === 0) return null;

  return (
    <section className="bg-cream py-20 px-6 md:px-16" id="reviews">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-primary font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-primary" />
            What Our Customers Say
            <span className="w-8 h-px bg-primary" />
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl font-bold text-charcoal">
            Love from Kondapur
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} compact />
          ))}
        </div>

        {/* View All + Write Review CTA */}
        <div className="text-center mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 bg-primary text-white font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-wide px-8 py-4 rounded-full hover:bg-primary-dark transition-colors shadow-[0_4px_16px_rgba(232,73,15,0.30)]"
          >
            See All Reviews →
          </Link>
          <Link
            href="/reviews#write-review"
            className="inline-flex items-center gap-2 border-2 border-charcoal text-charcoal font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-wide px-8 py-4 rounded-full hover:bg-charcoal hover:text-white transition-colors"
          >
            Write a Review ✍️
          </Link>
        </div>
      </div>
    </section>
  );
}
