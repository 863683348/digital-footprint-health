# 数字足迹体检报告 · Phase 2 逐页设计规格（前端实现提示词）

> 产出方：设计总监 颜好看 ｜ 阶段：Phase 2（仅设计规格，不含 React/TSX 实现代码）
> 硬约束来源：Spec v1.0.0 §6 页面清单 + §7 设计 Token + §9 边界约束；UIUX 文档；PRD v1.0 §3.4 文案调性
> 受众：Phase 3 前端 Agent（照此逐组件实现）
> 全局基调：信任 Trust · 平静 Calm · 清晰 Clarity · 克制 Restraint · 医疗级条理 · 非恐吓

---

## 〇、全局 Token 速查（前端请先注入 :root，全站统一引用）

### 颜色
```
主色（冷静临床蓝）
--blue-500:#3A6AE0  --blue-600:#2E5BCB  --blue-700:#244AA6  --blue-800:#1B3A82
--color-primary:#2E5BCB        --color-primary-hover:#244AA6
--color-primary-active:#1B3A82 --color-primary-subtle:rgba(46,91,203,0.08)
--color-primary-border:rgba(46,91,203,0.20)

语义三态（仅用于风险/状态指示，禁止装饰性渐变）
--color-success:#16A34A   --color-success-text:#15803D   --color-success-subtle:rgba(22,163,74,0.10)
--color-warning:#D97706   --color-warning-text:#B45309   --color-warning-subtle:rgba(217,119,6,0.10)
--color-error:#DC2626     --color-error-text:#B91C1C     --color-error-subtle:rgba(220,38,38,0.10)
--color-info:#0E7490      --color-info-subtle:rgba(14,116,144,0.10)
评分映射：≥80 绿 / 60–79 琥珀 / <60 红（纯色，无渐变）

中性色（带冷蓝调，禁用纯黑纯灰）
--bg-primary:#F6F8FC  --bg-surface:#FFFFFF  --bg-subtle:#EEF2F8  --bg-inset:#F1F4F9
--text-primary:#0F172A  --text-secondary:#475569  --text-muted:#94A3B8
--border-default:#E2E8F0  --border-strong:#CBD5E1  --border-focus:#2E5BCB
```

### 字 / 间距 / 圆角 / 阴影 / 动效 / 图标
```
字体
--font-display: "Inter","Noto Sans SC",-apple-system,BlinkMacSystemFont,sans-serif   /* 标题/正文 */
--font-body:    同 --font-display
--font-mono:    "JetBrains Mono","Fira Code",ui-monospace,monospace                  /* 分数/@handle/日期/ID/日志 */

字号（仅 8 级，禁止其他值）：12 / 14 / 16 / 18 / 20 / 24 / 32 / 40(px)
间距（4px 网格，禁止 5/7/13/15/22/30）：4 8 12 16 20 24 32 40 48 64 80
圆角：--radius-sm:6  --radius-md:10  --radius-lg:16  --radius-xl:20  --radius-full:999
阴影（克制，卡片靠边框，禁止彩色发光阴影）：
  --shadow-sm:0 1px 2px rgba(15,23,42,0.04)
  --shadow-md:0 2px 8px rgba(15,23,42,0.06)
  --shadow-lg:0 8px 24px rgba(15,23,42,0.08)
动效：--duration-fast:150ms  --duration-normal:250ms  --duration-slow:400ms
       --easing-smooth:cubic-bezier(0.4,0,0.2,1)
       @media (prefers-reduced-motion: reduce) 下所有动画直达终值，无位移/无淡入
图标（唯一 Lucide，三档 16/20/24，绝对禁止 emoji）：
  连接=Plug 上传=UploadCloud 报告=ClipboardList
  分项=Activity·MapPin·History·MessageSquare·UserCheck·ShieldCheck
  删除=Trash2 进度=Loader 成功=CheckCircle2 警告=AlertTriangle 导出=Download 隐私=Lock
主题：MVP 仅浅色（Light Primary）。
```

### 全局红线遵守确认（Spec §9）
- ❌ 无紫色渐变（`#7C3AED/#A855F7/#EC4899` 任一）；主色恒为冷静蓝 `#2E5BCB`。
- ❌ 无 emoji 功能图标；全站仅 Lucide，三档尺寸。
- ❌ 无千篇一律 Hero；落地页用「真实报告卡预览 + 三步流程」展示成品形态。
- ❌ 无彩色发光阴影；卡片靠 `--border-default` 界定，阴影仅 `--shadow-sm/md/lg` 三级。
- ❌ 无弹跳缓动；全站统一 `--easing-smooth`。
- ✅ 浅色主题；语义色仅用于风险/状态指示，不用于装饰。
- ✅ 字体、间距、字号严格锁 8 级 / 4px 网格，禁用模糊描述词。

---

## ① 落地 / 连接 X 页  `路由 /`

### 1. 组件树
```
LandingPage
├─ TopNav
│   ├─ LogoWordmark            (文字 Logo「足迹体检」+ Plug 20px)
│   └─ LoginButton            (文字按钮「登录」)
├─ HeroSection
│   ├─ ValueColumn
│   │   ├─ Headline           (h1 「你的 X 数字足迹，值得一次体检」)
│   │   ├─ Subcopy            (平静副文案)
│   │   ├─ PrimaryCTA         (主按钮「开始免费体检」)
│   │   └─ PrivacyBanner      (Lock 16px + 文案)
│   └─ ReportCardPreview      (mock 真实报告卡静态预览)
│       ├─ PreviewScore        (示例总分 82 + 评级)
│       ├─ PreviewChips        (分项缩略 chip ×3)
│       └─ PreviewFootnote     (「示例报告 · 非你的真实数据」)
├─ StepFlow
│   └─ StepItem ×3            (序号 + Lucide 图标 + 标题 + 说明)
└─ FooterNote                 (一行版权/说明)
```

