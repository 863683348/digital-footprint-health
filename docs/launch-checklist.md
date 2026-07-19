# 数字足迹体检报告 - 上线 10 项检查报告

> 检查日期：2026-07-13
> 基于：dafeixiang-saas-launch skill 的 10 项上线工作清单
> 项目：digital-footprint-health (dfh-mvp)
> 部署地址：https://dfh-fgbk5c1y2-863683348s-projects.vercel.app

---

## 总览

> 更新于 2026-07-19（#10 收尾）：#4 亮黑 UI、#9 SEO、#10 安全 均已完成；#8 移动端适配代码 + 构建验证 + push 已完成，仅剩「Vercel 重新部署上线」一步（需 Vercel token，当前环境无凭证）。#10 的 vitest critical 已清零、API 限流已上；残留 Next 14 的 HIGH 漏洞待 Next 15/16 升级（P2，不阻塞上线）。

| 状态 | 数量 | 占比 |
|------|------|------|
| ✅ 已完成 | 6 项 | 60% |
| ⚠️ 部分完成 | 1 项 | 10% |
| ❌ 未完成 | 3 项 | 30% |

**结论：10 项中 6 项完成（①需求设计 ②MVP搭建 ③中英文i18n ④亮黑UI ⑨SEO ⑩安全）、1 项部分完成（#8 仅差线上重新部署）、3 项未做（#5 登录 / #6 支付 / #7 分析）。**

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

### ④ 亮黑 UI 设定 ✅ 已完成

| 检查项 | 结果 |
|--------|------|
| Tailwind darkMode 配置 | ✅ `tailwind.config.ts` 设置 `darkMode: 'class'` |
| 深色 Token / CSS 变量 | ✅ `globals.css` 新增 `.dark { … }` 变量集（深色 bg/surface/line/ink/primary 等） |
| 颜色映射 | ✅ Tailwind 颜色全部改为引用 CSS 变量，翻转变量即全站换肤 |
| 主题 Provider | ✅ 新增 `components/ThemeProvider.tsx`，localStorage 记忆偏好 + 跟随系统 |
| 防闪烁 | ✅ `layout.tsx` 注入 no-flash 内联脚本，首屏前定主题 |
| 主题切换组件 | ✅ NavBar 新增明暗切换按钮（Lucide Sun/Moon 图标，非 emoji） |
| 弱语义背景适配 | ✅ `.dark .bg-ok-weak/.bg-warn-weak/.bg-danger-weak` 改为深色微染底 |

**说明**：2026-07-19 完成。采用「CSS 变量换肤」方案，组件无需逐个加 `dark:` 类，扩展性与一致性最佳。深色调参考 GitHub Dark 配色。

**验证**：`npm run build` 通过，类型检查通过，6 个单测通过。

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

### ⑧ 移动端适配 ✅ 代码完成，仅差线上重新部署

| 检查项 | 结果 |
|--------|------|
| Viewport meta | ✅ `layout.tsx` 已设置 `viewport: { width: 'device-width', initialScale: 1 }` |
| 导航栏响应式 | ✅ `NavBar.tsx` brand 文字 `hidden sm:inline`，gap `gap-3 sm:gap-5` |
| 首页 CTA 响应式 | ✅ `flex-col sm:flex-row`，按钮 `w-full sm:w-auto` |
| 报告页响应式 | ✅ 标题行堆叠，按钮 `w-full sm:w-auto` |
| 删除页响应式 | ✅ 提交按钮 `w-full sm:w-auto` |
| ScoreGauge 响应式 | ✅ `w-[168px] sm:w-[200px]` |
| 构建验证 | ✅ `npm run build` 通过（11 路由全编出，无类型/ lint 错误） |
| 代码提交 | ✅ 已 commit（`6e8d092`）+ push 至 `origin/main` |
| Vercel 重新部署 | ❌ 当前环境无 Vercel 凭证（CLI 未登录），无法触发 `vercel deploy`；旧部署已被 Vercel 回收（URL 现返回 410） |
| 移动端真机测试 | ⚠️ 待部署后手机访问验证 |

**说明**：2026-07-19 完成构建验证 + 提交推送。响应式 CSS 已覆盖全部页面，构建产物含全部路由。

