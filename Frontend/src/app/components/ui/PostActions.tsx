"use client";

import React from "react";
import { Edit3, Trash2, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import Button from "./Button";
import Link from "next/link";
import { useConfirm } from "@/app/context/ConfirmContext";
import { useRouter } from "next/navigation";
import { reportApi } from "@/app/lib/api";
import { useToast } from "@/app/context/ToastContext";

interface PostActionsProps {
    ownerId: string | number;
    postId: string;
}

export default function PostActions({ ownerId, postId }: PostActionsProps): React.ReactNode {
    const { user, isLoggedIn } = useAuth();
    const { confirm } = useConfirm();
    const router = useRouter();
    const { showToast } = useToast();

    // Support both string and number IDs
    const isOwner = isLoggedIn && user?.id == ownerId;


    if (!isOwner) return null;

    const handleMarkFound = async () => {
        const isConfirmed = await confirm({
            title: "Mark as Found",
            message: "Are you sure you want to mark this person as found? This will notify our community that the case has been resolved.",
            confirmText: "Yes, Mark Found",
            variant: "primary"
        });

        if (isConfirmed) {
            router.push(`/dashboard/user/reports/${postId}/mark-found`);
        }
    };

    const handleDelete = async () => {
        const isConfirmed = await confirm({
            title: "Delete Report",
            message: "Are you sure you want to delete this report? This action cannot be undone.",
            confirmText: "Delete Case",
            variant: "danger"
        });

        if (isConfirmed) {
            try {
                await reportApi.deleteReport(postId);
                showToast("Report deleted successfully.", "success");
                router.push("/dashboard/user");
            } catch (err) {
                showToast("Failed to delete report.", "error");
            }
        }
    };

    return (
        <div className="flex gap-4 animate-fadeIn">
            <Button
                variant="outline"
                className="bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 px-6 py-2 rounded-xl flex items-center gap-2 transition-all font-bold text-sm"
                onClick={handleMarkFound}
            >
                <CheckCircle2 className="w-4 h-4" />
                Mark as Found
            </Button>
            <Link
                href={`/dashboard/user/report/edit/${postId}`}
                className="bg-white/5 border border-white/10 text-white hover:bg-white/10 px-6 py-2 rounded-xl flex items-center gap-2 transition-all font-bold text-sm"
            >
                <Edit3 className="w-4 h-4" />
                Edit Report
            </Link>
            <Button
                variant="danger"
                className="bg-danger/10 border border-danger/20 text-danger hover:bg-danger/20 px-6 py-2 rounded-xl flex items-center gap-2 transition-all font-bold text-sm"
                onClick={handleDelete}
            >
                <Trash2 className="w-4 h-4" />
                Delete
            </Button>
        </div>
    );
}
