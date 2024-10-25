"use client";

import { CalendarDays, CalendarRange, Calendar, List, ChartNoAxesGantt as Timeline } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface ViewToggleProps {
  view: "month" | "week" | "day" | "agenda" | "timeline";
  onViewChange: (view: "month" | "week" | "day" | "agenda" | "timeline") => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <ToggleGroup 
      type="single" 
      value={view} 
      onValueChange={(value) => value && onViewChange(value as typeof view)}
      className="space-x-1"
    >
      <ToggleGroupItem value="month" aria-label="Month view" variant="outline">
        <CalendarDays className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="week" aria-label="Week view" variant="outline">
        <CalendarRange className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="day" aria-label="Day view" variant="outline">
        <Calendar className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="agenda" aria-label="Agenda view" variant="outline">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="timeline" aria-label="Timeline view" variant="outline">
        <Timeline className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}