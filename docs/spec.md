# Spec — 数字足迹体检报告（MVP）v1.0.0

> 生成日期：2026-07-13
> 基于：PRD v1.0（最终封版·定价已决+支付已决） + 架构文档 v1.1 + UIUX 文档
> 状态：已确认（用户 2026-07-13 确认三文档并要求推进至开发）
> 唯一开发依据：前端/后端/测试/运维均以本 Spec 为准，超出范围需走变更流程。

---

## 1. 产品定义

- **一句话描述**：面向隐私焦虑个人用户的 Web 工具——先把你 X 账号的暴露面「看清楚、打个分」，再给一剂「近似一键清空历史推文」的可执行处方，在干净闭环里完成「诊断→治疗」。所有数据来自你自下载的 X 归档文件。
- **目标用户**：隐私焦虑的 C 端个人（主画像「小林」28 岁求职转型期；次画像「老陈」35 岁数字极简主义者）。
- **核心问题**：用户对自己的 X 数字足迹「既看不清、也不敢删、删不净」；现有工具割裂（只删不诊断 / 只诊断不删），且普遍存在「慢/像诈骗/退款难」信任崩塌。

---

## 2. MVP 范围（锁定——不在此列表的功能一律不做）

### P0 · Stage 1（零 API 读成本，最先交付）
| 优先级 | 功能 | 验收标准摘要 |
|--------|------|--------------|
| P0 | F1 X 归档上传与解析 | 用户下载官方归档 zip → 上传 → 本地解析 tweets（csv/js），提取推文总数/时间跨度/媒体/@对象；不调任何 X 读取 API；失败有清晰报错+重试；提供「如何下载归档」图文引导 |
| P0 | F2 体检报告生成 + 风险评分 | 完全本地由归档计算 0–100 健康分 + 风险等级（低/中/高）；维度：PII/定位/敏感语义/媒体/旧帖占比/账号暴露；输出分项风险 + ≥3 条示例高危推文；零读成本 |
| P0 | F3 风险可视化仪表盘 | 总分 + 分项雷达/条形 + Top N 高危样例 + 关键暴露指标，5 秒内读懂 |

### P0 · Stage 2（付费写操作，C3 约束）
| 优先级 | 功能 | 验收标准摘要 |
|--------|------|--------------|
| P0 | F4 近似一键删除历史推文（护栏+队列+成本/时长预期） | 删除前先展示待删条数/预计 X 写费(≈$0.01/帖)/预计耗时(50/15min)；确认付费后入队列，分批删，进度可见、可暂停/取消、断点续传；可设保护列表；完成给「已删/失败/受保护」报告 |

### P1（紧随，但本 Spec 限定开发排序）
| 优先级 | 功能 | 验收标准摘要 | 本期是否实做 |
|--------|------|--------------|--------------|
| P1 | F5 选择性删除筛选 | 按日期/关键词/媒体筛选（前置费用与时长） | ✅ 实做（删除确认页范围选择） |
| P1 | F6 报告 PDF 导出 | 本地生成结构化 PDF | ✅ 实做（轻量版） |
| P1 | F7 删除后复检 | 删除后可重新体检量化下降 | ⏸ 预留接口，UI 入口占位 |
| P1 | F8 定时自动清理 | 保留最近 N 天超期自删 | ⏸ 预留接口，不实现后台调度 |

### 明确不做的功能（Won't Have）
- 通过 X API 自动拉取历史推文（C1 技术不可行）
- MVP 任何 X API 读取（C2）
- 多平台（Discord/Reddit/FB 等）
- 数据经纪人 opt-out、泄露库/暗网扫描
- 点赞/转发/DM 删除（仅删 tweets）
- OAuth 实时连接作历史读取入口（P2）
- AI 改写旧推文、企业版/团队、常驻授权托管、i18n 多语言

---

## 3. 技术架构（锁定）

