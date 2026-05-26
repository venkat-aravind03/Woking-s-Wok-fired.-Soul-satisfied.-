"use client";

import { useMemo, useState } from "react";
import type { MenuCategory, MenuItem } from "@/types";
import { MenuItemCard } from "@/components/menu/MenuItemCard";
import { CategoryFilterBar } from "@/components/menu/CategoryFilterBar";
import { MenuSearchInput } from "@/components/menu/MenuSearchInput";
import { EmptyMenuState } from "@/components/menu/EmptyMenuState";

interface MenuClientContentProps {
  categories: MenuCategory[];
  allItems: MenuItem[];
}

export default function MenuClientContent({
  categories,
  allItems,
}: MenuClientContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = useMemo(() => {
    let items = allItems;

    // Filter by category
    if (activeCategory !== "all") {
      items = items.filter(
        (item) => item.category?.slug === activeCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    return items;
  }, [allItems, activeCategory, searchQuery]);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setSearchQuery("");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setActiveCategory("all");
  };

  return (
    <>
      {/* Sticky Filter Section */}
      <section className="sticky top-[72px] z-40 bg-white border-b border-border-light shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-6 flex flex-col gap-4">
          {/* Search + Count */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <MenuSearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search dishes, e.g. Fried Rice, Manchurian..."
            />
            <div className="hidden md:block text-muted font-[family-name:var(--font-body)] text-sm whitespace-nowrap">
              Showing {filteredItems.length} item
              {filteredItems.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Category Pills */}
          <CategoryFilterBar
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </section>

      {/* Results Section */}
      <section className="bg-cream px-6 md:px-16 py-12 md:py-20 min-h-[60vh]">
        <div className="max-w-[1200px] mx-auto">
          {/* Mobile count */}
          <div className="md:hidden mb-4 text-muted font-[family-name:var(--font-body)] text-sm">
            Showing {filteredItems.length} item
            {filteredItems.length !== 1 ? "s" : ""}
          </div>

          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyMenuState
              searchQuery={searchQuery}
              onClearSearch={handleClearSearch}
            />
          )}
        </div>
      </section>

      {/* Order CTA Strip */}
      <section className="bg-gradient-to-r from-primary to-primary-dark px-6 md:px-16 py-20">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-bold text-white text-center md:text-left leading-tight">
            Ready to order?
            <br />
            Get it delivered!
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a
              href="https://www.zomato.com/hyderabad/search?q=Wokings"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm text-white font-[family-name:var(--font-body)] text-base font-bold uppercase tracking-wide"
            >
              <span className="w-3 h-3 rounded-full bg-red-500" />
              Order on Zomato
            </a>
            <a
              href="https://www.swiggy.com/search?query=Wokings"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-lg border border-white/30 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm text-white font-[family-name:var(--font-body)] text-base font-bold uppercase tracking-wide"
            >
              <span className="w-3 h-3 rounded-full bg-orange-500" />
              Order on Swiggy
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
