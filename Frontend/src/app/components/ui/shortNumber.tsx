
import { PhoneCall, Users, MessageCircle } from "lucide-react";
import assistanceImage from "../../../../public/images/1212.png"; 
import Button from "./Button";

const ShortNumberPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-dark">

      <div className="relative mt-24">
        <img
          src={assistanceImage.src}
          alt="Support for reporting missing person"
          className="w-full h-96 object-cover rounded-b-3xl filter brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Call <span className="text-secondary">1212</span> for Assistance
          </h1>
          <p className="mt-4 text-gray-200 max-w-2xl">
            Can’t report online? No worries. Call our short number and our team
            will assist you in creating a missing person post quickly and securely.
          </p>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="mt-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          How It Works
        </h2>

        <p className="mt-4 text-gray-600 text-center max-w-3xl mx-auto">
          Our short-number service ensures that even if you can’t access the
          platform online, your loved ones’ information reaches the community safely.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
            <PhoneCall className="text-secondary mb-4" size={40} />
            <h3 className="font-semibold text-lg mb-2">Call Our Short Number</h3>
            <p className="text-gray-600 text-sm">
              Dial <span className="font-bold">1212</span> and reach our support team instantly.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
            <MessageCircle className="text-secondary mb-4" size={40} />
            <h3 className="font-semibold text-lg mb-2">Provide Missing Person Info</h3>
            <p className="text-gray-600 text-sm">
              Share details about your loved one — name, age, last seen location,
              photos, or any identifying information.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
            <Users className="text-secondary mb-4" size={40} />
            <h3 className="font-semibold text-lg mb-2">We Post & Connect</h3>
            <p className="text-gray-600 text-sm">
              Our team creates the missing person post on your behalf, shares it
              on our platform and social channels, and keeps you updated.
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold">
            Your Loved Ones Deserve <span className="text-secondary">Attention</span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Don’t wait. Contact us via the short number or online platform and help
            bring your loved ones back home safely.
          </p>

          <Button className="m-8 bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition">
            Call 1212 Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShortNumberPage;
