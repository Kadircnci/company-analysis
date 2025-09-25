"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BarChart3, Building2, TrendingUp, Settings, Bell } from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/",
    icon: BarChart3,
  },
  {
    name: "Şirketler",
    href: "/companies",
    icon: Building2,
  },
  {
    name: "Analizler",
    href: "/analysis",
    icon: TrendingUp,
  },
  {
    name: "Ayarlar",
    href: "/settings",
    icon: Settings,
  },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo ve Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">FinAnalyzer</h1>
                <p className="text-xs text-muted-foreground">Finansal Olay Analiz</p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={cn(
                      "flex items-center gap-2",
                      isActive && "bg-primary text-primary-foreground"
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <span className="text-sm font-medium">U</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden border-t px-6 py-3">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "flex items-center gap-2 whitespace-nowrap",
                    isActive && "bg-primary text-primary-foreground"
                  )}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}