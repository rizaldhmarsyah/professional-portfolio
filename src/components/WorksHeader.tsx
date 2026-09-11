"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function WorksHeader() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const blocksRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Setup Awal: Blok oranye menutupi area teks & siap menyapu ke kanan
      gsap.set(blocksRef.current, {
        scaleX: 1,
        transformOrigin: "left",
      });
      gsap.set(linesRef.current, {
        y: "105%",
      });

      // 2. Timeline dipicu MURNI oleh ScrollTrigger tanpa delay
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Langsung eksekusi pas section kelihat 20% di layar
          toggleActions: "play none none reverse",
        },
      });

      // 3. Teks meluncur naik dari bawah di balik blok oranye
      tl.to(linesRef.current, {
        y: "0%",
        duration: 0.85,
        stagger: 0.15,
        ease: "power4.out",
      })

        // 4. Blok Oranye Menyapu Terbuka ke Kanan
        .to(
          blocksRef.current,
          {
            scaleX: 0,
            transformOrigin: "right", // Menyapu keluar ke arah kanan
            duration: 0.95,
            stagger: 0.15, // Jeda milidetik antar-baris (Work Experience -> & Projects)
            ease: "expo.inOut", // Kurva paling smooth & akseleratif
          },
          "-=0.45",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-20 w-full bg-[#0C0C0C] text-white px-6 md:px-10 pt-20 pb-16 border-t border-neutral-900/50 overflow-hidden"
    >
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="flex flex-col gap-1.5 max-w-xl">
          {/* Baris 1: Work Experience */}
          <div className="relative overflow-hidden inline-block w-fit">
            <h2
              ref={(el) => {
                linesRef.current[0] = el;
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.05]"
            >
              Work Experience
            </h2>
            {/* Blok Oranye Baris 1 */}
            <div
              ref={(el) => {
                blocksRef.current[0] = el;
              }}
              className="absolute inset-0 bg-[#FB4516] z-10 pointer-events-none"
            />
          </div>

          {/* Baris 2: & Projects */}
          <div className="relative overflow-hidden inline-block w-fit">
            <h2
              ref={(el) => {
                linesRef.current[1] = el;
              }}
              className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.05]"
            >
              &amp; Projects
            </h2>
            {/* Blok Oranye Baris 2 */}
            <div
              ref={(el) => {
                blocksRef.current[1] = el;
              }}
              className="absolute inset-0 bg-[#FB4516] z-10 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
