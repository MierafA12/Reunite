"use client";

import React, { useState, useEffect } from "react";
import { Flag, AlertTriangle, Send } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Modal from "./Modal";
import Button from "./Button";
import Link from "next/link";

export default function FlagButton({ ownerId }: { ownerId?: string }): React.ReactNode {
    const { isLoggedIn, user } = useAuth();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isFlagged, setIsFlagged] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [reason, setReason] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Auto-open modal if redirected back with action=flag
    useEffect(() => {
        const checkFlagAction = () => {
            if (isLoggedIn && searchParams.get("action") === "flag") {
                setIsModalOpen(true);

                // Clear the URL parameter after a small delay to ensure modal stays open
                setTimeout(() => {
                    const params = new URLSearchParams(window.location.search);
                    if (params.has("action")) {
                        params.delete("action");
                        const newPath = pathname + (params.toString() ? `?${params.toString()}` : "");
                        router.replace(newPath, { scroll: false });
                    }
                }, 100);
            }
        };

        checkFlagAction();
    }, [isLoggedIn, searchParams, pathname, router]);

    const isOwner = isLoggedIn && user?.id === ownerId;

    if (isOwner) return null;

    const handleFlagClick = (): void => {
        if (!isLoggedIn) return;
        setIsModalOpen(true);
    };

    const handleSubmitFlag = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        if (!reason.trim()) return;

        setIsSubmitting(true);
        // Simulate API request delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log("Flagged with reason:", reason);
        setIsFlagged(true);
        setIsModalOpen(false);
        setIsSubmitting(false);
        alert("This report has been flagged for review. Thank you for keeping our community safe.");
    };

    if (!isLoggedIn) {
        // Construct callback URL with action=flag
        const callbackUrl = encodeURIComponent(`${pathname}?action=flag`);
        return (
            <Link
                href={`/auth/login?callbackUrl=${callbackUrl}`}
                className="flex items-center gap-2 text-gray-400 hover:text-danger border border-white/10 px-4 py-2 rounded-xl transition-all text-sm font-medium"
            >
                <Flag className="w-4 h-4" />
                <span>Flag Fake Report</span>
            </Link>
        );
    }

    return (
        <>
            <button
                onClick={handleFlagClick}
                disabled={isFlagged}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium border ${isFlagged
                    ? "bg-danger/20 text-danger border-danger/30"
                    : "text-gray-400 hover:text-danger border-white/10 hover:border-danger/30"
                    }`}
            >
                {isFlagged ? <AlertTriangle className="w-4 h-4" /> : <Flag className="w-4 h-4" />}
                <span>{isFlagged ? "Flagged" : "Flag Fake News"}</span>
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Report Inaccurate Information"
            >
                <form onSubmit={handleSubmitFlag} className="space-y-4">
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Please provide a reason why you believe this report is "Fake News" or inaccurate. Our moderators will review it shortly.
                    </p>

                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                            Reason for reporting
                        </label>
                        <textarea
                            required
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="Describe why this post is fake..."
                            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-danger/50 transition-all resize-none"
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-6 py-2 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all text-sm font-bold"
                        >
                            Cancel
                        </button>
                        <Button
                            type="submit"
                            variant="danger"
                            disabled={isSubmitting || !reason.trim()}
                            className="px-6 py-2 rounded-xl flex items-center gap-2"
                        >
                            {isSubmitting ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                            {isSubmitting ? "Submitting..." : "Submit Report"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
