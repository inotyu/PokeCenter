"use client";

import { useState, useCallback } from "react";
import { ToastProps, ToastType } from "@/components/ui/Toast";

export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback((type: ToastType, message: string, duration?: number) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastProps = {
      id,
      type,
      message,
      duration,
      onClose: removeToast,
    };

    setToasts((prev) => [...prev, newToast]);
    return id;
  }, [removeToast]);

  const success = useCallback((message: string, duration?: number) => {
    return addToast("success", message, duration);
  }, [addToast]);

  const error = useCallback((message: string, duration?: number) => {
    return addToast("error", message, duration);
  }, [addToast]);

  const info = useCallback((message: string, duration?: number) => {
    return addToast("info", message, duration);
  }, [addToast]);

  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
  };
}
