import React from "react";
import Header from "../components/ui/Header";
import heroImage from "../../../public/images/reunite.jpeg";
import StatCard from "../components/ui/StateCard";

const Home: React.FC = () => {
    return (
        <div className="relative min-h-screen">

            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    src={heroImage.src}
                    alt="Community"
                    className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-dark/70" />
            </div>

            {/* Header */}
            <Header />

            {/* Content */}
            <div className="relative z-10 flex items-center min-h-screen">
                <div className="max-w-7xl mx-auto px-6 text-white w-full">

                    <h1 className="text-4xl md:text-6xl font-bold max-w-3xl">
                        Helping Families <span className="text-secondary">Find</span>
                        <br /> Their Missing Loved Ones
                    </h1>

                    <p className="mt-6 text-lg text-gray-200 max-w-2xl">
                        A community-driven platform to report missing people, share
                        information, and reunite families.
                    </p>

                    {/* Buttons */}
                    <div className="mt-8 flex flex-wrap gap-4">
                        <button className="bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                            Report Missing Person
                        </button>

                        <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-dark transition">
                            View Missing List
                        </button>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
                        <StatCard title="1,200+" subtitle="Cases Reported" />
                        <StatCard title="680+" subtitle="People Found" />
                        <StatCard title="50+" subtitle="Communities" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Home;
