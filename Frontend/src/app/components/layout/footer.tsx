import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/images/1.png";
import { Phone, Mail } from "lucide-react";

interface LinkItem {
  name: string;
  path: string;
  external?: boolean;
}

interface FooterProps {
  brandName?: string;
  navLinks?: LinkItem[];
  socialLinks?: LinkItem[];
}

const Footer: FC<FooterProps> = ({
  brandName = "Reunite",
  navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ],
  socialLinks = [
    { name: "Facebook", path: "https://facebook.com", external: true },
    { name: "Twitter", path: "https://twitter.com", external: true },
    { name: "Instagram", path: "https://instagram.com", external: true },
  ],
}) => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Top Section */}
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Logo & Brand */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Image src={Logo} alt={`${brandName} logo`} width={90} height={90} />
            <span className="text-2xl font-bold">{brandName}</span>
          </div>
          <p className="text-gray-400 text-sm">
            Connecting people, stories, and memories — safely and respectfully.
          </p>
        </div>

        {/* Navigation Links (Vertical) */}
        <nav className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg mb-2">Quick Links</h3>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-gray-300 hover:text-yellow-400 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social Links (Separate Section) */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
          {socialLinks.map((link) =>
            link.external ? (
              <a
                key={link.name}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-yellow-400 transition"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.path}
                className="text-gray-300 hover:text-yellow-400 transition"
              >
                {link.name}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Contact Info Box (Horizontal) */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-center gap-8 text-gray-300">
          
          <div className="flex items-center gap-3">
            <Phone size={18} />
            <span>+251 9XX XXX XXX</span>
          </div>

          <div className="flex items-center gap-3">
            <Mail size={18} />
            <span>support@reunite.com</span>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 pb-4">
        © {new Date().getFullYear()} {brandName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
