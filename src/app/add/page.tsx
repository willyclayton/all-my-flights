import { FlightForm } from '@/components/forms/FlightForm'
import { AppShell } from '@/components/layout/AppShell'
import { Plane } from 'lucide-react'

export default function AddFlightPage() {
  return (
    <AppShell>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
            <Plane className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Log a Flight</h1>
            <p className="text-sm text-muted-foreground">Add a new flight to your log</p>
          </div>
        </div>
        <FlightForm mode="add" />
      </div>
    </AppShell>
  )
}
