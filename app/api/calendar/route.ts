import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { generateICSFile } from '@/lib/ics-utils';
import { useCalendarStore } from '@/lib/store';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const headersList = headers();
  const host = headersList.get('host') || '';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  try {
    // Get events from the store
    const store = useCalendarStore.getState();
    const icsContent = await generateICSFile(store.events);

    // Set headers for ICS file
    const headers = new Headers();
    headers.set('Content-Type', 'text/calendar');
    headers.set('Content-Disposition', 'attachment; filename="calendar.ics"');

    return new NextResponse(icsContent, {
      headers,
      status: 200,
    });
  } catch (error) {
    console.error('Error generating ICS file:', error);
    return new NextResponse('Error generating calendar file', { status: 500 });
  }
}