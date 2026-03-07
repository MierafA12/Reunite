"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VerifyCodePage from "@/app/components/page/verify";
import { authApi } from "@/app/lib/api";

export default function VerifyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get context from URL params (e.g., ?type=forgot-password or ?type=register)
    const verificationType = searchParams.get("type") || "forgot-password";
    const email = searchParams.get("email") || "";
    const callbackUrl = searchParams.get("callbackUrl");

    // Configure content based on verification type
    const getConfig = () => {
        switch (verificationType) {
            case "forgot-password":
                return {
                    title: "Verify Reset Code",
                    description: "We've sent a 6-digit verification code to your email. Please enter it below to proceed.",
                    backLink: "/auth/forgot-password",
                    backLinkText: "Back to Forgot Password",
                    successRoute: `/auth/reset-password?email=${encodeURIComponent(email)}`,
                };
            case "register":
                return {
                    title: "Verify Your Account",
                    description: "We've sent a 6-digit verification code to your email. Please enter it to complete your registration.",
                    backLink: "/auth/register",
                    backLinkText: "Back to Registration",
                    successRoute: callbackUrl || "/dashboard/user",
                };
            default:
                return {
                    title: "Verify Email",
                    description: "We've sent a 6-digit verification code to your email. Please enter it below to proceed.",
                    backLink: "/auth/login",
                    backLinkText: "Back to Login",
                    successRoute: "/dashboard/user",
                };
        }
    };

    const config = getConfig();

    const handleVerify = async (code: string) => {
        console.log(`Verifying ${verificationType} code:`, code);
        setIsVerifying(true);
        setError(null);

        try {
            if (verificationType === "forgot-password") {
                await authApi.verifyResetOtp({ email, otp_code: code });
                // If successful, redirect to reset password with the code in the URL
                router.push(`${config.successRoute}&code=${code}`);
            } else if (verificationType === "register") {
                await authApi.verifyEmail({ otp_code: code });
                router.push(config.successRoute);
            } else {
                // Default fallback
                router.push(config.successRoute);
            }
        } catch (err: any) {
            console.error("Verification failed:", err);
            setError(err.response?.data?.message || "Invalid or expired verification code.");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        console.log(`Resending ${verificationType} verification code to:`, email);
        setError(null);
        try {
            if (verificationType === "register") {
                await authApi.resendVerification();
            } else if (verificationType === "forgot-password") {
                await authApi.forgotPassword({ email });
            }
            alert("A new verification code has been sent to your email.");
        } catch (err: any) {
            console.error("Resend failed:", err);
            setError(err.response?.data?.message || "Failed to resend code. Please try again.");
        }
    };

    return (
        <VerifyCodePage
            onSubmit={handleVerify}
            onResend={handleResend}
            isLoading={isVerifying}
            title={config.title}
            description={config.description}
            backLink={config.backLink}
            backLinkText={config.backLinkText}
            showResendButton={true}
            showCloseButton={true}
            closeLink="/auth/login"
        // Pass error but notice VerifyCodePage doesn't have error prop yet. 
        // I'll update VerifyCodePage next.
        />
    );
}
