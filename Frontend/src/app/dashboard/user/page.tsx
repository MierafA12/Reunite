"use client";

import Header from "@/app/components/layout/Header";
import Link from "next/link";
import { User, FileText, Settings, Bell, MapPin, Calendar, MessageSquare, ShieldCheck, ArrowLeft } from "lucide-react";
import DashboardCard from "@/app/components/ui/DashboardCard";
import { useAuth } from "@/app/context/AuthContext";
import Button from "@/app/components/ui/Button";

export default function UserDashboard() {
    const { user } = useAuth();

    // Simulated user reports
    const userReports = [
        {
            id: "1",
            name: "Abebe Kebede",
            status: "Missing",
            date: "12 Jan 2026",
            location: "Addis Ababa",
            image: "/images/reunite.jpeg"
        }
    ];

    return (
        <div className="min-h-screen bg-dark text-white">
            <Header />

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold">Your <span className="text-secondary">Profile</span></h1>
                        <p className="text-gray-400 mt-2">Welcome back, {user?.name || "User"}. Manage your reported cases here.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button href="/" variant="outline" className="px-6 py-3 rounded-xl font-bold border-white/10 text-white hover:bg-white/5 transition-all hidden sm:flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Back to Portal
                        </Button>
                        <Button href="/dashboard/user/report" variant="secondary" className="px-6 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
                            + New Report
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Content: My Reports */}
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <FileText className="text-secondary" />
                                My Active Reports
                            </h2>

                            <div className="space-y-4">
                                {userReports.map(report => (
                                    <Link
                                        key={report.id}
                                        href={`/missing/${report.id}`}
                                        className="block bg-dark-light/50 border border-white/5 rounded-3xl p-6 hover:border-secondary/30 transition-all group"
                                    >
                                        <div className="flex flex-wrap items-center gap-6">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                                                <img src={report.image} alt={report.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex items-center justify-between mb-2">
                                                    <h3 className="text-xl font-bold">{report.name}</h3>
                                                    <span className="bg-danger/20 text-danger border border-danger/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                                                        {report.status}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                                    <span className="flex items-center gap-1.5 underline decoration-secondary">
                                                        <MapPin className="w-3.5 h-3.5" />
                                                        {report.location}
                                                    </span>
                                                    <span className="flex items-center gap-1.5">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        Reported: {report.date}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-secondary font-bold text-sm group-hover:translate-x-2 transition-transform">
                                                Manage →
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            <DashboardCard
                                title="Notifications"
                                description="You have 2 new tips on your reported cases."
                                icon={Bell}
                                iconColor="text-success"
                                iconBgColor="bg-success/10"
                                actionLabel="See All"
                                actionHref="/dashboard/user/notifications"
                            />
                            <div className="bg-dark-light/50 border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 bg-secondary/10 rounded-xl flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-secondary" />
                                    </div>
                                    <h3 className="font-bold">Latest Secret Tip</h3>
                                </div>
                                <div className="space-y-3 mb-6">
                                    <div className="bg-dark rounded-2xl p-4 border border-white/5 relative overflow-hidden group hover:border-secondary/30 transition-all cursor-pointer">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-bold text-secondary">New Message</span>
                                            <span className="text-[10px] text-gray-500">2 min ago</span>
                                        </div>
                                        <p className="text-sm text-gray-300 line-clamp-2 italic">"I saw someone similar at the supermarket near..."</p>
                                    </div>
                                </div>
                                <Button
                                    href="/dashboard/user/inbox"
                                    variant="ghost"
                                    className="w-full text-secondary font-bold text-sm hover:bg-secondary/5 transition-all"
                                >
                                    Open Inbox →
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-dark-light border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5">
                                <ShieldCheck size={80} className="text-secondary" />
                            </div>
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-secondary" />
                                Account Details
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                                    <span className="text-gray-400">Email</span>
                                    <span className="text-white font-medium">{user?.email || "n/a"}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-4">
                                    <span className="text-gray-400">Account Type</span>
                                    <span className="text-success font-medium">Verified Hero</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Cases Managed</span>
                                    <span className="text-white font-bold">{userReports.length}</span>
                                </div>
                            </div>
                            <Button
                                href="/dashboard/user/profile"
                                variant="outline"
                                className="w-full mt-8 border-white/10 text-white py-3 rounded-xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                            >
                                <Settings className="w-4 h-4" />
                                Profile Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
