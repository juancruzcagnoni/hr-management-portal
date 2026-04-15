'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { Employee, CreateEmployeeInput, UpdateEmployeeInput } from '@/types/employee'
import { employeeKeys } from './useEmployees'
import { toast } from 'sonner'

async function createEmployee(input: CreateEmployeeInput) {
  const { data, error } = await supabase.from('employees').insert(input).select().single()
  if (error) throw new Error(error.message)
  return data
}

async function updateEmployee({ id, input }: { id: string; input: UpdateEmployeeInput }) {
  const { data, error } = await supabase
    .from('employees')
    .update(input)
    .eq('id', id)
    .select()
    .single()
  if (error) throw new Error(error.message)
  return data
}

async function deleteEmployee(id: string) {
  const { error } = await supabase.from('employees').delete().eq('id', id)
  if (error) throw new Error(error.message)
}

// Helper: update every cached list query that contains this employee
function patchAllListCaches(
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (prev: Employee[]) => Employee[]
) {
  queryClient.setQueriesData<Employee[]>(
    { queryKey: employeeKeys.lists(), exact: false },
    (prev) => (prev ? updater(prev) : prev)
  )
}

export function useCreateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: (newEmployee) => {
      // Add to all list caches optimistically
      patchAllListCaches(queryClient, (prev) => [newEmployee as Employee, ...prev])
      toast.success('Employee created successfully')
    },
    onError: (error: Error) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all })
      toast.error(`Failed to create employee: ${error.message}`)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all })
    },
  })
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateEmployee,
    onMutate: async ({ id, input }) => {
      // Cancel in-flight fetches to avoid race conditions
      await queryClient.cancelQueries({ queryKey: employeeKeys.lists() })
      await queryClient.cancelQueries({ queryKey: employeeKeys.detail(id) })

      // Snapshot current state for rollback
      const previousLists = queryClient.getQueriesData<Employee[]>({
        queryKey: employeeKeys.lists(),
      })
      const previousDetail = queryClient.getQueryData<Employee>(employeeKeys.detail(id))

      // Optimistically update all list caches
      patchAllListCaches(queryClient, (prev) =>
        prev.map((e) => (e.id === id ? { ...e, ...input } : e))
      )

      // Optimistically update the detail cache
      if (previousDetail) {
        queryClient.setQueryData<Employee>(employeeKeys.detail(id), {
          ...previousDetail,
          ...input,
        })
      }

      return { previousLists, previousDetail }
    },
    onError: (error: Error, { id }, ctx) => {
      // Roll back on failure
      if (ctx?.previousLists) {
        for (const [key, data] of ctx.previousLists) {
          queryClient.setQueryData(key, data)
        }
      }
      if (ctx?.previousDetail) {
        queryClient.setQueryData(employeeKeys.detail(id), ctx.previousDetail)
      }
      toast.error(`Failed to update employee: ${error.message}`)
    },
    onSuccess: () => {
      toast.success('Employee updated successfully')
    },
    onSettled: (_data, _err, { id }) => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all })
      queryClient.invalidateQueries({ queryKey: employeeKeys.detail(id) })
    },
  })
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteEmployee,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: employeeKeys.lists() })

      // Snapshot for rollback
      const previousLists = queryClient.getQueriesData<Employee[]>({
        queryKey: employeeKeys.lists(),
      })

      // Optimistically remove from all list caches
      patchAllListCaches(queryClient, (prev) => prev.filter((e) => e.id !== id))

      return { previousLists }
    },
    onError: (error: Error, _id, ctx) => {
      if (ctx?.previousLists) {
        for (const [key, data] of ctx.previousLists) {
          queryClient.setQueryData(key, data)
        }
      }
      toast.error(`Failed to delete employee: ${error.message}`)
    },
    onSuccess: () => {
      toast.success('Employee deleted successfully')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: employeeKeys.all })
    },
  })
}