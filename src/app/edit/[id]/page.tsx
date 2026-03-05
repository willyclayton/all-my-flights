'use client'

import { useParams } from 'next/navigation'
import { FlightForm } from '@/components/forms/FlightForm'
import { AppShell } from '@/components/layout/AppShell'
import { useFlightData } from '@/hooks/useFlightData'
import { Edit } from 'lucide-react'

export default function EditFlightPage() {
  const params = useParams()
  const id = params.id as string
  const { getFlight, isLoaded } = useFlightData()
  const flight = getFlight(id)

  if (!isLoaded) {
    return (
      <AppShell>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <div className="h-8 bg-muted rounded animate-pulse w-48 mb-8" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 bg-muted rounded animate-pulse" />
            ))}
          </div>
        </div>
      </AppShell>
    )
  }

  if (!flight) {
    return (
      <AppShell>
        <div className="max-w-2xl mx-auto px-4 py-8">
          <p className="text-muted-foreground">Flight not found.</p>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
            <Edit className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Flight</h1>
            <p className="text-sm text-muted-foreground font-mono">{flight.flightNumber || flight.id.slice(0, 8)}</p>
          </div>
        </div>
        <FlightForm mode="edit" initialFlight={flight} />
      </div>
    </AppShell>
  )
}
