'use client'

import { use } from 'react'
import { useEmployee } from '@/hooks/useEmployees'
import { EmployeeProfile } from '@/components/profile/EmployeeProfile'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function EmployeeDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const { data: employee, isLoading, isError } = useEmployee(id)

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-9 w-40" />
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <Skeleton className="h-24 w-24 rounded-full" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-64" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24" />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !employee) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5">
        <div className="flex flex-col items-center gap-2 text-center">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <p className="font-medium text-destructive">Employee not found</p>
          <p className="text-sm text-muted-foreground">
            This employee may have been deleted or the ID is invalid.
          </p>
        </div>
      </div>
    )
  }

  return <EmployeeProfile employee={employee} />
}