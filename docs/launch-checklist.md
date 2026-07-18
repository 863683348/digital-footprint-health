# 数字足迹体检报告 - 上线 10 项检查报告

> 检查日期：2026-07-13
> 基于：dafeixiang-saas-launch skill 的 10 项上线工作清单
> 项目：digital-footprint-health (dfh-mvp)
> 部署地址：https://dfh-fgbk5c1y2-863683348s-projects.vercel.app

---

## 总览

| 状态 | 数量 | 占比 |
|------|------|------|
| ✅ 已完成 | 3 项 | 30% |
| ⚠️ 部分完成 | 3 项 | 30% |
| ❌ 未完成 | 4 项 | 40% |

**结论：10 项中 3 项完成、3 项部分完成、4 项未做。当前处于 MVP 可演示状态，距离正式上线还有 4 项硬缺口。**

---

## 逐项检查

### ① 需求设计 ✅ 已完成

| 检查项 | 结果 |
|--------|------|
| PRD 文档 | ✅ `docs/prd.md` 存在，含用户画像、功能清单、RICE 评分 |
| 架构文档 | ✅ `docs/architecture.md` + `docs/phase2-arch.md` |
| UIUX 文档 | ✅ `docs/uiux.md` + `docs/phase2-uiux.md` |
| Spec 契约 | ✅ `docs/spec.md` 锁定功能/API/页面/Token |
| 共享内存池 | ✅ `docs/shared-pool.md` |

**说明**：Phase 0-1.5 全流程已走完，三文档 + Spec 齐备。

---

### ② MVP 搭建（脚手架） ✅ 已完成

| 检查项 | 结果 |
|--------|------|
| 框架 | ✅ Next.js 14.2.15 (App Router) + TypeScript |
| UI 库 | ✅ Tailwind CSS 3.4.14 + lucide-react 图标 |
| 页面 | ✅ 5 个页面：首页 / 上传 / 报告 / 删除确认 / 删除进度 |
| API 路由 | ✅ 2 个：`/api/archives/upload`（解析+评分）、`/api/settings/billing`（计费方案） |
| 核心库 | ✅ `lib/parse.ts`（解析）、`lib/scoring.ts`（评分）、`lib/signals.ts`（风险识别）、`lib/delete-sim.ts`（删除模拟） |
| 测试 | ✅ `tests/parse.test.ts` + `tests/scoring.test.ts`（Vitest） |
| 构建 | ✅ Vercel 部署成功，全页面 200 |
| GitHub | ✅ 仓库 `863683348/digital-footprint-health`（public） |

**说明**：MVP 核心功能完整——上传归档 → 本地解析 → 6 维评分 → 风险清单 → dry-run 删除模拟。

---

### ③ 中英文 i18n ✅ 已完成

| 检查项 | 结果 |
|--------|------|
| 双语目录 | ✅ `lib/i18n.ts` 含 zh/en 完整 catalog（150+ 键值对） |
| Context Provider | ✅ `components/I18nProvider.tsx` + `useI18n()` hook |
| 自动检测 | ✅ `detectLang()` 读取 `navigator.language` |
| 语言记忆 | ✅ 切换后存入 `localStorage` |
| 错误码翻译 | ✅ `translateError()` 按 backend code 映射 |
| 页面全覆盖 | ✅ 首页/上传/报告/删除确认/删除进度全部走 i18n |

**说明**：前端-only i18n 方案，后端返回结构化 key，前端翻译。双语完整度 100%。

---

### ④ 亮黑 UI 设定 ❌ 未完成

| 检查项 | 结果 |
|--------|------|
| Tailwind darkMode 配置 | ❌ `tailwind.config.ts` 未设置 `darkMode: 'class'` |
| 深色 Token / CSS 变量 | ❌ `globals.css` 只有 `:root`（浅色），无 `:root.dark` 或 `[data-theme="dark"]` |
| `dark:` 工具类 | ❌ 项目代码中无任何 `dark:` class 使用 |
| 主题切换组件 | ❌ 无开关/按钮 |

**说明**：当前只有浅色主题。设计 Token（颜色/字体/圆角/阴影）已定义且统一，但深色模式完全未做。

