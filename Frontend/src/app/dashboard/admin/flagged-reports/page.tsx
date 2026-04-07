"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
    Flag, AlertTriangle, Clock, Eye, ChevronRight, 
    MapPin, Calendar, User, ArrowLeft, Search, Loader2,
    ShieldAlert, Trash2, CheckCircle2
} from "lucide-react";
import { reportApi } from "@/app/lib/api";

type FlaggedReport = {
    id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    age?: number;
    gender: string;
    last_seen_location: string;
    last_seen_date: string;
    status: string;
    is_flagged: boolean;
    flags_count: number;
    user: {
        id: string;
        first_name: string;
        last_name: string;
        email: string;
    };
    created_at: string;
};

export default function AdminFlaggedReportsPage() {
    const [reports, setReports] = useState<FlaggedReport[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");

    const fetchFlaggedReports = async () => {
        setIsLoading(true);
        try {
            const res = await reportApi.adminGetFlagged();
            const data = res?.data ?? res;
            setReports(Array.isArray(data) ? data : data?.data ?? []);
        } catch (error) {
            console.error("Failed to fetch flagged reports:", error);
            setReports([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFlaggedReports();
    }, []);

    const filtered = reports.filter((r) => {
        const name = `${r.first_name} ${r.last_name}`.toLowerCase();
        const location = r.last_seen_location?.toLowerCase() || "";
        return name.includes(search.toLowerCase()) || location.includes(search.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-dark text-white">
            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Header */}
                <div className="mb-10">
                    <Link
                        href="/dashboard/admin"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-5 group text-sm w-fit"
                    >
                        <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" />
                        Admin Dashboard
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-red-500/20 flex items-center justify-center">
                            <Flag className="w-6 h-6 text-red-500" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">
                                Flagged <span className="text-red-500">Reports</span>
                            </h1>
                            <p className="text-gray-400 text-sm mt-1">
                                Review cases flagged by the community for inaccuracy or spam.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by name or location..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-dark-light/30 border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-red-500/50 transition-all shadow-xl"
                    />
                </div>

                {/* Content */}
                <div className="bg-dark-light/10 border border-white/5 rounded-[2rem] overflow-hidden">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-32 gap-4 text-gray-500">
                            <Loader2 className="w-10 h-10 animate-spin text-red-500" />
                            <p className="font-bold uppercase tracking-widest text-xs">Scanning Flagged Content...</p>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-32">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-10 h-10 text-gray-700" />
                            </div>
                            <p className="text-xl font-bold text-gray-400">All Clear</p>
                            <p className="text-gray-600 text-sm mt-2 max-w-xs mx-auto">
                                {search ? `No results found for "${search}"` : "There are currently no flagged reports to review."}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="text-left border-b border-white/5 bg-white/2">
                                        <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Missing Person</th>
                                        <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Flags</th>
                                        <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Reporter</th>
                                        <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Status</th>
                                        <th className="px-8 py-5 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Location</th>
                                        <th className="px-8 py-5"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filtered.map((report) => {
                                        const fullName = [report.first_name, report.middle_name, report.last_name].filter(Boolean).join(" ");
                                        return (
                                            <tr key={report.id} className="group hover:bg-white/5 transition-all">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-dark border border-white/10 flex items-center justify-center font-bold text-gray-500 group-hover:border-red-500/30 transition-colors">
                                                            {report.first_name[0]}{report.last_name[0]}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-white group-hover:text-red-400 transition-colors">{fullName}</p>
                                                            <p className="text-xs text-gray-500 font-medium">Added {new Date(report.created_at).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 ${
                                                            report.flags_count >= 5 ? "bg-red-500/20 text-red-500 border-red-500/30" : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                                                        }`}>
                                                            <AlertTriangle className="w-3.5 h-3.5" />
                                                            <span className="text-sm font-black">{report.flags_count}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <p className="text-sm font-bold text-gray-300">{report.user?.first_name} {report.user?.last_name}</p>
                                                    <p className="text-xs text-gray-500">{report.user?.email}</p>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                                        report.status === 'approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                                    }`}>
                                                        {report.status}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-2 text-sm text-gray-400">
                                                        <MapPin className="w-4 h-4 text-red-500/50" />
                                                        {report.last_seen_location}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <Link 
                                                        href={`/missing/${report.id}`}
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all text-xs font-bold uppercase tracking-widest border border-white/5"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
