import Image from "next/image";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/footer";
import aboutHero from "@/../public/images/reunite.jpeg";
import { ShieldCheck, Heart, Users, Globe, Eye, Zap, Target, ArrowRight } from "lucide-react";
import Button from "@/app/components/ui/Button";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-dark font-sans selection:bg-secondary/10">
      <Header />

      {/* ===== PREMIUM HERO ===== */}
      <section className="relative h-[65vh] w-full flex items-center justify-center overflow-hidden bg-dark">
        <Image
          src="/images/reunite.jpeg"
          alt="Reunite Hero"
          fill
          className="object-cover opacity-40 grayscale-[20%]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-transparent to-dark" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center animate-fadeIn">
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-widest uppercase mb-4 opacity-10 absolute -top-12 left-1/2 -translate-x-1/2 w-full select-none">
            Reunite
          </h1>
          <h2 className="text-4xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
            Hope is a <span className="text-secondary">Community</span> <br /> Effort.
          </h2>
          <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            We are a technology-driven movement dedicated to bridging the gap between missing persons and their families.
          </p>
        </div>
      </section>

      {/* ===== STORY SECTION (WHITE/EDITORIAL) ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-20 items-start">
            <div>
              <div className="inline-flex items-center gap-2 mb-8">
                <span className="w-12 h-px bg-secondary" />
                <span className="text-secondary font-bold uppercase tracking-[0.2em] text-xs">Our Genesis</span>
              </div>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-none">
                Why we built <br /><span className="text-gray-400">Reunite.</span>
              </h3>
              <div className="space-y-8 text-lg text-gray-600 leading-relaxed max-w-2xl">
                <p className="first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:text-secondary">
                  The idea for Reunite emerged from a simple observation: time is the most critical asset in a missing person case, yet it is often wasted in the chaos of unverified social media clusters. Fragmented information leads to dead ends.
                </p>
                <p>
                  We realized that families needed more than just a place to post a photo. They needed a <span className="text-dark font-bold">verified ecosystem</span>, a direct line to authorities, and a compassionate community that knows how to help without causing harm.
                </p>
                <p>
                  Reunite is the culmination of tech-for-good. We’ve built tools that help organize searches, verify sightings using machine learning, and keep the spotlight on cases that might otherwise be forgotten.
                </p>
              </div>
            </div>

            <div className="sticky top-24">
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl skew-y-1 hover:skew-y-0 transition-transform duration-700">
                <Image src="/images/reunite.jpeg" alt="Story" fill className="object-cover" />
                <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="mt-8 bg-dark p-10 rounded-[2rem] text-white">
                <h4 className="text-2xl font-bold mb-4">Our Vision</h4>
                <p className="text-gray-400 text-sm leading-relaxed">
                  "To create a world where no person is truly lost, and every family has the resources to bring their loved ones home safely."
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Target className="w-6 h-6 text-secondary" />
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-secondary">Verified Impact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CORE VALUES (DARK GRID) ===== */}
      <section className="py-24 bg-dark text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-4">The Pillars of <span className="text-secondary italic">Trust</span></h2>
            <p className="text-gray-500 max-w-xl mx-auto">Our operating principles are designed to protect both the families and the integrity of the data.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Verification", desc: "Every report undergoes a multi-step verification process to ensure accuracy.", icon: ShieldCheck },
              { title: "Privacy", desc: "Advanced shielding for sensitive contact data to prevent exploitation.", icon: Eye },
              { title: "Global Reach", desc: "Our network connects local communities with regional authorities instantly.", icon: Globe },
              { title: "Compassion", desc: "Every pixel we design starts with a 'human-first' perspective.", icon: Heart },
            ].map((val, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-dark-light/50 border border-white/5 hover:border-secondary/30 transition-all duration-500">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:rotate-6 transition-all">
                  <val.icon className="w-6 h-6 text-secondary group-hover:text-dark transition-colors" />
                </div>
                <h4 className="text-xl font-bold mb-3">{val.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 blur-[120px] rounded-full" />
      </section>

      {/* ===== STATISTICS SECTION ===== */}
      <section className="py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Families Helped", value: "2,400+" },
              { label: "Partner Agencies", value: "85+" },
              { label: "Community Scouts", value: "15k+" },
              { label: "Success Rate", value: "72%" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-5xl font-black text-dark mb-2">{stat.value}</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-32 bg-white flex flex-col items-center">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-secondary/10 text-secondary px-6 py-2 rounded-full inline-block font-bold text-sm mb-8">
            Join the Movement
          </div>
          <h2 className="text-5xl md:text-8xl font-black tracking-tight mb-10 leading-[0.9]">
            Together, We <br /> <span className="text-secondary">Reunite.</span>
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-2xl mx-auto">
            Whether you're a developer, a community leader, or someone who cares, there's a place for you in this mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button variant="secondary" className="px-12 py-5 text-xl rounded-2xl group shadow-2xl shadow-secondary/30">
              Partner With Us <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="px-12 py-5 text-xl rounded-2xl border-dark text-dark hover:bg-dark hover:text-white transition-all">
              Donate Now
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
