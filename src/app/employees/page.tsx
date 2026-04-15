'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { UserPlus, Download } from 'lucide-react'
import { EmployeeFiltersBar } from '@/components/employees/EmployeeFilters'
import { EmployeesTable } from '@/components/employees/EmployeesTable'
import { EmployeesTableSkeleton } from '@/components/employees/EmployeesTableSkeleton'
import { EmployeeFormModal } from '@/components/employees/EmployeeFormModal'
import { DeleteConfirmDialog } from '@/components/employees/DeleteConfirmDialog'
import { useEmployees } from '@/hooks/useEmployees'
import { exportEmployeesToCsv } from '@/lib/exportCsv'
import type { Employee, EmployeeFilters } from '@/types/employee'

const defaultFilters: EmployeeFilters = {
  search: '',
  area: 'all',
  seniority: 'all',
  status: 'all',
}

export default function EmployeesPage() {
  const [filters, setFilters] = useState<EmployeeFilters>(defaultFilters)
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const { data = [], isLoading, isError } = useEmployees(filters)

  function handleEdit(employee: Employee) {
    setSelectedEmployee(employee)
    setFormOpen(true)
  }

  function handleDelete(employee: Employee) {
    setSelectedEmployee(employee)
    setDeleteOpen(true)
  }

  function handleAddNew() {
    setSelectedEmployee(null)
    setFormOpen(true)
  }

  function handleExport() {
    exportEmployeesToCsv(data, 'employees')
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Team Members</h2>
          <p className="text-muted-foreground">
            {isLoading ? 'Loading…' : `${data.length} employees found`}
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            disabled={isLoading || data.length === 0}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={handleAddNew} className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>
      </div>

      <EmployeeFiltersBar filters={filters} onChange={setFilters} />

      {isError ? (
        <div className="flex h-48 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="text-sm text-destructive">
            Failed to load employees. Please check your Supabase connection.
          </p>
        </div>
      ) : isLoading ? (
        <EmployeesTableSkeleton />
      ) : (
        <EmployeesTable
          data={data}
          isLoading={false}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <EmployeeFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        employee={selectedEmployee}
      />

      <DeleteConfirmDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        employee={selectedEmployee}
      />
    </div>
  )
}