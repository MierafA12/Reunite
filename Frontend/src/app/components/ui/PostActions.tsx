"use client";

import React from "react";
import { Edit3, Trash2 } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import Button from "./Button";

interface PostActionsProps {
    ownerId: string;
    postId: string;
}

export default function PostActions({ ownerId, postId }: PostActionsProps): React.ReactNode {
    const { user, isLoggedIn } = useAuth();

    // Simulate ownership for demonstration if ownerId is "1" and user.id is "1"
    const isOwner = isLoggedIn && user?.id === ownerId;

    if (!isOwner) return null;

    return (
        <div className="flex gap-4 animate-fadeIn">
            <Button
                variant="outline"
                className="bg-white/5 border-white/10 text-white hover:bg-white/10 px-6 py-2 rounded-xl flex items-center gap-2"
                onClick={() => alert(`Editing post ${postId}`)}
            >
                <Edit3 className="w-4 h-4" />
                Edit Report
            </Button>
            <Button
                variant="danger"
                className="bg-danger/10 border border-danger/20 text-danger hover:bg-danger/20 px-6 py-2 rounded-xl flex items-center gap-2"
                onClick={() => confirm("Are you sure you want to delete this report?")}
            >
                <Trash2 className="w-4 h-4" />
                Delete
            </Button>
        </div>
    );
}
