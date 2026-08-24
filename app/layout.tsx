import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://fitfile.vercel.app"),

  title: {
    default: "FitFile — Free Image Compressor, Converter & Resizer",
    template: "%s | FitFile",
  },

  description:
    "Free online image tools to compress, resize, and convert JPG, PNG, WebP, and other image files quickly and easily.",

  keywords: [
    "image compressor",
    "free image compressor",
    "compress image online",
    "compress image to 100kb",
    "compress JPG",
    "compress PNG",
    "compress WebP",
    "image resizer",
    "resize image online",
    "resize image to exact dimensions",
    "image converter",
    "convert image online",
    "JPG to PNG",
    "PNG to JPG",
    "JPG to WebP",
    "image tools",
  ],

  applicationName: "FitFile",

  authors: [
    {
      name: "FitFile",
      url: "https://fitfile.vercel.app",
    },
  ],

  creator: "FitFile",
  publisher: "FitFile",

  category: "technology",

  alternates: {
    canonical: "https://fitfile.vercel.app",
  },

  openGraph: {
    type: "website",
    url: "https://fitfile.vercel.app",
    siteName: "FitFile",
    title: "FitFile — Free Image Compressor, Converter & Resizer",
    description:
      "Free online image tools to compress, resize, and convert JPG, PNG, WebP, and other image files quickly and easily.",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "FitFile — Free Image Compressor, Converter & Resizer",
    description:
      "Free online image tools to compress, resize, and convert JPG, PNG, WebP, and other image files quickly and easily.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}<Analytics /></body>
    </html>
  );
}