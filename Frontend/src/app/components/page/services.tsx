import ServiceCard from "@/app/components/ui/servicesCard";
import {
  Search,
  Bell,
  ShieldCheck,
  Users,
  MessageCircle,
  HeartHandshake,
} from "lucide-react";

const ServicesPage: React.FC = () => {
  return (
    <div id="services" className="bg-white text-dark py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Our Services
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            How We <span className="text-secondary">Help</span> Families
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl text-lg md:text-xl leading-relaxed">
            We provide secure, ethical, and community-driven tools designed to help
            families locate missing loved ones and reconnect safely.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          <ServiceCard
            icon={<Search size={36} />}
            title="Missing Person Reporting"
            description="Create detailed missing person reports with photos, videos, last seen locations, and contact details to improve visibility and search accuracy."
          />

          <ServiceCard
            icon={<Bell size={36} />}
            title="Smart Notifications"
            description="Receive instant alerts when someone comments, shares a sighting, or when a possible match is detected by the system."
          />

          <ServiceCard
            icon={<ShieldCheck size={36} />}
            title="Verified & Safe Platform"
            description="All posts go through moderation. Phone verification, trust scores, and reporting tools help prevent fake or harmful content."
          />

          <ServiceCard
            icon={<Users size={36} />}
            title="Community Collaboration"
            description="Empower communities to share verified information responsibly while respecting privacy and dignity."
          />

          <ServiceCard
            icon={<MessageCircle size={36} />}
            title="Secure In-App Chat"
            description="Communicate safely with other users through private, moderated chat without exposing personal contact details."
          />

          <ServiceCard
            icon={<HeartHandshake size={36} />}
            title="Reunion & Support"
            description="Celebrate successful reunions and share inspiring stories that bring hope and encourage community participation."
          />

        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
