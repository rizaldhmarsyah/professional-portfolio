"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HorizontalShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Menghitung total jarak pergeseran horizontal 3 kotak
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${getScrollAmount()}`,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-[#0A0A0A]"
    >
      {/* Track Pembungkus 3 Kotak Horizontal */}
      <div ref={trackRef} className="flex h-full w-max will-change-transform">
        {/* ==================== KOTAK 1: SERVICES ==================== */}
        <div className="w-screen h-full flex-shrink-0 bg-gradient-to-br from-[#FF4E00] via-[#F93800] to-[#E02E00] p-8 sm:p-12 md:p-16 flex flex-col justify-between relative overflow-hidden text-white select-none">
          {/* Header */}
          <div className="flex justify-between items-center z-10">
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase bg-black/20 border border-white/20 px-3.5 py-1 rounded-full backdrop-blur-md">
              Capabilities & Focus
            </span>
            <span className="text-xs md:text-sm font-mono opacity-90 font-medium">
              ( 01 / 03 )
            </span>
          </div>

          {/* Typography "SERVICES *" & Floating Badges */}
          <div className="my-auto z-10 relative w-full max-w-6xl mx-auto flex items-center justify-center py-12 md:py-16">
            <h2 className="text-[13vw] md:text-[11vw] font-extrabold tracking-tighter leading-none text-white select-none uppercase whitespace-nowrap">
              SERVICES <span className="text-black/30">*</span>
            </h2>

            {/* Badges di luar teks SERVICES */}
            <div className="absolute -top-4 sm:-top-8 md:-top-10 left-[5%] sm:left-[18%] z-20 backdrop-blur-md bg-white/20 border border-white/30 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide shadow-lg whitespace-nowrap">
              Web Development
            </div>

            <div className="absolute -bottom-4 sm:-bottom-8 md:-bottom-10 left-[2%] sm:left-[10%] z-20 backdrop-blur-md bg-white/20 border border-white/30 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide shadow-lg whitespace-nowrap">
              Full Stack Architecture
            </div>

            <div className="absolute top-[10%] sm:top-[15%] right-0 sm:right-[5%] z-20 backdrop-blur-md bg-white/20 border border-white/30 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide shadow-lg whitespace-nowrap">
              AI & Web Systems
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end z-10 border-t border-white/20 pt-4">
            <p className="text-xs sm:text-sm font-light max-w-md text-white/90">
              Crafting modern web applications with seamless dynamic
              interactions and clean code.
            </p>
            <span className="text-xs font-mono tracking-wider opacity-90 font-semibold flex items-center gap-1">
              SCROLL HORIZONTAL ➔
            </span>
          </div>
        </div>

        {/* ==================== KOTAK 2: FOKUS GITHUB & REPOSITORIES ==================== */}
        <div className="w-screen h-full flex-shrink-0 bg-[#0D0D0D] p-8 sm:p-12 md:p-16 flex flex-col justify-between relative overflow-hidden text-white select-none border-l border-white/10">
          {/* Header */}
          <div className="flex justify-between items-center z-10">
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-white/50">
              Code & Repositories
            </span>
            <span className="text-xs md:text-sm font-mono opacity-80 text-white/50">
              ( 02 / 03 )
            </span>
          </div>

          {/* Fokus Ajakan GitHub */}
          <div className="my-auto z-10 max-w-4xl mx-auto w-full flex flex-col items-center text-center gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-xs sm:text-sm font-mono text-amber-500 uppercase tracking-widest font-semibold">
                Want to explore more projects?
              </span>
              <h3 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight font-sans text-white">
                Check out all my open-source work & full repositories on GitHub.
              </h3>
            </div>

            {/* Tombol GitHub */}
            <a
              href="https://github.com/rizaldhmarsyah"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-4 bg-neutral-900 border border-neutral-700/80 hover:border-white/50 px-8 py-5 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <div className="p-2.5 rounded-xl bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-colors">
                <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>

              <div className="flex flex-col text-left">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  Explore Codebase
                </span>
                <span className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  Check projects on GitHub
                  <span className="text-xl transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    ↗
                  </span>
                </span>
              </div>
            </a>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end z-10 border-t border-white/10 pt-4">
            <span className="text-xs font-mono text-neutral-500">
              GITHUB.COM
            </span>
            <span className="text-xs font-mono text-neutral-500">
              SCROLL HORIZONTAL ➔
            </span>
          </div>
        </div>

        {/* ==================== KOTAK 3: KATA-KATA STATEMENT ==================== */}
        <div className="w-screen h-full flex-shrink-0 bg-[#070707] p-8 sm:p-12 md:p-16 flex flex-col justify-between relative overflow-hidden text-white select-none border-l border-white/10">
          {/* Header */}
          <div className="flex justify-between items-center z-10">
            <span className="text-xs md:text-sm font-mono tracking-widest uppercase text-white/50">
              Philosophy & Impact
            </span>
            <span className="text-xs md:text-sm font-mono opacity-80 text-white/50">
              ( 03 / 03 )
            </span>
          </div>

          {/* Statement yang Berkesan */}
          <div className="my-auto z-10 max-w-5xl mx-auto w-full text-center">
            <blockquote className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-snug font-sans text-neutral-100">
              "I build experiences that get under your skin — where the visual
              stops you, the interaction pulls you in, and the architecture
              stays rock solid."
            </blockquote>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end z-10 border-t border-white/10 pt-4">
            <span className="text-xs font-mono text-neutral-500">
              DESIGN & SYSTEM ARCHITECTURE
            </span>
            <span className="text-xs font-mono text-neutral-500">
              SCROLL DOWN ⬇
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
