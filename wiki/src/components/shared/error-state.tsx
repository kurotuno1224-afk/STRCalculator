import { AlertCircle, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ErrorStateProps {
  title?: string
  description?: string
  /** Next.js error.tsx 传入的 reset 函数 */
  onRetry?: () => void
  className?: string
}

/**
 * 错误状态组件 — 扁平化，无大图
 * 用于 error.tsx boundary 和内联错误展示
 */
export function ErrorState({
  title = '加载失败',
  description = '获取数据时发生错误，请稍后重试',
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-20 px-4 text-center',
        className
      )}
    >
      <AlertCircle
        className="mb-4 text-destructive"
        size={32}
        strokeWidth={1.5}
        aria-hidden
      />
      <h3 className="text-h3 text-foreground mb-1">{title}</h3>
      <p className="text-caption text-muted-foreground max-w-xs">{description}</p>
      {onRetry && (
        <Button
          variant="outline"
          size="sm"
          className="mt-4 gap-1.5"
          onClick={onRetry}
        >
          <RotateCcw size={14} />
          重试
        </Button>
      )}
    </div>
  )
}
