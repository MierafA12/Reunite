"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/components/layout/Header";
import { User, MapPin, Calendar, FileText, ArrowLeft, Edit, Trash2, CheckCircle, Clock, ShieldCheck, AlertCircle } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Button from "@/app/components/ui/Button";
import { reportApi } from "@/app/lib/api";
import Link from "next/link";

export default function ManageReportPage() {
    const router = useRouter();
    const { id } = useParams();
    const [report, setReport] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await reportApi.getReport(id as string);
                setReport(data);
            } catch (err: any) {
                console.error("Failed to fetch report:", err);
                setError("Failed to load report details.");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchReport();
    }, [id]);

    const handleMarkAsFound = async () => {
        if (!confirm("Are you sure this person has been found? This will update the report status publically.")) return;
        
        setIsUpdatingStatus(true);
        try {
            await reportApi.updateReport(id as string, { status: 'found' });
            setReport({ ...report, status: 'found' });
        } catch (err: any) {
            console.error("Failed to update status:", err);
            alert("Failed to update status. Please try again.");
        } finally {
            setIsUpdatingStatus(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this report? This action cannot be undone.")) return;
        
        setIsDeleting(true);
        try {
            await reportApi.deleteReport(id as string);
            router.push("/dashboard/user");
        } catch (err: any) {
            console.error("Failed to delete report:", err);
            alert("Failed to delete report. Please try again.");
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-dark text-white flex items-center justify-center">
                <div className="animate-spin w-10 h-10 border-4 border-secondary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (error || !report) {
        return (
            <div className="min-h-screen bg-dark text-white flex flex-col items-center justify-center p-6 text-center">
                <AlertCircle className="w-16 h-16 text-danger mb-4" />
                <h1 className="text-2xl font-bold mb-2">{error || "Report not found"}</h1>
                <Button href="/dashboard/user" variant="outline" className="mt-4">Back to Dashboard</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark text-white font-sans">
            <Header />

            <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <Link href="/dashboard/user" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-extrabold tracking-tight">Manage <span className="text-secondary">Report</span></h1>
                        <p className="text-gray-400 mt-2">Update status or edit details for Case #{id?.toString().slice(0, 8)}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {report.status !== 'found' && (
                            <button
                                onClick={handleMarkAsFound}
                                disabled={isUpdatingStatus}
                                className="px-6 py-3 bg-success/20 text-success border border-success/30 rounded-xl font-bold hover:bg-success/30 transition-all flex items-center gap-2 disabled:opacity-50"
                            >
                                <CheckCircle size={18} />
                                {isUpdatingStatus ? "Updating..." : "Mark as Found"}
                            </button>
                        )}
                        <Button
                            href={`/dashboard/user/report/edit/${id}`}
                            variant="secondary"
                            className="px-6 py-3 rounded-xl font-bold flex items-center gap-2"
                        >
                            <Edit size={18} />
                            Edit Details
                        </Button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-6 py-3 bg-danger/10 text-danger border border-danger/20 rounded-xl font-bold hover:bg-danger/20 transition-all flex items-center gap-2 disabled:opacity-50"
                        >
                            <Trash2 size={18} />
                            {isDeleting ? "Deleting..." : "Delete Report"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-dark-light/30 border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm">
                            <div className="flex items-start gap-6 border-b border-white/5 pb-8 mb-8">
                                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shrink-0">
                                    <img 
                                        src={report.media?.[0]?.media_url || "/images/reunite.jpeg"} 
                                        alt="" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-3xl font-bold">
                                            {[report.first_name, report.middle_name, report.last_name].filter(Boolean).join(" ")}
                                        </h2>
                                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                            report.status === 'pending' ? 'bg-warning/20 text-warning border border-warning/30' : 
                                            report.status === 'approved' ? 'bg-success/20 text-success border border-success/30' :
                                            report.status === 'found' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                            'bg-danger/20 text-danger border border-danger/30'
                                        }`}>
                                            {report.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-gray-400">
                                        <span className="flex items-center gap-1.5">
                                            <User className="w-4 h-4 text-secondary" />
                                            {report.age} Years • {report.gender}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4 text-secondary" />
                                            {report.last_seen_location}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4 text-secondary" />
                                            Last Seen: {new Date(report.last_seen_date).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">The Story</h3>
                                    <p className="text-gray-300 leading-relaxed italic border-l-2 border-secondary/30 pl-6 py-2">
                                        "{report.circumstances}"
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">Physical Description</h3>
                                        <div className="bg-dark/50 border border-white/5 rounded-2xl p-5 text-gray-300 text-sm leading-relaxed">
                                            {report.physical_description}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-[0.2em]">Other Info</h3>
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                                <span className="text-gray-500">Nationality</span>
                                                <span className="font-medium">{report.nationality || "N/A"}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                                                <span className="text-gray-500">Relation</span>
                                                <span className="font-medium">{report.relation_with_person}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-sm pt-1">
                                                <span className="text-gray-500">Reward Ordered</span>
                                                <span className={`font-bold ${report.offer_reward ? 'text-success' : 'text-gray-600'}`}>
                                                    {report.offer_reward ? `$${report.reward_amount}` : "No"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Steps/Timeline */}
                    <div className="space-y-6">
                        <div className="bg-dark-light border border-white/5 rounded-3xl p-8 relative overflow-hidden">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-secondary" />
                                Investigation Status
                            </h3>
                            
                            <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
                                <div className="relative pl-10">
                                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-success flex items-center justify-center z-10 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                                        <CheckCircle size={14} className="text-white" />
                                    </div>
                                    <p className="font-bold text-white text-sm">Report Submitted</p>
                                    <p className="text-xs text-gray-500 mt-1">{new Date(report.created_at).toLocaleDateString()}</p>
                                </div>

                                <div className="relative pl-10">
                                    <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                                        report.status !== 'pending' ? 'bg-success' : 'bg-warning/20 border border-warning/50'
                                    }`}>
                                        {report.status !== 'pending' ? <CheckCircle size={14} className="text-white" /> : <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />}
                                    </div>
                                    <p className={`font-bold text-sm ${report.status === 'pending' ? 'text-warning' : 'text-white'}`}>Verification</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {report.status === 'pending' ? 'Our team is reviewing the details.' : 'Verified as legitimate.'}
                                    </p>
                                </div>

                                <div className="relative pl-10">
                                    <div className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 ${
                                        report.status === 'found' ? 'bg-success' : 'bg-white/5 border border-white/10'
                                    }`}>
                                        {report.status === 'found' && <CheckCircle size={14} className="text-white" />}
                                    </div>
                                    <p className={`font-bold text-sm ${report.status === 'found' ? 'text-white' : 'text-gray-600'}`}>Person Found</p>
                                    <p className="text-xs text-gray-500 mt-1">Final stage in the investigation.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-secondary/10 border border-secondary/20 rounded-3xl p-8">
                            <ShieldCheck className="text-secondary mb-4" size={32} />
                            <h3 className="font-bold mb-2">Private Investigation</h3>
                            <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                You can only manage reports you submitted. If you found someone, mark them as found to notify the community.
                            </p>
                            <Button href="/missing" variant="ghost" className="text-secondary font-bold text-sm p-0 hover:bg-transparent">
                                View Public Profile →
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
