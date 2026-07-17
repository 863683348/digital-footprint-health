# Phase 2 详细设计 — 数字足迹体检报告 MVP

> 阶段：Phase 1.5 Spec 已锁定 → Phase 2 设计细化（**只产出契约/规格，不写应用代码**）
> 依据：Spec v1.0.0（§3 技术架构 / §4 API 端点 / §5 数据库表）为唯一开发依据
> 本地底座：SQLite（better-sqlite3）+ 进程内 Worker + 令牌桶（对齐生产 Postgres/Redis 语义，Schema 1:1）
> 读者：Phase 3 后端 agent（照此写实现）、前端 agent（照类型契约对接）
> 约定：UUID → `TEXT`；JSONB → `TEXT`（存 JSON 字符串）；时间 → `TEXT`（ISO8601 UTC，如 `2026-07-13T08:30:00Z`）

---

## 0. 与 Spec/PRD 的对齐与增列说明（务必先读）

- 本文件严格对齐 Spec §3（SQLite 底座）、§4（15 端点）、§5（6 表）。
- **唯一增列**：Spec §5 的 `tweets` 表**未含**评分所需的 `favorite_count` / `media` / `@对象` 等字段，但 Spec §4 的 F2 评分与 §3 解析规格明确要求这些派生信号。为此 `tweets` 表新增 **7 个派生列**（全部为数值/布尔，**非明文**，隐私安全），并保留 Spec 原有的 `text_hash`（明文永不在库持久化）。详见 §1.4 注释。
- **score 可空**：Spec §5 写 `score INT(0-100)`，但 PRD §7 要求「样本不足」不打错误分。故 `health_reports.score` 在样本 <10 时写 `NULL`，响应契约 `score: number | null`，前端据 `details.insufficientSample` 展示提示。
- 全文为规格/契约；算法以可编码的伪代码/公式描述，**不含** Next.js 页面或 Route Handler 实现代码（那是 Phase 3 的事）。

---

## 1. SQLite DDL（可直接被 better-sqlite3 执行）

> 整段为一个 SQL 字符串，`db.exec(sql)` 一次执行即可建表 + 建索引。
> 连接后执行 `PRAGMA foreign_keys = ON;` 启用外键（SQLite 默认关闭）。

