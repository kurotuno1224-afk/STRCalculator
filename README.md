# STRCalculator

团队统一环境的 React + TypeScript 项目模板（Vite），集成 Tailwind CSS、React Router v7，并预留 shadcn/ui 组件体系接入方式。  
目标：组员 clone 后按统一命令即可启动开发环境，避免 Node/pnpm 版本漂移。

---

## 技术栈

- Runtime: Node.js（由 mise 统一）
- Package Manager: pnpm（由 mise 统一）
- Build Tool: Vite
- UI: React + TypeScript
- Router: React Router v7
- Styling: Tailwind CSS v4
- UI Components（可选）: shadcn/ui

---

## 目录约定

- `src/`：前端源码
- `pnpm-workspace.yaml`：pnpm 安装策略（允许必要构建脚本，如 esbuild）
- `mise.toml`：项目工具链版本（Node / pnpm）
- `pnpm-lock.yaml`：依赖锁文件（必须提交）

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
