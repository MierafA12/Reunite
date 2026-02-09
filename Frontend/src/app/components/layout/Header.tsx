"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Menu,
  X,
  Home,
  Users,
  Newspaper,
  Info,
  LayoutDashboard,
  LogOut,
  FilePlus,
  LogIn
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Button from "../ui/Button";
import { useAuth } from "@/app/context/AuthContext";
import clsx from "clsx";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Missing", path: "/missing", icon: <Users size={18} /> },
    { name: "News", path: "/news", icon: <Newspaper size={18} /> },
    { name: "About", path: "/about", icon: <Info size={18} /> },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-300",
          isScrolled
            ? "bg-dark/80 backdrop-blur-lg border-b border-white/10 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 md:w-14 md:h-14 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/1.png"
                alt="Lost People Finder Logo"
                fill
                className="rounded-full object-cover border-2 border-secondary/20 shadow-lg shadow-secondary/10"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg md:text-xl tracking-tight leading-none">
                Reunite
              </span>
              <span className="text-secondary text-[10px] uppercase tracking-[0.2em] font-medium mt-1">
                People Finder
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-white/90">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 hover:text-secondary",
                  pathname === link.path ? "bg-white/10 text-secondary" : "hover:bg-white/5"
                )}
              >
                <span className={clsx("transition-transform duration-300", pathname === link.path && "scale-110")}>
                  {link.icon}
                </span>
                <span className="text-sm font-semibold">{link.name}</span>
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {!isLoggedIn && (
              <div className="hidden lg:block">
                <Button
                  href="/auth/login?callbackUrl=/dashboard/user/report"
                  variant="secondary"
                  className="rounded-full shadow-lg shadow-secondary/20 hover:shadow-secondary/40 !py-2 !px-6"
                >
                  <FilePlus size={18} className="mr-2" />
                  Report Missing
                </Button>
              </div>
            )}

            {isLoggedIn ? (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  href="/dashboard/user"
                  className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/80 hover:text-white"
                  title="Dashboard"
                >
                  <LayoutDashboard size={22} />
                </Link>
                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="p-2 hover:bg-danger/10 rounded-full transition-all text-white/80 hover:text-danger"
                  title="Logout"
                >
                  <LogOut size={22} />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="hidden lg:flex items-center gap-2 text-white hover:text-secondary transition-colors px-4 py-2 font-semibold text-sm"
              >
                <LogIn size={18} />
                Sign In
              </Link>
            )}

            {/* Mobile Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Unique Mobile Menu Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-[90] lg:hidden transition-all duration-500 ease-in-out",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop (Primary Tinted Blur) */}
        <div
          className="absolute inset-0 bg-primary/10 backdrop-blur-[2px] transition-all duration-500"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={clsx(
            "absolute inset-y-0 right-0 w-[85%] max-w-sm bg-dark border-l border-white/10 p-8 pt-24 flex flex-col transition-transform duration-500 ease-out shadow-2xl shadow-black",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
              <span className="text-white font-bold text-2xl tracking-tight">
                Menu
              </span>
              <div className="h-1 w-12 bg-secondary rounded-full mt-2" />
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.path}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={clsx(
                  "flex items-center gap-4 px-6 py-4 rounded-2xl text-lg font-bold transition-all duration-300",
                  pathname === link.path
                    ? "bg-secondary text-dark shadow-lg shadow-secondary/20"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                )}
              >
                <span className={clsx(pathname === link.path ? "text-dark" : "text-secondary")}>
                  {link.icon}
                </span>
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto space-y-4">
            <div className="h-px w-full bg-white/5 my-8" />

            {!isLoggedIn && (
              <Link
                href="/auth/login?callbackUrl=/dashboard/user/report"
                className="flex items-center justify-center gap-3 w-full bg-secondary text-dark py-4 rounded-2xl font-bold text-lg shadow-lg shadow-secondary/10"
              >
                <FilePlus size={22} />
                Report Missing
              </Link>
            )}

            {isLoggedIn ? (
              <>
                <Link
                  href="/dashboard/user"
                  className="flex items-center gap-4 w-full px-6 py-4 border border-white/10 rounded-2xl text-white font-semibold hover:bg-white/5"
                >
                  <LayoutDashboard size={20} className="text-secondary" />
                  User Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    router.push("/");
                  }}
                  className="flex items-center gap-4 w-full px-6 py-4 border border-danger/30 rounded-2xl text-danger font-semibold hover:bg-danger/5"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-4 w-full px-6 py-4 border border-white/20 rounded-2xl text-white font-semibold hover:bg-white/5"
              >
                <LogIn size={20} className="text-secondary" />
                Sign In to Account
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
