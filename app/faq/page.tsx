import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import type { Lang } from '@/lib/i18n';

const CONTENT: Record<Lang, { title: string; items: { q: string; a: string }[] }> = {
  zh: {
    title: '常见问题',
    items: [
      {
        q: '我的归档文件安全吗？会被上传到服务器吗？',
        a: '不会。你的 X 归档文件只在浏览器本地解析，生成体检报告，不会上传到任何服务器。只有当你确认删除时，才会通过 X 官方 API 执行写操作。',
      },
      {
        q: '体检报告有什么用？',
        a: '报告会对你的推文进行六维风险评估（个人身份信息、敏感内容、地理位置、陈旧内容、账号足迹、媒体附件），给出 0–100 的健康评分，并列出所有高风险推文，帮助你了解自己在 X 上的隐私状况。',
      },
      {
        q: '删除推文是按条收费吗？',
        a: '是的。我们按推文条数阶梯计费：少量档（≤1000条）、中量档（1001–10000条）、大量档（>10000条）。Pro 会员每月享有 2000 条删除额度。',
      },
      {
        q: '删除后可以恢复吗？',
        a: '不可以。推文一旦通过 X 官方 API 删除，无法恢复。建议在确认删除前先用试运行模式（不收费）验证流程。',
      },
      {
        q: '试运行模式是什么？',
        a: '试运行会模拟完整的删除流程（计算费用、生成进度条、显示结果），但不实际调用 X 接口，也不产生任何费用。强烈建议首次使用前先试运行。',
      },
      {
        q: '支持退款吗？',
        a: '支持。删除任务未开始时，可全额退款；任务进行中，按已删除条数比例退款（已删除部分不退款）。',
      },
      {
        q: '付款方式有哪些？',
        a: '目前支持 Waffo 在线支付，可绑定信用卡或借记卡。PayPal 功能也在陆续接入中。',
      },
    ],
  },
  en: {
    title: 'FAQ',
    items: [
      {
        q: 'Is my archive safe? Will it be uploaded to a server?',
        a: 'No. Your X archive is parsed entirely in your browser locally — it is never uploaded to any server. The deletion operation only touches X\'s official API after you explicitly confirm and pay.',
      },
      {
        q: 'What is the health report for?',
        a: 'The report performs a six-dimension risk assessment on your tweets (PII, sensitive content, location, stale content, account footprint, media attachments), produces a 0–100 health score, and lists all high-risk tweets so you can understand your privacy footprint on X.',
      },
      {
        q: 'How is tweet deletion billed?',
        a: 'By tweet count, in three tiers: Small (≤1,000 tweets), Medium (1,001–10,000 tweets), Large (>10,000 tweets). Pro members get 2,000 deletions per month.',
      },
      {
        q: 'Can deleted tweets be recovered?',
        a: 'No. Once a tweet is deleted via X\'s official API, it cannot be recovered. We strongly recommend using the dry-run mode (free) first to validate the flow.',
      },
      {
        q: 'What is dry-run mode?',
        a: 'Dry-run simulates the full deletion flow — calculating fees, showing progress, displaying results — without actually calling X\'s API or charging anything. Highly recommended for first-time users.',
      },
      {
        q: 'Do you offer refunds?',
        a: 'Yes. Full refund if deletion has not started. If the job is in progress, a prorated refund is issued based on the deleted count (already-deleted tweets are non-refundable).',
      },
      {
        q: 'What payment methods are supported?',
        a: 'Currently Waffo online payment (credit/debit cards). PayPal support is being added.',
      },
    ],
  },
};

const METADATA: Record<Lang, Metadata> = {
  zh: {
    title: '常见问题 | 数字足迹体检报告',
    description: '数字足迹体检报告常见问题 — 归档安全、删除计费、退款政策等。',
  },
  en: {
    title: 'FAQ | Digital Footprint Health',
    description:
      'Frequently asked questions about Digital Footprint Health — archive safety, deletion pricing, refunds, and more.',
  },
};

/**
 * Static bilingual page: /faq = zh, /en/faq (catch-all with lang="en") = en.
 * No request-scoped APIs — pre-rendered at build time, served from CDN.
 */
export function generateMetadata(): Metadata {
  return METADATA.zh;
}

export default function FaqPage({ lang = 'zh' }: { lang?: Lang }) {
  const content = CONTENT[lang];

  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <Breadcrumb items={[{ labelKey: 'nav.faq', href: '/faq' }]} />
      <h1 className="t-2 font-bold">{content.title}</h1>
      <div className="space-y-5">
        {content.items.map((item, i) => (
          <div key={i} className="space-y-2">
            <h2 className="t-4 font-semibold">{item.q}</h2>
            <p className="t-5 text-ink-soft leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
