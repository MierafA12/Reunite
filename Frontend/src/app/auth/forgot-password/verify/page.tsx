"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ShieldCheck, ArrowLeft } from "lucide-react";
import Button from "@/app/components/ui/Button";

export default function VerifyCodePage() {
    const router = useRouter();
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [code, setCode] = useState<string[]>(Array(6).fill(""));

    const handleChange = (value: string, index: number) => {
        if (value.length > 1) value = value.slice(-1);
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
        const newCode = [...code];
        pastedData.forEach((char, i) => {
            if (newCode[i] !== undefined) {
                newCode[i] = char;
                if (inputsRef.current[i]) {
                    inputsRef.current[i]!.value = char;
                }
            }
        });
        setCode(newCode);
        if (pastedData.length > 0) {
            const lastIndex = Math.min(pastedData.length - 1, 5);
            inputsRef.current[lastIndex]?.focus();
        }
    };

    const onVerify = () => {
        const fullCode = code.join("");
        console.log("Verifying code:", fullCode);
        router.push("/auth/reset-password");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark via-neutral-dark to-primary p-4">
            <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 animate-slideUp">

                {/* Close Button */}
                <Link
                    href="/auth/login"
                    className="absolute top-4 right-4 z-10 bg-danger/10 text-danger hover:bg-danger hover:text-white rounded-full p-2 transition-all shadow-sm"
                >
                    <X size={18} />
                </Link>

                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 animate-bounce-subtle">
                        <ShieldCheck className="text-primary" size={40} />
                    </div>

                    <h1 className="text-3xl font-bold text-neutral-dark mb-2">
                        Verify Email<span className="text-primary">.</span>
                    </h1>
                    <div className="w-12 h-1 bg-primary rounded shadow-sm mb-6"></div>

                    <p className="text-neutral text-sm font-medium mb-8">
                        We've sent a 6-digit verification code to your email. Please enter it below to proceed.
                    </p>

                    <div className="w-full space-y-8">
                        <div className="flex justify-between gap-2">
                            {[...Array(6)].map((_, i) => (
                                <input
                                    key={i}
                                    ref={(el) => {
                                        inputsRef.current[i] = el;
                                    }}
                                    type="text"
                                    maxLength={1}
                                    inputMode="numeric"
                                    value={code[i]}
                                    onPaste={handlePaste}
                                    onChange={(e) => handleChange(e.target.value, i)}
                                    onKeyDown={(e) => handleKeyDown(e, i)}
                                    className="w-full h-14 text-center text-2xl font-bold text-neutral-dark bg-neutral-light border-2 border-transparent rounded-xl focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 outline-none transition-all shadow-sm"
                                />
                            ))}
                        </div>

                        <Button
                            className="w-full py-4 rounded-xl text-lg font-semibold shadow-lg shadow-primary/25"
                            onClick={onVerify}
                        >
                            Verify & Continue
                        </Button>

                        <div className="space-y-4">
                            <p className="text-sm text-neutral font-medium">
                                Didn't receive the code?{" "}
                                <button className="text-primary font-bold hover:text-primary-dark transition-colors underline decoration-2 underline-offset-4 decoration-primary/20 hover:decoration-primary">
                                    Resend Code
                                </button>
                            </p>

                            <Link
                                href="/auth/forgot-password"
                                className="inline-flex items-center gap-2 text-sm text-neutral hover:text-neutral-dark font-medium transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Back to Forgot Password
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                @keyframes bounce-subtle {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-8px);
                    }
                }
                .animate-slideUp {
                    animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}
