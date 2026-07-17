# 数字足迹体检报告 — MVP 架构文档

> 本文档为**纯规划文档**，不含任何代码。面向隐私焦虑个人（C 端），MVP 数据范围仅限 X/Twitter，产品形态为 Web 应用。
> 两大能力：(1) X 数字足迹「体检报告」诊断/评分；(2) 把「删除全部历史推文」作为清理手段。

---

## 0. 一页式结论（供共享内存池快速校验）

**技术约束（硬性，来自 X API 调研，不可绕过）**
- X 自 2026-02 起默认 pay-per-use 计费，新开发者**无免费读取档**；Free 档仅可写（1500 帖/月），无读取权限。
- 读取 $0.005/帖、写入 $0.01/帖、互动 $0.015/帖；月读上限 200 万帖，超出强制 Enterprise（约 $42,000/月）。
- `recent search` 仅 **7 天窗口**；全量历史归档搜索为 **Enterprise 专属** → **无法通过 API 枚举用户历史推文**。
- 删除端点 `DELETE /2/tweets/:id`，**用户级限速 50 次 / 15 分钟 / 每个授权用户**；鉴权 OAuth 2.0 PKCE，scope：`tweet.read + tweet.write + users.read`。
- 访问令牌约 **2 小时过期**，需 refresh token 静默刷新。
- 推论：删除全部历史推文**必须**让用户下载自己的 X 归档文件（CSV/JS），提取推文 ID，再按 50/15min 限速逐条 DELETE；5 万条约需 10+ 天，必须做可断点续传的队列 + 限速退避 + 进度持久化 + 令牌刷新。

**选型结论**
- 前端/Web/API：**Next.js（React + TypeScript）**，全栈一体，Vercel 部署。
- 后台常驻：**独立 Node.js（TypeScript）Worker 进程**（跑删除队列，不可放 Serverless 短函数）。
- 数据库：**PostgreSQL**（含 JSONB），托管选用 Supabase / Neon 免费档。
- 缓存与队列：**Redis**（Upstash 或 Railway），用于 OAuth state/会话、删除限速令牌桶、BullMQ 任务队列、进度缓存。
- 对象存储：加密 S3 兼容存储（Cloudflare R2 / AWS S3 + SSE-KMS），存归档文件，带生命周期自动销毁。

**不可行警告（MVP 红线）**
1. 历史推文**无法靠 API 枚举**（7 天窗口 + 全量搜索 Enterprise 化）→ 报告与删除**必须基于用户自己下载的归档文件**，不可依赖实时 API 拉历史。
2. API **读取成本高且无免费档** → MVP **严禁任何历史读取**，体检报告完全由归档本地生成。
3. 删除**耗时长且为付费写操作**（50/15min ≈ 4800/天；5 万条 ≈ 10+ 天；按 $0.01/写 ≈ $500）→ 必须队列化、可暂停、可断点续传，并向用户明示费用与时长。

---

## 1. 技术选型对比矩阵

### 1.1 前端 / Web 框架

| 方案 | 学习成本 | 生态成熟度 | SSR/SEO | 与后端一体 | 部署成本 | 结论 |
|------|----------|------------|---------|------------|----------|------|
| **Next.js（React + TS）** | 中 | 极高 | 原生 | 是（API Routes / Route Handlers） | Vercel 免费档 | ✅ 推荐 |
| Nuxt 3（Vue 3 + TS） | 中 | 高 | 原生 | 是 | 中等 | 备选 |
| SvelteKit（TS） | 低 | 中 | 原生 | 是 | 低 | 备选 |

**推荐 Next.js**，理由：
- 全栈一体：UI + OAuth 回调 + 归档上传 + 报告生成 API 同库，避免前后端分离的多仓库与跨域复杂度，最匹配 MVP 小团队。
- React 生态最大，组件/库最丰富；Vercel 一键部署，免费档覆盖 MVP 流量。
- SSR 利于报告页分享与可选 SEO。
- TypeScript 与后端/Worker 同源，降低认知负担。

