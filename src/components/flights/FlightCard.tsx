import Link from 'next/link'
import { format } from 'date-fns'
import { Plane } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { RouteDisplay } from './RouteDisplay'
import { formatMinutes } from '@/lib/duration'
import type { Flight, SeatClass } from '@/types'

const SEAT_CLASS_LABELS: Record<SeatClass, string> = {
  economy: 'Economy',
  premium_economy: 'Prem. Economy',
  business: 'Business',
  first: 'First',
}

const SEAT_CLASS_COLORS: Record<SeatClass, string> = {
  economy: 'bg-indigo-600/20 text-indigo-400 border-indigo-600/30',
  premium_economy: 'bg-purple-600/20 text-purple-400 border-purple-600/30',
  business: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  first: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
}

interface FlightCardProps {
  flight: Flight
}

export function FlightCard({ flight }: FlightCardProps) {
  return (
    <Link href={`/flights/${flight.id}`}>
      <div className="bg-card border border-border rounded-lg p-4 hover:border-blue-600/50 hover:bg-card/80 transition-all group">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-blue-600/10 flex items-center justify-center flex-shrink-0">
              <Plane className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div>
              <span className="font-mono text-sm font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                {flight.flightNumber || '—'}
              </span>
              {flight.airlineName && (
                <span className="text-xs text-muted-foreground ml-2">{flight.airlineName}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant="outline" className={SEAT_CLASS_COLORS[flight.seatClass]}>
              {SEAT_CLASS_LABELS[flight.seatClass]}
            </Badge>
          </div>
        </div>

        <RouteDisplay dep={flight.departureAirport} arr={flight.arrivalAirport} size="md" />

        <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
          <span>{format(new Date(flight.departureDateTime), 'MMM d, yyyy')}</span>
          <div className="flex items-center gap-3">
            {flight.aircraftType && (
              <span className="font-mono">{flight.aircraftType}</span>
            )}
            <span>{formatMinutes(flight.duration)}</span>
            {flight.distance && (
              <span>{flight.distance.toLocaleString()} km</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
