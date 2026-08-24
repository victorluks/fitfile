import type { Metadata } from "next";
import ImageFitTool from "@/components/ImageFitTool";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Free Image Converter — Convert JPG, PNG, WebP & AVIF",
  description:
    "Convert JPG, PNG, WebP, and AVIF images online for free. Change your image format quickly while keeping your image ready to use.",
  keywords: [
    "image converter",
    "free image converter",
    "image converter online",
    "convert image online",
    "JPG converter",
    "PNG converter",
    "WebP converter",
    "AVIF converter",
    "JPG to PNG",
    "PNG to JPG",
    "JPG to WebP",
    "PNG to WebP",
    "WebP to JPG",
    "image format converter",
  ],
  alternates: {
    canonical: "/image-converter",
  },
  openGraph: {
    title: "Free Image Converter — JPG, PNG, WebP & AVIF",
    description:
      "Convert JPG, PNG, WebP, and AVIF images online with FitFile.",
    url: "https://fitfile.vercel.app/image-converter",
    siteName: "FitFile",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImageConverterPage() {
    const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FitFile Image Converter",
    url: "https://fitfile.vercel.app/image-converter",
    description:
      "Convert JPG, PNG, WebP, and AVIF images online to the format you need.",
    applicationCategory: "MultimediaApplication",
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
      />
      <Navbar />

      {/* HERO */}
      <section className="px-6 pb-20 pt-32 lg:px-10 lg:pb-28 lg:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_.9fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8ff3d]">
                Image converter
              </p>

              <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-7xl lg:text-8xl">
                Change the
                <br />
                <span className="text-[#c8ff3d]">format.</span>
              </h1>

              <p className="mt-8 max-w-xl text-base leading-7 text-white/40 sm:text-lg">
                Convert your image to the format you need without dealing with
                complicated software or settings.
              </p>

              <div className="mt-8 flex flex-wrap gap-2 text-xs text-white/35">
                <span className="rounded-full border border-white/10 px-3 py-2">
                  JPG
                </span>
                <span className="rounded-full border border-white/10 px-3 py-2">
                  PNG
                </span>
                <span className="rounded-full border border-white/10 px-3 py-2">
                  WebP
                </span>
                <span className="rounded-full border border-white/10 px-3 py-2">
                  AVIF
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[3rem] bg-[#c8ff3d]/5 blur-3xl" />

              <div className="relative">
                {/* @ts-ignore */}
                <ImageFitTool lockedMode="convert" />   
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-white/5 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8ff3d]">
            How it works
          </p>

          <h2 className="mt-5 max-w-3xl text-3xl font-bold tracking-[-0.04em] sm:text-5xl">
            Convert an image in three simple steps.
          </h2>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-7">
              <p className="text-sm font-bold text-[#c8ff3d]">01</p>

              <h3 className="mt-5 text-xl font-bold">
                Upload
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/35">
                Choose the image you want to convert.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-7">
              <p className="text-sm font-bold text-[#c8ff3d]">02</p>

              <h3 className="mt-5 text-xl font-bold">
                Choose a format
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/35">
                Select the output format that fits your requirement.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-7">
              <p className="text-sm font-bold text-[#c8ff3d]">03</p>

              <h3 className="mt-5 text-xl font-bold">
                Download
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/35">
                Download the converted image and use it wherever you need.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="border-t border-white/5 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8ff3d]">
            Image conversion
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] sm:text-5xl">
            Convert images to the format you need
          </h2>

          <div className="mt-8 space-y-5 text-sm leading-7 text-white/40 sm:text-base">
            <p>
              Different websites, applications, and platforms can require
              images in specific formats. FitFile makes it easier to convert
              an image without installing complicated editing software.
            </p>

            <p>
              You can convert common image files between formats such as JPG,
              PNG, WebP, and AVIF. Simply upload your image, select the format
              you need, and download the converted file.
            </p>

            <p>
              Image conversion changes the file format. If your goal is to
              reduce the file size as much as possible, use the{" "}
              <a
                href="/image-compressor"
                className="font-semibold text-[#c8ff3d] hover:underline"
              >
                Image Compressor
              </a>
              . If you need exact dimensions, use the{" "}
              <a
                href="/image-resizer"
                className="font-semibold text-[#c8ff3d] hover:underline"
              >
                Image Resizer
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-3 text-xs text-white/25 sm:flex-row">
          <span>© 2026 FitFile</span>
          <span>Make your file. Fit.</span>
        </div>
      </footer>
    </main>
  );
}