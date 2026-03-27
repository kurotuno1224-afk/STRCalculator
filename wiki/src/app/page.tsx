import Link from 'next/link'
import { ArrowRight, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SITE } from '@/lib/constants'

/**
 * Server Component — 首页
 * 信息优先，扁平化，无背景大图
 */
export default function HomePage() {
  return (
    <div className="page-container py-16 max-w-2xl">
      {/* Hero */}
      <div className="mb-12">
        <p className="text-caption text-primary font-medium mb-3 uppercase tracking-wider">
          Star Rail
        </p>
        <h1 className="text-h1 mb-3">{SITE.name}</h1>
        <p className="text-body text-muted-foreground">{SITE.description}</p>
      </div>

      <Separator className="mb-8" />

      {/* 功能入口 */}
      <div className="flex flex-col gap-3">
        <p className="text-caption text-muted-foreground uppercase tracking-wider mb-1">
          快速导航
        </p>
        <NavEntry
          href="/characters"
          icon={<Users size={16} strokeWidth={1.5} />}
          title="角色图鉴"
          description="查看所有角色的技能、星魂、行迹与突破材料"
        />
      </div>
    </div>
  )
}

function NavEntry({
  href,
  icon,
  title,
  description,
}: {
  href: string
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Link
      href={href}
      className={[
        'group flex items-center justify-between gap-4',
        'flat-card px-4 py-3',
        'hover:border-primary/40 hover:bg-muted/30 transition-colors duration-150',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <span className="text-muted-foreground group-hover:text-primary transition-colors">
          {icon}
        </span>
        <div>
          <p className="text-body font-medium">{title}</p>
          <p className="text-caption text-muted-foreground">{description}</p>
        </div>
      </div>
      <ArrowRight
        size={16}
        className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150 flex-shrink-0"
      />
    </Link>
  )
}
