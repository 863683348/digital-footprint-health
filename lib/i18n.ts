// i18n catalog — zh / en. Frontend-only localization (per change request):
// the backend returns structured keys (dimension kind, riskFlag kind, tier,
// plan id, error code); the strings below map those keys to UI language.

export type Lang = 'zh' | 'en';

type Vars = Record<string, string | number>;

const zh: Record<string, string> = {
  brand: '数字足迹体检报告',

  'nav.home': '首页',
  'nav.upload': '上传归档',
  'nav.delete': '去删除',

  'footer.privacy':
    '你的归档文件仅在本机解析，不会上传到任何服务器。删除操作通过 X 官方接口执行，费用透明、可随时暂停。',
  'footer.version': '数字足迹体检报告 · MVP 演示版本',

  // landing
  'landing.hero.title': '看清你在 X 上留下的每一处足迹',
  'landing.hero.desc':
    '上传你从 X 下载的归档文件，本机生成一份隐私体检报告，标出含手机号、住址、定位等风险的推文，并可按需批量删除。数据不出本机，报告即时可得。',
  'landing.cta.start': '开始体检',
  'landing.cta.delete': '我想删除推文',
  'landing.step1.title': '下载并上传归档',
  'landing.step1.desc': '在 X 的「设置 → 你的数据」中申请归档，下载后直接上传。文件全程在本机解析。',
  'landing.step2.title': '本地生成体检报告',
  'landing.step2.desc': '自动识别含手机号、邮箱、住址、定位、敏感话题的推文，给出 0–100 健康评分与风险清单。',
  'landing.step3.title': '按需清理历史推文',
  'landing.step3.desc': '确认费用后，可批量删除历史推文。支持暂停、续传与取消，费用透明可控。',
  'landing.trust.title': '为什么能放心用',
  'landing.trust.1': '报告 100% 由你本机的归档文件生成，不调用任何 X 读取接口。',
  'landing.trust.2': '删除才涉及 X 写接口，且按条计费、可随时暂停与退款。',
  'landing.trust.3': '归档内容以加密形式落盘，密钥仅存于本机。',

  // upload
  'upload.title': '上传你的 X 归档',
  'upload.desc': '支持从 X 下载的 tweets.csv 或 tweets.js。文件仅在本机解析。',
  'upload.drop': '点击或拖拽文件到此处',
  'upload.hint': '仅支持 .csv / .js 格式',
  'upload.gen': '生成体检报告',
  'upload.parsing': '解析中…',
  'upload.privacy': '你的归档不会上传到任何服务器。报告完全由本机文件生成，删除推文时才通过 X 官方接口执行。',
  'upload.error': '处理失败，请重试',

  // report
  'report.insufficient.title': '样本不足',
  'report.insufficient.desc':
    '当前归档仅解析出 {count} 条推文，不足 10 条，无法生成可靠评分。请上传更完整的归档后重试。',
  'report.title': '数字足迹体检报告',
  'report.subtitle': '归档：{fileName} · 共 {count} 条推文',
  'report.goDelete': '去删除风险推文',
  'report.gauge.hint': '分数越高，足迹越干净',
  'report.dims.title': '六维风险分布',
  'report.dims.weight': '权重',
  'report.risk.title': '风险清单（{n}）',
  'report.risk.empty': '未检出明显隐私风险，足迹较干净。',
  'report.reupload': '重新上传',
  'report.loading': '加载中…',
  'report.loaderror': '加载失败',
  'report.missing': '未找到该报告，可能已过期。请重新上传归档。',

  // dimensions
  'dim.pii': '个人身份信息',
  'dim.sensitive': '敏感内容',
  'dim.location': '地理位置',
  'dim.old': '陈旧内容',
  'dim.account': '账号足迹面',
  'dim.media': '媒体附件',

  // risk flags (by kind)
  'flag.pii': '含个人身份信息（电话/邮箱/证件）',
  'flag.sensitive': '含敏感内容（健康/政治/财务）',
  'flag.location': '含地理位置信息',
  'flag.account': '历史推文量较大（{count} 条），足迹面较广',

  // delete confirm
  'delete.confirm.title': '确认删除任务',
  'delete.confirm.noArchive': '请先从体检报告页选择要删除的归档。',
  'delete.confirm.calc': '计算费用中…',
  'delete.dryrun.title': '试运行模式（推荐先试）',
  'delete.dryrun.desc': '不调用 X 接口、不产生任何费用，仅模拟删除流程与进度，用于验证整条链路。',
  'delete.confirm.callout':
    '删除为 X 付费写操作，按条计费。任务可随时暂停、续传或取消；未开始可全额退款，进行中按已删除条数比例退款。',
  'delete.start.dryrun': '开始试运行',
  'delete.start.real': '开始删除（将计费）',
  'delete.creating': '创建中…',
  'delete.createFail': '创建失败',

  // fee estimate card
  'fee.title': '费用预估',
  'fee.tier': '计费档位',
  'fee.tier.small': '少量档',
  'fee.tier.medium': '中量档',
  'fee.tier.large': '大量档',
  'fee.total': '预计总额',
  'fee.base': '基础费',
  'fee.pertweet': '单条费（{count} 条 × ¥{rate}）',
  'fee.rate': 'X 写费基准（参考）',

  // delete progress
  'progress.title': '删除进度',
  'progress.dryrun.badge': '试运行',
  'progress.processed': '已处理 {processed} / {total}',
  'progress.success': '成功 {succeeded} · 失败 {failed}',
  'progress.pause': '暂停',
  'progress.resume': '继续',
  'progress.cancel': '取消',
  'progress.dryrun.note': '试运行：未真实删除、未计费。验证无误后可在确认页关闭试运行重新发起。',
  'progress.detail.title': '任务明细（最近 {n} 条）',
  'progress.missing': '缺少任务参数。',
  'progress.notfound': '未找到删除结果，请重新操作。',
  'progress.loading': '加载中…',

  // job / status labels
  'status.queued': '排队中',
  'status.running': '进行中',
  'status.paused': '已暂停',
  'status.completed': '已完成',
  'status.cancelled': '已取消',
  'status.failed': '失败',
  'jobitem.done': '已删除',
  'jobitem.failed': '失败',
  'jobitem.processing': '处理中',
  'jobitem.pending': '待处理',
  'jobitem.skipped': '已跳过',

  // gauge
  'gauge.label': '健康评分',

  // billing plans (if ever rendered)
  'plan.free.name': '免费版',
  'plan.free.desc': '上传归档、生成体检报告、查看风险',
  'plan.single_small.name': '单次 · 少量',
  'plan.single_small.desc': '≤1000 条推文删除',
  'plan.single_medium.name': '单次 · 中量',
  'plan.single_medium.desc': '1001–10000 条推文删除',
  'plan.single_large.name': '单次 · 大量',
  'plan.single_large.desc': '>10000 条：¥20 基础费 + ¥0.15/条',
  'plan.pro_monthly.name': 'Pro 月付',
  'plan.pro_monthly.desc': '每月 2000 条删除额度',
  'plan.pro_annual.name': 'Pro 年付',
  'plan.pro_annual.desc': '每年 2000×12 条删除额度',
  'refund.policy': '未开始删除：全额退款；进行中：按已删除条数比例退款（已删除部分不退款）。',

  // error codes
  'error.default': '请求失败',
  'error.NOT_FOUND': '资源不存在',
  'error.VALIDATION': '请求参数有误',
  'error.PARSE_FAILED': '归档解析失败',
  'error.ALREADY_RUNNING': '已有进行中的任务',
  'error.FORBIDDEN': '无权限',
  'error.INTERNAL': '服务器内部错误',
};

