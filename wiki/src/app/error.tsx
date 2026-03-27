'use client'

// error.tsx 必须是 Client Component
import { useEffect } from 'react'
import { ErrorState } from '@/components/shared/error-state'

interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * 全局 error boundary — Client Component
 * Next.js App Router 要求
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // 可接入 Sentry 等错误上报
    console.error('[GlobalError]', error)
  }, [error])

  return (
    <div className="page-container py-16">
      <ErrorState
        title="页面加载失败"
        description={
          error.message.length < 100
            ? error.message
            : '发生未知错误，请刷新页面重试'
        }
        onRetry={reset}
      />
    </div>
  )
}
