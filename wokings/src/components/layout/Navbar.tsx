"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn, siteConfig } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

function WokIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2C11.5 4 10 5 9 6C8 7 7.5 8 8 9.5C8.5 11 10 12 12 12C14 12 15.5 11 16 9.5C16.5 8 16 7 15 6C14 5 12.5 4 12 2Z"
        fill="#E8490F"
        opacity="0.9"
      />
      <path
        d="M7 6C6.5 7.5 6.5 8 7 9C7.5 10 8 10.5 8 10.5"
        stroke="#E8490F"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M17 6C17.5 7.5 17.5 8 17 9C16.5 10 16 10.5 16 10.5"
        stroke="#E8490F"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M4 14C4 14 5 18 8 20C10 21.3 14 21.3 16 20C19 18 20 14 20 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 14H21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M20 14L22 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          scrolled
            ? "bg-white/95 backdrop-blur-[12px] shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-[80px] lg:h-[72px] max-lg:h-[64px] max-lg:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <WokIcon
              className={cn(
                "transition-colors duration-300",
                scrolled ? "text-charcoal" : "text-white"
              )}
            />
            <span
              className={cn(
                "font-[family-name:var(--font-heading)] text-2xl font-bold transition-colors duration-300 max-lg:text-xl",
                scrolled ? "text-charcoal" : "text-white"
              )}
            >
              {siteConfig.name}
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-9 lg:flex">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative font-[family-name:var(--font-body)] text-[15px] font-semibold transition-colors duration-200",
                    isActive
                      ? "text-primary"
                      : scrolled
                        ? "text-soft-dark hover:text-primary"
                        : "text-white hover:text-primary"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-200 ease-out",
                      isActive
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={siteConfig.orderLinks.zomato}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center rounded-lg bg-zomato px-4 font-[family-name:var(--font-body)] text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#DC2626]"
            >
              Order on Zomato
            </a>
            <a
              href={siteConfig.orderLinks.swiggy}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 items-center rounded-lg bg-swiggy px-4 font-[family-name:var(--font-body)] text-sm font-bold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#EA580C]"
            >
              Order on Swiggy
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className={cn(
              "flex items-center justify-center lg:hidden",
              "h-11 w-11 rounded-lg transition-colors duration-300"
            )}
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label={drawerOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative h-6 w-6">
              <Menu
                className={cn(
                  "absolute inset-0 h-6 w-6 transition-all duration-300",
                  scrolled ? "text-soft-dark" : "text-white",
                  drawerOpen
                    ? "rotate-90 opacity-0"
                    : "rotate-0 opacity-100"
                )}
              />
              <X
                className={cn(
                  "absolute inset-0 h-6 w-6 transition-all duration-300",
                  scrolled ? "text-soft-dark" : "text-white",
                  drawerOpen
                    ? "rotate-0 opacity-100"
                    : "-rotate-90 opacity-0"
                )}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[49] bg-black/40 transition-opacity duration-300 lg:hidden",
          drawerOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={closeDrawer}
      />

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-[51] h-full w-[280px] max-[380px]:w-full bg-white shadow-modal transition-transform duration-300 ease-in-out lg:hidden",
          drawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col p-6">
          {/* Drawer Header */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2"
              onClick={closeDrawer}
            >
              <WokIcon className="text-charcoal" />
              <span className="font-[family-name:var(--font-heading)] text-xl font-bold text-charcoal">
                {siteConfig.name}
              </span>
            </Link>
            <button
              onClick={closeDrawer}
              className="flex h-11 w-11 items-center justify-center rounded-lg"
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-charcoal" />
            </button>
          </div>

          {/* Drawer Nav Links */}
          <nav className="mt-8 flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeDrawer}
                  className={cn(
                    "flex h-14 items-center border-b border-[#F0F0F0] font-[family-name:var(--font-body)] text-[17px] font-semibold transition-colors duration-150",
                    isActive
                      ? "border-l-[3px] border-l-primary pl-4 text-primary"
                      : "text-charcoal hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Drawer Order Buttons */}
          <div className="mt-6">
            <p className="font-[family-name:var(--font-body)] text-xs font-bold uppercase tracking-[0.12em] text-muted">
              Order Online
            </p>
            <a
              href={siteConfig.orderLinks.zomato}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-zomato font-[family-name:var(--font-body)] text-sm font-bold text-white transition-all duration-200 hover:bg-[#DC2626]"
            >
              Order on Zomato
            </a>
            <a
              href={siteConfig.orderLinks.swiggy}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex h-12 w-full items-center justify-center rounded-xl bg-swiggy font-[family-name:var(--font-body)] text-sm font-bold text-white transition-all duration-200 hover:bg-[#EA580C]"
            >
              Order on Swiggy
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
