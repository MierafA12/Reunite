"use client";

import React, { useState, useEffect } from "react";
import Header from "@/app/components/layout/Header";
import { User, MapPin, Calendar, Camera, FileText, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Upload, Save, DollarSign } from "lucide-react";
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
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        age: "",
        gender: "",
        nationality: "",
        last_seen_location: "",
        last_seen_date: "",
        physical_description: "",
        circumstances: "",
        offer_reward: false,
        reward_amount: "",
        relation_with_person: "",
    });

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await reportApi.getReport(id as string);
                setFormData({
                    first_name: data.first_name || "",
                    middle_name: data.middle_name || "",
                    last_name: data.last_name || "",
                    age: data.age?.toString() || "",
                    gender: data.gender || "",
                    nationality: data.nationality || "",
                    last_seen_location: data.last_seen_location || "",
                    last_seen_date: data.last_seen_date || "",
                    physical_description: data.physical_description || "",
                    circumstances: data.circumstances || "",
                    offer_reward: !!data.offer_reward,
                    reward_amount: data.reward_amount?.toString() || "",
                    relation_with_person: data.relation_with_person || "",
                });
            } catch (err: any) {
                console.error("Failed to fetch report:", err);
                setError("Failed to load report data.");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchReport();
    }, [id]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        try {
            await reportApi.updateReport(id as string, {
                ...formData,
                offer_reward: formData.offer_reward ? 1 : 0
            });
            setIsSubmitted(true);
            setTimeout(() => {
                router.push(`/dashboard/user/report/manage/${id}`);
            }, 3000);
        } catch (err: any) {
            console.error("Update error:", err);
            setError(err.response?.data?.message || "Failed to save changes.");
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-dark text-white flex items-center justify-center">
                <div className="animate-spin w-10 h-10 border-4 border-secondary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-dark flex items-center justify-center p-6 text-white text-center">
                <div className="max-w-md w-full space-y-6 animate-fadeInUp">
                    <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-success/30">
                        <CheckCircle2 className="w-12 h-12 text-success" />
                    </div>
                    <h1 className="text-4xl font-bold">Changes Saved</h1>
                    <p className="text-gray-400">
                        The report has been successfully updated.
                        Redirecting you back to management...
                    </p>
                    <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-8">
                        <div className="bg-secondary h-full animate-[progress_3s_linear] w-full" />
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
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-4 tracking-tight">Edit <span className="text-secondary">Report</span></h1>
                        <p className="text-gray-400 max-w-2xl">
                            Update the information for this missing person report. Ensure all new details are accurate.
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        className="border-white/10 text-white hover:bg-white/5 px-6 py-3 rounded-xl"
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
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">First Name</label>
                                        <input
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Middle Name</label>
                                        <input
                                            name="middle_name"
                                            value={formData.middle_name}
                                            onChange={handleInputChange}
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Last Name</label>
                                        <input
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Age</label>
                                        <input
                                            name="age"
                                            type="number"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all appearance-none cursor-pointer"
                                        >
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Nationality</label>
                                        <input
                                            name="nationality"
                                            value={formData.nationality}
                                            onChange={handleInputChange}
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Relation</label>
                                    <input
                                        name="relation_with_person"
                                        value={formData.relation_with_person}
                                        onChange={handleInputChange}
                                        className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                    />
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
                                                name="last_seen_location"
                                                value={formData.last_seen_location}
                                                onChange={handleInputChange}
                                                className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-secondary transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Last Seen Date</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <input
                                                name="last_seen_date"
                                                type="date"
                                                value={formData.last_seen_date}
                                                onChange={handleInputChange}
                                                className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-secondary transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Story / Circumstances</label>
                                    <textarea
                                        name="circumstances"
                                        value={formData.circumstances}
                                        onChange={handleInputChange}
                                        className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all min-h-[150px]"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Physical Description</label>
                                    <textarea
                                        name="physical_description"
                                        value={formData.physical_description}
                                        onChange={handleInputChange}
                                        className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all min-h-[150px]"
                                    />
                                </div>

                                <div className="p-6 bg-secondary/5 border border-secondary/10 rounded-3xl space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                                                <DollarSign size={20} className="text-secondary" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">Offer Reward</p>
                                                <p className="text-xs text-gray-400">Optional reward for confirmed leads</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="offer_reward"
                                                checked={formData.offer_reward}
                                                onChange={handleCheckboxChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                                        </label>
                                    </div>
                                    {formData.offer_reward && (
                                        <div className="animate-fadeIn pt-2">
                                            <input
                                                name="reward_amount"
                                                value={formData.reward_amount}
                                                onChange={handleInputChange}
                                                placeholder="Enter reward amount"
                                                className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="animate-fadeIn space-y-8">
                                <div className="p-8 bg-white/5 rounded-3xl border border-white/10 text-center">
                                    <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold mb-2">Media Management</h3>
                                    <p className="text-gray-400 max-w-sm mx-auto">
                                        Currently, media editing is restricted to the initial submission. 
                                        To change photos, please contact our support team or create a new report.
                                    </p>
                                </div>
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="animate-fadeIn space-y-8">
                                <div className="bg-white/5 rounded-3xl p-8 space-y-6">
                                    <h3 className="font-bold text-xl pb-4 border-b border-white/5 uppercase tracking-tighter shadow-sm text-secondary">Modified Entries Summary</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-500 uppercase text-[10px] font-bold">Full Identity</span>
                                            <span className="font-medium text-lg">{formData.first_name} {formData.middle_name} {formData.last_name}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-500 uppercase text-[10px] font-bold">Age / Gender</span>
                                            <span className="font-medium text-lg">{formData.age} • {formData.gender}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-500 uppercase text-[10px] font-bold">Last Known Location</span>
                                            <span className="font-medium text-lg">{formData.last_seen_location}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-500 uppercase text-[10px] font-bold">Date</span>
                                            <span className="font-medium text-lg">{formData.last_seen_date}</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <span className="text-gray-500 uppercase text-[10px] font-bold flex items-center gap-2">Reward {formData.offer_reward && <ShieldCheck size={12} className="text-green-400" />}</span>
                                            <span className="font-medium text-lg text-green-400">{formData.offer_reward ? `$${formData.reward_amount}` : "None offered"}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-2">
                                    <ShieldCheck className="text-success" />
                                    <p className="text-sm text-gray-400 italic">Verify all changes before finalizing the update.</p>
                                </div>
                                {error && (
                                    <div className="p-4 bg-danger/10 border border-danger/20 rounded-2xl text-danger text-center font-medium">
                                        {error}
                                    </div>
                                )}
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
                                    disabled={isSaving}
                                    className="bg-secondary text-white px-12 py-4 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all flex items-center gap-2 group disabled:opacity-50"
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                    {!isSaving && <Save size={18} className="group-hover:scale-110 transition-transform" />}
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
