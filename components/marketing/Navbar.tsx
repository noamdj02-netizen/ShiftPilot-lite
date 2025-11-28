"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-bg border-b border-[rgba(12,16,51,0.04)] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-semibold text-text-main text-lg">ShiftPilot</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-text-muted hover:text-text-main transition-colors text-sm font-medium"
            >
              Accueil
            </Link>
            <Link
              href="/features"
              className="text-text-muted hover:text-text-main transition-colors text-sm font-medium"
            >
              Fonctionnalités
            </Link>
            <Link
              href="/pricing"
              className="text-text-muted hover:text-text-main transition-colors text-sm font-medium"
            >
              Tarifs
            </Link>
            <Link
              href="#resources"
              className="text-text-muted hover:text-text-main transition-colors text-sm font-medium"
            >
              Ressources
            </Link>
            <Link
              href="#contact"
              className="text-text-muted hover:text-text-main transition-colors text-sm font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/login"
              className="text-text-muted hover:text-text-main transition-colors text-sm font-medium"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="bg-navy text-white px-6 py-2.5 rounded-full font-medium text-sm hover:bg-opacity-90 transition-all hover:scale-105"
            >
              Essai gratuit
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-text-main"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              href="/"
              className="block text-text-muted hover:text-text-main transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link
              href="/features"
              className="block text-text-muted hover:text-text-main transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Fonctionnalités
            </Link>
            <Link
              href="/pricing"
              className="block text-text-muted hover:text-text-main transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tarifs
            </Link>
            <Link
              href="#resources"
              className="block text-text-muted hover:text-text-main transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Ressources
            </Link>
            <Link
              href="#contact"
              className="block text-text-muted hover:text-text-main transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4 space-y-2 border-t border-border">
              <Link
                href="/login"
                className="block text-text-muted hover:text-text-main transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Connexion
              </Link>
              <Link
                href="/register"
                className="block bg-navy text-white px-6 py-2.5 rounded-full font-medium text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Essai gratuit
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