const en: Record<string, string> = {
  brand: 'Digital Footprint Health Report',

  'nav.home': 'Home',
  'nav.upload': 'Upload Archive',
  'nav.delete': 'Delete',

  'footer.privacy':
    'Your archive is parsed only on this device and never uploaded to any server. Deletions run through X’s official API — transparent pricing, pausable anytime.',
  'footer.version': 'Digital Footprint Health Report · MVP demo',

  'landing.hero.title': 'See every digital trace you left on X',
  'landing.hero.desc':
    'Upload the archive you downloaded from X and generate a privacy health report locally — flagging tweets that leak phone numbers, addresses, locations, and more, with one-click batch deletion. Your data never leaves this device; the report is instant.',
  'landing.cta.start': 'Start checkup',
  'landing.cta.delete': 'I want to delete tweets',
  'landing.step1.title': 'Download & upload your archive',
  'landing.step1.desc':
    'Request your archive under X “Settings → Your data”, download it, then upload. It is parsed entirely on your device.',
  'landing.step2.title': 'Generate the health report locally',
  'landing.step2.desc':
    'Auto-detect tweets with phone numbers, emails, addresses, locations, or sensitive topics, and produce a 0–100 health score with a risk list.',
  'landing.step3.title': 'Clean up old tweets on demand',
  'landing.step3.desc':
    'After confirming the fee, batch-delete old tweets. Pause, resume, and cancel anytime — pricing stays transparent.',
  'landing.trust.title': 'Why you can trust it',
  'landing.trust.1': 'Reports are generated 100% from your local archive — no X read API is ever called.',
  'landing.trust.2': 'Only deletion touches X’s write API, charged per tweet, pausable and refundable.',
  'landing.trust.3': 'Archives are stored encrypted on disk; keys stay only on your device.',

  'upload.title': 'Upload your X archive',
  'upload.desc': 'Supports tweets.csv or tweets.js downloaded from X. Parsed locally only.',
  'upload.drop': 'Click or drag a file here',
  'upload.hint': 'Only .csv / .js supported',
  'upload.gen': 'Generate health report',
  'upload.parsing': 'Parsing…',
  'upload.privacy':
    'Your archive is never uploaded to any server. The report is built entirely from local files; deletions run through X’s official API only when you start them.',
  'upload.error': 'Processing failed, please retry',

  'report.insufficient.title': 'Insufficient sample',
  'report.insufficient.desc':
    'This archive only parsed {count} tweets — fewer than 10, so a reliable score cannot be produced. Please upload a more complete archive and retry.',
  'report.title': 'Digital Footprint Health Report',
  'report.subtitle': 'Archive: {fileName} · {count} tweets',
  'report.goDelete': 'Delete risky tweets',
  'report.gauge.hint': 'Higher score, cleaner footprint',
  'report.dims.title': 'Six-dimension risk',
  'report.dims.weight': 'weight',
  'report.risk.title': 'Risk list ({n})',
  'report.risk.empty': 'No obvious privacy risks detected — your footprint looks clean.',
  'report.reupload': 'Re-upload',
  'report.loading': 'Loading…',
  'report.loaderror': 'Failed to load',
  'report.missing': 'Report not found — it may have expired. Please re-upload your archive.',

  'dim.pii': 'Personal info',
  'dim.sensitive': 'Sensitive content',
  'dim.location': 'Location',
  'dim.old': 'Stale content',
  'dim.account': 'Account footprint',
  'dim.media': 'Media attachments',

  'flag.pii': 'Contains personal info (phone/email/ID)',
  'flag.sensitive': 'Contains sensitive content (health/politics/finance)',
  'flag.location': 'Contains location info',
  'flag.account': 'Large tweet history ({count} tweets) — broad footprint',

  'delete.confirm.title': 'Confirm deletion',
  'delete.confirm.noArchive': 'Please select an archive from the report page first.',
  'delete.confirm.calc': 'Calculating fee…',
  'delete.dryrun.title': 'Dry-run mode (try first)',
  'delete.dryrun.desc':
    'Calls no X API and charges nothing — it only simulates the deletion flow and progress to validate the whole pipeline.',
  'delete.confirm.callout':
    'Deletion is a paid X write operation, charged per tweet. Jobs can be paused, resumed, or cancelled anytime; full refund before start, prorated by deleted count while running.',
  'delete.start.dryrun': 'Start dry run',
  'delete.start.real': 'Start deletion (will be charged)',
  'delete.creating': 'Creating…',
  'delete.createFail': 'Failed to create',

  'fee.title': 'Fee estimate',
  'fee.tier': 'Pricing tier',
  'fee.tier.small': 'Small',
  'fee.tier.medium': 'Medium',
  'fee.tier.large': 'Large',
  'fee.total': 'Estimated total',
  'fee.base': 'Base fee',
  'fee.pertweet': 'Per-tweet fee ({count} × ¥{rate})',
  'fee.rate': 'X write fee base (reference)',

  'progress.title': 'Deletion progress',
  'progress.dryrun.badge': 'Dry run',
  'progress.processed': 'Processed {processed} / {total}',
  'progress.success': 'Succeeded {succeeded} · Failed {failed}',
  'progress.pause': 'Pause',
  'progress.resume': 'Resume',
  'progress.cancel': 'Cancel',
  'progress.dryrun.note':
    'Dry run: nothing was actually deleted or charged. Once verified, turn off dry-run on the confirm page and start again.',
  'progress.detail.title': 'Job details (latest {n})',
  'progress.missing': 'Missing job parameter.',
  'progress.notfound': 'No deletion result found — please start again.',
  'progress.loading': 'Loading…',

  'status.queued': 'Queued',
  'status.running': 'Running',
  'status.paused': 'Paused',
  'status.completed': 'Completed',
  'status.cancelled': 'Cancelled',
  'status.failed': 'Failed',
  'jobitem.done': 'Deleted',
  'jobitem.failed': 'Failed',
  'jobitem.processing': 'Processing',
  'jobitem.pending': 'Pending',
  'jobitem.skipped': 'Skipped',

  'gauge.label': 'Health score',

  'plan.free.name': 'Free',
  'plan.free.desc': 'Upload archive, generate report, view risks',
  'plan.single_small.name': 'One-time · Small',
  'plan.single_small.desc': 'Delete up to 1,000 tweets',
  'plan.single_medium.name': 'One-time · Medium',
  'plan.single_medium.desc': 'Delete 1,001–10,000 tweets',
  'plan.single_large.name': 'One-time · Large',
  'plan.single_large.desc': '>10,000 tweets: ¥20 base + ¥0.15/tweet',
  'plan.pro_monthly.name': 'Pro · Monthly',
  'plan.pro_monthly.desc': '2,000 deletions per month',
  'plan.pro_annual.name': 'Pro · Annual',
  'plan.pro_annual.desc': '2,000×12 deletions per year',
  'refund.policy':
    'Full refund before deletion starts; prorated by deleted count while running (deleted portion non-refundable).',

  'error.default': 'Request failed',
  'error.NOT_FOUND': 'Resource not found',
  'error.VALIDATION': 'Invalid request parameters',
  'error.PARSE_FAILED': 'Archive parsing failed',
  'error.ALREADY_RUNNING': 'A job is already running',
  'error.FORBIDDEN': 'Forbidden',
  'error.INTERNAL': 'Internal server error',
};

export const catalogs: Record<Lang, Record<string, string>> = { zh, en };

export function detectLang(): Lang {
  if (typeof navigator !== 'undefined' && navigator.language) {
    return navigator.language.toLowerCase().startsWith('en') ? 'en' : 'zh';
  }
  return 'zh';
}

export function translate(lang: Lang, key: string, vars?: Vars): string {
  let s = catalogs[lang]?.[key] ?? catalogs.zh[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
    }
  }
  return s;
}

// Translate a backend error by its machine `code`; fall back to the server's
// message, then to a generic string.
export function translateError(lang: Lang, code?: string, fallback?: string): string {
  if (code && (catalogs[lang][`error.${code}`] ?? catalogs.zh[`error.${code}`])) {
    return catalogs[lang][`error.${code}`] ?? catalogs.zh[`error.${code}`];
  }
  return fallback || catalogs[lang]['error.default'] || 'Request failed';
}
