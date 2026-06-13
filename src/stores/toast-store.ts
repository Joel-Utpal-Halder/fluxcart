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
  toasts: [],

  showToast: (message: string, type: ToastType) => {
    console.log("🔔 showToast called:", { message, type });
    
    const id = Math.random().toString(36).substring(7);
    const newToast = { id, message, type };
    
    console.log("🔔 New toast object:", newToast);
    
    // Direct set without using previous state callback
    set((state) => {
      console.log("🔔 State before update:", state.toasts);
      const newToasts = [...state.toasts, newToast];
      console.log("🔔 State after update:", newToasts);
      return { toasts: newToasts };
    });
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      set((state) => {
        console.log("🔔 Removing toast:", id);
        return { toasts: state.toasts.filter((t) => t.id !== id) };
      });
    }, 3000);
  },

  removeToast: (id: string) => {
    console.log("🔔 Manual remove toast:", id);
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));