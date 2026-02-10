"use client";

import React, { useState } from "react";
import Header from "@/app/components/layout/Header";
import { User, MapPin, Calendar, Camera, FileText, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Upload, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Modal from "@/app/components/ui/Modal";

const steps = [
    { title: "Personal Details", icon: User },
    { title: "Last Seen", icon: MapPin },
    { title: "Media & Evidence", icon: Camera },
    { title: "Review & Submit", icon: FileText },
];

export default function ReportPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVerifyingModalOpen, setIsVerifyingModalOpen] = useState(false);
    const [isVerifyingCode, setIsVerifyingCode] = useState(false);
    const [verificationCode, setVerificationCode] = useState("");

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifyingModalOpen(true);
    };

    const handleVerify = () => {
        if (verificationCode.length !== 6) return;

        setIsVerifyingCode(true);
        // Simulate verification process
        setTimeout(() => {
            setIsVerifyingCode(false);
            setIsVerifyingModalOpen(false);
            setIsSubmitted(true);
            setTimeout(() => {
                router.push("/dashboard/user");
            }, 4000);
        }, 2000);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center p-6">
                <div className="max-w-md w-full text-center space-y-8 animate-fadeInUp">
                    <div className="relative mx-auto w-24 h-24">
                        <div className="absolute inset-0 bg-success/20 rounded-full blur-xl animate-pulse" />
                        <div className="relative w-24 h-24 bg-success/20 rounded-full flex items-center justify-center border border-success/30">
                            <CheckCircle2 className="w-12 h-12 text-success" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold text-white tracking-tight">Report <span className="text-success">Received</span></h1>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-bold uppercase tracking-wider">
                            <ShieldCheck size={14} />
                            Verification Pending
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Your report has been successfully submitted and is now in our <span className="text-white font-bold">verification pipeline</span>.
                            Our team will review the details to ensure accuracy before it goes public.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-secondary h-full animate-[progress_4s_linear]" />
                        </div>
                        <p className="text-xs text-gray-600 italic">Redirecting you back to dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-dark text-white font-sans">
            <Header />

            <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
                {/* PAGE HEADER */}
                <div className="mb-12">
                    <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Report <span className="text-secondary">Missing Person</span></h1>
                    <p className="text-gray-400 max-w-2xl">
                        Please provide as much detail as possible. Every piece of information helps in the search and increases the chances of a successful reunion.
                    </p>
                </div>

                {/* STEP PROGRESSION */}
                <div className="flex items-center justify-between mb-16 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
                    <div
                        className="absolute top-1/2 left-0 h-0.5 bg-secondary -translate-y-1/2 z-0 transition-all duration-500"
                        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                    />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index <= currentStep;
                        return (
                            <div key={index} className="relative z-10 flex flex-col items-center">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? "bg-secondary text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]" : "bg-dark-light border border-white/10 text-gray-500"
                                    }`}>
                                    <Icon size={20} />
                                </div>
                                <span className={`absolute -bottom-8 text-xs font-bold uppercase tracking-wider transition-colors duration-500 whitespace-nowrap ${isActive ? "text-white" : "text-gray-600"
                                    }`}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* FORM CONTENT */}
                <div className="bg-dark-light/30 border border-white/5 rounded-3xl p-8 md:p-12 mb-8 backdrop-blur-sm">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        {currentStep === 0 && (
                            <div className="animate-fadeIn space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                                        <input
                                            placeholder="Enter full legal name"
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Nickname / Alias</label>
                                        <input
                                            placeholder="Any other names they go by"
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Age</label>
                                        <input
                                            type="number"
                                            placeholder="Current age"
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Gender</label>
                                        <select className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all appearance-none cursor-pointer">
                                            <option>Select Gender</option>
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Nationality</label>
                                        <input
                                            placeholder="Country of origin"
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 1 && (
                            <div className="animate-fadeIn space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Last Seen Location</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <input
                                                placeholder="City, District, Landmark"
                                                className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-secondary transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Last Seen Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <input
                                                type="date"
                                                className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-secondary transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Physical Description at Time of Disappearance</label>
                                    <textarea
                                        placeholder="What were they wearing? Any visible marks, tattoos, or accessories?"
                                        className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all min-h-[150px]"
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="animate-fadeIn space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="border-2 border-dashed border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center space-y-4 hover:border-secondary/50 hover:bg-secondary/5 transition-all cursor-pointer group">
                                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                                            <Upload className="text-gray-500 group-hover:text-secondary transition-colors" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold">Upload Principal Photo</p>
                                            <p className="text-xs text-gray-500 mt-1">Clear front-facing photo preferred</p>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="border border-white/5 bg-dark rounded-2xl flex items-center justify-center text-gray-700 hover:border-secondary/30 transition-all cursor-pointer">
                                                <Camera size={20} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex gap-4">
                                    <ShieldCheck className="text-primary shrink-0" />
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        Uploading recent, high-quality photos significantly helps the AI matching system and community members identify the person. Please ensure you have legal right to share these images.
                                    </p>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="animate-fadeIn space-y-8">
                                <div className="bg-white/5 rounded-3xl p-8 space-y-6">
                                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                        <h3 className="font-bold text-xl">Information Summary</h3>
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(0)}
                                            className="text-secondary text-sm font-bold"
                                        >
                                            Edit All
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 text-sm">
                                        <div className="flex justify-between md:pr-10 border-b border-white/5 md:border-b-0 pb-2 md:pb-0">
                                            <span className="text-gray-500">Name:</span>
                                            <span className="font-medium">Abebe Kebede Tesfaye</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Age:</span>
                                            <span className="font-medium">27 Years</span>
                                        </div>
                                        <div className="flex justify-between md:pr-10 border-b border-white/5 md:border-b-0 pb-2 md:pb-0">
                                            <span className="text-gray-500">Location:</span>
                                            <span className="font-medium">Piazza, Addis Ababa</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Date:</span>
                                            <span className="font-medium">2026-01-12</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 px-2">
                                    <input type="checkbox" className="mt-1 w-4 h-4 rounded border-white/10 bg-dark text-secondary focus:ring-secondary" required />
                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        I confirm that the information provided is accurate to the best of my knowledge. I understand that false reporting is illegal and may lead to legal action.
                                    </p>
                                </div>
                            </div>
                        )}


                        <div className="flex items-center justify-between pt-8 border-t border-white/5">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all ${currentStep === 0 ? "opacity-0 pointer-events-none" : "hover:bg-white/5 text-gray-400"
                                    }`}
                            >
                                <ArrowLeft size={18} />
                                Previous
                            </button>

                            {currentStep === steps.length - 1 ? (
                                <button
                                    type="submit"
                                    className="bg-secondary text-white px-12 py-4 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all flex items-center gap-2"
                                >
                                    Submit Report
                                    <CheckCircle2 size={18} />
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-white text-dark px-12 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all flex items-center gap-2"
                                >
                                    Next Step
                                    <ArrowRight size={18} />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </main>
            {/* VERIFICATION MODAL */}
            <Modal
                isOpen={isVerifyingModalOpen}
                onClose={() => !isVerifyingCode && setIsVerifyingModalOpen(false)}
                title="Report Verification"
            >
                <div className="space-y-6 py-4">
                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center text-secondary">
                            <ShieldCheck size={32} />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-xl font-bold">Secure Your Report</h4>
                            <p className="text-sm text-gray-400">
                                We've sent a 6-digit verification code to your registered email. Please enter it below to authorize this report.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                type="text"
                                maxLength={6}
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
                                placeholder="******"
                                className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 text-center text-3xl font-mono tracking-[0.5em] outline-none focus:border-secondary transition-all"
                                disabled={isVerifyingCode}
                            />
                        </div>

                        <button
                            onClick={handleVerify}
                            disabled={verificationCode.length !== 6 || isVerifyingCode}
                            className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 ${verificationCode.length === 6 && !isVerifyingCode
                                ? "bg-secondary text-white hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                                : "bg-white/5 text-gray-500 cursor-not-allowed"
                                }`}
                        >
                            {isVerifyingCode ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Verifying...
                                </>
                            ) : (
                                "Verify & Submit"
                            )}
                        </button>
                    </div>

                    <div className="text-center">
                        <button className="text-xs text-secondary font-bold hover:underline">
                            Resend verification code
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
