# 数字足迹体检报告 - 上线 10 项检查报告

> 检查日期：2026-07-13
> 基于：dafeixiang-saas-launch skill 的 10 项上线工作清单
> 项目：digital-footprint-health (dfh-mvp)
> 部署地址：https://digital-footprint-health.vercel.app （Vercel Git 自动部署已生效；旧址 dfh-fgbk5c1y2-863683348s-projects.vercel.app 已 410 回收）

---

## 总览

> 更新于 2026-07-20（#5 谷歌登录代码完成）：采用轻量自研 Google OAuth（authorization code flow + HMAC 签名 httpOnly session cookie），不引入 beta 版 Auth.js，契合产品 stateless 架构；登录为可选入口（非阻断）。**注意：功能需用户在 Google Cloud Console 创建 OAuth 凭据 + 在 Vercel 配置 3 个环境变量后才真正可用**（详见 #5）。此前：#8 移动端适配已上线；JSON-LD/sitemap/robots 死链已收敛到 `lib/site.ts`；#7 已接 GA4（G-5NWEFJTMBZ）；Next 14→16.2.10 + React 19，`npm audit` 0 漏洞。

| 状态 | 数量 | 占比 |
|------|------|------|
| ✅ 已完成 | 8 项 | 80% |
| ⚠️ 部分完成 | 1 项 | 10% |
| ❌ 未完成 | 1 项 | 10% |

**结论：10 项中 8 项完成（①需求设计 ②MVP搭建 ③中英文i18n ④亮黑UI ⑤谷歌登录[代码] ⑧移动端 ⑨SEO ⑩安全）、1 项部分完成（#7 GA4 已上、热力图+事件埋点待补）、1 项未做（#6 收付款）。#5 代码已完成，待用户配置 OAuth 凭据即生效；#8 真机回归为可选 QA（用户待办）。**

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

### ⑤ 谷歌登录 ✅ 已完成（代码就绪，待用户配置 OAuth 凭据后生效）

| 检查项 | 结果 |
|--------|------|
| 方案选型 | ✅ 轻量自研 Google OAuth（authorization code flow），**不引入 Auth.js beta**——产品 stateless，登录只是可选身份绑定，自研更可控、零额外依赖 |
| Google OAuth 跳转 | ✅ `GET /api/auth/google` 生成 `state` 防 CSRF，重定向到 Google 授权页 |
| OAuth 回调 | ✅ `GET /api/auth/callback` 校验 state → 用 code 换 token → 拉取 userinfo → 写 session cookie |
| Session 管理 | ✅ `lib/session.ts`：HMAC-SHA256 签名的 httpOnly cookie（无数据库、无 JWT 库），`parseSession()` 做常量时间校验 |
| 登录态读取 | ✅ `GET /api/auth/session` 返回 `{user:null\|SessionUser}`，供 NavBar 客户端渲染登录态 |
| 退出登录 | ✅ `POST /api/auth/signout` 清除 session cookie |
| 登录/退出 UI | ✅ NavBar 客户端组件：挂载时拉 `/api/auth/session`，登录态显示用户名 + 「退出」，未登录显示「登录」链接（非阻断入口，可选） |
| 国际化 | ✅ `auth.signin` / `auth.signout` / `auth.withGoogle` 已加 zh/en |
| 环境变量模板 | ✅ `.env.example` 含 `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `AUTH_SECRET` 占位（真实 `.env.local` 已被 `.gitignore` 忽略） |
| 安全响应头兼容 | ✅ cookie 设 `httpOnly` + `sameSite=lax` + 生产 `secure`，与现有 CSP 无冲突 |

**说明**：2026-07-20 完成。定位「隐私体检」产品，登录是**可选身份绑定**（不强制、不阻断上传/报告流程），仅用于后续付费/删除的身份关联。状态通过 HMAC 签名 cookie 持有，服务端可验证、客户端不可篡改。

**🔧 待用户在侧完成（功能才真正可用）**：
1. 打开 https://console.cloud.google.com/apis/credentials → 创建 **OAuth 2.0 客户端 ID**（应用类型：Web 应用）。
2. 「已获授权的重定向 URI」添加：
   - `https://digital-footprint-health.vercel.app/api/auth/callback`（生产，必填）
   - `http://localhost:3000/api/auth/callback`（本地调试，可选）
