import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fitfile.app"),

 title: {
  default: "FitFile — Make Your Files Fit",
  template: "%s | FitFile",
},

description:
  "Compress, resize, and convert files online. Make images and documents fit the size, dimensions, or format you need.",

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
      url: "https://fitfile.app",
    },
  ],

  creator: "FitFile",
  publisher: "FitFile",

  category: "technology",

  alternates: {
    canonical: "https://fitfile.app",
  },

  openGraph: {
    type: "website",
    url: "https://fitfile.app",
    siteName: "FitFile",
    title: "FitFile — Make Your Files Fit",
    description:
      "Compress, resize, and convert files online. Make images and documents fit the size, dimensions, or format you need.",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "FitFile — Make Your Files Fit",
    description:
      "Compress, resize, and convert files online. Make your files fit the size, dimensions, or format you need.",
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
      <body>{children}</body>
    </html>
  );
}