'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Flight, SeatClass } from '@/types'

interface FlightFiltersProps {
  flights: Flight[]
  year: string
  setYear: (y: string) => void
  airline: string
  setAirline: (a: string) => void
  seatClass: string
  setSeatClass: (s: string) => void
}

export function FlightFilters({ flights, year, setYear, airline, setAirline, seatClass, setSeatClass }: FlightFiltersProps) {
  const years = Array.from(new Set(flights.map(f => new Date(f.departureDateTime).getFullYear().toString()))).sort().reverse()
  const airlines = Array.from(new Map(flights.map(f => [f.airline, f.airlineName || f.airline])).entries())

  return (
    <div className="flex flex-wrap gap-2">
      <Select value={year} onValueChange={setYear}>
        <SelectTrigger className="w-[120px] h-8 text-xs">
          <SelectValue placeholder="All years" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All years</SelectItem>
          {years.map(y => <SelectItem key={y} value={y}>{y}</SelectItem>)}
        </SelectContent>
      </Select>

      <Select value={airline} onValueChange={setAirline}>
        <SelectTrigger className="w-[160px] h-8 text-xs">
          <SelectValue placeholder="All airlines" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All airlines</SelectItem>
          {airlines.map(([iata, name]) => (
            <SelectItem key={iata} value={iata}>{name}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={seatClass} onValueChange={setSeatClass}>
        <SelectTrigger className="w-[150px] h-8 text-xs">
          <SelectValue placeholder="All classes" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All classes</SelectItem>
          <SelectItem value="economy">Economy</SelectItem>
          <SelectItem value="premium_economy">Premium Economy</SelectItem>
          <SelectItem value="business">Business</SelectItem>
          <SelectItem value="first">First</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
