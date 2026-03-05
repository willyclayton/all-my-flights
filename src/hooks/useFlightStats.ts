'use client'

import { useMemo } from 'react'
import type { Flight, FlightStats } from '@/types'
import { getAirport } from '@/lib/airports'

const CLASS_COLORS: Record<string, string> = {
  economy: '#6366F1',
  premium_economy: '#8B5CF6',
  business: '#3B82F6',
  first: '#EAB308',
}

export function useFlightStats(flights: Flight[]): FlightStats {
  return useMemo(() => {
    if (flights.length === 0) {
      return {
        totalFlights: 0,
        totalMinutes: 0,
        totalDistanceKm: 0,
        uniqueAirports: 0,
        uniqueCountries: 0,
        uniqueAirlines: 0,
        uniqueAircraftTypes: 0,
        flightsPerYear: [],
        seatClassBreakdown: [],
        airlineRanking: [],
        aircraftRanking: [],
        topRoutes: [],
        longestFlight: null,
        shortestFlight: null,
        avgDurationMinutes: 0,
      }
    }

    const airports = new Set<string>()
    const countries = new Set<string>()
    const airlineCount: Record<string, { name: string; count: number }> = {}
    const aircraftCount: Record<string, { name: string; count: number }> = {}
    const yearCount: Record<number, number> = {}
    const classCount: Record<string, number> = {}
    const routeCount: Record<string, { dep: string; arr: string; count: number }> = {}

    let totalMinutes = 0
    let totalDistanceKm = 0
    let longestFlight: Flight | null = null
    let shortestFlight: Flight | null = null

    for (const f of flights) {
      airports.add(f.departureAirport)
      airports.add(f.arrivalAirport)

      const depAirport = getAirport(f.departureAirport)
      const arrAirport = getAirport(f.arrivalAirport)
      if (depAirport) countries.add(depAirport.country)
      if (arrAirport) countries.add(arrAirport.country)

      if (!airlineCount[f.airline]) {
        airlineCount[f.airline] = { name: f.airlineName || f.airline, count: 0 }
      }
      airlineCount[f.airline].count++

      if (!aircraftCount[f.aircraftType]) {
        aircraftCount[f.aircraftType] = { name: f.aircraftName || f.aircraftType, count: 0 }
      }
      aircraftCount[f.aircraftType].count++

      const year = new Date(f.departureDateTime).getFullYear()
      yearCount[year] = (yearCount[year] || 0) + 1

      classCount[f.seatClass] = (classCount[f.seatClass] || 0) + 1

      const routeKey = `${f.departureAirport}-${f.arrivalAirport}`
      if (!routeCount[routeKey]) {
        routeCount[routeKey] = { dep: f.departureAirport, arr: f.arrivalAirport, count: 0 }
      }
      routeCount[routeKey].count++

      totalMinutes += f.duration
      totalDistanceKm += f.distance || 0

      if (!longestFlight || f.duration > longestFlight.duration) longestFlight = f
      if (!shortestFlight || f.duration < shortestFlight.duration) shortestFlight = f
    }

    const flightsPerYear = Object.entries(yearCount)
      .map(([year, count]) => ({ year: Number(year), count }))
      .sort((a, b) => a.year - b.year)

    const seatClassBreakdown = Object.entries(classCount).map(([name, value]) => ({
      name: name.replace('_', ' '),
      value,
      color: CLASS_COLORS[name] || '#6366F1',
    }))

    const airlineRanking = Object.entries(airlineCount)
      .map(([iata, { name, count }]) => ({ iata, name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    const aircraftRanking = Object.entries(aircraftCount)
      .map(([icao, { name, count }]) => ({ icao, name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    const topRoutes = Object.entries(routeCount)
      .map(([route, { dep, arr, count }]) => ({ route, dep, arr, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return {
      totalFlights: flights.length,
      totalMinutes,
      totalDistanceKm,
      uniqueAirports: airports.size,
      uniqueCountries: countries.size,
      uniqueAirlines: Object.keys(airlineCount).length,
      uniqueAircraftTypes: Object.keys(aircraftCount).length,
      flightsPerYear,
      seatClassBreakdown,
      airlineRanking,
      aircraftRanking,
      topRoutes,
      longestFlight,
      shortestFlight,
      avgDurationMinutes: Math.round(totalMinutes / flights.length),
    }
  }, [flights])
}
