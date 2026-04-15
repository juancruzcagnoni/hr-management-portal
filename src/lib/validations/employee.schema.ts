import { z } from 'zod'

export const employeeSchema = z.object({
  first_name: z.string().min(1, 'First name is required').max(100),
  last_name:  z.string().min(1, 'Last name is required').max(100),
  email:      z.email('Invalid email address'),
  area: z.enum(['Engineering', 'HR', 'Sales', 'Finance', 'Marketing'], {
    error: 'Area is required',
  }),
  seniority: z.enum(['Junior', 'Mid', 'Senior', 'Lead'], {
    error: 'Seniority is required',
  }),
  status: z.enum(['active', 'inactive'], {
    error: 'Status is required',
  }),
  hire_date:  z.string().min(1, 'Hire date is required'),
  avatar_url: z.url().nullable().optional(),
})

export type EmployeeFormValues = z.infer<typeof employeeSchema>