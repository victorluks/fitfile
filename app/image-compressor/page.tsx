import type { Metadata } from "next";
import ImageFitTool from "@/components/ImageFitTool";

export const metadata: Metadata = {
  title: "Compress Images Online — JPG, PNG & WebP",
  description:
    "Compress JPG, PNG, and WebP images online. Reduce image file size to a specific KB limit while keeping your image usable.",
  keywords: [
    "image compressor",
    "compress image online",
    "compress image to 100kb",
    "compress JPG",
    "compress PNG",
    "compress WebP",
    "reduce image size",
    "image compressor to 100kb",
  ],
  alternates: {
    canonical: "/image-compressor",
  },
  openGraph: {
    title: "Compress Images Online — JPG, PNG & WebP",
    description:
      "Reduce JPG, PNG, and WebP image file sizes to the limit you need with FitFile.",
    url: "/image-compressor",
    type: "website",
  },
};

export default function ImageCompressorPage() {
    const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FitFile Image Compressor",
    url: "https://fitfile.app/image-compressor",
    description:
      "Compress JPG, PNG, and WebP images online to a specific file-size limit.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
  return (
    <main className="min-h-screen bg-[#080a09] text-white">
      <section className="px-6 pb-16 pt-24 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8ff3d]">
              FitFile Image Compressor
            </p>

            <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
              Compress images.
              <br />
              <span className="text-[#c8ff3d]">Make them fit.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
              Reduce the size of your JPG, PNG, or WebP image to meet a
              specific file-size requirement. No complicated settings.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            <ImageFitTool lockedMode="compress" />
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-7">
              <p className="text-sm font-bold text-[#c8ff3d]">01</p>

              <h2 className="mt-5 text-xl font-bold">
                Choose your image
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/35">
                Upload the JPG, PNG, or WebP image you want to reduce.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-7">
              <p className="text-sm font-bold text-[#c8ff3d]">02</p>

              <h2 className="mt-5 text-xl font-bold">
                Set the size
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/35">
                Enter the maximum file size you need, such as 100 KB.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-7">
              <p className="text-sm font-bold text-[#c8ff3d]">03</p>

              <h2 className="mt-5 text-xl font-bold">
                Download
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/35">
                FitFile processes the image and gives you the optimized
                file ready to use.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8ff3d]">
            Image compression
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] sm:text-5xl">
            Why compress an image?
          </h2>

          <div className="mt-8 space-y-5 text-sm leading-7 text-white/40 sm:text-base">
            <p>
              Large image files can be difficult to upload, send, or use on
              websites that have strict file-size limits. Compressing an
              image reduces its file size while keeping the image usable.
            </p>

            <p>
              FitFile is designed around the requirement you actually have.
              If a website says your image must be under 100 KB, you can
              enter 100 KB instead of trying to understand complicated
              image-quality settings.
            </p>

            <p>
              You can also use FitFile when you simply need a smaller image
              for a website, application, email, form, or online service.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-3 text-xs text-white/25 sm:flex-row">
          <span>© 2026 FitFile</span>
          <span>Make your file. Fit.</span>
        </div>
      </footer>
    </main>
  );
}