### 1.2 后端 / 常驻任务

| 方案 | 学习成本 | 生态成熟度 | 异步/后台任务 | 与前端同语言 | 部署成本 | 结论 |
|------|----------|------------|---------------|--------------|----------|------|
| **Next.js Route Handlers + 独立 Node Worker（TS）** | 低（同语言） | 高 | 需自建队列（BullMQ） | 是 | 低 | ✅ 推荐 |
| NestJS + 独立 Node Worker（TS） | 中 | 高 | 需自建队列 | 是 | 中 | 备选 |
| FastAPI（Python）+ Worker | 中 | 高 | asyncio 友好 | 否（双语言栈） | 中 | 备选 |

**推荐 Next.js（Web/API）+ 独立 Node.js（TS）Worker**，理由：
- 全栈单一 TypeScript 代码库，团队只维护一套语言与类型。
- **删除队列是长耗时常驻任务（10+ 天）**，**绝不能放在 Serverless 短函数里跑**（Vercel Functions 有 15s/60s 超时）。必须由独立常驻容器/进程消费 Redis 队列，可单独扩容、可崩溃重连续跑。
- OAuth 令牌、归档文件仅在服务端处理，前端永不见明文令牌。

### 1.3 数据库

| 方案 | 学习成本 | 生态成熟度 | 结构化 + JSON | 托管成本 | 事务/并发 | 结论 |
|------|----------|------------|---------------|----------|-----------|------|
| **PostgreSQL** | 中 | 极高 | JSONB 原生 | Supabase/Neon 免费档 | 强 | ✅ 推荐 |
| MySQL | 中 | 极高 | JSON 支持弱 | 低 | 强 | 备选 |
| MongoDB | 低 | 高 | 文档天然 | 中等 | 最终一致 | 备选 |

**推荐 PostgreSQL**，理由：
- 用户、X 授权、归档、推文、删除任务、体检报告均为强结构化关系数据，需要外键约束与事务（删除进度一致性必须 ACID）。
- `JSONB` 可存体检报告的 `details` 维度与归档原始片段，兼顾灵活。
- 托管（Supabase/Neon）有免费档，零运维起步。
- 预留 `pgvector` 扩展，为后续「相似/敏感内容聚类」留扩展位（非 MVP）。

### 1.4 缓存 / 队列 / 存储（单列推荐）

| 用途 | 推荐 | 说明 |
|------|------|------|
| 限速令牌桶 / 会话 / 进度缓存 | **Redis**（Upstash serverless 或 Railway Redis） | 删除限速 50/15min 用令牌桶实现；OAuth state 与会话放 Redis（5min 过期） |
| 删除任务队列 | **BullMQ on Redis** | 任务入队、重试、暂停/恢复 |
| 归档对象存储 | **加密 S3 兼容（R2 / S3 + SSE-KMS）** | 静态 AES-256；生命周期策略自动销毁 |

---

## 2. 整体架构图

