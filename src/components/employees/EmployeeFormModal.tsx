'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { employeeSchema, type EmployeeFormValues } from '@/lib/validations/employee.schema'
import { useCreateEmployee, useUpdateEmployee } from '@/hooks/useEmployeeMutations'
import type { Employee } from '@/types/employee'
import { AREAS, SENIORITIES } from '@/types/employee'

interface EmployeeFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  employee?: Employee | null
}

export function EmployeeFormModal({ open, onOpenChange, employee }: EmployeeFormModalProps) {
  const isEdit = !!employee
  const createEmployee = useCreateEmployee()
  const updateEmployee = useUpdateEmployee()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      area: undefined,
      seniority: undefined,
      status: 'active',
      hire_date: '',
      avatar_url: null,
    },
  })

  useEffect(() => {
    if (open) {
      if (employee) {
        reset({
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          area: employee.area,
          seniority: employee.seniority,
          status: employee.status,
          hire_date: employee.hire_date,
          avatar_url: employee.avatar_url,
        })
      } else {
        reset({
          first_name: '',
          last_name: '',
          email: '',
          area: undefined,
          seniority: undefined,
          status: 'active',
          hire_date: '',
          avatar_url: null,
        })
      }
    }
  }, [open, employee, reset])

  async function onSubmit(values: EmployeeFormValues) {
    const normalized = { ...values, avatar_url: values.avatar_url ?? null }
    if (isEdit && employee) {
      await updateEmployee.mutateAsync({ id: employee.id, input: normalized })
    } else {
      await createEmployee.mutateAsync(normalized)
    }
    onOpenChange(false)
  }

  const isPending = createEmployee.isPending || updateEmployee.isPending

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" {...register('first_name')} placeholder="John" />
              {errors.first_name && (
                <p className="text-xs text-destructive">{errors.first_name.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" {...register('last_name')} placeholder="Doe" />
              {errors.last_name && (
                <p className="text-xs text-destructive">{errors.last_name.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="john.doe@company.com"
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Area</Label>
              <Select
                value={watch('area')}
                onValueChange={(v) => setValue('area', v as EmployeeFormValues['area'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  {AREAS.map((a) => (
                    <SelectItem key={a} value={a}>
                      {a}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.area && (
                <p className="text-xs text-destructive">{errors.area.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label>Seniority</Label>
              <Select
                value={watch('seniority')}
                onValueChange={(v) =>
                  setValue('seniority', v as EmployeeFormValues['seniority'])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {SENIORITIES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.seniority && (
                <p className="text-xs text-destructive">{errors.seniority.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                value={watch('status')}
                onValueChange={(v) => setValue('status', v as EmployeeFormValues['status'])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-xs text-destructive">{errors.status.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="hire_date">Hire Date</Label>
              <Input id="hire_date" type="date" {...register('hire_date')} />
              {errors.hire_date && (
                <p className="text-xs text-destructive">{errors.hire_date.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || isSubmitting}>
              {isPending ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Employee'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}