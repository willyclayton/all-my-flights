'use client'

import * as React from 'react'
import { Download, Upload, Trash2, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useFlightData } from '@/hooks/useFlightData'
import { useSettings } from '@/hooks/useSettings'
import { exportToFile, parseImportFile } from '@/lib/storage'

export default function SettingsPage() {
  const { flights, isLoaded, importFlights, setFlights } = useFlightData()
  const { settings, updateSettings } = useSettings()
  const [importMode, setImportMode] = React.useState<'merge' | 'replace'>('merge')
  const fileRef = React.useRef<HTMLInputElement>(null)
  const [status, setStatus] = React.useState('')

  const handleExport = () => {
    exportToFile(flights)
    setStatus('Exported successfully!')
    setTimeout(() => setStatus(''), 3000)
  }

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      const imported = await parseImportFile(file)
      importFlights(imported, importMode)
      setStatus(`Imported ${imported.length} flights!`)
    } catch {
      setStatus('Error: invalid file')
    }
    setTimeout(() => setStatus(''), 4000)
    e.target.value = ''
  }

  const handleClearData = () => {
    if (confirm('Delete ALL flights? This cannot be undone.')) {
      setFlights([])
      setStatus('All data cleared.')
      setTimeout(() => setStatus(''), 3000)
    }
  }

  return (
    <div className="px-4 py-8 md:px-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
      </div>

      {status && (
        <div className="bg-blue-600/10 border border-blue-600/30 text-blue-400 text-sm rounded-lg px-4 py-3 mb-6">
          {status}
        </div>
      )}

      {/* Preferences */}
      <section className="bg-card border border-border rounded-lg p-6 mb-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Distance Unit</div>
              <div className="text-xs text-muted-foreground">Used throughout the app</div>
            </div>
            <Select value={settings.distanceUnit} onValueChange={(v) => updateSettings({ distanceUnit: v as 'km' | 'miles' })}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="km">Kilometers</SelectItem>
                <SelectItem value="miles">Miles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Data */}
      <section className="bg-card border border-border rounded-lg p-6 mb-4">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Data</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-foreground">Total Flights</div>
              <div className="text-xs text-muted-foreground">Stored in your browser</div>
            </div>
            <span className="text-sm font-mono font-bold text-foreground">{isLoaded ? flights.length : '—'}</span>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-border">
            <div>
              <div className="text-sm font-medium text-foreground">Export Data</div>
              <div className="text-xs text-muted-foreground">Download as JSON file</div>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport} className="gap-2" disabled={!isLoaded || flights.length === 0}>
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>

          <div className="py-3 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-sm font-medium text-foreground">Import Data</div>
                <div className="text-xs text-muted-foreground">Load from JSON file</div>
              </div>
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} className="gap-2">
                <Upload className="w-4 h-4" />
                Import
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Mode:</span>
              <Select value={importMode} onValueChange={(v) => setImportMode(v as 'merge' | 'replace')}>
                <SelectTrigger className="w-32 h-7 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="merge">Merge</SelectItem>
                  <SelectItem value="replace">Replace all</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <input type="file" accept=".json" ref={fileRef} onChange={handleImport} className="hidden" />
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <section className="bg-card border border-destructive/30 rounded-lg p-6">
        <h2 className="text-sm font-semibold text-destructive uppercase tracking-wider mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-foreground">Clear All Data</div>
            <div className="text-xs text-muted-foreground">Permanently delete all flights</div>
          </div>
          <Button variant="destructive" size="sm" onClick={handleClearData} className="gap-2" disabled={!isLoaded || flights.length === 0}>
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>
      </section>

      <p className="text-xs text-muted-foreground text-center mt-6">
        All data is stored locally in your browser. No account needed.
      </p>
    </div>
  )
}
