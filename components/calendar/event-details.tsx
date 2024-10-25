"use client";

import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarEvent } from "@/lib/types";
import { useCalendarStore } from "@/lib/store";
import { Trash2 } from "lucide-react";

interface EventDetailsProps {
  event: CalendarEvent;
  onClose: () => void;
}

export function EventDetails({ event, onClose }: EventDetailsProps) {
  const deleteEvent = useCalendarStore((state) => state.deleteEvent);

  const handleDelete = () => {
    deleteEvent(event.id);
    onClose();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{event.title}</h2>
        <Button variant="destructive" size="icon" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {event.description && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
          <p className="mt-1">{event.description}</p>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Date & Time</h3>
        <div className="mt-1">
          <p>Start: {format(new Date(event.start), "PPpp")}</p>
          <p>End: {format(new Date(event.end), "PPpp")}</p>
        </div>
      </div>

      {event.location && (
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
          <p className="mt-1">{event.location}</p>
        </div>
      )}

      <div className="pt-4">
        <Button variant="outline" onClick={onClose} className="w-full">
          Close
        </Button>
      </div>
    </div>
  );
}