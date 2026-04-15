'use client'

import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import type { EmployeeFilters } from '@/types/employee'
import { AREAS, SENIORITIES } from '@/types/employee'

interface EmployeeFiltersProps {
  filters: EmployeeFilters
  onChange: (filters: EmployeeFilters) => void
}

const areaLabel = (v: EmployeeFilters['area']) => (v === 'all' ? 'All Areas' : v)
const seniorityLabel = (v: EmployeeFilters['seniority']) => (v === 'all' ? 'All Levels' : v)
const statusLabel = (v: EmployeeFilters['status']) =>
  v === 'all' ? 'All Status' : v === 'active' ? 'Active' : 'Inactive'

export function EmployeeFiltersBar({ filters, onChange }: EmployeeFiltersProps) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.area !== 'all' ||
    filters.seniority !== 'all' ||
    filters.status !== 'all'

  function reset() {
    onChange({ search: '', area: 'all', seniority: 'all', status: 'all' })
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative min-w-[240px] flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name or email…"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="pl-9"
        />
      </div>

      <Select
        value={filters.area}
        onValueChange={(v) => onChange({ ...filters, area: v as EmployeeFilters['area'] })}
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue>{areaLabel(filters.area)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Areas</SelectItem>
          {AREAS.map((a) => (
            <SelectItem key={a} value={a}>
              {a}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.seniority}
        onValueChange={(v) =>
          onChange({ ...filters, seniority: v as EmployeeFilters['seniority'] })
        }
      >
        <SelectTrigger className="w-full sm:w-[160px]">
          <SelectValue>{seniorityLabel(filters.seniority)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Levels</SelectItem>
          {SENIORITIES.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={filters.status}
        onValueChange={(v) => onChange({ ...filters, status: v as EmployeeFilters['status'] })}
      >
        <SelectTrigger className="w-full sm:w-[140px]">
          <SelectValue>{statusLabel(filters.status)}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={reset} className="gap-1.5 text-muted-foreground">
          <X className="h-3.5 w-3.5" />
          Clear filters
        </Button>
      )}
    </div>
  )
}