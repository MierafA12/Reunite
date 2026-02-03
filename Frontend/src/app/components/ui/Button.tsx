"use client";

import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "outline";

interface ButtonProps {
    children: ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    href?: string;
    variant?: ButtonVariant;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
}

export default function Button({
    children,
    onClick,
    type = "button",
    href,
    variant = "primary",
    disabled = false,
    loading = false,
    className,
}: ButtonProps) {
    const baseStyles = `
    inline-flex items-center justify-center gap-2
    px-5 py-2.5
    rounded-lg
    font-semibold
    text-sm
    transition
    focus:outline-none
    focus:ring-2
    focus:ring-offset-2
    active:scale-[0.97]
  `;

    const variants: Record<ButtonVariant, string> = {
        primary:
            "bg-primary text-white hover:bg-primary-dark focus:ring-primary-light",
        secondary:
            "bg-secondary text-white hover:opacity-90 focus:ring-secondary",
        ghost:
            "bg-transparent text-primary hover:bg-primary-light focus:ring-primary-light",
        danger:
            "bg-danger text-white hover:bg-danger focus:ring-danger-light",
        outline:
            "bg-transparent text-neutral-dark border-2 border-neutral-light hover:bg-neutral-light focus:ring-neutral-light",
    };

    const disabledStyles = "opacity-60 cursor-not-allowed";

    const classes = clsx(
        baseStyles,
        variants[variant],
        (disabled || loading) && disabledStyles,
        className
    );

    // LINK BUTTON
    if (href) {
        return (
            <Link
                href={href}
                className={classes}
                aria-disabled={disabled || loading}
            >
                {loading ? "Loading..." : children}
            </Link>
        );
    }

    // NORMAL BUTTON
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={classes}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}
