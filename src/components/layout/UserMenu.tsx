'use client'

import { LogOut, Settings, User, Shield } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { toast } from 'sonner'

const USER = {
  name: 'Admin User',
  email: 'admin@hrportal.com',
  role: 'HR Administrator',
  initials: 'AD',
}

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="User menu"
        className="w-full flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <Avatar className="h-7 w-7">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
            {USER.initials}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:block text-left">
          <p className="text-sm font-medium leading-none">{USER.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{USER.role}</p>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-0 overflow-hidden">
        {/* User info header */}
        <div className="px-3 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
                {USER.initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">{USER.name}</p>
              <p className="text-xs text-muted-foreground truncate">{USER.email}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <Shield className="h-3 w-3 text-primary" />
            <span className="text-xs text-primary font-medium">{USER.role}</span>
          </div>
        </div>

        {/* Menu items */}
        <div className="p-1">
          <DropdownMenuItem
            className="gap-2 cursor-pointer"
            onClick={() => toast.info('Profile settings coming soon')}
          >
            <User className="h-4 w-4 text-muted-foreground" />
            My Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="gap-2 cursor-pointer"
            onClick={() => toast.info('Settings coming soon')}
          >
            <Settings className="h-4 w-4 text-muted-foreground" />
            Settings
          </DropdownMenuItem>
        </div>

        <Separator />

        <div className="p-1">
          <DropdownMenuItem
            className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
            onClick={() => toast.error('Sign out clicked — no auth configured')}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}