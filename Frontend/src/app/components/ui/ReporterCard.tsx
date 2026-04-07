"use client";

import React from "react";
import { ShieldCheck, Lock } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import Button from "./Button";
import { useToast } from "@/app/context/ToastContext";

interface ReporterCardProps {
    name: string;
    initials: string;
    role: string;
    message: string;
    ownerId: string | number;
    isVerified?: boolean;

}

export default function ReporterCard({
    name,
    initials,
    role,
    message,
    ownerId,
    isVerified = true
}: ReporterCardProps): React.ReactNode {
    const { isLoggedIn, user } = useAuth();
    const { showToast } = useToast();
    const isOwner = isLoggedIn && user?.id == ownerId;


    if (isOwner) {
        return (
            <div className="bg-dark-light border border-white/5 rounded-3xl p-8 overflow-hidden relative">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                    Management View
                </h2>
                <div className="space-y-4">
                    <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-4">
                        <p className="text-secondary text-sm font-medium">You are the author of this report.</p>
                        <p className="text-gray-400 text-xs mt-1">Use the tools in the header to update or manage this case.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-dark-light border border-white/5 rounded-3xl p-8 overflow-hidden relative">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                {isVerified && <ShieldCheck className="w-5 h-5 text-secondary" />}
                {isVerified ? "Verified Reporter" : "Reporter Info"}
            </h2>

            <div className={!isLoggedIn ? "blur-sm select-none opacity-40" : ""}>
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/20 font-bold text-xl text-secondary">
                        {initials}
                    </div>
                    <div>
                        <h4 className="font-bold text-white leading-tight">
                            {isLoggedIn ? name : "•••••••• •••••••"}
                        </h4>
                        <p className="text-sm text-gray-500">{role}</p>
                    </div>
                </div>

                <div className="space-y-4 mb-8">
                    <div className="text-sm text-gray-400 leading-relaxed italic">
                        "{isLoggedIn ? message : "•••• •• ••••••••• •• •••• •••• •••••• •••• •• •• ••••••• •••• ••••"}"
                    </div>
                </div>

                {isLoggedIn && (
                    <Button
                        variant="secondary"
                        className="w-full py-4 rounded-2xl font-bold mb-4 shadow-lg shadow-secondary/20 hover:scale-[1.02] transition-all"
                        onClick={() => showToast("Initiating secure connection with family...", "info")}
                    >
                        Connect Privately
                    </Button>
                )}
            </div>

            {!isLoggedIn && (
                <div className="absolute inset-x-0 bottom-0 top-[60px] bg-gradient-to-t from-dark-light to-transparent flex flex-col items-center justify-end p-8 text-center">
                    <p className="text-sm text-gray-300 font-medium mb-4">Contact information is hidden for privacy.</p>
                    <Button
                        href="/auth/login"
                        variant="secondary"
                        className="w-full py-4 rounded-2xl font-bold hover:shadow-lg transition-all"
                    >
                        Login to Connect
                    </Button>
                </div>
            )}
        </div>
    );
}
