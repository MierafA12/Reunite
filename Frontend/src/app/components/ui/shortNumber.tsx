import { PhoneCall, Users, MessageCircle, ArrowRight } from "lucide-react";
import assistanceImage from "../../../../public/images/1212.png";
import Button from "./Button";

const ShortNumberPage: React.FC = () => {
  return (
    <div className="bg-white text-dark py-20 overflow-hidden">

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative rounded-[2rem] overflow-hidden shadow-2xl h-[400px] md:h-[500px]">
          <img
            src={assistanceImage.src}
            alt="Support for reporting missing person"
            className="w-full h-full object-cover filter brightness-[0.4] transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
            <div className="mb-6 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <PhoneCall className="text-secondary" size={48} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
              Call <span className="text-secondary drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">1212</span> for Help
            </h2>
            <p className="text-gray-200 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">
              Available 24/7. Even without internet access, our team is here to help you report and track missing person cases immediately.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-24 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-sm font-bold uppercase tracking-wider mb-6">
          Offline Assistance
        </div>
        <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
          How the Short Number <span className="text-secondary">Works</span>
        </h3>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-16 px-4">
          Providing an easier way for everyone to report missing persons, whether you're online or offline.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            {
              icon: <PhoneCall size={32} />,
              title: "Dial 1212",
              desc: "Reach our dedicated emergency support line from any phone carrier, instantly connecting you with a trained agent."
            },
            {
              icon: <MessageCircle size={32} />,
              title: "Share Details",
              desc: "Provide the essential information: name, last seen location, and description. Our agents handle the data entry."
            },
            {
              icon: <Users size={32} />,
              title: "Immediate Action",
              desc: "Your report is instantly uploaded to our verified database and broadcasted across our community network."
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:border-secondary/20 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-secondary mb-8 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4">{item.title}</h4>
              <p className="text-gray-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="mt-24 p-12 md:p-20 bg-dark rounded-[3rem] text-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

          <div className="relative z-10 flex flex-col items-center">
            <h4 className="text-3xl md:text-5xl font-bold mb-8 text-center max-w-3xl leading-tight">
              Every Second Counts. Let's Find Them <span className="text-secondary">Together</span>.
            </h4>
            <Button className="!bg-secondary !text-dark !px-10 !py-5 !rounded-2xl !font-black !text-xl shadow-xl shadow-secondary/20 hover:scale-105 transition-transform">
              <PhoneCall className="mr-3" size={24} />
              Call 1212 Immediately
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortNumberPage;
