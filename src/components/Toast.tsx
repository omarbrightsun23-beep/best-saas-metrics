'use client';

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let borderClass = 'border-blue-200';
        let bgClass = 'bg-white text-slate-900';
        let icon = <Info className="w-4 h-4 text-blue-600 shrink-0" />;

        if (toast.type === 'success') {
          borderClass = 'border-emerald-200';
          icon = <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />;
        } else if (toast.type === 'error') {
          borderClass = 'border-rose-200';
          icon = <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />;
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-2xl border ${borderClass} ${bgClass} shadow-xl shadow-blue-900/10 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-150`}
          >
            <div className="flex items-center gap-2.5">
              {icon}
              <span className="leading-snug">{toast.message}</span>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-slate-700 transition p-1 cursor-pointer shrink-0"
              aria-label="Dismiss Notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
