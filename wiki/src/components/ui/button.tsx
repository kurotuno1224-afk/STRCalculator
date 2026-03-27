import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // base — 扁平化：无阴影，统一边框，过渡平滑
  [
    'inline-flex items-center justify-center gap-1.5',
    'text-body font-medium whitespace-nowrap',
    'border transition-colors duration-150',
    'disabled:pointer-events-none disabled:opacity-40',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
  ],
  {
    variants: {
      variant: {
        /** 主操作 */
        default:
          'bg-primary text-primary-foreground border-primary hover:bg-primary/88',
        /** 次要操作 */
        outline:
          'bg-transparent text-foreground border-border hover:bg-muted',
        /** 无背景 */
        ghost:
          'bg-transparent text-foreground border-transparent hover:bg-muted',
        /** 浅色背景 */
        secondary:
          'bg-muted text-foreground border-border hover:bg-muted/70',
        /** 危险操作 */
        destructive:
          'bg-destructive text-destructive-foreground border-destructive hover:bg-destructive/88',
        /** 链接风格 */
        link:
          'bg-transparent text-primary border-transparent underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        default: 'h-9 px-4 py-2 rounded',
        sm: 'h-7 px-3 py-1 rounded text-caption',
        lg: 'h-11 px-6 py-2.5 rounded-md',
        icon: 'h-9 w-9 rounded',
        'icon-sm': 'h-7 w-7 rounded',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
