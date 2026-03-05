export type SeatClass = 'economy' | 'premium_economy' | 'business' | 'first'

export interface Flight {
  id: string
  flightNumber: string
  airline: string
  airlineName?: string
  aircraftType: string
  aircraftName?: string
  tailNumber?: string
  departureAirport: string
  arrivalAirport: string
  departureDateTime: string
  arrivalDateTime: string
  duration: number
  distance?: number
  seatNumber?: string
  seatClass: SeatClass
  notes?: string
  departureGate?: string
  arrivalGate?: string
  bookingReference?: string
}

export interface Airport {
  iata: string
  name: string
  city: string
  country: string
  lat: number
  lng: number
}

export interface Airline {
  iata: string
  name: string
  country?: string
}

export interface AircraftType {
  icao: string
  name: string
  manufacturer: string
}

export interface UserSettings {
  distanceUnit: 'km' | 'miles'
  theme: 'dark' | 'light' | 'system'
}

export interface FlightStats {
  totalFlights: number
  totalMinutes: number
  totalDistanceKm: number
  uniqueAirports: number
  uniqueCountries: number
  uniqueAirlines: number
  uniqueAircraftTypes: number
  flightsPerYear: { year: number; count: number }[]
  seatClassBreakdown: { name: string; value: number; color: string }[]
  airlineRanking: { name: string; iata: string; count: number }[]
  aircraftRanking: { name: string; icao: string; count: number }[]
  topRoutes: { route: string; dep: string; arr: string; count: number }[]
  longestFlight: Flight | null
  shortestFlight: Flight | null
  avgDurationMinutes: number
}
