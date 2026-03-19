"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/app/components/layout/Header";
import Link from "next/link";
import {
    ArrowLeft, CheckCircle2, Calendar, FileText, Upload,
    X, Image as ImageIcon, Video, Loader2, AlertCircle, Info
} from "lucide-react";
import { foundReportApi, reportApi } from "@/app/lib/api";

export default function MarkAsFoundPage() {
    const params = useParams();
    const router = useRouter();
    const reportId = params.reportId as string;

    const [report, setReport] = useState<any>(null);
    const [loadingReport, setLoadingReport] = useState(true);

    const [dateFound, setDateFound] = useState("");
    const [description, setDescription] = useState("");
    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<{ url: string; type: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const res = await reportApi.getReport(reportId);
                setReport(res.data ?? res);
            } catch {
                setError("Could not load report details.");
            } finally {
                setLoadingReport(false);
            }
        };
        fetchReport();
    }, [reportId]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const newFiles = Array.from(e.target.files);
        const combined = [...mediaFiles, ...newFiles].slice(0, 5);
        setMediaFiles(combined);

        const newPreviews = combined.map((f) => ({
            url: URL.createObjectURL(f),
            type: f.type.startsWith("video") ? "video" : "image",
        }));
        setPreviews(newPreviews);
    };

    const removeFile = (idx: number) => {
        const updated = mediaFiles.filter((_, i) => i !== idx);
        setMediaFiles(updated);
        const updatedPrev = previews.filter((_, i) => i !== idx);
        setPreviews(updatedPrev);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!dateFound) {
            setError("Please provide the date when the person was found.");
            return;
        }
        if (!description && mediaFiles.length === 0) {
            setError("Please provide at least a description or evidence photo/video.");
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("date_found", dateFound);
            if (description) formData.append("description", description);
            mediaFiles.forEach((file) => formData.append("media[]", file));

            await foundReportApi.submitFoundReport(reportId, formData);
            setSuccess(true);
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Failed to submit. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const today = new Date().toISOString().split("T")[0];
    const personName = report
        ? [report.first_name, report.middle_name, report.last_name].filter(Boolean).join(" ")
        : "Loading...";

    if (success) {
        return (
            <div className="min-h-screen bg-dark text-white flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center px-6">
                    <div className="text-center max-w-md">
                        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                            <CheckCircle2 className="w-14 h-14 text-green-400" />
                        </div>
                        <h1 className="text-3xl font-bold mb-3">Submission Received!</h1>
                        <p className="text-gray-400 mb-2">
                            Your found evidence for <span className="text-white font-semibold">{personName}</span> has been submitted.
                        </p>
                        <p className="text-gray-500 text-sm mb-10">
                            An admin will review your submission shortly. You'll see the status update in your reports.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/dashboard/user/reports"
                                className="px-8 py-3 bg-secondary/20 text-secondary border border-secondary/30 rounded-2xl font-bold hover:bg-secondary hover:text-white transition-all"
                            >
                                View My Reports
                            </Link>
                            <Link
                                href="/dashboard/user"
                                className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all text-gray-300"
                            >
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark text-white">
            <Header />
            <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
                {/* Back */}
                <Link
                    href="/dashboard/user/reports"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group text-sm w-fit"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Reports
                </Link>

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                        </div>
                        <h1 className="text-3xl font-bold">
                            Mark as <span className="text-green-400">Found</span>
                        </h1>
                    </div>
                    {loadingReport ? (
                        <div className="h-5 w-48 bg-white/5 rounded-lg animate-pulse" />
                    ) : (
                        <p className="text-gray-400">
                            Submitting evidence for:{" "}
                            <span className="text-white font-semibold">{personName}</span>
                        </p>
                    )}
                </div>

                {/* Info Banner */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 flex gap-3 mb-8">
                    <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-300">
                        <p className="font-semibold mb-1">How this works</p>
                        <p className="text-blue-400">
                            Submit your evidence below. An admin will review your submission and, if confirmed,
                            the missing person report will be officially marked as <strong>Found</strong>.
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date Found */}
                    <div className="bg-dark-light/40 border border-white/5 rounded-3xl p-6">
                        <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-secondary" />
                            Date Found <span className="text-red-400">*</span>
                        </label>
                        <input
                            type="date"
                            value={dateFound}
                            onChange={(e) => setDateFound(e.target.value)}
                            max={today}
                            required
                            className="w-full bg-dark border border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:border-secondary transition-all text-white"
                        />
                        <p className="text-xs text-gray-500 mt-2">The date when this person was found or identified.</p>
                    </div>

                    {/* Description */}
                    <div className="bg-dark-light/40 border border-white/5 rounded-3xl p-6">
                        <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-secondary" />
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows={5}
                            placeholder="Describe where and how this person was found. Include as much detail as possible to help admin verify..."
                            className="w-full bg-dark border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-secondary transition-all text-white placeholder-gray-600 resize-none"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            {description.length}/2000 characters
                        </p>
                    </div>

                    {/* Evidence Media Upload */}
                    <div className="bg-dark-light/40 border border-white/5 rounded-3xl p-6">
                        <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                            <Upload className="w-4 h-4 text-secondary" />
                            Evidence Photo / Video
                            <span className="text-xs text-gray-500 font-normal ml-1">(up to 5 files)</span>
                        </label>

                        {/* Upload Area */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center cursor-pointer hover:border-secondary/50 hover:bg-secondary/5 transition-all group"
                        >
                            <Upload className="w-10 h-10 text-gray-600 group-hover:text-secondary mx-auto mb-3 transition-colors" />
                            <p className="text-gray-400 font-medium mb-1">Click to upload evidence</p>
                            <p className="text-gray-600 text-sm">Images or videos (JPG, PNG, MP4, MOV)</p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>

                        {/* File Previews */}
                        {previews.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                                {previews.map((p, idx) => (
                                    <div
                                        key={idx}
                                        className="relative rounded-2xl overflow-hidden border border-white/10 bg-dark aspect-square"
                                    >
                                        {p.type === "video" ? (
                                            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                                <Video className="w-8 h-8 text-gray-500" />
                                                <span className="text-xs text-gray-400">
                                                    {mediaFiles[idx]?.name}
                                                </span>
                                            </div>
                                        ) : (
                                            <img
                                                src={p.url}
                                                alt={`preview-${idx}`}
                                                className="w-full h-full object-cover"
                                            />
                                        )}
                                        <button
                                            type="button"
                                            onClick={() => removeFile(idx)}
                                            className="absolute top-2 right-2 w-7 h-7 bg-red-500/90 rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <div className="absolute bottom-2 left-2 w-6 h-6 bg-black/60 rounded-lg flex items-center justify-center">
                                            {p.type === "video"
                                                ? <Video className="w-3 h-3 text-white" />
                                                : <ImageIcon className="w-3 h-3 text-white" />}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-2xl p-4">
                            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                            <p className="text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-green-500 hover:bg-green-400 disabled:bg-green-500/40 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-3 text-lg shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Submitting Evidence...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                Submit Found Evidence
                            </>
                        )}
                    </button>
                </form>
            </main>
        </div>
    );
}
