"use client";

import React, { useState, useRef, useEffect } from "react";
import Header from "@/app/components/layout/Header";
import { User, Mail, Phone, MapPin, Briefcase, Camera, Save, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/app/context/AuthContext";
import Button from "@/app/components/ui/Button";
import { profileApi, authApi } from "@/app/lib/api";

export default function ProfileSettingsPage() {
    const router = useRouter();
    const { user, updateUser } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    // Verification State
    const [showVerification, setShowVerification] = useState(false);
    const [otpCode, setOtpCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [verificationError, setVerificationError] = useState<string | null>(null);
    const [verificationSuccess, setVerificationSuccess] = useState(false);

    const [formData, setFormData] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone: "",
        workplace: "",
        address: "",
        gender: "",
        date_of_birth: "",
        bio: "",
        profile_image: ""
    });

    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || "",
                middle_name: user.middle_name || "",
                last_name: user.last_name || "",
                email: user.email || "",
                phone: user.phone || user.profile?.phone || "",
                workplace: user.workplace || user.profile?.workplace || "",
                address: user.address || user.profile?.address || "",
                gender: user.profile?.gender || "",
                date_of_birth: user.profile?.date_of_birth || "",
                bio: user.profile?.bio || "",
                profile_image: user.profile_image || user.profile?.profile_image || ""
            });
            if (user.profile_image || user.profile?.profile_image) {
                setPreviewImage(user.profile_image || user.profile?.profile_image || null);
            }
        }
    }, [user]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (error) setError(null);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        try {
            const response = await profileApi.updateProfile(formData);

            if (response.user) {
                // Flatten user data to match AuthContext User interface if needed, 
                // but the backend returns user with profile loaded.
                // Our AuthContext User interface might need adjustment to handle the nested profile.
                updateUser(response.user);

                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
            }
        } catch (err: any) {
            console.error("Profile update error:", err);
            setError(err.response?.data?.message || "Failed to update profile. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleResendVerification = async () => {
        setIsResending(true);
        setVerificationError(null);
        try {
            await authApi.resendVerification();
            setShowVerification(true);
        } catch (err: any) {
            setVerificationError(err.response?.data?.message || "Failed to resend code.");
        } finally {
            setIsResending(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsVerifying(true);
        setVerificationError(null);
        try {
            const response = await authApi.verifyEmail({ otp_code: otpCode });
            setVerificationSuccess(true);
            // Refresh user data to get updated verification status
            const profileResponse = await profileApi.getUserProfile();
            if (profileResponse.user) {
                updateUser(profileResponse.user);
            }
            setTimeout(() => {
                setShowVerification(false);
                setVerificationSuccess(false);
            }, 3000);
        } catch (err: any) {
            setVerificationError(err.response?.data?.message || "Invalid verification code.");
        } finally {
            setIsVerifying(false);
        }
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
                    {/* LEFT COLUMN: Profile Image & Verification */}
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
                            <h3 className="text-xl font-bold">
                                {[formData.first_name, formData.middle_name, formData.last_name].filter(Boolean).join(" ") || "New User"}
                            </h3>
                            <p className="text-gray-500 text-sm mb-6">{formData.email}</p>

                            <div className="w-full pt-6 border-t border-white/5 space-y-4">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2 text-sm text-gray-400">
                                            <ShieldCheck size={18} className={user?.email_verified_at ? "text-success" : "text-gray-600"} />
                                            <span>Account Status</span>
                                        </div>
                                        {user?.email_verified_at ? (
                                            <span className="text-[10px] bg-success/20 text-success px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Verified</span>
                                        ) : (
                                            <span className="text-[10px] bg-warning/20 text-warning px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Unverified</span>
                                        )}
                                    </div>

                                    {!user?.email_verified_at && !showVerification && (
                                        <button
                                            type="button"
                                            onClick={handleResendVerification}
                                            disabled={isResending}
                                            className="text-xs font-bold text-secondary hover:underline disabled:opacity-50"
                                        >
                                            {isResending ? "Sending code..." : "Verify Account Now"}
                                        </button>
                                    )}

                                    {showVerification && (
                                        <div className="space-y-3 pt-2">
                                            <p className="text-[10px] text-gray-400">Enter the 6-digit code sent to your email.</p>
                                            <div className="flex gap-2">
                                                <input
                                                    value={otpCode}
                                                    onChange={(e) => setOtpCode(e.target.value)}
                                                    placeholder="000000"
                                                    maxLength={6}
                                                    className="w-full bg-dark border border-white/10 rounded-xl px-3 py-2 text-center text-sm font-mono tracking-widest outline-none focus:border-secondary"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleVerifyOTP}
                                                    disabled={isVerifying || otpCode.length !== 6}
                                                    className="bg-secondary text-white px-4 py-2 rounded-xl text-xs font-bold disabled:opacity-50"
                                                >
                                                    {isVerifying ? "..." : "Verify"}
                                                </button>
                                            </div>
                                            {verificationError && <p className="text-[10px] text-danger">{verificationError}</p>}
                                            {verificationSuccess && <p className="text-[10px] text-success">Verified successfully!</p>}
                                            <button
                                                type="button"
                                                onClick={handleResendVerification}
                                                className="text-[10px] text-gray-500 hover:text-white underline block"
                                            >
                                                Resend Code
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {showSuccess && (
                            <div className="bg-success/10 border border-success/20 rounded-2xl p-4 flex items-center gap-3 animate-fadeIn">
                                <CheckCircle2 className="text-success" size={20} />
                                <p className="text-success text-sm font-medium">Profile updated successfully!</p>
                            </div>
                        )}

                        {error && (
                            <div className="bg-danger/10 border border-danger/20 rounded-2xl p-4 flex items-center gap-3 animate-fadeIn text-danger text-sm font-medium">
                                {error}
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Date of Birth</label>
                                        <input
                                            name="date_of_birth"
                                            type="date"
                                            value={formData.date_of_birth}
                                            onChange={handleInputChange}
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:border-secondary transition-all text-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
                                            className="w-full bg-dark border border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:border-secondary transition-all text-white appearance-none"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest px-1">Bio / About Me</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        placeholder="A little about yourself..."
                                        className="w-full bg-dark border border-white/10 rounded-2xl px-5 py-3.5 outline-none focus:border-secondary transition-all min-h-[100px]"
                                    />
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
                                            className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-5 py-3.5 outline-none focus:border-secondary transition-all min-h-[80px]"
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
