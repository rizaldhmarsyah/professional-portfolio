"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [copiedType, setCopiedType] = useState<"phone" | "email" | null>(null);

  // State pelacak menu pop-up mana yang terbuka di Mobile
  const [activeMobilePopUp, setActiveMobilePopUp] = useState<
    "about" | "works" | "contact" | null
  >(null);

  const lastScrollY = useRef(0);
  const isScrollingToTop = useRef(false);

  // 1. Ref Pop-up Card DESKTOP
  const aboutCardRef = useRef<HTMLDivElement>(null);
  const worksCardRef = useRef<HTMLDivElement>(null);
  const contactCardRef = useRef<HTMLDivElement>(null);

  // Ref GSAP Timelines DESKTOP
  const aboutTl = useRef<gsap.core.Timeline | null>(null);
  const worksTl = useRef<gsap.core.Timeline | null>(null);
  const contactTl = useRef<gsap.core.Timeline | null>(null);

  // 2. Ref Pop-up Card MOBILE
  const mobileAboutCardRef = useRef<HTMLDivElement>(null);
  const mobileWorksCardRef = useRef<HTMLDivElement>(null);
  const mobileContactCardRef = useRef<HTMLDivElement>(null);

  // Ref GSAP Timelines MOBILE
  const mobileAboutTl = useRef<gsap.core.Timeline | null>(null);
  const mobileWorksTl = useRef<gsap.core.Timeline | null>(null);
  const mobileContactTl = useRef<gsap.core.Timeline | null>(null);

  // Handler Copy
  const handleCopy = (text: string, type: "phone" | "email") => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  // Smooth Scroll
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setActiveMobilePopUp(null);

    if (isScrollingToTop.current) return;
    isScrollingToTop.current = true;

    const win = typeof window !== "undefined" ? (window as any) : null;
    if (win && win.lenis && typeof win.lenis.scrollTo === "function") {
      win.lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          isScrollingToTop.current = false;
        },
      });
      return;
    }

    const targetObj = { y: window.scrollY || window.pageYOffset };

    gsap.to(targetObj, {
      y: 0,
      duration: 1.2,
      ease: "power3.inOut",
      onUpdate: () => {
        window.scrollTo(0, targetObj.y);
      },
      onComplete: () => {
        isScrollingToTop.current = false;
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (isScrollingToTop.current) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false);
        setActiveMobilePopUp(null);
      } else {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Builder Animasi GSAP Pop-up (Diubah menerima HTMLDivElement | null)
  const createPopUpTimeline = (
    card: HTMLDivElement | null,
  ): gsap.core.Timeline | null => {
    if (!card) return null;

    const texts = card.querySelectorAll(".pop-text");

    gsap.set(card, {
      opacity: 0,
      scale: 0.92,
      y: -10,
      pointerEvents: "none",
      transformOrigin: "top center",
    });
    gsap.set(texts, { yPercent: 100, opacity: 0 });

    return gsap
      .timeline({ paused: true })
      .to(card, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.35,
        ease: "back.out(1.4)",
        pointerEvents: "auto",
      })
      .to(
        texts,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.2",
      );
  };

  useEffect(() => {
    // Inisialisasi Timeline Desktop
    aboutTl.current = createPopUpTimeline(aboutCardRef.current);
    worksTl.current = createPopUpTimeline(worksCardRef.current);
    contactTl.current = createPopUpTimeline(contactCardRef.current);

    // Inisialisasi Timeline Mobile
    mobileAboutTl.current = createPopUpTimeline(mobileAboutCardRef.current);
    mobileWorksTl.current = createPopUpTimeline(mobileWorksCardRef.current);
    mobileContactTl.current = createPopUpTimeline(mobileContactCardRef.current);
  }, []);

  // Hover Controls Desktop
  const handleMouseEnter = (tl: gsap.core.Timeline | null) => {
    if (!tl) return;
    tl.timeScale(1).play();
  };

  const handleMouseLeave = (tl: gsap.core.Timeline | null) => {
    if (!tl) return;
    tl.timeScale(1.4).reverse();
  };

  // Tap Controls Mobile via GSAP
  const toggleMobilePopUp = (
    type: "about" | "works" | "contact",
    tl: gsap.core.Timeline | null,
  ) => {
    if (!tl) return;

    if (activeMobilePopUp === type) {
      tl.timeScale(1.4).reverse();
      setActiveMobilePopUp(null);
    } else {
      // Reverse Pop-up Mobile lain yang sedang terbuka
      if (mobileAboutTl.current && activeMobilePopUp === "about")
        mobileAboutTl.current.timeScale(1.4).reverse();
      if (mobileWorksTl.current && activeMobilePopUp === "works")
        mobileWorksTl.current.timeScale(1.4).reverse();
      if (mobileContactTl.current && activeMobilePopUp === "contact")
        mobileContactTl.current.timeScale(1.4).reverse();

      tl.timeScale(1).play();
      setActiveMobilePopUp(type);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] px-6 py-5 md:px-12 md:py-6 transition-transform duration-500 ease-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* LOGO */}
        <a
          href="#home"
          onClick={scrollToTop}
          className="flex items-center group cursor-pointer shrink-0"
        >
          <div className="relative w-8 h-8 md:w-9 md:h-9 group-hover:scale-105 transition-transform select-none">
            <Image
              src="/r.svg"
              alt="Rizal Nur Dhmarsyah Logo"
              width={36}
              height={36}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </a>

        {/* ==================== 1. DESKTOP NAVBAR ==================== */}
        <nav className="hidden md:flex items-center space-x-12 text-sm font-sans tracking-tight">
          <a
            href="#home"
            onClick={scrollToTop}
            className="text-white hover:text-white/80 transition-colors py-2 cursor-pointer"
          >
            Home
          </a>

          {/* ABOUT DESKTOP */}
          <div
            className="relative py-2"
            onMouseEnter={() => handleMouseEnter(aboutTl.current)}
            onMouseLeave={() => handleMouseLeave(aboutTl.current)}
          >
            <a
              href="#about"
              className="text-white/60 hover:text-white transition-colors flex items-center gap-1"
            >
              About <span className="font-serif text-xs">*</span>
            </a>

            <div
              ref={aboutCardRef}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-96 p-7 bg-[#121212]/95 border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 select-none cursor-default"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 pop-text">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF4D00] font-semibold">
                  (PROFILE BRIEF)
                </span>
                <span className="text-[11px] font-mono text-emerald-400 font-medium">
                  OPEN TO WORK
                </span>
              </div>

              <div className="space-y-2.5 font-sans text-left">
                <div className="overflow-hidden">
                  <p className="pop-text text-base text-white/95 font-semibold leading-snug">
                    Final-Year Information Systems Student.
                  </p>
                </div>
                <div className="overflow-hidden">
                  <p className="pop-text text-sm text-white/70 leading-relaxed font-light">
                    Currently open for full-time career opportunities or
                    internships.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* WORKS DESKTOP */}
          <div
            className="relative py-2"
            onMouseEnter={() => handleMouseEnter(worksTl.current)}
            onMouseLeave={() => handleMouseLeave(worksTl.current)}
          >
            <a
              href="#works"
              className="text-white/60 hover:text-white transition-colors flex items-center gap-1"
            >
              Works <span className="font-mono text-xs">//</span>
            </a>

            <div
              ref={worksCardRef}
              className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[680px] p-7 bg-[#121212]/95 border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 select-none cursor-default"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 pop-text">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF4D00] font-semibold">
                  (WORK EXPERIENCE)
                </span>
                <span className="text-[11px] font-mono text-white/40">
                  2025 - 2026
                </span>
              </div>

              <div className="space-y-4 font-sans text-left">
                <div className="pop-text flex flex-col gap-1">
                  <div className="text-sm text-white/90 font-medium leading-snug whitespace-nowrap">
                    Web Administrator (Intern) — Lembaga Layanan Pendidikan
                    Tinggi (LLDIKTI) Wilayah III Jakarta
                  </div>
                  <span className="text-xs font-mono text-white/40">
                    Sep 2025 – Feb 2026
                  </span>
                </div>

                <div className="border-t border-white/10 pt-3 pop-text flex flex-col gap-1">
                  <div className="text-sm text-white/90 font-medium leading-snug whitespace-nowrap">
                    Frontend Web Developer (Intern) — PT. Amal Ichwan Arindo
                  </div>
                  <span className="text-xs font-mono text-white/40">
                    Mar 2025 – Aug 2025
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* LET'S TALK DESKTOP */}
        <div
          className="hidden md:block relative py-2"
          onMouseEnter={() => handleMouseEnter(contactTl.current)}
          onMouseLeave={() => handleMouseLeave(contactTl.current)}
        >
          <a
            href="#contact"
            className="text-sm font-sans text-white/90 hover:text-[#FF4D00] transition-colors flex items-center gap-1 focus:outline-none"
          >
            Let&apos;s talk <span className="text-xs">↗</span>
          </a>

          <div
            ref={contactCardRef}
            className="absolute top-full right-0 mt-3 w-96 p-7 bg-[#121212]/95 border border-white/10 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl z-50 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 pop-text select-none">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF4D00] font-semibold">
                (GET IN TOUCH)
              </span>
              <span className="text-[11px] font-mono text-white/40">
                AVAILABLE
              </span>
            </div>

            <div className="space-y-4 font-sans text-left">
              <div className="overflow-hidden flex flex-col gap-1">
                <span className="pop-text text-xs font-mono text-white/40 uppercase tracking-wider select-none">
                  WhatsApp
                </span>
                <div className="pop-text flex items-center justify-between gap-2">
                  <a
                    href="https://wa.me/6288292233779"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base text-white hover:text-[#FF4D00] transition-colors font-medium tracking-tight block truncate"
                  >
                    +62 882 9223 3779
                  </a>
                  <button
                    onClick={() => handleCopy("+6288292233779", "phone")}
                    title="Copy WhatsApp Number"
                    className="p-1.5 text-white/40 hover:text-white transition-colors rounded-md hover:bg-white/10 shrink-0"
                  >
                    {copiedType === "phone" ? (
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="overflow-hidden flex flex-col gap-1">
                <span className="pop-text text-xs font-mono text-white/40 uppercase tracking-wider select-none">
                  Email
                </span>
                <div className="pop-text flex items-center justify-between gap-2">
                  <a
                    href="mailto:rizalnur.work@gmail.com"
                    className="text-base text-white/90 hover:text-[#FF4D00] transition-colors font-medium tracking-tight block truncate"
                  >
                    rizalnur.work@gmail.com
                  </a>
                  <button
                    onClick={() =>
                      handleCopy("rizalnur.work@gmail.com", "email")
                    }
                    title="Copy Email Address"
                    className="p-1.5 text-white/40 hover:text-white transition-colors rounded-md hover:bg-white/10 shrink-0"
                  >
                    {copiedType === "email" ? (
                      <svg
                        className="w-4 h-4 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== 2. MOBILE NAVBAR (TERPISAH & ANIMATED VIA GSAP) ==================== */}
        <div className="flex md:hidden items-center gap-4 text-xs font-sans tracking-tight relative">
          {/* BUTTON ABOUT MOBILE */}
          <button
            onClick={() => toggleMobilePopUp("about", mobileAboutTl.current)}
            className="text-white/80 hover:text-white transition-colors flex items-center gap-0.5 focus:outline-none py-1"
          >
            About <span className="font-serif text-[10px]">*</span>
          </button>

          {/* BUTTON WORKS MOBILE */}
          <button
            onClick={() => toggleMobilePopUp("works", mobileWorksTl.current)}
            className="text-white/80 hover:text-white transition-colors flex items-center gap-0.5 focus:outline-none py-1"
          >
            Works <span className="font-mono text-[10px]">//</span>
          </button>

          {/* BUTTON CONTACT MOBILE */}
          <button
            onClick={() =>
              toggleMobilePopUp("contact", mobileContactTl.current)
            }
            className="text-white/90 hover:text-[#FF4D00] transition-colors flex items-center gap-1 focus:outline-none py-1"
          >
            Let&apos;s talk <span className="text-[10px]">↗</span>
          </button>

          {/* MOBILE POP-UP CARD: ABOUT */}
          <div
            ref={mobileAboutCardRef}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[92vw] max-w-sm p-5 bg-[#121212]/95 border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl z-50 select-none cursor-default text-left"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 pop-text">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4D00] font-semibold">
                (PROFILE BRIEF)
              </span>
              <span className="text-[10px] font-mono text-emerald-400 font-medium">
                OPEN TO WORK
              </span>
            </div>

            <div className="space-y-2 font-sans">
              <div className="overflow-hidden">
                <p className="pop-text text-xs sm:text-sm text-white/95 font-semibold leading-snug">
                  Final-Year Information Systems Student.
                </p>
              </div>
              <div className="overflow-hidden">
                <p className="pop-text text-xs text-white/70 leading-relaxed font-light">
                  Currently open for full-time career opportunities or
                  internships.
                </p>
              </div>
            </div>
          </div>

          {/* MOBILE POP-UP CARD: WORKS */}
          <div
            ref={mobileWorksCardRef}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[92vw] max-w-sm p-5 bg-[#121212]/95 border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl z-50 select-none cursor-default text-left"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 pop-text">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4D00] font-semibold">
                (WORK EXPERIENCE)
              </span>
              <span className="text-[10px] font-mono text-white/40">
                2025 - 2026
              </span>
            </div>

            <div className="space-y-3 font-sans">
              <div className="pop-text flex flex-col gap-0.5">
                <div className="text-xs text-white/90 font-medium leading-snug">
                  Web Administrator (Intern) — LLDIKTI Wilayah III Jakarta
                </div>
                <span className="text-[10px] font-mono text-white/40">
                  Sep 2025 – Feb 2026
                </span>
              </div>

              <div className="border-t border-white/10 pt-2.5 pop-text flex flex-col gap-0.5">
                <div className="text-xs text-white/90 font-medium leading-snug">
                  Frontend Web Developer (Intern) — PT. Amal Ichwan Arindo
                </div>
                <span className="text-[10px] font-mono text-white/40">
                  Mar 2025 – Aug 2025
                </span>
              </div>
            </div>
          </div>

          {/* MOBILE POP-UP CARD: CONTACT */}
          <div
            ref={mobileContactCardRef}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[92vw] max-w-sm p-5 bg-[#121212]/95 border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl z-50 cursor-default text-left"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3 pop-text select-none">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4D00] font-semibold">
                (GET IN TOUCH)
              </span>
              <span className="text-[10px] font-mono text-white/40">
                AVAILABLE
              </span>
            </div>

            <div className="space-y-3 font-sans">
              <div className="overflow-hidden flex flex-col gap-0.5">
                <span className="pop-text text-[10px] font-mono text-white/40 uppercase tracking-wider">
                  WhatsApp
                </span>
                <div className="pop-text flex items-center justify-between gap-2">
                  <a
                    href="https://wa.me/6288292233779"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-white hover:text-[#FF4D00] transition-colors font-medium truncate"
                  >
                    +62 882 9223 3779
                  </a>
                  <button
                    onClick={() => handleCopy("+6288292233779", "phone")}
                    className="p-1 text-white/40 hover:text-white transition-colors rounded hover:bg-white/10 shrink-0"
                  >
                    {copiedType === "phone" ? (
                      <span className="text-emerald-400 text-[10px] font-mono">
                        COPIED
                      </span>
                    ) : (
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="overflow-hidden flex flex-col gap-0.5">
                <span className="pop-text text-[10px] font-mono text-white/40 uppercase tracking-wider">
                  Email
                </span>
                <div className="pop-text flex items-center justify-between gap-2">
                  <a
                    href="mailto:rizalnur.work@gmail.com"
                    className="text-xs text-white/90 hover:text-[#FF4D00] transition-colors font-medium truncate"
                  >
                    rizalnur.work@gmail.com
                  </a>
                  <button
                    onClick={() =>
                      handleCopy("rizalnur.work@gmail.com", "email")
                    }
                    className="p-1 text-white/40 hover:text-white transition-colors rounded hover:bg-white/10 shrink-0"
                  >
                    {copiedType === "email" ? (
                      <span className="text-emerald-400 text-[10px] font-mono">
                        COPIED
                      </span>
                    ) : (
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
