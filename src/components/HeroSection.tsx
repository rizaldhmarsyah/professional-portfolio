"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import HeroParticles from "./HeroParticles";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  // Ref Animasi Desktop
  const linesRef = useRef<(HTMLHeadingElement | HTMLSpanElement | null)[]>([]);
  const blockDevRef = useRef<HTMLDivElement>(null);
  const blockJktRef = useRef<HTMLDivElement>(null);

  // Ref Animasi Mobile
  const mobileLinesRef = useRef<
    (HTMLHeadingElement | HTMLSpanElement | null)[]
  >([]);
  const mobileBlockDevRef = useRef<HTMLDivElement>(null);
  const mobileBlockJktRef = useRef<HTMLDivElement>(null);

  // 1. Custom Interactive Cursor
  useEffect(() => {
    const cursor = cursorDotRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.3,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.3,
      ease: "power3.out",
    });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX - 5);
      yTo(e.clientY - 5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 2. Smooth Color Wipe Slide Animation (Desktop & Mobile)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Desktop Timeline
      const blocks = [blockJktRef.current, blockDevRef.current];
      const tl = gsap.timeline({ delay: 3 });
      tl.set(blocks, { scaleX: 1, transformOrigin: "left" });
      tl.to(linesRef.current, {
        y: "0%",
        duration: 0.85,
        stagger: 0.15,
        ease: "power4.out",
      }).to(
        blocks,
        {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.95,
          stagger: 0.15,
          ease: "expo.inOut",
        },
        "-=0.45",
      );

      // Mobile Timeline
      const mobileBlocks = [
        mobileBlockJktRef.current,
        mobileBlockDevRef.current,
      ];
      const mobileTl = gsap.timeline({ delay: 3 });
      mobileTl.set(mobileBlocks, { scaleX: 1, transformOrigin: "left" });
      mobileTl
        .to(mobileLinesRef.current, {
          y: "0%",
          duration: 0.85,
          stagger: 0.15,
          ease: "power4.out",
        })
        .to(
          mobileBlocks,
          {
            scaleX: 0,
            transformOrigin: "right",
            duration: 0.95,
            stagger: 0.15,
            ease: "expo.inOut",
          },
          "-=0.45",
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative bg-[#0C0C0C] text-[#E5E5E5] font-sans selection:bg-[#FB4516] selection:text-white overflow-hidden cursor-default w-full"
    >
      {/* 1. WebGL Particles Background */}
      <div className="absolute top-0 left-0 right-0 bottom-12 pointer-events-none z-[1] opacity-80 overflow-hidden">
        <HeroParticles />
      </div>

      {/* 2. Visual Background Asset */}
      <div className="absolute top-0 left-0 right-0 bottom-12 pointer-events-none z-0 opacity-60 mix-blend-screen overflow-hidden">
        <img
          src="/hero-bg.png"
          alt="Visual Background Texture"
          className="w-full h-full object-cover object-bottom"
        />
      </div>

      {/* Dynamic Interactive Cursor */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#FB4516] rounded-full pointer-events-none z-[999] hidden lg:block"
      />

      {/* =========================================================
          1. TAMPILAN DESKTOP
      ========================================================= */}
      <div className="hidden md:flex flex-col justify-between h-[86vh] min-h-[580px] px-10 pt-24 pb-4 relative z-10">
        <div className="grid grid-cols-12 gap-8 items-end my-auto py-4">
          {/* Photo Frame Desktop */}
          <div className="col-span-4 relative group">
            <div className="relative w-full max-w-[280px] aspect-[4/3] rounded-md overflow-hidden border border-neutral-800/80 bg-neutral-900/50 backdrop-blur-sm">
              <img
                src="/hero-1.webp"
                alt="Rizal Dhmarsyah"
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Headline Desktop */}
          <div className="col-span-8 flex flex-col justify-end">
            <div className="flex flex-col gap-1 text-left">
              <div className="relative overflow-hidden inline-block w-fit">
                <h1 className="text-5xl lg:text-6xl xl:text-[66px] font-semibold tracking-[-0.035em] leading-[1.05] text-white">
                  <span
                    ref={(el) => {
                      linesRef.current[0] = el;
                    }}
                    className="flex items-center gap-8 translate-y-[105%]"
                  >
                    <span className="text-xs text-neutral-500 font-mono tracking-wider font-normal shrink-0">
                      (About me)
                    </span>
                    <span>I&apos;m Rizal Dhmarsyah,</span>
                  </span>
                </h1>
              </div>

              <div className="relative overflow-hidden inline-block w-fit">
                <h1
                  ref={(el) => {
                    linesRef.current[1] = el;
                  }}
                  className="text-5xl lg:text-6xl xl:text-[66px] font-semibold tracking-[-0.035em] leading-[1.05] text-neutral-100 translate-y-[105%]"
                >
                  a Full-Stack Web Developer
                </h1>
                <div
                  ref={blockDevRef}
                  className="absolute inset-0 bg-[#FB4516] z-10 pointer-events-none"
                />
              </div>

              <div className="relative overflow-hidden inline-block w-fit">
                <h1
                  ref={(el) => {
                    linesRef.current[2] = el;
                  }}
                  className="text-5xl lg:text-6xl xl:text-[66px] font-semibold tracking-[-0.035em] leading-[1.05] text-white translate-y-[105%]"
                >
                  based in Jakarta.
                </h1>
                <div
                  ref={blockJktRef}
                  className="absolute inset-0 bg-[#FB4516] z-10 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Desktop */}
        <footer className="w-full flex items-center justify-between pt-4 border-t border-neutral-900/80 text-xs font-mono text-neutral-500 z-10">
          <div>/2026/</div>
          <div className="uppercase tracking-widest text-[11px]">
            Scroll down
          </div>
          <a
            href="/RIZAL NUR DHMARSYAH_CV_EN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 border border-neutral-800 hover:border-neutral-600 px-5 py-2 rounded-full text-white text-xs font-sans tracking-wide transition-all hover:bg-white hover:text-black cursor-pointer"
          >
            <span>Preview CV</span>
            <span className="text-xs">↗</span>
          </a>
        </footer>
      </div>

      {/* =========================================================
          2. TAMPILAN MOBILE
      ========================================================= */}
      <div className="flex md:hidden flex-col px-5 pt-16 pb-3 relative z-10 space-y-4">
        {/* 1. GAMBAR PALING ATAS */}
        <div className="w-full flex justify-center pt-1">
          <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] rounded-md overflow-hidden border border-neutral-800/80 bg-neutral-900/50 backdrop-blur-sm shadow-xl">
            <img
              src="/hero-1.webp"
              alt="Rizal Dhmarsyah"
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
        </div>

        {/* 2. HEADLINE TEKS DI TENGAH */}
        <div className="flex flex-col gap-0.5 text-left">
          <span className="text-[11px] text-neutral-500 font-mono tracking-wider font-normal block mb-0.5">
            (About me)
          </span>

          <div className="relative overflow-hidden inline-block w-fit">
            <h1 className="text-[26px] sm:text-3xl font-semibold tracking-tight leading-[1.12] text-white">
              <span
                ref={(el) => {
                  mobileLinesRef.current[0] = el;
                }}
                className="block translate-y-[105%]"
              >
                I&apos;m Rizal Dhmarsyah,
              </span>
            </h1>
          </div>

          <div className="relative overflow-hidden inline-block w-fit">
            <h1
              ref={(el) => {
                mobileLinesRef.current[1] = el;
              }}
              className="text-[26px] sm:text-3xl font-semibold tracking-tight leading-[1.12] text-neutral-100 translate-y-[105%]"
            >
              a Full-Stack Web Developer
            </h1>
            <div
              ref={mobileBlockDevRef}
              className="absolute inset-0 bg-[#FB4516] z-10 pointer-events-none"
            />
          </div>

          <div className="relative overflow-hidden inline-block w-fit">
            <h1
              ref={(el) => {
                mobileLinesRef.current[2] = el;
              }}
              className="text-[26px] sm:text-3xl font-semibold tracking-tight leading-[1.12] text-white translate-y-[105%]"
            >
              based in Jakarta.
            </h1>
            <div
              ref={mobileBlockJktRef}
              className="absolute inset-0 bg-[#FB4516] z-10 pointer-events-none"
            />
          </div>
        </div>

        {/* 3. FOOTER BAR MOBILE */}
        <footer className="w-full flex items-center justify-between pt-2.5 border-t border-neutral-900/80 text-[10px] font-mono text-neutral-500">
          <div>/2026/</div>
          <div className="uppercase tracking-widest text-[9px] text-neutral-400 font-mono">
            SCROLL DOWN
          </div>
          <a
            href="/RIZAL NUR DHMARSYAH_CV_EN.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 border border-neutral-800 px-3 py-1 rounded-full text-white text-[10px] font-sans tracking-wide active:scale-95 transition-transform cursor-pointer"
          >
            <span>Preview CV</span>
            <span className="text-[9px]">↗</span>
          </a>
        </footer>
      </div>
    </div>
  );
}
