"use client";

import Header from "@/app/components/layout/Header";
import StatCard from "@/app/components/ui/StateCard";
import heroImage from "@/../public/images/reunite.jpeg";
import Services from "@/app/components/page/services";
import ShortNumberPage from "@/app/components/ui/shortNumber";
import Footer from "@/app/components/layout/footer";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { useEffect, useState } from "react";
import { reportApi } from "@/app/lib/api";

const Home = () => {
    const { isLoggedIn } = useAuth();
    const [stats, setStats] = useState({
        cases_reported: 0,
        people_found: 0,
        communities: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await reportApi.getPublicStats();
                setStats(data);
            } catch (error) {
                console.error("Failed to fetch statistics:", error);
            }
        };
        fetchStats();
    }, []);

    return (
        <>
            <div className="relative min-h-screen">
                <div className="absolute inset-0">
                    <img
                        src={heroImage.src}
                        alt="Community helping to find missing people"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-dark/70" />
                </div>

                <Header />

                <div className="relative z-10 flex items-start sm:items-center min-h-screen pt-32 sm:pt-0">
                    <div className="max-w-7xl mx-auto px-6 text-white w-full">

                        <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">
                            Helping Families <span className="text-secondary">Find</span>
                            <br /> Their Missing Loved Ones
                        </h1>

                        <p className="mt-6 text-lg text-gray-200 max-w-2xl">
                            A community-driven platform to report missing people, share
                            information, and reunite families.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href={isLoggedIn ? "/dashboard/user/report" : `/auth/login?callbackUrl=${encodeURIComponent("/dashboard/user/report")}`}
                                className="bg-secondary text-dark px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
                            >
                                Report Missing Person
                            </Link>

                            <Link href="/missing" className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-dark transition">
                                View Missing List
                            </Link>
                        </div>

                        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
                            <StatCard 
                                title={`${stats.cases_reported.toLocaleString()}${stats.cases_reported > 0 ? "+" : ""}`} 
                                subtitle="Cases Reported" 
                            />
                            <StatCard 
                                title={`${stats.people_found.toLocaleString()}${stats.people_found > 0 ? "+" : ""}`} 
                                subtitle="People Found" 
                            />
                            <StatCard 
                                title={`${stats.communities.toLocaleString()}${stats.communities > 0 ? "+" : ""}`} 
                                subtitle="Communities" 
                            />
                        </div>

                    </div>
                </div>
            </div>

            <Services />
            <ShortNumberPage />
            <Footer />
        </>
    );
};

export default Home;
