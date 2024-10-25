"use client";

import { format, isToday, isTomorrow, isThisWeek, isThisMonth } from "date-fns";
import { CalendarEvent } from "@/lib/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface CalendarAgendaProps {
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export function CalendarAgenda({ events, onEventClick }: CalendarAgendaProps) {
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const groupEvents = (events: CalendarEvent[]) => {
    const groups: { [key: string]: CalendarEvent[] } = {
      today: [],
      tomorrow: [],
      thisWeek: [],
      thisMonth: [],
      future: [],
    };

    events.forEach((event) => {
      const start = new Date(event.start);
      if (isToday(start)) {
        groups.today.push(event);
      } else if (isTomorrow(start)) {
        groups.tomorrow.push(event);
      } else if (isThisWeek(start)) {
        groups.thisWeek.push(event);
      } else if (isThisMonth(start)) {
        groups.thisMonth.push(event);
      } else {
        groups.future.push(event);
      }
    });

    return groups;
  };

  const groupedEvents = groupEvents(sortedEvents);

  const groupTitles = {
    today: "Today",
    tomorrow: "Tomorrow",
    thisWeek: "This Week",
    thisMonth: "This Month",
    future: "Future",
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        {Object.entries(groupedEvents).map(([group, events]) => 
          events.length > 0 && (
            <div key={group} className="mb-8 last:mb-0">
              <h3 className="text-lg font-semibold mb-4">{groupTitles[group as keyof typeof groupTitles]}</h3>
              <div className="space-y-2">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={cn(
                      "p-4 rounded-lg border cursor-pointer",
                      "hover:bg-muted/50 transition-colors"
                    )}
                    onClick={() => onEventClick(event)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="text-sm text-muted-foreground mt-1">
                          {format(new Date(event.start), "EEEE, MMMM d")}
                        </div>
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
          )
        )}
      </div>
    </ScrollArea>
  );
}