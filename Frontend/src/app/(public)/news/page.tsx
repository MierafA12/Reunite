import Image from "next/image";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/footer";
import { Calendar, Clock, ArrowRight, BookOpen, Share2, Heart } from "lucide-react";
import Link from "next/link";

const blogPosts = [
  {
    id: "success-1",
    category: "Success Story",
    title: "Reunited After 3 Years: The Power of Community Verified Reports",
    excerpt: "Abel was just 19 when he went missing in Addis Ababa. After three long years, a simple tip on our platform brought him home.",
    date: "Feb 02, 2026",
    readTime: "5 min read",
    image: "/images/reunite.jpeg",
    author: "Community Team",
    featured: true
  },
  {
    id: "safety-1",
    category: "Safety Tips",
    title: "Essential Steps to Take When a Loved One Goes Missing",
    excerpt: "The first 48 hours are critical. Learn the precise steps to take, from filing a police report to using digital platforms effectively.",
    date: "Jan 28, 2026",
    readTime: "8 min read",
    image: "/images/reunite-s.jpg",
    author: "Safety Expert"
  },
  {
    id: "success-2",
    category: "Success Story",
    title: "A 48-Hour Miracle: How Rapid Reporting Saved a Child in Adama",
    excerpt: "Speed is everything. Within minutes of the report, volunteers in Adama were on the lookout. By sunset, the child was safe.",
    date: "Jan 15, 2026",
    readTime: "4 min read",
    image: "/images/reunite.jpeg",
    author: "Reunite Team"
  },
  {
    id: "news-1",
    category: "Community News",
    title: "Reunite Platform Expands to 5 More Regions in Ethiopia",
    excerpt: "Our mission to facilitate reunions continues. We are proud to announce our new partnerships with local authorities across Oromia.",
    date: "Jan 10, 2026",
    readTime: "3 min read",
    image: "/images/reunite-s.jpg",
    author: "Admin"
  },
  {
    id: "success-3",
    category: "Success Story",
    title: "Elderly Man Found via Platform Face-Detection Feature",
    excerpt: "Our new AI tools are showing real-world results. A concerned citizen's photo was matched against our database within seconds.",
    date: "Jan 05, 2026",
    readTime: "6 min read",
    image: "/images/reunite.jpeg",
    author: "Tech Team"
  },
];

const NewsPage = () => {
  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <div className="bg-dark text-white min-h-screen font-sans">
      <Header />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">News & <span className="text-secondary">Updates</span></h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Stay informed about successful reunions, safety protocols, and how we're leveraging technology to bring families back together.
            </p>
          </div>

          <div className="flex gap-4">
            {["All", "Success Stories", "Safety", "News"].map((cat) => (
              <button key={cat} className="px-6 py-2.5 rounded-full border border-white/5 bg-white/5 text-sm font-bold hover:bg-secondary hover:text-white transition-all">
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FEATURED POST */}
        {featuredPost && (
          <div className="relative group rounded-[40px] overflow-hidden border border-white/5 bg-dark-light/20 mb-16 transition-all hover:border-secondary/30">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-[400px] lg:h-auto overflow-hidden">
                <Image
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-dark/60 lg:from-transparent to-transparent" />
              </div>

              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-secondary/20 text-secondary px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-secondary/20">
                    {featuredPost.category}
                  </span>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <Calendar size={14} />
                    {featuredPost.date}
                  </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight group-hover:text-secondary transition-colors">
                  {featuredPost.title}
                </h2>

                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <Link href={`/news/${featuredPost.id}`} className="bg-white text-dark px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-gray-200 transition-all">
                    Read Full Story
                    <ArrowRight size={18} />
                  </Link>
                  <div className="flex gap-4">
                    <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all">
                      <Heart size={18} className="text-gray-400" />
                    </button>
                    <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all">
                      <Share2 size={18} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* POSTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {regularPosts.map((post) => (
            <Link key={post.id} href={`/news/${post.id}`} className="group">
              <div className="relative h-64 rounded-[30px] overflow-hidden mb-6 border border-white/5">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-dark/60 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <div className="flex items-center gap-1">
                  <Calendar size={12} className="text-secondary" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} className="text-secondary" />
                  {post.readTime}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 leading-tight group-hover:text-secondary transition-colors">
                {post.title}
              </h3>

              <p className="text-gray-500 line-clamp-2 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                Read More
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* NEWSLETTER */}
        <section className="mt-32 rounded-[40px] bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20 p-10 lg:p-20 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <BookOpen className="text-secondary w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay Connected</h2>
            <p className="text-gray-400 text-lg mb-10">
              Get the latest success stories and safety updates delivered straight to your inbox. Join our community of over 5,000 active volunteers.
            </p>

            <form className="flex flex-col sm:flex-row gap-4">
              <input
                placeholder="Enter your email address"
                className="flex-1 bg-dark-light border border-white/5 rounded-2xl px-8 py-5 outline-none focus:border-secondary transition-all"
              />
              <button className="bg-secondary text-white px-10 py-5 rounded-2xl font-bold hover:shadow-[0_0_30px_rgba(79,70,229,0.3)] transition-all">
                Subscribe Weekly
              </button>
            </form>
            <p className="text-xs text-gray-600 mt-6 italic">We respect your privacy. Unsubscribe at any time.</p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;
