'use client';

import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

type ToastVariant = 'info' | 'success' | 'error' | 'warning';

interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

interface ToastContextValue {
  show: (toast: Omit<ToastItem, 'id'>) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (toast: Omit<ToastItem, 'id'>) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const next: ToastItem = {
        id,
        variant: 'info',
        duration: 5000,
        ...toast,
      };
      setToasts((prev) => [...prev, next]);
      window.setTimeout(() => dismiss(id), next.duration);
    },
    [dismiss],
  );

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-[1000] flex flex-col gap-3">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`min-w-[260px] max-w-[360px] rounded-lg border px-4 py-3 shadow-lg backdrop-blur bg-bg-card/80 border-white/10 text-white ${
            t.variant === 'success'
              ? 'ring-1 ring-neon-green/40'
              : t.variant === 'error'
                ? 'ring-1 ring-red-500/40'
                : t.variant === 'warning'
                  ? 'ring-1 ring-yellow-500/40'
                  : 'ring-1 ring-white/10'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {t.variant === 'success' && <span className="text-neon-green">✓</span>}
              {t.variant === 'error' && <span className="text-red-400">!</span>}
              {t.variant === 'warning' && <span className="text-yellow-400">!</span>}
              {(!t.variant || t.variant === 'info') && <span className="text-neon-cyan">i</span>}
            </div>
            <div className="flex-1">
              {t.title && <div className="font-semibold text-white/90">{t.title}</div>}
              {t.description && <div className="text-sm text-white/70">{t.description}</div>}
            </div>
            <button
              type="button"
              className="text-white/60 hover:text-white/90"
              onClick={() => onDismiss(t.id)}
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