### 2. 逐组件 Token 用法
| 组件 | 背景 | 文字 | 边框/描边 | 圆角 | 间距(内) | 阴影 | 字号 | 字族 |
|------|------|------|-----------|------|-----------|------|------|------|
| LandingPage | `--bg-primary` | — | — | — | 页边 `--space-20` | — | — | — |
| TopNav | `--bg-surface` | — | `--border-default`(下边框 1px) | — | 上下 `--space-4` 左右 `--space-6` | — | — | — |
| LogoWordmark | — | `--text-primary` | — | — | — | — | 20 | `--font-display` |
| LoginButton | transparent | `--text-secondary` | — | `--radius-md` | `--space-2` `--space-4` | — | 14 | `--font-display` |
| HeroSection | `--bg-primary` | — | — | — | `--space-16` 上下 | — | — | — |
| ValueColumn | — | — | — | — | `--space-8` gap | — | — | — |
| Headline | — | `--text-primary` | — | — | — | — | 32 | `--font-display` |
| Subcopy | — | `--text-secondary` | — | — | 上 `--space-4` | — | 16 | `--font-display` |
| PrimaryCTA | `--color-primary` | `#FFFFFF` | — | `--radius-md` | `--space-4` `--space-8` | `--shadow-sm` | 16 | `--font-display` |
| PrivacyBanner | `--color-primary-subtle` | `--text-secondary` | `--color-primary-border`(1px) | `--radius-md` | `--space-3` `--space-4` | — | 14 | `--font-display` |
| ReportCardPreview | `--bg-surface` | — | `--border-default`(1px) | `--radius-lg` | `--space-6` | `--shadow-md` | — | — |
| PreviewScore | — | `--text-primary`(数字) | — | `--radius-md` | — | — | 40 | `--font-mono` |
| PreviewChips | `--bg-subtle` | `--text-secondary` | — | `--radius-full` | `--space-2` `--space-3` | — | 12 | `--font-display` |
| PreviewFootnote | — | `--text-muted` | — | — | 上 `--space-3` | — | 12 | `--font-display` |
| StepFlow | `--bg-surface` | — | `--border-default`(1px) | `--radius-lg` | `--space-6` | `--shadow-sm` | — | — |
| StepItem | — | `--text-primary`(标题)/`--text-secondary`(说明) | — | `--radius-md` | `--space-4` | — | 18/14 | `--font-display` |
| FooterNote | — | `--text-muted` | — | — | 上 `--space-12` | — | 12 | `--font-display` |

### 3. 交互状态矩阵
| 元素 | Default | Hover | Focus | Active | Disabled | Loading | Empty | Error |
|------|---------|-------|-------|--------|----------|---------|-------|-------|
| PrimaryCTA | bg `--color-primary`, text #fff | bg `--color-primary-hover`, `--shadow-md` 抬升 translateY -1px | `outline:2px solid --border-focus; outline-offset:2px` | bg `--color-primary-active` | opacity 0.5, cursor not-allowed, 不可点 | 同 Disabled + Loader 16px 右 | — | — |
| LoginButton | text `--text-secondary` | text `--text-primary`, bg `--bg-subtle` | `outline:2px solid --border-focus; offset 2px` | bg `--bg-inset` | — | — | — | — |
| ReportCardPreview | opacity 1, `--shadow-md` | `--shadow-lg` | — | — | — | — | — | — |
| StepItem | 序号圈 bg `--color-primary-subtle`, 字 `--color-primary` | bg `--bg-subtle` | — | — | — | — | — | — |

### 4. 微交互
- **ReportCardPreview 进入视口「呼吸」**：`opacity 0.9→1` + `translateY(4px)→0`，单次，时长 `--duration-slow`，缓动 `--easing-smooth`；`prefers-reduced-motion` 下直接终值（opacity 1 / translateY 0）。触发：IntersectionObserver 一次。
- **PrimaryCTA hover**：`box-shadow` `--shadow-sm`→`--shadow-md`，`transform translateY(0)→-1px`，`--duration-fast`。
- **PrimaryCTA active**：`background-color`→`--color-primary-active`，`transform translateY(0)`，`--duration-fast`。
- **StepItem 序号图标**：hover 时背景 `--color-primary-subtle`→`--bg-subtle`，`--duration-fast`。
- 全局尊重 `prefers-reduced-motion`：关闭呼吸与位移，仅保留颜色瞬变（必要时也瞬变直达）。

### 5. 文案 / 内容（平静、非恐吓，对齐 PRD §3.4）
- **LogoWordmark**：`足迹体检`
- **LoginButton**：`登录`
- **Headline(h1)**：`你的 X 数字足迹，值得一次体检`
- **Subcopy**：`用你自己的 X 数据归档，生成一份清晰的健康评分与修复建议。先看清楚，再决定要不要清理。`
- **PrimaryCTA**：`开始免费体检`
- **PrivacyBanner**：`Lock` + `数据本地处理 · 不上云 · 可一键清除`
- **ReportCardPreview**（mock，标注非真实）：
  - PreviewScore：`82` + 小字 `健康分`
  - PreviewChips：`位置 · 良好` ｜ `敏感词 · 注意` ｜ `旧帖 · 中等`
  - PreviewFootnote：`示例报告 · 非你的真实数据`
- **StepFlow**：
  - ① `连接账号` — `从 X 下载你的数据归档，无需授权读取`
  - ② `安全上传归档` — `本地解析，全程不经过 X 读取接口`
  - ③ `生成体检报告` — `看清暴露面，拿到可执行修复建议`
- **FooterNote**：`足迹体检 · 你的数据只属于你`

### 6. 响应式
- **移动 <640**：HeroSection 单列（ValueColumn 在上，ReportCardPreview 在下）；StepFlow 纵向堆叠（序号 + 文案）；PrimaryCTA 宽度 100%。
- **平板 640–1024**：HeroSection 两列（左文右卡，卡宽 ~40%）；StepFlow 三列横排；PrimaryCTA 自适应宽度。
- **桌面 >1024**：HeroSection 两列，左文最大宽 520px，右卡固定宽 360px 右对齐；StepFlow 三列横排，每项间距 `--space-8`；TopNav 左右留白 `--space-20`。

---

## ② 上传归档页  `路由 /upload`

### 1. 组件树
```
UploadPage
├─ PageHeader
│   ├─ Title              (h1 「上传你的 X 数据归档」)
│   └─ Subtitle           (平静副文案)
├─ Dropzone              (多状态：default/hover/drag-over/parsing/complete/error)
│   ├─ DropIcon           (UploadCloud 24px)
│   ├─ DropText           (主提示)
│   ├─ DropHint           (辅助说明 ≤200MB)
│   └─ DropProgress       (解析中 spinner + 百分比)
├─ HowToAccordion
│   └─ AccordionItem      (header「如何获取你的 X 归档？」+ 三步图文)
├─ ParseResultList        (解析完成后出现)
│   └─ ParseResultRow ×N  (ResultIcon CheckCircle2 16px + 标签 + 值 mono)
├─ PrivacyBanner          (Lock + 文案，同落地页)
└─ ReportReadyCTA         (解析完成后出现「查看体检报告」)
```

