"use client";

import React, { useState, useEffect } from "react";
import { Flag, AlertTriangle, Send } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Modal from "./Modal";
import Button from "./Button";
import Link from "next/link";
import { reportApi } from "@/app/lib/api";

export default function FlagButton({ ownerId, personName, postId }: { ownerId?: string | number; personName?: string, postId?: string }): React.ReactNode {

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
        if (!reason.trim() || !postId) return;

        setIsSubmitting(true);
        try {
            await reportApi.flagReport(postId, { reason });
            setIsFlagged(true);
            setIsModalOpen(false);
            alert("This report has been flagged for review. Thank you for keeping our community safe.");
        } catch (error) {
            console.error("Failed to flag report:", error);
            alert("Failed to submit flag. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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
                <span>Flag {personName || "Case"}</span>
            </Link>

        );
    }

    return (
        <>
            <button
                onClick={handleFlagClick}
                disabled={isFlagged}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all text-sm font-bold border-2 ${isFlagged
                    ? "bg-danger/20 text-danger border-danger/30"
                    : "bg-danger/10 text-danger border-danger/50 hover:bg-danger hover:text-white hover:border-danger shadow-lg shadow-danger/20"
                    }`}
            >

                {isFlagged ? <AlertTriangle className="w-4 h-4" /> : <Flag className="w-4 h-4" />}
                <span>{isFlagged ? "Reported" : (personName ? `Flag ${personName} as Fake` : "Flag Fake News")}</span>
            </button>






            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Report Inaccurate Information"
            >
                <form onSubmit={handleSubmitFlag} className="flex flex-col gap-5">
                    <div className="bg-danger/10 border border-danger/20 rounded-xl p-4 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                        <p className="text-gray-300 text-sm leading-relaxed">
                            Please provide a clear reason why you believe this report is "Fake News" or inaccurate. Your feedback helps us maintain a safe community.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Reason for reporting
                        </label>
                        <textarea
                            required
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            placeholder="e.g., This person was found last week, or this photo is from a different country..."
                            className="w-full h-40 bg-dark-light/50 border border-white/10 rounded-2xl p-5 text-white placeholder:text-gray-600 focus:outline-none focus:border-danger/50 focus:ring-1 focus:ring-danger/20 transition-all resize-none text-sm"
                        />
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 px-6 py-3.5 rounded-2xl bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-black uppercase tracking-widest border border-white/5"
                        >
                            Cancel
                        </button>
                        <Button
                            type="submit"
                            variant="danger"
                            disabled={isSubmitting || !reason.trim()}
                            className="flex-[2] py-3.5 rounded-2xl flex items-center justify-center gap-2 font-black uppercase tracking-widest shadow-lg shadow-danger/20"
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
