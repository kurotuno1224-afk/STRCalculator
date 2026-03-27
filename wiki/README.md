# HSR Wiki — 星穹铁道资料站

非官方的星穹铁道角色资料站。数据来源于公开 API，前端使用 Next.js App Router 构建，支持角色列表浏览（属性/命途/稀有度筛选）与角色详情查阅（技能、星魂、行迹、突破材料）。

---

## 技术栈

| 层 | 技术 |
|---|---|
| 框架 | [Next.js 15](https://nextjs.org/) — App Router + Server Components |
| 语言 | TypeScript (strict mode) |
| 样式 | TailwindCSS v3 — 扁平化 design tokens |
| 组件 | 自实现 shadcn/ui 兼容组件（Button / Badge / Card / Input / Skeleton 等） |
| 图标 | [lucide-react](https://lucide.dev/) |
| 数据 | [Mar-7th/StarRailRes](https://github.com/Mar-7th/StarRailRes) — GitHub 公开静态 JSON |

---

## 如何运行

```bash
# 进入 wiki 子目录
cd wiki

# 安装依赖（需要 pnpm）
pnpm install

# 本地开发（http://localhost:3000）
pnpm dev

# 生产构建
pnpm build && pnpm start
```

> Node.js 要求：>= 18.17.0

---

## 目录结构

```
wiki/src/
├── app/                         # Next.js App Router 路由入口（仅页面/布局/状态文件）
│   ├── layout.tsx               # 根布局：Header + Footer
│   ├── page.tsx                 # 首页
│   ├── not-found.tsx            # 全局 404
│   ├── loading.tsx              # 全局 loading UI
│   ├── error.tsx                # 全局 error boundary（Client Component）
│   └── characters/
│       ├── page.tsx             # 角色列表页（服务端筛选）
│       ├── loading.tsx          # 列表页骨架屏
│       └── [id]/
│           ├── page.tsx         # 角色详情页
│           ├── loading.tsx      # 详情页骨架屏
│           └── not-found.tsx    # 角色 404
│
├── components/                  # 通用 UI 组件（与业务无关）
│   ├── ui/                      # 基础原子组件：Button / Badge / Card / Input / Skeleton / Separator
│   ├── layout/                  # Header / Nav / Footer
│   └── shared/                  # 跨页面复用：PageHeader / SectionTitle / EmptyState / ErrorState / LoadingGrid
│
├── features/                    # 业务功能模块（按领域划分）
│   └── characters/
│       ├── components/          # 角色相关展示组件
│       │   ├── character-card.tsx
│       │   ├── character-grid.tsx
│       │   ├── character-search.tsx    # Client Component
│       │   ├── character-filters.tsx   # Client Component
│       │   ├── skill-section.tsx
│       │   ├── eidolon-section.tsx
│       │   ├── trace-section.tsx
│       │   └── ascension-section.tsx
│       └── hooks/
│           └── use-character-filters.ts  # URL 筛选状态管理
│
├── services/                    # 外部数据请求层（唯一允许写外部 URL 的位置）
│   └── hsr-api.ts
│
├── adapters/                    # 数据转换层（原始 API → 统一领域类型）
│   └── character-adapter.ts
│
├── types/                       # 统一领域类型 + UI 展示常量
│   └── index.ts
│
├── lib/                         # 工具函数与站点常量
│   ├── utils.ts                 # cn() 工具函数
│   └── constants.ts             # 站点名、导航链接等
│
└── styles/
    └── globals.css              # CSS 变量（design tokens）+ 全局样式
```

---

## 数据层设计

本项目严格遵循三层数据架构，确保后端可替换性：

```
外部 API / 自建后端
       │
       ▼
┌─────────────────────────────────────────────────┐
│  services/hsr-api.ts                            │
│  · 整个项目唯一允许出现外部 URL 的文件           │
│  · 只负责 fetch，不做任何字段映射               │
│  · 定义原始 API 类型（RawCharacter 等）         │
│  · 使用 Next.js fetch cache（revalidate: 3600） │
└───────────────────┬─────────────────────────────┘
                    │ Raw types
                    ▼
┌─────────────────────────────────────────────────┐
│  adapters/character-adapter.ts                  │
│  · 接收原始类型，输出统一领域类型               │
│  · 原始 API 字段名（snake_case 等）只在此出现   │
│  · 图片 URL 通过 IMG_BASE_URL 常量构建          │
│  · 切换后端时只修改此文件的映射逻辑             │
└───────────────────┬─────────────────────────────┘
                    │ Unified domain types
                    ▼
┌─────────────────────────────────────────────────┐
│  types/index.ts                                 │
│  · CharacterListItem / CharacterDetail          │
│  · Skill / Eidolon / TraceNode / AscensionPhase │
│  · UI 展示常量（ELEMENT_LABEL 等）              │
│  · 组件和页面只能消费这里的类型                 │
└───────────────────┬─────────────────────────────┘
                    │
                    ▼
           features/ + app/（页面与组件）
```

### 关键约束

| 约束 | 目的 |
|------|------|
| 外部 URL 只能出现在 `hsr-api.ts` | 换后端只改一处 |
| 原始字段名（如 `simple_desc`）只能出现在 `adapters/` | 后端换字段名不影响组件 |
| 组件只消费 `types/index.ts` 的类型 | 组件与数据源完全解耦 |
| Server Component 优先，Client Component 最小化 | 减少客户端 JS，SEO 友好 |

---

## Adapter 设计说明

`adapters/character-adapter.ts` 实现了两个核心函数：

### `toCharacterListItem(raw: RawCharacter): CharacterListItem`

将角色列表 JSON 的单个条目转换为列表卡片所需类型：
- `raw.element` → `normalizeElement()` → `CharacterElement`（含未知值兜底）
- `raw.path` → `normalizePath()` → `CharacterPath`
- `raw.icon` → `toImgUrl()` → 完整图片 URL（`IMG_BASE_URL + path`）

### `toCharacterDetail(raw: RawCharacterDetail): CharacterDetail`

将聚合的原始数据转换为详情页所需类型：

```
RawCharacterDetail {
  character,      → toCharacterListItem()
  skills[],       → toSkill()        每项独立转换
  eidolons[],     → toEidolon()
  traces[],       → toTraceNode()    含材料和属性加成
  ascensionMaterials[], → toAscensionPhases()
  items{},        → toMaterialCost() 用于材料名/图标查找
}
```

属性值格式化（百分比 vs 绝对值）集中在 `formatStatValue()` 函数，以 `PCT_STAT_TYPES` 集合判断是否需要 × 100。

---

## 如何替换为自建后端 API

当你准备把数据源换成自建后端时，只需修改以下两个文件，**所有组件和页面零改动**：

### Step 1 — 修改 `services/hsr-api.ts`

```ts
// 修改前：Mar-7th/StarRailRes
const BASE_RAW = 'https://raw.githubusercontent.com/Mar-7th/StarRailRes/master'
const BASE_INDEX = `${BASE_RAW}/index_new/cn`
export const IMG_BASE_URL = BASE_RAW

// 修改后：自建后端
const BASE_API = 'https://api.your-domain.com/v1'
export const IMG_BASE_URL = 'https://cdn.your-domain.com'

// 同时调整 fetch 函数：
export async function fetchCharacterList(): Promise<RawCharacter[]> {
  return fetchJson(`${BASE_API}/characters`)
  // 原来：return Object.values(await fetchJson(`${BASE_INDEX}/characters.json`))
}

export async function fetchCharacterDetail(id: string): Promise<RawCharacterDetail | null> {
  // 如果自建后端已聚合数据，可以简化为单个请求：
  return fetchJson(`${BASE_API}/characters/${id}`)
}
```

### Step 2 — 修改 `adapters/character-adapter.ts`

如果你的后端返回的字段结构与现在不同，只需更新映射逻辑：

```ts
// 示例：后端将 element 改为 elementType，path 改为 pathType
export function toCharacterListItem(raw: RawCharacter): CharacterListItem {
  return {
    id: raw.id,
    name: raw.name,
    rarity: normalizeRarity(raw.rarity),
    element: normalizeElement(raw.elementType),  // 字段名已变
    path: normalizePath(raw.pathType),           // 字段名已变
    iconUrl: toImgUrl(raw.icon),
    previewUrl: toImgUrl(raw.preview),
  }
}
```

同时更新 `Raw*` interface 的字段定义以匹配新后端的实际响应结构。

> 如果你的后端在单个端点返回完整的角色详情（而非需要聚合多个 JSON 文件），`fetchCharacterDetail` 可以简化为单次请求，`RawCharacterDetail` 的结构也可相应简化。

---

## UI 设计规范

本项目遵循扁平化设计原则，适合"游戏资料站 + 数据工具站"定位：

| 规则 | 实现 |
|------|------|
| 唯一主色 | Indigo（`hsl(239 84% 60%)`）|
| 边框 | 统一 1px，`hsl(var(--border))` |
| 圆角 | 4px（默认）/ 6px（卡片）|
| 阴影 | 全部禁用（tailwind.config.ts 中 boxShadow 均为 `none`）|
| 发光效果 | 不使用 |
| 过渡 | 统一 150ms |
| 字体层级 | H1（1.875rem/700）/ H2（1.375rem/600）/ Body（0.875rem）/ Caption（0.75rem）|
| 颜色来源 | `types/index.ts` 集中定义，禁止在组件中硬编码颜色 |

---

## 未来扩展建议

### 功能扩展

| 功能 | 实现建议 |
|------|---------|
| 遗器图鉴 | 新增 `features/relics/`，复用同一数据层架构 |
| 光锥图鉴 | 新增 `features/light-cones/`，adapter 模式完全一致 |
| 角色对比 | Client Component，消费已有 `CharacterDetail` 类型 |
| 技能参数展开 | 在 `skill-section.tsx` 中实现 `#1[i]%` 占位符替换逻辑 |
| 多语言（i18n） | 替换 `ELEMENT_LABEL` / `PATH_LABEL` 为 i18n key，接入 `next-intl` |

### 性能优化

| 方向 | 方案 |
|------|------|
| 减少首屏请求 | `generateStaticParams` 预渲染热门角色页面 |
| 图片优化 | 将 `unoptimized` 改为自托管图片代理，启用 Next.js Image Optimization |
| 数据缓存 | 接入 Redis，将 `revalidate: 3600` 改为按需 revalidate |
| Bundle 分析 | `pnpm build` 后用 `@next/bundle-analyzer` 检查包体积 |

### 架构演进

| 阶段 | 内容 |
|------|------|
| 当前 | 静态 JSON（GitHub raw CDN），ISR 缓存 1h |
| 下一步 | 自建 REST API，adapter 零改动切换 |
| 更远 | 接入 CMS（如 Sanity / Contentful）存储攻略内容 |
