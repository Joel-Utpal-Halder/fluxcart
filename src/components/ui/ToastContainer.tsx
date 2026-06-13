// Role: Container that renders all active toasts

"use client";

import { Toast } from "./Toast";
import { useToastStore } from "@/stores/toast-store";  // Correct path: go up 2 levels, then stores

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}