```
┌──────────────────────────────────────────────────────────────────────┐
│                          浏览器 (现代浏览器, 响应式)                    │
│   登录 / 上传归档 / 查看体检报告 / 查看&控制删除进度                      │
└───────────────┬──────────────────────────────┬───────────────────────┘
                │ HTTPS (TLS1.2+)               │ HTTPS
                ▼                               ▼
┌───────────────────────────┐        ┌──────────────────────────────────┐
│   Next.js (Web + API)      │        │   独立 Node.js Worker (常驻进程)   │
│  - 页面 (SSR)              │        │   - BullMQ 消费删除任务            │
│  - /api/auth/x/* 回调      │        │   - 限速令牌桶 (50/15min)          │
│  - /api/archive/* 上传解析 │        │   - 指数退避 / 断点续传            │
│  - /api/reports/* 报告     │        │   - 令牌刷新 (refresh_token)      │
│  - 会话校验 (HttpOnly cookie)│      └───────────────┬──────────────────┘
└───────────┬───────────────┘                        │ DELETE /2/tweets/:id
            │                                        │  (50/15min/用户)
            ├──────────────┬──────────────┬──────────┼──────────┐
            ▼              ▼              ▼          │          ▼
      ┌──────────┐  ┌────────────┐  ┌──────────┐    │   ┌──────────────┐
      │PostgreSQL│  │   Redis    │  │加密对象存储│    │   │  X / Twitter  │
      │ users    │  │ state/会话 │  │ (归档文件) │    │   │   OAuth2 PKCE │
      │ x_cred   │  │ 限速桶     │  │ SSE-KMS   │    │   │   DELETE API  │
      │ archives │  │ 队列/进度  │  └──────────┘    │   └──────────────┘
      │ tweets   │  └────────────┘                  │
      │ delete_  │                                   │
      │ tasks    │◄────────────── 进度写回 ───────────┘
      │ reports  │
      └──────────┘
```

**数据流要点**
- 用户身份与令牌：`X OAuth PKCE → Next.js 回调 → 加密存 x_credentials → 前端仅持会话 cookie`。
- 归档：`用户上传 → 加密对象存储 → 异步解析 Job → tweets 表（仅 tweet_id + 派生统计）`。
- 删除：`delete_tasks → BullMQ → Worker 取令牌桶 → X DELETE → 进度写回 delete_tasks/tweets`。

---

## 3. X 接入方案

### 3.1 OAuth 2.0 PKCE 登录流程

**申请 scope（最小权限原则）**
- 必需：`tweet.write`（删除推文必需）、`users.read`（获取用户身份用于绑定账号）。
- 不申请 `tweet.read`：MVP 不做任何直播读取（规避读成本 + 7 天窗口限制），故不扩大授权面。
- 边界说明：X 网关在个别场景可能要求 `tweet.read` 与 `tweet.write` 成对出现；若实测强制，则补 `tweet.read`，但**仍不调用任何读取端点**。

**PKCE 流程（前端不持 client_secret / 不持令牌）**
1. 前端点「用 X 登录」→ `GET /api/auth/x/login`。
2. 后端生成 `code_verifier`（高熵随机 ≥43 字符）、`code_challenge = BASE64URL(SHA256(code_verifier))`、`state`（CSRF 随机值）。
3. 后端将 `code_verifier + state` 存入 Redis，绑定会话 cookie（5 分钟过期）。
4. 302 跳转：
   ```
   https://x.com/i/oauth2/authorize
     ?response_type=code
     &client_id=<APP_CLIENT_ID>
     &redirect_uri=<CALLBACK>
     &scope=tweet.write%20users.read
     &state=<state>
     &code_challenge=<code_challenge>
     &code_challenge_method=S256
   ```
5. 用户在 X 授权后回调 `GET /api/auth/x/callback?code=...&state=...`。
6. 后端校验 `state` → 从 Redis 取 `code_verifier` → `POST https://api.x.com/2/oauth2/token`：
   ```
   grant_type=authorization_code&code=<code>&redirect_uri=<CALLBACK>
   &code_verifier=<code_verifier>&client_id=<APP_CLIENT_ID>
   ```
   获得 `access_token` + `refresh_token` + `expires_in`。
7. 用 `access_token` 调 `GET https://api.x.com/2/users/me` 取 `x_user_id`、`username`。
8. 加密（`AES-256-GCM`，密钥来自 KMS）存储 `access_token`/`refresh_token` 到 `x_credentials`；建立/更新 `users`；种会话 cookie（仅会话 ID，**不含令牌**）。
9. 返回前端，登录完成。

### 3.2 归档文件上传与解析

**归档获取方式**：用户在 X「设置与隐私 → 下载存档」中获取 CSV 与 JS 两种格式。

