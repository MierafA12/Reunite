import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/footer";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Calendar, Search, Filter } from "lucide-react";

const missingPeople = [
    {
        id: "1",
        name: "Abebe Kebede Tesfaye",
        age: "27",
        location: "Piazza, Addis Ababa",
        date: "12 Jan 2026",
        image: "/images/reunite-s.jpg",
        status: "Missing"
    },
    {
        id: "2",
        name: "Sarah Williams",
        age: "12",
        location: "Bole, Addis Ababa",
        date: "05 Feb 2026",
        image: "/images/reunite.jpeg",
        status: "Missing"
    },
    {
        id: "3",
        name: "Mohammed Ahmed",
        age: "45",
        location: "Merkato, Addis Ababa",
        date: "30 Dec 2025",
        image: "/images/reunite-s.jpg",
        status: "Missing"
    },
    // Add more entries as needed
];

export default function MissingPage() {
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {missingPeople.map((person) => (
                        <Link
                            key={person.id}
                            href={`/missing/${person.id}`}
                            className="group bg-dark-light/30 border border-white/5 rounded-3xl overflow-hidden hover:border-secondary/50 transition-all hover:translate-y-[-4px]"
                        >
                            <div className="relative h-64 w-full">
                                <Image
                                    src={person.image}
                                    alt={person.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-danger text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                        {person.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-3 group-hover:text-secondary transition-colors">{person.name}</h3>

                                <div className="space-y-2 text-sm text-gray-400">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} className="text-secondary" />
                                        <span>{person.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-secondary" />
                                        <span>Missing since: {person.date}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Age: {person.age}</span>
                                    <span className="text-secondary text-sm font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform">Details →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

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
