'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plane, BarChart3, Map, Settings, LayoutDashboard, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/flights', label: 'Flights', icon: Plane },
  { href: '/stats', label: 'Statistics', icon: BarChart3 },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-[280px] bg-card border-r border-border flex flex-col z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-border">
        <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center">
          <Plane className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="font-semibold text-foreground text-sm leading-none">All My Flights</div>
          <div className="text-xs text-muted-foreground mt-0.5">Personal flight log</div>
        </div>
      </div>

      {/* Add flight button */}
      <div className="px-4 py-3">
        <Link
          href="/add"
          className="flex items-center justify-center gap-2 w-full h-10 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Log Flight
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors mb-0.5',
                active
                  ? 'bg-accent text-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border">
        <p className="text-xs text-muted-foreground">Data stored locally</p>
      </div>
    </aside>
  )
}
