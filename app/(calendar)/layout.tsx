"use client";

import { CalendarNav } from "@/components/calendar/calendar-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background">
        <CalendarNav />
        <main className="container mx-auto p-4">{children}</main>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}