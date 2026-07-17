# 数字足迹体检报告 · UIUX 设计文档（MVP）

> 产品定位：面向「隐私焦虑个人（C 端）」的 Web 应用，MVP 数据范围仅 **Twitter/X**。
> 两件核心事：① 生成 X 数字足迹「体检报告」（诊断 + 风险评分，像体检报告一样清晰、有分数、有分项）；② 「删除全部历史推文」作为清理手段。
> 核心隐喻：**医疗 / 健康体检报告，但针对你的 X 数字足迹**。基调 = 信任、平静、清晰、不恐吓；给出「分数」与「可执行的修复建议」。
> 本文档仅产出设计方向与 Token，不含任何代码。

---

## 一、竞品 UI 分析（引用并指明借鉴 / 规避）

| 竞品 | UI 特征 | 可借鉴 ✅ | 要避开 ⚠️ |
|------|---------|-----------|------------|
| **TweetDeleter** | 干净的 Web 应用，筛选器 UI（日期 / 关键词），流程化批量操作 | 干净的筛选器范式、清晰的「步骤流」、批量操作确认模式 | 偏工具化、冷感；我们要更温暖、更具「报告感」而非「后台感」 |
| **Optery** | 暴露报告带截图证明，信任感强，可视化暴露分布 | 「证据 / 示例推文」作为暴露证明（增强信任）；暴露分布可视化（按类别 / 时间线） | 偏企业级、信息密度高；保持 C 端消费的平静与留白 |
| **FootprintIQ** | 综合扫描仪表盘，风险评分 + 分项 | 仪表盘结构直接映射我们的「总分仪表 + 分项卡」；分项风险评分模型 | 通用 SaaS 仪表盘观感；我们要「体检报告」而非「安全扫描器」 |
| **BrandYourself** | 声誉评分，风险项列表 + 修复计划 | 风险项列表 + **可执行的修复计划**（映射我们的「修复建议」） | 恐吓式文案（"你的声誉正在受损！"）；我们坚持非恐吓、平静陈述 |
| **Linear**（标杆） | 清晰、克制、克制的微交互 | 克制的视觉语言、利落的排版、细边框、快速的微交互 | — |
| **Stripe**（标杆） | 信任感、大量留白、清晰层级 | 充裕留白带来的信任感、清晰的信息层级、可信的克制 | — |

**结论**：结构借 FootprintIQ / BrandYourself（总分 + 分项 + 修复计划），信任借 Optery（证据化呈现），气质借 Linear（克制）+ Stripe（留白）。文案与情绪上**主动避开** BrandYourself 的恐吓式表达，改为平静的诊断口吻。

---

## 二、设计语言与对标品牌选择

**对标品牌组合**：`医疗健康信任感（Apple Health / 医院检验报告系统）` + `Linear 式克制` + `Stripe 式留白信任`。

**为什么是这套组合**：
- 隐喻本身就是「体检报告」——医疗报告被人信任，是因为它**结构化、平静、用分数与区间说话，而非耸动**。这与产品基调天然一致。
- Linear 提供克制：细边框、利落排版、快速但低调的微交互，避免做成「隐私泄露报警器」那种令人焦虑的安全工具。
- Stripe 提供信任：充裕留白让敏感信息不拥挤，清晰层级让人「看得清、信得过」。

**风格关键词（Style Keywords）**：
`信任 Trust` · `平静 Calm` · `清晰 Clarity` · `克制 Restraint` · `医疗级条理 Clinical Structure` · `非恐吓 Non-alarmist`

**情绪板要点**：白底为主、冷静蓝为主色、语义色仅用于风险指示（绝不用于装饰性渐变）、大量留白、细边框替代重阴影、等宽字体专用于分数与日期（强化「报告 / 数据」感）。

---

## 三、完整 Design Token

> 三层架构：`Foundation Token → Semantic Token → Component Token`。下方给出 Foundation + Semantic 两层；Component 层在第四节各页面组件中体现。
> MVP 仅实现**浅色主题**；深色为主题为后续迭代（见 3.9）。

### 3.1 主色 / 辅助色（Foundation · 蓝色阶，冷静临床蓝）

