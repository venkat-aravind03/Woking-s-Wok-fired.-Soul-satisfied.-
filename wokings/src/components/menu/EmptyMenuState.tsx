"use client";

interface EmptyMenuStateProps {
  searchQuery: string;
  onClearSearch?: () => void;
}

export function EmptyMenuState({
  searchQuery,
  onClearSearch,
}: EmptyMenuStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-6">
      <span className="text-[64px]">🍽️</span>
      <h3 className="mt-4 font-[family-name:var(--font-heading)] text-2xl font-semibold text-charcoal">
        {searchQuery
          ? `No results for "${searchQuery}"`
          : "No dishes available right now"}
      </h3>
      <p className="mt-2 font-[family-name:var(--font-body)] text-base text-muted">
        {searchQuery
          ? "Try a different search term or browse all categories"
          : "Check back soon — our menu is updated regularly!"}
      </p>
      {searchQuery && onClearSearch && (
        <button
          onClick={onClearSearch}
          className="mt-6 bg-primary text-white font-[family-name:var(--font-body)] text-sm font-bold px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
        >
          Show All Dishes
        </button>
      )}
    </div>
  );
}