```sql
PRAGMA foreign_keys = ON;

-- ============ users ============
CREATE TABLE IF NOT EXISTS users (
  id            TEXT PRIMARY KEY,             -- UUID
  x_user_id     TEXT UNIQUE,                  -- X 数字 ID（OAuth 后填充，未登录为 NULL）
  username      TEXT,
  display_name  TEXT,
  created_at    TEXT NOT NULL,                -- ISO8601
  updated_at    TEXT NOT NULL                 -- ISO8601
);

-- ============ x_credentials ============
CREATE TABLE IF NOT EXISTS x_credentials (
  id                TEXT PRIMARY KEY,         -- UUID
  user_id           TEXT NOT NULL,
  access_token_enc  TEXT NOT NULL,            -- AES-256-GCM 密文(base64: iv|tag|ct)
  refresh_token_enc TEXT NOT NULL,            -- AES-256-GCM 密文(base64)
  scope             TEXT,                      -- 如 "tweet.write users.read"
  token_expires_at  TEXT,                     -- ISO8601（access_token 过期时刻）
  status            TEXT NOT NULL DEFAULT 'active',  -- active | revoked
  created_at        TEXT NOT NULL,
  updated_at        TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_x_credentials_user_id ON x_credentials(user_id);

-- ============ archives ============
CREATE TABLE IF NOT EXISTS archives (
  id            TEXT PRIMARY KEY,             -- UUID
  user_id       TEXT,                          -- 匿名上传可为 NULL
  file_name     TEXT,
  file_format   TEXT,                          -- csv | js
  storage_key   TEXT,                          -- 加密归档存储 key（本地: 加密文件名/路径）
  status        TEXT NOT NULL DEFAULT 'uploaded',  -- uploaded | parsing | parsed
  total_tweets  INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL,
  updated_at    TEXT NOT NULL,
  deleted_at    TEXT,                          -- 隐私擦除时间戳（软删）
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
CREATE INDEX IF NOT EXISTS idx_archives_user_id ON archives(user_id);
CREATE INDEX IF NOT EXISTS idx_archives_status ON archives(status);

-- ============ tweets ============
-- 说明：在 Spec §5 字段(id/archive_id/tweet_id/created_at/text_hash/status/delete_attempts/
-- last_error/updated_at) 基础上，增 7 个【派生特征列】(数值/布尔, 非明文)，供 F2 评分与 F7
-- 复检使用。明文 text 永不在本表持久化（见 §4 隐私策略）。
CREATE TABLE IF NOT EXISTS tweets (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  archive_id      TEXT NOT NULL,
  tweet_id        TEXT NOT NULL,              -- X 推文 ID（归一为字符串）
  created_at      TEXT,                        -- 推文时间 ISO8601
  text_hash       TEXT,                        -- sha256(utf8 原文)，隐私最小化

  -- —— 评分派生列（解析期在内存计算后写入，非明文）——
  favorite_count  INTEGER NOT NULL DEFAULT 0,  -- 点赞数
  has_media       INTEGER NOT NULL DEFAULT 0,  -- 0/1 是否含图/视频
  media_kind      TEXT,                        -- image | video | both | NULL
  mention_count   INTEGER NOT NULL DEFAULT 0,  -- @对象数量（账号暴露维度）
  pii_flag        INTEGER NOT NULL DEFAULT 0,  -- 解析期 PII 正则命中 0/1
  location_flag   INTEGER NOT NULL DEFAULT 0,  -- 解析期位置启发命中 0/1
  sensitive_flag  INTEGER NOT NULL DEFAULT 0,  -- 解析期敏感词命中 0/1

  -- —— 删除状态机 ——
  status          TEXT NOT NULL DEFAULT 'pending',  -- pending|deleting|deleted|failed
  delete_attempts INTEGER NOT NULL DEFAULT 0,
  last_error      TEXT,
  updated_at      TEXT NOT NULL,
  FOREIGN KEY (archive_id) REFERENCES archives(id) ON DELETE CASCADE
);
CREATE UNIQUE INDEX IF NOT EXISTS uq_tweets_archive_tweet ON tweets(archive_id, tweet_id);
CREATE INDEX IF NOT EXISTS idx_tweets_status      ON tweets(status);
CREATE INDEX IF NOT EXISTS idx_tweets_archive_id  ON tweets(archive_id);
CREATE INDEX IF NOT EXISTS idx_tweets_created_at  ON tweets(created_at);

-- ============ delete_tasks ============
CREATE TABLE IF NOT EXISTS delete_tasks (
  id                TEXT PRIMARY KEY,          -- UUID
  user_id           TEXT,
  archive_id        TEXT NOT NULL,
  status            TEXT NOT NULL DEFAULT 'running',  -- running|paused|done|failed
  total             INTEGER NOT NULL DEFAULT 0,  -- 本次实际待删（已剔除保护列表）
  processed         INTEGER NOT NULL DEFAULT 0,
  succeeded         INTEGER NOT NULL DEFAULT 0,
  failed            INTEGER NOT NULL DEFAULT 0,
  daily_limit       INTEGER,                    -- 每日条数上限(可选)
  budget_cap_usd    NUMERIC(10,2),              -- 本次预算上限 USD(可选)
  cost_incurred_usd NUMERIC(10,2) NOT NULL DEFAULT 0,  -- 实时累计 = 成功删除 × 0.01
  paused_reason     TEXT,                       -- budget_reached|user_paused|token_revoked|user_cancelled|manual|NULL
  started_at        TEXT,
  finished_at       TEXT,
  updated_at        TEXT NOT NULL,
  FOREIGN KEY (user_id)   REFERENCES users(id)   ON DELETE SET NULL,
  FOREIGN KEY (archive_id) REFERENCES archives(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_delete_tasks_user_id    ON delete_tasks(user_id);
CREATE INDEX IF NOT EXISTS idx_delete_tasks_archive_id ON delete_tasks(archive_id);
CREATE INDEX IF NOT EXISTS idx_delete_tasks_status     ON delete_tasks(status);

-- ============ health_reports ============
-- score 允许 NULL：样本不足(<10)时不打错误分，写 NULL，由 details.insufficientSample 驱动 UI。
CREATE TABLE IF NOT EXISTS health_reports (
  id          TEXT PRIMARY KEY,                -- UUID
  user_id     TEXT,
  archive_id  TEXT NOT NULL,
  score       INTEGER,                         -- 0-100 健康分；样本不足为 NULL
  risk_level  TEXT NOT NULL,                   -- low | medium | high（不足时为 'low' 占位）
  details     TEXT,                            -- JSON 字符串（结构见 §3.5）
  created_at  TEXT NOT NULL,
  FOREIGN KEY (user_id)   REFERENCES users(id)   ON DELETE SET NULL,
  FOREIGN KEY (archive_id) REFERENCES archives(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_health_reports_user_id    ON health_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_health_reports_archive_id ON health_reports(archive_id);
```

---

## 2. API 类型契约（TypeScript）

> 统一响应：`{ code: 0, data: {}, message: "" }`。`code !== 0` 为错误。
> 鉴权：除 login/callback 外依赖 HttpOnly 会话 cookie；删除类端点要求有效 X 授权 + 已完成支付核销。

### 2.1 基础类型与枚举

```ts
/** 统一响应包装 */
export interface ApiResponse<T> {
  code: number;      // 0 = 成功；非 0 = 错误码
  data: T;
  message: string;   // 成功时为空串；错误时人类可读描述
}

/** 枚举 */
export type FileFormat        = 'csv' | 'js';
export type ArchiveStatus     = 'uploaded' | 'parsing' | 'parsed';
export type TweetStatus       = 'pending' | 'deleting' | 'deleted' | 'failed';
export type DeleteTaskStatus  = 'running' | 'paused' | 'done' | 'failed';
export type RiskLevel         = 'low' | 'medium' | 'high';
export type CredentialStatus  = 'active' | 'revoked';
export type Tier              = 'free' | 'pro';
export type ReportStatus      = 'generating' | 'ready';
export type PausedReason =
  | 'budget_reached' | 'user_paused' | 'token_revoked' | 'user_cancelled' | 'manual' | null;

/** 删除预估卡（Spec §4 末段） */
export interface DeleteEstimate {
  tweetCount: number;        // 本次待删条数（已剔除保护列表与筛选）
  estDays: number;           // ceil(tweetCount / 4800)
  estCostUsd: number;        // tweetCount * 0.01
  estCostCny: number;        // estCostUsd * 7.2（固定汇率 1:7.2）
  budgetInputUsd?: number;   // 用户预算输入（金额主维度，可选）
}

/** 报告维度 key */
export type DimensionKey = 'pii' | 'location' | 'sensitive' | 'media' | 'old' | 'account';
```

