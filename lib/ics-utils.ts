import { createEvents, EventAttributes } from 'ics';
import { CalendarEvent, ICSEvent } from './types';

export function generateICSEvent(event: CalendarEvent): EventAttributes {
  return {
    uid: event.id,
    title: event.title,
    description: event.description,
    start: [
      event.start.getFullYear(),
      event.start.getMonth() + 1,
      event.start.getDate(),
      event.start.getHours(),
      event.start.getMinutes(),
    ],
    end: [
      event.end.getFullYear(),
      event.end.getMonth() + 1,
      event.end.getDate(),
      event.end.getHours(),
      event.end.getMinutes(),
    ],
    location: event.location,
    url: event.url,
  };
}

export function generateICSFile(events: CalendarEvent[]): Promise<string> {
  return new Promise((resolve, reject) => {
    const icsEvents = events.map(generateICSEvent);
    createEvents(icsEvents, (error, value) => {
      if (error) {
        reject(error);
      } else {
        resolve(value);
      }
    });
  });
}

export function parseICSFile(icsData: string): ICSEvent[] {
  const events: ICSEvent[] = [];
  const lines = icsData.split('\n');
  let currentEvent: Partial<ICSEvent> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === 'BEGIN:VEVENT') {
      currentEvent = {};
    } else if (line === 'END:VEVENT') {
      if (currentEvent.uid && currentEvent.title && currentEvent.start && currentEvent.end) {
        events.push(currentEvent as ICSEvent);
      }
      currentEvent = {};
    } else {
      const [key, value] = line.split(':');
      switch (key) {
        case 'UID':
          currentEvent.uid = value;
          currentEvent.id = value;
          break;
        case 'SUMMARY':
          currentEvent.title = value;
          break;
        case 'DESCRIPTION':
          currentEvent.description = value;
          break;
        case 'DTSTART':
          currentEvent.start = new Date(value);
          break;
        case 'DTEND':
          currentEvent.end = new Date(value);
          break;
        case 'LOCATION':
          currentEvent.location = value;
          break;
        case 'URL':
          currentEvent.url = value;
          break;
        case 'CREATED':
          currentEvent.created = new Date(value);
          break;
        case 'LAST-MODIFIED':
          currentEvent.lastModified = new Date(value);
          break;
      }
    }
  }

  return events;
}