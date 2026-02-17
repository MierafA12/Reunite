"use client";

import React, { useState } from "react";
import Header from "@/app/components/layout/Header";
import { Bell, MapPin, MessageSquare, ShieldCheck, Trash2, ArrowLeft, CheckCircle2, Clock, Filter, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";
import clsx from "clsx";

interface Notification {
    id: string;
    type: "sighting" | "tip" | "system" | "update";
    title: string;
    message: string;
    time: string;
    isRead: boolean;
    link?: string;
}

const initialNotifications: Notification[] = [
    {
        id: "1",
        type: "sighting",
        title: "Potential Sighting Reported",
        message: "someone matching 'Abebe Kebede' was seen at Piazza area. Check details.",
        time: "10 mins ago",
        isRead: false,
        link: "/dashboard/user/inbox"
    },
    {
        id: "2",
        type: "tip",
        title: "New Secret Tip Received",
        message: "You have a new confidential message regarding Case #1024.",
        time: "2 hours ago",
        isRead: false,
        link: "/dashboard/user/inbox"
    },
    {
        id: "3",
        type: "system",
        title: "Report Approved",
        message: "Your missing person report for 'Abebe Kebede' has been verified and published.",
        time: "Yesterday",
        isRead: true
    },
    {
        id: "4",
        type: "update",
        title: "Profile Verified",
        message: "Your identity has been successfully verified. You now have 'Verified Hero' status.",
        time: "2 days ago",
        isRead: true
    }
];

export default function NotificationsPage() {
    const router = useRouter();
    const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
    const [filter, setFilter] = useState<"all" | "unread">("all");

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const filteredNotifications = filter === "all"
        ? notifications
        : notifications.filter(n => !n.isRead);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    };

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, isRead: true } : n));
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "sighting": return <MapPin size={20} className="text-secondary" />;
            case "tip": return <MessageSquare size={20} className="text-primary" />;
            case "system": return <ShieldCheck size={20} className="text-success" />;
            case "update": return <CheckCircle2 size={20} className="text-success" />;
            default: return <Bell size={20} className="text-gray-400" />;
        }
    };

    const getBgColor = (type: string) => {
        switch (type) {
            case "sighting": return "bg-secondary/10 border-secondary/20";
            case "tip": return "bg-primary/10 border-primary/20";
            case "system": return "bg-success/10 border-success/20";
            case "update": return "bg-success/10 border-success/20";
            default: return "bg-white/5 border-white/10";
        }
    };

    return (
        <div className="min-h-screen bg-dark text-white font-sans">
            <Header />

            <main className="max-w-4xl mx-auto px-6 pt-32 pb-20">
                {/* PAGE HEADER */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
                                <Bell className="text-secondary" size={24} />
                            </div>
                            <h1 className="text-4xl font-extrabold tracking-tight">Notifications</h1>
                        </div>
                        <p className="text-gray-400">Stay updated on sightings and case status.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button
                            onClick={() => router.back()}
                            variant="outline"
                            className="border-white/10 text-white hover:bg-white/5"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                        <button
                            onClick={markAllAsRead}
                            className="text-secondary text-sm font-bold hover:underline px-2"
                        >
                            Mark all as read
                        </button>
                    </div>
                </div>

                {/* FILTERS & STATS */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setFilter("all")}
                            className={clsx(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all",
                                filter === "all" ? "bg-secondary text-white shadow-lg shadow-secondary/20" : "text-gray-500 hover:text-white"
                            )}
                        >
                            All Activity
                        </button>
                        <button
                            onClick={() => setFilter("unread")}
                            className={clsx(
                                "px-6 py-2 rounded-full text-sm font-bold transition-all relative",
                                filter === "unread" ? "bg-secondary text-white shadow-lg shadow-secondary/20" : "text-gray-500 hover:text-white"
                            )}
                        >
                            Unread
                            {unreadCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-[10px] flex items-center justify-center rounded-full border-2 border-dark font-black">
                                    {unreadCount}
                                </span>
                            )}
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock size={16} />
                        <span>Showing {filteredNotifications.length} updates</span>
                    </div>
                </div>

                {/* NOTIFICATIONS LIST */}
                <div className="space-y-4">
                    {filteredNotifications.length > 0 ? (
                        filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={clsx(
                                    "group relative bg-dark-light/30 border rounded-3xl p-6 transition-all hover:translate-x-1",
                                    notification.isRead ? "border-white/5" : "border-secondary/20 bg-secondary/5"
                                )}
                            >
                                <div className="flex gap-6">
                                    <div className={clsx(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center border shrink-0 transition-transform group-hover:scale-110",
                                        getBgColor(notification.type)
                                    )}>
                                        {getIcon(notification.type)}
                                    </div>

                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className={clsx(
                                                "font-bold text-lg",
                                                !notification.isRead ? "text-white" : "text-gray-300"
                                            )}>
                                                {notification.title}
                                            </h3>
                                            <span className="text-xs text-gray-500 font-medium">{notification.time}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                                            {notification.message}
                                        </p>

                                        <div className="flex items-center gap-4">
                                            {notification.link && (
                                                <Button
                                                    href={notification.link}
                                                    variant="ghost"
                                                    className="p-0 text-secondary text-xs font-black uppercase tracking-widest hover:bg-transparent"
                                                >
                                                    View Details →
                                                </Button>
                                            )}
                                            {!notification.isRead && (
                                                <button
                                                    onClick={() => markAsRead(notification.id)}
                                                    className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 hover:text-white uppercase tracking-tighter"
                                                >
                                                    <Eye size={12} />
                                                    Mark Read
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => deleteNotification(notification.id)}
                                            className="p-2 hover:bg-danger/10 text-gray-600 hover:text-danger rounded-xl transition-all"
                                            title="Delete"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                {!notification.isRead && (
                                    <div className="absolute top-6 right-6 w-2 h-2 bg-secondary rounded-full shadow-[0_0_10px_rgba(79,70,229,1)]" />
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-24 bg-dark-light/20 border border-white/5 rounded-3xl">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Bell className="text-gray-600" size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-400">All caught up!</h3>
                            <p className="text-gray-500 max-w-xs mx-auto mt-2">No new notifications at the moment. We'll alert you if something important happens.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
