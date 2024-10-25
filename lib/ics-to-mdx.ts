import { format } from 'date-fns';
import { CalendarEvent } from './types';

export function convertICSToMDX(events: CalendarEvent[]): string {
  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const mdx = sortedEvents.map(event => {
    const start = new Date(event.start);
    const end = new Date(event.end);

    return `## ${event.title}

- **Date**: ${format(start, 'MMMM d, yyyy')}
- **Time**: ${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}
${event.location ? `- **Location**: ${event.location}\n` : ''}
${event.description ? `\n${event.description}\n` : ''}
---`;
  }).join('\n\n');

  return `# Calendar Events\n\n${mdx}`;
}

export function convertMDXToEvents(mdx: string): Partial<CalendarEvent>[] {
  const events: Partial<CalendarEvent>[] = [];
  const sections = mdx.split('##').slice(1); // Skip the header

  sections.forEach(section => {
    const lines = section.trim().split('\n');
    const title = lines[0].trim();
    const event: Partial<CalendarEvent> = { title };

    lines.forEach(line => {
      if (line.startsWith('- **Date**:')) {
        const dateStr = line.split(':')[1].trim();
        event.start = new Date(dateStr);
      } else if (line.startsWith('- **Time**:')) {
        const [startTime, endTime] = line.split(':')[1].trim().split(' - ');
        const [startHour, startMinute] = startTime.split(':');
        const [endHour, endMinute] = endTime.split(':');

        if (event.start) {
          event.start.setHours(parseInt(startHour), parseInt(startMinute));
          event.end = new Date(event.start);
          event.end.setHours(parseInt(endHour), parseInt(endMinute));
        }
      } else if (line.startsWith('- **Location**:')) {
        event.location = line.split(':')[1].trim();
      } else if (line && !line.startsWith('-') && !line.startsWith('#')) {
        event.description = line.trim();
      }
    });

    if (event.title && event.start && event.end) {
      events.push(event);
    }
  });

  return events;
}