**格式结构（解析目标：抽取推文 ID）**
- **CSV（`tweets.csv`）**：表头含 `tweet_id, created_at, text, ...`；逐行一条推文。取 `tweet_id`（字符串）、`created_at`。
- **JS（`tweets.js` / `data.js`）**：形如
  ```js
  window.YTD.tweets.part0 = [
    { "tweet": { "id_str": "1xxxxxxxxxxxxxx", "created_at": "Tue Jan 01 ...",
                "text": "...", "favorite_count": "...", ... } },
    ...
  ];
  ```
  - 注意 JS 格式用 `id_str`（字符串），CSV 用 `tweet_id`。解析后**统一归一为字符串型 tweet_id**。
  - ⚠️ **严禁 `eval` 执行用户 JS**；使用安全的解析器/正则抽取数组中的 `id_str` 与 `created_at`。
- 伴随文件 `account.js` 含注册时间、邮箱等敏感信息，仅按需取注册时间，**绝不入库明文**。

**上传**
- `POST /api/archive/upload`（multipart），限制大小（如 ≤200MB），校验扩展名仅 `csv|js`，服务端 MIME 复核，禁止当作可执行处理。
- 落**加密对象存储**（SSE-KMS），写 `archives` 元数据，`status=uploaded`。原始 text **默认不入库**（隐私最小化）。

**解析（异步 Job）**
- CSV：流式解析（避免大文件 OOM），抽取 `tweet_id`、`created_at`；`text` 仅用于本地统计（如敏感词计数）后丢弃，或仅存 `text_hash`。
- JS：抽取 `id_str`、`created_at`；同样不执行脚本。
- 去重：按 `tweet_id` 去重；`total_tweets` 计数写回 `archives`。
- 批量写入 `tweets`（5 万量级分批 INSERT，每批如 2000 条）。
- 完成后 `archives.status=parsed`。

### 3.3 删除队列设计（核心）

**约束回顾**：`DELETE /2/tweets/:id`；用户级限速 **50 次 / 15 分钟**；`access_token` ~2h 过期需刷新；5 万条 ≈ 10+ 天。

**任务模型**
- `delete_tasks`：一个归档 → 一个删除任务；记录 `total / processed / succeeded / failed / status / daily_limit / budget_cap_usd / cost_incurred_usd / paused_reason`（计费字段详见 3.5）。
- `tweets`：每行带 `status`（pending / deleting / deleted / failed）、`delete_attempts`、`last_error`。

**限速（Redis 令牌桶）**
- 每用户一个桶：容量 = 50，每 15 分钟补满。
- Worker 取待删 tweet 前先 `tryAcquire`；取不到则 sleep 至下一窗口（避免硬刷 429）。

**指数退避**
- 遇 `429`（限速）/`5xx`：该 tweet 标记 `failed`，退避 `2^n` 秒（上限如 1 小时）后重试；
- `delete_attempts` 超过阈值（如 8 次）标记**永久 failed** 并告警，不阻塞其余推文。

**断点续传**
- 进度持久化于 `delete_tasks`（计数）+ `tweets.status`。
- Worker 崩溃/重启后，从未删除（`status != deleted`）且非「删除中卡死」的 tweets 续跑。
- `deleting` 状态设超时回收（如 5 分钟未更新视为失败重排），防止僵尸任务。

**令牌刷新（统一封装 `getValidToken(userId)`）**
- 每批删除前检查 `access_token` 是否临近过期（<10min），用 `refresh_token` 静默换发；更新 `x_credentials` 与 Redis 缓存。
- `refresh_token` 失效（`invalid_grant`）→ 暂停任务，前端提示用户重新授权。

**暂停 / 恢复 / 成本阀**
- `delete_tasks.status = running | paused`；用户可暂停（如超预算）。
- 提供「每日删除上限（daily_limit）」「按日期范围删除」或「本次预算上限（budget_cap_usd）」，**避免一次性 5 万条触发 $500 费用爆雷**（计费与预算控制详见 3.5）。

### 3.4 令牌刷新策略

