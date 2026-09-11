"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const brandName = "Rizal Dhmarsyah®";

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
          if (onComplete) onComplete();
        },
      });

      // 1. Setup Awal
      // Judul: Spotlight Reveal
      tl.set(lettersRef.current, {
        opacity: 0.15,
        scale: 0.85,
        y: "0%",
      })
        // Subtitle: Reveal Wipe (Sembunyi dengan clip-path dari kanan ke kiri)
        .set(subtitleRef.current, {
          opacity: 1,
          y: "0%",
          clipPath: "inset(0% 100% 0% 0%)", // Tertutup penuh di awal
        });

      // 2. ANIMASI IN
      // Judul: Spotlight Reveal dari tengah
      tl.to(lettersRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.65,
        ease: "power2.out",
        stagger: {
          each: 0.045,
          from: "center",
        },
      })
        // Subtitle: REVEAL WIPE (Disapu terbuka dari kiri ke kanan)
        .to(
          subtitleRef.current,
          {
            clipPath: "inset(0% 0% 0% 0%)", // Terbuka penuh 100%
            duration: 0.75,
            ease: "power3.inOut",
          },
          "-=0.35",
        )

        // Hold Singkat
        .to({}, { duration: 0.4 })

        // 3. ANIMASI OUT
        // Subtitle: Meluncur TURUN KE BAWAH
        .to(
          subtitleRef.current,
          {
            y: "140%",
            opacity: 0,
            duration: 0.65,
            ease: "power3.inOut",
          },
          "out",
        )
        // Judul: Meluncur NAIK KE ATAS
        .to(
          lettersRef.current,
          {
            y: "-140%",
            opacity: 0,
            scale: 1.05,
            duration: 0.7,
            ease: "power3.inOut",
            stagger: {
              each: 0.025,
              from: "center",
            },
          },
          "out-=0.1",
        )

        // 4. Horizontal Split (Tirai Oranye Terbelah Dua)
        .to(
          topCurtainRef.current,
          {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
          },
          "split",
        )
        .to(
          bottomCurtainRef.current,
          {
            yPercent: 100,
            duration: 1,
            ease: "power4.inOut",
          },
          "split",
        );
    });

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden">
      {/* Tirai Atas */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 w-full h-[50vh] bg-[#FB4516] text-white flex items-end justify-center pb-1 px-6"
      >
        {/* Kontainer Atas: Mask Gradien ke Atas */}
        <div
          className="flex items-end justify-center h-28 md:h-36 px-4 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
          }}
        >
          {brandName.split("").map((letter, index) => (
            <span
              key={index}
              ref={(el) => {
                lettersRef.current[index] = el;
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight inline-block whitespace-pre will-change-transform py-1"
            >
              {letter}
            </span>
          ))}
        </div>
      </div>

      {/* Tirai Bawah */}
      <div
        ref={bottomCurtainRef}
        className="absolute bottom-0 left-0 w-full h-[50vh] bg-[#FB4516] text-white flex items-start justify-center pt-1 px-6"
      >
        {/* Kontainer Bawah: Mask Gradien ke Bawah untuk Out Effect Turun */}
        <div
          className="flex items-start justify-center h-20 md:h-24 px-4 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)",
          }}
        >
          <p
            ref={subtitleRef}
            className="text-sm md:text-lg tracking-widest uppercase font-mono opacity-90 will-change-transform py-1 inline-block"
          >
            Full-Stack Web Developer
          </p>
        </div>
      </div>
    </div>
  );
}
