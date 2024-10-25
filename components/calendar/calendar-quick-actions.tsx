"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Upload,
  Download,
  Link as LinkIcon,
  Trash,
  MoreVertical,
} from "lucide-react";
import { useCalendarStore } from "@/lib/store";

export function CalendarQuickActions() {
  const importCalendar = useCalendarStore((state) => state.importCalendar);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const text = await file.text();
      importCalendar(text);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button>
        <Plus className="h-4 w-4 mr-2" />
        New Calendar
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <Upload className="h-4 w-4 mr-2" />
            Import Calendar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download className="h-4 w-4 mr-2" />
            Export Calendar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LinkIcon className="h-4 w-4 mr-2" />
            Subscribe to URL
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive">
            <Trash className="h-4 w-4 mr-2" />
            Delete Calendar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <input
        type="file"
        accept=".ics"
        className="hidden"
        onChange={handleFileUpload}
        id="calendar-import"
      />
    </div>
  );
}