### 2. 逐组件 Token 用法
| 组件 | 背景 | 文字 | 边框 | 圆角 | 间距(内) | 阴影 | 字号 | 字族 |
|------|------|------|------|------|-----------|------|------|------|
| UploadPage | `--bg-primary` | — | — | — | 居中单栏 最大宽 720px，页边 `--space-12` | — | — | — |
| PageHeader | — | `--text-primary`(标题) `--text-secondary`(副) | — | — | 下 `--space-8` | — | 32/16 | `--font-display` |
| Dropzone | `--bg-surface` | — | `--border-strong`(2px 虚线 dashed) | `--radius-lg` | `--space-12` | — | — | — |
| DropIcon | — | `--color-primary` | — | — | 下 `--space-4` | — | 24(图标) | — |
| DropText | — | `--text-primary` | — | — | — | — | 18 | `--font-display` |
| DropHint | — | `--text-muted` | — | — | 上 `--space-2` | — | 14 | `--font-display` |
| DropProgress | — | `--text-secondary` | — | — | 上 `--space-4` | — | 14 | `--font-display` |
| HowToAccordion | `--bg-surface` | — | `--border-default`(1px) | `--radius-lg` | `--space-6` | `--shadow-sm` | — | — |
| AccordionItem header | — | `--text-primary` | — | — | `--space-4` | — | 18 | `--font-display` |
| AccordionItem body | `--bg-subtle` | `--text-secondary` | — | `--radius-md` | `--space-4` | — | 14 | `--font-display` |
| ParseResultList | — | — | — | — | 上 `--space-6` | — | — | — |
| ParseResultRow | `--bg-surface` | `--text-secondary`(标签) `--text-primary`(值) | `--border-default`(1px) | `--radius-md` | `--space-4` | — | 14 / 值16 | 标签 display / 值 mono |
| PrivacyBanner | `--color-primary-subtle` | `--text-secondary` | `--color-primary-border` | `--radius-md` | `--space-3` `--space-4` | — | 14 | `--font-display` |
| ReportReadyCTA | `--color-primary` | #FFFFFF | — | `--radius-md` | `--space-4` `--space-8` | `--shadow-sm` | 16 | `--font-display` |

### 3. 交互状态矩阵
| 元素 | Default | Hover | Focus | Active | Disabled | Loading | Empty | Error |
|------|---------|-------|-------|--------|----------|---------|-------|-------|
| Dropzone | border `--border-strong`(虚线), bg `--bg-surface` | border `--color-primary`(虚线), bg `--color-primary-subtle` | `outline:2px solid --border-focus; offset 2px` | — | — | 显示 DropProgress（Loader 16px + `解析中…` + 百分比 mono） | — | border `--color-error`(虚线), bg `--color-error-subtle`, 显示错误文案 + 「重新选择」 |
| HowToAccordion header | 箭头 `ChevronDown` 20px, text `--text-primary` | bg `--bg-subtle` | `outline:2px solid --border-focus` | bg `--bg-inset` | — | — | — | — |
| ParseResultRow | bg `--bg-surface` | bg `--bg-subtle` | — | — | — | skeleton 占位（bg `--bg-inset` 脉冲） | — | 单条解析失败：值显示 `--color-error-text` + `解析失败` |
| ReportReadyCTA | bg `--color-primary`, #fff | bg `--color-primary-hover`, `--shadow-md` | `outline:2px solid --border-focus; offset 2px` | bg `--color-primary-active` | — | — | — | — |

**Dropzone 六态文案/视觉切换**：
- default：`DropText=拖入 .zip，或点击选择`；`DropHint=支持 X 官方导出，单个文件 ≤ 200MB`
- hover：`DropText` 不变，边框转 `--color-primary` 虚线 + 底色 `--color-primary-subtle`
- drag-over：同 hover 强化（border `--border-focus` 实线 + bg `--color-primary-subtle`）
- parsing：`DropProgress=正在解析…` + Loader 16px 旋转 + 百分比 mono（`42%`）
- complete：`DropText=解析完成` + 文件名 mono + 下方淡入 ParseResultList
- error：`DropText=文件无法解析` + `DropHint=请重新下载 X 官方归档，确认格式为 .zip 后重试` + 「重新选择」按钮

### 4. 微交互
- **drag-over**：边框 `--border-strong`→`--border-focus`(实线)，bg `--bg-surface`→`--color-primary-subtle`，`--duration-fast`。
- **解析完成条目入场**：`ParseResultRow` 逐条 `slide-in`（`translateX(-8px)→0` + `opacity 0→1`），stagger 每条延迟 `--duration-fast` 递增，单条时长 `--duration-normal`，缓动 `--easing-smooth`；每条左侧 `CheckCircle2` 16px `--color-success` 同步淡入。
- **skeleton 脉冲**（解析完成前占位）：bg `--bg-inset` 透明度 1→0.5→1 循环，`--duration-slow`，`prefers-reduced-motion` 下静态显示 `--bg-inset` 不脉冲。
- **ReportReadyCTA 出现**：`opacity 0→1` + `translateY(8px)→0`，`--duration-normal`。
- reduced-motion：所有位移/淡入直达终值。

### 5. 文案 / 内容
- **Title(h1)**：`上传你的 X 数据归档`
- **Subtitle**：`从 X 下载官方归档文件，本地解析，数据不会离开你的设备。`
- **DropText(default)**：`拖入 .zip，或点击选择`
- **DropHint**：`支持 X 官方导出，单个文件 ≤ 200MB`
- **DropProgress**：`正在解析…` + 百分比
- **Dropzone error**：`文件无法解析` ｜ `请重新下载 X 官方归档，确认格式为 .zip 后重试` ｜ 按钮 `重新选择`
- **HowToAccordion header**：`如何获取你的 X 归档？`
- **Accordion body 三步**：
  1. `打开 X，进入「设置与隐私 → 你的数据」`
  2. `点击「下载数据」，选择包含推文`
  3. `收到邮件后下载 .zip，回到这里上传`
- **ParseResultRow 标签/值（mono）示例**：
  - `推文总数` → `12,408`
  - `时间跨度` → `2016-03 → 2026-06`
  - `含媒体` → `3,201`
  - `提及 @对象` → `486`
- **PrivacyBanner**：`Lock` + `归档仅在本地解析，解析后原文不长期留存，你可随时一键清除。`
- **ReportReadyCTA**：`查看体检报告`

### 6. 响应式
- **移动 <640**：单栏，Dropzone 高度 ≥ 200px，内边距 `--space-8`；Accordion 全宽；ParseResultRow 纵向堆叠。
- **平板 640–1024**：单栏居中，最大宽 720px；Dropzone 高度 240px。
- **桌面 >1024**：同上最大宽 720px 居中；Dropzone 高度 260px，图标 24px 居中。

