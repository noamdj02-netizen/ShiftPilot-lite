"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Clock,
  Timer,
  BarChart3,
  Settings,
} from "lucide-react";

const navigationItems = [
  { name: "Tableau de bord", href: "/dashboard", icon: LayoutDashboard },
  { name: "Planning", href: "/dashboard/planning", icon: Calendar },
  { name: "Employés", href: "/dashboard/employees", icon: Users },
  { name: "Shifts", href: "/dashboard/shifts", icon: Clock },
  { name: "Pointage", href: "/dashboard/time-tracking", icon: Timer },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    badge: "PRO",
  },
  { name: "Paramètres", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:pt-16">
      <div className="flex-1 flex flex-col overflow-y-auto bg-card dark:bg-dark-card border-r border-border dark:border-dark-border">
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-foreground-muted dark:text-dark-foreground-muted hover:bg-background-secondary dark:hover:bg-dark-background-secondary hover:text-foreground dark:hover:text-dark-foreground"
                )}
              >
                <Icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-accent" : "text-foreground-muted dark:text-dark-foreground-muted"
                  )}
                />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded bg-accent/20 text-accent">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

