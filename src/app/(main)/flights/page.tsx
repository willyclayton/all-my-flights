'use client'

import Link from 'next/link'
import { Plus, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FlightList } from '@/components/flights/FlightList'
import { useFlightData } from '@/hooks/useFlightData'

export default function FlightsPage() {
  const { flights, isLoaded } = useFlightData()

  return (
    <div className="px-4 py-8 md:px-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Flight Log</h1>
          <p className="text-sm text-muted-foreground">{isLoaded ? `${flights.length} flights recorded` : 'Loading...'}</p>
        </div>
        <Link href="/add">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            Log Flight
          </Button>
        </Link>
      </div>

      {!isLoaded ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      ) : flights.length === 0 ? (
        <div className="text-center py-24">
          <Plane className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
          <h2 className="text-lg font-semibold text-foreground mb-2">No flights yet</h2>
          <p className="text-muted-foreground text-sm mb-6">Log your first flight to get started.</p>
          <Link href="/add">
            <Button className="bg-blue-600 hover:bg-blue-700">Log your first flight</Button>
          </Link>
        </div>
      ) : (
        <FlightList flights={flights} />
      )}
    </div>
  )
}
