import { Skeleton } from '@/components/ui/skeleton'

export function EmployeesTableSkeleton() {
  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="bg-muted/40 px-4 py-3 flex items-center gap-4 border-b border-border">
          {[140, 200, 100, 90, 80, 100].map((w, i) => (
            <Skeleton key={i} className="h-3" style={{ width: w }} />
          ))}
        </div>

        {/* Data rows */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="px-4 py-3.5 flex items-center gap-4 border-b border-border last:border-0"
          >
            {/* Avatar + name */}
            <div className="flex items-center gap-3 w-[140px] shrink-0">
              <Skeleton className="h-9 w-9 rounded-full shrink-0" />
              <Skeleton className="h-3.5 w-24" />
            </div>
            {/* Email */}
            <Skeleton className="h-3 w-[200px]" />
            {/* Area badge */}
            <Skeleton className="h-5 w-[100px] rounded-full" />
            {/* Seniority badge */}
            <Skeleton className="h-5 w-[90px] rounded-full" />
            {/* Status badge */}
            <Skeleton className="h-5 w-[80px] rounded-full" />
            {/* Hire date */}
            <Skeleton className="h-3 w-[100px]" />
            {/* Actions */}
            <div className="ml-auto flex gap-1">
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
              <Skeleton className="h-8 w-8 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-1">
        <Skeleton className="h-4 w-52" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-24 rounded-md" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16 rounded-md" />
        </div>
      </div>
    </div>
  )
}