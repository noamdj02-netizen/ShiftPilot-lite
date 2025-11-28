"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Button } from "@/components/ui/Button";
import { Bell, Menu, Search } from "lucide-react";
import { useState } from "react";
import { MobileNav } from "./MobileNav";

export function Header() {
  const { user, profile, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const initials =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name[0]}${profile.last_name[0]}`
      : profile?.email?.[0]?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border dark:border-dark-border bg-card/80 dark:bg-dark-card/80 backdrop-blur-sm">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-foreground-muted dark:text-dark-foreground-muted hover:text-foreground dark:hover:text-dark-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Search bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-lg mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground-muted dark:text-dark-foreground-muted" />
            <input
              type="search"
              placeholder="Rechercher..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border dark:border-dark-border bg-background-secondary dark:bg-dark-background-secondary text-foreground dark:text-dark-foreground placeholder:text-foreground-muted dark:placeholder:text-dark-foreground-muted focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-foreground-muted dark:text-dark-foreground-muted hover:text-foreground dark:hover:text-dark-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-error"></span>
          </button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-lg p-2 hover:bg-background-secondary dark:hover:bg-dark-background-secondary transition-colors">
                <Avatar>
                  <AvatarImage src={profile?.avatar_url || undefined} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-foreground dark:text-dark-foreground">
                    {profile?.first_name && profile?.last_name
                      ? `${profile.first_name} ${profile.last_name}`
                      : profile?.email || "Utilisateur"}
                  </p>
                  <p className="text-xs text-foreground-muted dark:text-dark-foreground-muted">
                    {profile?.role === "owner"
                      ? "Propriétaire"
                      : profile?.role === "manager"
                      ? "Manager"
                      : "Employé"}
                  </p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Paramètres</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings/billing">Facturation</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={signOut} className="text-error">
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <MobileNav isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}

