"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

interface VerifyCodeForm {
  code: string;
}

export default function VerifyCodePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyCodeForm>();

  const onSubmit: SubmitHandler<VerifyCodeForm> = (data) => {
    console.log("Verification code:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-light px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 relative">

        {/* Header accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary rounded-t-2xl" />

        {/* Icon */}
        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="text-primary" size={32} />
        </div>

        <h2 className="text-2xl font-bold text-center text-neutral-dark">
          Verify your code
        </h2>
        <p className="text-center text-neutral text-sm mt-2 mb-8">
          We’ve sent a 6-digit verification code to your email.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {/* Code Input */}
          <div>
            <label className="block text-sm font-medium text-neutral mb-2 text-center">
              Enter verification code
            </label>
            <input
              type="text"
              maxLength={6}
              inputMode="numeric"
              placeholder="123456"
              {...register("code", {
                required: "Verification code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Code must be 6 digits",
                },
              })}
              className="
                w-full
                text-center
                tracking-[0.5em]
                text-lg
                font-semibold
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
            {errors.code && (
              <p className="text-danger text-xs mt-2 text-center">
                {errors.code.message}
              </p>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="
              w-full
              bg-primary
              hover:bg-primary-dark
              text-white
              py-3
              rounded-lg
              font-semibold
              transition
              active:scale-[0.97]
            "
          >
            Verify code
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 flex flex-col items-center gap-3 text-sm">
          <Link
            href="/auth/forgot-password"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Change email
          </Link>

          <button
            type="button"
            className="text-neutral hover:text-primary transition"
          >
            Resend code
          </button>
        </div>
      </div>
    </div>
  );
}
