"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    CheckCircle2, XCircle, Clock, Eye, ChevronRight,
    MapPin, Calendar, User, ArrowLeft, Search, Filter, Loader2
} from "lucide-react";
import { foundReportApi } from "@/app/lib/api";

type FoundSubmission = {
    id: string;
    status: "pending" | "confirmed" | "rejected";
    date_found: string;
    description: string | null;
    admin_note: string | null;
    reviewed_at: string | null;
    created_at: string;
    missing_report: {
        id: string;
        first_name: string;
        middle_name?: string;
        last_name: string;
        last_seen_location: string;
        status: string;
        media?: { media_url: string }[];
    };
    reporter: { id: string; first_name: string; last_name: string; email: string };
    media: { id: string; media_type: string; media_url: string }[];
    reviewer?: { first_name: string; last_name: string } | null;
};

const STATUS_CONFIG = {
    pending:   { label: "Pending",   icon: Clock,         bg: "bg-warning/20",   text: "text-warning",   border: "border-warning/30"   },
    confirmed: { label: "Confirmed", icon: CheckCircle2,  bg: "bg-success/20",   text: "text-success",   border: "border-success/30"   },
    rejected:  { label: "Rejected",  icon: XCircle,       bg: "bg-danger/20",    text: "text-danger",    border: "border-danger/30"    },
} as const;