### 2.2 逐端点契约（对齐 Spec §4 的 15 个端点）

```ts
// ── 1. GET /api/auth/x/login ──
// 请求：无 query / 无 body
export interface LoginResponse { authUrl: string; }

// ── 2. GET /api/auth/x/callback ──
export interface CallbackQuery { code: string; state: string; }
export interface CallbackResponse { username: string; xUserId: string; }

// ── 3. POST /api/auth/x/logout ──
// 请求：无 body
export interface LogoutResponse { ok: boolean; }

// ── 4. GET /api/me ──
// 请求：无；匿名(未登录)时 username = null, xAuthorized = false
export interface MeResponse {
  username: string | null;
  xAuthorized: boolean;
  tier: Tier;
}

// ── 5. POST /api/archive/upload ──
// 请求体为 multipart/form-data，字段名固定为 'file'（非 JSON）
export interface UploadResponse { archiveId: string; status: ArchiveStatus; }

// ── 6. GET /api/archive/:id ──
export interface ArchiveMetaResponse {
  id: string;
  status: ArchiveStatus;
  totalTweets: number;
  fileFormat: FileFormat | null;
}

// ── 7. POST /api/archive/:id/parse ──
// 请求：无 body
export interface ParseResponse { status: ArchiveStatus; totalTweets: number; }

// ── 8. DELETE /api/archive/:id ──
// 请求：无 body（隐私擦除：删文件 + 关联 tweets）
export interface EraseArchiveResponse { ok: boolean; }

// ── 9. POST /api/reports ──
export interface CreateReportRequest { archiveId: string; }
export interface CreateReportResponse { reportId: string; status: ReportStatus; }

// ── 10. GET /api/reports/:id ──
export interface MatchedExample {
  tweetId: string;
  snippet: string;          // 命中片段(≤80字)；原文已清除时为 "(原文已清除)"
}
export interface HealthDimensionScore {
  key: DimensionKey;
  label: string;            // 中文维度名
  score: number;            // 0-100 该维度风险分
  level: RiskLevel;         // 该维度等级
  matchedExamples: MatchedExample[];  // 前 3 条（按严重度）
  suggestion: string;       // 修复建议
}
export interface HealthReportDetails {
  insufficientSample: boolean;  // 样本不足(<10)标记
  sampleSize: number;
  generatedAt: string;          // ISO8601
  dimensions: HealthDimensionScore[];  // 6 个维度
}
export interface TopRiskyTweet {
  tweetId: string;
  reason: string;          // 主要风险维度label
  snippet: string;
}
export interface GetReportResponse {
  score: number | null;    // 0-100；样本不足为 null
  riskLevel: RiskLevel;
  details: HealthReportDetails;
  topRiskyTweets: TopRiskyTweet[];
}

// ── 11. POST /api/delete-tasks ──
export interface DateRange { start?: string; end?: string; }  // ISO8601，可仅单侧
export interface CreateDeleteTaskRequest {
  archiveId: string;
  dateRange?: DateRange;
  keywords?: string[];
  protectIds?: string[];
  budgetCapUsd?: number;
}
export interface CreateDeleteTaskResponse {
  taskId: string;
  estimate: DeleteEstimate;
}

// ── 12. GET /api/delete-tasks/:id/progress ──
export interface DeleteProgressResponse {
  total: number;
  processed: number;
  succeeded: number;
  failed: number;
  status: DeleteTaskStatus;
  costIncurredUsd: number;
  costIncurredCny: number;
  pausedReason: PausedReason;
}

// ── 13. POST /api/delete-tasks/:id/pause ──
export interface DeletePauseResponse { status: DeleteTaskStatus; }
// ── 14. POST /api/delete-tasks/:id/resume ──
export interface DeleteResumeResponse { status: DeleteTaskStatus; }
// ── 15. POST /api/delete-tasks/:id/cancel ──
export interface DeleteCancelResponse { status: DeleteTaskStatus; }
```

### 2.3 错误码约定（建议）

| code | 含义 | HTTP |
|------|------|------|
| 0 | 成功 | 200 |
| 40001 | 归档格式不支持 | 400 |
| 40002 | 归档解析无推文/损坏 | 400 |
| 40003 | 文件超过 200MB | 400 |
| 40101 | 未登录/会话失效 | 401 |
| 40102 | X 授权失效/已撤销 | 401 |
| 40201 | 未完成支付核销 | 402 |
| 40401 | 资源不存在 | 404 |
| 40901 | 同账号已有运行中的删除任务 | 409 |
| 50001 | 存储/内部错误（可重试） | 500 |

---

## 3. 体检评分算法规格（核心 · 须可编码）

目标：从归档 tweets 计算 **0–100 健康分**（越高越安全），并给出 6 维度分项风险 + 高危样例。零 API 读成本，纯本地。

