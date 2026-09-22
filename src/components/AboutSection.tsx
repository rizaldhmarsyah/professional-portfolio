// src/components/AboutSection.tsx
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);

  // Ref Animasi Header Block Wipe
  const lineRef = useRef<HTMLHeadingElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  const bioText =
    "Hi! I'm Rizal, a Fullstack Web Developer & AI Systems Engineer with an academic background in Information Systems. I specialize in architecting scalable web platforms, robust backend infrastructures, and applied artificial intelligence solutions. By bridging modern software engineering with Agentic AI capabilities, I design autonomous workflows and digital products focused on driving measurable business value, operational efficiency, and seamless user experiences.";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Animasi Header Wipe Block Oranye
      if (blockRef.current && lineRef.current) {
        gsap.set(blockRef.current, { scaleX: 1, transformOrigin: "left" });
        gsap.set(lineRef.current, { y: "105%" });

        const headerTl = gsap.timeline({
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });

        headerTl
          .to(lineRef.current, {
            y: "0%",
            duration: 0.85,
            ease: "power4.out",
          })
          .to(
            blockRef.current,
            {
              scaleX: 0,
              transformOrigin: "right",
              duration: 0.95,
              ease: "expo.inOut",
            },
            "-=0.45",
          );
      }

      // 2. Animasi Avatar Card
      if (cardRef.current) {
        gsap.from(cardRef.current, {
          opacity: 0,
          y: 40,
          scale: 0.95,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // 3. Animasi Word-by-Word Scroll Reveal untuk Teks Bio
      if (bioRef.current) {
        const words = bioRef.current.querySelectorAll(".bio-word");

        gsap.to(words, {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: {
            trigger: bioRef.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative z-20 w-full bg-[#0C0C0C] text-white px-6 md:px-12 lg:px-20 py-24 border-t border-neutral-900/80"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10 lg:gap-14">
        {/* 1. JUDUL ABOUT ME (POSISI PALING ATAS, DI ATAS KOTAK AVATAR & TEKS "HI") */}
        <div className="relative overflow-hidden inline-block w-fit">
          <h2
            ref={lineRef}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] leading-[1.05]"
          >
            About Me
          </h2>
          <div
            ref={blockRef}
            className="absolute inset-0 bg-[#FB4516] z-10 pointer-events-none"
          />
        </div>

        {/* 2. MAIN CONTENT GRID (2 KOLOM: AVATAR & TEKS BIO BERJALAN SEJAJAR) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* KOLOM KIRI: AVATAR CARD (STICKY DI SCREEN & SEJAJAR DENGAN TEKS "HI") */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start z-10 w-full flex justify-center lg:justify-start">
            <div
              ref={cardRef}
              className="relative w-full max-w-sm rounded-2xl bg-neutral-900/60 border border-neutral-800/80 p-6 flex flex-col items-center text-center gap-5 backdrop-blur-sm shadow-2xl hover:border-neutral-700/80 transition-colors"
            >
              {/* AVATAR BADGE */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-b from-neutral-800 to-neutral-900 p-1 border border-neutral-700/60 shadow-inner">
                <div className="w-full h-full rounded-full overflow-hidden relative bg-neutral-950 flex items-center justify-center">
                  <Image
                    src="/man.png"
                    alt="Rizal Nur Dhmarsyah"
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* IDENTITY & STATUS */}
              <div className="flex flex-col items-center gap-1">
                <h3 className="text-xl font-medium tracking-tight text-white">
                  Rizal Nur Dhmarsyah
                </h3>
                <p className="text-xs font-mono text-neutral-400">
                  Software &amp; AI Systems Engineer
                </p>
              </div>

              {/* STATUS BADGE */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Based in Jakarta, IDN</span>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: TEKS SCROLLABLE (SEJAJAR ATAS DENGAN KOTAK AVATAR) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p
              ref={bioRef}
              className="text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed text-neutral-100 tracking-tight"
            >
              {bioText
                .trim()
                .split(/\s+/)
                .map((word, index) => (
                  <span
                    key={index}
                    className="bio-word inline-block mr-[0.28em] opacity-20"
                  >
                    {word}
                  </span>
                ))}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
