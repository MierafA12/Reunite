"use client";

import Header from "@/app/components/layout/Header";
import Link from "next/link";
import { User, FileText, Settings, Bell, MapPin, Calendar, MessageSquare, ShieldCheck, ArrowLeft } from "lucide-react";
import DashboardCard from "@/app/components/ui/DashboardCard";
import { useAuth } from "@/app/context/AuthContext";
import Button from "@/app/components/ui/Button";
import { reportApi } from "@/app/lib/api";
import { useEffect, useState } from "react";

export default function UserDashboard() {
    const { user } = useAuth();
    const [reports, setReports] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await reportApi.getUserReports();
                // If it's paginated, it will be in response.data
                setReports(response.data || response || []);
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, []);

    return (
        <div className="min-h-screen bg-dark text-white">
            <Header />

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-bold">Your <span className="text-secondary">Profile</span></h1>
                        <p className="text-gray-400 mt-2">Welcome back. Manage your reported cases here.</p>
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
                                {isLoading ? (
                                    <div className="text-center py-20 bg-dark-light/30 rounded-3xl border border-white/5">
                                        <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full mx-auto mb-4"></div>
                                        <p className="text-gray-500">Loading your reports...</p>
                                    </div>
                                ) : reports.length > 0 ? (
                                    reports.map(report => (
                                        <Link
                                            key={report.id}
                                            href={`/dashboard/user/report/${report.id}`}
                                            className="block bg-dark-light/50 border border-white/5 rounded-3xl p-6 hover:border-secondary/30 transition-all group"
                                        >
                                            <div className="flex flex-wrap items-center gap-6">
                                                <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                                                    <img 
                                                        src={report.media?.[0]?.media_url || "/images/reunite.jpeg"} 
                                                        alt={`${report.first_name} ${report.last_name}`} 
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                    />
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <h3 className="text-xl font-bold">
                                                            {[report.first_name, report.middle_name, report.last_name].filter(Boolean).join(" ")}
                                                        </h3>
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                            report.status === 'pending' ? 'bg-warning/20 text-warning border border-warning/30' : 
                                                            'bg-danger/20 text-danger border border-danger/30'
                                                        }`}>
                                                            {report.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                                        <span className="flex items-center gap-1.5 underline decoration-secondary">
                                                            <MapPin className="w-3.5 h-3.5" />
                                                            {report.last_seen_location}
                                                        </span>
                                                        <span className="flex items-center gap-1.5">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            Last Seen: {new Date(report.last_seen_date).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-secondary font-bold text-sm group-hover:translate-x-2 transition-transform">
                                                    Manage →
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-center py-20 bg-dark-light/30 rounded-3xl border border-white/5">
                                        <FileText className="w-12 h-12 text-gray-700 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold mb-2">No Reports Yet</h3>
                                        <p className="text-gray-500 max-w-xs mx-auto mb-8">You haven't submitted any missing person reports yet. Your active reports will appear here.</p>
                                        <Button href="/dashboard/user/report" variant="secondary" className="px-8 py-3 rounded-xl font-bold">
                                            Submit First Report
                                        </Button>
                                    </div>
                                )}
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
                                    <span className="text-gray-400">Account Status</span>
                                    <span className={`${user?.email_verified_at ? 'text-success' : 'text-warning'} font-medium`}>
                                        {user?.email_verified_at ? 'Verified' : 'Unverified'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Cases Managed</span>
                                    <span className="text-white font-bold">{reports.length}</span>
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
