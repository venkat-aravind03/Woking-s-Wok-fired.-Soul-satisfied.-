"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { siteConfig } from "@/lib/utils";

interface StatItemProps {
  value: string;
  numericValue?: number;
  suffix?: string;
  label: string;
  delay: number;
  isVisible: boolean;
  isDecimal?: boolean;
}

function useCountUp(
  target: number,
  isVisible: boolean,
  duration: number = 1500,
  isDecimal: boolean = false
): string {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * target;

      setCount(current);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isVisible, target, duration]);

  if (isDecimal) {
    return count.toFixed(1);
  }
  return Math.floor(count).toString();
}

function StatItem({
  value,
  numericValue,
  suffix = "",
  label,
  delay,
  isVisible,
  isDecimal = false,
}: StatItemProps) {
  const displayCount = useCountUp(
    numericValue ?? 0,
    isVisible,
    isDecimal ? 1500 : numericValue && numericValue <= 10 ? 1000 : 1500,
    isDecimal
  );

  return (
    <div
      className="flex flex-col items-center text-center text-white p-2 transition-all duration-500"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.9)",
        transitionDelay: `${delay}ms`,
      }}
    >
      <span className="font-[family-name:var(--font-heading)] text-[32px] md:text-[48px] font-bold mb-1 flex items-center gap-1">
        {numericValue !== undefined
          ? `${displayCount}${suffix}`
          : value}
        {isDecimal && (
          <svg className="w-8 h-8 text-yellow-300 fill-current" viewBox="0 0 24 24">
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        )}
      </span>
      <span className="font-[family-name:var(--font-body)] text-[12px] uppercase tracking-wider text-white/90">
        {label}
      </span>
    </div>
  );
}

export default function StatsBar() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.3,
    });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [handleIntersection]);

  const stats = [
    {
      value: `${siteConfig.reviewCount}`,
      numericValue: 500,
      suffix: "+",
      label: "Happy Customers",
    },
    {
      value: `${siteConfig.rating}`,
      numericValue: 4.8,
      suffix: "",
      label: "Average Rating",
      isDecimal: true,
    },
    {
      value: "3",
      numericValue: 3,
      suffix: "",
      label: "Passionate Chefs",
    },
    {
      value: "Daily",
      label: "Fresh Every Order",
    },
  ];

  return (
    <section ref={ref} className="bg-primary py-6 relative z-20 shadow-xl border-y-4 border-[#C03A0A]">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 divide-x-0 md:divide-x divide-white/20">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex justify-center">
            <StatItem
              value={stat.value}
              numericValue={stat.numericValue}
              suffix={stat.suffix}
              label={stat.label}
              delay={index * 150}
              isVisible={isVisible}
              isDecimal={stat.isDecimal}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
