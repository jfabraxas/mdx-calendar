"use client";

import { useState } from "react";
import { format, addMonths, subMonths, startOfMonth } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCalendarStore } from "@/lib/store";
import { CalendarGrid } from "./calendar-grid";
import { CalendarWeek } from "./calendar-week";
import { CalendarDay } from "./calendar-day";
import { CalendarAgenda } from "./calendar-agenda";
import { CalendarTimeline } from "./calendar-timeline";
import { EventForm } from "./event-form";
import { EventDetails } from "./event-details";
import { CalendarEvent } from "@/lib/types";
import { ViewToggle } from "./view-toggle";
import { cn } from "@/lib/utils";

export function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"month" | "week" | "day" | "agenda" | "timeline">("month");
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const events = useCalendarStore((state) => state.events);

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => 
      direction === "prev" ? subMonths(prev, 1) : addMonths(prev, 1)
    );
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
  };

  const renderView = () => {
    switch (view) {
      case "month":
        return (
          <CalendarGrid
            date={startOfMonth(currentDate)}
            events={events}
            onEventClick={handleEventClick}
          />
        );
      case "week":
        return (
          <CalendarWeek
            date={currentDate}
            events={events}
            onEventClick={handleEventClick}
          />
        );
      case "day":
        return (
          <CalendarDay
            date={currentDate}
            events={events}
            onEventClick={handleEventClick}
          />
        );
      case "agenda":
        return (
          <CalendarAgenda
            events={events}
            onEventClick={handleEventClick}
          />
        );
      case "timeline":
        return (
          <CalendarTimeline
            date={currentDate}
            events={events}
            onEventClick={handleEventClick}
          />
        );
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <h1 className="text-xl font-semibold">
              {format(currentDate, "MMMM yyyy")}
            </h1>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateMonth("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
              className="ml-2"
            >
              Today
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ViewToggle view={view} onViewChange={setView} />
          <Button onClick={() => setIsAddEventOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className={cn(
          "h-full",
          view === "month" ? "min-h-[800px]" : "min-h-[1200px]"
        )}>
          {renderView()}
        </div>
      </div>

      <Sheet open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Event</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <EventForm
              onClose={() => setIsAddEventOpen(false)}
              onSuccess={() => setIsAddEventOpen(false)}
              initialDate={currentDate}
            />
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Event Details</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            {selectedEvent && (
              <EventDetails
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
              />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}