'use client'

import Link from 'next/link'
import { Plus, Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { QuickStats } from '@/components/dashboard/QuickStats'
import { RecentFlights } from '@/components/dashboard/RecentFlights'
import { useFlightData } from '@/hooks/useFlightData'
import { useFlightStats } from '@/hooks/useFlightStats'
import { useSettings } from '@/hooks/useSettings'

export default function DashboardPage() {
  const { flights, isLoaded } = useFlightData()
  const stats = useFlightStats(flights)
  const { settings } = useSettings()

  if (!isLoaded) {
    return (
      <div className="px-4 py-8 md:px-8 max-w-4xl mx-auto">
        <div className="h-8 bg-muted rounded animate-pulse w-48 mb-6" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (flights.length === 0) {
    return (
      <div className="px-4 py-8 md:px-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        </div>
        <div className="text-center py-24 bg-card border border-border rounded-lg">
          <Plane className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Welcome to All My Flights</h2>
          <p className="text-muted-foreground text-sm mb-8 max-w-sm mx-auto">
            Start building your personal flight log. Track every flight, see your stats, and visualize your routes on a world map.
          </p>
          <Link href="/add">
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="w-4 h-4" />
              Log your first flight
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 md:px-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <Link href="/add">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            Log Flight
          </Button>
        </Link>
      </div>

      <QuickStats stats={stats} distanceUnit={settings.distanceUnit} />

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentFlights flights={flights} />

        <div>
          <h2 className="font-semibold text-foreground mb-3">Quick Stats</h2>
          <div className="bg-card border border-border rounded-lg divide-y divide-border">
            {[
              { label: 'Countries visited', value: stats.uniqueCountries },
              { label: 'Unique airlines', value: stats.uniqueAirlines },
              { label: 'Aircraft types', value: stats.uniqueAircraftTypes },
              { label: 'Avg. flight duration', value: `${Math.floor(stats.avgDurationMinutes / 60)}h ${stats.avgDurationMinutes % 60}m` },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center px-4 py-3">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-semibold text-foreground">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
