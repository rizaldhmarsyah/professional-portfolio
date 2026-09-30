"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RunningText from "@/components/RunningText";
import RunningText2 from "@/components/RunningText2";
import RunningText3 from "@/components/RunningText3";
import WorksHeader from "@/components/WorksHeader";
import ProjectSection from "@/components/ProjectSection";
import BeRealSection from "@/components/BeRealSection";
import SkillsSection from "@/components/SkillsSection";
import FooterSection from "@/components/FooterSection";
import AboutSection from "@/components/AboutSection";
import HorizontalShowcaseSection from "@/components/HorizontalShowcaseSection";

export default function Home() {
  const [isPreloaderActive, setIsPreloaderActive] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Deteksi Mobile Screen
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (currentScroll > totalHeight * 0.4) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SmoothScroll>
      <main className="relative bg-[#0C0C0C]">
        {/* GLOBAL FLOATING NAVBAR */}
        <Navbar />

        {isPreloaderActive && (
          <Preloader onComplete={() => setIsPreloaderActive(false)} />
        )}

        {/* LAYER 0 (BELAKANG ATAS): Hero Section */}
        {isClient && isMobile ? (
          /* MOBILE LAYOUT: Normal Flow Tanpa Sticky Height Locking */
          <div className="relative z-0 w-full bg-[#0C0C0C]">
            <HeroSection />
            <RunningText />
          </div>
        ) : (
          /* DESKTOP LAYOUT: 100% ASLI & STICKY UNTOUCHED */
          <div className="sticky top-0 z-0 w-full min-h-screen flex flex-col justify-between">
            <HeroSection />
            <RunningText />
          </div>
        )}

        {/* LAYER DEPAN (Z-10): Content Flow */}
        <div className="relative z-10 bg-[#0C0C0C] shadow-[0_30px_60px_rgba(0,0,0,0.95)]">
          <div className="relative z-20 bg-[#0C0C0C]">
            <AboutSection />
            <WorksHeader />
            <ProjectSection />
            <HorizontalShowcaseSection />
          </div>

          <div className="relative z-30 bg-[#0C0C0C]">
            <SkillsSection />
          </div>
          <div className="relative z-10">
            <BeRealSection />
          </div>
          <div className="relative z-30 bg-[#0C0C0C] shadow-[0_30px_60px_rgba(0,0,0,0.95)]">
            <RunningText2 />
          </div>
        </div>

        {/* LAYER 0 (BELAKANG BAWAH): Footer Parallax Reveal */}
        <div
          className={`sticky bottom-0 z-0 w-full transition-opacity duration-300 ${
            showFooter
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <FooterSection />
        </div>
      </main>
    </SmoothScroll>
  );
}