- `refresh_token`（加密）存 `x_credentials`；`access_token` 缓存 Redis（带 `exp`）。
- `getValidToken(userId)`：读缓存 → 有效则返回；否则用 `refresh_token` 换发 → 更新表与缓存。
- 失败（`invalid_grant`）→ 置 `x_credentials.status=revoked`，前端提示重新登录授权。

### 3.5 计费与预算控制模块（C3 衍生需求，已与 PRD §9.4 对齐）

删除是付费写操作（$0.01/条）。MVP 采用**平台代缴 + 接支付**模式（见 3.6 / 第 9 节）：用户付 ¥ 档位价，平台用自有 X API 额度代缴写费（$0.01/条）、留毛利。删除流程本身须含**实时费用累计 + 按预算上限截断 + 与 X 实扣对账 + 费用展示**，由 Worker 在删除队列内同步驱动；这部分为 MVP 必做，**不依赖支付模块上线**。

**计费单位与累加口径（Q1 已定，稳定）**
- 假设成立：**成功删除 1 条 = 1 次 write = $0.01**。
- 累加口径：`cost_incurred_usd` 仅以「X DELETE 成功返回（与 `succeeded` 同事务）」的条目数为准；失败不计、预删不计。
- 范围：MVP 仅 tweets。quote tweet 属用户发出的 tweet，删 = 1 write = $0.01，计入；likes / DM 已在 Won't Have 排除，不计；retweet 不做专项清理（若随「全删」包含，每条成功删除同样 $0.01）。
- 结论：MVP 删除流程中**无其它被 X 计为写的操作混入**，`cost_incurred_usd` 口径干净。

**实时费用累计**
- 每成功 DELETE 一条，`delete_tasks.cost_incurred_usd += 0.01`，并 `succeeded += 1`（同一事务内，保证计数与费用一致）。
- `tweets.status` 由 `deleting → deleted` 的跃迁是**幂等**的：已 `deleted` 的推文在断点续传时不会被再次请求，故**不会重复计费**（C3「断点不重复计费」验收点）。

**按预算上限截断（Q2 主维度 = 金额）**
- 预算主维度 = **金额（USD 基准）**：创建任务时设 `budget_cap_usd`（本次最多花 $X）；条数作为关联展示（「$X 约可删 N 条」，N = X / 0.01）。
- Worker 每批删除前检查：`if cost_incurred_usd + batch_estimate >= budget_cap_usd` → 不再取桶、置 `status=paused`、`paused_reason=budget_reached`，前端提示「预算已用完，可上调上限或改期继续」。
- 与既有 `daily_limit`（每日条数上限）正交：两者任一触顶即暂停。

**费用展示币种（Q3 已定）**
- 基准 USD（对齐 X 账单）。MVP 叠加本地币种 ¥ 展示：`costIncurredCny = costIncurredUsd × 7.2`。
- 汇率口径 = **固定 1 USD = 7.2 CNY**，写死为配置常量（零外部依赖）；页面标注「汇率按固定 1:7.2 估算，仅供参考」。接支付后再升级为每日更新。
- 进度/报告接口可同时返回 `costIncurredUsd` 与 `costIncurredCny`。

**与 X API 实扣对账（代缴上下文）**
- 平台用自有 X API 额度执行删除，X 实际账单记在平台侧。本地 `cost_incurred_usd` 为「我们发起的成功写」累计，是展示与预估的基准，也是平台侧 X 额度核销的对照。
- 对账方式：
  - 轻量版（MVP）：进度/报告页展示 `costIncurredUsd`（= succeeded × $0.01）与 `costIncurredCny`，并提示「以 X Developer 账单为最终凭证」；
  - 精确版（可选）：若 X 提供 usage/计量端点，定时拉取平台 X 写用量并与 `succeeded` 比对，差异告警。
- 因断点续传幂等，本地 `succeeded` 即实际已删条数，对账误差应仅来自 X 侧重试计费（429/5xx 重试未成功不计数；成功才计数）。

