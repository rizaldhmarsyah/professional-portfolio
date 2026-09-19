"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function StarParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width =
      canvas.parentElement?.offsetWidth || window.innerWidth);
    let height = (canvas.height =
      canvas.parentElement?.offsetHeight || window.innerHeight);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        width = canvas.width = entry.contentRect.width;
        height = canvas.height = entry.contentRect.height;
      }
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const starCount = 75;
    const stars: {
      x: number;
      y: number;
      size: number;
      opacity: number;
      speedY: number;
      speedX: number;
      pulseSpeed: number;
      color: string;
    }[] = [];

    const colors = ["#FFFFFF", "#F4EDE6", "#FB4516", "#FF7A00"];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        opacity: Math.random() * 0.7 + 0.2,
        speedY: (Math.random() * 0.35 + 0.08) * -1,
        speedX: (Math.random() - 0.5) * 0.12,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      stars.forEach((star) => {
        star.y += star.speedY;
        star.x += star.speedX;

        star.opacity += star.pulseSpeed;
        if (star.opacity > 0.9 || star.opacity < 0.2) {
          star.pulseSpeed = -star.pulseSpeed;
        }

        if (star.y < -10) {
          star.y = height + 10;
          star.x = Math.random() * width;
        }
        if (star.x < -10) star.x = width + 10;
        if (star.x > width + 10) star.x = -10;

        ctx.save();
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, star.opacity));

        if (star.color === "#FB4516" || star.color === "#FF7A00") {
          ctx.shadowBlur = 8;
          ctx.shadowColor = star.color;
        } else {
          ctx.shadowBlur = 3;
          ctx.shadowColor = "#FFFFFF";
        }

        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
    />
  );
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const titleLinesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const titleBlocksRef = useRef<(HTMLDivElement | null)[]>([]);

  // Ref Kontainer Kategori Kanan
  const categoryBlocksRef = useRef<(HTMLDivElement | null)[]>([]);

  const skillsParagraph =
    "I architect end-to-end full-stack web platforms and AI-driven solutions—combining scalable multi-database backends, serverless cloud caching, and pixel-perfect interactive frontend experiences.";

  const skillsData = [
    {
      category: "Frontend Development",
      count: "(01)",
      items: [
        "Next.js & React.js Integration",
        "PHP Dynamic UI Templating (Native / Blade)",
        "TypeScript / JavaScript (ES6+)",
        "Tailwind CSS & Modern UI Styling",
        "Responsive & Adaptive Layouts",
        "RESTful API Consumption & State",
      ],
    },
    {
      category: "Backend Development",
      count: "(02)",
      items: [
        "Laravel Framework & PHP (OOP & MVC)",
        "Node.js & Express API Basics",
        "PostgreSQL & MySQL Relational Database",
        "MongoDB & Mongoose Schema Design",
        "Authentication & Session Management",
      ],
    },
    {
      category: "Systems Analysis & Tools",
      count: "(03)",
      items: [
        "System Analysis & Database Design (ERD / UML)",
        "Google Cloud Platform (GCP) & Web Hosting",
        "Domain Management (DNS & SSL)",
        "Git & GitHub Version Control Workflows",
        "Vercel Deployment & Environment Setup",
        "Figma-to-Code Layout Translation",
      ],
    },
    {
      category: "AI Engine & Cloud Caching",
      count: "(04)",
      items: [
        "FastAPI & Python REST API Design",
        "LLM Integration (Google Gemini API) & Prompt Engineering", // <-- Perjelas LLM di sini
        "Real-time Web Search Scraping API (Tavily)",
        "Upstash Redis Cloud Caching & TTL Strategies",
        "Serverless Microservices Architecture",
      ],
    },
  ];

  // 1. Heading Orange Block Reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(titleBlocksRef.current, {
        scaleX: 1,
        transformOrigin: "left",
      });
      gsap.set(titleLinesRef.current, {
        y: "105%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(titleLinesRef.current, {
        y: "0%",
        duration: 0.85,
        stagger: 0.15,
        ease: "power4.out",
      }).to(
        titleBlocksRef.current,
        {
          scaleX: 0,
          transformOrigin: "right",
          duration: 0.95,
          stagger: 0.15,
          ease: "expo.inOut",
        },
        "-=0.45",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 2. Scrubbed Word-by-Word Animation untuk Deskripsi
  useEffect(() => {
    const ctx = gsap.context(() => {
      const validWords = wordsRef.current.filter(Boolean);
      if (!validWords.length) return;

      gsap.set(validWords, {
        opacity: 0.15,
        y: 12,
      });

      gsap.to(validWords, {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 85%",
          end: "top 45%",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // 3. Masked Slide Up Animation untuk Skills List Kanan (Robust Per-Block)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = categoryBlocksRef.current.filter(Boolean);

      blocks.forEach((block) => {
        if (!block) return;
        const animatedTexts = block.querySelectorAll(".mask-text");

        // Setup Awal: Sembunyikan 100% di bawah overflow-hidden
        gsap.set(animatedTexts, {
          y: "105%",
          opacity: 0,
        });

        // Jalankan slide up saat kelompok skill ini masuk layar
        gsap.to(animatedTexts, {
          y: "0%",
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: "top 80%", // Animasi mulai saat blok berada di 80% layar
            toggleActions: "play none none reverse",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0C0C0C] text-[#f4ede6] px-6 sm:px-12 md:px-16 lg:px-24 py-20 md:py-24 border-t border-white/10 select-none"
    >
      <StarParticles />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* KOLOM KIRI: Sticky Sidebar (Mobile: Merapat Rapi | Desktop: Sticky justify-between min-h-[45vh]) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col justify-start lg:justify-between min-h-0 lg:min-h-[45vh] py-2 gap-4 md:gap-6 lg:gap-0">
          <div>
            <div className="flex flex-col gap-1">
              <div className="relative overflow-hidden inline-block w-fit">
                <h2
                  ref={(el) => {
                    titleLinesRef.current[0] = el;
                  }}
                  className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.0] tracking-tight uppercase text-white"
                >
                  Technical
                </h2>
                <div
                  ref={(el) => {
                    titleBlocksRef.current[0] = el;
                  }}
                  className="absolute inset-0 bg-[#FB4516] z-10 pointer-events-none"
                />
              </div>

              <div className="relative overflow-hidden inline-block w-fit">
                <h2
                  ref={(el) => {
                    titleLinesRef.current[1] = el;
                  }}
                  className="font-sans font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.0] tracking-tight uppercase text-white"
                >
                  skill sets
                </h2>
                <div
                  ref={(el) => {
                    titleBlocksRef.current[1] = el;
                  }}
                  className="absolute inset-0 bg-[#FB4516] z-10 pointer-events-none"
                />
              </div>
            </div>

            <div className="w-full h-[1.5px] bg-white/20 my-4 md:my-6 max-w-[240px]" />
          </div>

          <div className="space-y-2 md:space-y-3 max-w-sm">
            <p
              ref={paragraphRef}
              className="font-sans text-xs sm:text-sm leading-relaxed text-[#f4ede6] flex flex-wrap gap-x-[0.28em] gap-y-1"
            >
              {skillsParagraph.split(" ").map((word, wIdx) => (
                <span
                  key={wIdx}
                  ref={(el) => {
                    wordsRef.current[wIdx] = el;
                  }}
                  className="inline-block will-change-transform"
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* KOLOM KANAN: Scrollable List dengan Masked Slide Up Animation */}
        <div className="lg:col-span-7 flex flex-col gap-12 md:gap-16 py-2">
          {skillsData.map((sectionItem, idx) => (
            <div
              key={idx}
              ref={(el) => {
                categoryBlocksRef.current[idx] = el;
              }}
              className="flex flex-col gap-4 md:gap-5"
            >
              {/* Header Skill */}
              <div className="flex items-baseline justify-between border-b border-white/20 pb-3">
                <div className="overflow-hidden inline-block">
                  <h3 className="font-sans font-bold text-2xl sm:text-3xl md:text-4xl text-white">
                    <span className="mask-text inline-block will-change-transform">
                      {sectionItem.category}
                    </span>
                  </h3>
                </div>
                <div className="overflow-hidden inline-block">
                  <span className="mask-text font-mono text-xs sm:text-sm text-[#f4ede6]/50 inline-block">
                    {sectionItem.count}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="flex flex-col">
                {sectionItem.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="flex justify-between items-center py-3 border-b border-white/10 hover:border-white/40 transition-colors group backdrop-blur-[1px]"
                  >
                    <div className="overflow-hidden inline-block">
                      <span className="font-sans text-base sm:text-lg text-white group-hover:text-[#f4ede6] transition-colors inline-block">
                        <span className="mask-text inline-block will-change-transform">
                          {item}
                        </span>
                      </span>
                    </div>

                    <div className="overflow-hidden inline-block">
                      <span className="mask-text font-mono text-[11px] sm:text-xs text-[#f4ede6]/40 group-hover:text-[#f4ede6]/80 inline-block">
                        {itemIdx + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
