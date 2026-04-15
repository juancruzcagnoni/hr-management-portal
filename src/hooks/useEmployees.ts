'use client'

import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Employee, EmployeeFilters } from '@/types/employee'

export const employeeKeys = {
  all: ['employees'] as const,
  lists: () => [...employeeKeys.all, 'list'] as const,
  list: (filters: EmployeeFilters) => [...employeeKeys.lists(), filters] as const,
  details: () => [...employeeKeys.all, 'detail'] as const,
  detail: (id: string) => [...employeeKeys.details(), id] as const,
}

async function fetchEmployees(filters: EmployeeFilters): Promise<Employee[]> {
  let query = supabase.from('employees').select('*')

  if (filters.search) {
    query = query.or(
      `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
    )
  }

  if (filters.area !== 'all') {
    query = query.eq('area', filters.area)
  }

  if (filters.seniority !== 'all') {
    query = query.eq('seniority', filters.seniority)
  }

  if (filters.status !== 'all') {
    query = query.eq('status', filters.status)
  }

  query = query.order('created_at', { ascending: false })

  const { data, error } = await query
  if (error) throw new Error(error.message)
  return data as Employee[]
}

async function fetchEmployee(id: string): Promise<Employee> {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw new Error(error.message)
  return data as Employee
}

async function fetchAllEmployees(): Promise<Employee[]> {
  const { data, error } = await supabase
    .from('employees')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return data as Employee[]
}

export function useEmployees(filters: EmployeeFilters) {
  return useQuery({
    queryKey: employeeKeys.list(filters),
    queryFn: () => fetchEmployees(filters),
  })
}

export function useEmployee(id: string) {
  return useQuery({
    queryKey: employeeKeys.detail(id),
    queryFn: () => fetchEmployee(id),
    enabled: !!id,
  })
}

export function useAllEmployees() {
  return useQuery({
    queryKey: employeeKeys.all,
    queryFn: fetchAllEmployees,
  })
}