**预估卡（前端，Q2 文案结构）**
- 创建任务前展示：预估条数、预估时长（条数 ÷ 4800/天）、预估费用（$ 及 ≈¥）、预算输入（**金额为主**，条数作关联）。满足 PRD「前置费用/时长预估卡」。

### 3.6 支付与额度托管模块（待 team-lead 确认后实现）

> 属跨职能（vendor 选型 / 退款政策 / KYC 合规）事项，PRD §9.5 列为待 team-lead/业务拍板项。**不阻塞 MVP 非支付部分（预估 / 累计 / 预算截断 / 对账报告）的收口。**

- **支付模块（收款）**：接入支付 vendor（如 Stripe），用户按档位付 ¥；处理下单、回调、退款。vendor 选型与退款/KYC 政策待业务拍板。
- **额度托管模块**：记录用户档位权益（如 Pro 2k 条/月），每次成功删除核销 1 条额度；额度耗尽则阻断或提示升级。
- **串联链路**：`用户付费（¥）→ 平台授予/核销 X 额度 → Worker 执行删除（代缴 $0.01/条）→ cost_incurred_usd 累计`。平台毛利 = 档位价 − X 写费。
- 实现前置条件：team-lead 确认支付 vendor 与合规策略后再落地；本期仅预留接口与数据位（如 `tiers`、`user_entitlements` 表待定），不写实现。

---

## 4. 不可行警告（MVP 红线，明确写出）

1. **历史推文无法靠 API 枚举**：`recent search` 仅 7 天窗口；全量历史归档搜索为 Enterprise 专属（约 $42,000/月）。因此「体检报告」与「删除全部历史推文」**都必须基于用户自己下载的 X 归档文件**，不能依赖实时 API 拉取历史。
2. **API 读取成本高且无免费档**：2026-02 起 pay-per-use，读 $0.005/帖，无免费读取；月读上限 200 万帖，超出强制 Enterprise。MVP **必须避免任何历史读取**，报告完全由归档本地生成。
3. **删除耗时长且为付费写操作**：限速 50/15min → 约 4800/天；5 万条 ≈ 10+ 天；且每次 DELETE 计为写，pay-per-use $0.01/条 → 5 万条 ≈ $500（或消耗 Free 档 1500 写/月额度）。必须队列化、可暂停、可断点续传，且需向用户明示费用与时长预期。
4. **范围边界**：本产品不做「实时监听 / 增量删除」，不做跨平台（仅 X），不做历史推文内容通过 API 回填。

---

## 5. API 端点清单草案（供后续 Spec）

统一响应格式：
```json
{ "code": 0, "data": {}, "message": "" }
```
鉴权：除登录/回调外，均依赖 HttpOnly 会话 cookie；服务端据此取 `x_credentials` 令牌。

| Method | Path | 用途 | 说明 |
|--------|------|------|------|
| GET | `/api/auth/x/login` | 发起 X 登录 | 返回授权 URL 或 302 跳转；生成 PKCE 参数存 Redis |
| GET | `/api/auth/x/callback` | OAuth 回调 | 校验 state，换令牌，建会话 |
| POST | `/api/auth/x/logout` | 登出 | 清会话，可选撤销令牌 |
| GET | `/api/me` | 当前用户与授权状态 | 返回 username / 授权是否有效 |
| POST | `/api/archive/upload` | 上传归档文件 | multipart，≤200MB，csv/js |
| GET | `/api/archive/:id` | 归档状态/元数据 | status / total_tweets |
| POST | `/api/archive/:id/parse` | 触发解析 | 或上传后自动解析 |
| POST | `/api/delete-tasks` | 创建删除任务 | body: `{ archiveId, dateRange?, dailyLimit?, budgetCapUsd? }`；budgetCapUsd 为本次预算上限（USD） |
| GET | `/api/delete-tasks/:id/progress` | 进度查询 | 返回 total/processed/succeeded/failed/status/costIncurredUsd/costIncurredCny/pausedReason |
| POST | `/api/delete-tasks/:id/pause` | 暂停任务 | — |
| POST | `/api/delete-tasks/:id/resume` | 恢复任务 | — |
| POST | `/api/reports` | 生成体检报告 | body: `{ archiveId }`，异步生成 |
| GET | `/api/reports/:id` | 读取报告 | 返回 score / riskLevel / details |
| DELETE | `/api/archive/:id` | 隐私擦除 | 删除归档文件与关联 tweets（用户主动销毁） |

