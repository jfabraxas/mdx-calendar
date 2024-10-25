import { EventDetails } from '@/components/calendar/event-details'
import { useCalendarStore } from '@/lib/store';

type EventPageProps = {
    params: Promise<{ event: string }>
}

export default async function EventPage({ params }: EventPageProps) {
    const { event } = await params
    const eventDetails = useCalendarStore((state) => state.events.find(({ id }) => id === event));
    return <div>
        <EventDetails event={eventDetails!} />
    </div>
}