**差距**：需要新增 dark token 集 + `darkMode: 'class'` 配置 + 主题切换按钮 + 全组件 `dark:` 适配。

---

### ⑤ 谷歌登录 ❌ 未完成

| 检查项 | 结果 |
|--------|------|
| NextAuth / Auth.js | ❌ 未安装，未配置 |
| Google OAuth | ❌ 无 OAuth client ID / callback 路由 |
| Session 管理 | ❌ 无 session/JWT 代码 |
| 登录/注册页面 | ❌ 无 `/login` 或 `/auth` 路由 |
| 受保护路由 | ❌ 无 middleware 做鉴权拦截 |

**说明**：当前 MVP 是 stateless 架构——上传即解析，客户端 localStorage 持有数据，无需登录。但正式上线（尤其是付费删除功能）需要用户身份。

**差距**：完整缺失。需安装 NextAuth + 配置 Google OAuth + 设计登录流程 + 受保护路由。

---

### ⑥ 收付款对接 ⚠️ 部分完成

| 检查项 | 结果 |
|--------|------|
| 计费模型 | ✅ `lib/payment.ts` 定义 6 档计费方案（free / 单次少量/中量/大量 / Pro 月付/年付） |
| 费用预估 | ✅ `estimateDelete()` 按 tweet 量算费 |
| Billing API | ✅ `GET /api/settings/billing` 返回计费方案 |
| 费用展示 UI | ✅ 删除确认页展示费用预估卡片 |
| 真实支付网关 | ❌ 无 PayPal / Stripe / 支付宝对接，只有 `mockCharge()` 返回假订单号 |
| 支付回调/Webhook | ❌ 无 webhook 路由 |
| 退款逻辑 | ❌ 仅 i18n 文案描述退款政策，无实际退款代码 |

**说明**：计费模型设计完整，但支付链路是 mock。当前 dry-run 模式不需要真实收费，但如果要上线真实删除功能，必须接入支付网关。

**差距**：需要接入 PayPal（出海首选）或 Stripe → 支付 webhook 验签 → 订单状态机 → 退款逻辑。

---

### ⑦ GA4 + 热力监控 ❌ 未完成

| 检查项 | 结果 |
|--------|------|
| GA4 脚本 | ❌ 未安装 `next/script` 的 GA4 tag，无 `gtag()` 调用 |
| 页面浏览追踪 | ❌ 无 `routeChange` 事件监听 |
| 事件追踪 | ❌ 无上传/生成报告/删除等关键事件埋点 |
| 热力图工具 | ❌ 未接入 Hotjar / Microsoft Clarity / PostHog |
| Web Vitals | ⚠️ Next.js 内置 `next/web-vitals` 可用但未启用上报 |

**说明**：完全没有用户行为分析能力。上线后无法衡量转化率、用户路径、流失点。

**差距**：需要创建 GA4 property → 注入 gtag 脚本 → 关键事件埋点 → 接入 Clarity（免费热力图）。

---

### ⑧ 移动端适配 ⚠️ 部分完成

| 检查项 | 结果 |
|--------|------|
| Viewport meta | ✅ `layout.tsx` 已设置 `viewport: { width: 'device-width', initialScale: 1 }` |
| 导航栏响应式 | ✅ `NavBar.tsx` brand 文字 `hidden sm:inline`，gap `gap-3 sm:gap-5` |
| 首页 CTA 响应式 | ✅ `flex-col sm:flex-row`，按钮 `w-full sm:w-auto` |
| 报告页响应式 | ✅ 标题行堆叠，按钮 `w-full sm:w-auto` |
| 删除页响应式 | ✅ 提交按钮 `w-full sm:w-auto` |
| ScoreGauge 响应式 | ✅ `w-[168px] sm:w-[200px]` |
| 构建验证 | ❌ 代码已写但 `npm run build` 被打断，未确认构建通过 |
| 线上验证 | ❌ 未 commit + push，Vercel 未重新部署 |
| 移动端真机测试 | ❌ 未做 |

**说明**：响应式 CSS 已写入全部页面，但尚未构建验证和上线。需要：构建通过 → commit → push → Vercel 自动部署 → 手机访问验证。

