"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";
import Button from "@/app/components/ui/Button";

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

  const onSubmit: SubmitHandler<ForgotPasswordForm> = (data) => {
    console.log("Forgot password:", data);
  };

  const handleSendResetLink = handleSubmit((data) => {
  console.log("Forgot password:", data);
  router.push("/auth/forgot-password/verify");
});


  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 relative overflow-hidden">

        {/* Decorative top bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary" />

        {/* Icon */}
        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="text-primary" size={32} />
        </div>

        <h2 className="text-2xl font-bold text-center text-neutral-dark">
          Forgot your password?
        </h2>
        <p className="text-center text-neutral text-sm mt-2 mb-8">
          Enter your email address and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          <div>
            <label className="block text-sm font-medium text-neutral mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className="
                  w-full
                  pl-10
                  pr-4
                  py-3
                  rounded-lg
                  border
                  border-neutral
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary-light
                  outline-none
                  transition
                "
              />
            </div>
            {errors.email && (
              <p className="text-danger text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Button */}
          <Button
           onClick={handleSendResetLink}
            type="submit"
            className="w-full py-3 rounded-xl"
          >
            Send reset link
          </Button>
        </form>

        {/* Footer links */}
        <div className="mt-8 text-center">
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
