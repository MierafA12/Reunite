import Image from "next/image";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/footer";
import { InfoCard, ImageBox, VideoBox, Comment } from "@/app/components/ui/InfoCard";
import { User, Calendar, MapPin, Flag, ShieldCheck, MessageSquare, ShieldAlert, Send, DollarSign, Quote, Heart, SendHorizonal } from "lucide-react";
import React from "react";
import Link from "next/link";
import ReporterCard from "@/app/components/ui/ReporterCard";
import FlagButton from "@/app/components/ui/FlagButton";
import PostActions from "@/app/components/ui/PostActions";
import SecretConnection from "@/app/components/ui/SecretConnection";
import Button from "@/app/components/ui/Button";

interface PageProps {
    params: Promise<{ id: string }>;
}

const PublicMissingPersonPage = async ({ params }: PageProps) => {
    const { id } = await params;

    // Simulate that this post is owned by user "2" (so logged-in user "1" can flag it)
    const ownerId = "2";

    // This would ideally fetch from an API
    const person = {
        name: "Abebe Kebede",
        surname: "Tesfaye",
        id: id,
        location: "Addis Ababa, Piazza Area",
        date: "12 Jan 2026",
        age: "27 Years",
        gender: "Male",
        nationality: "Ethiopian",
        birthDate: "12 April 1999",
        reward: "ETB 50,000",
        hasReward: true,
        story: "Abebe lived a quiet life in the heart of Piazza. On the day he disappeared, he told his mother he was going to buy some medicine for his father. He was last seen by a street vendor near the old Post Office, looking at his watch as if he was waiting for someone. Since then, his phone has been inactive and no one in his regular circle has heard from him. The community has come together to search for him, but so far, no concrete leads have emerged."
    };

    const reporter = {
        name: "Kaleb Tadesse",
        initials: "KT",
        role: "Family Member",
        relation: "Brother",
        message: "We are desperately looking for Abebe. If you have any information, please reach out immediately. Every second counts."
    };

    return (
        <div className="min-h-screen bg-dark text-white font-sans">
            <Header />

            {/* HERO SECTION */}
            <section className="relative h-[70vh] w-full overflow-hidden">
                <Image
                    src="/images/reunite.jpeg"
                    alt="Missing person"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-16">
                    <div className="animate-fadeInUp">
                        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                            <div className="flex items-center gap-3">
                                <span className="bg-danger/20 text-danger border border-danger/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 bg-danger rounded-full animate-ping" />
                                    Status: Missing
                                </span>
                                {person.hasReward && (
                                    <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                        <DollarSign size={14} />
                                        Reward: {person.reward}
                                    </span>
                                )}
                                <span className="bg-white/10 backdrop-blur-md text-white/80 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium">
                                    Case #{person.id}
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                <PostActions ownerId={ownerId} postId={id} />
                                <FlagButton ownerId={ownerId} />
                            </div>
                        </div>

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
                    <InfoCard label="Birth Date" value={person.birthDate} icon={Calendar} />
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
                            <p className="text-lg mb-6">
                                Abebe was last seen wearing a distinctive <span className="text-white font-semibold">bright blue jacket</span> with silver reflectors, black trousers, and white sports shoes.
                            </p>
                            <p className="text-lg">
                                He is approximately 175cm tall with a slim build. He has a small scar on his left eyebrow and speaks with a calm, soft tone.
                            </p>
                        </div>
                    </div>

                    {/* MEDIA GALLERY */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-secondary rounded-full" />
                                <h2 className="text-3xl font-bold">Photos & Evidence</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ImageBox />
                            <ImageBox />
                            <ImageBox />
                            <VideoBox />
                        </div>
                    </div>

                    {/* SECRET CONNECTION SECTION */}
                    <SecretConnection ownerId={ownerId} personName={person.name} />

                    {/* COMMENTS SECTION */}
                    <div className="space-y-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-1 h-8 bg-secondary rounded-full" />
                                <h2 className="text-3xl font-bold">Community Sightings</h2>
                            </div>
                            <span className="text-gray-500 text-sm font-medium">3 Comments Found</span>
                        </div>

                        <div className="space-y-6">
                            <Comment
                                author="Dawit Yohannes"
                                date="3 hours ago"
                                text="I think I saw someone matching this description near the National Theatre around 5 PM yesterday. They weren't wearing the blue jacket though, but the facial features looked very similar."
                            />
                            <Comment
                                author="Sara Tsegaye"
                                date="Yesterday"
                                text="Commenting to boost visibility. I hope he is found safe and sound!"
                            />
                            <Comment
                                author="Anonymous"
                                date="2 days ago"
                                text="I shared this to my Facebook group. We are all looking out for him in the Piassa area."
                            />
                        </div>

                        {/* ADD COMMENT */}
                        <div className="bg-dark-light/20 border border-white/5 rounded-3xl p-8 mt-12">
                            <h4 className="text-xl font-bold mb-4">Add a Comment or Sighting</h4>
                            <p className="text-sm text-gray-500 mb-6">Share information that might help, but please keep confidential tips for the 'Secret Connection'.</p>
                            <div className="relative">
                                <textarea
                                    placeholder="Write your comment here..."
                                    className="w-full bg-dark border border-white/10 rounded-2xl p-6 outline-none focus:border-secondary transition-all min-h-[120px] text-white"
                                />
                                <button className="absolute bottom-4 right-4 bg-secondary text-white p-3 rounded-xl hover:scale-105 transition-all shadow-lg shadow-secondary/20">
                                    <SendHorizonal size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SIDEBAR - REPORTER INFO */}
                <aside className="space-y-8">
                    <ReporterCard
                        name={reporter.name}
                        initials={reporter.initials}
                        role={`${reporter.role} (${reporter.relation})`}
                        message={reporter.message}
                        ownerId={ownerId}
                    />

                    {/* REWARD CALLOUT */}
                    {person.hasReward && (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-3xl p-8 text-center space-y-4">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                                <DollarSign className="w-8 h-8 text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Active Reward</h3>
                                <p className="text-green-400 text-2xl font-black mt-1">{person.reward}</p>
                            </div>
                            <p className="text-gray-400 text-sm italic">
                                For information leading to a successful reunion.
                            </p>
                        </div>
                    )}
                </aside>

            </main>

            <Footer />
        </div>
    );
};

export default PublicMissingPersonPage;
