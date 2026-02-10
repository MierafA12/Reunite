"use client";

import React, { useEffect } from "react";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

interface SubmissionSuccessProps {
    title?: string;
    subtitle?: string;
    message?: string;
    statusBadge?: string;
    showStatusBadge?: boolean;
    redirectUrl?: string;
    redirectDelay?: number; // in milliseconds
    progressDuration?: number; // in seconds
    onComplete?: () => void;
}

export default function SubmissionSuccess({
    title = "Submission",
    subtitle = "Received",
    message = "Your submission has been successfully received and is now in our verification pipeline. Our team will review the details to ensure accuracy.",
    statusBadge = "Verification Pending",
    showStatusBadge = true,
    redirectUrl,
    redirectDelay = 4000,
    progressDuration = 4,
    onComplete
}: SubmissionSuccessProps) {
    const router = useRouter();

    useEffect(() => {
        if (redirectUrl || onComplete) {
            const timer = setTimeout(() => {
                if (onComplete) {
                    onComplete();
                }
                if (redirectUrl) {
                    router.push(redirectUrl);
                }
            }, redirectDelay);

            return () => clearTimeout(timer);
        }
    }, [redirectUrl, redirectDelay, onComplete, router]);

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center p-6">
            <div className="max-w-md w-full text-center space-y-8 animate-fadeInUp">
                {/* Success Icon */}
                <div className="relative mx-auto w-24 h-24">
                    <div className="absolute inset-0 bg-success/20 rounded-full blur-xl animate-pulse" />
                    <div className="relative w-24 h-24 bg-success/20 rounded-full flex items-center justify-center border border-success/30">
                        <CheckCircle2 className="w-12 h-12 text-success" />
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">
                        {title} <span className="text-success">{subtitle}</span>
                    </h1>

                    {showStatusBadge && (
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-bold uppercase tracking-wider">
                            <ShieldCheck size={14} />
                            {statusBadge}
                        </div>
                    )}

                    <p className="text-gray-400 leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* Progress Bar */}
                {(redirectUrl || onComplete) && (
                    <div className="space-y-4">
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div
                                className="bg-secondary h-full animate-[progress_linear]"
                                style={{
                                    animation: `progress ${progressDuration}s linear forwards`
                                }}
                            />
                        </div>
                        <p className="text-xs text-gray-600 italic">
                            {redirectUrl ? "Redirecting you back to dashboard..." : "Processing..."}
                        </p>
                    </div>
                )}

                <style jsx>{`
          @keyframes progress {
            from {
              width: 0%;
            }
            to {
              width: 100%;
            }
          }
        `}</style>
            </div>
        </div>
    );
}
