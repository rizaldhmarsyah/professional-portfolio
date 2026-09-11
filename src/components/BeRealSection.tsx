"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ShaderGradientCanvas = dynamic(
  () => import("shadergradient").then((mod) => mod.ShaderGradientCanvas),
  { ssr: false },
);
const ShaderGradient = dynamic(
  () => import("shadergradient").then((mod) => mod.ShaderGradient),
  { ssr: false },
);

export default function BeRealSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgWrapRef = useRef<HTMLDivElement>(null);
  const textWrapRef = useRef<HTMLDivElement>(null);

  // Interceptor warning THREE.Clock
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) {
        return;
      }
      originalWarn(...args);
    };

    return () => {
      console.warn = originalWarn;
    };
  }, []);

  // Parallax Speed Offset Animation (Background Gradient & Text Parallax)
  useEffect(() => {
    if (!sectionRef.current || !bgWrapRef.current || !textWrapRef.current)
      return;

    const ctx = gsap.context(() => {
      // 1. Paralaks Background Shader Gradient (Pergerakan Lambat)
      gsap.fromTo(
        bgWrapRef.current,
        { yPercent: -18 },
        {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Diberi smoothing scrub 1s agar gerakan ekstra halus
          },
        },
      );

      // 2. Paralaks Teks Utama (Ditingkatkan range-nya agar efek floating jauh lebih terasa)
      gsap.fromTo(
        textWrapRef.current,
        { yPercent: 25 },
        {
          yPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1, // Smooth scrub penyeimbang
          },
        },
      );

      // 3. Animasi Reveal Teks saat awal masuk Viewport
      gsap.fromTo(
        ".be-real-text",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[110vh] md:min-h-[140vh] bg-[#0C0C0C] overflow-hidden flex flex-col justify-center items-center py-24 md:py-32 select-none z-10"
    >
      {/* SHADER GRADIENT CANVAS BACKDROP */}
      <div
        ref={bgWrapRef}
        className="absolute inset-0 w-full h-[145%] -top-[22.5%] z-0 pointer-events-none will-change-transform"
      >
        <ShaderGradientCanvas
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {/* @ts-ignore */}
          <ShaderGradient
            animate="on"
            type="waterPlane"
            bgColor1="#000000"
            bgColor2="#000000"
            color1="#ff5005"
            color2="#dbba95"
            color3="#d0bce1"
            brightness={1.0}
            cAzimuthAngle={180}
            cDistance={2.8}
            cPolarAngle={80}
            cameraZoom={1}
            lightType="3d"
            grain="on"
            reflection={0.1}
            rotationX={0}
            rotationY={10}
            rotationZ={50}
            shader="defaults"
            uAmplitude={1.1}
            uDensity={1.2}
            uFrequency={5.5}
            uSpeed={0.3}
            uStrength={3.5}
          />
        </ShaderGradientCanvas>
      </div>

      {/* VIGNETTE OVERLAY */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(120% 90% at 50% 105%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 60%),
            radial-gradient(140% 100% at 50% -10%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 50%)
          `,
        }}
      />

      {/* TEXT CONTENT OVERLAY (DILENGKAPI PARALLAX SCRUB EKSTRA SMOOTH) */}
      <div
        ref={textWrapRef}
        className="relative z-20 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center pointer-events-none px-6 my-auto will-change-transform"
      >
        <h1 className="be-real-text font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[1.04] tracking-tight text-[#f4ede6]">
          Be Real
          <span className="inline-block text-[0.46em] font-normal align-[0.62em] ml-[0.06em] text-[#f4ede6]/60 font-serif">
            *
          </span>
        </h1>

        <h1 className="be-real-text font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[1.04] tracking-tight text-[#f4ede6]">
          Be Creative
          <span className="inline-block text-[0.46em] font-normal align-[0.62em] ml-[0.06em] text-[#f4ede6]/60 font-mono">
            #
          </span>
        </h1>

        <h1 className="be-real-text font-sans font-black text-5xl sm:text-7xl md:text-8xl lg:text-[110px] leading-[1.04] tracking-tight text-[#f4ede6]">
          Be Bold
          <span className="inline-block text-[0.46em] font-normal align-[0.62em] ml-[0.06em] text-[#f4ede6]/60">
            ™
          </span>
        </h1>
      </div>
    </section>
  );
}
