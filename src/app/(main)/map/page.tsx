'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Plus, Map } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useFlightData } from '@/hooks/useFlightData'

const FlightMap = dynamic(
  () => import('@/components/map/FlightMap').then(m => m.FlightMap),
  { ssr: false, loading: () => <div className="w-full bg-card border border-border rounded-lg" style={{ aspectRatio: '16/9' }}><div className="w-full h-full bg-muted animate-pulse rounded-lg" /></div> }
)

export default function MapPage() {
  const { flights, isLoaded } = useFlightData()

  return (
    <div className="px-4 py-8 md:px-8 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Flight Map</h1>
          <p className="text-sm text-muted-foreground">
            {isLoaded ? `${new Set(flights.flatMap(f => [f.departureAirport, f.arrivalAirport])).size} airports visited` : 'Loading...'}
          </p>
        </div>
        <Link href="/add">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            Log Flight
          </Button>
        </Link>
      </div>

      {!isLoaded ? (
        <div className="w-full bg-muted animate-pulse rounded-lg" style={{ aspectRatio: '16/9' }} />
      ) : flights.length === 0 ? (
        <div className="text-center py-24 bg-card border border-border rounded-lg">
          <Map className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
          <h2 className="text-lg font-semibold text-foreground mb-2">No routes yet</h2>
          <p className="text-sm text-muted-foreground mb-6">Log some flights to see them on the map.</p>
          <Link href="/add"><Button className="bg-blue-600 hover:bg-blue-700">Log a flight</Button></Link>
        </div>
      ) : (
        <>
          <FlightMap flights={flights} />
          <p className="text-xs text-muted-foreground mt-3 text-center">Scroll to zoom · Drag to pan</p>
        </>
      )}
    </div>
  )
}
