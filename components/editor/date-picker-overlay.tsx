"use client";

import { useEffect, useRef } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface DatePickerOverlayProps {
  position: { x: number; y: number } | null;
  onSelect: (date: Date) => void;
  onClose: () => void;
}

export function DatePickerOverlay({
  position,
  onSelect,
  onClose,
}: DatePickerOverlayProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!position) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "fixed z-50 bg-background border rounded-lg shadow-lg",
        "animate-in fade-in-0 zoom-in-95"
      )}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    >
      <Calendar
        mode="single"
        onSelect={(date) => {
          if (date) onSelect(date);
        }}
        initialFocus
      />
    </div>
  );
}