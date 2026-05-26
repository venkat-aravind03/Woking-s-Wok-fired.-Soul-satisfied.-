"use client";

import { useState, useEffect, useRef } from "react";
import { ShoppingBag, X } from "lucide-react";
import { siteConfig } from "@/lib/utils";

const DISMISSED_KEY = "wokings-fab-dismissed";

export function FloatingOrderButton() {
  const [visible, setVisible] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if already dismissed this session
    if (sessionStorage.getItem(DISMISSED_KEY) === "true") return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Close popover on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setPopoverOpen(false);
      }
    }

    if (popoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popoverOpen]);

  const dismiss = () => {
    setVisible(false);
    setPopoverOpen(false);
    sessionStorage.setItem(DISMISSED_KEY, "true");
  };

  if (!visible) return null;

  return (
    <div
      ref={popoverRef}
      className="fixed bottom-6 right-6 z-40 animate-slide-up-in"
    >
      {/* Popover Card */}
      {popoverOpen && (
        <div className="absolute bottom-[68px] right-0 w-[220px] rounded-2xl bg-white p-4 shadow-modal">
          {/* Header */}
          <div className="flex items-center justify-between">
            <span className="font-[family-name:var(--font-body)] text-sm font-semibold text-charcoal">
              Order Now
            </span>
            <button
              onClick={() => setPopoverOpen(false)}
              className="flex h-6 w-6 items-center justify-center rounded"
              aria-label="Close order popup"
            >
              <X className="h-4 w-4 text-muted" />
            </button>
          </div>

          {/* Subtext */}
          <p className="mt-2 font-[family-name:var(--font-body)] text-[13px] text-muted">
            Choose your platform:
          </p>

          {/* Zomato */}
          <a
            href={siteConfig.orderLinks.zomato}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-zomato font-[family-name:var(--font-body)] text-sm font-bold text-white transition-all duration-200 hover:bg-[#DC2626]"
          >
            🔴 Order on Zomato
          </a>

          {/* Swiggy */}
          <a
            href={siteConfig.orderLinks.swiggy}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-swiggy font-[family-name:var(--font-body)] text-sm font-bold text-white transition-all duration-200 hover:bg-[#EA580C]"
          >
            🟠 Order on Swiggy
          </a>

          {/* Dismiss link */}
          <button
            onClick={dismiss}
            className="mt-3 w-full text-center font-[family-name:var(--font-body)] text-xs text-muted transition-colors hover:text-charcoal"
          >
            Don&apos;t show again
          </button>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setPopoverOpen(!popoverOpen)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full shadow-float"
        style={{
          background: "linear-gradient(135deg, #E8490F, #C73D0A)",
        }}
        aria-label="Order food online"
      >
        {/* Pulse ring */}
        {!popoverOpen && (
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-primary/40" />
        )}
        <ShoppingBag className="relative z-10 h-6 w-6 text-white" />
      </button>
    </div>
  );
}
