"use client";

import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCalendarStore } from "@/lib/store";

export function Calendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const events = useCalendarStore((state) => state.events);

  const eventsForSelectedDate = events.filter(
    (event) =>
      date &&
      event.start.toDateString() === date.toDateString()
  );

  return (
    <div className="h-full border-l">
      <div className="flex h-full flex-col">
        <div className="border-b p-4">
          <h2 className="text-lg font-semibold">Calendar</h2>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="h-5 w-5" />
              <h3 className="font-medium">Select Date</h3>
            </div>
            <DayPicker
              mode="single"
              selected={date}
              onSelect={setDate}
              className="border rounded-md p-3"
              classNames={{
                day_selected: "bg-primary text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
              }}
            />
          </div>
          <div className="mt-6">
            <h3 className="font-medium mb-3">Events</h3>
            <ScrollArea className="h-[300px] rounded-md border p-4">
              {eventsForSelectedDate.length > 0 ? (
                eventsForSelectedDate.map((event) => (
                  <div
                    key={event.id}
                    className="mb-4 rounded-lg border p-3 last:mb-0"
                  >
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {event.start.toLocaleTimeString()} -{" "}
                      {event.end.toLocaleTimeString()}
                    </p>
                    {event.location && (
                      <p className="text-sm text-muted-foreground mt-1">
                        📍 {event.location}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No events scheduled for this date.
                </p>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}