"use client";

import Header from "@/app/components/layout/Header";

import Footer from "@/app/components/layout/footer";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Search, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { reportApi } from "@/app/lib/api";

export default function MissingPage() {
    const [reports, setReports] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await reportApi.getPublicReports();
                setReports(response.data || response || []);
            } catch (error) {
                console.error("Failed to fetch public reports:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchReports();
    }, []);

    const filteredReports = reports.filter(person => {
        const fullName = [person.first_name, person.middle_name, person.last_name].filter(Boolean).join(" ").toLowerCase();
        return fullName.includes(searchTerm.toLowerCase()) || 
               person.last_seen_location.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return (
        <div className="min-h-screen bg-dark text-white">
            <Header />

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                {/* HEADER & SEARCH */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">
                            Missing <span className="text-secondary">Persons</span>
                        </h1>
                        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
                            Search through reported cases and help us bring loved ones home. Every bit of information counts toward a successful reunion.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
                        <div className="relative flex-1 lg:w-96 shadow-2xl">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-secondary" size={20} />
                            <input
                                placeholder="Search name or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-secondary transition-all text-white placeholder:text-gray-500"
                            />
                        </div>

                        <button className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-secondary hover:text-dark hover:border-secondary transition-all group shadow-xl">
                            <Filter className="text-secondary group-hover:text-dark transition-colors" size={22} />
                            <span className="sm:hidden font-bold">Filters</span>
                        </button>
                    </div>
                </div>

                {/* LIST GRID */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-40 bg-dark-light/10 rounded-[3rem] border border-white/5">
                        <div className="animate-spin w-12 h-12 border-4 border-secondary border-t-transparent rounded-full mb-6"></div>
                        <p className="text-gray-500 font-medium">Scanning for reports...</p>
                    </div>
                ) : filteredReports.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredReports.map((person) => (

                            <Link
                                key={person.id}
                                href={`/missing/${person.id}`}
                                className="group bg-dark-light/30 border border-white/5 rounded-3xl overflow-hidden hover:border-secondary/50 transition-all hover:translate-y-[-4px]"
                            >

                                <div className="relative h-64 w-full bg-dark">
                                    <img
                                        src={person.media?.[0]?.media_url || "/images/reunite.jpeg"}
                                        alt={`${person.first_name} ${person.last_name}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg ${
                                            person.status === 'pending' ? 'bg-warning' :
                                            person.status === 'approved' ? 'bg-success' :
                                            'bg-danger'
                                        }`}>
                                            {person.status.charAt(0).toUpperCase() + person.status.slice(1)}

                                        </span>
                                    </div>
                                    {person.offer_reward && (
                                        <div className="absolute bottom-4 right-4">
                                            <div className="bg-green-500/20 backdrop-blur-md text-green-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-xl border border-green-500/30 flex items-center gap-1.5 shadow-lg">
                                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                                                Reward: {person.reward_amount}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors">
                                        {[person.first_name, person.middle_name, person.last_name].filter(Boolean).join(" ")}
                                    </h3>

                                    <div className="space-y-2 text-sm text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <MapPin size={14} className="text-secondary" />
                                            <span>{person.last_seen_location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-secondary" />
                                            <span>Seen: {new Date(person.last_seen_date).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                        <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Age: {person.age || 'N/A'}</span>
                                        <span className="text-secondary text-sm font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">Details →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-dark-light/10 rounded-[3rem] border border-white/5">
                        <Search className="w-16 h-16 text-gray-700 mx-auto mb-6" />
                        <h2 className="text-3xl font-bold mb-4">No active reports found</h2>
                        <p className="text-gray-500 max-w-md mx-auto">Try adjusting your search or check back later. Every community member helps in the search.</p>
                    </div>
                )}

                {/* PAGINATION OR LOAD MORE */}
                <div className="mt-20 text-center">
                    <button className="border border-white/10 px-10 py-4 rounded-2xl font-bold hover:bg-white/5 transition-all">
                        Load More Results
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
