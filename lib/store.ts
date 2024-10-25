import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CalendarEvent } from './types';
import { convertMDXToEvents } from './ics-to-mdx';
import { generateMockEvents } from './mock-data';

interface CalendarStore {
  events: CalendarEvent[];
  currentContent: string;
  isDirty: boolean;
  addEvent: (event: CalendarEvent) => void;
  updateEvent: (event: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  setContent: (content: string) => void;
  markSaved: () => void;
  importEvents: (icsContent: string) => void;
  exportEvents: () => Promise<string>;
}

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set, get) => ({
      events: generateMockEvents(),
      currentContent: '',
      isDirty: false,
      addEvent: (event) =>
        set((state) => ({ events: [...state.events, event] })),
      updateEvent: (event) =>
        set((state) => ({
          events: state.events.map((e) => (e.id === event.id ? event : e)),
        })),
      deleteEvent: (id) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        })),
      setContent: (content) =>
        set({ currentContent: content, isDirty: true }),
      markSaved: () => set({ isDirty: false }),
      importEvents: (icsContent) => {
        // Parse ICS content and update events
        const events = convertMDXToEvents(icsContent);
        set({ events: events as CalendarEvent[] });
      },
      exportEvents: async () => {
        const { events } = get();
        const mdxContent = convertMDXToEvents(events);
        return mdxContent;
      },
    }),
    {
      name: 'calendar-store',
      version: 1,
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          return { ...persistedState, currentContent: '', isDirty: false };
        }
        return persistedState;
      },
    }
  )
);