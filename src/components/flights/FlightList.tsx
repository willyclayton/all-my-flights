'use client'

import * as React from 'react'
import { Plane } from 'lucide-react'
import { FlightCard } from './FlightCard'
import { FlightFilters } from './FlightFilters'
import type { Flight } from '@/types'

interface FlightListProps {
  flights: Flight[]
}

export function FlightList({ flights }: FlightListProps) {
  const [year, setYear] = React.useState('all')
  const [airline, setAirline] = React.useState('all')
  const [seatClass, setSeatClass] = React.useState('all')

  const filtered = React.useMemo(() => {
    return flights.filter(f => {
      if (year !== 'all' && new Date(f.departureDateTime).getFullYear().toString() !== year) return false
      if (airline !== 'all' && f.airline !== airline) return false
      if (seatClass !== 'all' && f.seatClass !== seatClass) return false
      return true
    })
  }, [flights, year, airline, seatClass])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-muted-foreground">
          {filtered.length} flight{filtered.length !== 1 ? 's' : ''}
          {(year !== 'all' || airline !== 'all' || seatClass !== 'all') && (
            <button
              onClick={() => { setYear('all'); setAirline('all'); setSeatClass('all') }}
              className="ml-2 text-blue-400 hover:text-blue-300 underline"
            >
              clear filters
            </button>
          )}
        </p>
        <FlightFilters
          flights={flights}
          year={year} setYear={setYear}
          airline={airline} setAirline={setAirline}
          seatClass={seatClass} setSeatClass={setSeatClass}
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <Plane className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No flights match your filters.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(flight => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      )}
    </div>
  )
}
