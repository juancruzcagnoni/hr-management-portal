'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Employee } from '@/types/employee'
import { AREAS } from '@/types/employee'

interface AreaBarChartProps {
  employees: Employee[]
}

const AREA_COLORS: Record<string, string> = {
  Engineering: '#3b82f6',
  HR:          '#a855f7',
  Sales:       '#f59e0b',
  Finance:     '#10b981',
  Marketing:   '#f43f5e',
}

export function AreaBarChart({ employees }: AreaBarChartProps) {
  const data = AREAS.map((area) => ({
    area,
    count: employees.filter((e) => e.area === area).length,
    fill: AREA_COLORS[area],
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Headcount by Department</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
            <XAxis
              dataKey="area"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.04)', radius: 4 }}
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '13px',
              }}
              formatter={(value) => [value ?? 0, 'Employees']}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={56} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
