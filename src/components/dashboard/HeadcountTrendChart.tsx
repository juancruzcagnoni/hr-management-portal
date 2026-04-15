'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { format, subMonths, startOfMonth, parseISO } from 'date-fns'
import type { Employee } from '@/types/employee'

interface HeadcountTrendChartProps {
  employees: Employee[]
}

interface MonthPoint {
  month: string
  label: string
  hires: number
  cumulative: number
}

function buildTrendData(employees: Employee[], monthsBack = 12): MonthPoint[] {
  const now = new Date()
  const points: MonthPoint[] = []

  for (let i = monthsBack - 1; i >= 0; i--) {
    const date = subMonths(now, i)
    const monthStart = startOfMonth(date)
    const monthKey = format(monthStart, 'yyyy-MM')

    const hires = employees.filter((e) => {
      const hireMonth = format(parseISO(e.hire_date), 'yyyy-MM')
      return hireMonth === monthKey
    }).length

    points.push({
      month: monthKey,
      label: format(monthStart, 'MMM yy'),
      hires,
      cumulative: 0,
    })
  }

  // Cumulative headcount up to each month
  const totalBefore = employees.filter((e) => {
    const hireMonth = format(parseISO(e.hire_date), 'yyyy-MM')
    return hireMonth < points[0].month
  }).length

  let running = totalBefore
  for (const point of points) {
    running += point.hires
    point.cumulative = running
  }

  return points
}

export function HeadcountTrendChart({ employees }: HeadcountTrendChartProps) {
  const data = buildTrendData(employees, 12)
  const avgHires = Math.round(
    data.reduce((s, d) => s + d.hires, 0) / data.length
  )

  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Headcount Trend</CardTitle>
        <CardDescription>
          Monthly hires (bars) and cumulative headcount (line) — last 12 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
              yAxisId="left"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '13px',
              }}
              formatter={(value, name) => [
                value,
                name === 'hires' ? 'New hires' : 'Total headcount',
              ]}
            />
            <ReferenceLine
              yAxisId="left"
              y={avgHires}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="4 4"
              label={{
                value: `avg ${avgHires}`,
                position: 'insideTopLeft',
                fontSize: 10,
                fill: 'hsl(var(--muted-foreground))',
              }}
            />
            {/* New hires per month */}
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="hires"
              stroke="#0070f2"
              strokeWidth={2}
              dot={{ r: 3, fill: '#0070f2' }}
              activeDot={{ r: 5 }}
            />
            {/* Cumulative total */}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cumulative"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 3"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="mt-3 flex items-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-4 rounded bg-[#0070f2]" />
            New hires / month
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-0.5 w-4 rounded bg-[#10b981]" style={{ borderTop: '2px dashed #10b981', background: 'none' }} />
            Cumulative headcount
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-4 border-t border-dashed border-muted-foreground" />
            Monthly average
          </span>
        </div>
      </CardContent>
    </Card>
  )
}