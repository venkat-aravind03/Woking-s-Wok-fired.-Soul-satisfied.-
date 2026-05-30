"use client";

import { useState, useMemo } from "react";
import type { Review, ReviewSource } from "@/types";
import type { RatingBreakdown } from "@/types";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { ReviewsFilterBar } from "@/components/reviews/ReviewsFilterBar";

interface ReviewsClientContentProps {
  allReviews: Review[];
  sourceCounts: Record<ReviewSource | "all", number>;
}

export default function ReviewsClientContent({
  allReviews,
  sourceCounts,
}: ReviewsClientContentProps) {
  const [activeSource, setActiveSource] = useState<ReviewSource | "all">("all");
  const [sortBy, setSortBy] = useState<"latest" | "highest" | "lowest">("latest");

  const filteredReviews = useMemo(() => {
    let reviews = allReviews;

    // Filter by source
    if (activeSource !== "all") {
      reviews = reviews.filter((r) => r.source === activeSource);
    }

    // Sort
    reviews = [...reviews].sort((a, b) => {
      switch (sortBy) {
        case "highest":
          return b.rating - a.rating || new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "lowest":
          return a.rating - b.rating || new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case "latest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return reviews;
  }, [allReviews, activeSource, sortBy]);

  return (
    <>
      <ReviewsFilterBar
        activeSource={activeSource}
        sortBy={sortBy}
        sourceCounts={sourceCounts}
        onSourceChange={setActiveSource}
        onSortChange={setSortBy}
      />

      {/* Masonry Grid */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16">
          {filteredReviews.length > 0 ? (
            <div className="masonry-grid">
              {filteredReviews.map((review) => (
                <div key={review.id} className="masonry-item">
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
              <span className="text-5xl mb-4">📝</span>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-charcoal">
                No reviews yet
              </h3>
              <p className="font-[family-name:var(--font-body)] text-base text-muted mt-2">
                Be the first to share your experience with Woking&apos;s!
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
