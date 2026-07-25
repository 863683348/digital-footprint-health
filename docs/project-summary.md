# 数字足迹体检报告 — 项目总结报告

> 报告日期：2026-07-25
> 项目代号：digital-footprint-health (dfh-mvp)
> 版本：v0.1.0（MVP 已上线）
> 撰写：大湾区靓仔（项目总监）

---

## 项目地址

| 项目 | 地址 |
|------|------|
| **线上正式域名** | https://digital-footprint-health.shop |
| 回退域名（Vercel 自动分配） | https://digital-footprint-health.vercel.app |
| **GitHub 仓库** | https://github.com/863683348/digital-footprint-health |

---

## 技术架构（一句话概括）

**纯 stateless 的 Next.js 16 App Router + React 19 单体应用，前端持有数据、后端只做无状态的解析/评分/删除模拟，零数据库、零 API 读成本，部署在 Vercel 上以 Git 推送自动触发构建。**

### 技术栈一览

| 层 | 技术 | 版本 | 选型理由 |
|----|------|------|----------|
| 前端框架 | Next.js (App Router) | 16.2.10 | 最新稳定版，SSR + API Routes 一体，Vercel 原生部署 |
| UI 库 | React | 19.2.7 | 配合 Next 16，清除框架层历史漏洞 |
| 样式 | Tailwind CSS | 3.4.14 | 原子化 CSS + CSS 变量换肤方案（亮/黑双主题） |
| 图标 | lucide-react | 0.460.0 | 统一描边 SVG 图标库，全项目锁定一套，禁用 emoji |
| 语言 | TypeScript | 5.6.3 | 全量类型覆盖 |
| CSV 解析 | csv-parse | 5.5.6 | 解析 X 归档文件 |
| 限流 | @upstash/ratelimit + @upstash/redis | 2.0.8 / 1.38.0 | 上传接口限流，env 存在走 Upstash，否则内存降级 |
| 测试 | Vitest | 4.1.10 | 单元测试（解析 + 评分） |
| 部署 | Vercel | - | Git 集成自动部署，Production = `main` 分支 |
| 域名 | digital-footprint-health.shop | - | 2026-07-24 切换的正式域名 |

### 架构关键决策

1. **零数据库**：Vercel/serverless 环境不持有任何数据库，归档数据解析后由浏览器 localStorage 持有，服务端无状态。这是出于成本与隐私双重考量——用户的推文数据不落服务端。
2. **零 X API 读**：体检报告 100% 由用户自下载的 X 归档文件本地生成，零 API 读成本、零延迟风险（X API 全量历史搜索是 Enterprise 档约 $42k/月，不可行）。
3. **自研 Google OAuth**：不引入 Auth.js beta，自研 authorization code flow + HMAC-SHA256 签名 httpOnly cookie，登录是可选身份绑定而非强制入口。
4. **删除是 dry-run 模拟**：当前 MVP 不接真实 X 写 API（$0.01/帖），删除流程是透明的 dry-run 模拟，展示费用预估与进度，但不下真单。

### 目录结构

```
digital-footprint-health/
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── archives/upload/      # 归档上传 + 解析 + 评分
│   │   ├── auth/{google,callback,session,signout}/  # Google OAuth 4 路由
│   │   └── settings/billing/     # 计费方案
│   ├── delete/{confirm,progress}/  # 删除确认 + 进度页
│   ├── report/[id]/              # 报告详情页
│   ├── upload/                   # 上传页
│   ├── layout.tsx                # 根布局（主题防闪烁）
│   ├── page.tsx                  # 首页
│   ├── sitemap.ts                # 动态 sitemap
│   └── robots.ts                 # robots.txt
├── components/                   # 7 个组件（NavBar/ScoreGauge/ThemeProvider 等）
├── lib/                          # 12 个核心库
│   ├── parse.ts                  # X 归档解析（CSV/JS）
│   ├── scoring.ts                # 6 维评分引擎
│   ├── signals.ts                # 风险信号检测器
│   ├── delete-sim.ts             # 删除模拟
│   ├── session.ts                # HMAC 签名 cookie
│   ├── payment.ts                # 6 档计费方案
│   ├── i18n.ts                   # 中英双语 catalog
│   ├── site.ts                   # 单一域名常量（SITE_URL）
│   └── ...
├── docs/                         # 10 份文档（PRD/架构/UIUX/Spec/上线清单等）
├── tests/                        # Vitest 单测
├── middleware.ts                 # 上传接口限流
└── next.config.mjs               # CSP 安全头
```

---

## 项目概述

### 一句话目标

**让隐私焦虑的个人用户上传 X 归档文件后，在几分钟内看清自己历史推文的暴露面并拿到一个可执行的安全清理处方，把「诊断」和「治疗」在一个干净闭环里做完。**

### 核心目标

