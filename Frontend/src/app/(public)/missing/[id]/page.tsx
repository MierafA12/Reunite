import Image from "next/image";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/footer";
import { InfoCard, ImageBox, VideoBox } from "@/app/components/ui/InfoCard";
import { User, Calendar, MapPin, Flag, ShieldCheck, MessageSquare, ShieldAlert, Send } from "lucide-react";
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

    // Simulate that this post is owned by user "1" (the default logged-in user)
    const ownerId = "1";

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
        birthDate: "12 April 1999"
    };

    const reporter = {
        name: "Kaleb Tadesse",
        initials: "KT",
        role: "Family Member",
        message: "We are desperately looking for Abebe. If you have any information, please reach out immediately."
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
                    {/* DESCRIPTION */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1 h-8 bg-secondary rounded-full" />
                            <h2 className="text-3xl font-bold">Details of Disappearance</h2>
                        </div>
                        <div className="bg-dark-light/20 border border-white/5 rounded-3xl p-8 leading-relaxed text-gray-300">
                            <p className="text-lg mb-6">
                                Abebe was last seen near the Piazza area, specifically close to the old Post Office building, around 4:30 PM. He was wearing a distinctive <span className="text-white font-semibold">bright blue jacket</span> with silver reflectors, black trousers, and white sports shoes.
                            </p>
                            <p className="text-lg">
                                He left home to run a quick errand and hasn't been heard from since. His phone has been switched off from 6:00 PM on the same day. He is approximately 175cm tall with a slim build.
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
                </div>

                {/* SIDEBAR - REPORTER INFO */}
                <aside className="space-y-8">
                    <ReporterCard
                        name={reporter.name}
                        initials={reporter.initials}
                        role={reporter.role}
                        message={reporter.message}
                        ownerId={ownerId}
                    />
                </aside>

            </main>

            <Footer />
        </div>
    );
};

export default PublicMissingPersonPage;
