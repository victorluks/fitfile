import Navbar from "@/components/Navbar";

export default function Home() {

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FitFile",
    url: "https://fitfile.app",
    description:
      "Online tools for compressing, resizing, and converting files.",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

 return (
    <main className="min-h-screen overflow-hidden bg-[#080a09] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      /><Navbar />

      {/* HERO */}
      <section className="relative flex min-h-screen items-center px-6 pt-24 lg:px-10">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-[10%] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#c8ff3d]/[0.07] blur-[150px]" />

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_.95fr]">
            {/* LEFT */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#c8ff3d]/20 bg-[#c8ff3d]/5 px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d] shadow-[0_0_12px_#c8ff3d]" />

                <span className="text-[11px] font-semibold tracking-[0.18em] text-[#c8ff3d]">
                  FILE OPTIMIZATION, REIMAGINED
                </span>
              </div>

              <h1 className="max-w-4xl text-[clamp(3.5rem,8vw,8.5rem)] font-black leading-[0.82] tracking-[-0.075em]">
                Make your
                <br />
                file.
                <br />
                <span className="text-[#c8ff3d]">Fit.</span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-7 text-white/45 sm:text-lg">
                Tell us what your image needs to be. FitFile handles the
                technical stuff and gets it there.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#tools"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#c8ff3d] px-6 py-3.5 text-sm font-bold text-[#080a09] transition hover:scale-[1.03]"
                >
                  Choose a tool
                  <span className="transition-transform group-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>

                <a
                  href="#how-it-works"
                  className="rounded-full border border-white/10 px-6 py-3.5 text-sm font-medium text-white/65 transition hover:border-white/20 hover:text-white"
                >
                  See how it works
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/30">
                <span>✓ No signup</span>
                <span>✓ No watermark</span>
                <span>✓ Privacy-first</span>
              </div>
            </div>

            {/* RIGHT — VISUAL */}
            <div className="relative">
              <div className="absolute -inset-8 rounded-[3rem] bg-[#c8ff3d]/5 blur-3xl" />

              <div className="relative rounded-[2rem] border border-white/10 bg-[#0d100e] p-5 shadow-2xl sm:rounded-[2.5rem] sm:p-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#c8ff3d]">
                      FitFile
                    </p>

                    <p className="mt-1 text-sm text-white/35">
                      What does your file need?
                    </p>
                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c8ff3d] text-sm font-black text-[#080a09]">
                    F
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <a
                    href="/image-compressor"
                    className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.025] p-5 transition hover:border-[#c8ff3d]/30 hover:bg-[#c8ff3d]/[0.04]"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#c8ff3d]">
                        01
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        Make it smaller
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        Compress your image
                      </p>
                    </div>

                    <span className="text-xl text-white/25 transition group-hover:translate-x-1 group-hover:text-[#c8ff3d]">
                      →
                    </span>
                  </a>

                  <a
                    href="/image-resizer"
                    className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.025] p-5 transition hover:border-[#c8ff3d]/30 hover:bg-[#c8ff3d]/[0.04]"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#c8ff3d]">
                        02
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        Make it the right size
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        Resize your image
                      </p>
                    </div>

                    <span className="text-xl text-white/25 transition group-hover:translate-x-1 group-hover:text-[#c8ff3d]">
                      →
                    </span>
                  </a>

                  <a
                    href="/image-converter"
                    className="group flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.025] p-5 transition hover:border-[#c8ff3d]/30 hover:bg-[#c8ff3d]/[0.04]"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#c8ff3d]">
                        03
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        Make it the right format
                      </p>

                      <p className="mt-1 text-xs text-white/30">
                        Convert your image
                      </p>
                    </div>

                    <span className="text-xl text-white/25 transition group-hover:translate-x-1 group-hover:text-[#c8ff3d]">
                      →
                    </span>
                  </a>
                </div>

                <div className="mt-6 rounded-2xl bg-[#c8ff3d]/[0.06] p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/30">
                      Your requirement
                    </span>

                    <span className="text-xs font-bold text-[#c8ff3d]">
                      READY
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-white/55">
                    “File must be under 100 KB.”
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 border-t border-white/5 py-6 sm:mt-20">
            <div className="flex flex-col justify-between gap-4 text-xs text-white/25 sm:flex-row sm:items-center">
              <span>BUILT FOR THE MOMENT WHEN YOU HEAR:</span>

              <span className="text-white/45">
                “File must be under 100 KB.”
              </span>

              <span>WE’VE GOT YOU.</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="border-t border-white/5 px-6 py-28 lg:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8ff3d]">
              The idea
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-6xl">
              Stop learning file settings.
              <br />
              <span className="text-white/30">
                Just tell us the result.
              </span>
            </h2>
          </div>

          <div className="mt-20 grid gap-4 md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Upload",
                text: "Give us the image that needs fixing.",
              },
              {
                number: "02",
                title: "Set the requirement",
                text: "Tell us the size, dimensions or format you need.",
              },
              {
                number: "03",
                title: "Fit",
                text: "Get the result that matches your requirement.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group min-h-[300px] rounded-[2rem] border border-white/8 bg-white/[0.025] p-8 transition duration-500 hover:-translate-y-1 hover:border-[#c8ff3d]/20"
              >
                <span className="text-sm font-medium text-[#c8ff3d]">
                  {item.number}
                </span>

                <h3 className="mt-24 text-2xl font-bold tracking-tight">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-xs text-sm leading-6 text-white/35">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY FITFILE */}
      <section
        id="why-fitfile"
        className="px-6 py-28 lg:px-10 lg:py-36"
      >
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8ff3d]">
              Why FitFile
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-6xl">
              Your file.
              <br />
              Your rules.
            </h2>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/40">
              Whether an application says 100 KB, a website needs a smaller
              image, or a form demands specific dimensions, FitFile is built
              around the requirement — not the technical jargon.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-[#0d100e] p-8 sm:p-10">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-white/25">
                    Original
                  </p>

                  <p className="mt-2 text-4xl font-black">4.8 MB</p>
                </div>

                <span className="pb-1 text-2xl text-[#c8ff3d]">→</span>

                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.15em] text-white/25">
                    Optimized
                  </p>

                  <p className="mt-2 text-4xl font-black text-[#c8ff3d]">
                    96 KB
                  </p>
                </div>
              </div>

              <div className="mt-10 h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[98%] rounded-full bg-[#c8ff3d]" />
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-white/35">
                  98% smaller
                </span>

                <span className="rounded-full bg-[#c8ff3d]/10 px-3 py-1.5 text-xs font-bold text-[#c8ff3d]">
                  ✓ REQUIREMENT MET
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMAGE TOOLS */}
      <section
        id="tools"
        className="border-t border-white/5 px-6 py-28 lg:px-10 lg:py-36"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8ff3d]">
              Image tools
            </p>

            <h2 className="mt-5 text-4xl font-bold tracking-[-0.04em] sm:text-6xl">
              One file.
              <br />
              <span className="text-white/30">
                Three ways to make it fit.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/40">
              Compress the file size, change its dimensions, or convert it
              into the format you need.
            </p>
          </div>

          <div className="mt-16 grid gap-4 md:grid-cols-3">
            <a
              href="/image-compressor"
              className="group min-h-[320px] rounded-[2rem] border border-white/8 bg-white/[0.025] p-8 transition duration-500 hover:-translate-y-1 hover:border-[#c8ff3d]/30"
            >
              <span className="text-sm font-bold text-[#c8ff3d]">
                01
              </span>

              <h3 className="mt-20 text-2xl font-bold tracking-tight">
                Compress
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/35">
                Reduce the file size of your image while keeping it usable.
              </p>

              <span className="mt-8 inline-flex text-sm font-bold text-white/50 transition group-hover:text-[#c8ff3d]">
                Compress an image →
              </span>
            </a>

            <a
              href="/image-resizer"
              className="group min-h-[320px] rounded-[2rem] border border-white/8 bg-white/[0.025] p-8 transition duration-500 hover:-translate-y-1 hover:border-[#c8ff3d]/30"
            >
              <span className="text-sm font-bold text-[#c8ff3d]">
                02
              </span>

              <h3 className="mt-20 text-2xl font-bold tracking-tight">
                Resize
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/35">
                Set the exact width and height you need for your image.
              </p>

              <span className="mt-8 inline-flex text-sm font-bold text-white/50 transition group-hover:text-[#c8ff3d]">
                Resize an image →
              </span>
            </a>

            <a
              href="/image-converter"
              className="group min-h-[320px] rounded-[2rem] border border-white/8 bg-white/[0.025] p-8 transition duration-500 hover:-translate-y-1 hover:border-[#c8ff3d]/30"
            >
              <span className="text-sm font-bold text-[#c8ff3d]">
                03
              </span>

              <h3 className="mt-20 text-2xl font-bold tracking-tight">
                Convert
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/35">
                Convert your image between common formats such as JPG, PNG,
                WebP, and AVIF.
              </p>

              <span className="mt-8 inline-flex text-sm font-bold text-white/50 transition group-hover:text-[#c8ff3d]">
                Convert an image →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-24 pt-10 lg:px-10 lg:pb-36">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#c8ff3d] px-7 py-20 text-[#080a09] sm:px-12 lg:px-20 lg:py-28">
          <div className="max-w-4xl">
            <p className="text-xs font-black uppercase tracking-[0.2em]">
              FitFile
            </p>

            <h2 className="mt-6 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
              Whatever the requirement.
              <br />
              Make it fit.
            </h2>

            <p className="mt-7 max-w-xl text-base leading-7 text-black/60">
              Compress it. Resize it. Convert it. Choose the tool that matches
              what your image needs.
            </p>

            <a
              href="#tools"
              className="mt-9 inline-flex rounded-full bg-[#080a09] px-7 py-4 text-sm font-bold text-white transition hover:scale-[1.03]"
            >
              Choose a tool →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-xs text-white/25 sm:flex-row">
          <span>© 2026 FitFile</span>
          <span>Make your file. Fit.</span>
        </div>
      </footer>
    </main>
  );
}