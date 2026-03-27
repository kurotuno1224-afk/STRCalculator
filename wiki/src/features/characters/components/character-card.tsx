import Link from 'next/link'
import Image from 'next/image'
import { Star } from 'lucide-react'
import type { CharacterListItem } from '@/types'
import {
  ELEMENT_LABEL,
  PATH_LABEL,
  ELEMENT_TEXT_COLOR,
  RARITY_COLOR,
  RARITY_HOVER_BORDER,
} from '@/types'
import { cn } from '@/lib/utils'

interface CharacterCardProps {
  character: CharacterListItem
}

/**
 * Server Component — 角色列表卡片
 *
 * Phase 5 变更：
 * - 使用统一 RARITY_COLOR / RARITY_HOVER_BORDER（修复 amber-400 vs amber-500 不一致）
 * - 使用 ELEMENT_TEXT_COLOR（单一来源）
 * - hover 边框颜色根据稀有度区分（5★ amber / 4★ violet）
 * - 统一 transition-colors（由 globals.css 定义为 150ms）
 */
export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link
      href={`/characters/${character.id}`}
      className={cn(
        'group block flat-card overflow-hidden',
        'transition-colors focus-ring',
        RARITY_HOVER_BORDER[character.rarity]
      )}
    >
      {/* 角色图片 */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <Image
          src={character.iconUrl}
          alt={character.name}
          fill
          unoptimized
          className="object-cover object-top group-hover:scale-[1.04] transition-transform"
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 17vw"
        />
      </div>

      {/* 信息区 */}
      <div className="px-2 pt-1.5 pb-2 flex flex-col gap-0.5">
        {/* 稀有度星星（统一来源：RARITY_COLOR） */}
        <div className="flex gap-px">
          {Array.from({ length: character.rarity }).map((_, i) => (
            <Star
              key={i}
              size={10}
              className={cn('flex-shrink-0', RARITY_COLOR[character.rarity])}
            />
          ))}
        </div>

        {/* 角色名 */}
        <p className="text-body font-medium leading-tight truncate">
          {character.name}
        </p>

        {/* 属性 · 命途（统一来源：ELEMENT_TEXT_COLOR） */}
        <p className="text-caption text-muted-foreground flex items-center gap-1">
          <span className={cn('font-medium', ELEMENT_TEXT_COLOR[character.element])}>
            {ELEMENT_LABEL[character.element]}
          </span>
          <span aria-hidden>·</span>
          <span>{PATH_LABEL[character.path]}</span>
        </p>
      </div>
    </Link>
  )
}
