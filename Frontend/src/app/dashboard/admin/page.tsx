"use client";

import React from "react";
import Link from "next/link";
import { 
    Flag, ShieldAlert, Users, FileText, 
    ChevronRight, AlertTriangle, CheckCircle 
} from "lucide-react";

const AdminDashboard = () => {
    const stats = [
        { label: "Total Reports", value: "1,284", icon: FileText, color: "text-blue-400", bg: "bg-blue-400/10" },
        { label: "Active Users", value: "856", icon: Users, color: "text-purple-400", bg: "bg-purple-400/10" },
        { label: "Resolved Cases", value: "112", icon: CheckCircle, color: "text-green-400", bg: "bg-green-400/10" },
        { label: "Flagged Content", value: "24", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-400/10" },
    ];

    const actions = [
        {
            title: "Review Found Reports",
            description: "Verify evidence submitted when a person is found.",
            icon: ShieldAlert,
            href: "/dashboard/admin/found-reports",
            color: "text-green-400",
            bg: "bg-green-400/10",
        },
        {
            title: "Manage Flagged Posts",
            description: "Review reports flagged as fake news or inaccurate.",
            icon: Flag,
            href: "/dashboard/admin/flagged-reports",
            color: "text-red-400",
            bg: "bg-red-400/10",
        },
    ];

    return (
        <div className="min-h-screen bg-dark text-white p-6 md:p-12">
            <div className="max-w-7xl mx-auto space-y-12">
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                        Admin <span className="text-secondary">Control Center</span>
                    </h1>
                    <p className="text-gray-500 font-medium">Monitoring the safety and accuracy of the Reunite community.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-dark-light/20 border border-white/5 rounded-3xl p-6 space-y-4">
                            <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
                                <p className="text-3xl font-black mt-1">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {actions.map((action, i) => (
                        <Link 
                            key={i} 
                            href={action.href}
                            className="group bg-dark-light/20 border border-white/5 hover:border-white/10 rounded-[2.5rem] p-8 md:p-10 transition-all hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
                        >
                            <div className="relative z-10 space-y-6">
                                <div className={`w-16 h-16 rounded-[1.5rem] ${action.bg} flex items-center justify-center`}>
                                    <action.icon className={`w-8 h-8 ${action.color}`} />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-bold flex items-center gap-2">
                                        {action.title}
                                        <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed font-medium">
                                        {action.description}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Decorative background circle */}
                            <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full ${action.bg} blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity`} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
