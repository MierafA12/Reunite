"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Button from "@/app/components/ui/Button";
import SuccessMessage from "@/app/components/page/success";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

export default function ResetPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>();

  const onSubmit = (data: ResetPasswordForm) => {
    console.log("Reset password:", data);
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark via-neutral-dark to-primary p-4">
        <div className="w-full max-w-2xl">
          <SuccessMessage 
            title="Password Reset Successful"
            message="Your password has been updated. You can now use your new password to sign in to your account."
            buttonText="Go to Login"
            buttonLink="/auth/login"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark via-neutral-dark to-primary p-4">
      <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 animate-slideUp">
        
        {/* Back Button */}
        <Link
          href="/auth/forgot-password/verify"
          className="absolute top-4 left-4 z-10 text-neutral hover:text-primary transition-colors p-2"
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 animate-bounce-subtle">
            <Lock className="text-primary" size={40} />
          </div>

          <h1 className="text-3xl font-bold text-neutral-dark mb-2">
            New Password<span className="text-primary">.</span>
          </h1>
          <div className="w-12 h-1 bg-primary rounded shadow-sm mb-4"></div>
          
          <p className="text-neutral text-sm font-medium">
            Create a strong password to secure your account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* New Password */}
          <div className="group">
            <label className="block text-xs font-bold text-neutral-dark uppercase tracking-wider mb-2 transition-colors group-focus-within:text-primary">
              New Password
            </label>
            <div className="relative">
              <ShieldCheck className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                placeholder="••••••••"
                className="w-full pl-7 pr-4 py-3 bg-transparent border-b-2 border-neutral-light focus:border-primary outline-none transition-all text-neutral-dark placeholder:text-neutral/40"
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
            <label className="block text-xs font-bold text-neutral-dark uppercase tracking-wider mb-2 transition-colors group-focus-within:text-primary">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral group-focus-within:text-primary transition-colors" size={18} />
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
                placeholder="••••••••"
                className="w-full pl-7 pr-4 py-3 bg-transparent border-b-2 border-neutral-light focus:border-primary outline-none transition-all text-neutral-dark placeholder:text-neutral/40"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-danger text-xs mt-1 animate-fadeIn">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full py-4 rounded-xl text-lg font-semibold shadow-lg shadow-primary/25">
            Reset Password
          </Button>
        </form>
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
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
