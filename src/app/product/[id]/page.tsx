// Role: Display complete product details with image gallery, description, quantity selection, wishlist, toast notifications, and SEO

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingBag, Heart } from "lucide-react";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useToastStore } from "@/stores/toast-store";
import Container from "@/components/layout/Container";
import { productService } from "@/services/product-service";
import type { Product } from "@/types/product";

/* ===== SEO: GENERATE METADATA FOR DYNAMIC PRODUCT PAGES ===== */
// This runs on the server to generate meta tags before page renders
export async function generateMetadata({ params }: { params: { id: string } }) {
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
        type: "product",
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

export default function ProductDetailPage() {
  /* ===== STATE DECLARATIONS ===== */
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  
  /* ===== WISHLIST STORE ===== */
  const { isInWishlist, toggleItem } = useWishlistStore();
  const isWished = product ? isInWishlist(product.id) : false;
  
  /* ===== TOAST STORE ===== */
  const { showToast } = useToastStore();

  /* ===== FETCH PRODUCT ON PAGE LOAD ===== */
  useEffect(() => {
    // Action: Fetch product details when ID changes
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const productId = parseInt(id as string);
        const data = await productService.getProductById(productId);
        setProduct(data);
        setSelectedImage(data.images?.[0] || data.thumbnail);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  /* ===== HANDLE WISHLIST TOGGLE WITH TOAST ===== */
  const handleWishlistToggle = () => {
    if (!product) return;
    
    toggleItem(product);
    
    if (!isWished) {
      showToast(`${product.title} added to wishlist!`, "wishlist");
    } else {
      showToast(`${product.title} removed from wishlist`, "wishlist");
    }
  };

  /* ===== LOADING STATE ===== */
  if (loading) {
    return (
      <Container>
        <div className="py-12">
          {/* Action: Show loading skeleton */}
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-sm w-32 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-sm w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-sm w-1/2"></div>
                <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-sm"></div>
                <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-sm w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  /* ===== ERROR STATE ===== */
  if (error || !product) {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="text-red-500 mb-4">{error || "Product not found"}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-sm hover:bg-primary-hover transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </Container>
    );
  }

  /* ===== RENDER PRODUCT DETAILS ===== */
  return (
    <Container>
      <div className="py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* ===== LEFT COLUMN: IMAGE GALLERY ===== */}
          <div>
            {/* Main Image */}
            <div className="bg-gray-100 dark:bg-gray-800 rounded-sm overflow-hidden mb-4">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-96 object-contain"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-sm overflow-hidden border-2 transition-colors cursor-pointer ${
                      selectedImage === img
                        ? "border-primary"
                        : "border-transparent hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} - image ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ===== RIGHT COLUMN: PRODUCT INFO ===== */}
          <div>
            {/* Category Badge */}
            <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm text-gray-600 dark:text-gray-400 rounded-sm mb-4">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {product.title}
            </h1>

            {/* Rating Section */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating.rate)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product.rating.rate} / 5 ({product.rating.count} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons Section: Wishlist + Add to Cart */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Wishlist Button with Toast */}
                <button
                  onClick={handleWishlistToggle}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isWished
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWished ? "fill-current" : ""}`} />
                  <span>{isWished ? "Remove from Wishlist" : "Add to Wishlist"}</span>
                </button>
                
                {/* Add to Cart Button */}
                <AddToCartButton product={product} variant="full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== JSON-LD STRUCTURED DATA FOR SEO ===== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.images?.[0] || product.thumbnail,
            sku: product.id.toString(),
            brand: {
              "@type": "Brand",
              name: product.category,
            },
            offers: {
              "@type": "Offer",
              price: product.price,
              priceCurrency: "USD",
              availability: product.stock > 0 
                ? "https://schema.org/InStock" 
                : "https://schema.org/OutOfStock",
              url: `https://fluxcart.com/product/${product.id}`,
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: product.rating.rate,
              reviewCount: product.rating.count,
            },
          }),
        }}
      />
    </Container>
  );
}