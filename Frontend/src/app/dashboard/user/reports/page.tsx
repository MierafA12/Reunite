"use client";

import Header from "@/app/components/layout/Header";
import Link from "next/link";
import { FileText, MapPin, Calendar, ArrowLeft, Search, Filter } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import Button from "@/app/components/ui/Button";
import { reportApi } from "@/app/lib/api";
import { useEffect, useState } from "react";

export default function UserReportsPage() {
    const { user } = useAuth();
    const [reports, setReports] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const result = await reportApi.getUserReports();
                
                if (result && Array.isArray(result.data)) {
                    setReports(result.data);
                } else if (Array.isArray(result)) {
                    setReports(result);
                } else {
                    setReports([]);
                }
            } catch (error) {
                console.error("Failed to fetch reports:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReports();
    }, []);

    const filteredReports = reports.filter(report => {
        const fullName = [report.first_name, report.middle_name, report.last_name].filter(Boolean).join(" ").toLowerCase();
        return fullName.includes(searchTerm.toLowerCase()) || 
               report.last_seen_location.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-dark text-white">
            <Header />

            <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <Link href="/dashboard/user" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 group text-sm">
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            Back to Dashboard
                        </Link>
                        <h1 className="text-4xl font-bold">Manage <span className="text-secondary">Reports</span></h1>
                        <p className="text-gray-400 mt-2">View and update all your submitted missing person cases.</p>
                    </div>
                    <Button href="/dashboard/user/report" variant="secondary" className="px-6 py-3 rounded-xl font-bold shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all">
                        + New Report
                    </Button>
                </div>

                {/* Search and Filters */}
                <div className="bg-dark-light/30 border border-white/5 rounded-3xl p-6 mb-8 flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative flex-grow w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                        <input 
                            type="text" 
                            placeholder="Search by name or location..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-dark border border-white/10 rounded-2xl pl-12 pr-6 py-3 outline-none focus:border-secondary transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all font-medium text-gray-300 w-full md:w-auto justify-center">
                        <Filter size={18} />
                        Filter
                    </button>
                </div>

                <div className="space-y-4">
                    {isLoading ? (
                        <div className="text-center py-20 bg-dark-light/30 rounded-3xl border border-white/5">
                            <div className="animate-spin w-8 h-8 border-4 border-secondary border-t-transparent rounded-full mx-auto mb-4"></div>
                            <p className="text-gray-500">Loading your reports...</p>
                        </div>
                    ) : filteredReports.length > 0 ? (
                        filteredReports.map(report => (
                            <Link
                                key={report.id}
                                href={`/dashboard/user/report/manage/${report.id}`}
                                className="block bg-dark-light/50 border border-white/5 rounded-3xl p-6 hover:border-secondary/30 transition-all group lg:p-8"
                            >
                                <div className="flex flex-wrap items-center gap-6">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                                        <img 
                                            src={report.media?.[0]?.media_url || "/images/reunite.jpeg"} 
                                            alt={`${report.first_name} ${report.last_name}`} 
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                        />
                                    </div>
                                    <div className="flex-grow">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-2xl font-bold">
                                                {[report.first_name, report.middle_name, report.last_name].filter(Boolean).join(" ")}
                                            </h3>
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                                                report.status === 'pending' ? 'bg-warning/20 text-warning border border-warning/30' : 
                                                report.status === 'approved' ? 'bg-success/20 text-success border border-success/30' :
                                                report.status === 'found' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                                'bg-danger/20 text-danger border border-danger/30'
                                            }`}>
                                                {report.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-6 text-sm text-gray-400 mt-4">
                                            <span className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-secondary" />
                                                {report.last_seen_location}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-secondary" />
                                                Last Seen: {new Date(report.last_seen_date).toLocaleDateString()}
                                            </span>
                                            <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                                                Age: {report.age} • {report.gender}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="text-secondary font-bold text-sm bg-secondary/10 px-6 py-3 rounded-xl group-hover:bg-secondary group-hover:text-white transition-all">
                                        Manage Details →
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-dark-light/30 rounded-3xl border border-white/5">
                            <FileText className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-2">No Reports Found</h3>
                            <p className="text-gray-500 max-w-xs mx-auto mb-8">
                                {searchTerm ? `We couldn't find any reports matching "${searchTerm}".` : "You haven't submitted any missing person reports yet."}
                            </p>
                            {!searchTerm && (
                                <Button href="/dashboard/user/report" variant="secondary" className="px-8 py-3 rounded-xl font-bold">
                                    Submit First Report
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
