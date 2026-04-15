'use client'

import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { NotificationBell } from './NotificationBell'

const pageTitles: Record<string, { title: string; description: string }> = {
  '/dashboard': { title: 'Dashboard', description: 'Overview of your workforce metrics' },
  '/employees': { title: 'Employees', description: 'Manage your team members' },
}

function getPageMeta(pathname: string) {
  if (pathname.match(/^\/employees\/[^/]+$/)) {
    return { title: 'Employee Profile', description: 'View and manage employee details' }
  }
  return pageTitles[pathname] ?? { title: 'HR Portal', description: '' }
}

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname()
  const { title, description } = getPageMeta(pathname)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 sm:px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center gap-3">
        {/* Hamburger — only on mobile */}
        <button
          className="lg:hidden text-muted-foreground hover:text-foreground"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-lg font-semibold leading-none">{title}</h1>
          {description && (
            <p className="mt-0.5 text-sm text-muted-foreground hidden sm:block">{description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <NotificationBell />
      </div>
    </header>
  )
}
