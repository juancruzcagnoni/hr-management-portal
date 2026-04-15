import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

function KPICardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-9 rounded-lg" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20" />
        <Skeleton className="mt-2 h-3 w-40" />
      </CardContent>
    </Card>
  )
}

function ChartSkeleton({ height = 'h-[300px]' }: { height?: string }) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3 w-72" />
      </CardHeader>
      <CardContent>
        <div className={`${height} w-full rounded-lg overflow-hidden`}>
          {/* Simulated chart bars / shimmer area */}
          <div className="flex h-full items-end gap-3 px-2 pb-6">
            {[60, 85, 45, 70, 55, 90, 40, 75, 65, 80, 50, 70].map((h, i) => (
              <Skeleton
                key={i}
                className="flex-1 rounded-t"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RecentHiresSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-32" />
      </CardHeader>
      <CardContent className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-full shrink-0" />
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-3.5 w-36" />
              <Skeleton className="h-3 w-48" />
            </div>
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <KPICardSkeleton key={i} />
        ))}
      </div>

      {/* Trend chart */}
      <ChartSkeleton height="h-[260px]" />

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartSkeleton height="h-[260px]" />
        <ChartSkeleton height="h-[260px]" />
      </div>

      {/* Recent hires */}
      <div className="max-w-xl">
        <RecentHiresSkeleton />
      </div>
    </div>
  )
}