---

## ③ 体检报告仪表盘  `路由 /report/[id]`（核心页）

### 1. 组件树
```
ReportPage
├─ ReportHeader
│   ├─ ReportTitle          (h1 「X 数字足迹体检报告」)
│   ├─ MetaRow               (生成时间 mono + @handle mono)
│   └─ HealthScoreBlock
│       ├─ ScoreLabel        (「数字足迹健康分」)
│       ├─ ScoreGauge        (SVG 径向环：Track + Progress + ScoreNumber + ScoreUnit)
│       └─ RatingBadge       (评级，语义色柔底)
├─ CategoryGrid
│   └─ CategoryCard ×6
│       ├─ CategoryIcon      (Lucide：敏感词=MessageSquare / 位置=MapPin / 旧帖=History / 互动=Activity / 身份=UserCheck / 账号=ShieldCheck)
│       ├─ CategoryName
│       ├─ CategoryScore     (mono 分项小分)
│       ├─ RiskBar           (语义色强度条)
│       └─ DetailLink        (「查看 N 条明细」下划线动作)
├─ DiagnosisSection
│   ├─ DiagnosisText         (总体诊断一段)
│   └─ FixList
│       └─ FixItem ×N        (CheckCircle2 + FixText + FixActionButton「去修复」)
└─ ReportActions
    ├─ ExportButton          (Download 20px + 「导出 PDF」)
    └─ CleanupButton         (Trash2 20px + 「前往清理」)
```

### 2. 逐组件 Token 用法
| 组件 | 背景 | 文字 | 边框 | 圆角 | 间距 | 阴影 | 字号 | 字族 |
|------|------|------|------|------|------|------|------|------|
| ReportPage | `--bg-primary` | — | — | — | 最大宽 1080px 居中，页边 `--space-12` | — | — | — |
| ReportHeader | `--bg-surface` | — | `--border-default`(1px) | `--radius-xl` | `--space-8` | `--shadow-sm` | — | — |
| ReportTitle | — | `--text-primary` | — | — | 下 `--space-3` | — | 24 | `--font-display` |
| MetaRow | — | `--text-muted` | — | — | 下 `--space-6` | — | 14 | mono(时间/@handle) |
| HealthScoreBlock | `--bg-subtle` | — | — | `--radius-lg` | `--space-8` | — | — | — |
| ScoreLabel | — | `--text-secondary` | — | — | 下 `--space-2` | — | 14 | `--font-display` |
| ScoreGauge(SVG) | — | 数字 `--text-primary` | Track `--border-default` / Progress 语义色 | — | — | — | 40(数字) | mono |
| RatingBadge | 语义 `--*-subtle` | 语义 `--*-text` | 语义 `transparent`(或 1px 同色) | `--radius-full` | `--space-2` `--space-4` | — | 14 | `--font-display` |
| CategoryGrid | — | — | — | — | `display:grid; gap --space-4` | — | — | — |
| CategoryCard | `--bg-surface` | — | `--border-default`(1px) | `--radius-lg` | `--space-6` | `--shadow-sm` | — | — |
| CategoryIcon | — | 语义色(按分项 band) | — | `--radius-md`(图标底 `--bg-subtle`) | — | — | 24(图标) | — |
| CategoryName | — | `--text-primary` | — | — | — | — | 16 | `--font-display` |
| CategoryScore | — | `--text-primary` | — | — | — | — | 20 | mono |
| RiskBar | Track `--bg-inset` / Fill 语义色 | — | — | `--radius-full` | 上 `--space-3` | — | — | — |
| DetailLink | — | `--color-primary` | — | — | 上 `--space-3` | — | 14 | `--font-display` |
| DiagnosisSection | `--bg-surface` | — | `--border-default`(1px) | `--radius-lg` | `--space-6` | `--shadow-sm` | — | — |
| DiagnosisText | — | `--text-secondary` | — | — | 下 `--space-4` | — | 16 | `--font-display` |
| FixItem | — | `--text-primary`(FixText) | `--border-default`(底分隔 1px) | — | `--space-4` | — | 14 | `--font-display` |
| FixActionButton | transparent | `--color-primary` | `--color-primary-border`(1px) | `--radius-md` | `--space-2` `--space-4` | — | 14 | `--font-display` |
| ReportActions | — | — | — | — | `gap --space-4` | — | — | — |
| ExportButton | `--bg-surface` | `--text-primary` | `--border-default`(1px) | `--radius-md` | `--space-3` `--space-4` | `--shadow-sm` | 16 | `--font-display` |
| CleanupButton | `--color-primary` | #FFFFFF | — | `--radius-md` | `--space-3` `--space-4` | `--shadow-sm` | 16 | `--font-display` |

> **分项 band → 语义色映射规则**（纯色，无渐变）：分项小分 ≥80 用 `--color-success*/`；60–79 用 `--color-warning*/`；<60 用 `--color-error*/`。RiskBar 的 Fill 宽度 = `(100 - 分项小分)%`（暴露程度，越高越风险），颜色同 band。`CategoryIcon` 颜色取 band 主色（`--color-success`/`--color-warning`/`--color-error`）。

### 3. 交互状态矩阵
| 元素 | Default | Hover | Focus | Active | Disabled | Loading | Empty | Error |
|------|---------|-------|-------|--------|----------|---------|-------|-------|
| ScoreGauge | Progress 弧按 band 着色，数字 mono | — | `role=img` `aria-label` 可读 | — | — | 入场动画中（见 §4 / §7） | 样本不足：显示 `--text-muted` `样本不足` 居中，弧置灰 `--border-default` | — |
| CategoryCard | bg `--bg-surface`, border `--border-default` | border `--border-strong` + `--shadow-md` 微抬 | 卡内可聚焦元素各自 focus | — | — | — | 该项无暴露：卡内显示 `暂无暴露项，很干净`（DetailLink 隐藏） | 该项解析异常：RiskBar 置灰 + 文案 `暂不可用` |
| DetailLink | text `--color-primary` 无下划线 | 显示下划线 + text `--color-primary-hover` | `outline:2px solid --border-focus; offset 2px` | text `--color-primary-active` | — | — | — | — |
| FixActionButton | border `--color-primary-border`, text `--color-primary` | bg `--color-primary-subtle` | `outline:2px solid --border-focus; offset 2px` | bg `--color-primary-subtle`(加深) | — | Loader 16px 替代文字 | — | — |
| ExportButton | bg `--bg-surface`, border `--border-default`, text `--text-primary` | border `--border-strong`, `--shadow-md` | `outline:2px solid --border-focus; offset 2px` | bg `--bg-subtle` | — | Loader 16px + `导出中…` | — | 导出失败 toast `导出失败，请重试` |
| CleanupButton | bg `--color-primary`, #fff | bg `--color-primary-hover`, `--shadow-md` | `outline:2px solid --border-focus; offset 2px` | bg `--color-primary-active` | — | — | — | — |

