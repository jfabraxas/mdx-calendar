"use client";

import { useCalendarStore } from "@/lib/store";
import { CalendarCard } from "./calendar-card";
import { EmptyCalendars } from "./empty-calendars";

export function CalendarDashboard() {
  const calendars = useCalendarStore((state) => state.calendars);

  if (calendars.length === 0) {
    return <EmptyCalendars />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {calendars.map((calendar) => (
        <CalendarCard key={calendar.id} calendar={calendar} />
      ))}
    </div>
  );
}