export default function AdminFoundReportsPage() {
    const router = useRouter();
    const [submissions, setSubmissions] = useState<FoundSubmission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeStatus, setActiveStatus] = useState<"pending" | "confirmed" | "rejected" | "all">("pending");
    const [search, setSearch] = useState("");

    // Detail Modal
    const [selected, setSelected] = useState<FoundSubmission | null>(null);
    const [adminNote, setAdminNote] = useState("");
    const [isReviewing, setIsReviewing] = useState(false);
    const [reviewError, setReviewError] = useState("");

    const fetchSubmissions = async (status: string) => {
        setIsLoading(true);
        try {
            const res = await foundReportApi.adminGetAll(status);
            const data = res?.data ?? res;
            setSubmissions(Array.isArray(data) ? data : data?.data ?? []);
        } catch {
            setSubmissions([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions(activeStatus);
    }, [activeStatus]);

    const openDetail = async (sub: FoundSubmission) => {
        setReviewError("");
        setAdminNote("");
        try {
            const detail = await foundReportApi.adminGetOne(sub.id);
            setSelected(detail.data ?? detail);
        } catch {
            setSelected(sub);
        }
    };

    const handleReview = async (action: "confirm" | "reject") => {
        if (!selected) return;
        setIsReviewing(true);
        setReviewError("");
        try {
            await foundReportApi.adminReview(selected.id, { action, admin_note: adminNote });
            setSelected(null);
            fetchSubmissions(activeStatus);
        } catch (err: any) {
            setReviewError(err?.response?.data?.message || "Failed to submit review.");
        } finally {
            setIsReviewing(false);
        }
    };

    const filtered = submissions.filter((s) => {
        const name = [s.missing_report?.first_name, s.missing_report?.last_name].join(" ").toLowerCase();
        const reporter = [s.reporter?.first_name, s.reporter?.last_name].join(" ").toLowerCase();
        return name.includes(search.toLowerCase()) || reporter.includes(search.toLowerCase());
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
                        <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">
                                Found Report <span className="text-green-400">Submissions</span>
                            </h1>
                            <p className="text-gray-400 text-sm mt-1">
                                Review and confirm evidence submitted by reporters marking a person as found.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Status Tabs */}
                <div className="flex flex-wrap gap-3 mb-6">
                    {(["pending", "confirmed", "rejected", "all"] as const).map((s) => {
                        const cfg = s !== "all" ? STATUS_CONFIG[s] : null;
                        const Icon = cfg?.icon;
                        return (
                            <button
                                key={s}
                                onClick={() => setActiveStatus(s)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                                    activeStatus === s
                                        ? cfg
                                            ? `${cfg.bg} ${cfg.text} ${cfg.border}`
                                            : "bg-white/10 text-white border-white/20"
                                        : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10"
                                }`}
                            >
                                {Icon && <Icon className="w-4 h-4" />}
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                            </button>
                        );
                    })}
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search by missing person name or reporter..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-dark-light/30 border border-white/10 rounded-2xl pl-12 pr-6 py-3.5 outline-none focus:border-secondary transition-all"
                    />
                </div>

                {/* Table */}
                <div className="bg-dark-light/30 border border-white/5 rounded-3xl overflow-hidden">
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20 gap-3 text-gray-500">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Loading submissions...
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="text-center py-20">
                            <CheckCircle2 className="w-14 h-14 text-gray-700 mx-auto mb-4" />
                            <p className="text-gray-400 font-medium">No submissions found</p>
                            <p className="text-gray-600 text-sm mt-1">
                                {search ? `No results for "${search}"` : `No ${activeStatus} submissions yet.`}
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Missing Person</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted By</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Found</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Evidence</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Submitted</th>
                                        <th className="px-6 py-4"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filtered.map((sub) => {
                                        const cfg = STATUS_CONFIG[sub.status];
                                        const Icon = cfg.icon;
                                        const name = [sub.missing_report?.first_name, sub.missing_report?.middle_name, sub.missing_report?.last_name]
                                            .filter(Boolean).join(" ");
                                        return (
                                            <tr
                                                key={sub.id}
                                                className="hover:bg-white/3 transition-colors cursor-pointer"
                                                onClick={() => openDetail(sub)}
                                            >
                                                {/* Missing person */}
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-white/5 border border-white/10">
                                                            <img
                                                                src={sub.missing_report?.media?.[0]?.media_url || "/images/reunite.jpeg"}
                                                                alt={name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <span className="font-semibold text-sm">{name}</span>
                                                    </div>
                                                </td>
                                                {/* Reporter */}
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-medium">{sub.reporter?.first_name} {sub.reporter?.last_name}</p>
                                                    <p className="text-xs text-gray-500">{sub.reporter?.email}</p>
                                                </td>
                                                {/* Date found */}
                                                <td className="px-6 py-4">
                                                    <span className="flex items-center gap-1.5 text-sm text-gray-300">
                                                        <Calendar className="w-4 h-4 text-secondary" />
                                                        {new Date(sub.date_found).toLocaleDateString()}
                                                    </span>
                                                </td>
                                                {/* Evidence count */}
                                                <td className="px-6 py-4">
                                                    <span className="text-sm text-gray-400">
                                                        {sub.media?.length ?? 0} file{sub.media?.length !== 1 ? "s" : ""}
                                                        {sub.description ? " + text" : ""}
                                                    </span>
                                                </td>
                                                {/* Status badge */}
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                                                        <Icon className="w-3 h-3" />
                                                        {cfg.label}
                                                    </span>
                                                </td>
                                                {/* Submitted date */}
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(sub.created_at).toLocaleDateString()}
                                                </td>
                                                {/* Action */}
                                                <td className="px-6 py-4">
                                                    <button className="flex items-center gap-1 text-secondary text-sm font-semibold hover:text-white transition-colors">
                                                        <Eye className="w-4 h-4" /> Review
                                                    </button>
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

            {/* ── Detail / Review Modal ── */}
            {selected && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="bg-[#0f1117] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10">
                            <div>
                                <h2 className="text-xl font-bold">Review Found Submission</h2>
                                <p className="text-gray-400 text-sm mt-0.5">
                                    {[selected.missing_report?.first_name, selected.missing_report?.middle_name, selected.missing_report?.last_name]
                                        .filter(Boolean).join(" ")}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelected(null)}
                                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                            >
                                <XCircle className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Status badge */}
                            <div className="flex items-center gap-3">
                                {(() => {
                                    const cfg = STATUS_CONFIG[selected.status];
                                    const Icon = cfg.icon;
                                    return (
                                        <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border ${cfg.bg} ${cfg.text} ${cfg.border}`}>
                                            <Icon className="w-3.5 h-3.5" /> {cfg.label}
                                        </span>
                                    );
                                })()}
                                <span className="text-xs text-gray-500">
                                    Submitted {new Date(selected.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            {/* Key info */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-dark/60 border border-white/5 rounded-2xl p-4">
                                    <p className="text-xs text-gray-500 mb-1">Date Found</p>
                                    <p className="font-semibold flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-secondary" />
                                        {new Date(selected.date_found).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="bg-dark/60 border border-white/5 rounded-2xl p-4">
                                    <p className="text-xs text-gray-500 mb-1">Submitted By</p>
                                    <p className="font-semibold flex items-center gap-1.5">
                                        <User className="w-4 h-4 text-secondary" />
                                        {selected.reporter?.first_name} {selected.reporter?.last_name}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-0.5">{selected.reporter?.email}</p>
                                </div>
                            </div>

                            {/* Description */}
                            {selected.description && (
                                <div className="bg-dark/60 border border-white/5 rounded-2xl p-5">
                                    <p className="text-xs text-gray-500 mb-2 font-semibold uppercase tracking-wider">Description</p>
                                    <p className="text-gray-300 text-sm leading-relaxed">{selected.description}</p>
                                </div>
                            )}

                            {/* Evidence Media */}
                            {selected.media && selected.media.length > 0 && (
                                <div>
                                    <p className="text-xs text-gray-500 mb-3 font-semibold uppercase tracking-wider">
                                        Evidence ({selected.media.length} file{selected.media.length !== 1 ? "s" : ""})
                                    </p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {selected.media.map((m) => (
                                            <a
                                                key={m.id}
                                                href={m.media_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block rounded-2xl overflow-hidden border border-white/10 bg-dark aspect-video hover:border-secondary/40 transition-all"
                                            >
                                                {m.media_type === "video" ? (
                                                    <video
                                                        src={m.media_url}
                                                        className="w-full h-full object-cover"
                                                        controls
                                                    />
                                                ) : (
                                                    <img
                                                        src={m.media_url}
                                                        alt="evidence"
                                                        className="w-full h-full object-cover"
                                                    />
                                                )}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Admin Note (if already reviewed) */}
                            {selected.admin_note && (
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                                    <p className="text-xs text-gray-500 mb-1 font-semibold uppercase tracking-wider">Admin Note</p>
                                    <p className="text-gray-300 text-sm">{selected.admin_note}</p>
                                    {selected.reviewer && (
                                        <p className="text-xs text-gray-600 mt-1">
                                            by {selected.reviewer.first_name} {selected.reviewer.last_name}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Review actions (only for pending) */}
                            {selected.status === "pending" && (
                                <div className="border-t border-white/10 pt-6 space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">
                                            Admin Note <span className="text-gray-600">(optional)</span>
                                        </label>
                                        <textarea
                                            value={adminNote}
                                            onChange={(e) => setAdminNote(e.target.value)}
                                            rows={3}
                                            placeholder="Add a note for the reporter (optional)..."
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-secondary transition-all text-white placeholder-gray-600 resize-none text-sm"
                                        />
                                    </div>

                                    {reviewError && (
                                        <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                            {reviewError}
                                        </p>
                                    )}

                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleReview("confirm")}
                                            disabled={isReviewing}
                                            className="flex-1 py-3.5 bg-green-500 hover:bg-green-400 disabled:bg-green-500/40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                                        >
                                            {isReviewing ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <CheckCircle2 className="w-4 h-4" />
                                            )}
                                            Confirm Found
                                        </button>
                                        <button
                                            onClick={() => handleReview("reject")}
                                            disabled={isReviewing}
                                            className="flex-1 py-3.5 bg-red-500/20 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-red-400 hover:text-white border border-red-500/30 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                                        >
                                            {isReviewing ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <XCircle className="w-4 h-4" />
                                            )}
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
