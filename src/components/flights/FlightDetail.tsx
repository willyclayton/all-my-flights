'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { format } from 'date-fns'
import { Edit, Trash2, Plane, Clock, MapPin, Tag, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { RouteDisplay } from './RouteDisplay'
import { formatMinutes } from '@/lib/duration'
import { useFlightData } from '@/hooks/useFlightData'
import type { Flight, SeatClass } from '@/types'

const SEAT_CLASS_LABELS: Record<SeatClass, string> = {
  economy: 'Economy',
  premium_economy: 'Premium Economy',
  business: 'Business',
  first: 'First Class',
}

const SEAT_CLASS_COLORS: Record<SeatClass, string> = {
  economy: 'bg-indigo-600/20 text-indigo-400 border-indigo-600/30',
  premium_economy: 'bg-purple-600/20 text-purple-400 border-purple-600/30',
  business: 'bg-blue-600/20 text-blue-400 border-blue-600/30',
  first: 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30',
}

interface DetailRowProps {
  label: string
  value?: string | null
}

function DetailRow({ label, value }: DetailRowProps) {
  if (!value) return null
  return (
    <div className="flex justify-between items-baseline py-2.5 border-b border-border/50 last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium font-mono text-foreground">{value}</span>
    </div>
  )
}

export function FlightDetail({ flight }: { flight: Flight }) {
  const router = useRouter()
  const { deleteFlight } = useFlightData()

  const handleDelete = () => {
    if (confirm('Delete this flight?')) {
      deleteFlight(flight.id)
      router.push('/flights')
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center">
              <Plane className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="font-mono font-bold text-foreground">{flight.flightNumber || '—'}</div>
              <div className="text-sm text-muted-foreground">{flight.airlineName || flight.airline}</div>
            </div>
          </div>
          <Badge variant="outline" className={SEAT_CLASS_COLORS[flight.seatClass]}>
            {SEAT_CLASS_LABELS[flight.seatClass]}
          </Badge>
        </div>

        <RouteDisplay dep={flight.departureAirport} arr={flight.arrivalAirport} size="lg" />

        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-muted-foreground">
          <div className="text-center">
            <div className="font-semibold text-foreground">{format(new Date(flight.departureDateTime), 'HH:mm')}</div>
            <div className="text-xs">{format(new Date(flight.departureDateTime), 'MMM d, yyyy')}</div>
          </div>
          <div className="text-center">
            <Clock className="w-4 h-4 mx-auto mb-0.5 opacity-50" />
            <div className="text-xs">{formatMinutes(flight.duration)}</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-foreground">{format(new Date(flight.arrivalDateTime), 'HH:mm')}</div>
            <div className="text-xs">{format(new Date(flight.arrivalDateTime), 'MMM d, yyyy')}</div>
          </div>
        </div>
      </div>

      {/* Flight details */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <Plane className="w-3.5 h-3.5" /> Flight Info
        </h2>
        <DetailRow label="Aircraft" value={flight.aircraftName || flight.aircraftType} />
        <DetailRow label="Aircraft Type" value={flight.aircraftType} />
        <DetailRow label="Tail Number" value={flight.tailNumber} />
        <DetailRow label="Distance" value={flight.distance ? `${flight.distance.toLocaleString()} km` : null} />
        <DetailRow label="Booking Ref" value={flight.bookingReference} />
      </div>

      {/* Gate & Seat */}
      <div className="bg-card border border-border rounded-lg p-5">
        <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5" /> Gate & Seat
        </h2>
        <DetailRow label="Departure Gate" value={flight.departureGate} />
        <DetailRow label="Arrival Gate" value={flight.arrivalGate} />
        <DetailRow label="Seat" value={flight.seatNumber} />
      </div>

      {/* Notes */}
      {flight.notes && (
        <div className="bg-card border border-border rounded-lg p-5">
          <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" /> Notes
          </h2>
          <p className="text-sm text-foreground whitespace-pre-wrap">{flight.notes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Link href={`/edit/${flight.id}`}>
          <Button variant="outline" size="sm" className="gap-2">
            <Edit className="w-4 h-4" />
            Edit
          </Button>
        </Link>
        <Button variant="ghost" size="sm" className="gap-2 text-destructive hover:text-destructive" onClick={handleDelete}>
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
  )
}
