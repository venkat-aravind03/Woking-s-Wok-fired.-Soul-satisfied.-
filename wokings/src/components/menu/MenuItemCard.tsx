"use client";

import Image from "next/image";
import type { MenuItemCardProps } from "@/types";
import { cn, siteConfig } from "@/lib/utils";

export function MenuItemCard({ item, className }: MenuItemCardProps) {
  return (
    <article
      className={cn(
        "bg-white rounded-xl shadow-sm overflow-hidden flex flex-col group transition-shadow duration-300",
        item.is_available
          ? "hover:shadow-[0_8px_32px_rgba(232,73,15,0.15)] hover:-translate-y-1"
          : "opacity-75 grayscale-[0.3]",
        className
      )}
    >
      {/* Image Area */}
      <div className="relative h-[220px] overflow-hidden">
        {item.image_url ? (
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

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3">
          <div
            className={cn(
              "bg-white p-1 rounded border",
              item.is_vegetarian ? "border-success" : "border-zomato"
            )}
          >
            <div
              className={cn(
                "w-2 h-2 rounded-full",
                item.is_vegetarian ? "bg-success" : "bg-zomato"
              )}
            />
          </div>
        </div>

        {/* Bestseller Badge */}
        {item.is_bestseller && (
          <div className="absolute top-3 right-3 bg-primary text-white font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
            🔥 Bestseller
          </div>
        )}

        {/* Spicy Indicator */}
        {item.is_spicy && (
          <div className="absolute bottom-2.5 right-2.5 bg-zomato/15 border border-zomato/30 text-zomato px-2 py-0.5 rounded-full font-[family-name:var(--font-body)] text-[11px] font-medium">
            🌶️ Spicy
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-[family-name:var(--font-body)] text-[17px] font-semibold text-charcoal mb-1 leading-tight">
          {item.name}
        </h3>
        <p className="font-[family-name:var(--font-body)] text-sm text-muted leading-relaxed mb-6 line-clamp-2">
          {item.description}
        </p>

        <hr className="border-border-light mb-6" />

        <div className="flex justify-between items-center mt-auto">
          {/* Price */}
          <div className="font-[family-name:var(--font-heading)] text-2xl font-semibold text-charcoal">
            <span className="text-primary text-lg mr-1">₹</span>
            {Math.round(item.price)}
          </div>

          {/* Order Button */}
          {item.is_available ? (
            <a
              href={siteConfig.orderLinks.zomato}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-white font-[family-name:var(--font-body)] text-sm font-bold px-6 py-2.5 rounded-full hover:bg-primary-dark transition-colors"
            >
              Order Now →
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
