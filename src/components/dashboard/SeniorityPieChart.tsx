'use client'

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Employee } from '@/types/employee'
import { SENIORITIES } from '@/types/employee'

interface SeniorityPieChartProps {
  employees: Employee[]
}

const COLORS: Record<string, string> = {
  Junior: '#94a3b8',
  Mid:    '#06b6d4',
  Senior: '#6366f1',
  Lead:   '#f97316',
}

export function SeniorityPieChart({ employees }: SeniorityPieChartProps) {
  const data = SENIORITIES.map((s) => ({
    name: s,
    value: employees.filter((e) => e.seniority === s).length,
    fill: COLORS[s],
  })).filter((d) => d.value > 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Seniority Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
            />
            <Tooltip
              contentStyle={{
                background: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '13px',
              }}
              formatter={(value) => [value ?? 0, 'Employees']}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span style={{ fontSize: 13, color: 'hsl(var(--muted-foreground))' }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}