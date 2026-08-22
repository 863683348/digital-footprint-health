import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import type { Lang } from '@/lib/i18n';

// Static bilingual legal page: /terms = zh, /en/terms (catch-all) = en.
// No request-scoped APIs — pre-rendered at build time, served from CDN.
interface TermsSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

const CONTENT: Record<Lang, { title: string; updated: string; sections: TermsSection[] }> = {
  zh: {
    title: '服务条款',
    updated: '最后更新：2026 年 7 月 27 日',
    sections: [
      {
        heading: '1. 条款的接受',
        paragraphs: [
          '访问或使用 Digital Footprint Health（数字足迹体检报告，以下简称"本服务"）即表示你同意受本服务条款约束。如果你不同意本条款，请勿使用本服务。',
        ],
      },
      {
        heading: '2. 服务描述',
        paragraphs: [
          '本服务是一款隐私保护工具，帮助你分析并清理在 X（原 Twitter）平台上留下的个人数据。你上传的 X 归档文件仅在你本机浏览器中解析，我们不会将其上传至任何服务器。',
        ],
      },
      {
        heading: '3. 付费删除',
        paragraphs: [
          '删除推文为付费功能，通过 Waffo 处理支付。删除操作仅在你明确确认并支付费用后，通过 X 的官方写接口执行。费用一经支付通常不可退款，因为删除请求会立即提交至 X。',
        ],
      },
      {
        heading: '4. 用户责任',
        list: [
          '你须对自己的 X 账户及在本服务中的操作负责。',
          '你不得利用本服务从事任何违法、滥用或违反 X 平台规则的行为。',
          '你确认拥有对自己 X 数据的处理权限，并已了解删除操作的不可逆性。',
        ],
      },
      {
        heading: '5. 免责声明',
        paragraphs: [
          '本服务按"现状"提供，不对其可用性、准确性或适用性作出任何明示或暗示的担保。X 平台接口的变动、限流或政策调整可能影响删除功能的执行效果，我们不对此类外部因素导致的失败承担责任。',
        ],
      },
      {
        heading: '6. 责任限制',
        paragraphs: [
          '在法律允许的最大范围内，对于因使用或无法使用本服务而产生的任何间接、偶然或后果性损害，本服务运营方不承担责任。我们的总赔偿责任不超过你为使用本服务所支付的费用。',
        ],
      },
      {
        heading: '7. 知识产权',
        paragraphs: [
          '本服务的界面、文案、代码及相关内容归运营方所有，受著作权法保护。你不得复制、修改或再分发本服务的任何部分。',
        ],
      },
      {
        heading: '8. 条款变更',
        paragraphs: [
          '我们可能不时更新本服务条款。重大变更将通过网站通知或电子邮件（如已注册）告知。更新后继续使用本服务即视为接受修订后的条款。',
        ],
      },
    ],
  },
  en: {
    title: 'Terms of Service',
    updated: 'Last updated: July 27, 2026',
    sections: [
      {
        heading: '1. Acceptance of These Terms',
        paragraphs: [
          'By accessing or using Digital Footprint Health (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.',
        ],
      },
      {
        heading: '2. Description of the Service',
        paragraphs: [
          'The Service is a privacy-protection tool that helps you analyze and clean up the personal data you have left on X (formerly Twitter). The X archive you upload is parsed entirely in your own browser, on your own device; we never upload it to any server.',
        ],
      },
      {
        heading: '3. Paid Deletion',
        paragraphs: [
          'Deleting tweets is a paid feature, with payments processed through Waffo. Deletion runs through X\u2019s official write API only after you explicitly confirm and pay for it. Fees are generally non-refundable once paid, because deletion requests are submitted to X immediately.',
        ],
      },
      {
        heading: '4. Your Responsibilities',
        list: [
          'You are responsible for your own X account and for your use of the Service.',
          'You must not use the Service for any unlawful, abusive, or platform-violating activity.',
          'You confirm that you have the right to process your own X data and that you understand deletion is irreversible.',
        ],
      },
      {
        heading: '5. Disclaimer',
        paragraphs: [
          'The Service is provided "as is", without any express or implied warranty of availability, accuracy, or fitness for a particular purpose. Changes, rate limits, or policy updates to X\u2019s platform may affect how deletion performs; we are not liable for failures caused by such external factors.',
        ],
      },
      {
        heading: '6. Limitation of Liability',
        paragraphs: [
          'To the maximum extent permitted by law, the operator of the Service is not liable for any indirect, incidental, or consequential damages arising from your use of, or inability to use, the Service. Our total liability shall not exceed the amount you paid to use the Service.',
        ],
      },
      {
        heading: '7. Intellectual Property',
        paragraphs: [
          'The Service\u2019s interface, copy, code, and related content belong to the operator and are protected by copyright law. You may not copy, modify, or redistribute any part of the Service.',
        ],
      },
      {
        heading: '8. Changes to These Terms',
        paragraphs: [
          'We may update these Terms of Service from time to time. Material changes will be announced on the website or by email (if you have registered). Continuing to use the Service after an update constitutes acceptance of the revised terms.',
        ],
      },
    ],
  },
};

const METADATA: Record<Lang, Metadata> = {
  zh: {
    title: '服务条款 | 数字足迹体检报告',
    description: 'Digital Footprint Health 服务条款：使用本服务的条件、付费删除规则与责任限制。',
    alternates: { canonical: '/terms' },
    openGraph: {
      title: '服务条款 | 数字足迹体检报告',
      description: '使用本服务的条件、付费删除规则与责任限制。',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    },
  },
  en: {
    title: 'Terms of Service | Digital Footprint Health',
    description:
      'Terms of Service for Digital Footprint Health: conditions of use, paid-deletion rules, and limitation of liability.',
    alternates: { canonical: '/terms' },
    openGraph: {
      title: 'Terms of Service | Digital Footprint Health',
      description: 'Conditions of use, paid-deletion rules, and limitation of liability.',
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    },
  },
};

export function generateMetadata(): Metadata {
  return METADATA.zh;
}

export default function TermsPage({ lang = 'zh' }: { lang?: Lang }) {
  const content = CONTENT[lang];

  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <Breadcrumb items={[{ labelKey: 'nav.terms', href: '/terms' }]} />
      <h1 className="t-2 font-bold">{content.title}</h1>
      <p className="t-6 text-ink-soft">{content.updated}</p>

      {content.sections.map((section) => (
        <section key={section.heading} className="space-y-4">
          <h2 className="t-4 font-semibold">{section.heading}</h2>
          {section.paragraphs?.map((p) => (
            <p key={p} className="t-5 text-ink-soft">
              {p}
            </p>
          ))}
          {section.list && (
            <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
              {section.list.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