```
--blue-50:  #EEF3FF
--blue-100: #D6E2FF
--blue-200: #AEC6FF
--blue-300: #7FA3F7
--blue-400: #4F80EC
--blue-500: #3A6AE0   /* 主色标准 */
--blue-600: #2E5BCB   /* 主色 hover/active 基准 */
--blue-700: #244AA6
--blue-800: #1B3A82
```

### 3.2 语义色（Semantic）

```
/* 主操作色 —— 冷静临床蓝，非紫非红 */
--color-primary:          #2E5BCB
--color-primary-hover:    #244AA6
--color-primary-active:   #1B3A82
--color-primary-subtle:   rgba(46, 91, 203, 0.08)   /* 浅色块背景 */
--color-primary-border:   rgba(46, 91, 203, 0.20)

/* 风险 / 健康三态（仅用于风险指示，不做装饰渐变） */
--color-success:          #16A34A   /* 安全绿 - 填充/图标/边框 */
--color-success-text:     #15803D   /* 安全绿 - 文字（达 AA 对比度） */
--color-success-subtle:   rgba(22, 163, 74, 0.10)
--color-warning:          #D97706   /* 警示黄/琥珀 - 填充/图标/边框 */
--color-warning-text:     #B45309   /* 文字 */
--color-warning-subtle:   rgba(217, 119, 6, 0.10)
--color-error:            #DC2626   /* 风险红 - 填充/图标/边框 */
--color-error-text:       #B91C1C   /* 文字 */
--color-error-subtle:     rgba(220, 38, 38, 0.10)

/* 信息 / 中性提示（非风险） */
--color-info:             #0E7490   /* 青蓝，用于「说明 / 提示」 */
--color-info-subtle:      rgba(14, 116, 144, 0.10)
```

> 评分映射（健康分越高越安全）：`≥80 绿 / 60–79 琥珀 / <60 红`。红仅作风险信号，用量克制。

### 3.3 中性色（带冷色调，禁用纯黑纯灰）

```
--bg-primary:   #F6F8FC   /* 页面底，冷调灰白 */
--bg-surface:   #FFFFFF   /* 卡片 / 表面 */
--bg-elevated:  #FFFFFF   /* 浮层 */
--bg-subtle:    #EEF2F8   /* 次级底（分区/输入框底） */
--bg-inset:     #F1F4F9   /* 内嵌区（代码/日志） */

--text-primary:   #0F172A   /* 近黑，带蓝调（非 #000） */
--text-secondary: #475569   /* 正文次级（非 #808080） */
--text-muted:     #94A3B8   /* 辅助/占位，仅用于非关键信息 */

--border-default: #E2E8F0   /* 默认描边 */
--border-strong:  #CBD5E1   /* 强描边 */
--border-focus:   #2E5BCB   /* 焦点环 */
```

### 3.4 字体

```
--font-display: "Inter", "Noto Sans SC", -apple-system, BlinkMacSystemFont, sans-serif;
--font-body:    "Inter", "Noto Sans SC", -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono:    "JetBrains Mono", "Fira Code", ui-monospace, monospace;
```

- **Inter + Noto Sans SC**：界面与正文（中文回退 Noto Sans SC，保证中英混排一致）。
- **JetBrains Mono**：专用于「分数、@handle、日期、ID、日志时间戳」——强化「报告 / 数据」质感。
- 层级关系：标题/正文用 display/body；所有数字与机器字段用 mono。

### 3.5 字号层级（仅 8 级，禁止其他值）

```
--text-12: 12px   /* caption 说明 */
--text-14: 14px   /* body-sm */
--text-16: 16px   /* body 正文 */
--text-18: 18px   /* subtitle 小标题 */
--text-20: 20px   /* h3 */
--text-24: 24px   /* h2 */
--text-32: 32px   /* h1 */
--text-40: 40px   /* display：报告总分数字 */
```
> 报告总分（体检分）使用 `--text-40` + mono，配合小号单位标签（--text-12）。

### 3.6 间距尺度（4px 基准网格，禁止非标值）

```
允许值：4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64 / 80
禁止值：5 / 7 / 13 / 15 / 22 / 30 等
```
```
--space-1: 4px    --space-2: 8px    --space-3: 12px   --space-4: 16px
--space-5: 20px   --space-6: 24px   --space-8: 32px   --space-10: 40px
--space-12: 48px  --space-16: 64px  --space-20: 80px
```