### 生产目标架构（来自架构文档 v1.1）
- 前端/Web/API：Next.js（React + TypeScript），Vercel 部署
- 常驻任务：独立 Node.js（TypeScript）Worker 进程（删除队列，不可放 Serverless 短函数）
- 数据库：PostgreSQL（JSONB），托管 Supabase/Neon
- 缓存/队列：Redis（限速令牌桶 + BullMQ）
- 对象存储：加密 S3 兼容（R2/S3 + SSE-KMS），归档文件生命周期自动销毁

### MVP 本地开发底座（工程裁定·可运行优先）
> 决定：为让 MVP 在本机可运行、可演示，且不与 Spec 语义降级冲突，本地开发态采用以下等价底座；Schema 字段、API 契约、限速/队列语义严格对齐生产架构。
- 数据库：**SQLite（better-sqlite3）**，表结构与 Postgres 草案字段 1:1（UUID 用 TEXT，JSONB 用 TEXT(JSON)）。
- 删除队列：**进程内 Worker**（Node setInterval 消费本地任务表）+ **令牌桶限速**（50/15min，内存实现）。无需 Redis。
- 归档存储：**本地加密文件**（AES-256-GCM，密钥取自 `ARCHIVE_ENC_KEY` 环境变量，缺省用固定开发密钥并告警）；带保留期自动销毁 + 主动擦除接口。
- X 删除执行：实现完整 `DELETE /2/tweets/:id` 客户端 + 限速 + 退避 + 续传；提供 **dry-run 模拟模式**（无真实 token 时按限速时钟推进并产出与真实一致的进度/费用报告），保证无凭证也能演示完整「治疗」闭环。
- 支付：实现 Stripe 测试集成骨架 + 无凭证时的「本地模拟支付」回环（标记订单 paid），保证删除流程可端到端跑通；真实 vendor/KYC 留待上线阶段。

### 认证方案
- X OAuth 2.0 PKCE（scope：`tweet.write users.read`），前端不持 client_secret/令牌；会话用 HttpOnly cookie。
- MVP 落地可不强制登录即可走完 Stage 1（上传→解析→报告），仅在发起删除（F4）时要求连接 X 授权 + 付费。

---

## 4. API 端点清单（锁定——开发时以此为唯一依据）

统一响应：`{ "code": 0, "data": {}, "message": "" }`（code≠0 为错误）。
鉴权：除登录/回调外依赖 HttpOnly 会话 cookie；删除类端点要求有效 X 授权 + 已完成支付核销。

| Method | Path | 功能 | 认证 | 请求体 | 响应体（关键字段） |
|--------|------|------|------|--------|--------------------|
| GET | `/api/auth/x/login` | 发起 X 登录，返回授权 URL | 否 | — | `{ authUrl }` |
| GET | `/api/auth/x/callback` | OAuth 回调，换令牌建会话 | 否 | query: code,state | `{ username, xUserId }` |
| POST | `/api/auth/x/logout` | 登出清会话 | 会话 | — | `{ ok }` |
| GET | `/api/me` | 当前用户与授权状态 | 会话 | — | `{ username, xAuthorized, tier }` |
| POST | `/api/archive/upload` | 上传归档（multipart, ≤200MB, csv/js/zip） | 会话(可选) | form: file | `{ archiveId, status }` |
| GET | `/api/archive/:id` | 归档状态/元数据 | 会话 | — | `{ id, status, totalTweets, fileFormat }` |
| POST | `/api/archive/:id/parse` | 触发解析（或上传后自动） | 会话 | — | `{ status, totalTweets }` |
| DELETE | `/api/archive/:id` | 隐私擦除（删文件+关联 tweets） | 会话 | — | `{ ok }` |
| POST | `/api/reports` | 生成体检报告（异步） | 会话 | `{ archiveId }` | `{ reportId, status }` |
| GET | `/api/reports/:id` | 读取报告 | 会话 | — | `{ score, riskLevel, details, topRiskyTweets }` |
| POST | `/api/delete-tasks` | 创建删除任务 | X授权+支付 | `{ archiveId, dateRange?, keywords?, protectIds?, budgetCapUsd? }` | `{ taskId, estimate }` |
| GET | `/api/delete-tasks/:id/progress` | 进度查询 | 会话 | — | `{ total, processed, succeeded, failed, status, costIncurredUsd, costIncurredCny, pausedReason }` |
| POST | `/api/delete-tasks/:id/pause` | 暂停 | 会话 | — | `{ status }` |
| POST | `/api/delete-tasks/:id/resume` | 恢复 | 会话 | — | `{ status }` |
| POST | `/api/delete-tasks/:id/cancel` | 取消（停止后续，保留已删） | 会话 | — | `{ status }` |

