import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import type { Employee } from '@/types/employee'
import { cn } from '@/lib/utils'

const areaColors: Record<string, string> = {
  Engineering: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  HR:          'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  Sales:       'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  Finance:     'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  Marketing:   'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300',
}

interface RecentHiresProps {
  employees: Employee[]
}

export function RecentHires({ employees }: RecentHiresProps) {
  const recent = [...employees]
    .sort((a, b) => new Date(b.hire_date).getTime() - new Date(a.hire_date).getTime())
    .slice(0, 5)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-semibold">Recent Hires</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">No employees yet.</p>
        ) : (
          recent.map((employee) => {
            const initials = `${employee.first_name[0]}${employee.last_name[0]}`.toUpperCase()
            return (
              <div key={employee.id} className="flex items-center gap-3">
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarImage src={employee.avatar_url ?? undefined} />
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {employee.first_name} {employee.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{employee.email}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span
                    className={cn(
                      'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium',
                      areaColors[employee.area]
                    )}
                  >
                    {employee.area}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(employee.hire_date), 'MMM d, yyyy')}
                  </span>
                </div>
              </div>
            )
          })
        )}
      </CardContent>
    </Card>
  )
}