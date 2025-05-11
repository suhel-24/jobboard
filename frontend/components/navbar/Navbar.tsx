import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logo from "@/assets/jobbaordlogo.png";
import { CreateJobForm } from "@/components/job/CreateJobForm";

interface NavLinkProps {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}

const NavLink = ({ href, active, children }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-xl px-6 py-2 font-semibold text-[16px] transition-colors",
        active ? "bg-blue-500 text-white" : "hover:bg-white/"
      )}
    >
      {children}
    </Link>
  );
};

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  // Determine current path to highlight active link
  const isActive = (path: string): boolean => {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      return currentPath === path;
    }
    return false;
  };

  return (
    <header
      className={cn(
        "bg-white shadow-[0px_0px_20px_0px_rgba(127,127,127,0.15)] rounded-[122px] px-6 py-3 w-[890px]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <div className="relative h-12 w-12">
              <Image
                src={logo}
                alt="JobBoard Logo"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        <nav className="flex items-center gap-2 md:gap-3">
          <NavLink href="/" active={isActive("/")}>
            Home
          </NavLink>
          <NavLink href="/jobs" active={isActive("/jobs")}>
            Find Jobs
          </NavLink>
          <NavLink href="/talents" active={isActive("/talents")}>
            Find Talents
          </NavLink>
          <NavLink href="/about" active={isActive("/about")}>
            About us
          </NavLink>
          <NavLink href="/testimonials" active={isActive("/testimonials")}>
            Testimonials
          </NavLink>
        </nav>

        <div className="flex items-center gap-3 md:gap-4">
          <CreateJobForm />
        </div>
      </div>
    </header>
  );
}
