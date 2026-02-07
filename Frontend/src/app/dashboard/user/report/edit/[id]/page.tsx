"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/components/layout/Header";
import { User, MapPin, Calendar, Camera, FileText, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Upload, Save } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import Button from "@/app/components/ui/Button";

const steps = [
    { title: "Personal Details", icon: User },
    { title: "Last Seen", icon: MapPin },
    { title: "Media & Evidence", icon: Camera },
    { title: "Review & Save", icon: FileText },
];

export default function EditReportPage() {
    const router = useRouter();
    const { id } = useParams();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Simulated data fetching
    const [formData, setFormData] = useState({
        name: "Abebe Kebede",
        surname: "Tesfaye",
        age: "27",
        gender: "Male",
        location: "Piazza Area, Addis Ababa",
        date: "2026-01-12",
        description: "Abebe was wearing a bright blue jacket with silver reflectors, black trousers, and white sports shoes.",
        nationality: "Ethiopian"
    });

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => {
            router.push(`/missing/${id}`);
        }, 3000);
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center p-6 text-white">
                <div className="max-w-md w-full text-center space-y-6 animate-fadeInUp">
                    <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-success/30">
                        <CheckCircle2 className="w-12 h-12 text-success" />
                    </div>
                    <h1 className="text-4xl font-bold">Changes Saved</h1>
                    <p className="text-gray-400">
                        The report has been successfully updated.
                        Redirecting you back to the case details...
                    </p>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-secondary h-full animate-[progress_3s_linear]" />
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
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Edit <span className="text-secondary">Case #{id}</span></h1>
                        <p className="text-gray-400 max-w-2xl">
                            Update the information for this missing person report. Ensure all new details are accurate.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="border-white/10 text-white hover:bg-white/5"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
                    </Button>
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
                <div className="bg-dark-light/30 border border-white/5 rounded-3xl p-8 md:p-12 mb-8 backdrop-blur-sm shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-10">
                        {currentStep === 0 && (
                            <div className="animate-fadeIn space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Full Name</label>
                                        <input
                                            value={formData.name + " " + formData.surname}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Nationality</label>
                                        <input
                                            value={formData.nationality}
                                            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Age</label>
                                        <input
                                            type="number"
                                            value={formData.age}
                                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Gender</label>
                                        <select
                                            value={formData.gender}
                                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all appearance-none cursor-pointer"
                                        >
                                            <option>Male</option>
                                            <option>Female</option>
                                            <option>Other</option>
                                        </select>
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
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                                                value={formData.date}
                                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                                className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-secondary transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Physical Description</label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all min-h-[150px]"
                                    />
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="animate-fadeIn space-y-8">
                                <p className="text-gray-400 text-sm">Review or upload new photos for this investigation.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 group">
                                        <Image src="/images/reunite.jpeg" alt="Current Photo" fill className="object-cover transition-transform group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button variant="secondary" className="scale-75">Replace</Button>
                                        </div>
                                    </div>
                                    <div className="border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center space-y-4 hover:border-secondary/50 hover:bg-secondary/5 transition-all cursor-pointer group">
                                        <Camera className="text-gray-500 group-hover:text-secondary transition-colors" />
                                        <span className="text-xs font-bold text-gray-500">Add More</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="animate-fadeIn space-y-8">
                                <div className="bg-white/5 rounded-3xl p-8 space-y-6">
                                    <h3 className="font-bold text-xl pb-4 border-b border-white/5 uppercase tracking-tighter shadow-sm text-secondary">Modified Entries Summary</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-500 uppercase text-[10px] font-bold">Full Identity</span>
                                            <span className="font-medium text-lg">{formData.name} {formData.surname}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-500 uppercase text-[10px] font-bold">Age / Gender</span>
                                            <span className="font-medium text-lg">{formData.age} • {formData.gender}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-500 uppercase text-[10px] font-bold">Last Known Location</span>
                                            <span className="font-medium text-lg">{formData.location}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-500 uppercase text-[10px] font-bold">Identity Date</span>
                                            <span className="font-medium text-lg">{formData.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-2">
                                    <ShieldCheck className="text-success" />
                                    <p className="text-sm text-gray-400 italic">Verify all changes before finalizing the update.</p>
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
                                    className="bg-secondary text-white px-12 py-4 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all flex items-center gap-2 group"
                                >
                                    Save Changes
                                    <Save size={18} className="group-hover:scale-110 transition-transform" />
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
        </div>
    );
}
