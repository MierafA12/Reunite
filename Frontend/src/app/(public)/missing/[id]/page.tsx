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

    // Use reported data
    const person = {
        name: report.first_name,
        surname: report.last_name,
        fullName: [report.first_name, report.middle_name, report.last_name].filter(Boolean).join(" "),
        id: report.id,
        location: report.last_seen_location,
        date: new Date(report.last_seen_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        age: `${report.age} Years`,
        gender: report.gender,
        nationality: report.nationality || "Not specified",
        story: report.circumstances,
        reward: report.offer_reward ? `${report.reward_amount}` : null,
        status: report.status,
        physical: report.physical_description,
        media: report.media || []
    };

    const reporter = {
        name: "Case Contact",
        initials: "CC",
        role: "Primary contact",
        relation: report.relation_with_person,
        message: "If you have any information, please reach out immediately."
    };

    return (
        <div className="min-h-screen bg-dark text-white font-sans">
            <Header />

            {/* HERO SECTION */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                <img
                    src={person.media?.[0]?.media_url || "/images/reunite.jpeg"}
                    alt={person.fullName}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-16">
                    <div className="animate-fadeInUp">
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <span className={`border px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                                    person.status === 'found' ? 'bg-success/20 text-success border-success/30' : 'bg-danger/20 text-danger border-danger/30'
                                }`}>
                                    <span className={`w-2 h-2 rounded-full ${person.status === 'found' ? 'bg-success' : 'bg-danger animate-ping'}`} />
                                    Status: {person.status}
                                </span>
                                {person.reward && (
                                    <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        <DollarSign size={14} />
                                        Reward: {person.reward}
                                    </span>
                                )}
                                <span className="bg-white/10 backdrop-blur-md text-white/80 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium">
                                    Case #{person.id.toString().slice(0, 8)}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <PostActions ownerId={report.user_id} postId={person.id} />
                                <FlagButton ownerId={report.user_id} />
                            </div>
                        </div>

                        <Link href="/missing" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group text-sm">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to List
                        </Link>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                            {person.name} <span className="text-secondary">{person.surname}</span>
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-300">
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <MapPin className="w-4 h-4 text-secondary" />
                                <span className="text-sm font-medium">{person.location}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <Calendar className="w-4 h-4 text-secondary" />
                                <span className="text-sm font-medium">Last seen: {person.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* QUICK INFO GRID */}
            <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <InfoCard label="Age" value={person.age} icon={User} />
                    <InfoCard label="Gender" value={person.gender} icon={ShieldCheck} />
                    <InfoCard label="Nationality" value={person.nationality} icon={Flag} />
                    <InfoCard label="Status" value={person.status} icon={Calendar} />
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
                            <p className="text-xl italic leading-relaxed">
                                "{person.story}"
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
                                    <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group">
                                        <img src={med.media_url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
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
