import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import PopularPicksSection from "@/components/sections/PopularPicksSection";
import AboutTeaserSection from "@/components/sections/AboutTeaserSection";
import ReviewsTeaserSection from "@/components/sections/ReviewsTeaserSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <PopularPicksSection />
      <AboutTeaserSection />
      <ReviewsTeaserSection />

      {/*
        PHASE 4 PLACEHOLDER — do not build yet:
        <OrderCTABanner />        ← Phase 4
      */}
    </>
  );
}
