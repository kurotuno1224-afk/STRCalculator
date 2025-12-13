# STRCalculator

团队统一环境的 React + TypeScript 项目模板（Vite），集成 Tailwind CSS v4 与 React Router v7。  
2025 Q1 起，前端源码已迁移至 `client/` 并完成一次“结构治理”，目标是：clone 后可直接运行、层次清晰、便于长期演进。

---

## 最近一次整理内容

- **入口与配置**：`index.html`、`vite.config.ts`、`tsconfig*.json` 均指向 `client/`，`main.tsx` 以 React Router `Routes` 渲染 `routes/root.tsx` 与首页 `routes/index.tsx`。
- **目录分层**：建立 `client/components|hooks|lib|types|styles|assets|routes` 等子目录，空目录用 `.gitkeep` 持续保留，便于扩展。
- **样式整合**：旧版 `App.css` / `index.css` 合并为 `client/styles/global.css`，含 Tailwind base、全局排版与首页动效。
- **示例清理**：移除 Vite 初始 demo（`App.tsx`、logo 资源等），保留最小静态欢迎页，确保 `pnpm dev` / `pnpm build` 可验收。

---

## 技术栈 / 依赖

- Runtime: Node.js（由 mise 统一）
- Package Manager: pnpm（由 mise 统一）
- Build Tool: Vite
- UI: React + TypeScript
- Router: React Router v7
- Styling: Tailwind CSS v4
- UI Components（可选）: shadcn/ui

---

## 目录约定（顶层）

- `client/`：前端源码（React + Vite 入口）
- `pnpm-workspace.yaml`：pnpm 安装策略（允许必要构建脚本，如 esbuild）
- `mise.toml`：项目工具链版本（Node / pnpm）
- `pnpm-lock.yaml`：依赖锁文件（必须提交）

---

## client/ 分层 & 骨架

```
client
├── main.tsx               # 前端入口，挂载 React Router，统一引入全局样式
├── routes/
│   ├── root.tsx           # 根布局（头部 / footer / <Outlet />）
│   └── index.tsx          # 首页：静态欢迎文 + CSS 动画
├── components/            # 通用 UI 组件；暂为空，按需填充
├── hooks/                 # 自定义 React hooks
├── types/                 # TypeScript 类型定义、接口契约
├── lib/                   # 纯函数、工具模块
├── styles/
│   └── global.css         # Tailwind 引导 + 全局/动效样式
└── assets/                # 静态资源（图标、插画等）
```

> 其他目录以 `.gitkeep` 占位，表示结构约定；添加文件时可删除 `.gitkeep`。

### 各层职责说明
- `routes/`：页面级组件，建议 1 文件 1 路由；`root.tsx` 承担应用壳，`index.tsx` 为当前可验收首页。
- `components/`：跨页面复用的 UI 颗粒，如表单、卡片、导航等。
- `hooks/`：业务或跨页面的自定义 hook（数据轮询、媒体 query、表单状态等）。
- `lib/`：与 React 解耦的工具/纯函数（格式化、计算逻辑、API SDK 封装）。
- `types/`：集中声明接口、枚举、DTO，供 routes/components/lib 共享。
- `styles/`：全局或通用样式，结合 Tailwind 原子类使用；若后续引入 CSS Modules/SCSS，可在此约定命名。
- `assets/`：静态资源（图片、字体等）；若无需要可保持空目录。

---

## 环境要求

- Git
- mise（用于统一 Node / pnpm 版本）
- pnpm（会由 mise 安装，不建议自行全局安装不同版本）
- （推荐）VS Code

> 说明：你需要能通过 SSH 访问代码仓库（GitHub/GitLab 需将你的 SSH 公钥添加到账号）。

---

## 组员上手（推荐流程）

### 1) Clone 仓库
```bash
git clone <REPO_SSH_URL>
cd STRCalculator
```

### 2) 安装统一工具链
```bash
mise install
```

### 3) 安装依赖
```bash
pnpm install
```

### 4) 启动开发服务器
```bash
pnpm dev
```

> 若需自定义 host / port，可附加 `-- --host 0.0.0.0 --port 4173`。

### 5) 生产构建（可选）
```bash
pnpm build
```
