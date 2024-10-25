"use client";

import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from "date-fns";
import { CalendarEvent } from "@/lib/types";
import { cn } from "@/lib/utils";

interface CalendarGridProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export function CalendarGrid({ date, events, onEventClick }: CalendarGridProps) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="grid grid-cols-7 gap-px bg-muted p-4">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
        <div key={day} className="text-center text-sm font-medium py-2">
          {day}
        </div>
      ))}
      {days.map((day, dayIdx) => {
        const dayEvents = events.filter((event) =>
          isSameDay(new Date(event.start), day)
        );

        return (
          <div
            key={day.toString()}
            className={cn(
              "min-h-[120px] p-2 bg-background",
              !isSameMonth(day, date) && "text-muted-foreground"
            )}
            style={{ gridColumnStart: dayIdx === 0 ? day.getDay() + 1 : undefined }}
          >
            <div className="text-right text-sm">{format(day, "d")}</div>
            <div className="mt-2 space-y-1">
              {dayEvents.map((event) => (
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
        );
      })}
    </div>
  );
}