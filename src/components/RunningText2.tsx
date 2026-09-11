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
    <div className="relative w-full bg-[#FF4D00] py-3 sm:py-5 md:py-6 overflow-hidden select-none border-t border-b border-black/10">
      <div
        ref={sliderRef}
        className="relative flex whitespace-nowrap items-center"
      >
        <div
          ref={firstTextRef}
          className="flex items-center gap-8 pr-8 sm:gap-10 sm:pr-10 font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight uppercase"
        >
          <span>Let&apos;s connect</span>
          <span className="inline-flex items-center justify-center w-9 h-9 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 sm:border-3 border-white/40 text-white/60 font-serif text-xl sm:text-3xl md:text-4xl font-normal">
            &copy;
          </span>
          <span>Let&apos;s connect</span>
          <span className="inline-flex items-center justify-center w-9 h-9 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 sm:border-3 border-white/40 text-white/60 font-serif text-xl sm:text-3xl md:text-4xl font-normal">
            &copy;
          </span>
        </div>

        <div
          ref={secondTextRef}
          className="flex items-center gap-8 pr-8 sm:gap-10 sm:pr-10 font-sans font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white tracking-tight uppercase"
        >
          <span>Let&apos;s connect</span>
          <span className="inline-flex items-center justify-center w-9 h-9 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 sm:border-3 border-white/40 text-white/60 font-serif text-xl sm:text-3xl md:text-4xl font-normal">
            &copy;
          </span>
          <span>Let&apos;s connect</span>
          <span className="inline-flex items-center justify-center w-9 h-9 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full border-2 sm:border-3 border-white/40 text-white/60 font-serif text-xl sm:text-3xl md:text-4xl font-normal">
            &copy;
          </span>
        </div>
      </div>
    </div>
  );
}
