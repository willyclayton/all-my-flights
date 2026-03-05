'use client'

import Link from 'next/link'
import { Plus, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatCard } from '@/components/stats/StatCard'
import { FlightsPerYearChart } from '@/components/stats/FlightsPerYearChart'
import { SeatClassPieChart } from '@/components/stats/SeatClassPieChart'
import { AirlineRankList } from '@/components/stats/AirlineRankList'
import { AircraftRankList } from '@/components/stats/AircraftRankList'
import { TopRoutesTable } from '@/components/stats/TopRoutesTable'
import { useFlightData } from '@/hooks/useFlightData'
import { useFlightStats } from '@/hooks/useFlightStats'
import { useSettings } from '@/hooks/useSettings'
import { formatMinutes } from '@/lib/duration'
import { format } from 'date-fns'

export default function StatsPage() {
  const { flights, isLoaded } = useFlightData()
  const stats = useFlightStats(flights)
  const { settings } = useSettings()

  const distance = settings.distanceUnit === 'miles'
    ? Math.round(stats.totalDistanceKm * 0.621371)
    : stats.totalDistanceKm

  if (!isLoaded) {
    return (
      <div className="px-4 py-8 md:px-8 max-w-4xl mx-auto">
        <div className="h-8 bg-muted rounded animate-pulse w-48 mb-6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />)}
        </div>
      </div>
    )
  }

  if (flights.length === 0) {
    return (
      <div className="px-4 py-8 md:px-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-6">Statistics</h1>
        <div className="text-center py-24 bg-card border border-border rounded-lg">
          <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-30" />
          <h2 className="text-lg font-semibold text-foreground mb-2">No data yet</h2>
          <p className="text-sm text-muted-foreground mb-6">Log some flights to see your statistics.</p>
          <Link href="/add"><Button className="bg-blue-600 hover:bg-blue-700">Log a flight</Button></Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 md:px-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Statistics</h1>
        <Link href="/add">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
            <Plus className="w-4 h-4" />
            Log Flight
          </Button>
        </Link>
      </div>

      {/* Headline stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <StatCard label="Total Flights" value={stats.totalFlights} />
        <StatCard label="Time in Air" value={formatMinutes(stats.totalMinutes)} />
        <StatCard label={`Distance (${settings.distanceUnit})`} value={distance.toLocaleString()} />
        <StatCard label="Unique Airports" value={stats.uniqueAirports} />
        <StatCard label="Countries" value={stats.uniqueCountries} />
        <StatCard label="Airlines" value={stats.uniqueAirlines} />
        <StatCard label="Aircraft Types" value={stats.uniqueAircraftTypes} />
        <StatCard label="Avg Duration" value={formatMinutes(stats.avgDurationMinutes)} />
      </div>

      {/* Longest / Shortest */}
      {(stats.longestFlight || stats.shortestFlight) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {stats.longestFlight && (
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Longest Flight</div>
              <div className="font-mono font-bold text-foreground">
                {stats.longestFlight.departureAirport} → {stats.longestFlight.arrivalAirport}
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">
                {formatMinutes(stats.longestFlight.duration)} · {format(new Date(stats.longestFlight.departureDateTime), 'MMM yyyy')}
              </div>
            </div>
          )}
          {stats.shortestFlight && (
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Shortest Flight</div>
              <div className="font-mono font-bold text-foreground">
                {stats.shortestFlight.departureAirport} → {stats.shortestFlight.arrivalAirport}
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">
                {formatMinutes(stats.shortestFlight.duration)} · {format(new Date(stats.shortestFlight.departureDateTime), 'MMM yyyy')}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <FlightsPerYearChart data={stats.flightsPerYear} />
        <SeatClassPieChart data={stats.seatClassBreakdown} />
      </div>

      {/* Rankings & Routes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <AirlineRankList data={stats.airlineRanking} />
        <AircraftRankList data={stats.aircraftRanking} />
      </div>

      <TopRoutesTable data={stats.topRoutes} />
    </div>
  )
}
