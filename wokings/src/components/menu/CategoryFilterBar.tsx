"use client";

import { cn } from "@/lib/utils";
import type { MenuCategory } from "@/types";

interface CategoryFilterBarProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryChange: (slug: string) => void;
}

export function CategoryFilterBar({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterBarProps) {
  const allPills = [
    { slug: "all", icon: "🍽️", name: "All" },
    ...categories.map((c) => ({ slug: c.slug, icon: c.icon, name: c.name })),
  ];

  return (
    <div className="flex overflow-x-auto w-full pb-1 gap-2.5 hide-scrollbar">
      {allPills.map((pill) => {
        const isActive = activeCategory === pill.slug;
        return (
          <button
            key={pill.slug}
            onClick={() => onCategoryChange(pill.slug)}
            className={cn(
              "whitespace-nowrap px-5 py-2.5 rounded-full font-[family-name:var(--font-body)] text-[12px] font-bold uppercase tracking-wide transition-all duration-200 flex items-center gap-1.5",
              isActive
                ? "bg-primary text-white border border-primary shadow-[0_4px_12px_rgba(232,73,15,0.30)] scale-[1.02]"
                : "bg-[#f0eded] border border-border-light text-soft-dark hover:border-primary hover:text-primary"
            )}
          >
            <span className="text-base">{pill.icon}</span>
            {pill.name}
          </button>
        );
      })}
    </div>
  );
}
