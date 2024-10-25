"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useCalendarStore } from "@/lib/store";
import { CalendarEvent } from "@/lib/types";
import { addHours, format } from "date-fns";

interface EventFormProps {
  onClose: () => void;
  onSuccess: () => void;
  initialDate?: Date;
}

export function EventForm({ onClose, onSuccess, initialDate = new Date() }: EventFormProps) {
  const addEvent = useCalendarStore((state) => state.addEvent);
  const { register, handleSubmit, formState: { errors } } = useForm<CalendarEvent>({
    defaultValues: {
      start: format(initialDate, "yyyy-MM-dd'T'HH:mm"),
      end: format(addHours(initialDate, 1), "yyyy-MM-dd'T'HH:mm"),
    },
  });

  const onSubmit = (data: CalendarEvent) => {
    addEvent({
      ...data,
      id: crypto.randomUUID(),
      calendarId: "default",
      start: new Date(data.start),
      end: new Date(data.end),
      allDay: false,
    });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          {...register("description")}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start">Start</Label>
          <Input
            id="start"
            type="datetime-local"
            {...register("start", { required: "Start date is required" })}
          />
          {errors.start && (
            <p className="text-sm text-destructive">{errors.start.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="end">End</Label>
          <Input
            id="end"
            type="datetime-local"
            {...register("end", { required: "End date is required" })}
          />
          {errors.end && (
            <p className="text-sm text-destructive">{errors.end.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          {...register("location")}
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          Create Event
        </Button>
      </div>
    </form>
  );
}