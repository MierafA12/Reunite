import Header from "@/app/components/layout/Header";
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
    <div className="min-h-screen bg-white text-dark">
      <Header />

      <div className="pt-32 max-w-7xl mx-auto px-6">

        {/* Page Header */}
        <h1 className="text-4xl md:text-5xl font-bold">
          Our <span className="text-secondary">Services</span>
        </h1>

        <p className="mt-6 text-gray-600 max-w-3xl text-lg">
          We provide secure, ethical, and community-driven tools designed to help
          families locate missing loved ones and reconnect safely.
        </p>

        {/* Services Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

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
