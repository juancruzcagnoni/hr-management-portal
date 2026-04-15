'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { EmployeeFormModal } from '@/components/employees/EmployeeFormModal'
import {
  ArrowLeft,
  Pencil,
  Mail,
  Calendar,
  Briefcase,
  TrendingUp,
  Clock,
} from 'lucide-react'
import { format, differenceInYears, differenceInMonths } from 'date-fns'
import type { Employee } from '@/types/employee'
import { cn } from '@/lib/utils'

const areaColors: Record<string, string> = {
  Engineering: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  HR: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  Sales: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Finance: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  Marketing: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
}

const seniorityColors: Record<string, string> = {
  Junior: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  Mid: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
  Senior: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
  Lead: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
}

function formatTenure(hireDate: string): string {
  const start = new Date(hireDate)
  const now = new Date()
  const years = differenceInYears(now, start)
  const months = differenceInMonths(now, start) % 12
  if (years === 0) return `${months} month${months !== 1 ? 's' : ''}`
  if (months === 0) return `${years} year${years !== 1 ? 's' : ''}`
  return `${years} yr ${months} mo`
}

interface EmployeeProfileProps {
  employee: Employee
}

export function EmployeeProfile({ employee }: EmployeeProfileProps) {
  const router = useRouter()
  const [editOpen, setEditOpen] = useState(false)

  const initials = `${employee.first_name[0]}${employee.last_name[0]}`.toUpperCase()

  const infoCards = [
    {
      icon: Mail,
      label: 'Email Address',
      value: employee.email,
    },
    {
      icon: Calendar,
      label: 'Hire Date',
      value: format(new Date(employee.hire_date), 'MMMM d, yyyy'),
    },
    {
      icon: Clock,
      label: 'Tenure',
      value: formatTenure(employee.hire_date),
    },
    {
      icon: Briefcase,
      label: 'Department',
      value: employee.area,
    },
    {
      icon: TrendingUp,
      label: 'Seniority Level',
      value: employee.seniority,
    },
  ]

  return (
    <>
      <div className="space-y-6">
        {/* Back button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/employees')}
          className="gap-2 text-muted-foreground hover:text-foreground -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Employees
        </Button>

        {/* Profile header card */}
        <Card>
          <CardContent className="">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
              <Avatar className="h-24 w-24 border-4 border-background shadow-md">
                <AvatarImage
                  src={employee.avatar_url ?? undefined}
                  alt={`${employee.first_name} ${employee.last_name}`}
                />
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-1 flex-col items-center gap-3 sm:items-start">
                <div>
                  <h2 className="text-2xl font-bold">
                    {employee.first_name} {employee.last_name}
                  </h2>
                  <p className="text-muted-foreground">{employee.email}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {employee.status === 'active' ? (
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-muted-foreground">
                      Inactive
                    </Badge>
                  )}
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      areaColors[employee.area]
                    )}
                  >
                    {employee.area}
                  </span>
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                      seniorityColors[employee.seniority]
                    )}
                  >
                    {employee.seniority}
                  </span>
                </div>
              </div>

              <Button onClick={() => setEditOpen(true)} className="gap-2 shrink-0">
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Info cards grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {infoCards.map(({ icon: Icon, label, value }) => (
            <Card key={label}>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Icon className="h-4 w-4" />
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base font-semibold">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Employment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-muted-foreground">Employee ID</span>
              <span className="font-mono text-sm">{employee.id.slice(0, 8).toUpperCase()}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-muted-foreground">Record created</span>
              <span className="text-sm">
                {format(new Date(employee.created_at), 'MMM d, yyyy')}
              </span>
            </div>
            <Separator />
            <div className="flex items-center justify-between py-1">
              <span className="text-sm text-muted-foreground">Employment status</span>
              {employee.status === 'active' ? (
                <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Active</Badge>
              ) : (
                <Badge variant="secondary">Inactive</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <EmployeeFormModal
        open={editOpen}
        onOpenChange={setEditOpen}
        employee={employee}
      />
    </>
  )
}