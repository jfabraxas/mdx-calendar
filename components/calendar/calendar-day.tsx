"use client";

import { format, addHours, startOfDay, differenceInMinutes, isSameDay } from "date-fns";
import { CalendarEvent } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface CalendarDayProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
}

export function CalendarDay({ date, events, onEventClick }: CalendarDayProps) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const dayEvents = events.filter((event) => isSameDay(new Date(event.start), date));

  const getEventStyle = (event: CalendarEvent) => {
    const start = new Date(event.start);
    const end = new Date(event.end);
    const dayStart = startOfDay(start);

    const topOffset = (differenceInMinutes(start, dayStart) / 60) * 4;
    const height = (differenceInMinutes(end, start) / 60) * 4;

    return {
      top: `${topOffset}rem`,
      height: `${height}rem`,
    };
  };

  return (
    <ScrollArea className="h-full">
      <div className="relative min-w-[600px]">
        <div className="grid grid-cols-[auto,1fr] border rounded-lg overflow-hidden bg-background">
          {/* Header */}
          <div className="sticky top-0 z-30 bg-background col-span-2 p-4 border-b">
            <h2 className="text-lg font-semibold">
              {format(date, "EEEE, MMMM d, yyyy")}
            </h2>
          </div>

          {/* Time grid */}
          <div className="relative">
            {hours.map((hour) => (
              <div
                key={hour}
                className="sticky left-0 w-20 border-r bg-background z-20"
              >
                <div className="text-xs text-muted-foreground text-right pr-2 pt-2">
                  {format(addHours(startOfDay(date), hour), "HH:mm")}
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            {hours.map((hour) => (
              <div
                key={hour}
                className="border-b h-16"
              />
            ))}
            {dayEvents.map((event) => (
              <div
                key={event.id}
                className={cn(
                  "absolute left-0 right-4 p-2 rounded",
                  "bg-primary/10 hover:bg-primary/20",
                  "cursor-pointer"
                )}
                style={getEventStyle(event)}
                onClick={() => onEventClick?.(event)}
              >
                <div className="font-medium text-sm">{event.title}</div>
                <div className="text-xs text-muted-foreground">
                  {format(new Date(event.start), "HH:mm")} - {format(new Date(event.end), "HH:mm")}
                </div>
                {event.location && (
                  <div className="text-xs text-muted-foreground mt-1">
                    📍 {event.location}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}