"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCalendarStore } from "@/lib/store";
import { Download, Upload, Calendar } from "lucide-react";

export function CalendarActions() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { importEvents, exportEvents } = useCalendarStore();

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      importEvents(text);
      toast.success("Calendar imported successfully");
    } catch (error) {
      toast.error("Failed to import calendar");
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleExport = async () => {
    try {
      const icsContent = await exportEvents();
      const blob = new Blob([icsContent], { type: "text/calendar" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "calendar.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("Calendar exported successfully");
    } catch (error) {
      toast.error("Failed to export calendar");
    }
  };

  const handleSubscribe = () => {
    const url = `${window.location.origin}/api/calendar`;
    navigator.clipboard.writeText(url);
    toast.success("Calendar URL copied to clipboard", {
      description: "You can now add this URL to your calendar application",
    });
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept=".ics"
        onChange={handleImport}
        ref={fileInputRef}
        className="hidden"
      />
      <Button
        size="sm"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="h-4 w-4 mr-2" />
        Import
      </Button>
      <Button size="sm" variant="outline" onClick={handleExport}>
        <Download className="h-4 w-4 mr-2" />
        Export
      </Button>
      <Button size="sm" variant="outline" onClick={handleSubscribe}>
        <Calendar className="h-4 w-4 mr-2" />
        Subscribe
      </Button>
    </div>
  );
}