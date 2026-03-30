'use client'

/**
 * Phase 5: 转为 Client Component 以支持 usePathname 激活态检测
 * 体积极小（仅 4 个链接），对 bundle 影响可忽略
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/lib/constants'
import { cn } from '@/lib/utils'

export function Nav() {
  const pathname = usePathname()

  return (
    <nav aria-label="主导航">
      <ul className="flex items-center gap-1" role="list">
        {NAV_LINKS.map((link) => {
          const isActive = pathname.startsWith(link.href)

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'inline-flex items-center px-3 py-1.5 rounded text-body font-medium transition-colors',
                  isActive
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
