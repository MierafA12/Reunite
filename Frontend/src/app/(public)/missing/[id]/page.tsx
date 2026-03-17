"use client";

import Image from "next/image";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/footer";
import { InfoCard, ImageBox, VideoBox, Comment } from "@/app/components/ui/InfoCard";
import { User, Calendar, MapPin, Flag, ShieldCheck, MessageSquare, ShieldAlert, Send, DollarSign, Quote, Heart, SendHorizonal, ArrowLeft } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { reportApi } from "@/app/lib/api";
import ReporterCard from "@/app/components/ui/ReporterCard";
import FlagButton from "@/app/components/ui/FlagButton";
import PostActions from "@/app/components/ui/PostActions";
import SecretConnection from "@/app/components/ui/SecretConnection";
import Button from "@/app/components/ui/Button";

const PublicMissingPersonPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [report, setReport] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const data = await reportApi.getPublicReport(id as string);
                setReport(data);
            } catch (err: any) {
                console.error("Failed to fetch public report:", err);
                setError("Case not found or could not be loaded.");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchReport();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-dark text-white flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-secondary border-t-transparent rounded-full" />
            </div>
        );
    }

    if (error || !report) {
        return (
            <div className="min-h-screen bg-dark text-white flex flex-col items-center justify-center p-6 text-center">
                <ShieldAlert className="w-16 h-16 text-danger mb-4" />
                <h1 className="text-2xl font-bold mb-2">{error || "Case Not Found"}</h1>
                <Button href="/missing" variant="outline" className="mt-4">Back to Search</Button>
            </div>
        );
    }

    // Get reporter name
    const reporterName = report.user ? 
        (`${report.user.first_name || ""} ${report.user.last_name || ""}`).trim() : 
        "Verified Reporter";


    const person = {
        name: report.first_name || "Unknown",
        surname: report.last_name || "",
        fullName: [report.first_name, report.middle_name, report.last_name].filter(Boolean).join(" ") || "Unknown Person",
        id: report.id,
        location: report.last_seen_location || "Location not specified",
        date: report.last_seen_date ? new Date(report.last_seen_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "Date unknown",
        age: report.age ? `${report.age} Years` : "Age Unknown",
        gender: report.gender || "Not specified",
        nationality: report.nationality || "Not specified",
        story: report.circumstances || "No details provided for the disappearance.",
        reward: report.offer_reward ? `${report.reward_amount}` : null,
        status: (report.status || "pending").toLowerCase(),
        physical: report.physical_description || "No physical description provided.",
        media: report.media || []
    };

    const reporter = {
        name: reporterName,
        initials: report.user?.first_name ? (report.user.first_name[0] + (report.user.last_name ? report.user.last_name[0] : "")) : "R",
        role: "Primary contact",
        relation: report.relation_with_person || "Reporter",
        message: "If you have any information, please reach out immediately."
    };

    return (
        <div className="min-h-screen bg-dark text-white font-sans">
            <Header />

            {/* HERO SECTION */}
            <section className="relative min-h-[85vh] w-full flex flex-col justify-end overflow-hidden pb-40">
                <img
                    src={person.media?.[0]?.media_url || "/images/reunite.jpeg"}
                    alt={person.fullName}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Enhanced Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full mb-12">
                    <div className="animate-fadeInUp flex flex-col md:flex-row md:items-end md:justify-between gap-10">
                        
                        {/* LEFT: Identity */}
                        <div className="flex-1 space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl border ${
                                        person.status === 'found' 
                                            ? 'bg-success/20 text-success border-success/30' 
                                            : 'bg-danger/20 text-danger border-danger/30 animate-pulse'
                                    }`}>
                                        {person.status === 'found' ? 'RESOLVED' : 'MISSING / URGENT'}
                                    </span>
                                    <span className="text-white/30 text-[10px] font-black tracking-[0.2em] uppercase">
                                        REF #{person.id?.toString().slice(0, 8).toUpperCase()}
                                    </span>
                                </div>
                                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none text-white drop-shadow-2xl">
                                    {person.name} <span className="text-secondary">{person.surname}</span>
                                </h1>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4 text-white/60 font-bold uppercase tracking-widest text-[10px]">
                                <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/5">
                                    <MapPin className="w-3.5 h-3.5 text-secondary" />
                                    <span>Last seen: <span className="text-white">{person.location}</span></span>
                                </div>
                                <div className="flex items-center gap-2.5 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/5">
                                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                                    <span>Added <span className="text-white">{person.date}</span></span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Actions */}
                        <div className="flex flex-col items-start md:items-end gap-6">
                            <div className="flex flex-wrap items-center gap-3">
                                <PostActions ownerId={report.user_id} postId={person.id} />
                                <FlagButton ownerId={report.user_id} personName={person.fullName} />
                            </div>
                            
                            <button 
                                onClick={() => router.back()} 
                                className="flex items-center gap-2 text-white/30 hover:text-white transition-all group font-black text-[10px] uppercase tracking-[0.2em] hover:tracking-[0.3em]"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                RETURN TO SEARCH
                            </button>
                        </div>

                    </div>
                </div>

            </section>

            {/* QUICK INFO GRID */}
            <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <InfoCard label="Age" value={person.age} icon={User} />
                    <InfoCard label="Gender" value={person.gender} icon={ShieldCheck} />
                    <InfoCard label="Nationality" value={person.nationality} icon={Flag} />
                    <InfoCard label="Current Status" value={person.status ? (person.status.charAt(0).toUpperCase() + person.status.slice(1)) : "Unknown"} icon={Calendar} />
                </div>
            </section>



            {/* CONTENT GRID */}
            <main className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12">

                <div className="space-y-16">
                    {/* DISAPPEARANCE STORY */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-8 bg-secondary rounded-full" />
                            <h2 className="text-3xl font-bold">The Story & Circumstances</h2>
                        </div>
                        <div className="bg-dark-light/20 border border-white/5 rounded-3xl p-8 leading-relaxed text-gray-300 relative overflow-hidden">
                            <Quote className="absolute -top-4 -right-4 w-32 h-32 text-white/5 rotate-12" />
                            <p className="text-lg italic leading-relaxed">
                                {person.story}
                            </p>

                        </div>
                    </div>

                    {/* PHYSICAL DETAILS */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-8 bg-secondary rounded-full" />
                            <h2 className="text-3xl font-bold">Physical Description</h2>
                        </div>
                        <div className="bg-dark-light/10 border border-white/5 rounded-3xl p-8 leading-relaxed text-gray-300">
                            <p className="text-lg">
                                {person.physical}
                            </p>
                        </div>
                    </div>

                    {/* MEDIA GALLERY */}
                    {person.media.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-1 h-8 bg-secondary rounded-full" />
                                    <h2 className="text-3xl font-bold">Photos & Evidence</h2>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {person.media.map((med: any, idx: number) => (
                                    <ImageBox key={idx} src={med.media_url} />
                                ))}
                            </div>

                        </div>
                    )}

                    {/* SECRET CONNECTION SECTION */}
                    <SecretConnection ownerId={report.user_id} personName={person.fullName} />

                    {/* COMMENTS SECTION - Static for now but UI is ready */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-secondary rounded-full" />
                                <h2 className="text-3xl font-bold">Community Sightings</h2>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Example Static Comment */}
                            <Comment 
                                author="Dawit Yohannes"
                                date="3 hours ago"
                                text="I think I saw someone matching this description near the city center recently. Boosting for visibility."
                            />
                        </div>

                        {/* ADD COMMENT */}
                        <div className="bg-dark-light/20 border border-white/5 rounded-3xl p-8 mt-12">
                            <h4 className="text-xl font-bold mb-4">Add a Sighting</h4>
                            <p className="text-sm text-gray-500 mb-6 font-bold uppercase tracking-wider">Has he been spotted?</p>
                            <div className="relative">
                                <textarea
                                    placeholder="Provide details about your sighting..."
                                    className="w-full bg-dark border border-white/10 rounded-2xl p-6 outline-none focus:border-secondary transition-all min-h-[120px] text-white"
                                />
                                <button className="absolute bottom-4 right-4 bg-secondary text-white p-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-secondary/20">
                                    <SendHorizonal size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SIDEBAR - REPORTER & REWARD */}
                <aside className="relative">
                    <div className="sticky top-32 space-y-8">
                        <ReporterCard
                            name={reporter.name}
                            initials={reporter.initials}
                            role={`${reporter.role} (${reporter.relation})`}
                            message={reporter.message}
                            ownerId={report.user_id}
                        />


                        {/* REWARD CALLOUT */}
                        {person.reward && (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8 text-center space-y-4">
                                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                    <DollarSign className="w-8 h-8 text-green-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Active Reward</h3>
                                    <p className="text-green-400 text-2xl font-black mt-1">ETB {person.reward}</p>
                                </div>
                                <p className="text-gray-400 text-sm italic">
                                    For information leading to a successful reunion.
                                </p>
                            </div>
                        )}
                    </div>
                </aside>
            </main>

            <Footer />
        </div>
    );
};

export default PublicMissingPersonPage;
