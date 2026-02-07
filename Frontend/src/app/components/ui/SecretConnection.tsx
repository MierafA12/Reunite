"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MessageSquare, ShieldAlert, Send } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

interface SecretConnectionProps {
    ownerId: string;
    personName: string;
}

export default function SecretConnection({ ownerId, personName }: SecretConnectionProps): React.ReactNode {
    const { isLoggedIn, user } = useAuth();
    const pathname = usePathname();
    const router = useRouter();

    const isOwner = isLoggedIn && user?.id === ownerId;

    if (isOwner) return null;

    const getTipUrl = () => `/dashboard/user/tips/send?caseId=${ownerId}&name=${encodeURIComponent(personName)}`;

    const handleSend = () => {
        router.push(getTipUrl());
    };

    return (
        <div className="bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20 rounded-3xl p-10 relative overflow-hidden group animate-fadeIn">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
                <ShieldAlert size={120} className="text-secondary" />
            </div>

            <div className="relative z-10 max-w-2xl">
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                    <MessageSquare className="text-secondary" />
                    Help Secretly
                </h3>
                <p className="text-gray-400 mb-8 text-lg leading-relaxed">
                    If you have seen {personName} or have any tips, you can connect directly and secretly with the family. Your information is end-to-end encrypted.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <button
                        onClick={() => isLoggedIn
                            ? handleSend()
                            : (window.location.href = `/provide-info?callbackUrl=${encodeURIComponent(getTipUrl())}`)}
                        className={`w-full sm:w-auto px-10 py-5 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 bg-secondary text-white hover:shadow-[0_0_25px_rgba(79,70,229,0.4)] hover:scale-[1.02] cursor-pointer`}
                    >
                        <Send size={20} />
                        {isLoggedIn ? "Provide Secret Tip Now" : "Login to Provide Tip"}
                    </button>
                    {!isLoggedIn && (
                        <Link href={`/provide-info?callbackUrl=${encodeURIComponent(getTipUrl())}`} className="text-secondary text-sm font-bold hover:underline">How it works</Link>
                    )}
                    <p className="text-[10px] text-gray-500 font-medium italic">* Opens a secure, private connection.</p>
                </div>
            </div>
        </div>
    );
}
