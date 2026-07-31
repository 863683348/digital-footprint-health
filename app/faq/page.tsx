import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AdUnit } from '@/components/AdUnit';

// Replace with the real AdSense slot id from your dashboard once approved.
const FAQ_AD_SLOT = '6642233840';

export const metadata: Metadata = {
  title: '常见问题 | 数字足迹体检报告',
  description: '关于数字足迹体检、X/Twitter 隐私检查与批量删除推文的常见问题与解答。',
  alternates: { canonical: '/faq' },
  openGraph: {
    title: '常见问题 | 数字足迹体检报告',
    description: '关于 X/Twitter 隐私检查与批量删除推文的常见问题与解答。',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
};

const faqs = [
  {
    q: '什么是数字足迹体检报告？',
    a: '数字足迹体检报告是一款隐私保护工具。你上传从 X 下载的归档文件后，它会自动检测推文中可能泄露的手机号、邮箱、地址、定位等敏感信息，生成一份隐私健康评分和风险清单，并支持一键批量删除有风险的推文。所有解析操作都在你的设备本地完成，数据不上传至任何服务器。',
  },
  {
    q: '我的数据安全吗？会上传到服务器吗？',
    a: '非常安全。我们采用了"纯本地处理"架构——你在浏览器中上传的归档文件会直接在本机解析，不会发送到我们的服务器或任何第三方服务器。只有当你确认执行删除操作时，才会通过 X 的官方 API 接口发送删除请求。完整细节请查看我们的隐私政策。',
  },
  {
    q: '需要付费吗？费用是多少？',
    a: '上传归档和生成体检报告是免费的。如果你需要批量删除推文，则按条计费。删除费用根据推文数量分档：少量（≤1000 条）、中量（1001–10000 条）、大量（>10000 条）。任务可随时暂停、续传或取消，未开始的删除可全额退款，进行中的按比例退款。',
  },
  {
    q: '能用它删除 X 上所有的旧推文吗？',
    a: '可以。通过上传你的 X 数据归档（包含自注册以来所有推文），我们可以读取到 X 普通 API 无法覆盖的早期推文（超过 3200 条限制的部分）。配合我们的批量删除功能，可以删除任意时间范围内的推文。',
  },
  {
    q: '如何下载我的 X 归档文件？',
    a: '登录 X（原 Twitter），进入「设置」→「你的数据」→「下载归档数据」。X 会发送验证码到你的邮箱，确认后即可开始准备归档。通常需要 24 小时，完成后会收到通知和下载链接。下载的是一个 ZIP 文件。',
  },
  {
    q: '支持哪些文件格式？',
    a: '目前支持从 X 下载的 tweets.csv 和 tweets.js 格式。ZIP 文件需要解压后上传对应的文件。',
  },
  {
    q: '删除推文后还能恢复吗？',
    a: '不能。推文一旦通过 X 的官方接口删除就是永久性的。我们建议在批量删除前先备份你的 X 数据归档。删除操作在处理时也会显示进度条，你可以在任何时候暂停或取消。',
  },
  {
    q: 'X 会因为批量删除封我的账号吗？',
    a: '正常的批量删除操作不会导致封号。我们的删除流程会自动控制速率，遵守 X 的 API 限制，模拟正常用户操作频率，不会触发风控机制。',
  },
  {
    q: '可以只删除特定类型的推文吗？',
    a: '可以。系统会自动检测含手机号、邮箱、地址、定位、敏感话题的推文，并在风险清单中分类展示。你可以按风险类型筛选，选择只删除特定类型的推文。',
  },
  {
    q: '产品支持哪些语言？',
    a: '目前支持中文（简体）和英文。网页会根据你的浏览器语言设置自动切换，也可以在页面右上角手动切换。',
  },
  {
    q: '如果我有其他问题或遇到问题怎么办？',
    a: '你可以通过以下方式联系我们：在网站底部找到联系邮箱，或通过 X（原 Twitter）私信我们。我们会尽快回复。',
  },
  {
    q: '这个工具和 X 官方有什么关系？',
    a: 'Digital Footprint Health 是独立的第三方工具，与 X（Twitter）公司没有任何关联。我们使用 X 官方的公开 API 来执行用户授权的删除操作。',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-[720px] mx-auto space-y-6">
        <Breadcrumb items={[{ labelKey: 'nav.faq', href: '/faq' }]} />
        <h1 className="t-2 font-bold">常见问题</h1>
        <p className="t-5 text-ink-soft">
          关于数字足迹体检报告、隐私检查与推文删除的常见问题。
        </p>

        <div className="space-y-4">
          {faqs.map(({ q, a }, i) => (
            <details
              key={i}
              className="group rounded-xl2 border border-line bg-surface overflow-hidden"
            >
              <summary className="t-4 font-semibold px-5 py-4 cursor-pointer hover:bg-canvas transition-calm list-none flex items-center justify-between">
                <span>{q}</span>
                <span className="text-ink-soft group-open:rotate-180 transition-transform">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-4 t-5 text-ink-soft leading-relaxed">
                {a}
              </div>
            </details>
          ))}
        </div>

        <AdUnit slot={FAQ_AD_SLOT} minHeight="120px" />
      </div>
    </>
  );
}
