import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** 左侧图标（通常是 lucide-react 图标，大小 16px） */
  startIcon?: React.ReactNode
  /** 右侧图标 */
  endIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {startIcon && (
          <span className="absolute left-3 flex items-center text-muted-foreground pointer-events-none">
            {startIcon}
          </span>
        )}
        <input
          type={type}
          className={cn(
            // 扁平化：1px border，无阴影，聚焦只用 outline
            'h-9 w-full rounded border border-border bg-background px-3 py-2',
            'text-body text-foreground placeholder:text-muted-foreground',
            'transition-colors duration-150',
            'hover:border-foreground/30',
            'focus:outline-none focus:border-primary',
            'disabled:cursor-not-allowed disabled:opacity-40',
            startIcon && 'pl-9',
            endIcon && 'pr-9',
            className
          )}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <span className="absolute right-3 flex items-center text-muted-foreground pointer-events-none">
            {endIcon}
          </span>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