---

## 6. 数据库表清单草案

> 命名：蛇形复数；每表含 `id` + `created_at` + `updated_at`；外键显式声明；软删用 `deleted_at`。MVP 不建复合索引，待慢查询再加。

### users
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| x_user_id | TEXT UNIQUE | X 数字 ID |
| username | TEXT | |
| display_name | TEXT | |
| created_at / updated_at | TIMESTAMPTZ | |

索引：`x_user_id`（UNIQUE）。

### x_credentials
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| user_id | UUID FK → users | |
| access_token_enc | TEXT | AES-256 加密 |
| refresh_token_enc | TEXT | AES-256 加密 |
| scope | TEXT | |
| token_expires_at | TIMESTAMPTZ | |
| status | TEXT | active / revoked |
| created_at / updated_at | TIMESTAMPTZ | |

索引：`user_id`。

### archives
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| user_id | UUID FK → users | |
| file_name | TEXT | |
| file_format | TEXT | csv / js |
| storage_key | TEXT | 对象存储 key |
| status | TEXT | uploaded / parsing / parsed |
| total_tweets | INT | |
| created_at / updated_at / deleted_at | TIMESTAMPTZ | 软删/隐私擦除标记 |

索引：`user_id`、`status`。

### tweets
| 字段 | 类型 | 说明 |
|------|------|------|
| id | BIGSERIAL PK | |
| archive_id | UUID FK → archives | |
| tweet_id | TEXT | X 推文 ID（字符串） |
| created_at | TIMESTAMPTZ | 推文时间 |
| text_hash | TEXT | 可选，隐私最小化，不存明文 |
| status | TEXT | pending / deleting / deleted / failed |
| delete_attempts | INT | |
| last_error | TEXT | |
| updated_at | TIMESTAMPTZ | |

索引：`archive_id`、`(archive_id, tweet_id) UNIQUE`、`status`、`created_at`。

### delete_tasks
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| user_id | UUID FK → users | |
| archive_id | UUID FK → archives | |
| status | TEXT | running / paused / done / failed |
| total | INT | |
| processed | INT | |
| succeeded | INT | |
| failed | INT | |
| daily_limit | INT | 可选每日条数上限（成本控制） |
| budget_cap_usd | NUMERIC(10,2) | 可选本次预算上限（USD）；达上限自动暂停 |
| cost_incurred_usd | NUMERIC(10,2) | 实时累计已发生费用 = 成功删除条数 × $0.01 |
| paused_reason | TEXT | budget_reached / user_paused / token_revoked / manual |
| started_at / finished_at / updated_at | TIMESTAMPTZ | |

索引：`user_id`、`archive_id`、`status`。

### health_reports
| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID PK | |
| user_id | UUID FK → users | |
| archive_id | UUID FK → archives | |
| score | INT | 0–100 |
| risk_level | TEXT | low / medium / high |
| details | JSONB | 各维度评分与建议 |
| created_at | TIMESTAMPTZ | |

索引：`user_id`、`archive_id`。

> 会话与 OAuth state 存 Redis（非关系表），5 分钟过期。

---

## 7. 部署与成本估算

### 7.1 X API 费用模型
- 读 $0.005/帖（MVP **不使用**）。
- 写 $0.01/帖 → 删除计写；5 万条 ≈ **$500**。**MVP 由平台代缴**：平台用自有 X API 额度执行删除，写费计入平台成本（已由档位价覆盖，见 3.5/3.6），用户不直接向 X 付费。
- 月读上限 200 万帖，超出强制 Enterprise。
- Free 档：1500 写/月（可做极小删除验证，量级不足以清历史）。