**全局空态（整页无报告）**：居中 `--bg-surface` 卡 + `ClipboardList` 24px `--text-muted` + `还没有体检报告` + 按钮 `去上传归档`。

### 4. 微交互
- **ScoreGauge 入场**（进入视口，见 §7 规格）：Progress 弧 `stroke-dashoffset` 从 `C`(全空) → `C·(1 - score/100)`；中心数字 0 → score 同步计数；时长 `--duration-slow`，缓动 `--easing-smooth`。
- **CategoryCard stagger 淡入**：`opacity 0→1` + `translateY(8px)→0`，逐卡延迟 `--duration-fast` 递增，单卡 `--duration-normal`。
- **CategoryCard hover**：border `--border-default`→`--border-strong`，`--shadow-sm`→`--shadow-md`，`--duration-fast`；同时 `DetailLink` 由无下划线 → 出现下划线。
- **RiskBar Fill 入场**：`width 0%→目标%`，`--duration-slow`，`--easing-smooth`。
- reduced-motion：弧直达终值 offset、数字直达终值、卡片/风险条无位移无淡入、直接显示终态。

### 5. 文案 / 内容（平静、诊断口吻，非恐吓）
- **ReportTitle**：`X 数字足迹体检报告`
- **MetaRow**：`生成时间 2026-07-13 10:24` ｜ `@xiaolin_28`
- **ScoreLabel**：`数字足迹健康分`
- **RatingBadge**（按 band）：`≥80 良好`(绿) ｜ `60–79 中等`(琥珀) ｜ `<60 需关注`(红)；可缀等级如 `良好 · B+`
- **CategoryCard 六项**：
  1. 图标 `MessageSquare` · 名称 `敏感词暴露` · 小分示例 `64` · RiskBar 暴露 `36%`
  2. 图标 `MapPin` · 名称 `位置泄露` · 小分 `88` · 暴露 `12%`
  3. 图标 `History` · 名称 `旧帖可溯` · 小分 `52` · 暴露 `48%`
  4. 图标 `Activity` · 名称 `互动痕迹` · 小分 `90` · 暴露 `10%`
  5. 图标 `UserCheck` · 名称 `身份关联` · 小分 `76` · 暴露 `24%`
  6. 图标 `ShieldCheck` · 名称 `账号安全` · 小分 `95` · 暴露 `5%`
  - **DetailLink**：`查看 12 条明细`（N 为该项高危样例数）
  - **空态**：`暂无暴露项，很干净`
- **DiagnosisText**（示例，依评分生成）：`你的足迹整体偏健康，主要可优化项是「旧帖可溯」与「敏感词暴露」。这些历史推文目前仍可被搜索到，按需清理即可，不必一次清空。`
- **FixList 条目示例**（按优先级）：
  - `你有 12 条推文包含具体地址信息，建议审核后删除或隐藏。` → 动作 `去修复`
  - `48 条 2020 年前的旧帖仍可被搜索，建议评估是否保留。` → 动作 `去修复`
  - `3 条推文含邮箱或电话，建议优先处理。` → 动作 `去修复`
- **ExportButton**：`导出 PDF`
- **CleanupButton**：`前往清理`
- **整页空态**：`还没有体检报告` ｜ 按钮 `去上传归档`

### 6. 响应式
- **移动 <640**：HealthScoreBlock 居中专栏（SVG 居中）；CategoryGrid **1 列**；DiagnosisSection 全宽；ReportActions 纵向（两按钮均 100% 宽）。
- **平板 640–1024**：CategoryGrid **2 列**；HealthScoreBlock 与 MetaRow 同行（左信息右仪表）；ReportActions 横向。
- **桌面 >1024**：最大宽 1080px；CategoryGrid **3 列**；HealthScoreBlock 左、CategoryGrid 右（或上下分区均可，保持「5 秒内读懂」）；ReportActions 固定于内容区顶部右侧或底部横向。

### 7. SVG 分数仪表规格（必做，纯色无渐变）
**结构**：`viewBox="0 0 200 200"`，中心 (100,100)，环半径 `r=84`，`stroke-width=16`。
- **Track 圆**：`fill="none" stroke="var(--border-default)" stroke-width="16"`
- **Progress 圆**：`fill="none" stroke="<band色>" stroke-width="16" stroke-linecap="round" transform="rotate(-90 100 100)"`
  - 周长 `C = 2π·84 ≈ 527.79`
  - `stroke-dasharray="527.79"`（= C）
  - 填充弧长 `L = score/100 · C`；`stroke-dashoffset` 终值 = `C - L`
  - band 色：≥80 `var(--color-success)` ／ 60–79 `var(--color-warning)` ／ <60 `var(--color-error)`
- **中心数字**：`<text x="100" y="96" text-anchor="middle" dominant-baseline="central" font-family="var(--font-mono)" font-size="40" fill="var(--text-primary)">82</text>`
- **中心单位**：`<text x="100" y="124" text-anchor="middle" font-family="var(--font-display)" font-size="12" fill="var(--text-muted)">健康分</text>`
- **可访问性**：`<svg role="img" aria-label="数字足迹健康分 82 分，评级良好">`；Progress 圆加 `aria-hidden="false"` 并用 `aria-valuenow/min/max` 可选。
- **动画**：进入视口（IntersectionObserver）时，`stroke-dashoffset` 从 `527.79`(空) → `527.79·(1-score/100)`，`--duration-slow`，`--easing-smooth`；数字 0→score 同步。`prefers-reduced-motion` 下直接设定终值 offset 与终值数字，无过渡。
- **空态（样本不足）**：弧置 `--border-default`，中心显示 `--text-muted` `样本不足`（font-size 20，mono）。

---

## ④ 删除确认页  `路由 /delete/confirm?archiveId=`

