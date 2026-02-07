"use client";

import Header from "@/app/components/layout/Header";
import Link from "next/link";
import { User, FileText, Settings, Bell } from "lucide-react";
import DashboardCard from "@/app/components/ui/DashboardCard";
import { useAuth } from "@/app/context/AuthContext";
import Button from "@/app/components/ui/Button";

export default function UserDashboard() {
    const { user } = useAuth();

    return (
        <div className="min-h-screen bg-dark text-white">
            <Header />

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold">Welcome back, <span className="text-secondary">{user?.name || "User"}</span></h1>
                        <p className="text-gray-400 mt-2">Manage your reports and track updates here.</p>
                    </div>
                    <Button href="/dashboard/user/report" variant="secondary" className="px-6 py-3 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
                        + New Report
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Dashboard Stats */}
                    <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <DashboardCard
                            title="My Reports"
                            description="You have 1 active report and 0 resolved cases."
                            icon={FileText}
                            iconColor="text-primary"
                            iconBgColor="bg-primary/10"
                            actionLabel="View Latest Report"
                            actionHref="/missing/1"
                        />

                        <DashboardCard
                            title="Notifications"
                            description="You have 2 new tips on your reported cases."
                            icon={Bell}
                            iconColor="text-success"
                            iconBgColor="bg-success/10"
                            actionLabel="See Notifications"
                            onClick={() => alert("Opening notifications...")}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-dark-light border border-white/5 rounded-3xl p-8">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-secondary" />
                                Profile Summary
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                                    <span className="text-gray-400">Status</span>
                                    <span className="text-success font-medium">Verified Account</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Joined</span>
                                    <span>Jan 2026</span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full mt-8 border-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                                <Settings className="w-4 h-4" />
                                Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
