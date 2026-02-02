import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/images/1.png";

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
  brandName = "YourBrand",
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
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src={Logo}
            alt={`${brandName} logo`}
            width={40}
            height={40}
          />
          <span className="font-bold text-xl">{brandName}</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="hover:text-yellow-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks.map((link) =>
            link.external ? (
              <a
                key={link.name}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                href={link.path}
                className="hover:text-yellow-400 transition-colors"
              >
                {link.name}
              </Link>
            )
          )}
        </div>
      </div>

      <div className="text-center mt-6 text-sm text-gray-400">
        © {new Date().getFullYear()} {brandName}. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