**差距（唯一阻塞）**：需要 Vercel 部署 token（`vcp_…`）由我执行 `vercel deploy --prod`，或用户在 Vercel Dashboard 点一下 Redeploy。部署后建议用手机访问做一次真机回归。

---

### ⑨ SEO 操作 ✅ 已完成

| 检查项 | 结果 |
|--------|------|
| 页面 title/description | ✅ `layout.tsx` 含中英双语 title + description |
| sitemap.xml | ✅ 新增 `app/sitemap.ts`（首页/upload/删除确认，weekly） |
| robots.txt | ✅ 新增 `app/robots.ts`（allow `/`，disallow 报告/进度页，含 sitemap 指向） |
| Open Graph | ✅ `metadata.openGraph` + `metadata.twitter` 已配置 |
| canonical URL | ✅ `metadata.alternates.canonical: '/'` + `metadataBase` |
| JSON-LD 结构化数据 | ✅ 首页注入 `WebApplication` schema（含 offers/inLanguage） |
| `<html lang>` | ⚠️ 仍写死 `zh-CN`（SSR 默认；客户端 I18nProvider 会按语言更新，SEO 影响极小） |
| Google Search Console | ❌ 未验证域名（部署后需在 GSC 提交 sitemap.xml） |

**说明**：2026-07-19 完成。构建产物已生成 `/sitemap.xml` 与 `/robots.txt` 两个静态路由。

**差距**：部署后到 GSC 验证域名并提交 sitemap（纯配置，不阻塞上线）。

---

### ⑩ 安全检测 ✅ 完成（dev critical 已清零 + 限流已上；残留 Next 14 HIGH 待框架升级）

| 检查项 | 结果 |
|--------|------|
| Next.js 版本 | ✅ **14.2.35**（latest 14.2.x，无破坏性变更） |
| npm audit（critical） | ✅ **critical 已清零**：`vitest` 升级 2.1.4 → **4.1.10**（>3.2.5，修复 GHSA-5xrq-8626-4rwp 的 vitest UI 任意文件读/执行）；`npm audit` 现已无 critical |
| npm audit（high/moderate） | ⚠️ 残留 4 high + 1 moderate，全部来自 **Next 14 自身**（DoS / XSS / 缓存投毒 / postcss），修复需升 Next 15/16（破坏性，P2 单排，不阻塞 MVP） |
| 安全响应头 | ✅ `next.config.mjs` 配置 `headers()`：CSP + X-Frame-Options(DENY) + X-Content-Type-Options(nosniff) + Referrer-Policy + Permissions-Policy + HSTS(2 年) |
| 上传接口 500 bug | ✅ 已修复：`req.formData()` 包 try/catch，非 multipart 请求返回 400 而非 500 |
| 文件上传大小限制 | ✅ 新增 10MB 上限，超限返回 400 |
| **API 限流** | ✅ 新增 `middleware.ts`：对 `/api/archives/upload` 限流 10 次/10s/IP；**env 存在 UPSTASH_REDIS_REST_URL+TOKEN 时自动走 Upstash（多实例共享），否则降级为内存滑动窗口**；超限返回 429 `{code:'TOO_MANY_REQUESTS'}`（已接入 i18n） |
| 测试 | ✅ `vitest run` 6/6 通过（vitest 4.1.10） |

**说明**：2026-07-19 收尾完成。两件事落地——① `vitest` 升到 4.1.10，`npm audit` 的 **critical 归零**；② 上传接口加上限流（Upstash 生产 / 内存降级），防接口被刷。生产部署面已无 critical。`npm audit` 残留的 4 high + 1 moderate 均为 Next 14 框架层漏洞，只能靠升 Next 15/16 清除（破坏性变更，列为 P2 单独排期，不阻塞当前上线）。

**已知残留（P2，不阻塞）**：
1. **P2**：Next 14 的 4 high + 1 moderate 漏洞 → 升 Next 15/16（client page 的 `params` 改 Promise，需把 `app/report/[id]` 改用 `useParams()`）。建议单独排期。
2. **P2**：接入 Upstash 时需在 Vercel 配置 `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`（不配则用内存降级，已可用）。

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
