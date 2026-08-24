import type { Metadata } from "next";
import ImageFitTool from "@/components/ImageFitTool";

export const metadata: Metadata = {
  title: "Free Image Resizer — Resize JPG, PNG & WebP Online",
  description:
    "Free online image resizer for JPG, PNG, and WebP. Resize images to exact width and height while preserving the original aspect ratio when needed.",
  keywords: [
    "image resizer",
    "free image resizer",
    "resize image online",
    "resize image",
    "resize JPG",
    "resize PNG",
    "resize WebP",
    "resize image to exact dimensions",
    "resize image to specific size",
    "resize image to specific dimensions",
    "JPG resizer",
    "PNG resizer",
    "WebP resizer",
    "change image dimensions",
    "image resize tool",
    "online image resizing",
  ],
  alternates: {
    canonical: "/image-resizer",
  },
  openGraph: {
    title: "Free Image Resizer — Resize JPG, PNG & WebP Online",
    description:
      "Resize JPG, PNG, and WebP images to exact dimensions online. Preserve the original aspect ratio when needed.",
    url: "https://fitfile.vercel.app/image-resizer",
    siteName: "FitFile",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ImageResizerPage() {
    const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "FitFile Image Resizer",
    url: "https://fitfile.vercel.app/image-resizer",
    description:
      "Resize JPG, PNG, and WebP images online to exact width and height.",
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
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(structuredData),
  }}
/>
      <section className="px-6 pb-16 pt-24 lg:px-10 lg:pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8ff3d]">
              FitFile Image Resizer
            </p>

            <h1 className="mt-5 text-5xl font-black tracking-[-0.06em] sm:text-7xl">
              Resize your image.
              <br />
              <span className="text-[#c8ff3d]">Get the dimensions right.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-white/45 sm:text-lg">
              Resize JPG, PNG, and WebP images to the exact width and height
              you need. Keep the original proportions when necessary.
            </p>
          </div>

          <div className="mx-auto mt-14 max-w-3xl">
            <ImageFitTool lockedMode="resize" />
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
                Upload the image you want to resize.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-7">
              <p className="text-sm font-bold text-[#c8ff3d]">02</p>

              <h2 className="mt-5 text-xl font-bold">
                Set the dimensions
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/35">
                Enter the exact width and height you need, with an option to
                preserve the image's aspect ratio.
              </p>
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-7">
              <p className="text-sm font-bold text-[#c8ff3d]">03</p>

              <h2 className="mt-5 text-xl font-bold">
                Download
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/35">
                Download your resized image once processing is complete.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/5 px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#c8ff3d]">
            Image resizing
          </p>

          <h2 className="mt-5 text-3xl font-bold tracking-[-0.04em] sm:text-5xl">
            Resize an image to exact dimensions
          </h2>

          <div className="mt-8 space-y-5 text-sm leading-7 text-white/40 sm:text-base">
            <p>
              Different websites, applications, forms, and platforms can
              require images to have specific dimensions. Instead of guessing
              the correct settings, FitFile lets you enter the dimensions you
              need.
            </p>

            <p>
              The aspect-ratio option helps prevent unwanted stretching or
              distortion when you want to preserve the original proportions
              of your image.
            </p>

            <p>
              FitFile supports common image formats including JPG, PNG, and
              WebP, making it useful for profile pictures, website images,
              application forms, documents, and other online uploads.
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