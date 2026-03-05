'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { FlightDetail } from '@/components/flights/FlightDetail'
import { useFlightData } from '@/hooks/useFlightData'

export default function FlightDetailPage() {
  const params = useParams()
  const id = params.id as string
  const { getFlight, isLoaded } = useFlightData()
  const flight = getFlight(id)

  if (!isLoaded) {
    return (
      <div className="px-4 py-8 md:px-8 max-w-2xl mx-auto">
        <div className="h-8 bg-muted rounded animate-pulse w-24 mb-6" />
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (!flight) {
    return (
      <div className="px-4 py-8 md:px-8 max-w-2xl mx-auto">
        <Link href="/flights" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to flights
        </Link>
        <p className="text-muted-foreground">Flight not found.</p>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 md:px-8">
      <Link href="/flights" className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to flights
      </Link>
      <FlightDetail flight={flight} />
    </div>
  )
}
