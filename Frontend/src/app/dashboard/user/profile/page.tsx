"use client";

import React, { useState, useRef, useEffect } from "react";
import Header from "@/app/components/layout/Header";
import { User, Mail, Phone, MapPin, Briefcase, Camera, Save, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import Button from "@/app/components/ui/Button";

export default function ProfileSettingsPage() {
    const router = useRouter();
    const { user, login } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone: "",
        workplace: "",
        address: "",
        profile_image: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || "",
                middle_name: user.middle_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                phone: user.phone || "",
                workplace: user.workplace || "",
                address: user.address || "",
                profile_image: user.profile_image || ""
            });
            if (user.profile_image) {
                setPreviewImage(user.profile_image);
            }
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setPreviewImage(base64String);
                setFormData(prev => ({ ...prev, profile_image: base64String }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        // Simulate API call
        setTimeout(() => {
            if (user) {
                const updatedUser = {
                    ...user,
                    ...formData,
                    name: `${formData.first_name} ${formData.last_name}`
                };
                login(updatedUser);
            }
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-dark text-white font-sans">
            <Header />

            <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
                {/* PAGE HEADER */}
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Profile <span className="text-secondary">Settings</span></h1>
                        <p className="text-gray-400">Update your personal information and how others see you on the platform.</p>
                    </div>
                    <Button
                        onClick={() => router.back()}
                        variant="outline"
                        className="border-white/10 text-white hover:bg-white/5 w-fit"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* LEFT COLUMN: Profile Image */}
                    <div className="space-y-8">
                        <div className="bg-dark-light/30 border border-white/5 rounded-3xl p-8 flex flex-col items-center text-center">
                            <div
                                className="relative w-40 h-40 rounded-full overflow-hidden mb-6 group cursor-pointer border-4 border-secondary/20 shadow-2xl shadow-secondary/10"
                                onClick={handleImageClick}
                            >
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-dark flex items-center justify-center">
                                        <User size={60} className="text-gray-600" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Camera className="text-white" size={32} />
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/*"
                                className="hidden"
                            />
                            <h3 className="text-xl font-bold">{formData.first_name} {formData.last_name || "New User"}</h3>
                            <p className="text-gray-500 text-sm mb-6">{formData.email}</p>

                            <div className="w-full pt-6 border-t border-white/5 space-y-4">
                                <div className="flex items-center gap-3 text-sm text-gray-400">
                                    <ShieldCheck size={18} className="text-secondary" />
                                    <span>Verified Account Status</span>
                                </div>
                            </div>
                        </div>

                        {showSuccess && (
                            <div className="bg-success/10 border border-success/20 rounded-2xl p-4 flex items-center gap-3 animate-fadeIn">
                                <CheckCircle2 className="text-success" size={20} />
                                <p className="text-success text-sm font-medium">Profile updated successfully!</p>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Form Fields */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-dark-light/30 border border-white/5 rounded-3xl p-8 md:p-10 backdrop-blur-sm shadow-xl">
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">First Name</label>
                                        <input
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleInputChange}
                                            placeholder="First Name"
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:border-secondary transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Middle Name</label>
                                        <input
                                            name="middle_name"
                                            value={formData.middle_name}
                                            onChange={handleInputChange}
                                            placeholder="Middle Name"
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Last Name</label>
                                        <input
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleInputChange}
                                            placeholder="Last Name"
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:border-secondary transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Email Address</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <input
                                                name="email"
                                                type="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 outline-none focus:border-secondary transition-all opacity-60 cursor-not-allowed"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+251 ..."
                                                className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 outline-none focus:border-secondary transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Workplace / Organization</label>
                                    <div className="relative">
                                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                        <input
                                            name="workplace"
                                            value={formData.workplace}
                                            onChange={handleInputChange}
                                            placeholder="Company, NGO, or Office"
                                            className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 outline-none focus:border-secondary transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Full Address</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-4 text-gray-500" size={18} />
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Street, District, City"
                                            className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 outline-none focus:border-secondary transition-all min-h-[100px]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-white/5 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="bg-secondary text-white px-10 py-4 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(79,70,229,0.4)] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    {isSaving ? "Saving Changes..." : "Save Profile"}
                                    {!isSaving && <Save size={18} className="group-hover:scale-110 transition-transform" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
