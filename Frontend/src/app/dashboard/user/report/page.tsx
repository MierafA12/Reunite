"use client";

import React, { useState } from "react";
import Header from "@/app/components/layout/Header";
import { User, MapPin, Calendar, Camera, FileText, ArrowRight, ArrowLeft, CheckCircle2, ShieldCheck, Upload, Video, Heart, DollarSign, Quote } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import VerifyCodePage from "@/app/components/page/verify";
import SubmissionSuccess from "@/app/components/page/SubmissionSuccess";
import { reportApi } from "@/app/lib/api";


const steps = [
    { title: "Personal Details", icon: User },
    { title: "Last Seen & Story", icon: MapPin },
    { title: "Media & Evidence", icon: Camera },
    { title: "Review & Submit", icon: FileText },
];

export default function ReportPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showVerification, setShowVerification] = useState(false);
    const [isVerifying, setIsVerifying] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        age: "",
        gender: "",
        nationality: "",
        relation_with_person: "",
        lastSeenLocation: "",
        lastSeenDate: "",
        physicalDescription: "",
        story: "",
        reward: "",
        hasReward: false,
        otherRelation: "",
    });

    const [mediaFiles, setMediaFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: checked }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setMediaFiles(prev => [...prev, ...files]);

        // Create previews
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeFile = (index: number) => {
        setMediaFiles(prev => prev.filter((_, i) => i !== index));
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const data = new FormData();
            
            // Map frontend fields to backend fields
            data.append('first_name', formData.first_name);
            data.append('middle_name', formData.middle_name);
            data.append('last_name', formData.last_name);
            data.append('age', formData.age);
            data.append('gender', formData.gender.toLowerCase());
            data.append('nationality', formData.nationality);
            
            const relation = formData.relation_with_person === "Other" 
                ? formData.otherRelation 
                : formData.relation_with_person;
            data.append('relation_with_person', relation);
            
            data.append('last_seen_location', formData.lastSeenLocation);
            data.append('last_seen_date', formData.lastSeenDate);
            data.append('physical_description', formData.physicalDescription);
            data.append('circumstances', formData.story);
            data.append('offer_reward', formData.hasReward ? '1' : '0');
            if (formData.hasReward && formData.reward) {
                data.append('reward_amount', formData.reward.replace(/[^0-9.]/g, ''));
            }

            // Append media files
            mediaFiles.forEach((file) => {
                data.append('media[]', file);
            });

            await reportApi.submitReport(data);

            setIsSubmitted(true);
            setTimeout(() => {
                router.push("/dashboard/user");
            }, 4000);
        } catch (err: any) {
            console.error("Submission error:", err);
            setError(err.response?.data?.message || "Failed to submit report. Please check all fields.");
            setIsSubmitting(false);
        }
    };


    if (isSubmitted) {
        return (
            <SubmissionSuccess
                title="Report"
                subtitle="Received"
                message="Your report has been successfully submitted and is now in our verification pipeline. Our team will review the details to ensure accuracy before it goes public."
                statusBadge="Verification Pending"
                showStatusBadge={true}
                redirectUrl="/dashboard/user"
                redirectDelay={4000}
                progressDuration={4}
            />
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
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">First Name</label>
                                        <input
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                            placeholder="First Name"
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Middle Name</label>
                                        <input
                                            name="middle_name"
                                            value={formData.middle_name}
                                            onChange={handleInputChange}
                                            placeholder="Middle Name"
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Last Name</label>
                                        <input
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                            placeholder="Last Name"
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                            required
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
                                            placeholder="Current age"
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
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Nationality</label>
                                        <input
                                            name="nationality"
                                            value={formData.nationality}
                                            onChange={handleInputChange}
                                            placeholder="Country of origin"
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Your Relation to the Person</label>
                                    <div className="relative">
                                        <Heart className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                        <select
                                            name="relation_with_person"
                                            value={formData.relation_with_person}
                                            onChange={handleInputChange}
                                            className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-secondary transition-all appearance-none cursor-pointer"
                                            required
                                        >
                                            <option value="">Select Relation</option>
                                            <option value="Parent">Parent</option>
                                            <option value="Sibling">Sibling</option>
                                            <option value="Friend">Friend</option>
                                            <option value="Relative">Relative</option>
                                            <option value="Guardian">Guardian</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    {formData.relation_with_person === "Other" && (
                                        <div className="animate-fadeIn mt-4 pl-12">
                                            <input
                                                name="otherRelation"
                                                value={formData.otherRelation}
                                                onChange={handleInputChange}
                                                placeholder="Specify your relation"
                                                className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                            />
                                        </div>
                                    )}
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
                                                name="lastSeenLocation"
                                                value={formData.lastSeenLocation}
                                                onChange={handleInputChange}
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
                                                name="lastSeenDate"
                                                type="date"
                                                value={formData.lastSeenDate}
                                                onChange={handleInputChange}
                                                className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-secondary transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Physical Description</label>
                                    <textarea
                                        name="physicalDescription"
                                        value={formData.physicalDescription}
                                        onChange={handleInputChange}
                                        placeholder="What were they wearing? Any visible marks, tattoos, or accessories?"
                                        className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all min-h-[100px]"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <Quote size={14} className="text-secondary" />
                                        The Story / Circumstances
                                    </label>
                                    <textarea
                                        name="story"
                                        value={formData.story}
                                        onChange={handleInputChange}
                                        placeholder="Describe the events leading up to their disappearance. Any specific details help the community understand the context."
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
                                                <p className="text-xs text-gray-500">Optional reward for confirmed leads</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                name="hasReward"
                                                checked={formData.hasReward}
                                                onChange={handleCheckboxChange}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                                        </label>
                                    </div>
                                    {formData.hasReward && (
                                        <div className="animate-fadeIn pt-2">
                                            <input
                                                name="reward"
                                                value={formData.reward}
                                                onChange={handleInputChange}
                                                placeholder="Enter reward amount (e.g. $500 or description)"
                                                className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {currentStep === 2 && (
                            <div className="animate-fadeIn space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <label className="border-2 border-dashed border-white/10 rounded-3xl p-10 flex flex-col items-center justify-center space-y-4 hover:border-secondary/50 hover:bg-secondary/5 transition-all cursor-pointer group relative">
                                        <input 
                                            type="file" 
                                            multiple 
                                            accept="image/*,video/*" 
                                            onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                                            <Upload className="text-gray-500 group-hover:text-secondary transition-colors" />
                                        </div>
                                        <div className="text-center">
                                            <p className="font-bold">Upload Media Files</p>
                                            <p className="text-xs text-gray-500 mt-1">Photos and video clips</p>
                                        </div>
                                    </label>
                                    <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 flex gap-4 items-center">
                                        <ShieldCheck className="text-primary shrink-0" />
                                        <p className="text-xs text-gray-400 leading-relaxed">
                                            Uploading recent, high-quality photos and video clips significantly helps the AI matching system. Please ensure you have legal right to share these images.
                                        </p>
                                    </div>
                                </div>
                                
                                {previews.length > 0 && (
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 animate-fadeIn">
                                        {previews.map((preview, index) => (
                                            <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group border border-white/10">
                                                <img src={preview} alt="" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {currentStep === 3 && (
                            <div className="animate-fadeIn space-y-8">
                                <div className="bg-white/5 rounded-3xl p-8 space-y-8">
                                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                        <h3 className="font-bold text-xl">Detailed Summary</h3>
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep(0)}
                                            className="text-secondary text-sm font-bold"
                                        >
                                            Edit All
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-sm">
                                        <div className="space-y-4">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Personal Info</p>
                                            <div className="flex justify-between border-b border-white/5 pb-2">
                                                <span className="text-gray-500">Name:</span>
                                                <span className="font-medium text-white">
                                                    {[formData.first_name, formData.middle_name, formData.last_name].filter(Boolean).join(" ") || "Not specified"}
                                                </span>
                                            </div>
                                            <div className="flex justify-between border-b border-white/5 pb-2">
                                                <span className="text-gray-500">Age:</span>
                                                <span className="font-medium text-white">{formData.age ? `${formData.age} Years` : "Not specified"}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-white/5 pb-2">
                                                <span className="text-gray-500">Gender:</span>
                                                <span className="font-medium text-white">{formData.gender || "Not specified"}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-white/5 pb-2">
                                                <span className="text-gray-500">Relation:</span>
                                                <span className="font-medium text-secondary">
                                                    {formData.relation_with_person === "Other" ? formData.otherRelation || "Other" : formData.relation_with_person || "Not specified"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Disappearance Info</p>
                                            <div className="flex justify-between border-b border-white/5 pb-2">
                                                <span className="text-gray-500">Location:</span>
                                                <span className="font-medium text-white">{formData.lastSeenLocation || "Not specified"}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-white/5 pb-2">
                                                <span className="text-gray-500">Date:</span>
                                                <span className="font-medium text-white">{formData.lastSeenDate || "Not specified"}</span>
                                            </div>
                                            <div className="flex justify-between border-b border-white/5 pb-2">
                                                <span className="text-gray-500">Reward:</span>
                                                <span className="font-medium text-green-400">{formData.hasReward ? formData.reward : "None offered"}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">The Story</p>
                                        <div className="bg-dark p-4 rounded-2xl border border-white/5 italic text-gray-300 line-clamp-3">
                                            {formData.story || "No story provided."}
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-2">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Physical Description</p>
                                        <div className="bg-dark p-4 rounded-2xl border border-white/5 text-gray-300">
                                            {formData.physicalDescription || "No description provided."}
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
                                    disabled={isSubmitting}
                                    className="bg-secondary text-white px-12 py-4 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all flex items-center gap-2 disabled:opacity-50"
                                >
                                    {isSubmitting ? "Submitting..." : "Submit Report"}
                                    {!isSubmitting && <CheckCircle2 size={18} />}
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
                        {error && (
                            <div className="mt-6 p-4 bg-danger/10 border border-danger/20 rounded-2xl text-danger text-center text-sm font-medium animate-fadeIn">
                                {error}
                            </div>
                        )}
                    </form>
                </div>
            </main>
        </div>
    );
}