### 1. 组件树
```
DeleteConfirmPage
└─ ConfirmCard                 (居中，最大宽 560px)
    ├─ ConfirmHeader
    │   ├─ Title               (h1 「确认删除历史推文」)
    │   └─ Explanation         (平静说明)
    ├─ EstimateCard            (费用/时长预估卡)
    │   ├─ EstimateRow ×3      (标签 + 值 mono)
    │   └─ EstimateNote        (汇率说明)
    ├─ DeleteSummary           (「将删除的内容」摘要)
    │   ├─ SummaryRow ×2       (待删条数 mono / 时间范围)
    │   └─ SampleTweet ×3      (示例推文预览：截断文本 + 日期 mono)
    ├─ ScopeSelector           (范围单选)
    │   ├─ ScopeRadio ×3       (删除全部 / 按日期范围 / 按关键词)
    │   ├─ DateRangeFilter     (选「按日期」展开：起始/结束日期输入)
    │   └─ KeywordFilter       (选「按关键词」展开：关键词输入)
    ├─ WarningBar              (AlertTriangle + 不可逆警示)
    ├─ ConsentCheckbox         («我理解此操作不可撤销»)
    ├─ DangerButton            (主危险按钮，armed 态)
    └─ CancelButton            (次级取消)
（异常分支）
├─ ErrorState                  (archiveId 无效 / 无待删)
└─ EmptyState                  (0 条可删)
```

