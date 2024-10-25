"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, Grid, Settings } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";

export function CalendarNav() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/calendars" className="flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              <span className="font-semibold">Calendar App</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link
                href="/calendars"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/calendars"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Button variant="ghost" size="sm">
                  <Grid className="h-4 w-4 mr-2" />
                  Calendars
                </Button>
              </Link>
              <Link
                href="/settings"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === "/settings"
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}