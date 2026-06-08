// Role: Main navigation bar with cart badge, dark mode toggle, and responsive links

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Sun, Moon } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { useThemeStore } from "@/stores/theme-store";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const totalItems = getTotalItems();
  const { theme, toggleTheme, initTheme } = useThemeStore();

  // Initialize theme on client only
  useEffect(() => {
    initTheme();
    setMounted(true);
  }, [initTheme]);

  // Don't render theme-dependent UI until mounted (prevents hydration mismatch)
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

  // Full navbar with theme toggle (only shown after client mount)
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">Flux</span>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Cart</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
              Products
            </Link>
            <Link href="/cart" className="text-gray-700 dark:text-gray-200 hover:text-primary transition-colors">
              Cart
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition-colors group">
                <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-200 group-hover:text-white" />
              </div>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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