"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { X, ArrowLeft, Loader2 } from "lucide-react";
import Button from "@/app/components/ui/Button";
import { useAuth } from "@/app/context/AuthContext";
import { authApi } from "@/app/lib/api";

interface RegisterForm {
  first_name: string;
  middle_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  workplace: string;
  address: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    setError(null);
    try {
      // Map frontend fields to backend expected fields
      const payload = {
        ...data,
        password_confirmation: data.confirmPassword,
        role: "user", // Default role
      };

      const response = await authApi.register(payload);
      console.log("Registration successful:", response);

      // Log the user in locally
      login(response.user, response.access_token);

      // After successful registration, redirect to verification page
      router.push(`/auth/verify?type=register&email=${encodeURIComponent(data.email)}&callbackUrl=${encodeURIComponent(callbackUrl || "/dashboard/user")}`);
    } catch (err: any) {
      console.error("Registration failed:", err);
      if (!err.response) {
        setError("Network error: Could not connect to the server. Please ensure your backend is running.");
      } else if (err.response?.data?.errors) {
        // Handle Laravel validation errors (object of arrays)
        const validationErrors = Object.values(err.response.data.errors).flat().join(" ");
        setError(validationErrors);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark via-neutral-dark to-primary p-4">
      <div className="relative w-full max-w-6xl bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[1.5fr_2fr]">

        {/* Close Button */}
        <Link
          href="/"
          className="absolute top-4 right-4 z-10 bg-red-500 text-white rounded-full p-2 hover:scale-105 transition shadow-lg"
        >
          <X size={18} />
        </Link>

        {/* Left Image Background Section */}
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
            {/* Welcome Text */}
            <div className="mt-auto animate-fadeInUp">
              <h2 className="text-4xl font-bold mb-4 drop-shadow-2xl">Welcome to Reunite</h2>
              <p className="text-base leading-relaxed drop-shadow-lg opacity-90">
                Create an account to report missing persons, follow updates,
                and help reconnect families safely and responsibly.
              </p>
            </div>

            {/* Small Logo */}
            <div className="mt-10 w-full flex justify-center animate-bounce">
              <Image
                src="/images/1.png"
                alt="Reunite"
                width={100}
                height={100}
                className="rounded-2xl shadow-2xl border-2 border-white/20"
              />
            </div>

            <p className="text-xs text-white/70 mt-6 pt-4 border-t border-white/10">
              © {new Date().getFullYear()} Reunite Platform
            </p>
          </div>
        </div>

        <div className="p-10 relative">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Register<span className="text-primary">_</span>
          </h1>
          <div className="w-14 h-1 bg-primary rounded mb-6"></div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="bg-danger/10 border-l-4 border-danger p-4 rounded-r-lg animate-fadeIn text-danger text-sm font-medium">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">First Name</label>
                <input
                  type="text"
                  disabled={isLoading}
                  {...register("first_name", { required: "First name required" })}
                  className="w-full border-b border-gray-300 py-2 outline-none focus:border-primary transition-colors hover:border-primary/50"
                />
                {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Middle Name</label>
                <input
                  type="text"
                  disabled={isLoading}
                  {...register("middle_name")}
                  className="w-full border-b border-gray-300 py-2 outline-none focus:border-primary transition-colors hover:border-primary/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Last Name</label>
                <input
                  type="text"
                  disabled={isLoading}
                  {...register("last_name", { required: "Last name required" })}
                  className="w-full border-b border-gray-300 py-2 outline-none focus:border-primary transition-colors hover:border-primary/50"
                />
                {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
              <input
                type="email"
                disabled={isLoading}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className="w-full border-b border-gray-300 py-2 outline-none focus:border-primary transition-colors hover:border-primary/50"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Workplace</label>
                <input
                  type="text"
                  disabled={isLoading}
                  {...register("workplace")}
                  className="w-full border-b border-gray-300 py-2 outline-none focus:border-primary transition-colors hover:border-primary/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
                <input
                  type="text"
                  disabled={isLoading}
                  {...register("address")}
                  className="w-full border-b border-gray-300 py-2 outline-none focus:border-primary transition-colors hover:border-primary/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone</label>
                <input
                  type="text"
                  disabled={isLoading}
                  {...register("phone", { required: "Phone is required" })}
                  className="w-full border-b border-gray-300 py-2 outline-none focus:border-primary transition-colors hover:border-primary/50"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Password</label>
              <input
                type="password"
                disabled={isLoading}
                {...register("password", { required: "Password required", minLength: { value: 8, message: "Min 8 chars" } })}
                className="w-full border-b border-gray-300 py-2 outline-none focus:border-primary transition-colors hover:border-primary/50"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Confirm Password</label>
              <input
                type="password"
                disabled={isLoading}
                {...register("confirmPassword", {
                  required: "Confirm password",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
                className="w-full border-b border-gray-300 py-2 outline-none focus:border-primary transition-colors hover:border-primary/50"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" required className="mt-1" />
              <span>
                I agree to the{" "}
                <Link href="#" className="text-primary font-medium">
                  terms & conditions
                </Link>{" "}
                and responsible use policy.
              </span>
            </div>

            <Button
              type="submit"
              className="w-full py-3 rounded-xl flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Creating Account...</span>
                </>
              ) : (
                "Open Account"
              )}
            </Button>

            {/* Login Link */}
            <p className="text-sm text-center text-gray-500">
              Already have an account?{" "}
              <Link href={callbackUrl ? `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/auth/login"} className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>

          </form>
        </div>
      </div>

    </div>
  );
}
