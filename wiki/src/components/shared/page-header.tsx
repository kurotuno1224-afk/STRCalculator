import { cn } from '@/lib/utils'

interface PageHeaderProps {
  title: string
  description?: string
  /** 右侧插槽（搜索框、按钮等） */
  action?: React.ReactNode
  className?: string
}

/**
 * Server Component — 统一页面标题区域
 * 字体层级：H1 / Description (caption)
 */
export function PageHeader({ title, description, action, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col gap-1 mb-6', className)}>
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-h1">{title}</h1>
          {description && (
            <p className="mt-1 text-caption text-muted-foreground">{description}</p>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    </div>
  )
}
