"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: string;
  type: "experience" | "project";
  typeLabel: string;
  title: string;
  company?: string;
  period?: string;
  category?: string;
  tags?: string[];
  description: string;
  about?: string;
  link?: string;
  status?: string;
  bgImage: string;
  images: string[];
}

const PROJECTS: Project[] = [
  {
    id: "01",
    type: "experience",
    typeLabel: "WORK EXPERIENCE",
    title: "WEB ADMINISTRATOR - Intern",
    company: "Lembaga Layanan Pendidikan Tinggi (LLDIKTI) Wilayah III Jakarta",
    period: "September 2025 - February 2026",
    description:
      "Spearheaded an end-to-end revamp of the official website to significantly elevate performance and user experience. Handled full-stack development responsibilities by restructuring the modern front-end interface, optimizing underlying database systems, and managing ongoing platform maintenance.",
    about:
      "LLDIKTI Wilayah III Jakarta is an official government agency under the Ministry of Higher Education, Science, and Technology, tasked with supervising and improving higher education quality across Jakarta.",
    link: "#",
    bgImage: "/ai-bg.webp",
    images: ["/adia-1.webp", "/adia-3.webp", "/adia-2.webp", "/adia-4.webp"],
  },
  {
    id: "02",
    type: "experience",
    typeLabel: "WORK EXPERIENCE",
    title: "Frontend Web Developer - Intern",
    company: "PT. Amal Ichwan Arindo",
    period: "Maret 2025 - August 2025",
    description:
      "Developed and launched an end-to-end recruitment platform using React.js and Next.js. Crafted highly responsive UI components with Framer Motion and Tailwind CSS, backed by seamless API integrations to ensure optimal performance.",
    about:
      "PT. Amal Ichwan Arindo is a professional human resource and talent acquisition agency delivering modern workforce solutions and staffing services.",
    link: "#",
    bgImage: "/sm-bg.webp",
    images: ["/sm-1.webp", "/sm-2.webp", "/sm-3.webp"],
  },
  {
    id: "03",
    type: "project",
    typeLabel: "FEATURED PROJECT",
    title: "Pixel Sticker",
    category: "Real Project Website",
    tags: ["Full Stack Website", "AI Chatbot"],
    description:
      "Designed and built a complete digital ecosystem for Pixel Sticker. Combines a modern customer-facing web platform featuring AI-assisted customer service and instant pricing estimation with an internal administrative portal for managing vehicle databases, materials, workshop POS invoices, and real-time financial analytics.",
    about:
      "Pixel Sticker is a specialized automotive workshop offering premium Paint Protection Film (PPF), vinyl wraps, and custom cutting sticker services with high-precision craftsmanship.",
    link: "https://pixelsticker.biz.id",
    bgImage: "/ps-bg.webp",
    images: [
      "/ps-1.webp",
      "/ps-5.webp",
      "/ps-2.webp",
      "/ps-3.webp",
      "/ps-4.webp",
    ],
  },
  {
    id: "04",
    type: "project",
    typeLabel: "FEATURED PROJECT",
    title: "Barcainspo",
    category: "Real Project Website",
    tags: ["NEXT.JS", "FULL STACK", "CMS BACKEND", "LIVE EDITOR"],
    description:
      "A custom full-stack digital publishing platform built to power a high-traffic football media brand. Features a custom CMS admin dashboard with live article preview, dynamic content categorization (La Masia, First Team, Transfers), and seamless live Instagram feed integrations.",
    about:
      "Barcainspo is an independent digital media platform dedicated to FC Barcelona news, tactical analysis, and football culture—consistently generating 1 to 6 million monthly impressions across its media channels.",
    link: "#",
    bgImage: "/bi-bg.webp",
    images: [
      "/bi-1.webp",
      "/bi-2.webp",
      "/bi-3.webp",
      "/bi-4.webp",
      "/bi-5.webp",
      "/bi-6.webp",
    ],
  },
];

