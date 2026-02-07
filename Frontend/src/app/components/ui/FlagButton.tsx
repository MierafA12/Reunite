"use client";

import React, { useState } from "react";
import { Flag, AlertTriangle } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import Button from "./Button";
import Link from "next/link";

export default function FlagButton(): React.ReactNode {
    const { isLoggedIn } = useAuth();
    const [isFlagged, setIsFlagged] = useState<boolean>(false);

    const handleFlag = (): void => {
        if (!isLoggedIn) return;
        // In a real app, this would open a modal or send an API request
        setIsFlagged(true);
        alert("This report has been flagged for review. Thank you for keeping our community safe.");
    };

    if (!isLoggedIn) {
        return (
            <Link href="/auth/login" className="flex items-center gap-2 text-gray-400 hover:text-danger border border-white/10 px-4 py-2 rounded-xl transition-all text-sm font-medium">
                <Flag className="w-4 h-4" />
                <span>Flag Fake News</span>
            </Link>
        );
    }

    return (
        <button
            onClick={handleFlag}
            disabled={isFlagged}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium border ${isFlagged
                ? "bg-danger/20 text-danger border-danger/30"
                : "text-gray-400 hover:text-danger border-white/10 hover:border-danger/30"
                }`}
        >
            {isFlagged ? <AlertTriangle className="w-4 h-4" /> : <Flag className="w-4 h-4" />}
            <span>{isFlagged ? "Flagged" : "Flag Fake News"}</span>
        </button>
    );
}
