'use client'

import { Bell, UserPlus, Pencil, Trash2, CheckCheck, X } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { useNotifications, type Notification, type NotificationType } from '@/hooks/useNotifications'
import { formatDistanceToNow } from 'date-fns'
import { cn } from '@/lib/utils'

const typeConfig: Record<NotificationType, { icon: typeof UserPlus; className: string }> = {
  created: { icon: UserPlus, className: 'text-emerald-500 bg-emerald-500/10' },
  updated: { icon: Pencil,   className: 'text-blue-500 bg-blue-500/10' },
  deleted: { icon: Trash2,   className: 'text-red-500 bg-red-500/10' },
}

function NotificationItem({ notification }: { notification: Notification }) {
  const { icon: Icon, className } = typeConfig[notification.type]

  return (
    <div className={cn(
      'flex items-start gap-3 px-3 py-2.5 transition-colors',
      !notification.read && 'bg-primary/5'
    )}>
      <div className={cn('mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full', className)}>
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm leading-snug', !notification.read && 'font-medium')}>
          {notification.message}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{notification.detail}</p>
        <p className="text-xs text-muted-foreground/70 mt-1">
          {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
        </p>
      </div>
      {!notification.read && (
        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
      )}
    </div>
  )
}

export function NotificationBell() {
  const { notifications, unreadCount, markAllRead, clearAll } = useNotifications()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Notifications"
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        onClick={markAllRead}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-80 p-0 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-border">
          <div>
            <p className="text-sm font-semibold">Notifications</p>
            {unreadCount > 0 && (
              <p className="text-xs text-muted-foreground">{unreadCount} unread</p>
            )}
          </div>
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3 w-3" />
              Clear all
            </button>
          )}
        </div>

        {/* List */}
        <div className="max-h-[360px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-muted-foreground">
              <Bell className="h-8 w-8 opacity-30" />
              <p className="text-sm">No notifications yet</p>
              <p className="text-xs opacity-70">Changes to employees will appear here</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((n) => (
                <NotificationItem key={n.id} notification={n} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="px-3 py-2">
              <button
                onClick={markAllRead}
                className="flex w-full items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all as read
              </button>
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}