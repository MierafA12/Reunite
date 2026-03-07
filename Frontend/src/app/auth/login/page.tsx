"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { User, Lock, X, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/components/ui/Button";
import { useAuth } from "@/app/context/AuthContext";
import { authApi } from "@/app/lib/api";

interface LoginForm {
  email: string;
  password: string;
  remember?: boolean;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setIsLoading(true);
    setError(null);
    try {
      // Step 1: Get CSRF cookie
      await authApi.getCsrfCookie();

      // Step 2: Login
      const response = await authApi.login(data);
      console.log("Login successful:", response);

      // Update local context
      login(response.user);

      // Redirect to callbackUrl if present, otherwise dashboard
      if (callbackUrl) {
        router.push(callbackUrl);
      } else {
        router.push("/dashboard/user");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      if (!err.response) {
        setError("Network error: Could not connect to the server. Please ensure your backend is running.");
      } else if (err.response?.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else if (err.response?.data?.errors) {
        const validationErrors = Object.values(err.response.data.errors).flat().join(" ");
        setError(validationErrors);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
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
            {error && (
              <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-r-lg animate-fadeIn">
                <p className="text-danger text-sm font-medium">{error}</p>
              </div>
            )}

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
                  disabled={isLoading}
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
                  disabled={isLoading}
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
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="w-4 h-4 rounded border-neutral-light text-primary focus:ring-primary cursor-pointer"
                />
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
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Signing In...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            {/* Register Link */}
            <div className="pt-6 text-center">
              <p className="text-sm text-neutral font-medium">
                Don't have an account?{" "}
                <Link
                  href={callbackUrl ? `/auth/register?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/auth/register"}
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
