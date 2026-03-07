"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft, Loader2 } from "lucide-react";
import Button from "@/app/components/ui/Button";
import { authApi } from "@/app/lib/api";

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

  const onSubmit: SubmitHandler<ForgotPasswordForm> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      await authApi.forgotPassword(data);
      // Navigate to unified verification page with type and email
      router.push(`/auth/verify?type=forgot-password&email=${encodeURIComponent(data.email)}`);
    } catch (err: any) {
      console.error("Forgot password failed:", err);
      setError(err.response?.data?.message || "Something went wrong. Please check your email and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-4">
      <div className="w-full max-w-md bg-dark-light/30 backdrop-blur-sm border border-white/5 rounded-3xl shadow-2xl p-10 relative animate-fadeInUp">

        {/* Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6 text-secondary">
            <Mail size={32} />
          </div>

          <h2 className="text-3xl font-bold text-white mb-2">
            Forgot Password<span className="text-secondary">?</span>
          </h2>
          <div className="w-12 h-1 bg-secondary rounded shadow-sm mb-4"></div>

          <p className="text-gray-400 text-sm font-medium">
            Enter your email address and we'll send you a verification code.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-r-lg animate-fadeIn text-danger text-sm font-medium">
              {error}
            </div>
          )}

          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-secondary">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-secondary transition-colors" size={18} />
              <input
                type="email"
                disabled={isLoading}
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full pl-7 pr-4 py-3 bg-transparent border-b-2 border-white/10 focus:border-secondary outline-none transition-all text-white placeholder:text-gray-600"
              />
            </div>
            {errors.email && (
              <p className="text-danger text-xs mt-1 animate-fadeIn">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl text-lg font-bold shadow-lg shadow-secondary/25 bg-secondary hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Sending Code...</span>
              </>
            ) : (
              "Send Verification Code"
            )}
          </Button>
        </form>

        {/* Footer links */}
        <div className="mt-8 text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm text-secondary hover:underline font-bold"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
