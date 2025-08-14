import { useState } from "react";

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: "success" | "error", message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    showSuccess: (message: string) => addToast("success", message),
    showError: (message: string) => addToast("error", message),
    removeToast,
  };
}