### 3.1 输入与可用字段

- **每条 tweet 可用**：`created_at`(ISO8601)、`favorite_count`、`has_media`/`media_kind`、`mention_count`、`pii_flag`/`location_flag`/`sensitive_flag`（上述 7 派生列），以及报告生成时**在内存**读到的 `text`（见 §4 隐私策略：明文仅在报告生成期短暂驻留，用于 PII/位置/敏感词匹配与 snippet 生成，之后丢弃）。
- **归档级**：`accountExposure`（解析 account 文件得到：是否含绑定邮箱/注册时间，布尔；**不存明文**）。
- **报告日期** `reportDate`：用于计算「旧帖」（>3 年）。

> 降级模式：若报告生成时归档文件已擦除（无法在内存取 text），则 PII/位置/敏感 3 维改用持久化的 `pii_flag`/`location_flag`/`sensitive_flag` 作为命中依据（仍可得分），但 `matchedExamples[].snippet` 显示 `"(原文已清除)"`。媒体/旧帖/账号 3 维始终基于持久化派生列，不受影响。

### 3.2 六个维度及信号

下列每个维度的信号提取 → 算出聚合信号值 `s_i ∈ [0,1]`（0=无风险，1=满风险）。

#### ① PII 暴露（pii）
- 正则（对 text 应用）：
  - 邮箱：`[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}`
  - 手机（中国）：`1[3-9]\d{9}`；国际：`(?:\+?\d{1,3}[\s.-]?)?\d{3}[\s.-]?\d{3,4}[\s.-]?\d{4}`
  - 身份证（中国 18 位，宽松）：`\d{6}(?:19|20)\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])\d{3}[\dXx]`
  - 住址：`(?:住址|地址|家住|现居|位于|邮编|zip|addr)[：: ]?.{0,24}` 或 `省|市|区.+?(路|号|小区|栋|单元)`
- 分类：`idPhone` = 命中 身份证/手机；`anyPii` = 命中任一。
- 聚合：
  - `anyRatio` = 含任意 PII 的推文数 / 样本数
  - `idPhoneRatio` = 含 身份证/手机 的推文数 / 样本数
  - `s_pii = clamp(0.6*anyRatio + 0.4*idPhoneRatio, 0, 1)`

#### ② 位置泄露（location）
- 信号（text）：
  - 经纬度：`(-?\d{1,3}\.\d+)[,\s]+(-?\d{1,3}\.\d+)`
  - 显式自述：`(?:在|我住|我家|我在|我位于|位于|出发去|到达|今天在|刚才在).{0,12}`
  - 地点名词词典（示例）：北京/上海/广州/深圳/杭州/成都/武汉/南京/西安/重庆/纽约/洛杉矶/伦敦/东京/巴黎/悉尼/西湖/外滩/天安门/五角场（≥20 个，可扩展）
- 聚合：`locRatio` = 命中任一位置信号的推文数 / 样本数
  - `s_location = clamp(locRatio, 0, 1)`（命中经纬度时额外 +0.1 上限封顶）

#### ③ 敏感/争议语义（sensitive）
- 词典结构：`{ term: string; category: 'politics'|'profanity'|'negative'|'controversial'; weight: number /*0.5–1.0*/ }[]`
- 示例词（18 个，覆盖 4 类）：
  - politics（政治，w=0.9）：政治、政府、总统、选举、示威、维权、审查、游行
  - profanity（脏话，w=0.7）：傻逼、去死、废物、滚蛋、操你
  - negative（负面情绪，w=0.8）：抑郁、想死、绝望、崩溃、活不下去
  - controversial（争议，w=0.85）：举报、撕逼、黑料、内幕、潜规则
- 匹配：对 text 做大小写不敏感、词边界（短词用包含匹配，短语用精确匹配）扫描，收集命中 terms。
  - 单 tweet 敏感分 `tweetSensitive = clamp(Σ 命中 weight, 0, 1)`
  - `sensitiveRatio` = `tweetSensitive > 0` 的推文数 / 样本数
  - `avgTopWeight` = 敏感推文的 `tweetSensitive` 均值（无敏感推文则为 0）
  - `s_sensitive = clamp(0.7*sensitiveRatio + 0.3*avgTopWeight, 0, 1)`

#### ④ 媒体暴露（media）
- `s_media = hasMediaRatio` = (`has_media=1` 的推文数) / 样本数。（video 比 image 更暴露，但 MVP 用统一占比；`media_kind` 仅用于样例排序。）

#### ⑤ 旧帖可溯（old）
- `isOld(tweet)` = `reportDate - created_at > 3 年`（按 `OLD_POST_YEARS = 3`，用毫秒差 `> 3*365*24*3600*1000`）。
- `s_old = oldRatio` = (`isOld` 推文数) / 样本数。占比越高 → 越可能含已被遗忘的高风险内容 → 风险越高。

#### ⑥ 账号暴露（account）
- 信号：
  - `accountFileExposure` ∈ {0,1}：归档 account 文件是否暴露绑定邮箱/注册时间（解析期得到，不存明文）。
  - `mentionActivity = clamp(avgMentionCount / 10, 0, 1)`：`avgMentionCount` = 全部 tweet 的 `mention_count` 均值；@ 越多社交图谱越可被追溯。
