import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 text-caption font-medium border whitespace-nowrap',
  {
    variants: {
      variant: {
        default:
          'bg-primary-muted text-primary border-primary/20 rounded',
        secondary:
          'bg-muted text-muted-foreground border-border rounded',
        outline:
          'bg-transparent text-foreground border-border rounded',
        /** 稀有度金色 */
        gold:
          'bg-amber-50 text-amber-700 border-amber-200 rounded',
        /** 稀有度紫色 */
        purple:
          'bg-violet-50 text-violet-700 border-violet-200 rounded',
      },
      size: {
        default: 'px-2 py-0.5',
        sm: 'px-1.5 py-px text-[0.6875rem]',
        lg: 'px-2.5 py-1 text-body',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, size, className }))} {...props} />
  )
}

export { Badge, badgeVariants }
