"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

console.log("NAVBAR CLIENT IS RUNNING");

  return (
    <header className="fixed left-0 right-0 top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5 lg:px-10">
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <a
            href="/"
            className="group flex items-center gap-3"
            aria-label="FitFile home"
            onClick={() => setMenuOpen(false)}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c8ff3d] text-sm font-black text-[#080a09] transition-transform duration-300 group-hover:rotate-12">
              F
            </span>

            <span className="text-lg font-bold tracking-[-0.03em]">
              FitFile
            </span>
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="/image-compressor"
              className="text-sm text-white/50 transition hover:text-[#c8ff3d]"
            >
              Compress
            </a>

            <a
              href="/image-converter"
              className="text-sm text-white/50 transition hover:text-[#c8ff3d]"
            >
              Convert
            </a>

            <a
              href="/image-resizer"
              className="text-sm text-white/50 transition hover:text-[#c8ff3d]"
            >
              Resize
            </a>

            <a
              href="/#how-it-works"
              className="text-sm text-white/50 transition hover:text-white"
            >
              How it works
            </a>
          </nav>

          {/* DESKTOP CTA */}
          <a
            href="/#tools"
            className="hidden rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-white/80 backdrop-blur-md transition hover:border-[#c8ff3d]/40 hover:text-[#c8ff3d] md:block"
          >
            Get started
          </a>

          {/* MOBILE MENU BUTTON */}
<button
  type="button"
  aria-label={menuOpen ? "Close menu" : "Open menu"}
  aria-expanded={menuOpen}
  onClick={() => setMenuOpen(!menuOpen)}
  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 transition hover:border-[#c8ff3d]/40 hover:text-[#c8ff3d] md:hidden"
>
  <span className="sr-only">
    {menuOpen ? "Close menu" : "Open menu"}
  </span>

  <div className="flex w-4 flex-col gap-1.5">
    <span
      className={`block h-px w-full bg-current transition-transform duration-300 ${
        menuOpen ? "translate-y-[7px] rotate-45" : ""
      }`}
    />

    <span
      className={`block h-px w-full bg-current transition-opacity duration-300 ${
        menuOpen ? "opacity-0" : ""
      }`}
    />

    <span
      className={`block h-px w-full bg-current transition-transform duration-300 ${
        menuOpen ? "-translate-y-[7px] -rotate-45" : ""
      }`}
    />
  </div>
</button>
        </div>

        {/* MOBILE NAVIGATION */}
        <div
          className={`overflow-hidden transition-all duration-300 md:hidden ${
            menuOpen ? "max-h-96 pt-5 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="rounded-2xl border border-white/10 bg-[#0d100e]/95 p-3 shadow-2xl backdrop-blur-xl">
            <a
              href="/image-compressor"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/[0.04] hover:text-[#c8ff3d]"
            >
              Compress
            </a>

            <a
              href="/image-converter"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/[0.04] hover:text-[#c8ff3d]"
            >
              Convert
            </a>

            <a
              href="/image-resizer"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/[0.04] hover:text-[#c8ff3d]"
            >
              Resize
            </a>

            <a
              href="/#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl px-4 py-3 text-sm text-white/60 transition hover:bg-white/[0.04] hover:text-white"
            >
              How it works
            </a>

            <a
              href="/#tool"
              onClick={() => setMenuOpen(false)}
              className="mt-2 block rounded-xl bg-[#c8ff3d] px-4 py-3 text-center text-sm font-bold text-[#080a09] transition hover:scale-[1.01]"
            >
              Get started →
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}