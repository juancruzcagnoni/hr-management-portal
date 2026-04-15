import type { Employee } from '@/types/employee'
import { format } from 'date-fns'

const HEADERS = [
  'ID',
  'First Name',
  'Last Name',
  'Email',
  'Area',
  'Seniority',
  'Status',
  'Hire Date',
]

function escapeCell(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

export function exportEmployeesToCsv(employees: Employee[], filename = 'employees'): void {
  const rows = employees.map((e) => [
    e.id,
    e.first_name,
    e.last_name,
    e.email,
    e.area,
    e.seniority,
    e.status,
    format(new Date(e.hire_date), 'yyyy-MM-dd'),
  ])

  const csvContent = [HEADERS, ...rows]
    .map((row) => row.map(escapeCell).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}_${format(new Date(), 'yyyyMMdd_HHmm')}.csv`
  link.click()
  URL.revokeObjectURL(url)
}