1. **看清暴露** — 把用户 X 账号的数字足迹从「看不清」变成「看得清」：解析归档 → 6 维风险评分 → 风险推文清单，让用户知道到底暴露了什么。
2. **安全清理** — 把「不敢删」变成「敢删」：dry-run 删除模拟 + 透明计费 + 费用/时长预期前置展示，消除用户对乱扣费、删不净的恐惧。
3. **零成本体检** — 体检报告 100% 本地生成，零 X API 读成本，用户数据不落服务端，隐私与成本双赢。
4. **闭环体验** — 诊断→治疗一个产品内完成，填补市场空白（现有工具要么只删不诊断，要么只诊断不删）。

### 核心要点

#### 要点一：6 维隐私健康评分体系

评分引擎（`lib/scoring.ts`）对每条推文做 6 个维度的风险检测，加权汇总为 0-100 的健康分：

| 维度 | 权重 | 检测内容 | 信号源 |
|------|------|----------|--------|
| PII（个人身份信息） | 25% | 邮箱、手机号、身份证、银行卡、住址 | `detectPii()` 正则 |
| 敏感话题 | 20% | 病历、政治、宗教、工资、负债等敏感词 | `detectSensitive()` |
| 位置信息 | 15% | 城市/签到/经纬度/定位 | `detectLocation()` |
| 推文年龄 | 15% | 越老的推文足迹风险越高（4 年+ 满分） | `ageScore()` |
| 账号画像 | 15% | 样本量 + 是否含联系方式 | `accountScore()` |
| 媒体暴露 | 10% | 是否含图片/视频/GIF | `detectMedia()` |

- 样本量 < 10 条标记为 `insufficientSample`，不产出分数。
- 风险推文以结构化 `RiskFlag`（kind + severity）返回，前端 i18n 本地化标签。
- 风险清单上限 50 条，控制 payload 体积。

#### 要点二：纯本地解析，零 API 读成本

- 数据源**唯一入口** = 用户自下载的 X 归档文件（CSV/JS），上传后服务端用 `csv-parse` 解析。
- 体检报告 100% 由归档本地生成，**不调用任何 X API**（读操作 $0.005/帖且无免费档，全量历史搜索是 Enterprise $42k/月）。
- 解析后数据由浏览器 localStorage 持有，服务端无数据库、无状态——隐私与成本双赢。

#### 要点三：dry-run 删除模拟 + 透明计费

- 删除流程当前是**模拟**（dry-run），不接真实 X 写 API（$0.01/帖，5 万帖≈$500，限速 50 帖/15 分钟）。
- `lib/payment.ts` 定义 6 档计费方案：free / 单次少量/中量/大量 / Pro 月付/年付。
- 删除确认页展示费用预估（按推文量算费）、时长预期，消除「乱扣费」恐惧。
- 差异化定位：不做「更快删除」的魔法承诺，而是「诚实预期 + 可见进度 + 安全护栏」——正面回应竞品「慢/像诈骗」差评。

#### 要点四：自研轻量 Google OAuth（可选登录）

- 不引入 Auth.js beta，自研 authorization code flow + HMAC-SHA256 签名 httpOnly cookie（`lib/session.ts`）。
- 4 个 API 路由：`/api/auth/{google,callback,session,signout}`。
- 登录是**可选身份绑定**，不强制、不阻断上传/报告流程，仅用于后续付费/删除的身份关联。
- Session cookie：`httpOnly` + `sameSite=lax` + 生产 `secure`，`parseSession()` 常量时间校验防时序攻击。

#### 要点五：中英双语 i18n + 亮黑双主题

- `lib/i18n.ts` 含 zh/en 完整 catalog（150+ 键值对），`I18nProvider` + `useI18n()` hook，自动检测 `navigator.language`，localStorage 记忆偏好。
- 错误码翻译：后端返回结构化 code，前端 `translateError()` 映射，双语完整度 100%。
- 亮/黑双主题：CSS 变量换肤方案（`globals.css` 的 `.dark {}` 变量集），`ThemeProvider` 跟随系统 + localStorage 记忆，`layout.tsx` 注入 no-flash 内联脚本首屏定主题。深色调参考 GitHub Dark。

#### 要点六：安全与限流

- **Next.js 16.2.10 + React 19**：升级清除了 Next 14 框架层的 4 high + 1 moderate 漏洞，`npm audit` 现 **0 漏洞**。
- **安全响应头**（`next.config.mjs`）：CSP + X-Frame-Options(DENY) + X-Content-Type-Options(nosniff) + Referrer-Policy + Permissions-Policy + HSTS(2 年)。
- **上传接口限流**（`middleware.ts`）：`/api/archives/upload` 限 10 次/10s/IP，env 存在 Upstash 凭据时走多实例共享，否则内存滑动窗口降级，超限返回 429。
- **文件上传防护**：10MB 上限 + `req.formData()` try/catch，非 multipart 返回 400 而非 500。

