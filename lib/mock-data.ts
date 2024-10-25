import { addDays, addHours, format, startOfMonth } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export function generateMockEvents() {
  const startDate = startOfMonth(new Date());
  const events = [];

  for (let i = 0; i < 20; i++) {
    const start = addDays(startDate, Math.floor(Math.random() * 30));
    const end = addHours(start, Math.floor(Math.random() * 4) + 1);

    events.push({
      id: uuidv4(),
      title: `Event ${i + 1}`,
      description: `Description for Event ${i + 1}`,
      start,
      end,
      location: Math.random() > 0.5 ? `Location ${i + 1}` : undefined,
    });
  }

  return events;
}

export function generateICSContent(events: any[]) {
  const icsEvents = events.map(event => {
    const formatDate = (date: Date) => format(date, "yyyyMMdd'T'HHmmss");
    
    return `BEGIN:VEVENT
UID:${event.id}
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(event.start)}
DTEND:${formatDate(event.end)}
SUMMARY:${event.title}
DESCRIPTION:${event.description || ''}
LOCATION:${event.location || ''}
END:VEVENT`;
  }).join('\n');

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Calendar App//EN
${icsEvents}
END:VCALENDAR`;
}