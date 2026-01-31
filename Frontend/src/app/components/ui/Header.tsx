import React from "react";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold text-dark">
            FIND
          </div>
          <span className="text-white font-semibold text-lg">
            Missing Finder
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-white">
          <a href="/" className="hover:text-secondary transition">Home</a>
          <a href="/missing" className="hover:text-secondary transition">Missing</a>
          <a href="/found" className="hover:text-secondary transition">Found</a>
          <a href="/about" className="hover:text-secondary transition">About</a>
        </nav>

        {/* CTA + Mobile */}
        <div className="flex items-center gap-4">
          <button className="hidden md:block bg-secondary text-dark px-5 py-2 rounded-lg font-medium hover:opacity-90 transition">
            Report Missing
          </button>

          <Menu className="md:hidden text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
