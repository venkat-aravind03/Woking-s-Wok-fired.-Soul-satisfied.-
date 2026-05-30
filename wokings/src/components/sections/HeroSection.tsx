"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Star, StarHalf, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/utils";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsymY8L6lkYSV8SLwjgwI6pTFsHsTksLvi3arT-NuPHD0ZWHD9htPfbayqHwG-Na642Ke-mshP4zfFrplz3THWM62c_ATXelfNoUv6-faa2ijQTqLaXobZZwEuQzd53GJQvPw8wPDXsx2S05n9vN63Pqh3yMebRMc4p5CRAUtTzMRVYnGOuuLg5htFZq-A7h_IsWNeS_GyBWx6aUmSDiyKqF2Akso6HbF5uO3iDMaydxUiFyEfxABA1QPN06ysIC6PrqGvASWQTlY"
        alt="Freshly cooked wok-fired food at Woking's, Kondapur"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark Overlay — gradient from bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(26,26,26,0.90) 0%, rgba(26,26,26,0.60) 50%, rgba(26,26,26,0.30) 100%)",
        }}
      />

      {/* Hero Content */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <div className="relative max-w-[900px] text-center">
          {/* Eyebrow */}
          <div
            className={`bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full mb-6 flex items-center gap-2 ${mounted ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "400ms" }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-[family-name:var(--font-body)] text-[13px] font-bold uppercase tracking-[0.12em] text-primary drop-shadow-sm">
              Welcome to Kondapur&apos;s Favourite
            </span>
          </div>

          {/* Main Headline — "Woking" per Stitch */}
          <h1
            className={`mt-4 font-[family-name:var(--font-heading)] text-[96px] font-bold leading-none text-white max-lg:text-[64px] max-md:text-[48px] ${mounted ? "animate-fade-in-up" : "opacity-0"}`}
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.7)",
              animationDelay: "600ms",
            }}
          >
            Woking
          </h1>

          {/* Subheadline — per Stitch */}
          <p
            className={`mt-2 font-[family-name:var(--font-heading)] text-[24px] md:text-[32px] italic text-white/90 ${mounted ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "800ms" }}
          >
            Exciting, Appetizing, Lip-smacking!!!
          </p>

          {/* Locations — pill style mapped from siteConfig */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 text-white/80 font-[family-name:var(--font-body)] text-base md:text-[15px] mb-10 mt-8 ${mounted ? "animate-fade-in" : "opacity-0"}`}
            style={{ animationDelay: "900ms" }}
          >
            {siteConfig.location.branches?.map((branch) => (
              <a
                key={branch.id}
                href={branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-black/30 px-5 py-2.5 rounded-full backdrop-blur-md hover:bg-black/50 hover:text-white transition-colors"
              >
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>{branch.label}</span>
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-lg ${mounted ? "animate-fade-in-up" : "opacity-0"}`}
            style={{ animationDelay: "1100ms" }}
          >
            <a
              href={siteConfig.orderLinks.zomato}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-zomato text-white px-8 py-4 rounded-xl font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-all hover:scale-105 flex justify-center items-center gap-2 shadow-lg"
            >
              Order on Zomato
            </a>
            <a
              href={siteConfig.orderLinks.swiggy}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-swiggy text-white px-8 py-4 rounded-xl font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-wide hover:opacity-90 transition-all hover:scale-105 flex justify-center items-center gap-2 shadow-lg"
            >
              Order on Swiggy
            </a>
            <Link
              href="/menu"
              className="w-full sm:w-auto bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-xl font-[family-name:var(--font-body)] text-sm font-bold uppercase tracking-wide hover:bg-white hover:text-charcoal transition-all flex justify-center items-center backdrop-blur-sm"
            >
              View Menu
            </Link>
          </div>

          {/* Floating Rating Badge — hidden on small screens */}
          <div
            className={`absolute top-16 right-0 md:-right-8 lg:-right-16 lg:top-8 hidden md:flex bg-charcoal/60 backdrop-blur-[12px] p-4 rounded-xl border border-white/10 items-center gap-3 shadow-2xl ${mounted ? "animate-bounce-in animate-float" : "opacity-0"}`}
            style={{ animationDelay: "1300ms" }}
          >
            <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
              {siteConfig.rating}
            </div>
            <div className="text-white text-left flex flex-col justify-center">
              <div className="flex text-yellow-400 gap-0.5">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <StarHalf className="w-4 h-4 fill-current" />
              </div>
              <div className="font-[family-name:var(--font-body)] text-[12px] font-medium text-white/70 mt-1 uppercase tracking-wider">
                Top Rated in Area
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/60 flex flex-col items-center gap-2 ${mounted ? "animate-fade-in" : "opacity-0"}`}
        style={{ animationDelay: "1500ms" }}
      >
        <span className="font-[family-name:var(--font-body)] text-[12px] font-medium tracking-widest uppercase">
          Explore
        </span>
        <ChevronDown className="h-5 w-5 animate-bounce-arrow" />
      </div>
    </section>
  );
}
