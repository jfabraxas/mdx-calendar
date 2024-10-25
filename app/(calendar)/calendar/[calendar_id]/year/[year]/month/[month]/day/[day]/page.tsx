import { CalendarDay, type CalendarDayProps } from '@/components/calendar/calendar-day'
import { useCalendarStore } from '@/lib/store'
import { getDate } from 'date-fns'

interface DayPageProps {
    params: Promise<{ calendar_id: string, year: string, month: string, day: string }>
}

export default async function DayPage({ params }: DayPageProps) {
    const { year, month, day } = await params
    const date = new Date(Number(year), Number(month), Number(day))
    const events = useCalendarStore((state) => state.events.filter(({ id, start }) => new Date(start) === date));
    return <div><CalendarDay date={date} events={events} /></div>
}