3. 在 Vercel 项目环境变量（Settings → Environment Variables）添加：
   - `GOOGLE_CLIENT_ID` = 上一步拿到的客户端 ID
   - `GOOGLE_CLIENT_SECRET` = 上一步拿到的客户端密钥
   - `AUTH_SECRET` = 强随机值（生成：`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`）
4. 重新部署（改环境变量后 Vercel 需 redeploy；push 会自动触发，或手动 Redeploy）。
5. 验证：首页 NavBar 点「登录」→ Google 授权 → 跳回首页且显示用户名；点「退出」即清除。

**差距（如未来需要）**：当前未做 middleware 受保护路由（因登录非强制）；若付费删除要绑定登录态，再在 `middleware.ts` 或具体路由加 `parseSession` 校验即可，接口已就绪。

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

### ⑦ GA4 + 热力监控 ⚠️ 部分完成（GA4 基础已上线，热力图 + 事件埋点待补）

| 检查项 | 结果 |
|--------|------|
| GA4 脚本 | ✅ 已用 `next/script`（`strategy="afterInteractive"`）接入 `gtag.js?id=G-5NWEFJTMBZ`，含 `gtag('config', 'G-5NWEFJTMBZ')` 初始化（`app/layout.tsx`，用户提供的 Measurement ID）|
| 页面浏览追踪 | ✅ GA4 默认 `page_view` 自动上报（gtag config 触发）；SPA 路由切换若需精确归因可追加 `routeChange` 埋点 |
| 事件追踪 | ❌ 上传成功 / 生成报告 / 删除模拟 等关键节点尚未埋 `gtag('event', ...)` |
| 热力图工具 | ❌ 未接入 Hotjar / Microsoft Clarity / PostHog |
| Web Vitals | ⚠️ Next.js 内置 `next/web-vitals` 可用但未启用上报 |

**说明**：2026-07-19 接入 GA4 基础脚本，现可看基础访问量与页面浏览。

**差距（待补）**：① 关键事件埋点（`gtag('event', ...)`）衡量转化漏斗；② 接入 Microsoft Clarity（免费热力图）看点击/滚动热区；③ 隐私合规：本产品定位"隐私体检"，正式推广前建议加分析同意开关（否则 GA4 与主张略有冲突），需要可改成 consent 后加载。

---

### ⑧ 移动端适配 ✅ 已完成（已部署上线）

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
| Vercel 部署 | ✅ **Git 自动部署已生效**：push 到 `main` 即自动构建上线，`digital-footprint-health.vercel.app` 返回 200（无需 Vercel token，本环境已验证） |
| 死链修复 | ✅ 旧域名 `dfh-fgbk5c1y2-…vercel.app`（已 410 回收）在 JSON-LD / sitemap / robots 三处硬编码死链已修复，统一收敛到 `lib/site.ts` 单一常量 |
| 移动端真机测试 | ⚠️ 待用户手机访问回归（非代码阻塞项） |

**说明**：2026-07-17 完成部署闭环。响应式 CSS 已覆盖全部页面，构建产物含全部 11 路由（含 Middleware 51.8kB 限流）。部署走 GitHub → Vercel Git 集成自动触发，无需 token。

**📌 提醒（用户待办）**：
1. **真机回归**：用手机访问 `https://digital-footprint-health.vercel.app`，核对首页/上传/报告/删除页在窄屏（≤375px）下的布局与按钮（CTA 堆叠、按钮全宽、ScoreGauge 缩到 168px 等）。代码侧已 100% 就绪，无需再改。
2. **#4 亮黑 UI**：等用户给 JS 后再动（组件已支持，但用户要补的脚本尚未提供）。

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

**补充（2026-07-17）**：修复 JSON-LD 的 `url` 字段曾硬编码旧域名死链（`dfh-fgbk5c1y2-…`）的问题，现已统一引用 `lib/site.ts` 的 `SITE_URL`，与 canonical / OG / sitemap / robots 完全一致。

---

### ⑩ 安全检测 ✅ 完成（dev critical 已清零 + 限流已上 + npm audit 0 漏洞）

