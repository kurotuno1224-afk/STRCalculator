import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * 骨架屏：用 animate-pulse 模拟 loading 占位
 * 扁平化风格：无圆角夸张，无发光
 */
function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded bg-muted',
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
