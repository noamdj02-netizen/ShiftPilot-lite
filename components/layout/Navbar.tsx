"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { DarkModeToggle } from "@/components/ui/DarkModeToggle";
import { Logo } from "@/components/ui/Logo";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Vue d'ensemble" },
    { href: "/#fonctionnalites", label: "Fonctionnalités" },
    { href: "/entreprise", label: "Entreprise" },
    { href: "/#tarifs", label: "Tarifs" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        setIsMobileMenuOpen(false);
      }
    } else {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`
        relative w-full max-w-4xl mx-auto
        rounded-2xl px-4 sm:px-6 py-3
        flex items-center justify-between
        transition-all duration-300
        bg-black/40 dark:bg-black/60 backdrop-blur-xl border border-white/10 shadow-lg
      `}
    >
      {/* Left section - Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <Logo size={20} />
        <span className="font-semibold text-white text-base sm:text-lg">
          ShiftPilot
        </span>
      </div>

      {/* Center section - Nav links (Desktop) */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className={`
              text-sm font-medium transition-colors
              ${
                isActive(link.href)
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              }
            `}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right section - Actions */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Dark mode toggle */}
        <div className="p-2 rounded-xl transition-all bg-white/10 hover:bg-white/20 border border-white/10">
          <DarkModeToggle />
        </div>

        {/* Login button */}
        <Link
          href="/login"
          className="hidden sm:block px-4 py-2 rounded-xl text-sm font-medium transition-all bg-white text-black hover:bg-white/90 font-semibold"
        >
          Connexion
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-xl transition-all bg-white/10 hover:bg-white/20 border border-white/10"
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5 text-white" />
          ) : (
            <Menu className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden backdrop-blur-xl border bg-black/60 border-white/10 shadow-lg"
        >
          <div className="px-2 py-1 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`
                  block text-sm font-medium transition-colors px-4 py-2 rounded-lg
                  ${
                    isActive(link.href)
                      ? "text-white bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-white/10">
              <Link
                href="/login"
                className="block w-full text-center px-4 py-2 rounded-xl text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
              >
                Connexion
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
