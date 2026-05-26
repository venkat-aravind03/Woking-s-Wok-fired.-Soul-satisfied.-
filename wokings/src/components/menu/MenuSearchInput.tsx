"use client";

import { Search, X } from "lucide-react";

interface MenuSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MenuSearchInput({
  value,
  onChange,
  placeholder = "Search dishes...",
}: MenuSearchInputProps) {
  return (
    <div className="relative w-full max-w-[480px] mx-auto">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 pl-10 pr-10 rounded-lg bg-[#f6f3f2] border border-border-light font-[family-name:var(--font-body)] text-[15px] text-charcoal outline-none transition-all duration-200 placeholder:text-muted/50 focus:border-primary focus:ring-1 focus:ring-primary focus:bg-white"
      />
      {value.length > 0 && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
