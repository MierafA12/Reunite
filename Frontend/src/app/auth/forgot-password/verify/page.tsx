"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, ShieldCheck, ArrowLeft, Loader2 } from "lucide-react";
import Button from "@/app/components/ui/Button";

export default function VerifyCodePage() {
    const router = useRouter();
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [code, setCode] = useState<string[]>(Array(6).fill(""));
    const [isVerifying, setIsVerifying] = useState(false);

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
        setIsVerifying(true);

        // Simulate verification
        setTimeout(() => {
            setIsVerifying(false);
            router.push("/auth/reset-password");
        }, 2000);
    };

    const isCodeComplete = code.every(digit => digit !== "");

    return (
        <div className="min-h-screen flex items-center justify-center bg-dark p-4">
            <div className="relative w-full max-w-md bg-dark-light/30 backdrop-blur-sm border border-white/5 rounded-3xl shadow-2xl p-8 md:p-10 animate-fadeInUp">

                {/* Close Button */}
                <Link
                    href="/auth/login"
                    className="absolute top-4 right-4 z-10 bg-danger/10 text-danger hover:bg-danger hover:text-white rounded-full p-2 transition-all shadow-sm"
                >
                    <X size={18} />
                </Link>

                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6 text-secondary">
                        <ShieldCheck size={40} />
                    </div>

                    <h1 className="text-3xl font-bold text-white mb-2">
                        Verify Email<span className="text-secondary">.</span>
                    </h1>
                    <div className="w-12 h-1 bg-secondary rounded shadow-sm mb-6"></div>

                    <p className="text-gray-400 text-sm font-medium mb-8">
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
                                    disabled={isVerifying}
                                    className="w-full h-14 text-center text-2xl font-bold text-white bg-dark border-2 border-white/10 rounded-xl focus:border-secondary focus:bg-dark-light focus:ring-4 focus:ring-secondary/10 outline-none transition-all shadow-sm"
                                />
                            ))}
                        </div>

                        <button
                            className={`w-full py-4 rounded-2xl text-lg font-bold transition-all flex items-center justify-center gap-3 ${isCodeComplete && !isVerifying
                                    ? "bg-secondary text-white hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                                }`}
                            onClick={onVerify}
                            disabled={!isCodeComplete || isVerifying}
                        >
                            {isVerifying ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Verifying...
                                </>
                            ) : (
                                "Verify & Continue"
                            )}
                        </button>

                        <div className="space-y-4">
                            <p className="text-sm text-gray-400 font-medium">
                                Didn't receive the code?{" "}
                                <button className="text-secondary font-bold hover:text-secondary/80 transition-colors underline decoration-2 underline-offset-4 decoration-secondary/20 hover:decoration-secondary">
                                    Resend Code
                                </button>
                            </p>

                            <Link
                                href="/auth/forgot-password"
                                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white font-medium transition-colors"
                            >
                                <ArrowLeft size={16} />
                                Back to Forgot Password
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
