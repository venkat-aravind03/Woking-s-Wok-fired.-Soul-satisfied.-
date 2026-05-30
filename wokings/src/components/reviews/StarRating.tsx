"use client";

import { useState } from "react";
import type { StarRatingProps } from "@/types";
import { cn } from "@/lib/utils";

const sizeMap = {
  sm: { star: 16, gap: 2 },
  md: { star: 20, gap: 3 },
  lg: { star: 32, gap: 4 },
};

function StarIcon({
  filled,
  size,
  className,
}: {
  filled: boolean;
  size: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={cn("shrink-0 transition-all duration-100", className)}
    >
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? "#E8490F" : "none"}
        stroke={filled ? "none" : "#E8E8E8"}
        strokeWidth={filled ? 0 : 1.5}
      />
    </svg>
  );
}

export function StarRating({
  rating,
  maxStars = 5,
  size = "md",
  interactive = false,
  onChange,
}: StarRatingProps) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const { star: starSize, gap } = sizeMap[size];

  if (!interactive) {
    return (
      <div
        className="flex items-center"
        style={{ gap: `${gap}px` }}
        aria-label={`${rating} out of ${maxStars} stars`}
        role="img"
      >
        {Array.from({ length: maxStars }, (_, i) => (
          <StarIcon
            key={i}
            filled={i < Math.floor(rating)}
            size={starSize}
          />
        ))}
      </div>
    );
  }

  // Interactive mode
  const displayRating = hoveredRating || rating;

  return (
    <div
      className="flex items-center"
      style={{ gap: `${gap}px` }}
      onMouseLeave={() => setHoveredRating(0)}
      role="radiogroup"
      aria-label="Rating selection"
    >
      {Array.from({ length: maxStars }, (_, i) => {
        const starValue = i + 1;
        const isLit = starValue <= displayRating;
        const isHovered = starValue === hoveredRating;

        return (
          <button
            key={i}
            type="button"
            onClick={() => onChange?.(starValue)}
            onMouseEnter={() => setHoveredRating(starValue)}
            className={cn(
              "cursor-pointer transition-transform duration-100",
              isHovered && "scale-[1.20]"
            )}
            aria-label={`Rate ${starValue} out of ${maxStars} stars`}
          >
            <StarIcon filled={isLit} size={starSize} />
          </button>
        );
      })}
    </div>
  );
}