#### 要点七：SEO 与可发现性

- 动态 `sitemap.xml`（首页/upload/删除确认，weekly）+ `robots.txt`（allow `/`，disallow 报告/进度页）。
- Open Graph + Twitter Card 元数据 + canonical URL。
- 首页注入 `WebApplication` JSON-LD 结构化数据（含 offers/inLanguage）。
- 域名统一收敛到 `lib/site.ts` 的 `SITE_URL` 单一常量，canonical/OG/sitemap/robots/JSON-LD 全部派生自它，杜绝硬编码死链。

---

## 页面与 API 清单

### 页面（5 个用户页面 + 2 个 SEO 路由）

| 页面 | 路由 | 核心功能 |
|------|------|----------|
| 首页 | `/` | Hero + 3 步引导 + 信任卡片 + JSON-LD |
| 上传页 | `/upload` | X 归档文件上传 + 解析进度 |
| 报告页 | `/report/[id]` | 6 维健康分 + ScoreGauge + 风险清单 |
| 删除确认 | `/delete/confirm` | 费用预估 + 计费方案展示 |
| 删除进度 | `/delete/progress` | dry-run 删除模拟进度 |
| sitemap | `/sitemap.xml` | 动态生成，引用 SITE_URL |
| robots | `/robots.txt` | allow + disallow + sitemap 指向 |

### API 路由（6 个）

| Method | Path | 功能 | 认证 |
|--------|------|------|------|
| POST | `/api/archives/upload` | 上传归档 → 解析 → 评分 → 返回 ArchiveData | 无（限流 10/10s/IP） |
| GET | `/api/settings/billing` | 返回 6 档计费方案 | 无 |
| GET | `/api/auth/google` | 生成 state，重定向到 Google 授权页 | 无 |
| GET | `/api/auth/callback` | 校验 state → 换 token → 拉 userinfo → 写 session cookie | 无 |
| GET | `/api/auth/session` | 返回 `{user:null\|SessionUser}` | 无 |
| POST | `/api/auth/signout` | 清除 session cookie | 无 |

---

## 上线 10 项检查完成度

| 状态 | 数量 | 项目 |
|------|------|------|
| ✅ 已完成 | 9 项 | ①需求设计 ②MVP搭建 ③中英文i18n ④亮黑UI ⑤谷歌登录(代码) ⑦GA4 基础统计 ⑧移动端 ⑨SEO ⑩安全 |
| ⚠️ 部分完成 | 0 项 | - |
| ❌ 未完成 | 1 项 | ⑥ 收付款（mock 计费已有，真实支付网关未接） |

### 关键里程碑

| 日期 | 事件 |
|------|------|
| 2026-07-13 | 项目启动，PRD/架构/UIUX/Spec 四文档定稿 |
| 2026-07-17 | MVP 搭建完成，Vercel 首次部署成功 |
| 2026-07-19 | i18n + 亮黑UI + 移动端适配 + SEO + 安全检测完成 |
| 2026-07-20 | Google OAuth 代码完成 + 凭据接入 + NavBar 修复 + CSP 修复 |
| 2026-07-24 | 正式域名切换到 `digital-footprint-health.shop` |
| 2026-07-25 | GA4 基础统计 ID 更新上线，线上验证通过 |

---

## 待办与下一步

### 代码侧可推进

1. **#6 收付款对接** — 接 PayPal/Stripe + webhook + 退款逻辑。工作量大，但当前 dry-run 模式不阻塞上线。

### 用户侧待办

1. **#5 Vercel 环境变量配置** — 在 Vercel 后台填 `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` / `AUTH_SECRET` 三个变量后 redeploy，生产登录才生效。
2. **#8 真机回归** — 手机访问 `https://digital-footprint-health.shop`，核对窄屏（≤375px）布局。
3. **#9 Google Search Console** — 验证域名 + 提交 sitemap.xml。

### 已知技术债

- `middleware.ts` → `proxy.ts`：Next 16.2 的 deprecation 提示，功能正常，列为后续迁移项。
- `<html lang>` 仍写死 `zh-CN`（SSR 默认，客户端 I18nProvider 会动态更新，SEO 影响极小）。

---

## 结论

数字足迹体检报告 MVP 已完成核心闭环——**上传归档 → 本地解析 → 6 维评分 → 风险清单 → dry-run 删除模拟**，并已上线正式域名 `digital-footprint-health.shop`。10 项上线清单 9 项完成，剩余 1 项（真实支付对接）不阻塞当前 dry-run 阶段的上线与推广。技术架构纯 stateless、零数据库、零 API 读成本，部署在 Vercel 上 Git 自动触发，维护成本极低，适合一人独立运营。
