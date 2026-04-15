'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Users, Building2, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { UserMenu } from './UserMenu'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Employees', href: '/employees', icon: Users },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card transition-transform duration-200 ease-in-out',
        'lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Building2 className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold leading-none">HR Portal</p>
          <p className="text-xs text-muted-foreground">Management System</p>
        </div>
        <button
          className="lg:hidden text-muted-foreground hover:text-foreground"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="space-y-1 p-4">
        <p className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Navigation
        </p>
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="absolute bottom-0 left-0 right-0 border-t border-border p-4">
        <UserMenu />
      </div>
    </aside>
  )
}
