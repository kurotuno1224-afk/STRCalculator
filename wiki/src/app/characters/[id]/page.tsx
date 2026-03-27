import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, Star } from 'lucide-react'
import { fetchCharacterDetail } from '@/services/hsr-api'
import { toCharacterDetail } from '@/adapters/character-adapter'
import { Separator } from '@/components/ui/separator'
import { SkillSection } from '@/features/characters/components/skill-section'
import { EidolonSection } from '@/features/characters/components/eidolon-section'
import { TraceSection } from '@/features/characters/components/trace-section'
import { AscensionSection } from '@/features/characters/components/ascension-section'
import {
  ELEMENT_LABEL,
  PATH_LABEL,
  ELEMENT_COLOR,
} from '@/types'
import { cn } from '@/lib/utils'

interface PageProps {
  params: Promise<{ id: string }>
}

// ─── 动态元数据 ───────────────────────────────────────────────────────────

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params
  const raw = await fetchCharacterDetail(id)
  if (!raw) return { title: '角色不存在' }

  const character = toCharacterDetail(raw)
  return {
    title: character.name,
    description: `${character.name} — ${ELEMENT_LABEL[character.element]} · ${PATH_LABEL[character.path]}`,
  }
}

// ─── 页面 ─────────────────────────────────────────────────────────────────

/**
 * 角色详情页 — Server Component
 *
 * 数据流：
 *   fetchCharacterDetail(id) → toCharacterDetail(raw) → 各 Section 组件
 *
 * 页面结构：
 *   Hero（基础信息）→ 技能 → 星魂 → 行迹 → 突破材料
 */
export default async function CharacterDetailPage({ params }: PageProps) {
  const { id } = await params

  // 获取原始数据 → adapter 转换 → 统一类型（组件层不知道来源）
  const raw = await fetchCharacterDetail(id)
  if (!raw) notFound()

  const character = toCharacterDetail(raw)

  return (
    <div className="page-container py-8 max-w-4xl">
      {/* ─── 返回链接 ─────────────────────────────────────────────────── */}
      <Link
        href="/characters"
        className="inline-flex items-center gap-1 text-caption text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ChevronLeft size={14} />
        角色列表
      </Link>

      {/* ─── Hero：基础信息 ───────────────────────────────────────────── */}
      <section className="mb-8" aria-label="角色基础信息">
        <div className="flex gap-5 items-start flex-wrap sm:flex-nowrap">
          {/* 角色图片 */}
          <div
            className="relative flex-shrink-0 w-36 h-36 rounded-md flat-card overflow-hidden bg-muted"
            aria-hidden
          >
            <Image
              src={character.previewUrl || character.iconUrl}
              alt={character.name}
              fill
              unoptimized
              className="object-cover object-top"
              priority
            />
          </div>

          {/* 角色信息 */}
          <div className="flex flex-col gap-2 pt-1">
            {/* 名称 */}
            <h1 className="text-h1 leading-none">{character.name}</h1>

            {/* 稀有度星星 */}
            <div className="flex items-center gap-px" aria-label={`${character.rarity} 星角色`}>
              {Array.from({ length: character.rarity }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={cn(
                    'flex-shrink-0',
                    character.rarity === 5
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-violet-400 text-violet-400'
                  )}
                />
              ))}
            </div>

            {/* 属性 · 命途 */}
            <div className="flex items-center gap-2 text-body">
              <span
                className={cn('font-semibold', ELEMENT_COLOR[character.element])}
              >
                {ELEMENT_LABEL[character.element]}
              </span>
              <span className="text-muted-foreground" aria-hidden>
                ·
              </span>
              <span className="text-muted-foreground">
                {PATH_LABEL[character.path]}
              </span>
            </div>

            {/* 能量上限 */}
            {character.maxSp !== null && (
              <p className="text-caption text-muted-foreground">
                能量上限{' '}
                <span className="text-foreground font-medium">{character.maxSp}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─── 技能 ─────────────────────────────────────────────────────── */}
      {character.skills.length > 0 && (
        <>
          <Separator className="my-8" />
          <SkillSection skills={character.skills} />
        </>
      )}

      {/* ─── 星魂 ─────────────────────────────────────────────────────── */}
      {character.eidolons.length > 0 && (
        <>
          <Separator className="my-8" />
          <EidolonSection eidolons={character.eidolons} />
        </>
      )}

      {/* ─── 行迹 ─────────────────────────────────────────────────────── */}
      {character.traces.length > 0 && (
        <>
          <Separator className="my-8" />
          <TraceSection traces={character.traces} />
        </>
      )}

      {/* ─── 突破材料 ─────────────────────────────────────────────────── */}
      {character.ascensionPhases.length > 0 && (
        <>
          <Separator className="my-8" />
          <AscensionSection phases={character.ascensionPhases} />
        </>
      )}

      {/* 页面底部留白 */}
      <div className="h-12" />
    </div>
  )
}
