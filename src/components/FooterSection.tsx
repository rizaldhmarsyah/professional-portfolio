"use client";

export default function FooterSection() {
  return (
    <footer className="sticky bottom-0 z-0 w-full min-h-[50vh] sm:min-h-[55vh] bg-[#0A0A0A] text-[#f4ede6] flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 lg:px-20 py-16 sm:py-20 select-none overflow-hidden">
      {/* KONTEN UTAMA FOOTER */}
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-10 my-auto">
        {/* BOX INFORMASI KIRI (CENTERED DI DESKTOP & MOBILE) */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="border border-white/30 text-xs font-mono uppercase tracking-wider bg-[#0A0A0A]">
            {/* BARIS TOP */}
            <div className="px-4 py-2 border-b border-white/30 text-center">
              JAKARTA, IDN 12410
            </div>

            {/* BARIS BOTTOM GRID 3 KOLOM */}
            <div className="grid grid-cols-12 items-center text-center">
              {/* ICON GLOBE */}
              <div className="col-span-3 p-3 border-r border-white/30 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                  <path
                    d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10z"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              {/* TEXT WORKING GLOBALLY */}
              <div className="col-span-6 p-2 border-r border-white/30 text-[10px] leading-tight font-sans font-bold">
                OPEN
                <br />
                TO WORK
              </div>

              {/* CODE IDN */}
              <div className="col-span-3 p-2 text-[10px] font-mono rotate-0 lg:-rotate-90">
                IDN
              </div>
            </div>
          </div>

          {/* TECH STACK BADGE & COPYRIGHT (CENTERED) */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[11px] font-mono text-white/40 tracking-wider">
              &copy;2026 RIZAL DHMARSYAH, ALL RIGHTS RESERVED
            </span>

            <div className="flex items-center gap-1.5 text-[10px] font-mono text-white/50 bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>HAND-CODED WITH NEXT.JS & GSAP</span>
            </div>
          </div>
        </div>

        {/* KONTAK DAN IKON KANAN */}
        <div className="flex flex-col items-center lg:items-end gap-4 font-sans text-xs sm:text-sm text-white/80 w-full lg:w-auto">
          {/* BARIS 1: KONTAK TEKS */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <a
              href="https://wa.me/6288292233779"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              +62 882 9223 3779
            </a>
            <span className="text-white/20">•</span>
            <a
              href="mailto:rizalnur.work@gmail.com"
              className="hover:text-white transition-colors"
            >
              rizalnur.work@gmail.com
            </a>
          </div>

          {/* BARIS 2: LOGO IKON (CENTERED) */}
          <div className="flex items-center justify-center w-full gap-5 pt-1 text-white/70">
            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-white transition-colors p-1"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/6288292233779"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="hover:text-white transition-colors p-1"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.81 9.81 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.25 8.24-8.25m4.52 11.23c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.12-.17.25-.65.81-.8 0.98-.15.17-.3.19-.55.07-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.4-.42-.56-.43-.15 0-.32-.01-.49-.01-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.3Z" />
              </svg>
            </a>

            {/* Gmail */}
            <a
              href="mailto:rizalnur.work@gmail.com"
              aria-label="Gmail"
              className="hover:text-white transition-colors p-1"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
