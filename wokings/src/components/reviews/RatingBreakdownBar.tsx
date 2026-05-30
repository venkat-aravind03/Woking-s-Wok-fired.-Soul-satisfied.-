"use client";

import { useEffect, useRef, useState } from "react";
import type { RatingBreakdown } from "@/types";
import { cn } from "@/lib/utils";

interface RatingBreakdownBarProps {
  breakdown: RatingBreakdown[];
  totalCount: number;
  variant?: "light" | "dark";
}

export function RatingBreakdownBar({
  breakdown,
  totalCount,
  variant = "light",
}: RatingBreakdownBarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (totalCount === 0) return null;

  const isDark = variant === "dark";

  return (
    <div ref={containerRef} className="w-full flex flex-col gap-2">
      {breakdown.map((item, index) => (
        <div key={item.star} className="flex items-center gap-2">
          {/* Star label */}
          <span
            className={cn(
              "w-7 text-right font-[family-name:var(--font-body)] text-[13px] font-medium",
              isDark ? "text-white/70" : "text-muted"
            )}
          >
            {item.star}★
          </span>

          {/* Bar container */}
          <div
            className={cn(
              "flex-1 h-2 rounded-full overflow-hidden",
              isDark ? "bg-white/10" : "bg-border-light"
            )}
          >
            <div
              className="h-full bg-primary rounded-full"
              style={{
                width: isVisible ? `${item.percentage}%` : "0%",
                transition: `width 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 100}ms`,
              }}
            />
          </div>

          {/* Percentage */}
          <span
            className={cn(
              "w-9 text-left font-[family-name:var(--font-body)] text-[12px] font-medium",
              isDark ? "text-white/50" : "text-muted"
            )}
          >
            {item.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
}
