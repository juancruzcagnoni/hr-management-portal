'use client'

import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import type { Employee } from '@/types/employee'
import { cn } from '@/lib/utils'

const columnHelper = createColumnHelper<Employee>()

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

interface EmployeesTableProps {
  data: Employee[]
  isLoading: boolean
  onEdit: (employee: Employee) => void
  onDelete: (employee: Employee) => void
}

export function EmployeesTable({ data, isLoading, onEdit, onDelete }: EmployeesTableProps) {
  const router = useRouter()

  const columns = [
    columnHelper.display({
      id: 'employee',
      header: 'Employee',
      cell: ({ row }) => {
        const e = row.original
        const initials = `${e.first_name[0]}${e.last_name[0]}`.toUpperCase()
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={e.avatar_url ?? undefined} alt={`${e.first_name} ${e.last_name}`} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium leading-none">
                {e.first_name} {e.last_name}
              </p>
            </div>
          </div>
        )
      },
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: (info) => (
        <span className="text-sm text-muted-foreground">{info.getValue()}</span>
      ),
    }),
    columnHelper.accessor('area', {
      header: 'Area',
      cell: (info) => (
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            areaColors[info.getValue()] ?? ''
          )}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('seniority', {
      header: 'Seniority',
      cell: (info) => (
        <span
          className={cn(
            'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
            seniorityColors[info.getValue()] ?? ''
          )}
        >
          {info.getValue()}
        </span>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) =>
        info.getValue() === 'active' ? (
          <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-300">
            Active
          </Badge>
        ) : (
          <Badge variant="secondary" className="text-muted-foreground">
            Inactive
          </Badge>
        ),
    }),
    columnHelper.accessor('hire_date', {
      header: 'Hire Date',
      cell: (info) => (
        <span className="text-sm text-muted-foreground">
          {format(new Date(info.getValue()), 'MMM d, yyyy')}
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => router.push(`/employees/${row.original.id}`)}
            title="View profile"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => onEdit(row.original)}
            title="Edit employee"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            onClick={() => onDelete(row.original)}
            title="Delete employee"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    }),
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  })

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id} className="bg-muted/40 hover:bg-muted/40">
                {hg.headers.map((header) => (
                  <TableHead key={header.id} className="font-semibold text-xs uppercase tracking-wide">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                  No employees found.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between px-1">
        <p className="text-sm text-muted-foreground">
          Showing{' '}
          <span className="font-medium">
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-medium">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              data.length
            )}
          </span>{' '}
          of <span className="font-medium">{data.length}</span> employees
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="gap-1"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="gap-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}