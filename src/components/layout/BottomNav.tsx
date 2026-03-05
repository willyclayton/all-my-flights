'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Plane, BarChart3, Map, Settings, LayoutDashboard } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/flights', label: 'Flights', icon: Plane },
  { href: '/stats', label: 'Stats', icon: BarChart3 },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border flex items-center z-40 md:hidden">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href || (href !== '/' && pathname.startsWith(href))
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-col items-center justify-center flex-1 h-full gap-1 text-xs transition-colors',
              active ? 'text-blue-400' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="w-5 h-5" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