> 预估卡结构（创建任务前返回）：`{ tweetCount, estDays, estCostUsd, estCostCny, budgetInputUsd }`。

---

## 5. 数据库表清单（锁定）

命名蛇形；每表含 `id` + `created_at` + `updated_at`；SQLite 下 UUID 用 TEXT，JSONB 用 TEXT(JSON)。

### users
`id TEXT PK`, `x_user_id TEXT UNIQUE`, `username TEXT`, `display_name TEXT`, `created_at`, `updated_at`

### x_credentials
`id TEXT PK`, `user_id TEXT FK`, `access_token_enc TEXT`, `refresh_token_enc TEXT`, `scope TEXT`, `token_expires_at TEXT`, `status TEXT(active/revoked)`, `created_at`, `updated_at`

### archives
`id TEXT PK`, `user_id TEXT FK`, `file_name TEXT`, `file_format TEXT(csv/js)`, `storage_key TEXT`, `status TEXT(uploaded/parsing/parsed)`, `total_tweets INT`, `created_at`, `updated_at`, `deleted_at`

### tweets
`id INTEGER PK AUTOINCREMENT`, `archive_id TEXT FK`, `tweet_id TEXT`, `created_at TEXT`, `text_hash TEXT`, `status TEXT(pending/deleting/deleted/failed)`, `delete_attempts INT`, `last_error TEXT`, `updated_at`
唯一索引：`(archive_id, tweet_id)`；索引：`status`, `created_at`

### delete_tasks
`id TEXT PK`, `user_id TEXT FK`, `archive_id TEXT FK`, `status TEXT(running/paused/done/failed)`, `total INT`, `processed INT`, `succeeded INT`, `failed INT`, `daily_limit INT`, `budget_cap_usd NUMERIC(10,2)`, `cost_incurred_usd NUMERIC(10,2)`, `paused_reason TEXT`, `started_at`, `finished_at`, `updated_at`
索引：`user_id`, `archive_id`, `status`

### health_reports
`id TEXT PK`, `user_id TEXT FK`, `archive_id TEXT FK`, `score INT(0-100)`, `risk_level TEXT(low/medium/high)`, `details TEXT(JSON)`, `created_at`
索引：`user_id`, `archive_id`

> 会话与 OAuth state 存内存/Redis 替代（本地用内存 Map + cookie）。

---

## 6. 页面清单（锁定）

