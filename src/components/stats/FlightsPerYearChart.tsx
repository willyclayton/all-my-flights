'use client'

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface FlightsPerYearChartProps {
  data: { year: number; count: number }[]
}

export function FlightsPerYearChart({ data }: FlightsPerYearChartProps) {
  if (data.length === 0) return null

  return (
    <div className="bg-card border border-border rounded-lg p-5">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Flights Per Year</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="year"
            tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'hsl(215 20% 55%)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(240 10% 8%)',
              border: '1px solid hsl(240 8% 14%)',
              borderRadius: '8px',
              color: 'hsl(210 40% 92%)',
            }}
            cursor={{ fill: 'rgba(59,130,246,0.08)' }}
          />
          <Bar dataKey="count" name="Flights" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill="#3B82F6" fillOpacity={index === data.length - 1 ? 1 : 0.7} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
