// Shared signal detectors used by both the archive parser (to set per-tweet
// flags) and the scoring engine (to aggregate dimension scores).
// All detectors are pure and return a 0..1 strength so scoring stays testable.

const RE_EMAIL = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
const RE_PHONE = /(?:(?:\+?86)?1[3-9]\d{9})|(?:\d{3,4}-?\d{7,8})/;
const RE_IDCARD = /\b\d{17}[\dXx]\b/;
const RE_BANK = /\b(?:\d[ -]?){15,19}\b/;
const RE_ADDR =
  /(我家|住址|地址|住在|上海市|北京市|广州市|深圳市|杭州市|成都市|武汉市|南京市|in\s+[A-Z][a-z]+,\s*[A-Z][a-z]+)/;

const RE_SENSITIVE =
  /(病|诊断|确诊|抑郁|焦虑|药|治疗|癌症|艾滋|政治|示威|游行|维权|宗教|信仰|同性|出柜|工资|月薪|年薪|收入|存款|负债|贷款|催收)/;

const RE_LOCATION =
  /(在\s*([\u4e00-\u9fa5]{2,6}市|[\u4e00-\u9fa5]{2,4}省)|我家在|坐标|经纬度|lat|lng|定位|签到|check.?in|📍)/i;

const RE_MEDIA_KIND = /(photo|video|animated_gif|mp4|jpg|png|gif)/i;

export function detectPii(text: string): number {
  let hits = 0;
  if (RE_EMAIL.test(text)) hits++;
  if (RE_PHONE.test(text)) hits++;
  if (RE_IDCARD.test(text)) hits++;
  if (RE_BANK.test(text)) hits++;
  if (RE_ADDR.test(text)) hits++;
  return Math.min(1, hits / 2);
}

export function detectSensitive(text: string): number {
  return RE_SENSITIVE.test(text) ? 1 : 0;
}

export function detectLocation(text: string): number {
  return RE_LOCATION.test(text) ? 1 : 0;
}

export function detectMedia(text: string, hasMedia?: boolean): number {
  if (hasMedia) return 1;
  return RE_MEDIA_KIND.test(text) ? 0.5 : 0;
}

export function countMentions(text: string): number {
  const m = text.match(/@[\w]+/g);
  return m ? m.length : 0;
}

// Age-based risk: older tweets carry more footprint risk.
export function ageScore(createdAtMs: number, nowMs: number): number {
  const years = (nowMs - createdAtMs) / (365.25 * 24 * 3600 * 1000);
  if (!isFinite(years) || years < 0) return 0;
  return Math.max(0, Math.min(1, years / 4)); // 4+ years -> full
}
