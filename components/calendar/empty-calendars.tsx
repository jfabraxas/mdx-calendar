import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EmptyCalendars() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="rounded-full bg-muted p-4">
        <Plus className="h-8 w-8 text-muted-foreground" />
      </div>
      <h2 className="text-lg font-semibold">No calendars yet</h2>
      <p className="text-sm text-muted-foreground text-center max-w-sm">
        Create your first calendar to start organizing your events and schedule.
      </p>
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        Create Calendar
      </Button>
    </div>
  );
}