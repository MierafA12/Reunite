"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import VerifyCodePage from "@/app/components/page/verify";

export default function VerifyPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isVerifying, setIsVerifying] = useState(false);

    // Get context from URL params (e.g., ?type=forgot-password or ?type=register)
    const verificationType = searchParams.get("type") || "forgot-password";
    const email = searchParams.get("email") || "";
    const callbackUrl = searchParams.get("callbackUrl");

    // Configure content based on verification type
    const getConfig = () => {
        switch (verificationType) {
            case "forgot-password":
                return {
                    title: "Verify Email",
                    description: "We've sent a 6-digit verification code to your email. Please enter it below to proceed.",
                    backLink: "/auth/forgot-password",
                    backLinkText: "Back to Forgot Password",
                    successRoute: "/auth/reset-password",
                };
            case "register":
                return {
                    title: "Verify Your Account",
                    description: "We've sent a 6-digit verification code to your email. Please enter it below to complete your registration.",
                    backLink: "/auth/register",
                    backLinkText: "Back to Registration",
                    successRoute: callbackUrl || "/dashboard/user",
                };
            case "2fa":
                return {
                    title: "Two-Factor Authentication",
                    description: "Enter the 6-digit code from your authenticator app or email.",
                    backLink: "/auth/login",
                    backLinkText: "Back to Login",
                    successRoute: "/dashboard/user",
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

    const handleVerify = (code: string) => {
        console.log(`Verifying ${verificationType} code:`, code);
        setIsVerifying(true);

        // TODO: Replace with actual API call
        // Example: await verifyCode({ code, type: verificationType, email });

        setTimeout(() => {
            setIsVerifying(false);
            router.push(config.successRoute);
        }, 2000);
    };

    const handleResend = () => {
        console.log(`Resending ${verificationType} verification code to:`, email);
        // TODO: Replace with actual API call
        // Example: await resendVerificationCode({ type: verificationType, email });
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
        />
    );
}
