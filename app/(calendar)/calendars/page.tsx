import { CalendarDashboard } from "@/components/calendar/calendar-dashboard";
import { CalendarQuickActions } from "@/components/calendar/calendar-quick-actions";

export default function CalendarsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Calendars</h1>
        <CalendarQuickActions />
      </div>
      <CalendarDashboard />
    </div>
  );
}