interface AirlineRankListProps {
  data: { iata: string; name: string; count: number }[]
}

export function AirlineRankList({ data }: AirlineRankListProps) {
  if (data.length === 0) return null
  const max = data[0]?.count ?? 1

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Top Airlines</h3>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={item.iata}>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-4">{i + 1}</span>
                <span className="font-mono text-xs font-bold text-blue-400">{item.iata}</span>
                <span className="text-sm text-foreground truncate max-w-[140px]">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{item.count}</span>
            </div>
            <div className="h-1 bg-muted rounded-full">
              <div
                className="h-1 bg-blue-500 rounded-full"
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
