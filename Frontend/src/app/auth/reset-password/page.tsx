"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, ArrowLeft, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/components/ui/Button";
import SubmissionSuccess from "@/app/components/page/SubmissionSuccess";
import { authApi } from "@/app/lib/api";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  const onSubmit = async (data: ResetPasswordForm) => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = {
        email,
        otp_code: code,
        password: data.password,
        password_confirmation: data.confirmPassword,
      };

      await authApi.resetPassword(payload);
      setIsSuccess(true);
    } catch (err: any) {
      console.error("Reset password failed:", err);
      setError(err.response?.data?.message || "Reset failed. Please verify your email and code again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark p-4">
        <div className="w-full max-w-2xl">
          <SubmissionSuccess
            title="Password Reset Successful"
            subtitle="Success"
            message="Your password has been updated. You can now use your new password to sign in to your account."
            showStatusBadge={false}
            redirectUrl="/auth/login"
            redirectDelay={4000}
            progressDuration={4}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark p-4">
      <div className="relative w-full max-w-md bg-dark-light/30 backdrop-blur-sm border border-white/5 rounded-3xl shadow-2xl p-8 md:p-10 animate-fadeInUp">

        {/* Back Button */}
        <Link
          href={`/auth/verify?type=forgot-password&email=${encodeURIComponent(email)}`}
          className="absolute top-4 left-4 z-10 text-gray-400 hover:text-secondary transition-colors p-2"
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mb-6 text-secondary">
            <Lock size={40} />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            New Password<span className="text-secondary">.</span>
          </h1>
          <div className="w-12 h-1 bg-secondary rounded shadow-sm mb-4"></div>

          <p className="text-gray-400 text-sm font-medium">
            Create a strong password to secure your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-r-lg animate-fadeIn text-danger text-sm font-medium">
              {error}
            </div>
          )}

          {/* New Password */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-secondary">
              New Password
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-secondary transition-colors" size={18} />
              <input
                type="password"
                disabled={isLoading}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Minimum 8 characters" },
                })}
                placeholder="••••••••"
                className="w-full pl-7 pr-4 py-3 bg-transparent border-b-2 border-white/10 focus:border-secondary outline-none transition-all text-white placeholder:text-gray-600"
              />
            </div>
            {errors.password && (
              <p className="text-danger text-xs mt-1 animate-fadeIn">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="group">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 transition-colors group-focus-within:text-secondary">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-secondary transition-colors" size={18} />
              <input
                type="password"
                disabled={isLoading}
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
                placeholder="••••••••"
                className="w-full pl-7 pr-4 py-3 bg-transparent border-b-2 border-white/10 focus:border-secondary outline-none transition-all text-white placeholder:text-gray-600"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-danger text-xs mt-1 animate-fadeIn">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 rounded-2xl text-lg font-bold shadow-lg shadow-secondary/25 bg-secondary hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Resetting...</span>
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
