// Role: Manages toast notifications state

"use client";

import { create } from "zustand";
import type { ToastType } from "@/components/ui/Toast";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastStore {
  toasts: Toast[];
  showToast: (message: string, type: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  /* ===== INITIAL STATE ===== */
  toasts: [],

  /* ===== SHOW NEW TOAST ===== */
  showToast: (message: string, type: ToastType) => {
    console.log("🔔 showToast called:", { message, type }); // Debug log
    const id = Date.now().toString();
    set((state) => {
      console.log("Current toasts:", state.toasts); // Debug log
      return {
        toasts: [...state.toasts, { id, message, type }],
      };
    });
    
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 3000);
  },

  /* ===== REMOVE TOAST ===== */
  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },
}));