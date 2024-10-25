"use client";

import { format, addDays, eachDayOfInterval, isSameDay } from "date-fns";
import { CalendarEvent } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CalendarTimelineProps {
  date: Date;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export function CalendarTimeline({ date, events, onEventClick }: CalendarTimelineProps) {
  const days = eachDayOfInterval({
    start: date,
    end: addDays(date, 14),
  });

  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        <div className="space-y-8">
          {days.map((day) => {
            const dayEvents = sortedEvents.filter((event) => 
              isSameDay(new Date(event.start), day)
            );

            if (dayEvents.length === 0) return null;

            return (
              <div key={day.toISOString()} className="relative">
                <div className="flex items-center mb-4">
                  <div className="w-32 flex-shrink-0">
                    <div className="font-medium">{format(day, "EEEE")}</div>
                    <div className="text-sm text-muted-foreground">
                      {format(day, "MMMM d")}
                    </div>
                  </div>
                  <div className="border-t flex-grow ml-4" />
                </div>
                <div className="ml-32 space-y-2">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={cn(
                        "p-3 rounded-lg border cursor-pointer",
                        "hover:bg-muted/50 transition-colors"
                      )}
                      onClick={() => onEventClick(event)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(event.start), "HH:mm")} - {format(new Date(event.end), "HH:mm")}
                          </div>
                        </div>
                        {event.location && (
                          <div className="text-sm text-muted-foreground">
                            📍 {event.location}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}