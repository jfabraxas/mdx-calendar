import Link from "next/link";
import { Calendar as CalendarIcon, Users, Globe } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface CalendarCardProps {
  calendar: Calendar;
}

export function CalendarCard({ calendar }: CalendarCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: calendar.color }}
            />
            <CardTitle>{calendar.name}</CardTitle>
          </div>
          <Badge variant={calendar.type === "private" ? "default" : "secondary"}>
            {calendar.type === "private" ? (
              <Users className="h-3 w-3 mr-1" />
            ) : (
              <Globe className="h-3 w-3 mr-1" />
            )}
            {calendar.type}
          </Badge>
        </div>
        <CardDescription>{calendar.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarIcon className="h-4 w-4 mr-2" />
          {calendar.eventCount} events
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between items-center w-full">
          <Button variant="ghost" size="sm">
            Share
          </Button>
          <Link href={`/calendar/${calendar.id}`}>
            <Button size="sm">View Calendar</Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}