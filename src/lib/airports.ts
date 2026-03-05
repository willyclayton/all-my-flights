import type { Airport } from '@/types'
import airportsData from '@/data/airports.json'

const airports = airportsData as Airport[]
const airportMap = new Map<string, Airport>(airports.map(a => [a.iata, a]))

export function getAirport(iata: string): Airport | undefined {
  return airportMap.get(iata.toUpperCase())
}

export function searchAirports(query: string, limit = 10): Airport[] {
  if (!query || query.length < 1) return []
  const q = query.toLowerCase()
  const results: Airport[] = []
  for (const airport of airports) {
    if (
      airport.iata.toLowerCase().startsWith(q) ||
      airport.city.toLowerCase().includes(q) ||
      airport.name.toLowerCase().includes(q) ||
      airport.country.toLowerCase().includes(q)
    ) {
      results.push(airport)
      if (results.length >= limit) break
    }
  }
  return results
}