- `s_account = clamp(0.4*accountFileExposure + 0.6*mentionActivity, 0, 1)`

### 3.3 评分公式与权重

| 维度 | key | 权重 w_i | 说明 |
|------|-----|----------|------|
| PII 暴露 | pii | 0.25 | 直接身份泄露，最高权重 |
| 敏感语义 | sensitive | 0.20 | 争议/负面内容可被检索放大 |
| 位置泄露 | location | 0.15 | 地理定位 |
| 旧帖可溯 | old | 0.15 | 遗忘的旧内容 |
| 账号暴露 | account | 0.15 | 注册信息/@图谱 |
| 媒体暴露 | media | 0.10 | 图/视频最易被爬取 |
| **合计** | — | **1.00** | — |

- 各维度风险分：`dimScore_i = round(s_i * 100)`，等级：`dimScore >= 80 → 'high'`；`60–79 → 'medium'`；`<60 → 'low'`。
- 整体风险占比：`overallRisk = Σ (w_i * s_i)` ∈ [0,1]
- **健康分**：`healthScore = round(100 * (1 - overallRisk))` ∈ [0,100]
- 总风险等级（对齐设计 Token）：
  - `healthScore >= 80 → 'low'`（绿）
  - `60 <= healthScore < 80 → 'medium'`（琥珀）
  - `healthScore < 60 → 'high'`（红）

### 3.4 样本不足处理（<10 条）

- 若 `sampleSize < 10`：**不打数字分**。
  - `health_reports.score = NULL`；`risk_level = 'low'`（占位，避免红/琥珀误导）；`details.insufficientSample = true`；`details.dimensions` 仍照常计算（供展示趋势），但 UI 以「样本不足，仅供参考」覆盖数字。
  - 响应 `GetReportResponse.score = null`，前端据 `details.insufficientSample` 显「样本不足」而非分数。

### 3.5 health_reports.details JSON 结构

```json
{
  "insufficientSample": false,
  "sampleSize": 1234,
  "generatedAt": "2026-07-13T08:30:00Z",
  "dimensions": [
    {
      "key": "pii",
      "label": "PII 暴露",
      "score": 42,
      "level": "medium",
      "matchedExamples": [
        { "tweetId": "1556...", "snippet": "我的手机号是 138**** 有事联系" },
        { "tweetId": "1602...", "snippet": "邮箱 a**@b.com 长期可用" },
        { "tweetId": "1710...", "snippet": "身份证 3301********** 办理" }
      ],
      "suggestion": "建议优先删除含手机号、身份证的推文；邮箱可手动打码后再发。"
    },
    {
      "key": "location",
      "label": "位置泄露",
      "score": 18,
      "level": "low",
      "matchedExamples": [
        { "tweetId": "12...", "snippet": "今天在西湖边散步" }
      ],
      "suggestion": "减少实时定位/地标打卡类内容。"
    },
    {
      "key": "sensitive",
      "label": "敏感/争议语义",
      "score": 55,
      "level": "medium",
      "matchedExamples": [
        { "tweetId": "9...", "snippet": "这件事的的内幕真是…" }
      ],
      "suggestion": "争议性表述易被检索放大，删除或改为私信沟通。"
    },
    {
      "key": "media",
      "label": "媒体暴露",
      "score": 30,
      "level": "low",
      "matchedExamples": [
        { "tweetId": "3...", "snippet": "（含视频）" }
      ],
      "suggestion": "含图的推文最易被第三方缓存，清理可降暴露。"
    },
    {
      "key": "old",
      "label": "旧帖可溯",
      "score": 70,
      "level": "high",
      "matchedExamples": [
        { "tweetId": "1...", "snippet": "（2019 年旧帖）当年吐槽…" }
      ],
      "suggestion": "3 年前的推文最可能被遗忘，建议批量清理。"
    },
    {
      "key": "account",
      "label": "账号暴露",
      "score": 22,
      "level": "low",
      "matchedExamples": [
        { "tweetId": "5...", "snippet": "@userA @userB 谢谢两位" }
      ],
      "suggestion": "高频 @ 会增加社交图谱可追溯性，敏感互动可考虑删除。"
    }
  ]
}
```

- `matchedExamples`：每个维度取 **前 3 条**按严重度排序：
  - pii：先 身份证/手机，再 邮箱，再 住址；
  - location：先 经纬度，再 自述，再 地点名词；
  - sensitive：按 `tweetSensitive` 降序；
  - media：先 video，再 both，再 image；
  - old：按 `created_at` 升序（最旧最危险）；
  - account：按 `mention_count` 降序。
- `snippet`：命中文本前后截取 ≤80 字；降级模式（无明文）填 `"(原文已清除)"`。
- `topRiskyTweets`（报告顶层）：跨维度取 `dimScore` 最高且 `level='high'` 的推文去重，最多 10 条，`reason` 取主维度 label。

---

## 4. 归档解析规格

目标：把用户上传的 X 官方归档（CSV / JS）安全解析为 `tweets` 行 + 派生特征列，**明文 text 不持久化**。

### 4.1 输入与格式识别

- 上传：`POST /api/archive/upload`（multipart，字段 `file`，≤200MB）。
- 扩展名/MIME 校验：仅允许 `.csv` / `.js`（及归档 zip 解压后的二者）；拒绝可执行。
- 格式识别：`file_format = 'csv' | 'js'`，由扩展名 + 内容嗅探共同决定。

