// Role: Toast notification component for showing temporary messages

"use client";

import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Heart, ShoppingBag, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "wishlist" | "cart";

interface ToastProps {
  message: string;
  type: ToastType;
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);

  /* ===== AUTO CLOSE AFTER DURATION ===== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  /* ===== ICON BASED ON TOAST TYPE ===== */
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "wishlist":
        return <Heart className="w-5 h-5 text-red-500" />;
      case "cart":
        return <ShoppingBag className="w-5 h-5 text-primary" />;
      default:
        return <CheckCircle className="w-5 h-5 text-primary" />;
    }
  };

  /* ===== BACKGROUND COLOR BASED ON TOAST TYPE ===== */
  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800";
      case "error":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      case "wishlist":
        return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800";
      default:
        return "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-sm shadow-lg border transition-all duration-300 ${
        getBgColor()
      } ${
        isVisible
          ? "translate-x-0 opacity-100"
          : "translate-x-full opacity-0"
      }`}
    >
      {getIcon()}
      <span className="text-sm text-gray-700 dark:text-gray-300">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-2 p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-sm transition-colors cursor-pointer"
        aria-label="Close notification"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </div>
  );
}