### 7.2 基础设施（MVP 月度）
| 项 | 方案 | 成本 |
|----|------|------|
| Web/API | Vercel（Next.js）免费档 | $0 起步 |
| Worker（常驻） | Railway / Render 容器 | $5–20/月 |
| 数据库 | Supabase / Neon 免费档 | $0 起步 |
| Redis | Upstash 免费档 | $0 起步 |
| 对象存储 | R2 / S3 + SSE-KMS | 几乎免费（小文件） |

**合计基础设施 ≈ $5–25/月**（X API 删除费由平台承担，计入档位成本，不向用户单列；见 3.5/3.6）。**

### 7.3 归档文件隐私 / 安全（强约束）
- 传输 TLS 1.2+；静态 **AES-256（SSE-KMS）**，密钥与数据分离。
- 处理完成后默认保留期（如 7 天）后**自动销毁**；用户可主动 `DELETE /api/archive/:id` 即时擦除（含对象存储文件 + `tweets` 关联）。
- 原始 `text` **默认不入库**；仅保留 `tweet_id` + 统计所需派生数据。
- 审计日志：上传 / 解析 / 删除 / 销毁全程留痕。

---

## 8. 性能与安全边界

- **浏览器支持**：不支持 IE；要求现代 evergreen 浏览器（Chrome / Edge / Firefox / Safari 近两版）；响应式（C 端移动端可用）。
- **大文件**：归档流式解析避免内存爆；上传限制 + 进度条。
- **并发**：删除严格限速；解析任务幂等（按 `tweet_id` 去重）。
- **令牌不落前端**：access/refresh token 仅服务端加密存储；前端仅持会话 cookie（HttpOnly, Secure, SameSite=Lax）。
- **归档加密**：静态加密 + 传输加密 + 最小保留期。
- **OAuth**：PKCE + `state` 防 CSRF；最小 scope。
- **其他**：上传/创建任务限流防滥用；报告渲染转义防 XSS；回调参数校验。

---

## 9. MVP 范围建议

- **必做**：归档上传 → 解析 → 体检报告（本地生成，零 API 读成本）；基于归档的删除队列（限速 / 退避 / 续传 / 进度 / 暂停）。
- **建议砍**：实时 API 读取（成本 + 7 天限制不可行）；跨平台；增量监听。
- **最大可行性风险**：删除慢（10+ 天 / 5 万条）且贵（$500），需在产品层设预期 + 提供「按日期范围 / 每日上限」降级，避免用户一次性触发巨额费用。
- **范围收敛建议**：MVP 可**先上线「体检报告」单能力**（无删除）验证需求与转化；删除作为第二阶段，因其运维/成本/时长复杂度最高，且依赖归档上传这一已验证的用户行为。
- **计费模块范围（C3 衍生，已与 PRD §9.4 对齐）**：删除流程须含「实时费用累计 + 按预算上限截断 + 与 X 实扣对账 + 费用展示」（详见 3.5）。MVP 计费模式定为**平台代缴 + 接支付**（否定纯透传）：用户付 ¥ 档位价，平台用自有 X API 额度代缴写费（$0.01/条）、留毛利；故需**支付模块（收款）+ 额度托管模块（档位权益核销）**，串联链路见 3.6。币种展示以 USD 为基准、叠加固定汇率 1:7.2 的 ¥ 展示（详见 3.5）。支付 vendor 选型 / 退款 / KYC 属跨职能，列为待 team-lead/业务拍板项（PRD §9.5），**不阻塞预估 / 累计 / 预算截断 / 对账报告等非支付部分的收口**。

---

*文档版本：MVP 规划 v1.1 — 计费小节收口（C3 衍生，已对齐 PRD §9.4），纯架构规划，无代码。*