### 4.2 CSV 解析（tweets.csv）

- 期望表头（大小写不敏感匹配）：`tweet_id, created_at, text, favorite_count`（变种：`favorites`→`favorite_count`）。
- 字段映射：`tweet_id → tweet_id`；`created_at → created_at`（X 格式如 `Tue Jan 01 12:00:00 +0000 2020`，解析为 ISO8601）；`text →` 用于内存统计；`favorite_count → favorite_count`。
- **媒体推断**：
  - 优先：若同归档含 `tweets_media.csv`/`media.csv`，按 `tweet_id` 关联 → `has_media=1`，`media_kind` 取 media 类型（image/video/gif→video）。
  - 回退：text 含 `pic.twitter.com` 或 `https://t.co/` 后接已知媒体域名正则 → `has_media=1`，`media_kind` 未知时记 `image`。
- 流式逐行读取（防 OOM），逐批处理。

### 4.3 JS 解析（window.YTD.tweets.partN）

- 结构：`window.YTD.tweets.part0 = [ { "tweet": { "id_str":"...", "created_at":"...", "full_text":"...", "favorite_count":N, "entities": { "media": [{"type":"photo|video", ...}] } } }, ... ];`
- **严禁 `eval`**。采用安全解析（二选一，推荐前者）：
  1. **沙箱 VM（推荐）**：用 Node `vm` 模块，准备一个含 `window = {}` 的 context，把文件作为脚本运行（仅执行赋值语句，不执行任意逻辑），运行后读取 `window.YTD.tweets.partN` 数组。安全点：上下文无 `process`/`require`/文件系统，且只取已知命名空间。
  2. **正则截取（兜底）**：以 `window.YTD.tweets.part\d+\s*=\s*` 为锚，截取其后第一个完整 `[...]` JSON 数组，用 `JSON.parse` 解析。
- 多 part 文件（part0/part1/...）全部合并。
- 字段提取：`id_str → tweet_id`（字符串）、`created_at → created_at`、`full_text||text →` 内存统计、`favorite_count → favorite_count`、media 来自 `entities.media`（存在则 `has_media=1`，`media_kind` 由 `type` 映射）。
- **账号文件**：解析 `account.js`（`window.YTD.account.part0`）取 `email`/`created_at`（注册时间）→ 仅置归档级 `accountExposure` 布尔，**绝不入库明文**。

### 4.4 归一化、去重、派生统计、批量写入

1. **归一**：`tweet_id` 统一为字符串（JS 的 `id_str` 与 CSV 的 `tweet_id` 合并口径）。
2. **@对象计数**：`mention_count = (text.match(/@(\w{1,15})/g) || []).length`（内存）。
3. **派生 flag（内存，正则/词典扫描 text）**：`pii_flag`/`location_flag`/`sensitive_flag` 由 §3.2 对应正则/词典对 text 扫描得到（0/1）。
4. **text_hash**：`sha256(utf8(text))`，持久化 `text_hash`。**明文 text 不写入 `tweets`**。
5. **去重**：按 `(archive_id, tweet_id)` 去重（首个出现保留；重复跳过）。
6. **批量插入**：每批 1000–2000 条，用 better-sqlite3 事务（`BEGIN/COMMIT`）批量 `INSERT OR IGNORE`；`archives.total_tweets` 在解析完成后一次性回写，`archives.status='parsed'`。
7. **隐私策略（推荐方案）**：
   - 解析期：text 仅驻留内存，算完派生 flag + hash 后即丢弃；`tweets` 表**不持久化明文**。
   - 报告生成期（§3）：**重新流式解密归档文件**在内存解析 text → 做 PII/位置/敏感匹配并生成 snippet → 写 `health_reports.details` → 丢弃。此方案使 `tweets` 永不存明文，且支持 F7 复检（归档未擦除前可重算）。
   - 降级：若归档已擦除，评分改用 `tweets` 持久化的 3 个 flag（`pii_flag`/`location_flag`/`sensitive_flag`）作为命中依据，snippet 显示 `"(原文已清除)"`。

### 4.5 错误类型与重试指引

| 错误 | 触发 | 响应 | 重试指引 |
|------|------|------|----------|
| ERR_FORMAT_UNSUPPORTED | 非 csv/js | 40001 | 请上传 X 官方归档的 CSV 或 JS 文件 |
| ERR_FILE_TOO_LARGE | >200MB | 40003 | 文件超过 200MB，请分包或重新下载 |
| ERR_PARSE_NO_TWEETS | 提取到 0 条 | 40002 | 未找到推文，可能文件损坏或非推文归档 |
| ERR_CORRUPT | 解析抛错/数组未闭合 | 40002 | 文件解析失败，请重新从 X「设置→下载存档」获取完整归档 |
| ERR_STORAGE_WRITE | 写库/加密存储失败 | 50001 | 服务端错误，可重试上传 |

- 图文引导：上传页提供「如何下载归档」Accordion（设置与隐私 → 下载存档 → 解压 → 上传 `tweets.csv` 或 `tweets.js`）。

---

## 5. 删除 Worker 规格（进程内常驻）

> 常驻 Node 进程消费 `delete_tasks`；本地用进程内调度（setInterval）+ 本地任务表替代 BullMQ/Redis，语义对齐生产。

