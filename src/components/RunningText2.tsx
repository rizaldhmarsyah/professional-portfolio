"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function RunningText2() {
  const firstTextRef = useRef<HTMLDivElement>(null);
  const secondTextRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  let xPercent = 0;
  const direction = -1;

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (xPercent <= -100) {
        xPercent = 0;
      }
      if (xPercent > 0) {
        xPercent = -100;
      }

      if (firstTextRef.current && secondTextRef.current) {
        gsap.set(firstTextRef.current, { xPercent: xPercent });
        gsap.set(secondTextRef.current, { xPercent: xPercent });
      }

      xPercent += 0.08 * direction;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full bg-[#FF4D00] py-6 sm:py-8 overflow-hidden select-none border-t border-b border-black/10">
      <div
        ref={sliderRef}
        className="relative flex whitespace-nowrap items-center"
      >
        <div
          ref={firstTextRef}
          className="flex items-center gap-12 pr-12 font-sans font-black text-6xl sm:text-8xl md:text-9xl text-white tracking-tight uppercase"
        >
          <span>Let&apos;s connect</span>
          <span className="inline-flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 rounded-full border-4 border-white/40 text-white/60 font-serif text-3xl sm:text-5xl font-normal">
            &copy;
          </span>
          <span>Let&apos;s connect</span>
          <span className="inline-flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 rounded-full border-4 border-white/40 text-white/60 font-serif text-3xl sm:text-5xl font-normal">
            &copy;
          </span>
        </div>

        <div
          ref={secondTextRef}
          className="flex items-center gap-12 pr-12 font-sans font-black text-6xl sm:text-8xl md:text-9xl text-white tracking-tight uppercase"
        >
          <span>Let&apos;s connect</span>
          <span className="inline-flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 rounded-full border-4 border-white/40 text-white/60 font-serif text-3xl sm:text-5xl font-normal">
            &copy;
          </span>
          <span>Let&apos;s connect</span>
          <span className="inline-flex items-center justify-center w-12 h-12 sm:w-20 sm:h-20 rounded-full border-4 border-white/40 text-white/60 font-serif text-3xl sm:text-5xl font-normal">
            &copy;
          </span>
        </div>
      </div>
    </div>
  );
}
