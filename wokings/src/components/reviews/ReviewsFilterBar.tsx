"use client";

import type { ReviewSource } from "@/types";
import { cn } from "@/lib/utils";

interface ReviewsFilterBarProps {
  activeSource: ReviewSource | "all";
  sortBy: "latest" | "highest" | "lowest";
  sourceCounts: Record<ReviewSource | "all", number>;
  onSourceChange: (source: ReviewSource | "all") => void;
  onSortChange: (sort: "latest" | "highest" | "lowest") => void;
}

const pills: { slug: ReviewSource | "all"; label: string }[] = [
  { slug: "all", label: "All Reviews" },
  { slug: "Zomato", label: "Zomato" },
  { slug: "Swiggy", label: "Swiggy" },
  { slug: "Google", label: "Google" },
  { slug: "Direct", label: "Direct" },
];

export function ReviewsFilterBar({
  activeSource,
  sortBy,
  sourceCounts,
  onSourceChange,
  onSortChange,
}: ReviewsFilterBarProps) {
  return (
    <section className="sticky top-[72px] z-30 bg-white border-b border-border-light shadow-sm py-3">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Source Filter Pills */}
        <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 hide-scrollbar">
          {pills.map((pill) => {
            const isActive = activeSource === pill.slug;
            return (
              <button
                key={pill.slug}
                onClick={() => onSourceChange(pill.slug)}
                className={cn(
                  "h-[38px] px-4 rounded-full font-[family-name:var(--font-body)] text-[13px] font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all duration-200",
                  isActive
                    ? "bg-primary text-white border border-primary shadow-[0_4px_12px_rgba(232,73,15,0.25)]"
                    : "bg-[#F5F5F5] text-soft-dark border border-border-light hover:border-primary"
                )}
              >
                {pill.label}
                <span
                  className={cn(
                    "font-[family-name:var(--font-body)] text-[12px] font-normal ml-0.5",
                    isActive ? "text-white/70" : "text-muted"
                  )}
                >
                  ({sourceCounts[pill.slug] ?? 0})
                </span>
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <span className="font-[family-name:var(--font-body)] text-[13px] font-medium text-muted whitespace-nowrap">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) =>
              onSortChange(e.target.value as "latest" | "highest" | "lowest")
            }
            className="h-[38px] min-w-[160px] px-3 rounded-[10px] bg-[#F9F9F9] border border-border-light font-[family-name:var(--font-body)] text-sm text-soft-dark outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value="latest">Latest First</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
          </select>
        </div>
      </div>
    </section>
  );
}
