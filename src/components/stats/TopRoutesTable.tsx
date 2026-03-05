import { getAirport } from '@/lib/airports'

interface TopRoutesTableProps {
  data: { route: string; dep: string; arr: string; count: number }[]
}

export function TopRoutesTable({ data }: TopRoutesTableProps) {
  if (data.length === 0) return null

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Top Routes</h3>
      <div className="space-y-1">
        {data.map((item, i) => {
          const depAirport = getAirport(item.dep)
          const arrAirport = getAirport(item.arr)
          return (
            <div key={item.route} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0">
              <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-foreground">{item.dep}</span>
                  <span className="text-muted-foreground">→</span>
                  <span className="font-mono font-bold text-sm text-foreground">{item.arr}</span>
                </div>
                {depAirport && arrAirport && (
                  <div className="text-xs text-muted-foreground">{depAirport.city} → {arrAirport.city}</div>
                )}
              </div>
              <span className="text-sm font-semibold text-foreground">{item.count}×</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