### 3.7 圆角

```
--radius-sm:  6px    /* 标签 / 小元素 */
--radius-md:  10px   /* 按钮 / 输入框 / 卡片内元素 */
--radius-lg:  16px   /* 卡片 / 容器 */
--radius-xl:  20px   /* 大区块 / 报告主卡 */
--radius-full: 999px /* 头像 / 圆形按钮 / 状态点 */
```

### 3.8 阴影层级（克制，用边框替代重阴影，避免 AI 味）

```
--shadow-sm: 0 1px 2px  rgba(15, 23, 42, 0.04)
--shadow-md: 0 2px 8px  rgba(15, 23, 42, 0.06)
--shadow-lg: 0 8px 24px rgba(15, 23, 42, 0.08)
```
> 原则：卡片默认靠 `--border-default` 界定；仅浮层 / hover 抬升用阴影。禁止发光式彩色阴影。

### 3.9 动效时长与缓动

```
--duration-fast:   150ms
--duration-normal: 250ms
--duration-slow:   400ms
--easing-smooth:   cubic-bezier(0.4, 0, 0.2, 1)   /* 标准缓出，禁用弹跳缓动 */
```
> 全站统一此缓动；尊重 `prefers-reduced-motion`（见第六节）。

### 3.10 图标库（强制）

- **唯一图标库：Lucide**（`lucide-react` / `lucide-vue` / `lucide-svelte` 等）。
- 尺寸三档：`16px`（行内）/ `20px`（按钮内）/ `24px`（独立图标）。
- **绝对禁止 emoji 作为功能图标**（不使用 🚀🔥💡✨⚡🎨 等）。
- 常用映射示例：连接=`Plug` / 上传=`UploadCloud` / 报告=`ClipboardList` / 分项=`Activity`·`MapPin`·`History`·`MessageSquare`·`UserCheck`·`ShieldCheck` / 删除=`Trash2` / 进度=`Loader` / 成功=`CheckCircle2` / 警告=`AlertTriangle` / 导出=`Download` / 隐私=`Lock`。

### 3.11 主题策略

- **MVP 仅实现浅色主题（Light Primary）**——与「平静、信任、清晰」基调一致，且降低首版复杂度。
- **深色主题： deferred（后续迭代）**。理由：敏感数据夜间审阅场景存在需求，但 MVP 先聚焦浅色一致性与可读性；若实现，须复用同套 Token 语义层，仅替换 Foundation 背景/文字反向值（深色底 `#0D1117` + 表面 `#161B22` + 文字 `#F0F6FC`，主色保持冷静蓝并略提亮）。

---

## 四、信息架构与核心页面清单

**顶层信息架构（IA）**
```
连接 X（授权/说明）
   └─ 上传归档（取得 X 数据归档 ZIP 并解析）
        └─ 体检报告仪表盘（总分 + 分项 + 修复建议）  ← 核心
             ├─ 分项明细（敏感词/位置/旧帖/互动/身份/安全）
             └─ 删除历史推文 → 确认页 → 进度页 → 完成（可重新体检）
```

**核心页面（5 个必备）**

### ① 落地 / 连接 X 页（Landing / Connect）
- **布局要点**：顶部细导航（左 Logo「足迹体检」+ 右「登录」文字按钮）。主区**非千篇一律 Hero**——采用「左文右真物预览」：左侧价值主张（标题「你的 X 数字足迹，值得一次体检」+ 一句非恐吓副文案 + 主 CTA「开始免费体检」+ 隐私承诺行），右侧放一张**真实的「体检报告卡」静态预览**（含示例总分片段 / 分项缩略），让用户未操作即见成品形态。下方一条「三步流程」：连接账号 → 安全上传归档 → 生成体检报告（用 Lucide 图标 + 序号，非抽象 3D）。
- **关键组件**：细导航栏、报告卡预览（mock）、三步流程条、隐私承诺横幅（`Lock` 图标 + 「数据本地处理 · 不上云 · 可一键清除」）、主 CTA 按钮。
- **Micro-interaction**：报告卡预览在进入视口时做一次极轻的「呼吸」——`opacity 0.9→1` + `translateY 4px→0`，`--duration-slow` 单次；主 CTA hover 抬升 `--shadow-md`，按下 `--color-primary-active`。

