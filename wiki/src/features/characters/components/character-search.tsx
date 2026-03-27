'use client'

/**
 * CharacterSearch — Client Component
 *
 * 职责：搜索框，输入后 300ms 防抖更新 URL param `q`
 * 使用本地 state 保证输入体验流畅，不依赖 useCharacterFilters（避免循环依赖）
 */

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'

export function CharacterSearch() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // 本地 state 用于即时回显，防抖后才写 URL
  const [value, setValue] = useState(searchParams.get('q') ?? '')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 从浏览器前进/后退时同步 URL 到本地 state
  useEffect(() => {
    setValue(searchParams.get('q') ?? '')
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    setValue(next)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (next.trim()) {
        params.set('q', next.trim())
      } else {
        params.delete('q')
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    }, 300)
  }

  const handleClear = () => {
    setValue('')
    if (timerRef.current) clearTimeout(timerRef.current)
    const params = new URLSearchParams(searchParams.toString())
    params.delete('q')
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <Input
      type="search"
      placeholder="搜索角色名..."
      value={value}
      onChange={handleChange}
      startIcon={<Search size={14} />}
      endIcon={
        value ? (
          <button
            onClick={handleClear}
            className="hover:text-foreground transition-colors"
            aria-label="清除搜索"
          >
            <X size={14} />
          </button>
        ) : null
      }
      className="w-full sm:w-64"
    />
  )
}