| 页面 | 路由 | 核心组件 | 对应 API | 设计 Token 主题 |
|------|------|----------|----------|-----------------|
| ① 落地/连接 X | `/` | 细导航 + 报告卡预览(mock) + 三步流程 + 隐私承诺条 + 主CTA | `/api/me` | 浅色·临床蓝·Lucide |
| ② 上传归档 | `/upload` | Dropzone(多状态) + 如何获取归档 Accordion + 解析结果列表 | `/api/archive/upload`,`/parse` | 浅色·临床蓝·Lucide |
| ③ 体检报告仪表盘 | `/report/[id]` | 报告头(mono) + 径向分数仪表(SVG) + 分项风险卡(6) + 修复建议列表 + 导出/清理CTA | `/api/reports/:id`,`/api/reports` | 浅色·临床蓝·语义三态 |
| ④ 删除确认 | `/delete/confirm?archiveId=` | 删除范围摘要卡 + 范围单选(含筛选器) + 不可逆警示条 + 同意勾选 + 危险按钮(armed) | `/api/delete-tasks`(预估) | 浅色·error 语义克制 |
| ⑤ 删除进度 | `/delete/[taskId]` | 确定性进度条 + 当前动作 + 实时日志(mono) + 暂停/取消 + 完成成功态 | `/api/delete-tasks/:id/progress`等 | 浅色·临床蓝·语义三态 |

---

## 7. 设计 Token（锁定）

### 主色（冷静临床蓝）
`--blue-500:#3A6AE0` 标准；`--blue-600:#2E5BCB` 主色/hover 基准；`--blue-700:#244AA6`；`--blue-800:#1B3A82`；`--color-primary:#2E5BCB`；`--color-primary-hover:#244AA6`；`--color-primary-active:#1B3A82`；`--color-primary-subtle:rgba(46,91,203,0.08)`；`--color-primary-border:rgba(46,91,203,0.20)`

### 语义三态（仅风险指示，无装饰渐变）
`--color-success:#16A34A` / `--color-success-text:#15803D` / `--color-success-subtle:rgba(22,163,74,0.10)`
`--color-warning:#D97706` / `--color-warning-text:#B45309` / `--color-warning-subtle:rgba(217,119,6,0.10)`
`--color-error:#DC2626` / `--color-error-text:#B91C1C` / `--color-error-subtle:rgba(220,38,38,0.10)`
`--color-info:#0E7490` / `--color-info-subtle:rgba(14,116,144,0.10)`
评分映射：`≥80 绿 / 60–79 琥珀 / <60 红`。

### 中性色（带冷蓝调，禁用纯黑纯灰）
`--bg-primary:#F6F8FC`；`--bg-surface:#FFFFFF`；`--bg-subtle:#EEF2F8`；`--bg-inset:#F1F4F9`
`--text-primary:#0F172A`；`--text-secondary:#475569`；`--text-muted:#94A3B8`
`--border-default:#E2E8F0`；`--border-strong:#CBD5E1`；`--border-focus:#2E5BCB`

### 字体
`--font-display/body: "Inter","Noto Sans SC",-apple-system,BlinkMacSystemFont,sans-serif`
`--font-mono: "JetBrains Mono","Fira Code",ui-monospace,monospace`（专用于分数/@handle/日期/ID/日志）

### 字号（仅 8 级）
12/14/16/18/20/24/32/40(px)。报告总分用 40 + mono。

### 间距（4px 网格）
4/8/12/16/20/24/32/40/48/64/80。

### 圆角
`--radius-sm:6` `--radius-md:10` `--radius-lg:16` `--radius-xl:20` `--radius-full:999`。

### 阴影（克制）
`--shadow-sm:0 1px 2px rgba(15,23,42,0.04)`；`--shadow-md:0 2px 8px rgba(15,23,42,0.06)`；`--shadow-lg:0 8px 24px rgba(15,23,42,0.08)`。卡片靠边框，禁止彩色发光阴影。

### 动效
`--duration-fast:150ms` `--duration-normal:250ms` `--duration-slow:400ms` `--easing-smooth:cubic-bezier(0.4,0,0.2,1)`。尊重 `prefers-reduced-motion`。

### 图标库（强制）
**唯一 Lucide**（`lucide-react`）。三档尺寸 16/20/24。绝对禁止 emoji 作功能图标。
映射：连接=`Plug`/上传=`UploadCloud`/报告=`ClipboardList`/分项=`Activity`·`MapPin`·`History`·`MessageSquare`·`UserCheck`·`ShieldCheck`/删除=`Trash2`/进度=`Loader`/成功=`CheckCircle2`/警告=`AlertTriangle`/导出=`Download`/隐私=`Lock`。

