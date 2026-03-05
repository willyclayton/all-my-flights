'use client'

import * as React from 'react'
import { ComposableMap, Geographies, Geography, Marker, Line, ZoomableGroup } from 'react-simple-maps'
import { getAirport } from '@/lib/airports'
import type { Flight } from '@/types'

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

interface FlightMapProps {
  flights: Flight[]
}

export function FlightMap({ flights }: FlightMapProps) {
  const routes = React.useMemo(() => {
    const seen = new Set<string>()
    const result: { from: [number, number]; to: [number, number]; key: string }[] = []
    for (const f of flights) {
      const key = [f.departureAirport, f.arrivalAirport].sort().join('-')
      if (seen.has(key)) continue
      seen.add(key)
      const dep = getAirport(f.departureAirport)
      const arr = getAirport(f.arrivalAirport)
      if (dep && arr) {
        result.push({
          from: [dep.lng, dep.lat],
          to: [arr.lng, arr.lat],
          key,
        })
      }
    }
    return result
  }, [flights])

  const visitedAirports = React.useMemo(() => {
    const codes = new Set<string>()
    flights.forEach(f => { codes.add(f.departureAirport); codes.add(f.arrivalAirport) })
    return Array.from(codes)
      .map(iata => getAirport(iata))
      .filter((a): a is NonNullable<typeof a> => a !== undefined)
  }, [flights])

  return (
    <div className="w-full bg-[#0A0A0F] border border-border rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
      <ComposableMap
        projection="geoMercator"
        style={{ width: '100%', height: '100%' }}
      >
        <ZoomableGroup zoom={1} minZoom={0.5} maxZoom={8}>
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#161620"
                  stroke="#232336"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: { fill: '#1a1a2e', outline: 'none' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Flight route arcs */}
          {routes.map(route => (
            <Line
              key={route.key}
              from={route.from}
              to={route.to}
              stroke="#3B82F6"
              strokeWidth={1.5}
              strokeOpacity={0.7}
              strokeLinecap="round"
            />
          ))}

          {/* Airport markers */}
          {visitedAirports.map(airport => (
            <Marker key={airport.iata} coordinates={[airport.lng, airport.lat]}>
              <circle r={3} fill="#3B82F6" fillOpacity={0.9} stroke="#0A0A0F" strokeWidth={1} />
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}