**差距**：验证构建 + 部署上线 + 真机测试。

---

### ⑨ SEO 操作 ⚠️ 部分完成

| 检查项 | 结果 |
|--------|------|
| 页面 title/description | ✅ `layout.tsx` 有 `metadata` 含中英双语 title + description |
| `<html lang>` | ⚠️ 写死 `lang="zh-CN"`，未根据 i18n 状态动态切换 |
| sitemap.xml | ❌ 无 `app/sitemap.ts` 或 `public/sitemap.xml` |
| robots.txt | ❌ 无 `app/robots.ts` 或 `public/robots.txt` |
| JSON-LD 结构化数据 | ❌ 无 `Script` 组件注入 schema.org markup |
| Open Graph | ❌ 无 `openGraph` 字段在 metadata 中 |
| canonical URL | ❌ 未设置 |
| Google Search Console | ❌ 未验证域名 |

**说明**：只有最基础的 title/description，其余 SEO 必要项全部缺失。

**差距**：需要 sitemap + robots + OG tags + JSON-LD + Search Console 验证。

---

### ⑩ 安全检测 ❌ 未完成

| 检查项 | 结果 |
|--------|------|
| npm audit | ❌ **10 个漏洞**：2 critical / 4 high / 4 moderate（Next.js 14.2.15 存在多个 CVE） |
| 安全响应头 | ❌ `next.config.mjs` 为空，未配置 `headers()` — 缺 CSP / X-Frame-Options / X-Content-Type-Options / Strict-Transport-Security / Referrer-Policy |
| Middleware | ❌ 无 `middleware.ts` |
| 环境变量 | ⚠️ 无 `.env` 文件（当前无密钥需要管理，但接入 OAuth/支付后必须） |
| 文件上传安全 | ⚠️ 上传路由有格式校验（csv/js/json），但无文件大小限制 |
| API 限流 | ❌ 无 rate limiting |
| CORS 配置 | ❌ 未显式配置 |
| 上传接口空文件 500 bug | ❌ 已知 bug：空文件时返回 500 应为 400 |

**说明**：安全是最大缺口。Next.js 14.2.15 有多个已知 CVE（含 2 个 critical），且无任何安全响应头配置。

**差距（按优先级）**：
1. **P0**：升级 Next.js 到最新 14.x patch 或 15.x（修复 2 个 critical CVE）
2. **P0**：在 `next.config.mjs` 中配置安全响应头（CSP / X-Frame-Options / HSTS 等）
3. **P1**：上传路由加文件大小限制 + 修复空文件 500 bug
4. **P1**：API 限流（可用 Upstash Ratelimit 或 Vercel Edge Middleware）
5. **P2**：接入 OAuth/支付后配置 `.env` 和密钥管理

---

## 优先级排序（建议执行顺序）

| 优先级 | 事项 | 预估工作量 |
|--------|------|-----------|
| **P0** | ⑩ 安全检测 — 升级 Next.js + 配置安全响应头 | 中 |
| **P0** | ⑧ 移动端适配 — 构建验证 + push + 部署 | 小 |
| **P1** | ⑨ SEO 操作 — sitemap + robots + OG + JSON-LD | 小 |
| **P1** | ④ 亮黑 UI — dark token + 切换按钮 + 组件适配 | 中 |
| **P2** | ⑦ GA4 + 热力图 — GA4 + Clarity 接入 | 小 |
| **P2** | ⑤ 谷歌登录 — NextAuth + Google OAuth | 中 |
| **P2** | ⑥ 收付款 — PayPal/Stripe + webhook + 退款 | 大 |

---

## 备注

- ⑤⑥ 两项对于当前 dry-run MVP 阶段不是阻塞项——产品当前定位是"本地隐私体检 + 模拟删除"，不涉及真实用户身份和真实收费。但如果要走向正式商业化，这两项是必经之路。
- ⑩ 安全检测中的 Next.js CVE 是当前最紧急的风险——即使不做商业化，也应尽快升级框架版本。
- 阻塞链参考（来自 skill）：①→②→⑤→⑥；可并行：⑦‖⑧‖⑨‖⑩。