### ② 上传归档页（Upload Archive）
- **布局要点**：居中单栏，上方标题「上传你的 X 数据归档」。核心为**拖拽区（Dropzone）**：虚线边框 + `UploadCloud` 24px 图标 + 「拖入 .zip，或点击选择」。其下为「如何获取归档」可折叠指引（指向 X → 设置 → 你的数据 → 下载归档），避免用户卡住。解析后展示「已识别」清单（推文数 / 媒体 / 点赞 / 关注）用 skeleton→实体淡入。
- **关键组件**：Dropzone（默认 / hover / drag-over / 解析中 / 完成 / 错误 多状态）、「如何获取归档」Accordion、解析结果列表、隐私安抚条。
- **Micro-interaction**：`drag-over` 时 Dropzone 边框变 `--border-focus` + 底色 `--color-primary-subtle`；文件落入后，结果条目以 `stagger` 逐条 `slide-in`（--duration-normal），每条带 `CheckCircle2` 16px 打勾。

### ③ 体检报告仪表盘（Health Report Dashboard）★核心
- **布局要点**：
  - 报告头：报告名「X 数字足迹体检报告」+ 生成时间（mono）+ 账号 `@handle`（mono）+ 整体「数字足迹健康分」大数字（--text-40 mono）+ 评级标签（如「良好 · B+」，用语义色柔和底）。
  - 主区左：**分数仪表**（SVG 径向环，弧色按分映射绿/琥珀/红），中心嵌总分。
  - 主区右/下：**分项卡片网格**（响应式 2–3 列），每卡 = Lucide 图标 + 分项名 + 分项小分（mono）+ 风险强度条（语义色，克制）+ 「查看 N 条明细 / 修复建议」入口。分项建议：① 敏感词暴露 ② 位置泄露 ③ 旧帖可溯 ④ 互动痕迹 ⑤ 身份关联 ⑥ 账号安全。
  - 底部：**总体诊断 + 可执行修复建议列表**（按优先级排序，每条带 `CheckCircle2`/动作按钮「去修复」）。
  - 顶部操作：导出 PDF（`Download`）、前往清理（`Trash2`）。
- **关键组件**：径向分数仪表（SVG，动画弧）、分项风险卡（含强度条）、修复建议列表（优先级）、导出/清理 CTA、报告头（mono 字段）。
- **Micro-interaction**：仪表弧在滚动进入视口时从 0 动画到实际分（`--duration-slow`，`prefers-reduced-motion` 下直接显示终值）；分项卡 `stagger` 淡入；hover 分项卡时底部浮现「查看 N 条明细」下划线动作。

### ④ 删除历史推文确认页（Delete Confirmation）
- **布局要点**：居中确认卡（最大宽 ~560px）。顶部非恐吓但明确的说明；中部「将删除的内容」摘要（数量 mono、时间范围、2–3 条示例推文预览——即「证据化」呈现，呼应 Optery）；一个**范围选择**（单选：删除全部 / 按日期 / 按关键词——选条件时展开对应筛选器，复用 TweetDeleter 范式）；一个明确的不可逆警示条（`AlertTriangle` + `--color-error-subtle` 底，文字 `--color-error-text`）；勾选框「我理解此操作不可撤销」+ 主危险按钮（红，克制）+ 次级「取消」。
- **关键组件**：删除范围摘要卡、范围单选（含条件筛选器）、不可逆警示条、同意勾选框、危险主按钮（disabled→enabled）、取消次按钮。
- **Micro-interaction**：选择「删除全部」时危险按钮由常态过渡到「已 armed」——边框/底色加深为 `--color-error`，hover 时 `--color-error-active`；勾选框未勾时按钮 `disabled`（`opacity 0.5` + 不可点），勾选后 `--duration-fast` 过渡到可用并轻微「亮起」。

