import Link from 'next/link'
import { Nav } from './nav'
import { SITE } from '@/lib/constants'

/**
 * Server Component — 顶部导航栏
 * 扁平化：底部 1px border，无阴影，无背景模糊
 */
export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="page-container flex h-12 items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-150"
        >
          {/* 文字 Logo — 后续可替换为 SVG */}
          <span className="text-body font-bold tracking-tight">{SITE.name}</span>
          <span className="text-caption text-muted-foreground hidden sm:inline">
            星穹铁道资料站
          </span>
        </Link>

        {/* 主导航 */}
        <Nav />
      </div>
    </header>
  )
}
