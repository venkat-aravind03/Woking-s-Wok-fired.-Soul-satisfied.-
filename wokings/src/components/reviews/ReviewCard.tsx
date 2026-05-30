"use client";

import { useState } from "react";
import type { ReviewCardProps } from "@/types";
import { StarRating } from "@/components/reviews/StarRating";
import { cn, getRelativeTime } from "@/lib/utils";

const sourceBadgeStyles: Record<string, string> = {
  Zomato: "bg-[#FEE2E2] text-[#DC2626]",
  Swiggy: "bg-[#FFF0E0] text-[#EA580C]",
  Google: "bg-[#DCFCE7] text-[#15803D]",
  Direct: "bg-[#F0F0F0] text-[#6B6B6B]",
};

const sourceDotColor: Record<string, string> = {
  Zomato: "bg-[#DC2626]",
  Swiggy: "bg-[#EA580C]",
  Google: "bg-[#15803D]",
  Direct: "bg-[#6B6B6B]",
};

export function ReviewCard({ review, className, compact = false }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const initial = review.customer_name.charAt(0).toUpperCase();

  return (
    <article
      className={cn(
        "bg-white rounded-2xl border border-border-light transition-all duration-250 ease-out",
        compact ? "p-4" : "p-6",
        "shadow-[0_2px_12px_rgba(0,0,0,0.07)]",
        "hover:shadow-[0_8px_32px_rgba(232,73,15,0.12)] hover:-translate-y-[3px]",
        className
      )}
    >
      {/* Top Row — Stars + Source Badge */}
      <div className="flex justify-between items-start mb-3">
        <StarRating rating={review.rating} size="md" />
        <span
          className={cn(
            "font-[family-name:var(--font-body)] text-[11px] font-bold uppercase tracking-[0.05em] px-2.5 py-1 rounded-full",
            sourceBadgeStyles[review.source] || sourceBadgeStyles.Direct
          )}
        >
          {review.source}
        </span>
      </div>

      {/* Review Text */}
      <p
        className={cn(
          "font-[family-name:var(--font-body)] text-[15px] text-soft-dark leading-[1.65]",
          !expanded && (compact ? "line-clamp-3" : "line-clamp-5")
        )}
      >
        &ldquo;{review.review_text}&rdquo;
      </p>
      {review.review_text.length > (compact ? 120 : 200) && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-1 font-[family-name:var(--font-body)] text-sm font-medium text-primary cursor-pointer hover:underline"
        >
          {expanded ? "read less" : "read more"}
        </button>
      )}

      {/* Divider */}
      <hr className="border-[#F5F5F5] my-4" />

      {/* Bottom Row — Customer + Platform dot */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <span className="font-[family-name:var(--font-body)] text-[15px] font-bold text-white uppercase">
              {initial}
            </span>
          </div>

          {/* Name + Date */}
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-charcoal">
              {review.customer_name}
            </span>
            <span className="font-[family-name:var(--font-body)] text-[12px] text-[#9B9B9B]">
              {getRelativeTime(review.created_at)}
            </span>
          </div>
        </div>

        {/* Platform dot */}
        <div className="relative group">
          <div
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              sourceDotColor[review.source] || sourceDotColor.Direct
            )}
          />
          <div className="absolute bottom-full right-0 mb-1.5 px-2 py-1 bg-charcoal text-white text-[11px] font-[family-name:var(--font-body)] rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ordered via {review.source}
          </div>
        </div>
      </div>
    </article>
  );
}
