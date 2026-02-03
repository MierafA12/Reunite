import Header from "@/app/components/layout/Header";
import aboutHero from "@/../public/images/reunite.jpeg";

const AboutPage: React.FC = () => {
  return (
    <div className="w-full">

      {/* ===== HERO SECTION ===== */}
      <section className="relative h-[70vh] flex items-center justify-center">
        <img
          src={aboutHero.src}
          alt="Reuniting families"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/70 backdrop-blur-sm" />

        <Header />

        <div className="relative z-10 max-w-4xl px-6 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold">
            About <span className="text-secondary">Lost People Finder</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            A trusted, community-powered platform built to reunite families
            with their missing loved ones — with dignity, care, and technology.
          </p>
        </div>
      </section>

      {/* ===== HISTORY SECTION (LIGHT) ===== */}
      <section className="bg-white text-dark py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          <div>
            <h2 className="text-3xl font-bold mb-6">
              Our <span className="text-secondary">Story</span>
            </h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              Lost People Finder was created in response to a painful reality:
              missing persons cases are often shared in scattered social media
              posts, easily lost, unverified, and difficult to track.
            </p>

            <p className="text-gray-700 leading-relaxed">
              We envisioned a single, secure digital space where families,
              communities, and organizations could collaborate responsibly
              to increase visibility and improve the chances of reunion.
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src={aboutHero.src}
              alt="Community support"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      {/* ===== MISSION & VISION (DARK) ===== */}
      <section className="bg-dark text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">

          <div>
            <h3 className="text-2xl font-semibold text-secondary mb-4">
              Our Mission
            </h3>
            <p className="text-gray-300 leading-relaxed">
              To provide a safe, verified, and ethical platform that helps
              families report missing persons, share accurate information,
              and reconnect with loved ones through community collaboration
              and responsible technology.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-secondary mb-4">
              Our Vision
            </h3>
            <p className="text-gray-300 leading-relaxed">
              A world where no missing person is forgotten, and every family
              has access to tools, support, and hope during their most
              difficult moments.
            </p>
          </div>

        </div>
      </section>

      {/* ===== CORE VALUES (LIGHT) ===== */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Our <span className="text-secondary">Core Values</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h4 className="font-semibold text-lg mb-3">Trust & Safety</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                We prioritize verification, moderation, and data protection
                to ensure families are safe from misinformation and abuse.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h4 className="font-semibold text-lg mb-3">Community First</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Communities play a powerful role in reunions. We empower
                people to help responsibly and compassionately.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border">
              <h4 className="font-semibold text-lg mb-3">Respect & Dignity</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Every missing person is treated with humanity and respect.
                This platform is not for exploitation or public shaming.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===== CTA SECTION (DARK) ===== */}
      <section className="bg-dark text-white py-24 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Together, We Can <span className="text-secondary">Bring Hope</span>
          </h2>

          <p className="mt-6 text-gray-300">
            Whether you are reporting, searching, or sharing information,
            your action can help reunite a family.
          </p>

          <button className="mt-10 bg-secondary text-dark px-10 py-3 rounded-lg font-semibold hover:opacity-90 transition">
            Get Involved
          </button>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
