'use client'

import { useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useQueryClient } from '@tanstack/react-query'
import { employeeKeys } from './useEmployees'
import type { Employee } from '@/types/employee'

export type NotificationType = 'created' | 'updated' | 'deleted'

export interface Notification {
  id: string
  type: NotificationType
  message: string
  detail: string
  timestamp: Date
  read: boolean
}

function buildMessage(
  type: NotificationType,
  employee: Partial<Employee>
): { message: string; detail: string } {
  const name =
    employee.first_name && employee.last_name
      ? `${employee.first_name} ${employee.last_name}`
      : 'An employee'

  switch (type) {
    case 'created':
      return {
        message: `${name} joined the team`,
        detail: [employee.area, employee.seniority].filter(Boolean).join(' · '),
      }
    case 'updated':
      return {
        message: `${name}'s profile was updated`,
        detail: [employee.area, employee.seniority].filter(Boolean).join(' · '),
      }
    case 'deleted':
      return {
        message: `${name} was removed`,
        detail: 'Employee record deleted',
      }
  }
}

const MAX_NOTIFICATIONS = 20

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const queryClient = useQueryClient()
  // Prevent double-subscribe in StrictMode
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null)

  const unreadCount = notifications.filter((n) => !n.read).length

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  function clearAll() {
    setNotifications([])
  }

  useEffect(() => {
    if (channelRef.current) return

    const channel = supabase
      .channel('hr-portal-employees')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'employees' },
        (payload) => {
          const employee = payload.new as Employee
          const { message, detail } = buildMessage('created', employee)
          setNotifications((prev) =>
            [
              {
                id: crypto.randomUUID(),
                type: 'created' as const,
                message,
                detail,
                timestamp: new Date(),
                read: false,
              },
              ...prev,
            ].slice(0, MAX_NOTIFICATIONS)
          )
          queryClient.invalidateQueries({ queryKey: employeeKeys.all })
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'employees' },
        (payload) => {
          const employee = payload.new as Employee
          const { message, detail } = buildMessage('updated', employee)
          setNotifications((prev) =>
            [
              {
                id: crypto.randomUUID(),
                type: 'updated' as const,
                message,
                detail,
                timestamp: new Date(),
                read: false,
              },
              ...prev,
            ].slice(0, MAX_NOTIFICATIONS)
          )
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'employees' },
        (payload) => {
          const employee = payload.old as Partial<Employee>
          const { message, detail } = buildMessage('deleted', employee)
          setNotifications((prev) =>
            [
              {
                id: crypto.randomUUID(),
                type: 'deleted' as const,
                message,
                detail,
                timestamp: new Date(),
                read: false,
              },
              ...prev,
            ].slice(0, MAX_NOTIFICATIONS)
          )
        }
      )
      .subscribe()

    channelRef.current = channel

    return () => {
      supabase.removeChannel(channel)
      channelRef.current = null
    }
  }, [queryClient])

  return { notifications, unreadCount, markAllRead, clearAll }
}