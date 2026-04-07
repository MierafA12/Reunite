"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import Modal from "@/app/components/ui/Modal";
import { AlertTriangle, Trash2, HelpCircle } from "lucide-react";

interface ConfirmOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "danger" | "primary" | "warning";
}

interface ConfirmContextType {
    confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export function ConfirmProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<(ConfirmOptions & { resolve: (val: boolean) => void }) | null>(null);

    const confirm = useCallback((options: ConfirmOptions) => {
        return new Promise<boolean>((resolve) => {
            setConfig({ ...options, resolve });
        });
    }, []);

    const handleConfirm = () => {
        if (config) {
            config.resolve(true);
            setConfig(null);
        }
    };

    const handleCancel = () => {
        if (config) {
            config.resolve(false);
            setConfig(null);
        }
    };

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            {config && (
                <Modal 
                    isOpen={!!config} 
                    onClose={handleCancel} 
                    title={config.title}
                >
                    <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                                config.variant === "danger" ? "bg-red-500/10 text-red-500" : 
                                config.variant === "warning" ? "bg-orange-500/10 text-orange-400" :
                                "bg-blue-500/10 text-blue-500"
                            }`}>
                                {config.variant === "danger" ? <Trash2 size={24} /> : 
                                 config.variant === "warning" ? <AlertTriangle size={24} /> :
                                 <HelpCircle size={24} />}
                            </div>
                            <div className="pt-1">
                                <p className="text-gray-300 leading-relaxed">
                                    {config.message}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-2">
                            <button
                                onClick={handleCancel}
                                className="flex-1 px-6 py-3.5 rounded-2xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-black uppercase tracking-widest border border-white/5"
                            >
                                {config.cancelText || "Cancel"}
                            </button>
                            <button
                                onClick={handleConfirm}
                                className={`flex-[1.5] py-3.5 rounded-2xl font-black uppercase tracking-widest shadow-lg transition-all text-white ${
                                    config.variant === "danger" ? "bg-red-500 hover:bg-red-400 shadow-red-500/20" :
                                    config.variant === "warning" ? "bg-orange-500 hover:bg-orange-400 shadow-orange-500/20" :
                                    "bg-secondary hover:opacity-90 shadow-secondary/20"
                                }`}
                            >
                                {config.confirmText || "Confirm"}
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    const context = useContext(ConfirmContext);
    if (!context) {
        throw new Error("useConfirm must be used within a ConfirmProvider");
    }
    return context;
}
