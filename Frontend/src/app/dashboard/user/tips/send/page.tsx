"use client";

import React, { useState, useEffect, Suspense } from "react";
import Header from "@/app/components/layout/Header";
import { Send, ShieldCheck, ArrowLeft, MessageSquare, Info, CheckCircle2, Camera } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Button from "@/app/components/ui/Button";

function SendTipContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const caseId = searchParams.get("caseId") || "Unknown";
    const personName = searchParams.get("name") || "Missing Person";

    const [message, setMessage] = useState("");
    const [isSending, setIsSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setIsSending(true);
        // Simulate secure encryption and sending
        setTimeout(() => {
            setIsSending(false);
            setSent(true);
            setTimeout(() => {
                router.push(`/missing/${caseId}`);
            }, 3000);
        }, 2000);
    };

    if (sent) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center p-6 text-white text-center">
                <div className="max-w-md w-full space-y-6 animate-fadeInUp">
                    <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-success/30">
                        <CheckCircle2 className="w-12 h-12 text-success" />
                    </div>
                    <h1 className="text-4xl font-bold">Tip Sent Securely</h1>
                    <p className="text-gray-400">
                        Thank you for your contribution. Your tip has been encrypted and delivered directly to the family managing the case for {personName}.
                    </p>
                    <div className="pt-8 flex flex-col items-center gap-4">
                        <p className="text-xs text-secondary font-bold animate-pulse">Redirecting you back to the case details...</p>
                        <div className="w-48 bg-white/5 h-1 rounded-full overflow-hidden">
                            <div className="bg-secondary h-full animate-[progress_3s_linear]" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark text-white font-sans flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center px-6 pt-32 pb-20">
                <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">

                    {/* LEFT: CHAT INTERFACE */}
                    <div className="space-y-8">
                        <div>
                            <button
                                onClick={() => router.back()}
                                className="text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold mb-6"
                            >
                                <ArrowLeft size={16} /> Back to Case
                            </button>
                            <h1 className="text-4xl font-extrabold mb-4 tracking-tight">
                                Secure Tip for <span className="text-secondary">{personName}</span>
                            </h1>
                            <p className="text-gray-400">
                                This is an end-to-end encrypted connection. Your identity is protected and your message goes directly to the case managers.
                            </p>
                        </div>

                        <form onSubmit={handleSend} className="space-y-6">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-secondary to-primary rounded-[2rem] blur opacity-10 group-focus-within:opacity-25 transition duration-1000"></div>
                                <div className="relative bg-dark-light/50 border border-white/10 rounded-[2rem] p-4">
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Type your secret tip or detailed information here... Be as specific as possible (Location, time, clothing, etc.)"
                                        className="w-full bg-transparent p-4 min-h-[250px] outline-none text-lg placeholder:text-gray-600 resize-none"
                                        required
                                    />
                                    <div className="flex items-center justify-between mt-4 px-4 pb-2 border-t border-white/5 pt-4">
                                        <button type="button" className="text-gray-500 hover:text-secondary p-2 transition-colors">
                                            <Camera size={20} />
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSending || !message.trim()}
                                            className="bg-secondary text-white px-8 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSending ? "Encrypting..." : "Send Secure Tip"}
                                            <Send size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 px-6 py-4 bg-primary/5 rounded-2xl border border-primary/10">
                                <ShieldCheck className="text-primary shrink-0" />
                                <p className="text-xs text-gray-400 italic">
                                    Your data is encrypted locally using AES-256 before being transmitted.
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* RIGHT: CASE INFO & SECURITY TIPS */}
                    <aside className="space-y-6">
                        <div className="bg-dark-light/30 border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <MessageSquare size={100} className="text-secondary" />
                            </div>
                            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                                <Info className="text-secondary w-5 h-5" />
                                Reporting Tips
                            </h3>
                            <ul className="space-y-4 text-sm text-gray-400 leading-relaxed">
                                <li className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"></div>
                                    <span>Mention specific landmarks if you saw them in person.</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"></div>
                                    <span>Describe any companions they were with.</span>
                                </li>
                                <li className="flex gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 shrink-0"></div>
                                    <span>Include the approximate time of your sighting.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-secondary/20 to-transparent border border-secondary/10 rounded-3xl p-8">
                            <h3 className="font-bold mb-4">You are helping:</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-xl overflow-hidden relative">
                                    <Image src="/images/reunite.jpeg" alt="Person" fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold text-sm">{personName}</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Case #{caseId}</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}

export default function SendTipPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-dark flex items-center justify-center text-white">Loading Security Protocol...</div>}>
            <SendTipContent />
        </Suspense>
    );
}
