export type Area = 'Engineering' | 'HR' | 'Sales' | 'Finance' | 'Marketing'
export type Seniority = 'Junior' | 'Mid' | 'Senior' | 'Lead'
export type EmployeeStatus = 'active' | 'inactive'

export interface Employee {
  id: string
  first_name: string
  last_name: string
  email: string
  area: Area
  seniority: Seniority
  status: EmployeeStatus
  hire_date: string
  avatar_url: string | null
  created_at: string
}

export type CreateEmployeeInput = Omit<Employee, 'id' | 'created_at'>
export type UpdateEmployeeInput = Partial<CreateEmployeeInput>

export interface EmployeeFilters {
  search: string
  area: Area | 'all'
  seniority: Seniority | 'all'
  status: EmployeeStatus | 'all'
}

export const AREAS: Area[] = ['Engineering', 'HR', 'Sales', 'Finance', 'Marketing']
export const SENIORITIES: Seniority[] = ['Junior', 'Mid', 'Senior', 'Lead']
export const STATUSES: EmployeeStatus[] = ['active', 'inactive']
