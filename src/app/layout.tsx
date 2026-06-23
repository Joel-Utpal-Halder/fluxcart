// Role: Root layout with SEO metadata, viewport configuration, theme support, and hydration fix

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const inter = Inter({ subsets: ["latin"] });

/* ===== SEO METADATA ===== */
export const metadata: Metadata = {
  title: {
    default: "FluxCart - Modern E-Commerce Platform",
    template: "%s | FluxCart"
  },
  description: "Discover amazing products at unbeatable prices. Shop the latest trends in beauty, fragrances, furniture, groceries and more with fast shipping worldwide.",
  keywords: ["ecommerce", "online shopping", "fluxcart", "buy products online", "best deals", "shop online"],
  authors: [{ name: "FluxCart", url: "https://fluxcart.com" }],
  creator: "FluxCart",
  publisher: "FluxCart",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "FluxCart - Modern E-Commerce Platform",
    description: "Discover amazing products at unbeatable prices. Shop the latest trends with fast shipping worldwide.",
    url: "https://fluxcart.com",
    siteName: "FluxCart",
    images: [
      {
        url: "https://fluxcart.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FluxCart - Modern E-Commerce Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FluxCart - Modern E-Commerce Platform",
    description: "Discover amazing products at unbeatable prices. Shop the latest trends with fast shipping worldwide.",
    images: ["https://fluxcart.com/twitter-image.jpg"],
    creator: "@fluxcart",
    site: "@fluxcart",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  category: "ecommerce",
};

/* ===== VIEWPORT CONFIGURATION ===== */
// Moved from metadata to separate export (Next.js 15+ requirement)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}