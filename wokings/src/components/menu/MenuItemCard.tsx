"use client";

import Image from "next/image";
import type { MenuItemCardProps } from "@/types";
import { cn, siteConfig } from "@/lib/utils";

export function MenuItemCard({ item, className }: MenuItemCardProps) {
  return (
    <article
      className={cn(
        "bg-white rounded-xl shadow-sm overflow-hidden flex flex-col group transition-shadow duration-300 border border-border-light",
        item.is_available
          ? "hover:shadow-[0_8px_32px_rgba(232,73,15,0.15)] hover:-translate-y-1"
          : "opacity-75 grayscale-[0.3]",
        className
      )}
    >
      {/* Image Area */}
      <div className="relative h-[220px] overflow-hidden">
        {item.image_url ? (
          <>
            {/* Dark overlay that fades on hover */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-[1]" />
            <Image
              src={item.image_url}
              alt={`${item.name} at Woking's Kondapur`}
              fill
              className={cn(
                "object-cover",
                item.is_available &&
                  "group-hover:scale-105 transition-transform duration-500"
              )}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-cream-dark to-cream">
            <span className="text-5xl">🍜</span>
            <span className="mt-2 font-[family-name:var(--font-body)] text-sm font-medium text-muted">
              {item.name}
            </span>
          </div>
        )}

        {/* Unavailable overlay */}
        {!item.is_available && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/40 pointer-events-none">
            <div className="bg-white text-muted font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-wider px-6 py-2 rounded border border-border-light shadow-sm -rotate-12">
              Sold Out Today
            </div>
          </div>
        )}

        {/* Bestseller Badge — yellow pill (Stitch style) */}
        {item.is_bestseller && (
          <div className="absolute top-3 right-3 z-10 bg-yellow-400 text-charcoal font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            🔥 Bestseller
          </div>
        )}

        {/* Spicy Badge — red pill (Stitch style) */}
        {item.is_spicy && !item.is_bestseller && (
          <div className="absolute top-3 right-3 z-10 bg-red-100 text-red-800 border border-red-200 font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            🌶️ Spicy
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title + Veg/Non-veg indicator (Stitch: side by side) */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-[family-name:var(--font-body)] text-[17px] font-semibold text-charcoal leading-tight pr-4">
            {item.name}
          </h3>
          <div
            className={cn(
              "w-5 h-5 border rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5",
              item.is_vegetarian ? "border-success" : "border-zomato"
            )}
          >
            <div
              className={cn(
                "w-2.5 h-2.5 rounded-full",
                item.is_vegetarian ? "bg-success" : "bg-zomato"
              )}
            />
          </div>
        </div>

        <p className="font-[family-name:var(--font-body)] text-sm text-muted leading-relaxed mb-6 line-clamp-2 flex-grow">
          {item.description}
        </p>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-border-light">
          {/* Price */}
          <div className="font-[family-name:var(--font-body)] text-lg font-bold text-charcoal">
            ₹ {Math.round(item.price)}
          </div>

          {/* Order Button — ghost style per Stitch */}
          {item.is_available ? (
            <a
              href={siteConfig.orderLinks.zomato}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#f0eded] hover:bg-primary hover:text-white text-primary font-[family-name:var(--font-body)] text-sm font-bold px-4 py-2 rounded-lg transition-colors border border-primary/30 hover:border-primary"
            >
              + Add
            </a>
          ) : (
            <button
              disabled
              className="bg-border-light text-muted font-[family-name:var(--font-body)] text-sm px-6 py-2.5 rounded-full cursor-not-allowed"
            >
              Unavailable
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
