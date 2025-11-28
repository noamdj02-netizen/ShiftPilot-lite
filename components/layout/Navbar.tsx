"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <span className="font-heading font-bold text-xl text-foreground">
              ShiftPilot
            </span>
            <span className="ml-2 text-sm text-muted">Lite</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#how-it-works"
              className="text-muted hover:text-foreground transition-colors"
            >
              Comment ça marche
            </Link>
            <Link
              href="#pricing"
              className="text-muted hover:text-foreground transition-colors"
            >
              Tarifs
            </Link>
            <Link
              href="#faq"
              className="text-muted hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Button
              variant="primary"
              size="sm"
              href="https://buy.stripe.com/XXXXX"
            >
              Essayer gratuitement
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted hover:text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              href="#how-it-works"
              className="block text-muted hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Comment ça marche
            </Link>
            <Link
              href="#pricing"
              className="block text-muted hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Tarifs
            </Link>
            <Link
              href="#faq"
              className="block text-muted hover:text-foreground transition-colors"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            <Button
              variant="primary"
              size="sm"
              href="https://buy.stripe.com/XXXXX"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Essayer gratuitement
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}

