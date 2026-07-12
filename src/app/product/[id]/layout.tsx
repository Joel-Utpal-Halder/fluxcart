// File: src/app/product/[id]/layout.tsx
// Role: Provides metadata for product detail pages (Server Component)

import { productService } from "@/services/product-service";
import type { Metadata } from "next";

/* ===== SEO: GENERATE METADATA FOR DYNAMIC PRODUCT PAGES ===== */
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const productId = parseInt(params.id);
    const product = await productService.getProductById(productId);
    
    return {
      title: `${product.title} | FluxCart`,
      description: product.description.substring(0, 160),
      keywords: [product.category, product.title, "buy online", "ecommerce", "shop"],
      openGraph: {
        title: product.title,
        description: product.description.substring(0, 160),
        images: [product.images?.[0] || product.thumbnail],
        type: "website",  // ← Changed from "product" to "website"
        url: `https://fluxcart.com/product/${product.id}`,
      },
      twitter: {
        card: "summary_large_image",
        title: product.title,
        description: product.description.substring(0, 160),
        images: [product.images?.[0] || product.thumbnail],
      },
      alternates: {
        canonical: `https://fluxcart.com/product/${product.id}`,
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found | FluxCart",
      description: "The requested product could not be found. Browse our collection for amazing deals.",
    };
  }
}

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}