### 5.1 限速令牌桶（50 / 15min，内存实现）

- 结构：`bucket = { tokens: number, lastRefill: number /*epoch ms*/ }`，容量 `CAP=50`，窗口 `WINDOW_MS=15*60*1000`，补充速率 `RATE=50/WINDOW_MS`（每 ms 补 `50/900000`）。
- 取令牌（线程安全，本地用单进程无需分布式锁）：
  ```
  now = Date.now()
  bucket.tokens = min(CAP, bucket.tokens + (now - bucket.lastRefill) * RATE)
  bucket.lastRefill = now
  if bucket.tokens >= 1: bucket.tokens -= 1; return true
  else: return false   // 调用方 sleep 至下一窗口(可重置 lastRefill 对齐)
  ```
- **可重置时间戳**：遇 429 时可将 `lastRefill` 重置为「当前窗口起点」以对齐 X 的 15min 窗口，避免硬刷。

### 5.2 指数退避（429 / 5xx）

- 单 tweet 失败（429 或 5xx）：`delete_attempts += 1`，调度重试于 `now + min(2^delete_attempts 秒, 3600)`（上限 1h）。
- `delete_attempts > 8` → 标记 `status='failed'`、`last_error='max_retries_exceeded'`，**不阻塞**其余推文。
- 401（令牌失效）：走 §5.5 刷新；刷新失败（`invalid_grant`）→ 暂停任务（见 §5.4）。

### 5.3 断点续传（基于 tweets.status）

- 启动时对任务归档：`status='deleting' AND updated_at < now-5min` → 回收为 `status='pending'`（防僵尸卡死）。
- 取待删：`SELECT ... WHERE archive_id=? AND status='pending' AND tweet_id NOT IN (protectIds) [+dateRange/keywords 过滤] ORDER BY created_at`，按批取（如每批 ≤ CAP）。
- 进度：`processed = pending+deleting+deleted+failed` 累计；`total` 为任务创建时锁定值。

### 5.4 费用累计（同事务 · 幂等）

- 每条成功删除在**一个事务**内：
  ```
  BEGIN;
    UPDATE tweets SET status='deleted', updated_at=now WHERE id=? AND status IN ('pending','deleting');
    -- 仅当确实发生状态跃迁(changed rows=1)才计费：
    UPDATE delete_tasks
       SET succeeded = succeeded + 1,
           processed = processed + 1,
           cost_incurred_usd = cost_incurred_usd + 0.01,
           updated_at = now
     WHERE id=taskId;
  COMMIT;
  ```
- **幂等不重复计费**：已 `deleted` 的推文在续传时不会被再次 `UPDATE`（WHERE 条件排除），故不计入 `succeeded`、不 +0.01。`cost_incurred_usd` 口径 = 成功 DELETE 数 × 0.01，与 X 实扣对齐。

### 5.5 暂停 / 恢复 / 取消

- **pause**：`delete_tasks.status='paused'`, `paused_reason='user_paused'`；Worker 停止为该任务取新令牌。
- **resume**：`status='running'`, `paused_reason=NULL`。
- **cancel**：停止后续、保留已删 → `status='done'`, `paused_reason='user_cancelled'`（终态，部分完成；`total-processed` 即剩余未删）。
- 预算阀：每批前检查 `if budget_cap_usd != NULL AND cost_incurred_usd + batch_estimate >= budget_cap_usd` → `status='paused'`, `paused_reason='budget_reached'`。与 `daily_limit`（每日条数）正交，任一触顶即暂停。
- 并发护栏：同 `user_id` 不允许两个 `status='running'` 任务（创建时 409 校验，PRD §8）。

### 5.6 dry-run 模拟模式（无凭证演示完整闭环）

- 触发：无有效 X token（未授权 / 本地演示）→ Worker 进入 dry-run。
- 行为：**不调用** X DELETE；但消耗**同一令牌桶**（节奏与真实一致），每「删」一条：同事务置 `tweets.status='deleted'`、`succeeded+1`、`cost_incurred_usd+0.01`。
- 产出：进度、费用、状态与真实模式**完全一致**，仅 `last_error` 标记 `dry_run`。保证无凭证也能端到端演示「诊断→治疗」闭环。

### 5.7 X DELETE 客户端封装

- 端点：`DELETE https://api.x.com/2/tweets/:id`
- 头：`Authorization: Bearer <accessToken>`，`Content-Type: application/json`
- 限速：50/15min（由 §5.1 令牌桶强制，取不到令牌则等下一窗口）。
- 429 → 退避（§5.2）；5xx → 退避；401 → `getValidToken()` 刷新后对当前 tweet 重试一次，仍 401 则 `invalid_grant` 处理。
- 成功（200）→ 计入费用（§5.4）。

### 5.8 预估卡计算公式（Spec §4 末段）

- `tweetCount =` 应用 `protectIds` + `dateRange` + `keywords` 过滤后的待删条数。
- `estDays = ceil(tweetCount / 4800)`（4800 = 50×4×24，按 24h 连续）。
- `estCostUsd = tweetCount * 0.01`
- `estCostCny = estCostUsd * 7.2`（固定汇率 1 USD = 7.2 CNY，写死配置常量，页面标注「仅供参考」）。
- `budgetInputUsd =` 请求中的 `budgetCapUsd`（可选）。

