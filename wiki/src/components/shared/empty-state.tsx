import { SearchX } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title?: string
  description?: string
  /** 额外操作（如清除筛选按钮） */
  action?: React.ReactNode
  className?: string
}

/**
 * 空状态组件 — 扁平化，无插图，信息优先
 */
export function EmptyState({
  title = '暂无数据',
  description = '当前条件下没有找到任何内容',
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-20 px-4 text-center',
        className
      )}
    >
      <SearchX
        className="mb-4 text-muted-foreground"
        size={32}
        strokeWidth={1.5}
        aria-hidden
      />
      <h3 className="text-h3 text-foreground mb-1">{title}</h3>
      <p className="text-caption text-muted-foreground max-w-xs">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
