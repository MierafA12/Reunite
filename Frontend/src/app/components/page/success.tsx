"use client";

import React from "react";
import { CheckCircle2, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import Button from "@/app/components/ui/Button";

interface SuccessMessageProps {
    title?: string;
    message?: string;
    buttonText?: string;
    buttonLink?: string;
    secondaryButtonText?: string;
    secondaryButtonLink?: string;
}

export default function SuccessMessage({
    title = "Congratulations!",
    message = "You've successfully completed the process. Your account is now ready to use.",
    buttonText = "Continue to Dashboard",
    buttonLink = "/",
    secondaryButtonText = "Go to Login",
    secondaryButtonLink = "/auth/login",
}: SuccessMessageProps) {
    return (
        <div className="min-h-[450px] flex flex-col items-center justify-center p-8 text-center bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20 shadow-xl animate-fadeIn">
            <div className="relative mb-10">
                {/* Animated Rings */}
                <div className="absolute inset-0 -inset-4 bg-success/10 rounded-full animate-pulse-slow" />
                <div className="absolute inset-0 -inset-8 bg-success/5 rounded-full animate-pulse-slower" />

                {/* Main Icon */}
                <div className="relative w-28 h-28 bg-gradient-to-br from-success to-success-dark rounded-full flex items-center justify-center shadow-2xl shadow-success/40 animate-achievement-pop">
                    <CheckCircle2 className="text-white" size={56} strokeWidth={2.5} />

                    {/* Confetti-like bits */}
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full animate-bounce-delayed" />
                    <div className="absolute -bottom-1 -left-3 w-3 h-3 bg-secondary rounded-full animate-bounce" />
                </div>
            </div>

            <h2 className="text-4xl font-extrabold text-neutral-dark mb-4 drop-shadow-sm tracking-tight">
                {title}<span className="text-success">!</span>
            </h2>

            <p className="text-neutral-dark/60 max-w-md text-lg font-medium leading-relaxed mb-12 opacity-90 italic">
                "{message}"
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full max-w-md justify-center">
                {secondaryButtonText && secondaryButtonLink && (
                    <Link href={secondaryButtonLink} className="flex-1">
                        <Button variant="outline" className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 group border-neutral-light hover:border-primary transition-all duration-300">
                            <Home size={20} className="group-hover:scale-110 transition-transform text-neutral" />
                            <span className="text-neutral-dark font-bold">{secondaryButtonText}</span>
                        </Button>
                    </Link>
                )}

                <Link href={buttonLink} className="flex-1">
                    <Button className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-primary/30 group bg-gradient-to-r from-primary to-secondary hover:scale-[1.02] transition-all">
                        <span className="font-bold">{buttonText}</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Link>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes achievement-pop {
          0% { transform: scale(0); rotate: -15deg; }
          70% { transform: scale(1.1); rotate: 5deg; }
          100% { transform: scale(1); rotate: 0deg; }
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.3; }
        }
        @keyframes pulse-slower {
          0%, 100% { transform: scale(1.1); opacity: 0.1; }
          50% { transform: scale(1.25); opacity: 0.15; }
        }
        @keyframes bounce-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(0.9); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-achievement-pop {
          animation: achievement-pop 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }
        .animate-bounce-delayed {
          animation: bounce-delayed 2.5s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
}
