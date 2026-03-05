import type { Flight } from '@/types'
import { format } from 'date-fns'

export function exportToFile(flights: Flight[]): void {
  const data = JSON.stringify({ version: 1, flights }, null, 2)
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `all-my-flights-${format(new Date(), 'yyyy-MM-dd')}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function parseImportFile(file: File): Promise<Flight[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string
        const parsed = JSON.parse(text)
        const flights: Flight[] = Array.isArray(parsed)
          ? parsed
          : Array.isArray(parsed.flights)
          ? parsed.flights
          : []
        resolve(flights)
      } catch {
        reject(new Error('Invalid JSON file'))
      }
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
    reader.readAsText(file)
  })
}