### 2. 逐组件 Token 用法
| 组件 | 背景 | 文字 | 边框 | 圆角 | 间距 | 阴影 | 字号 | 字族 |
|------|------|------|------|------|------|------|------|------|
| DeleteConfirmPage | `--bg-primary` | — | — | — | 居中，页边 `--space-12` | — | — | — |
| ConfirmCard | `--bg-surface` | — | `--border-default`(1px) | `--radius-xl` | `--space-8` | `--shadow-md` | — | — |
| ConfirmHeader Title | — | `--text-primary` | — | — | 下 `--space-3` | — | 24 | `--font-display` |
| Explanation | — | `--text-secondary` | — | — | 下 `--space-6` | — | 14 | `--font-display` |
| EstimateCard | `--bg-subtle` | — | — | `--radius-lg` | `--space-6` | — | — | — |
| EstimateRow | — | `--text-secondary`(标签) `--text-primary`(值) | —(行间 `--border-default` 分隔) | — | `--space-3` 0 | — | 14 / 值16 | 标签 display / 值 mono |
| EstimateNote | — | `--text-muted` | — | — | 上 `--space-3` | — | 12 | `--font-display` |
| DeleteSummary | — | — | `--border-default`(1px) | `--radius-lg` | `--space-6` | — | — | — |
| SummaryRow | — | `--text-secondary`(标签) `--text-primary`(值) | — | — | `--space-3` 0 | — | 14 / 值16 | 标签 display / 值 mono |
| SampleTweet | `--bg-inset` | `--text-secondary`(文本) `--text-muted`(日期) | — | `--radius-md` | `--space-3` | — | 14 / 日期12 | 文本 display / 日期 mono |
| ScopeSelector | — | — | — | — | 上 `--space-6` | — | — | — |
| ScopeRadio | `--bg-surface` | `--text-primary` | `--border-default`(1px) | `--radius-md` | `--space-4` | — | 16 | `--font-display` |
| ScopeRadio(selected) | `--color-primary-subtle` | `--color-primary`(或 `--text-primary`) | `--color-primary-border`(1px) | `--radius-md` | `--space-4` | — | 16 | `--font-display` |
| DateRangeFilter / KeywordFilter | `--bg-subtle` | — | — | `--radius-md` | `--space-4` | — | 14 | `--font-display` |
| WarningBar | `--color-error-subtle` | `--color-error-text` | — | `--radius-md` | `--space-4` | — | 14 | `--font-display` |
| ConsentCheckbox | — | `--text-primary` | — | — | 上 `--space-6` | — | 14 | `--font-display` |
| DangerButton | `--color-error`(#DC2626) | #FFFFFF | — | `--radius-md` | `--space-4` `--space-8` | `--shadow-sm` | 16 | `--font-display` |
| CancelButton | transparent | `--text-secondary` | `--border-default`(1px) | `--radius-md` | `--space-4` `--space-8` | — | 16 | `--font-display` |
| ErrorState / EmptyState | `--bg-surface` | — | `--border-default`(1px) | `--radius-lg` | `--space-8` | `--shadow-sm` | — | — |

### 3. 交互状态矩阵
| 元素 | Default | Hover | Focus | Active | Disabled | Loading | Empty | Error |
|------|---------|-------|-------|--------|----------|---------|-------|-------|
| ScopeRadio | bg `--bg-surface`, border `--border-default` | bg `--bg-subtle` | `outline:2px solid --border-focus; offset 2px`(radio 自身) | bg `--bg-inset` | — | — | — | — |
| ScopeRadio(selected) | bg `--color-primary-subtle`, border `--color-primary-border` | bg 略深(同 `--color-primary-subtle`) | `outline:2px solid --border-focus` | — | — | — | — | — |
| DangerButton | bg `--color-error`, #fff（**未 armed 前仍禁用**） | bg `--color-error-text`(#B91C1C) | `outline:2px solid --border-focus; offset 2px` | bg `#991B1B`(更深红，作为 active) | opacity 0.5 + cursor not-allowed + 不可点（checkbox 未勾时） | Loader 16px 替代「确认删除并支付」 | — | — |
| CancelButton | transparent, text `--text-secondary`, border `--border-default` | bg `--bg-subtle` | `outline:2px solid --border-focus; offset 2px` | bg `--bg-inset` | — | — | — | — |
| ConsentCheckbox | 方框 border `--border-strong`(1.5px), 未勾 | 方框 border `--border-focus` | `outline:2px solid --border-focus; offset 2px`(整行可聚焦) | 方框 bg `--bg-subtle` | — | — | — | 勾选后显示 `Check` 16px `--color-primary` |
| ErrorState | 居中卡 + `AlertTriangle` 24px `--color-error` | — | — | — | — | — | — | `未找到对应的归档，请返回重新上传。` |
| EmptyState | 居中卡 + `ClipboardList` 24px `--text-muted` | — | — | — | — | — | `没有可删除的推文。` | — |

**DangerButton armed 机制**：
- checkbox 未勾 → `Disabled`（opacity 0.5，不可点），视觉为 `--color-error` 但灰化。
- checkbox 勾选 → 解除 Disabled，`--duration-fast` 内 `opacity 0.5→1` + 轻微「亮起」（`--shadow-sm`→略强或 bg 由 `#DC2626` 提至全饱和），文字变 `#FFFFFF` 清晰。
- 点击 → 触发支付（Stripe）二次确认（Phase 3 实现），此处仅标注交互边界。

### 4. 微交互
- **ScopeRadio 选中**：边框 `--border-default`→`--color-primary-border`，bg `--bg-surface`→`--color-primary-subtle`，`--duration-fast`；同时展开对应 Filter（`height 0→auto` / `opacity 0→1`，`--duration-normal`）。
- **DangerButton 解禁**：`opacity 0.5→1` + `box-shadow` 轻量提升，时长 `--duration-fast`，`--easing-smooth`。
- **DangerButton hover(armed)**：`background-color --color-error→--color-error-text`，`--duration-fast`。
- **ConsentCheckbox 勾选**：方框内 `Check` 16px 图标 `scale(0.6)→1` + `opacity 0→1`，`--duration-fast`。
- **WarningBar 出现**：`opacity 0→1`，`--duration-normal`。
- reduced-motion：所有展开/淡入/缩放直达终值，无位移。

### 5. 文案 / 内容（明确但非恐吓，强调可控与透明）
- **Title(h1)**：`确认删除历史推文`
- **Explanation**：`删除将分批进行，期间可随时暂停。开始前我们会清楚展示费用与时长，你确认付费后才会执行。`
- **EstimateCard 行（mono 值）**：
  - `预计待删` → `12,408 条`
  - `预计 X 写费` → `≈ $124.08（¥893，按 1:7.2 估算）`
  - `预计耗时` → `约 10 天（限速 50 条 / 15 分钟）`
  - **EstimateNote**：`汇率按固定 1:7.2 估算，仅供参考；实际费用以 X 账单为准。`
- **DeleteSummary**：
  - `待删推文` → `12,408 条`
  - `时间范围` → `2016-03 → 2026-06`
  - **SampleTweet ×3**（示例，截断 + 日期 mono）：
    - `「周末去了趟老家，地址是 XX 路…」` ｜ `2020-08-12`
    - `「对这件事我有点不同看法…」` ｜ `2019-03-04`
    - `「联系方式：138xxxx」` ｜ `2018-11-22`
- **ScopeSelector 标签**：`删除范围`
  - 单选 A：`删除全部历史推文`
  - 单选 B：`按日期范围` → 展开 `起始日期` / `结束日期`（date input）
  - 单选 C：`按关键词` → 展开 `输入关键词（逗号分隔）`
- **WarningBar**：`AlertTriangle` + `此操作不可撤销。删除后推文将从 X 移除，且 X 搜索与第三方缓存可能仍短期可见。`
- **ConsentCheckbox**：`我理解此操作不可撤销`
- **DangerButton**：`确认删除并支付`（armed 后）
- **CancelButton**：`取消`
- **ErrorState**：`未找到对应的归档，请返回重新上传。` ｜ 按钮 `返回上传`
- **EmptyState**：`没有可删除的推文。` ｜ 按钮 `返回报告`

### 6. 响应式
- **移动 <640**：ConfirmCard 占满宽度（页边 `--space-4`）；ScopeRadio 纵向堆叠；SampleTweet 纵向；DangerButton / CancelButton 均 100% 宽且纵向排列（主上 次下）。
- **平板 640–1024**：ConfirmCard 最大宽 560px 居中；ScopeRadio 纵向；双按钮可横向。
- **桌面 >1024**：ConfirmCard 固定最大宽 560px 居中；EstimateCard 与 DeleteSummary 可并排（grid 2 列）以缩短纵向；双按钮横向。

---

## ⑤ 删除进度页  `路由 /delete/[taskId]`

### 1. 组件树
```
DeleteProgressPage
└─ ProgressCard                (居中)
    ├─ ProgressHeader          (Title 「正在清理你的 X 足迹」)
    ├─ ProgressBar             (确定性进度)
    │   ├─ Track               (底槽)
    │   ├─ Fill                (语义蓝填充，按 processed/total)
    │   └─ ProgressLabel       (mono 「已删除 1,204 / 12,408 条」)
    ├─ CurrentAction           (Loader + 当前动作行)
    ├─ ActivityLog
    │   ├─ LogToggle           («活动日志» 折叠开关)
    │   └─ LogLine ×N          (mono 时间戳 + 条目)
    └─ ControlRow
        ├─ PauseButton         («暂停» / «继续»)
        └─ StopButton          («停止»)
（完成分支）
└─ CompletionState
    ├─ CheckCircle2            (绿色成功图标)
    ├─ CompletionTitle         («清理完成»)
    ├─ CompletionText          («共删除 1,204 条，你的 X 足迹已更清爽»)
    ├─ CompletionBreakdown     (mono 「已删除 1,204 · 失败 0 · 受保护 36»)
    ├─ CostLine                (mono 「本次实付 ¥893»)
    └─ ReExamCTA               («重新体检看分数变化»)
（异常分支）
└─ ErrorState                  (X 授权失效)
```

### 2. 逐组件 Token 用法
| 组件 | 背景 | 文字 | 边框 | 圆角 | 间距 | 阴影 | 字号 | 字族 |
|------|------|------|------|------|------|------|------|------|
| DeleteProgressPage | `--bg-primary` | — | — | — | 居中，页边 `--space-12` | — | — | — |
| ProgressCard | `--bg-surface` | — | `--border-default`(1px) | `--radius-xl` | `--space-8` | `--shadow-md` | — | — |
| ProgressHeader Title | — | `--text-primary` | — | — | 下 `--space-6` | — | 24 | `--font-display` |
| ProgressBar Track | `--bg-inset` | — | — | `--radius-full` | 高 12px | — | — | — |
| ProgressBar Fill | `--color-primary` | — | — | `--radius-full` | 高 12px | — | — | — |
| ProgressLabel | — | `--text-secondary` | — | — | 上 `--space-3` | — | 16 | mono |
| CurrentAction | — | `--text-primary`(动作) | — | — | 上 `--space-4` | — | 14 | `--font-display`(动作) |
| ActivityLog | `--bg-inset` | — | — | `--radius-md` | `--space-4` | — | — | — |
| LogLine | — | `--text-secondary` | —(行间 `--border-default` 细分隔) | — | `--space-2` 0 | — | 12 | mono |
| ControlRow | — | — | — | — | 上 `--space-6`, `gap --space-4` | — | — | — |
| PauseButton | `--bg-surface` | `--text-primary` | `--border-default`(1px) | `--radius-md` | `--space-3` `--space-6` | `--shadow-sm` | 16 | `--font-display` |
| StopButton | transparent | `--color-error-text` | `--color-error`(1px) | `--radius-md` | `--space-3` `--space-6` | — | 16 | `--font-display` |
| CompletionState | `--bg-surface` | — | `--border-default`(1px) | `--radius-xl` | `--space-8` | `--shadow-md` | — | — |
| CheckCircle2(完成) | — | `--color-success` | — | — | 下 `--space-4` | — | 40(图标) | — |
| CompletionTitle | — | `--text-primary` | — | — | 下 `--space-2` | — | 24 | `--font-display` |
| CompletionText | — | `--text-secondary` | — | — | 下 `--space-4` | — | 16 | `--font-display` |
| CompletionBreakdown | — | `--text-primary` | — | — | 下 `--space-2` | — | 14 | mono |
| CostLine | — | `--text-secondary` | — | — | 下 `--space-6` | — | 14 | mono |
| ReExamCTA | `--color-primary` | #FFFFFF | — | `--radius-md` | `--space-4` `--space-8` | `--shadow-sm` | 16 | `--font-display` |
| ErrorState | `--bg-surface` | — | `--border-default`(1px) | `--radius-lg` | `--space-8` | `--shadow-sm` | — | — |

> **进度条 Fill 颜色**：运行中恒为 `--color-primary`（确定性进度，非风险色）；完成时整条可转 `--color-success`（克制，不庆祝）。

### 3. 交互状态矩阵
| 元素 | Default | Hover | Focus | Active | Disabled | Loading | Empty | Error |
|------|---------|-------|-------|--------|----------|---------|-------|-------|
| ProgressBar Fill | bg `--color-primary`, width=processed/total% | — | — | — | — | 平滑增长中 | 0% 时 width 0 | — |
| PauseButton | bg `--bg-surface`, border `--border-default`, text `--text-primary` | border `--border-strong`, `--shadow-md` | `outline:2px solid --border-focus; offset 2px` | bg `--bg-subtle` | — | — | — | 暂停态变 `继续`，文案切换 |
| StopButton | transparent, text `--color-error-text`, border `--color-error` | bg `--color-error-subtle` | `outline:2px solid --border-focus; offset 2px` | bg `--color-error-subtle`(加深) | — | — | — | — |
| CurrentAction Loader | `--color-primary` 旋转 | — | — | — | — | `Loader` 16px 持续转 | — | — |
| LogLine | — | bg `--bg-subtle`(单行 hover) | — | — | — | 逐批追加 | 无日志：显示 `暂无活动` | — |
| ReExamCTA | bg `--color-primary`, #fff | bg `--color-primary-hover`, `--shadow-md` | `outline:2px solid --border-focus; offset 2px` | bg `--color-primary-active` | — | — | — | — |
| ErrorState(X授权失效) | 居中卡 + `AlertTriangle` 24px `--color-error` | — | — | — | — | — | — | `X 授权已失效，请重新连接后继续，已删部分已保留。` ＋ 按钮 `重新连接` |

### 4. 微交互
- **ProgressBar Fill 增长**：`width` 由旧值 → 新值，`--duration-normal`，`--easing-smooth`（每批更新平滑过渡，非跳变）。
- **LogLine 追加**：每条新日志 `slide-in`（`translateY(-6px)→0` + `opacity 0→1`），`--duration-normal`，`--easing-smooth`。
- **暂停**：`CurrentAction Loader` 停转，ProgressHeader 下方出现 `已暂停 · 进度已保存，可随时继续`（`--text-muted`，14，display）；PauseButton 文案 `暂停`→`继续`。
- **完成态切换**：ProgressCard 淡出 / CompletionState 淡入（`opacity 0→1` + `translateY(8px)→0`，`--duration-slow`）；CheckCircle2 `scale(0.8)→1` + `opacity 0→1`；CompletionBreakdown 数字 `0→终值` 计数滚动（克制，无 emoji 烟花）。Fill 整条转 `--color-success`。
- reduced-motion：进度条直接跳到终值、日志瞬间显示、完成态无位移无缩放、数字直达终值。

### 5. 文案 / 内容（平静、克制，完成态非庆祝式）
- **ProgressHeader**：`正在清理你的 X 足迹`
- **ProgressLabel(mono)**：`已删除 1,204 / 12,408 条`
- **CurrentAction**：`Loader` + `正在删除 2021-03 的推文…`
- **ActivityLog 标题**：`活动日志`
- **LogLine 示例(mono)**：`[10:24:03] 批次 #142 完成 · 已删 50 条`
- **暂停态提示**：`已暂停 · 进度已保存，可随时继续`
- **PauseButton**：`暂停` ↔ `继续`
- **StopButton**：`停止`
- **CompletionTitle**：`清理完成`
- **CompletionText**：`共删除 1,204 条推文，你的 X 足迹已更清爽。`
- **CompletionBreakdown(mono)**：`已删除 1,204 · 失败 0 · 受保护 36`
- **CostLine(mono)**：`本次实付 ¥893`
- **ReExamCTA**：`重新体检看分数变化`
- **Log 空态**：`暂无活动`
- **ErrorState(X授权失效)**：`X 授权已失效，请重新连接后继续，已删部分已保留。` ｜ 按钮 `重新连接`

### 6. 响应式
- **移动 <640**：ProgressCard 占满（页边 `--space-4`）；ProgressBar 全宽；ControlRow 纵向（Pause 上 / Stop 下，均 100% 宽）；ActivityLog 折叠默认收起，点击展开。
- **平板 640–1024**：ProgressCard 最大宽 640px 居中；ControlRow 横向。
- **桌面 >1024**：ProgressCard 最大宽 720px 居中；ActivityLog 默认展开；ControlRow 横向，Pause/Stop 间距 `--space-4`。

---

## 附：全局交付检查（前端实现前自检）
- [x] 全站无紫色渐变（`#7C3AED/#A855F7/#EC4899` 任一）；主色恒 `#2E5BCB`。
- [x] 功能图标仅 Lucide（16/20/24 三档），零 emoji。
- [x] 落地页用真实报告卡预览 + 三步流程，非口号 Hero。
- [x] 阴影仅 `--shadow-sm/md/lg`，卡片靠 `--border-default`，无彩色发光。
- [x] 缓动统一 `--easing-smooth`，无弹跳。
- [x] 浅色主题；语义色仅用于风险/状态指示（报告分项、警告条、完成态）。
- [x] 字号锁 8 级、间距锁 4px 网格、字体 Inter+Noto Sans SC / JetBrains Mono 分层。
- [x] 文案平静非恐吓，与 PRD §3.4 一致；含空态（如「暂无暴露项，很干净」「样本不足」「没有可删除的推文」）。
- [x] 全交互元素覆盖 focus-visible（2px `--border-focus` + 2px offset）；尊重 `prefers-reduced-motion`。

*— Phase 2 逐页设计规格封版；Phase 3 前端 Agent 照此逐组件实现 —*