| 检查项 | 结果 |
|--------|------|
| Next.js 版本 | ✅ **16.2.10**（latest stable）+ **React 19.2.7**（升 15/16 清除框架层漏洞） |
| npm audit（critical） | ✅ **critical 已清零**：`vitest` 升级 2.1.4 → **4.1.10**（>3.2.5，修复 GHSA-5xrq-8626-4rwp 的 vitest UI 任意文件读/执行）；`npm audit` 现已无 critical |
| npm audit（high/moderate） | ✅ **0 漏洞**：升 Next 16.2.10 清掉 4 high（Next 自身 DoS / SSRF / 缓存投毒 / XSS 等），并用 `overrides` 强制 `postcss` ≥ 8.5.10 清掉 moderate（Next 内嵌的 postcss 也抬上来了） |
| 安全响应头 | ✅ `next.config.mjs` 配置 `headers()`：CSP + X-Frame-Options(DENY) + X-Content-Type-Options(nosniff) + Referrer-Policy + Permissions-Policy + HSTS(2 年) |
| 上传接口 500 bug | ✅ 已修复：`req.formData()` 包 try/catch，非 multipart 请求返回 400 而非 500 |
| 文件上传大小限制 | ✅ 新增 10MB 上限，超限返回 400 |
| **API 限流** | ✅ 新增 `middleware.ts`：对 `/api/archives/upload` 限流 10 次/10s/IP；**env 存在 UPSTASH_REDIS_REST_URL+TOKEN 时自动走 Upstash（多实例共享），否则降级为内存滑动窗口**；超限返回 429 `{code:'TOO_MANY_REQUESTS'}`（已接入 i18n） |
| 测试 | ✅ `vitest run` 6/6 通过（vitest 4.1.10） |

**说明**：2026-07-19 收尾完成。两件事落地——① `vitest` 升到 4.1.10，`npm audit` 的 **critical 归零**；② 上传接口加上限流（Upstash 生产 / 内存降级），防接口被刷。生产部署面已无 critical。`npm audit` 残留的 4 high + 1 moderate 均为 Next 14 框架层漏洞，只能靠升 Next 15/16 清除（破坏性变更，列为 P2 单独排期，不阻塞当前上线）。

**已闭环（2026-07-19）**：
1. ✅ **Next 14 → 16.2.10 + React 19** 升级完成：`app/report/[id]` 客户端组件改用 `useParams()` 适配 `params` Promise；`next.config.mjs` / `middleware.ts` 无破坏性改动；`npm audit` 现已 **0 漏洞**（4 high + 1 moderate 全清）。`eslint-config-next` 同步升 16.2.10，`lint` 脚本改 `eslint .` 并补 `.eslintrc.json`（Next 16 移除了 `next lint`）。
2. **P2（可选）**：接入 Upstash 时需在 Vercel 配置 `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`（不配则用内存降级，已可用）。

---

## 优先级排序（建议执行顺序）

| 优先级 | 事项 | 预估工作量 |
|--------|------|-----------|
| **P0** | ⑩ 安全检测 — 升级 Next.js + 配置安全响应头 | 中 |
| **P0** | ⑧ 移动端适配 — 构建验证 + push + 部署 | 小 |
| **P1** | ⑨ SEO 操作 — sitemap + robots + OG + JSON-LD | 小 |
| **P1** | ④ 亮黑 UI — dark token + 切换按钮 + 组件适配 | 中 |
| **P2** | ⑦ GA4 + 热力图 — GA4 + Clarity 接入 | 小 |
| **P2** | ⑤ 谷歌登录 — 自研 Google OAuth（已完成，待配凭据） | 中 |
| **P2** | ⑥ 收付款 — PayPal/Stripe + webhook + 退款 | 大 |

---

## 备注

- ⑤⑥ 两项对于当前 dry-run MVP 阶段不是阻塞项——产品当前定位是"本地隐私体检 + 模拟删除"，不涉及真实用户身份和真实收费。但如果要走向正式商业化，这两项是必经之路。
- ⑩ 安全检测中的 Next.js 漏洞（原 P2）已通过升 Next 16.2.10 + React 19 闭环，`npm audit` 现 0 漏洞。
- 阻塞链参考（来自 skill）：①→②→⑤→⑥；可并行：⑦‖⑧‖⑨‖⑩。
