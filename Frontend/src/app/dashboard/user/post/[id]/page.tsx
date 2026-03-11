import Image from "next/image";
import Header from "@/app/components/layout/Header";
import { InfoCard, ImageBox, VideoBox } from "@/app/components/ui/InfoCard";
import { User, Calendar, MapPin, Flag, Clock, ShieldCheck, Settings, AlertCircle } from "lucide-react";
import PostActions from "@/app/components/ui/PostActions";
import React from "react";

interface PageProps {
    params: Promise<{ id: string }>;
}

const ManagementPage = async ({ params }: PageProps) => {
    const { id } = await params;

    // In a real app, we'd fetch the post details and verify ownership
    const ownerId = "1"; // Assuming current logged in user is owner

    return (
        <div className="min-h-screen bg-dark text-white font-sans">
            <Header />
            {/* MANAGEMENT HERO SECTION */}
            <section className="relative h-[65vh] w-full overflow-hidden">
                <Image
                    src="/images/reunite.jpeg"
                    alt="Missing person"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-16">
                    <div className="animate-fadeInUp">
                        <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                            <div className="flex items-center gap-3">
                                <span className="bg-secondary/20 text-secondary border border-secondary/30 px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                    <Settings size={14} className="animate-spin-slow" />
                                    Management Mode
                                </span>
                                <span className="bg-white/5 backdrop-blur-md text-white/50 border border-white/10 px-4 py-1.5 rounded-xl text-xs font-medium">
                                    Case ID: {id}
                                </span>
                                <span className="bg-danger/10 text-danger border border-danger/20 px-4 py-1.5 rounded-xl text-xs font-bold uppercase flex items-center gap-2">
                                    Status: Missing
                                </span>
                            </div>

                            {/* MANAGEMENT ACTIONS */}
                            <div className="bg-dark/40 backdrop-blur-xl border border-white/10 p-2 rounded-2xl shadow-2xl">
                                <PostActions ownerId={ownerId} postId={id} />
                            </div>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
                            Abebe Kebede <span className="text-secondary">Tesfaye</span>
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 mt-6 text-gray-400">
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <MapPin className="w-4 h-4 text-secondary" />
                                <span className="text-sm font-medium text-white">Addis Ababa, Piazza Area</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <Calendar className="w-4 h-4 text-secondary" />
                                <span className="text-sm font-medium text-white">Reported: 12 Jan 2026</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                                <Clock className="w-4 h-4 text-secondary" />
                                <span className="text-sm font-medium text-white">2 Days Ago</span>
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
                    {/* DETAILS */}
                    <div className="bg-dark-light/20 border border-white/5 rounded-[2rem] p-10 backdrop-blur-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 -mr-32 -mt-32 rounded-full blur-3xl group-hover:bg-secondary/10 transition-all duration-700" />

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-1.5 h-8 bg-secondary rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                            <h2 className="text-3xl font-bold">Investigation Details</h2>
                        </div>

                        <div className="space-y-6 text-gray-300">
                            <p className="leading-relaxed text-xl">
                                Abebe was last seen near the <span className="text-white font-bold underline decoration-secondary/40">Piazza area</span>, specifically close to the old Post Office building, around 4:30 PM. He was wearing a distinctive <span className="text-white font-bold italic">bright blue jacket</span> with silver reflectors.
                            </p>
                            <p className="leading-relaxed text-xl">
                                He left home to run a quick errand and hasn't been heard from since. His phone has been switched off from 6:00 PM on the same day. He is approximately 175cm tall with a slim build.
                            </p>
                        </div>
                    </div>

                    {/* MEDIA GALLERY */}
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                                <div className="w-1.5 h-8 bg-secondary rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                                <h2 className="text-3xl font-bold">Evidence & Photos</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            <ImageBox />
                            <ImageBox />
                            <ImageBox />
                            <VideoBox />
                        </div>
                    </div>
                </div>

                {/* MANAGEMENT SIDEBAR */}
                <aside className="space-y-8">
                    <div className="sticky top-24 space-y-8">
                        {/* CASE STATUS CARD */}
                        <div className="bg-dark-light border border-white/5 rounded-3xl p-8 relative overflow-hidden shadow-2xl group">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-secondary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <AlertCircle size={16} className="text-secondary" />
                                Case Controls
                            </h3>

                            <div className="space-y-4">
                                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                                    You are the reporter for this case. Use these tools to update information or close the investigation.
                                </p>

                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group-hover:border-secondary/20 transition-all">
                                    <span className="text-xs font-bold text-gray-400">Total Sightings</span>
                                    <span className="text-lg font-black text-secondary">0</span>
                                </div>

                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-between group-hover:border-secondary/20 transition-all">
                                    <span className="text-xs font-bold text-gray-400">Visibility</span>
                                    <span className="text-xs font-black text-green-400 uppercase tracking-widest">Public</span>
                                </div>
                            </div>

                            <button className="w-full bg-white text-dark py-4 rounded-2xl font-black mt-8 hover:bg-gray-200 transition-all shadow-xl hover:-translate-y-1">
                                View Public Version
                            </button>
                        </div>

                        {/* QUICK HELP */}
                        <div className="bg-secondary/5 border border-secondary/10 rounded-3xl p-8">
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                                <ShieldCheck size={18} className="text-secondary" />
                                Reporter Guidelines
                            </h4>
                            <ul className="text-xs text-gray-400 space-y-3 list-disc pl-4 leading-relaxed">
                                <li>Keep the story updated with new findings.</li>
                                <li>Mark as found immediately if reunited.</li>
                                <li>Do not share private details in public view.</li>
                            </ul>
                        </div>
                    </div>
                </aside>

            </main>
        </div>
    );
};

export default ManagementPage;