// Continuous Repeating Scramble Text Component
function ScrambleText({ text, active }: { text: string; active: boolean }) {
  const [displayText, setDisplayText] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    if (!active) {
      setDisplayText(text);
      return;
    }

    let timeoutId: NodeJS.Timeout;

    const startScramble = () => {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join(""),
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          timeoutId = setTimeout(startScramble, 2500);
        }

        iteration += 1 / 2;
      }, 30);
    };

    startScramble();

    return () => {
      clearTimeout(timeoutId);
    };
  }, [active, text]);

  return <span>{displayText}</span>;
}

function StackedBrowserMockup({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const getCardStyle = (idx: number, total: number, active: number) => {
    const relIdx = (idx - active + total) % total;

    if (relIdx === 0) {
      return {
        width: "100%",
        top: "0px",
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 10,
      };
    } else if (relIdx === 1) {
      return {
        width: "84.24%",
        top: "-12px",
        filter: "blur(1px)",
        opacity: 0.85,
        zIndex: 8,
      };
    } else if (relIdx === 2) {
      return {
        width: "65.18%",
        top: "-20px",
        filter: "blur(2px)",
        opacity: 0.6,
        zIndex: 6,
      };
    } else {
      return {
        width: "70%",
        top: "-28px",
        filter: "blur(4px)",
        opacity: 0,
        zIndex: 0,
      };
    }
  };

  const cycleCards = () => {
    if (isAnimating.current || images.length <= 1) return;
    isAnimating.current = true;

    const cards = containerRef.current?.querySelectorAll(".image-wrapper");
    if (!cards || cards.length === 0) return;

    const nextIdx = (activeIdx + 1) % images.length;
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveIdx(nextIdx);
        isAnimating.current = false;
      },
    });

    cards.forEach((card, idx) => {
      const targetStyle = getCardStyle(idx, images.length, nextIdx);

      tl.to(
        card,
        {
          width: targetStyle.width,
          top: targetStyle.top,
          filter: targetStyle.filter,
          opacity: targetStyle.opacity,
          zIndex: targetStyle.zIndex,
          duration: 0.1,
          ease: "power2.inOut",
        },
        0,
      );
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating.current && images.length > 1) {
        cycleCards();
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [activeIdx, images]);

  return (
    <div
      ref={containerRef}
      onClick={cycleCards}
      className="project-images relative w-full max-w-[280px] sm:max-w-xs md:max-w-xl cursor-pointer group flex justify-center items-center select-none pt-4 md:pt-12 pb-2 md:pb-4 mx-auto"
    >
      <div className="stacking-images relative w-full aspect-[16/9.8] flex justify-center items-center pt-4 md:pt-10">
        {images.map((imgUrl, idx) => {
          const initStyle = getCardStyle(idx, images.length, activeIdx);

          return (
            <div
              key={`${imgUrl}-${idx}`}
              className="image-wrapper absolute left-1/2 -translate-x-1/2 rounded-[8px] md:rounded-[16px] overflow-hidden border border-white/20 shadow-2xl bg-black flex flex-col will-change-transform"
              style={{
                width: initStyle.width,
                top: initStyle.top,
                filter: initStyle.filter,
                opacity: initStyle.opacity,
                zIndex: initStyle.zIndex,
              }}
            >
              <div className="h-4 md:h-7 bg-[#f3f3f6] border-b border-gray-200/80 flex items-center px-2 md:px-4 justify-between select-none shrink-0">
                <div className="flex gap-1 md:gap-1.5">
                  <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-gray-300" />
                  <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-gray-300" />
                  <div className="w-1.5 h-1.5 md:w-2.5 md:h-2.5 rounded-full bg-gray-300" />
                </div>
                <span className="text-[8px] md:text-[10px] font-mono text-gray-500 font-medium truncate max-w-[100px]">
                  {title.toLowerCase()}
                </span>
                <div className="w-3 md:w-6" />
              </div>

              <div className="relative w-full aspect-[16/9] bg-black overflow-hidden">
                <Image
                  src={imgUrl}
                  alt={`${title} preview ${idx}`}
                  fill
                  className="object-fill"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ProjectSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const glowCircleRef = useRef<SVGCircleElement>(null);

  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const currentProjectRef = useRef(0);

  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    if (!cards.length) return;

    const ctx = gsap.context(() => {
      const totalProjects = PROJECTS.length;
      const DASHARRAY = 289;

      if (progressCircleRef.current) {
        gsap.set(progressCircleRef.current, { strokeDashoffset: DASHARRAY });
      }
      if (glowCircleRef.current) {
        gsap.set(glowCircleRef.current, { strokeDashoffset: DASHARRAY });
      }

      cards.forEach((card, i) => {
        if (i === 0) {
          gsap.set(card, { yPercent: 0, scale: 0.92, borderRadius: "24px" });
        } else {
          gsap.set(card, { yPercent: 100, scale: 0.92, borderRadius: "24px" });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            const newIndex = Math.min(
              Math.floor(self.progress * totalProjects),
              totalProjects - 1,
            );
            if (newIndex !== currentProjectRef.current) {
              currentProjectRef.current = newIndex;
              setCurrentProjectIndex(newIndex);
            }
          },
        },
      });

      cards.forEach((card, index) => {
        const targetRatio = (index + 1) / totalProjects;
        const targetOffset = DASHARRAY - DASHARRAY * targetRatio;

        if (index === 0) {
          tl.to(card, { scale: 1, borderRadius: "0px", ease: "none" }, 0)
            .to(
              progressCircleRef.current,
              { strokeDashoffset: targetOffset, ease: "none" },
              0,
            )
            .to(
              glowCircleRef.current,
              { strokeDashoffset: targetOffset, ease: "none" },
              0,
            );
        } else {
          tl.to(
            card,
            { yPercent: 0, scale: 1, borderRadius: "0px", ease: "none" },
            index,
          )
            .to(
              progressCircleRef.current,
              { strokeDashoffset: targetOffset, ease: "none" },
              index,
            )
            .to(
              glowCircleRef.current,
              { strokeDashoffset: targetOffset, ease: "none" },
              index,
            );
        }
      });

      const lastCard = cards[totalProjects - 1];
      if (lastCard) {
        tl.to(
          lastCard,
          { scale: 0.92, borderRadius: "24px", ease: "none" },
          totalProjects,
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[250vh] md:h-[600vh] bg-[#0d0d0d] text-white"
    >
      <div className="sticky top-0 h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        {/* OVERLAY FIXED HEADER UI DESKTOP */}
        <div className="hidden md:flex absolute top-16 left-16 right-16 z-50 justify-between items-start pointer-events-none">
          <div className="relative w-28 h-28 rounded-full flex flex-col items-center justify-center text-center bg-[#181818]/80 border border-white/10 select-none">
            <svg
              className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -rotate-90 pointer-events-none overflow-visible"
              viewBox="0 0 100 100"
            >
              <defs>
                <filter
                  id="white-circle-glow"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <circle
                cx="50"
                cy="50"
                r="46"
                className="stroke-white/10"
                strokeWidth="1.2"
                fill="transparent"
              />

              <circle
                ref={glowCircleRef}
                cx="50"
                cy="50"
                r="46"
                stroke="#ffffff"
                strokeWidth="3"
                fill="transparent"
                strokeDasharray={289}
                strokeDashoffset={289}
                strokeLinecap="round"
                className="opacity-80 transition-all duration-75"
                filter="url(#white-circle-glow)"
              />

              <circle
                ref={progressCircleRef}
                cx="50"
                cy="50"
                r="46"
                stroke="#ffffff"
                strokeWidth="1.8"
                fill="transparent"
                strokeDasharray={289}
                strokeDashoffset={289}
                strokeLinecap="round"
                className="transition-all duration-75"
              />
            </svg>

            <span className="text-[10px] tracking-[0.25em] text-white/40 uppercase font-mono z-10">
              PROJECT
            </span>
            <div className="text-sm font-mono tracking-wider mt-0.5 z-10">
              <span className="text-white font-semibold">
                0{currentProjectIndex + 1}
              </span>
              <span className="text-white/30 mx-1.5">|</span>
              <span className="text-white/40">0{PROJECTS.length}</span>
            </div>
          </div>
        </div>

        {/* CONTAINER KARTU PROYEK */}
        <div className="relative w-full h-full flex items-center justify-center">
          {PROJECTS.map((project, index) => {
            const isCardActive = currentProjectIndex === index;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardsRef.current[index] = el;
                }}
                className="absolute inset-0 w-full h-full border border-white/10 px-4 pt-14 pb-4 md:p-16 lg:p-20 flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden will-change-transform bg-[#0C0C0C]"
                style={{
                  zIndex: index + 1,
                }}
              >
                {/* Background Image Optimized */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-30 md:opacity-40">
                  <Image
                    src={project.bgImage}
                    alt={`${project.title} background`}
                    fill
                    className="object-cover object-center"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/85 to-transparent" />
                </div>

                {/* =========================================================
                    TAMPILAN MOBILE (VISIT SITE BERADA DI PALING BAWAH GAMBAR)
                ========================================================= */}
                <div className="flex md:hidden flex-col h-full z-10 overflow-y-auto pr-1 space-y-3.5 pb-8">
                  {/* 1. Header Mini Progress & Badge */}
                  <div className="flex items-center justify-between w-full border-b border-white/10 pb-2 shrink-0">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center bg-white/5 text-[8px] font-mono">
                        0{index + 1}
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase">
                        / 0{PROJECTS.length}
                      </span>
                    </div>

                    <div>
                      {project.type === "experience" ? (
                        <span className="bg-white px-2 py-0.5 rounded text-[8px] font-mono tracking-wider text-black font-extrabold uppercase">
                          <ScrambleText
                            text={project.typeLabel}
                            active={isCardActive}
                          />
                        </span>
                      ) : (
                        <span className="bg-white px-2 py-0.5 rounded text-[8px] font-mono tracking-wider text-black font-extrabold uppercase">
                          <ScrambleText
                            text={project.category || "Real Project Website"}
                            active={isCardActive}
                          />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* 2. Judul & Subtitle Perusahaan */}
                  <div className="flex flex-col gap-0.5 text-left shrink-0">
                    <h2 className="text-xl font-bold tracking-tight text-white uppercase leading-tight">
                      {project.title}
                    </h2>
                    {project.company && (
                      <span className="text-[11px] font-semibold text-white/90">
                        {project.company}
                      </span>
                    )}
                    {project.period && (
                      <span className="text-[9px] font-mono text-[#FF7A59]">
                        • {project.period}
                      </span>
                    )}
                    {project.tags && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[8px] font-mono text-neutral-300 bg-white/10 border border-white/15 px-1.5 py-0.5 rounded uppercase"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3. Deskripsi & About Teks */}
                  <div className="flex flex-col gap-2 shrink-0">
                    <div className="bg-white/[0.06] border border-white/15 p-2.5 rounded-lg w-full">
                      <p className="text-white/90 text-[10px] leading-relaxed font-light">
                        {project.description}
                      </p>
                    </div>

                    {project.about && (
                      <div className="bg-white/[0.03] border border-white/10 p-2 rounded-lg w-full">
                        <p className="text-white/60 text-[9px] leading-relaxed font-light italic">
                          {project.about}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 4. Mockup Gambar Stack */}
                  <div className="w-full flex justify-center items-center shrink-0 pt-1">
                    <StackedBrowserMockup
                      images={project.images}
                      title={project.title}
                    />
                  </div>

                  {/* 5. Tombol Action Visit Site / Status (Dipindah Ke Paling Bawah Gambar) */}
                  <div className="w-full flex justify-center shrink-0 pt-1">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-[10px] font-mono tracking-widest text-[#FF4D00] uppercase font-semibold active:scale-95 transition-transform"
                      >
                        ( VISIT SITE ↗ )
                      </a>
                    ) : (
                      <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">
                        ( {project.status} )
                      </span>
                    )}
                  </div>
                </div>

                {/* =========================================================
                    TAMPILAN DESKTOP (100% ASLI AWAL KAMU - UNTOUCHED)
                ========================================================= */}
                <div className="hidden md:flex flex-col justify-between h-full">
                  {/* Tag & Kategori Kanan Kartu Desktop */}
                  <div className="flex justify-end items-start z-10 w-full pt-2">
                    <div className="inline-flex flex-col items-end text-right w-fit max-w-full">
                      {project.type === "experience" ? (
                        <>
                          <span className="inline-block bg-white border border-white/30 shadow-2xl px-3.5 py-1.5 rounded-lg text-[14px] font-mono tracking-[0.2em] text-black uppercase font-extrabold mb-1 select-none">
                            <ScrambleText
                              text={project.typeLabel}
                              active={isCardActive}
                            />
                          </span>

                          <div className="w-full h-[1px] bg-white/20 my-2" />

                          <span className="text-[18px] font-sans font-semibold tracking-wide text-white leading-tight">
                            {project.company}
                          </span>

                          <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FB4516]/10 border border-[#FB4516]/40">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FB4516] animate-pulse" />
                            <span className="text-xs font-mono text-[#FF7A59] font-medium tracking-wider">
                              {project.period}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="inline-block bg-white border border-white/30 shadow-2xl px-3.5 py-1.5 rounded-lg text-[14px] font-mono tracking-[0.2em] text-black uppercase font-extrabold mb-1 select-none">
                            <ScrambleText
                              text={project.category || "Real Project Website"}
                              active={isCardActive}
                            />
                          </span>

                          <div className="w-full h-[1px] bg-white/20 my-2" />

                          <div className="flex flex-wrap justify-end gap-1.5 mt-1">
                            {project.tags?.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="text-[10px] font-mono text-neutral-200 bg-white/[0.08] border border-white/20 px-2.5 py-0.5 rounded-md tracking-wider uppercase font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Konten Utama Desktop */}
                  <div className="grid grid-cols-12 gap-12 items-center z-10 my-auto w-full max-w-7xl mx-auto pt-10">
                    <div className="col-span-6 flex flex-col items-start gap-4">
                      <h2
                        className={`${
                          project.type === "experience"
                            ? "text-[54px]"
                            : "text-[68px]"
                        } font-light tracking-tight text-white uppercase font-sans leading-none`}
                      >
                        {project.title}
                      </h2>

                      <div className="bg-white/[0.08] border border-white/20 p-4 rounded-xl max-w-md">
                        <p className="text-white/90 text-sm leading-relaxed font-light">
                          {project.description}
                        </p>
                      </div>

                      {project.about && (
                        <div className="bg-white/[0.05] border border-white/15 p-3.5 rounded-xl max-w-md">
                          <p className="text-white/60 text-xs leading-relaxed font-light italic">
                            {project.about}
                          </p>
                        </div>
                      )}

                      {project.link ? (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.08] border border-white/20 text-xs font-mono tracking-widest text-[#FF4D00] hover:text-white hover:border-[#FF4D00]/50 transition-colors uppercase mt-1 font-medium"
                        >
                          ( VISIT SITE <span className="text-sm">↗</span> )
                        </a>
                      ) : (
                        <span className="inline-block px-3.5 py-1.5 rounded-lg bg-white/[0.05] border border-white/15 text-xs font-mono tracking-widest text-white/40 uppercase mt-1">
                          ( {project.status} )
                        </span>
                      )}
                    </div>

                    <div className="col-span-6 relative flex justify-end items-center">
                      <StackedBrowserMockup
                        images={project.images}
                        title={project.title}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
