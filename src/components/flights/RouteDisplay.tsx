import { getAirport } from '@/lib/airports'

interface RouteDisplayProps {
  dep: string
  arr: string
  size?: 'sm' | 'md' | 'lg'
}

export function RouteDisplay({ dep, arr, size = 'md' }: RouteDisplayProps) {
  const depAirport = getAirport(dep)
  const arrAirport = getAirport(arr)

  const iataSize = size === 'lg' ? 'text-4xl' : size === 'md' ? 'text-2xl' : 'text-base'
  const citySize = size === 'lg' ? 'text-sm' : 'text-xs'

  return (
    <div className="flex items-center gap-3">
      <div className="text-center">
        <div className={`font-mono font-bold text-foreground ${iataSize}`}>{dep}</div>
        {depAirport && <div className={`text-muted-foreground ${citySize} truncate max-w-[80px]`}>{depAirport.city}</div>}
      </div>
      <div className="flex-1 flex items-center gap-1 min-w-[40px]">
        <div className="flex-1 h-px bg-border" />
        <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className="text-muted-foreground flex-shrink-0">
          <path d="M0 4h12M9 1l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="text-center">
        <div className={`font-mono font-bold text-foreground ${iataSize}`}>{arr}</div>
        {arrAirport && <div className={`text-muted-foreground ${citySize} truncate max-w-[80px]`}>{arrAirport.city}</div>}
      </div>
    </div>
  )
}