### 主题
MVP 仅浅色主题。深色 deferred（复用同语义层反向值）。

---

## 8. 验收标准（锁定——QA 测试时以此为唯一依据）

**F1 归档上传解析（C1）**
- Given 用户已下载 X 官方归档，When 上传解析，Then 本地提取推文总数/时间跨度/媒体/@对象，全程不调 X 读取 API，展示解析摘要；失败给明确错误+重试指引。
- Given 用户不知如何下载，When 进入上传页，Then 展示图文引导。

**F2 体检报告+评分（C2）**
- Given 解析完成，When 触发体检，Then 本地生成 0–100 健康分+等级+分项(PII/定位/敏感语义/媒体/旧帖占比/账号暴露)+≥3 条示例高危推文；零读成本。
- Given 归档空/极少，When 体检，Then 提示「样本不足」而非错误分。

**F3 仪表盘**
- Given 报告已生成，When 打开仪表盘，Then 5 秒内读懂总分/分项图形/Top 高危样例。

**F4 删除+护栏+成本/时长预期（C3）**
- Given 查看待删清单+设保护列表，When 点确认删除，Then 先弹费用/时长预估卡（待删 N、≈$X/¥Y、≈Z 天）；二次确认付费后入队列。
- Given 队列运行，When 暂停再恢复，Then 断点续删不重复计费；进度实时更新。
- Given 遇 429/限速，When 重试，Then 自动退避，状态可见。
- Given 完成，When 查看，Then 展示已删/失败/受保护 + 实付费用。
- Given 含保护列表推文，When 执行，Then 跳过并标注。

**F5 选择性删除**：Given 选日期/关键词/媒体范围，When 创建任务，Then 仅该范围入队且前置展示费用与时长。
**F6 PDF 导出**：Given 报告已生成，When 点导出，Then 下载含总分/分项/高危样例的 PDF（本地生成）。
**F7 复检 / F8 定时**：本期预留入口与接口，不强制实现后台调度。

---

## 9. 边界与约束
- 不支持 IE；要求现代 evergreen 浏览器；响应式。
- 归档流式解析防 OOM；上传限制 + 进度条。
- 同账号不允许两个删除任务并行（防重复删/计费）。
- 删除中断网 → 本地记进度，恢复续删，不丢状态不重复计费。
- X 写授权失败/撤销 → 任务挂起提示重授权，已删保留。
- 归档解析后不长期存明文；明确告知存储与销毁策略；保留期后自动销毁 + 主动擦除接口。
- 计费透明：任何删除前必展示费用与时长估算；实扣以 X 账单为准，差额说明。
- 删除限速 50/15min；预算主维度=金额(USD)，达 `budget_cap_usd` 自动暂停；与 `daily_limit` 正交。
- 反 AI 味设计硬红线：无紫色渐变、无 emoji 图标、无千篇一律 Hero、无彩色发光阴影、无弹跳缓动。

---

## 10. 变更记录
| 日期 | 变更内容 | 原因 | 影响范围 |
|------|----------|------|----------|
| 2026-07-13 | Spec v1.0.0 初版生成 | 用户确认三文档并要求推进开发 | 全部 |
| 2026-07-13 | 新增中英文国际化（i18n） | 用户要求产品支持中英文 | 前端 5 页 + 组件 + NavBar 语言切换器；后端风险旗改为结构化 `kind`、计费方案改为结构化 `id`（移除中文 name/desc）；新增 `lib/i18n.ts`（zh/en 双目录）+ `components/I18nProvider.tsx`；语言策略：自动识别浏览器 locale + localStorage 记忆，仅前端界面本地化 |

---

*— Spec v1.0.0 锁定；超出本文件范围的需求一律走变更流程 —*
