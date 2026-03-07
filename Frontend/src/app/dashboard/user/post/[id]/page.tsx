import Image from "next/image";
import Header from "@/app/components/layout/Header";
import { InfoCard, ImageBox, VideoBox, Comment } from "@/app/components/ui/InfoCard";
import { User, Calendar, MapPin, Flag, Clock, ShieldCheck, DollarSign } from "lucide-react";
import ReporterCard from "@/app/components/ui/ReporterCard";
import React from "react";

interface PageProps {
    params: Promise<{ id: string }>;
}

const MissingPersonPage = async ({ params }: PageProps) => {
    const { id } = await params;

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
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-danger/20 text-danger border border-danger/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <span className="w-2 h-2 bg-danger rounded-full animate-ping" />
                                Status: Missing
                            </span>
                            <span className="bg-white/10 backdrop-blur-md text-white/80 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium">
                                Case #{id}
                            </span>
                            <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <DollarSign size={14} />
                                Reward: ETB 50,000
                            </span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                            Abebe Kebede <span className="text-secondary">Tesfaye</span>
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-300">
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <MapPin className="w-4 h-4 text-secondary" />
                                <span className="text-sm font-medium">Addis Ababa, Piazza Area</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <Calendar className="w-4 h-4 text-secondary" />
                                <span className="text-sm font-medium">Last seen: 12 Jan 2026</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <Clock className="w-4 h-4 text-secondary" />
                                <span className="text-sm font-medium">Reported 2 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* QUICK INFO GRID */}
            <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    <InfoCard label="Age" value="27 Years" icon={User} />
                    <InfoCard label="Gender" value="Male" icon={ShieldCheck} />
                    <InfoCard label="Nationality" value="Ethiopian" icon={Flag} />
                    <InfoCard label="Birth Date" value="12 April 1999" icon={Calendar} />
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
                        <div className="bg-dark-light/20 border border-white/5 rounded-3xl p-8">
                            <p className="text-gray-300 leading-relaxed text-lg mb-6">
                                Abebe was last seen near the Piazza area, specifically close to the old Post Office building, around 4:30 PM. He was wearing a distinctive <span className="text-white font-semibold">bright blue jacket</span> with silver reflectors, black trousers, and white sports shoes.
                            </p>
                            <p className="text-gray-300 leading-relaxed text-lg">
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
                            <button className="text-secondary text-sm font-bold uppercase tracking-widest hover:underline transition-all">View All</button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ImageBox />
                            <ImageBox />
                            <ImageBox />
                            <VideoBox />
                        </div>
                    </div>

                    {/* COMMUNITY TIPS */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-1 h-8 bg-secondary rounded-full" />
                            <h2 className="text-3xl font-bold">Community Tips</h2>
                        </div>

                        <div className="space-y-6 max-w-4xl">
                            <Comment
                                author="Samy K."
                                date="Yesterday at 14:20"
                                text="I saw someone matching this description near Merkato last week. He seemed a bit disoriented and was asking for directions to the bus station."
                            />
                            <Comment
                                author="Hana T."
                                date="Today at 09:15"
                                text="Please check the hospitals near Bole area. Sometimes people are taken there if found unconscious."
                            />
                        </div>

                        <div className="mt-10 bg-dark-light/20 border border-white/5 rounded-3xl p-8">
                            <h3 className="text-xl font-bold mb-4">Have information?</h3>
                            <textarea
                                placeholder="Share any tips or sightings responsibly..."
                                className="w-full bg-dark border border-white/10 rounded-2xl p-6 text-white text-lg focus:border-secondary transition-all outline-none min-h-[150px]"
                            />
                            <button className="mt-6 bg-secondary text-white px-10 py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] transition-all">
                                Post Public Comment
                            </button>
                        </div>
                    </div>
                </div>

                {/* SIDEBAR - REPORTER INFO & REWARD */}
                <aside className="space-y-8">
                    <div className="sticky top-24 space-y-8">
                        <ReporterCard
                            name="Kebede Tesfaye"
                            initials="KT"
                            role="Family Member (Brother)"
                            message="We are desperate to find him. Please help us by sharing this case."
                            ownerId="1" // Assuming logged in user is owner
                        />

                        {/* REWARD CALLOUT */}
                        <div className="bg-dark-light border border-white/5 rounded-3xl p-8 text-center space-y-4 shadow-xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/5 -mr-8 -mt-8 rounded-full blur-2xl" />
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20 group-hover:scale-110 transition-transform duration-500">
                                <DollarSign className="w-8 h-8 text-green-400" />
                            </div>
                            <div>
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Active Reward</h3>
                                <p className="text-green-400 text-3xl font-black">ETB 50,000</p>
                            </div>
                            <div className="h-px w-12 bg-white/10 mx-auto" />
                            <p className="text-gray-400 text-sm italic">
                                For information leading to a successful reunion.
                            </p>
                        </div>

                        <button className="w-full bg-white text-dark py-4 rounded-2xl font-bold hover:bg-gray-200 transition-colors mb-4">
                            Contact Family
                        </button>
                        <button className="w-full border border-white/10 text-white py-4 rounded-2xl font-bold hover:bg-white/5 transition-colors">
                            Share Case
                        </button>
                    </div>
                </aside>

            </main>
        </div>
    );
};

export default MissingPersonPage;
