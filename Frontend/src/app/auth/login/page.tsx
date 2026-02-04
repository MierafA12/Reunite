"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { User, Lock, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log("Login form submitted:", data);
    // TODO: Add authentication logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark via-neutral-dark to-primary p-4">
      <div className="relative w-full max-w-5xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[1.5fr_2fr]">

        {/* Close Button / Go Back */}
        <Link
          href="/"
          className="absolute top-4 right-4 z-10 bg-danger text-white rounded-full p-2 hover:scale-105 transition shadow-lg"
        >
          <X size={18} />
        </Link>

        {/* LEFT SIDE - Image & Branding */}
        <div className="hidden md:flex flex-col justify-between text-white p-10 relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{
              backgroundImage: "url('/images/reunite-s.jpg')",
              filter: "blur(2px) brightness(0.65)"
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg border border-white/20">
                <Image src="/images/1.png" alt="Logo" width={24} height={24} />
              </div>
              <span className="font-bold text-xl tracking-tight">Reunite</span>
            </div>

            <div className="mt-auto animate-fadeInUp">
              <h2 className="text-4xl font-bold mb-4 drop-shadow-2xl">Welcome Back</h2>
              <p className="text-base leading-relaxed drop-shadow-lg opacity-90">
                Sign in to continue reporting, tracking, and reuniting families. Your contribution makes a difference.
              </p>
            </div>

            <p className="text-xs text-white/70 mt-6 pt-4 border-t border-white/10">
              (c) {new Date().getFullYear()} Reunite Platform
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - Form */}
        <div className="p-10 md:p-14 relative flex flex-col justify-center">
          <div className="mb-8 overflow-hidden">
            <h1 className="text-3xl font-bold text-neutral-dark mb-2">
              Sign In<span className="text-primary">.</span>
            </h1>
            <div className="w-12 h-1 bg-primary rounded shadow-sm"></div>
            <p className="text-neutral mt-4 text-sm font-medium">
              Enter your credentials to access your account.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div className="group">
              <label className="block text-xs font-bold text-neutral-dark uppercase tracking-wider mb-2 transition-colors group-focus-within:text-primary font-sans">
                Email Address
              </label>
              <div className="relative">
                <User className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-7 pr-4 py-3 bg-transparent border-b-2 border-neutral-light focus:border-primary outline-none transition-all text-neutral-dark placeholder:text-neutral/40"
                />
              </div>
              {errors.email && (
                <p className="text-danger text-xs mt-1 animate-fadeIn">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-xs font-bold text-neutral-dark uppercase tracking-wider mb-2 transition-colors group-focus-within:text-primary font-sans">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-neutral group-focus-within:text-primary transition-colors" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className="w-full pl-7 pr-4 py-3 bg-transparent border-b-2 border-neutral-light focus:border-primary outline-none transition-all text-neutral-dark placeholder:text-neutral/40"
                />
              </div>
              {errors.password && (
                <p className="text-danger text-xs mt-1 animate-fadeIn">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-neutral-light text-primary focus:ring-primary cursor-pointer" />
                <span className="text-sm text-neutral group-hover:text-neutral-dark transition-colors font-medium">Remember me</span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary hover:text-primary-dark font-semibold transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full py-3 rounded-xl"
            >
              Sign In
            </Button>

            {/* Register Link */}
            <div className="pt-6 text-center">
              <p className="text-sm text-neutral font-medium">
                Don't have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-primary font-bold hover:text-primary-dark transition-colors underline decoration-2 underline-offset-4 decoration-primary/20 hover:decoration-primary"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
