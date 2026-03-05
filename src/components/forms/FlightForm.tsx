'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AirportCombobox } from './AirportCombobox'
import { AirlineCombobox } from './AirlineCombobox'
import { AircraftCombobox } from './AircraftCombobox'
import { useFlightData } from '@/hooks/useFlightData'
import { getAirport } from '@/lib/airports'
import { haversineKm } from '@/lib/distance'
import { minutesBetween } from '@/lib/duration'
import type { Flight, SeatClass } from '@/types'

interface FlightFormProps {
  initialFlight?: Flight
  mode: 'add' | 'edit'
}

const SEAT_CLASS_OPTIONS: { value: SeatClass; label: string }[] = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium_economy', label: 'Premium Economy' },
  { value: 'business', label: 'Business' },
  { value: 'first', label: 'First Class' },
]

function toLocalDatetimeValue(iso: string): string {
  if (!iso) return ''
  const d = new Date(iso)
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

export function FlightForm({ initialFlight, mode }: FlightFormProps) {
  const router = useRouter()
  const { addFlight, updateFlight } = useFlightData()

  const [form, setForm] = React.useState({
    flightNumber: initialFlight?.flightNumber ?? '',
    airline: initialFlight?.airline ?? '',
    airlineName: initialFlight?.airlineName ?? '',
    aircraftType: initialFlight?.aircraftType ?? '',
    aircraftName: initialFlight?.aircraftName ?? '',
    tailNumber: initialFlight?.tailNumber ?? '',
    departureAirport: initialFlight?.departureAirport ?? '',
    arrivalAirport: initialFlight?.arrivalAirport ?? '',
    departureDateTime: initialFlight?.departureDateTime ? toLocalDatetimeValue(initialFlight.departureDateTime) : '',
    arrivalDateTime: initialFlight?.arrivalDateTime ? toLocalDatetimeValue(initialFlight.arrivalDateTime) : '',
    seatNumber: initialFlight?.seatNumber ?? '',
    seatClass: (initialFlight?.seatClass ?? 'economy') as SeatClass,
    notes: initialFlight?.notes ?? '',
    departureGate: initialFlight?.departureGate ?? '',
    arrivalGate: initialFlight?.arrivalGate ?? '',
    bookingReference: initialFlight?.bookingReference ?? '',
  })

  const set = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.departureAirport || !form.arrivalAirport || !form.departureDateTime || !form.arrivalDateTime) return

    const depISO = new Date(form.departureDateTime).toISOString()
    const arrISO = new Date(form.arrivalDateTime).toISOString()
    const duration = minutesBetween(depISO, arrISO)

    const depAirport = getAirport(form.departureAirport)
    const arrAirport = getAirport(form.arrivalAirport)
    const distance = depAirport && arrAirport
      ? haversineKm(depAirport.lat, depAirport.lng, arrAirport.lat, arrAirport.lng)
      : undefined

    const flightData: Omit<Flight, 'id'> = {
      flightNumber: form.flightNumber,
      airline: form.airline,
      airlineName: form.airlineName || undefined,
      aircraftType: form.aircraftType,
      aircraftName: form.aircraftName || undefined,
      tailNumber: form.tailNumber || undefined,
      departureAirport: form.departureAirport,
      arrivalAirport: form.arrivalAirport,
      departureDateTime: depISO,
      arrivalDateTime: arrISO,
      duration,
      distance,
      seatNumber: form.seatNumber || undefined,
      seatClass: form.seatClass,
      notes: form.notes || undefined,
      departureGate: form.departureGate || undefined,
      arrivalGate: form.arrivalGate || undefined,
      bookingReference: form.bookingReference || undefined,
    }

    if (mode === 'add') {
      addFlight({ ...flightData, id: crypto.randomUUID() })
      router.push('/flights')
    } else if (initialFlight) {
      updateFlight(initialFlight.id, flightData)
      router.push(`/flights/${initialFlight.id}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Route */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Route</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Departure Airport *</Label>
            <AirportCombobox
              value={form.departureAirport}
              onChange={(v) => set('departureAirport', v)}
              placeholder="From..."
            />
          </div>
          <div className="space-y-2">
            <Label>Arrival Airport *</Label>
            <AirportCombobox
              value={form.arrivalAirport}
              onChange={(v) => set('arrivalAirport', v)}
              placeholder="To..."
            />
          </div>
          <div className="space-y-2">
            <Label>Departure Date & Time *</Label>
            <Input
              type="datetime-local"
              value={form.departureDateTime}
              onChange={(e) => set('departureDateTime', e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Arrival Date & Time *</Label>
            <Input
              type="datetime-local"
              value={form.arrivalDateTime}
              onChange={(e) => set('arrivalDateTime', e.target.value)}
              required
            />
          </div>
        </div>
      </section>

      {/* Flight */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Flight</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Airline</Label>
            <AirlineCombobox
              value={form.airline}
              onChange={(iata, name) => setForm(prev => ({ ...prev, airline: iata, airlineName: name }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Flight Number</Label>
            <Input
              placeholder="BA286"
              value={form.flightNumber}
              onChange={(e) => set('flightNumber', e.target.value.toUpperCase())}
              className="font-mono"
            />
          </div>
          <div className="space-y-2">
            <Label>Departure Gate</Label>
            <Input
              placeholder="A12"
              value={form.departureGate}
              onChange={(e) => set('departureGate', e.target.value.toUpperCase())}
            />
          </div>
          <div className="space-y-2">
            <Label>Arrival Gate</Label>
            <Input
              placeholder="B5"
              value={form.arrivalGate}
              onChange={(e) => set('arrivalGate', e.target.value.toUpperCase())}
            />
          </div>
          <div className="space-y-2">
            <Label>Booking Reference</Label>
            <Input
              placeholder="ABC123"
              value={form.bookingReference}
              onChange={(e) => set('bookingReference', e.target.value.toUpperCase())}
              className="font-mono"
            />
          </div>
        </div>
      </section>

      {/* Aircraft */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Aircraft</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Aircraft Type</Label>
            <AircraftCombobox
              value={form.aircraftType}
              onChange={(icao, name) => setForm(prev => ({ ...prev, aircraftType: icao, aircraftName: name }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Tail Number</Label>
            <Input
              placeholder="G-STBG"
              value={form.tailNumber}
              onChange={(e) => set('tailNumber', e.target.value.toUpperCase())}
              className="font-mono"
            />
          </div>
        </div>
      </section>

      {/* Seat */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Seat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Seat Class</Label>
            <Select value={form.seatClass} onValueChange={(v) => set('seatClass', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SEAT_CLASS_OPTIONS.map(opt => (
                  <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Seat Number</Label>
            <Input
              placeholder="14A"
              value={form.seatNumber}
              onChange={(e) => set('seatNumber', e.target.value.toUpperCase())}
              className="font-mono"
            />
          </div>
        </div>
      </section>

      {/* Notes */}
      <section>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Notes</h2>
        <Textarea
          placeholder="Any notes about this flight..."
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          rows={3}
        />
      </section>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {mode === 'add' ? 'Log Flight' : 'Save Changes'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
