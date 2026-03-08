"use client";

import { Check, X, AlertCircle, Plus, Edit, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const icons = {
  success: Check,
  error: X,
  info: AlertCircle,
};

const actionIcons = {
  added: Plus,
  edited: Edit,
  deleted: Trash2,
};

const colors = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
};

export function Toast({ id, type, message, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = icons[type];

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  // Detect action type from message
  const getActionIcon = () => {
    if (message.toLowerCase().includes("adicion") || message.toLowerCase().includes("add")) {
      return actionIcons.added;
    }
    if (message.toLowerCase().includes("edit") || message.toLowerCase().includes("atualiz")) {
      return actionIcons.edited;
    }
    if (message.toLowerCase().includes("exclu") || message.toLowerCase().includes("delet")) {
      return actionIcons.deleted;
    }
    return null;
  };

  const ActionIcon = getActionIcon();

  return (
    <div
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg
        transform transition-all duration-300 ease-in-out
        ${colors[type]}
        ${isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}
        max-w-md w-full
      `}
    >
      {ActionIcon && <ActionIcon size={18} className="flex-shrink-0" />}
      <Icon size={18} className="flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(() => onClose(id), 300);
        }}
        className="p-1 rounded-md hover:bg-black/10 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, onClose }: { toasts: ToastProps[]; onClose: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  );
}
