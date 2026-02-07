"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import Button from "../ui/Button";
import { useAuth } from "@/app/context/AuthContext";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, logout } = useAuth();

  return (
    <header className="absolute top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/1.png"
            alt="Lost People Finder Logo"
            width={70}
            height={70}
            className="rounded-full"
          />
          <span className="text-white font-semibold text-lg">
            Lost People Finder
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-white">
          <Link href="/" className="hover:text-secondary transition">Home</Link>
          <Link href="/missing" className="hover:text-secondary transition">Missing</Link>
          <Link href="/news" className="hover:text-secondary transition">News</Link>
          <Link href="/about" className="hover:text-secondary transition">About</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Button
            href="/dashboard/user/report"
            variant="secondary"
          >
            Report Missing
          </Button>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard/user" className="hidden md:block text-white hover:text-secondary transition text-sm font-bold">Dashboard</Link>
              <Button
                variant="outline"
                onClick={logout}
                className="text-white border-white/20 hover:bg-white/10"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              href={`/auth/login?callbackUrl=${encodeURIComponent(pathname)}`}
              variant="ghost"
              className="text-white hover:text-secondary"
            >
              Sign In
            </Button>
          )}
          <Menu className="md:hidden text-white cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
