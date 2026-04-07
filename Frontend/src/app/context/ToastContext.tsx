"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from "lucide-react";
import clsx from "clsx";

type ToastType = "success" | "error" | "info" | "warning";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none">
                {toasts.map((toast) => (
                    <ToastItem 
                        key={toast.id} 
                        toast={toast} 
                        onClose={() => removeToast(toast.id)} 
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-400" />,
        error: <AlertCircle className="w-5 h-5 text-red-400" />,
        warning: <AlertTriangle className="w-5 h-5 text-orange-400" />,
        info: <Info className="w-5 h-5 text-blue-400" />,
    };

    const backgrounds = {
        success: "bg-green-500/10 border-green-500/20",
        error: "bg-red-500/10 border-red-500/20",
        warning: "bg-orange-500/10 border-orange-500/20",
        info: "bg-blue-500/10 border-blue-500/20",
    };

    return (
        <div 
            className={clsx(
                "pointer-events-auto flex items-start gap-4 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl animate-scaleIn transition-all",
                backgrounds[toast.type]
            )}
        >
            <div className="mt-0.5 shrink-0">
                {icons[toast.type]}
            </div>
            <p className="text-sm font-medium text-white/90 flex-grow pt-0.5 leading-relaxed">
                {toast.message}
            </p>
            <button 
                onClick={onClose}
                className="mt-0.5 text-white/30 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-lg shrink-0"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
