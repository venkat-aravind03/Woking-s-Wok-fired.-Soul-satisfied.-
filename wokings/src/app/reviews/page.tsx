import { getAllApprovedReviews, getReviewStats, getReviewCountBySource } from "@/lib/reviews";
import { StarRating } from "@/components/reviews/StarRating";
import { RatingBreakdownBar } from "@/components/reviews/RatingBreakdownBar";
import { ReviewSubmissionForm } from "@/components/reviews/ReviewSubmissionForm";
import ReviewsClientContent from "./ReviewsClientContent";

export const metadata = {
  title: "Customer Reviews",
  description:
    "Read authentic reviews from Woking's customers. Rated 4.8 stars on Zomato and Swiggy. See what Kondapur and Gachibowli locals are saying about our wok-fired Indo-Chinese food.",
};

export const revalidate = 60;

export default async function ReviewsPage() {
  const [reviews, stats, sourceCounts] = await Promise.all([
    getAllApprovedReviews("all", "latest"),
    getReviewStats(),
    getReviewCountBySource(),
  ]);

  return (
    <>
      {/* ═══ HERO + RATING SUMMARY ═══ */}
      <section className="bg-charcoal py-16 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Title */}
          <div className="space-y-4">
            <h1 className="font-[family-name:var(--font-heading)] text-5xl max-md:text-4xl font-bold text-white">
              What People Are Saying
            </h1>
            <p className="font-[family-name:var(--font-body)] text-lg text-white/80 max-w-xl leading-relaxed">
              Our wok-fired creations spark joy. Read authentic stories from our community of flavor seekers and see why Woking&apos;s is a local favorite.
            </p>
          </div>

          {/* Right — Stats Card */}
          <div className="bg-white rounded-xl p-8 shadow-sm flex flex-col md:flex-row gap-8 items-center justify-between">
            <div className="text-center md:text-left">
              <div className="font-[family-name:var(--font-heading)] text-5xl font-bold text-primary mb-1">
                {stats.averageRating || "4.8"}
              </div>
              <div className="mb-2">
                <StarRating rating={Math.floor(stats.averageRating || 4.8)} size="md" />
              </div>
              <p className="font-[family-name:var(--font-body)] text-sm text-muted">
                Based on {stats.totalCount} reviews
              </p>
            </div>

            <div className="w-full md:w-64">
              <RatingBreakdownBar
                breakdown={stats.breakdown}
                totalCount={stats.totalCount}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Client-side filter + grid */}
      <ReviewsClientContent allReviews={reviews} sourceCounts={sourceCounts} />

      {/* ═══ WRITE A REVIEW — Dark Section ═══ */}
      <section className="bg-charcoal py-20 md:py-24 px-6 md:px-16" id="write-review">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="font-[family-name:var(--font-body)] text-[13px] font-bold uppercase tracking-[0.12em] text-primary mb-2">
              SHARE YOUR EXPERIENCE
            </p>
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-bold text-white">
              We&apos;d Love to Hear From You
            </h2>
          </div>
          <ReviewSubmissionForm />
        </div>
      </section>
    </>
  );
}
