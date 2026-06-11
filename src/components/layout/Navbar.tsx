// Role: Main navigation bar with cart badge, wishlist badge, dark mode toggle, search bar, and responsive links

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Sun, Moon, Heart } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useWishlistStore } from "@/stores/wishlist-store";
import { useThemeStore } from "@/stores/theme-store";
import { SearchBar } from "@/components/ui/SearchBar";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  
  /* ===== CART STORE ===== */
  // FIX: Subscribe to items array directly to trigger re-renders
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  /* ===== WISHLIST STORE ===== */
  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistCount = wishlistItems.length;
  
  /* ===== THEME STORE ===== */
  const { theme, toggleTheme, initTheme } = useThemeStore();

  /* ===== INITIALIZE THEME ON CLIENT ONLY ===== */
  useEffect(() => {
    initTheme();
    setMounted(true);
  }, [initTheme]);

  /* ===== SIMPLE NAVBAR DURING HYDRATION ===== */
  if (!mounted) {
    return (
      <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary">Flux</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Cart</span>
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  /* ===== FULL NAVBAR AFTER MOUNT ===== */
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Brand */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <span className="text-2xl font-bold text-primary">Flux</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Cart</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors cursor-pointer">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors cursor-pointer">
              Products
            </Link>
            <Link href="/wishlist" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors cursor-pointer">
              Wishlist
            </Link>
            <Link href="/cart" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors cursor-pointer">
              Cart
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block">
            <SearchBar />
          </div>

          {/* Right Side: Wishlist + Cart + Dark Mode Toggle */}
          <div className="flex items-center space-x-4">
            
            {/* Wishlist Icon with Badge */}
            <Link href="/wishlist" className="relative cursor-pointer">
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors group">
                <Heart className="w-5 h-5 text-gray-700 dark:text-gray-200 group-hover:text-white" />
              </div>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with Badge */}
            <Link href="/cart" className="relative cursor-pointer">
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors group">
                <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200 group-hover:text-white" />
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}