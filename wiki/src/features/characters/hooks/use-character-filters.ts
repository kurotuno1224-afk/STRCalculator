'use client'

/**
 * useCharacterFilters
 *
 * 职责：管理角色列表页的筛选状态（存储于 URL query params）
 *
 * 设计原则：
 * - 状态存 URL，刷新/分享链接均可保留筛选条件
 * - 只负责更新 URL，不持有角色数据
 * - 服务端页面读取 searchParams 做实际过滤
 */

import { useCallback, useTransition } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import type { CharacterElement, CharacterPath, CharacterRarity } from '@/types'

export interface ActiveFilters {
  q: string
  element: CharacterElement | ''
  path: CharacterPath | ''
  rarity: CharacterRarity | ''
}

export function useCharacterFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // 从 URL 中读取当前筛选状态
  const rawRarity = searchParams.get('rarity')
  const filters: ActiveFilters = {
    q: searchParams.get('q') ?? '',
    element: (searchParams.get('element') ?? '') as CharacterElement | '',
    path: (searchParams.get('path') ?? '') as CharacterPath | '',
    rarity: (rawRarity === '4' ? 4 : rawRarity === '5' ? 5 : '') as CharacterRarity | '',
  }

  /** 直接设置某个 param 的值（空字符串表示删除该 param） */
  const setParam = useCallback(
    (key: keyof ActiveFilters, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      })
    },
    [router, pathname, searchParams]
  )

  /**
   * 切换单选筛选（再次点击同值则取消）
   * 适用于 element / path / rarity
   */
  const toggleFilter = useCallback(
    (key: Exclude<keyof ActiveFilters, 'q'>, value: string) => {
      const current = searchParams.get(key) ?? ''
      setParam(key, current === value ? '' : value)
    },
    [searchParams, setParam]
  )

  /** 清除所有筛选条件 */
  const clearAll = useCallback(() => {
    startTransition(() => {
      router.push(pathname, { scroll: false })
    })
  }, [router, pathname])

  const hasActiveFilters = Boolean(
    filters.q || filters.element || filters.path || filters.rarity
  )

  return {
    filters,
    setParam,
    toggleFilter,
    clearAll,
    hasActiveFilters,
    isPending,
  }
}
