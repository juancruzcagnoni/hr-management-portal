'use client'

import { useMemo } from 'react'
import { Users, UserCheck, TrendingDown, Clock } from 'lucide-react'
import { differenceInYears } from 'date-fns'
import { KPICard } from '@/components/dashboard/KPICard'
import { AreaBarChart } from '@/components/dashboard/AreaBarChart'
import { SeniorityPieChart } from '@/components/dashboard/SeniorityPieChart'
import { RecentHires } from '@/components/dashboard/RecentHires'
import { HeadcountTrendChart } from '@/components/dashboard/HeadcountTrendChart'
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton'
import { useAllEmployees } from '@/hooks/useEmployees'

export default function DashboardPage() {
  const { data: employees = [], isLoading, isError } = useAllEmployees()

  const kpis = useMemo(() => {
    const total = employees.length
    const active = employees.filter((e) => e.status === 'active').length
    const inactive = employees.filter((e) => e.status === 'inactive').length
    const rotationRate = total > 0 ? ((inactive / total) * 100).toFixed(1) : '0.0'
    const now = new Date()
    const avgTenure =
      total > 0
        ? (
            employees.reduce(
              (sum, e) => sum + differenceInYears(now, new Date(e.hire_date)),
              0
            ) / total
          ).toFixed(1)
        : '0.0'
    return { total, active, rotationRate, avgTenure }
  }, [employees])

  if (isLoading) return <DashboardSkeleton />

  if (isError) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5">
        <p className="text-sm text-destructive">
          Failed to load dashboard data. Please check your Supabase connection.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Headcount"
          value={kpis.total}
          subtitle="All employees on record"
          icon={Users}
          trend="neutral"
        />
        <KPICard
          title="Active Employees"
          value={kpis.active}
          subtitle={`${kpis.total > 0 ? ((kpis.active / kpis.total) * 100).toFixed(0) : 0}% of workforce`}
          icon={UserCheck}
          trend="up"
        />
        <KPICard
          title="Turnover Rate"
          value={`${kpis.rotationRate}%`}
          subtitle="Inactive over total"
          icon={TrendingDown}
          trend={parseFloat(kpis.rotationRate) > 20 ? 'down' : 'neutral'}
        />
        <KPICard
          title="Avg. Tenure"
          value={`${kpis.avgTenure} yrs`}
          subtitle="Average years with company"
          icon={Clock}
          trend="neutral"
        />
      </div>

      {/* Trend chart — full width */}
      <HeadcountTrendChart employees={employees} />

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <AreaBarChart employees={employees} />
        <SeniorityPieChart employees={employees} />
      </div>

      {/* Recent hires */}
      <div className="w-full lg:max-w-xl">
        <RecentHires employees={employees} />
      </div>
    </div>
  )
}