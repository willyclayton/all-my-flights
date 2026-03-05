import Link from 'next/link'
import { format } from 'date-fns'
import { ArrowRight } from 'lucide-react'
import { RouteDisplay } from '@/components/flights/RouteDisplay'
import { formatMinutes } from '@/lib/duration'
import type { Flight } from '@/types'

interface RecentFlightsProps {
  flights: Flight[]
}

export function RecentFlights({ flights }: RecentFlightsProps) {
  const recent = flights.slice(0, 5)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-foreground">Recent Flights</h2>
        <Link href="/flights" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="space-y-2">
        {recent.map(flight => (
          <Link key={flight.id} href={`/flights/${flight.id}`}>
            <div className="bg-card border border-border rounded-lg p-3 hover:border-blue-600/50 transition-colors flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <RouteDisplay dep={flight.departureAirport} arr={flight.arrivalAirport} size="sm" />
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-xs text-muted-foreground">{format(new Date(flight.departureDateTime), 'MMM d')}</div>
                <div className="text-xs font-mono text-muted-foreground">{formatMinutes(flight.duration)}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
