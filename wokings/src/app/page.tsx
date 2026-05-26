import HeroSection from "@/components/sections/HeroSection";
import StatsBar from "@/components/sections/StatsBar";
import PopularPicksSection from "@/components/sections/PopularPicksSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <PopularPicksSection />

      {/*
        PHASE 3 PLACEHOLDER — do not build yet:
        <AboutTeaserSection />    ← Phase 3
        <ReviewsTeaserSection />  ← Phase 3
        <OrderCTABanner />        ← Phase 4
      */}
    </>
  );
}