### ⑤ 删除进度页（Deletion Progress）
- **布局要点**：居中进度视图。顶部「正在清理你的 X 足迹」；中部**确定性进度条**（X / Y 条，mono）+ 当前动作行（「正在删除 2021-03 的推文…」）；下方**实时活动日志**（mono 时间戳 + 条目，可折叠），每批完成追加一行；右侧/底部「暂停」「停止」控件；完成时切换到平静成功态（绿色 `CheckCircle2` + 「共删除 1,204 条，你的足迹已更清爽」+ 「重新体检看分数变化」CTA）。
- **关键组件**：确定性进度条、当前动作指示、实时日志（mono）、暂停/停止控件、完成成功态（非庆祝式）、重新体检 CTA。
- **Micro-interaction**：进度条平滑填充（`--duration-normal` 缓动）；每批完成日志行 `slide-in` 淡入；完成态以绿色对勾 + 数字滚动收尾（克制，无 emoji 烟花）。

---

## 五、视觉反模式自查（规避 AI 味设计）

| 反模式 | 是否触及 | 规避方式 |
|--------|----------|----------|
| 紫色渐变综合症 | ❌ 未触及 | 主色为冷静临床蓝 `#2E5BCB`；全站**无渐变主视觉**，分数弧用纯色分段（绿/琥珀/红），不用 `#7C3AED/#A855F7/#EC4899` 任一 |
| Emoji 替代图标 | ❌ 未触及 | 唯一图标库 Lucide，三档尺寸；功能图标零 emoji |
| 千篇一律 Hero | ❌ 未触及 | 落地页用「真实报告卡预览 + 三步流程」，展示成品形态而非口号 + 抽象图形 |
| 三列卡片功能展示 | ⚠️ 部分形似但本质不同 | 分项卡是**真实数据驱动的风险评分卡**（含分数/强度条/明细入口），非「图标+标题+一句空话」 |
| 彩色背景上灰字 | ❌ 未触及 | 语义色块上文字一律用对应 `-text` 变体（如绿底用 `#15803D`），深色底用 `rgba(255,255,255,0.7+)` |
| 纯黑 / 纯灰 | ❌ 未触及 | 中性色带冷蓝调（`#0F172A`/`#475569`/`#94A3B8`），无 `#000`/`#808080` |
| 弹跳 / 弹性缓动 | ❌ 未触及 | 全站 `cubic-bezier(0.4, 0, 0.2, 1)`，禁用 `cubic-bezier(0.68,-0.55,...)` 等 |
| 过度阴影 | ❌ 未触及 | 卡片靠细边框界定；阴影仅 `--shadow-sm/md/lg` 三级且极淡，无彩色发光 |

---

## 六、可访问性基础（A11y）

- **对比度**：正文 `--text-primary #0F172A` on `#FFFFFF` ≈ 15:1（远超 AA）；`--text-secondary #475569` on 白 ≈ 7:1；`--text-muted` 仅用于非必要信息。语义文字用 `-text` 变体（绿 `#15803D` / 琥珀 `#B45309` / 红 `#B91C1C` on 白均 ≥ 4.5:1，达 AA）。正文 / 大文本对比度 ≥ 4.5:1 / 3:1。
- **焦点态**：所有可交互元素 `:focus-visible` 显示 `2px` 实线环 `--border-focus` + `2px` offset，键盘可达、可见。
- **键盘可达**：所有操作（连接 / 上传 / 范围选择 / 删除确认 / 暂停）均可纯键盘完成；对话框/确认卡 `role="dialog"` + `aria-modal` + 焦点陷阱。
- ** reduced-motion**：`@media (prefers-reduced-motion: reduce)` 下关闭仪表弧动画、卡片 stagger、呼吸效果，直接呈现终态。
- **语义与读屏**：分数仪表 `role="img"` + `aria-label="数字足迹健康分 82 分，评级良好"`；风险条带 `aria-valuenow/min/max`；图标按钮带 `aria-label`，装饰性 Lucide 图标 `aria-hidden`。
- **文案可访问**：所有状态（加载 / 空 / 错误）均有可读文本，不依赖颜色 alone 传达风险（风险同时用图标 + 文字标签）。

---

## 七、组件状态矩阵（落地要求）

所有主按钮 / 输入 / 卡均覆盖至少：Default / Hover / Focus / Active / Disabled；异步操作补 Loading；删除等危险操作覆盖确认 + 范围错误态；列表/报告覆盖 Empty（如「暂无暴露项，很干净」）。详见各页面组件描述中的多状态说明。
