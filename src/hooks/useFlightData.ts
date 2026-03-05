'use client'

import { useLocalStorage } from './useLocalStorage'
import type { Flight } from '@/types'

export function useFlightData() {
  const [flights, setFlights, isLoaded] = useLocalStorage<Flight[]>('amf_flights', [])

  const addFlight = (flight: Flight) => {
    setFlights(prev => [flight, ...prev])
  }

  const updateFlight = (id: string, updates: Partial<Flight>) => {
    setFlights(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f))
  }

  const deleteFlight = (id: string) => {
    setFlights(prev => prev.filter(f => f.id !== id))
  }

  const getFlight = (id: string): Flight | undefined => {
    return flights.find(f => f.id === id)
  }

  const importFlights = (incoming: Flight[], mode: 'replace' | 'merge' = 'merge') => {
    if (mode === 'replace') {
      setFlights(incoming)
    } else {
      setFlights(prev => {
        const existingIds = new Set(prev.map(f => f.id))
        const newFlights = incoming.filter(f => !existingIds.has(f.id))
        return [...prev, ...newFlights]
      })
    }
  }

  const sortedFlights = [...flights].sort(
    (a, b) => new Date(b.departureDateTime).getTime() - new Date(a.departureDateTime).getTime()
  )

  return { flights: sortedFlights, isLoaded, addFlight, updateFlight, deleteFlight, getFlight, importFlights, setFlights }
}
