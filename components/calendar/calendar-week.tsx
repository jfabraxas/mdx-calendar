"use client";

import { format, startOfWeek, addDays, eachDayOfInterval } from "date-fns";
import { CalendarEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CalendarWeekProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export function CalendarWeek({ date, events, onEventClick }: CalendarWeekProps) {
  const weekStart = startOfWeek(date);
  const days = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6),
  });

  return (
    <div className="grid grid-cols-7 gap-px bg-muted p-4">
      {days.map((day) => (
        <div key={day.toString()} className="bg-background p-2">
          <div className="text-center">
            <div className="text-sm font-medium">
              {format(day, "EEE")}
            </div>
            <div className="text-2xl">{format(day, "d")}</div>
          </div>
          <div className="mt-2 space-y-1">
            {events
              .filter((event) =>
                format(new Date(event.start), "yyyy-MM-dd") ===
                format(day, "yyyy-MM-dd")
              )
              .map((event) => (
                <button
                  key={event.id}
                  onClick={() => onEventClick(event)}
                  className={cn(
                    "w-full text-left text-xs p-1 rounded",
                    "bg-primary/10 hover:bg-primary/20",
                    "truncate"
                  )}
                >
                  {format(new Date(event.start), "HH:mm")} {event.title}
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}