"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Branch } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface BranchLocationRotatorProps {
  branches: readonly Branch[];
  interval?: number;
  className?: string;
}

export default function BranchLocationRotator({
  branches,
  interval = 3000,
  className,
}: BranchLocationRotatorProps) {
  const [activeBranchIndex, setActiveBranchIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const switchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTimer = useCallback(() => {
    // Clear any existing timers
    if (timerRef.current) clearInterval(timerRef.current);
    if (switchTimerRef.current) clearTimeout(switchTimerRef.current);

    timerRef.current = setInterval(() => {
      setIsVisible(false);
      switchTimerRef.current = setTimeout(() => {
        setActiveBranchIndex((prev) => (prev + 1) % branches.length);
        setIsVisible(true);
      }, 300);
    }, interval);
  }, [branches.length, interval]);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (switchTimerRef.current) clearTimeout(switchTimerRef.current);
    };
  }, [startTimer]);

  const handleDotClick = (index: number) => {
    // Clear existing timers
    if (timerRef.current) clearInterval(timerRef.current);
    if (switchTimerRef.current) clearTimeout(switchTimerRef.current);

    // Immediately switch
    setIsVisible(false);
    setTimeout(() => {
      setActiveBranchIndex(index);
      setIsVisible(true);
      // Restart auto-rotation
      startTimer();
    }, 150);
  };

  const activeBranch = branches[activeBranchIndex];

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Branch Content — Animated */}
      <div
        className="flex flex-col gap-1.5 transition-all duration-300 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(-6px)",
        }}
      >
        {/* ROW 1 — Branch chip + Short label */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-[3px] rounded-full bg-[rgba(232,73,15,0.25)] border border-[rgba(232,73,15,0.50)] font-[family-name:var(--font-body)] text-[11px] font-bold uppercase tracking-[0.06em] text-primary">
            {activeBranchIndex + 1} of {branches.length}
          </span>
          <span className="font-[family-name:var(--font-body)] text-[13px] font-semibold uppercase tracking-[0.05em] text-white/60">
            {activeBranch.shortLabel}
          </span>
        </div>

        {/* ROW 2 — Full address with pin */}
        <div className="flex items-start gap-2">
          <span className="text-primary text-sm leading-none mt-0.5 shrink-0">📍</span>
          <span className="font-[family-name:var(--font-body)] text-[15px] text-white/80 leading-snug">
            {activeBranch.address}
          </span>
        </div>

        {/* ROW 3 — Get Directions link */}
        <a
          href={activeBranch.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-[family-name:var(--font-body)] text-[13px] font-medium text-primary hover:text-[rgba(232,73,15,0.80)] hover:underline transition-colors w-fit"
        >
          Get Directions →
        </a>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center gap-1.5 mt-2.5">
        {branches.map((_, index) => {
          const isActive = index === activeBranchIndex;
          return (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              aria-label={`Switch to branch ${index + 1}`}
              className="p-0 border-0 bg-transparent cursor-pointer"
            >
              <div
                className="h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: isActive ? "20px" : "6px",
                  backgroundColor: isActive
                    ? "#E8490F"
                    : "rgba(255,255,255,0.30)",
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