---

## 6. OAuth PKCE 代码级契约

> 前端不持 `client_secret` / 令牌；会话用 HttpOnly cookie。Scope 按 Spec §3：`tweet.write users.read`（若 X 网关强制成对，补 `tweet.read`，仍不调用读取端点）。

### 6.1 会话与 OAuth state 存储

- 本地：`Map<sessionId, OAuthSession>`（生产换 Redis，5min 过期）；`sessionId` 种入 HttpOnly cookie。
- `OAuthSession` 结构：
  ```ts
  interface OAuthSession {
    state: string;          // CSRF 随机值
    codeVerifier: string;   // PKCE
    expiresAt: number;      // epoch ms，+300s
    userId?: string;        // 回调后回填
  }
  ```

### 6.2 login（GET /api/auth/x/login）

1. `code_verifier = base64url(randomBytes(32))`（≥43 字符高熵）。
2. `code_challenge = base64url(sha256(code_verifier))`（S256）。
3. `state = base64url(randomBytes(16))`。
4. 建 `OAuthSession{state, codeVerifier, expiresAt: now+300_000}`，键 `sessionId`（已有会话复用，新建则种 cookie）。
5. 拼授权 URL：
   ```
   https://x.com/i/oauth2/authorize
     ?response_type=code
     &client_id=<APP_CLIENT_ID>
     &redirect_uri=<ENCODED_CALLBACK>
     &scope=tweet.write%20users.read
     &state=<state>
     &code_challenge=<code_challenge>
     &code_challenge_method=S256
   ```
6. 返回 `ApiResponse<LoginResponse>{ data: { authUrl } }`；前端 302 跳转。

### 6.3 callback（GET /api/auth/x/callback）

1. 取 `code`,`state`（query）。校验 `state` 匹配会话且未过期 → 否则 400 `invalid_state`。
2. `POST https://api.x.com/2/oauth2/token`：
   `grant_type=authorization_code&code=<code>&redirect_uri=<CALLBACK>&code_verifier=<codeVerifier>&client_id=<APP_CLIENT_ID>`
   成功得 `{ access_token, refresh_token, expires_in }`。
3. `GET https://api.x.com/2/users/me`（头 `Authorization: Bearer <access_token>`）→ `{ data: { id, username, name } }`。
4. **加密存储**：`access_token_enc = aes256gcmEncrypt(access_token)`、`refresh_token_enc = aes256gcmEncrypt(refresh_token)`（密钥见 §6.5），写入 `x_credentials`（upsert by user），`token_expires_at = now + expires_in*1000`，`status='active'`；`users` upsert（`x_user_id, username, display_name`）。
5. 种会话 cookie（`sid`，HttpOnly, Secure, SameSite=Lax, Path=/）。
6. 返回 `ApiResponse<CallbackResponse>{ data: { username, xUserId: id } }`。

### 6.4 失败处理

| 情况 | 处理 |
|------|------|
| `state` 不匹配/过期 | 400 `invalid_state`，提示重新登录 |
| token 端点 `invalid_grant` | 若存在旧凭据置 `x_credentials.status='revoked'`；返回 401「授权失败，请重试」 |
| `insufficient_scope` | 在 scope 补 `tweet.read` 后请用户重新授权 |
| 网络/5xx | 502，可重试 |
| refresh 失败 `invalid_grant` | 置 `x_credentials.status='revoked'`；删除任务挂起 `paused_reason='token_revoked'`，前端提示重授权 |

### 6.5 令牌加密（AES-256-GCM）

- 密钥：32 字节，取自环境变量 `X_CRED_ENC_KEY`（缺省回落 `ARCHIVE_ENC_KEY`；本地无配置时用固定开发密钥并告警）。
- 加密输出（base64）：`iv(12B) ‖ authTag(16B) ‖ ciphertext`，解密逆序校验 authTag。
- 明文令牌**仅在内存**短暂存在，落库即密文；前端永不见。

### 6.6 logout（POST /api/auth/x/logout）

- 清会话（`Map` 删除 + cookie 失效）；可选不撤销 X 令牌（MVP 不常驻授权，可保留凭据供后续删除复用，由 `x_credentials.status` 控制）。

---

## 7. 交付检查清单（Phase 3 后端照此验收）

- [ ] DDL 可被 better-sqlite3 一次执行；外键 PRAGMA 开启。
- [ ] 15 端点 Request/Response 严格按 §2 类型；统一 `ApiResponse<T>`。
- [ ] 评分算法按 §3 实现，6 维权重合计=1，样本<10 标记 insufficientSample。
- [ ] 解析按 §4 安全（无 eval），派生列写入，明文不持久化。
- [ ] Worker 按 §5：令牌桶 50/15min、退避 2ⁿ≤1h、同事务幂等计费、dry-run 一致。
- [ ] OAuth 按 §6：PKCE + state 防 CSRF + AES-256-GCM 存凭据 + HttpOnly cookie。
- [ ] 预估卡 `estDays/estCostUsd/estCostCny` 公式与汇率 1:7.2 一致。

---

*— Phase 2 详细设计（契约/规格，无应用代码）；锁定依据 Spec v1.0.0 §3/§4/§5；供 Phase 3 后端 agent 直接实现 —*
