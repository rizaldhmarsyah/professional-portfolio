"use client";

import HeroSection from "./HeroSection";
import RunningText from "./RunningText";

export default function HeroWrapper() {
  return (
    /* Posisi sticky top-0 dan z-0 membuat Hero & RunningText tertahan diam di layar */
    <div className="sticky top-0 w-full z-0 overflow-hidden">
      <HeroSection />
      <RunningText />
    </div>
  );
}
