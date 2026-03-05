import { Plane, Clock, Globe, Map } from 'lucide-react'
import { formatMinutes } from '@/lib/duration'
import type { FlightStats } from '@/types'

interface QuickStatsProps {
  stats: FlightStats
  distanceUnit: 'km' | 'miles'
}

export function QuickStats({ stats, distanceUnit }: QuickStatsProps) {
  const distance = distanceUnit === 'miles'
    ? Math.round(stats.totalDistanceKm * 0.621371)
    : stats.totalDistanceKm

  const items = [
    {
      icon: Plane,
      label: 'Total Flights',
      value: stats.totalFlights.toLocaleString(),
      color: 'text-blue-400',
      bg: 'bg-blue-600/10',
    },
    {
      icon: Clock,
      label: 'Time in Air',
      value: formatMinutes(stats.totalMinutes),
      color: 'text-green-400',
      bg: 'bg-green-600/10',
    },
    {
      icon: Globe,
      label: 'Distance',
      value: `${distance.toLocaleString()} ${distanceUnit}`,
      color: 'text-purple-400',
      bg: 'bg-purple-600/10',
    },
    {
      icon: Map,
      label: 'Airports Visited',
      value: stats.uniqueAirports.toLocaleString(),
      color: 'text-orange-400',
      bg: 'bg-orange-600/10',
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map(({ icon: Icon, label, value, color, bg }) => (
        <div key={label} className="bg-card border border-border rounded-lg p-4">
          <div className={`w-8 h-8 rounded-md ${bg} flex items-center justify-center mb-3`}>
            <Icon className={`w-4 h-4 ${color}`} />
          </div>
          <div className="text-2xl font-bold text-foreground">{value}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
        </div>
      ))}
    </div>
  )
}
