"use client";

import React from "react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/footer";
import { ShieldCheck, Lock, Heart, ArrowRight, Zap } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Button from "@/app/components/ui/Button";

export default function ProvideInfoLanding() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");

    const getLoginHref = () => callbackUrl ? `/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/auth/login";
    const getRegisterHref = () => callbackUrl ? `/auth/register?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/auth/register";

    return (
        <div className="min-h-screen bg-dark text-white font-sans">
            <Header />

            <main className="max-w-7xl mx-auto px-6 pt-40 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="animate-fadeInLeft">
                        <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-4 block">Help Reunite a Family</span>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
                            Your Information <br />
                            <span className="text-secondary">Changes Lives.</span>
                        </h1>
                        <p className="text-gray-400 text-xl leading-relaxed mb-10 max-w-xl">
                            Providing a tip about a missing person is a heroic act. We ensure your safety and privacy through end-to-end encryption and anonymous reporting options.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Button href={getLoginHref()} variant="secondary" className="px-10 py-5 rounded-2xl font-bold shadow-2xl shadow-secondary/20 hover:scale-105 transition-all text-lg flex items-center gap-3">
                                Sign In to Provide Tip <ArrowRight />
                            </Button>
                            <Button href={getRegisterHref()} variant="outline" className="px-10 py-5 rounded-2xl font-bold border-white/10 hover:bg-white/5 transition-all text-lg">
                                Create Anonymous Account
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fadeInRight">
                        <FeatureCard
                            icon={Lock}
                            title="100% Secure"
                            desc="All messages are encrypted. Only the verified family/reporter can view your tip."
                        />
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Identity Protection"
                            desc="You can choose to remain anonymous or use a verified profile for extra trust."
                        />
                        <FeatureCard
                            icon={Zap}
                            title="Instant Alerts"
                            desc="Your tip is sent instantly to the reporter's dashboard with real-time notifications."
                        />
                        <FeatureCard
                            icon={Heart}
                            title="Direct Impact"
                            desc="Every detail, no matter how small, could be the missing piece of the puzzle."
                        />
                    </div>
                </div>

                {/* HOW IT WORKS */}
                <section className="mt-40 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-16">How Secure Reporting Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <Step index="1" title="Locate Case" desc="Find the specific missing person report you have information about." />
                        <Step index="2" title="Compose Message" desc="Provide details, locations, or even upload photos secretly." />
                        <Step index="3" title="Encryption" desc="Our system encrypts the data before it even leaves your device." />
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="bg-dark-light/50 border border-white/5 p-8 rounded-3xl hover:border-secondary/30 transition-all group hover:bg-dark-light/80">
        <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Icon className="text-secondary" size={28} />
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
    </div>
);

const Step = ({ index, title, desc }: { index: string, title: string, desc: string }) => (
    <div className="relative p-8">
        <div className="text-9xl font-black text-white/5 absolute top-0 left-1/2 -translate-x-1/2 -z-0 select-none">
            {index}
        </div>
        <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">{title}</h3>
            <p className="text-gray-400">{desc}</p>
        </div>
    </div>
);
