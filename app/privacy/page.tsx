import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Breadcrumb } from '@/components/Breadcrumb';
import type { Lang } from '@/lib/i18n';

async function resolveLocale(): Promise<Lang> {
  const h = await headers();
  return h.get('x-locale') === 'en' ? 'en' : 'zh';
}

const CONTENT: Record<Lang, { title: string; sections: { heading: string; paragraphs?: string[]; list?: string[] }[] }> = {
  zh: {
    title: '隐私政策',
    sections: [
      {
        heading: '1. 我们收集的信息',
        paragraphs: [
          '我们不会收集你上传的归档文件内容。体检报告完全在浏览器本地生成。',
          '如果你使用付费删除功能，我们会通过支付服务提供商（Waffo）记录订单信息，包括邮箱、订单号、金额和状态，用于售后服务。',
        ],
      },
      {
        heading: '2. 信息的使用方式',
        paragraphs: [
          '我们仅将订单信息用于处理支付、发送订单确认和售后服务，不会将你的邮箱用于营销推广。',
          '体检报告文件在浏览器本地生成，不会上传至服务器。',
        ],
      },
      {
        heading: '3. 信息的存储与安全',
        paragraphs: [
          '订单信息存储在 Neon Postgres 数据库中，采用加密传输和访问控制。',
          '归档文件仅在用户设备浏览器中解析，我们不会在服务器上存储你的推文内容。',
        ],
      },
      {
        heading: '4. 第三方服务',
        list: [
          'Waffo：处理付费删除订单的支付服务，详见 https://waffo.co/privacy。',
          'Neon：数据库提供商，详见 https://neon.com/privacy。',
          'Vercel：托管服务，详见 https://vercel.com/legal/privacy-policy。',
        ],
      },
      {
        heading: '5. Cookie 与跟踪',
        paragraphs: [
          '我们使用 Google Analytics（G-5NWEFJTMBZ）统计网站访问数据，这些数据已脱敏，不包含个人信息。',
          '你可以选择拒绝 Cookie，但这可能影响部分功能的使用。',
        ],
      },
      {
        heading: '6. 你的权利',
        paragraphs: [
          '你有权随时联系我们删除你的订单记录。',
          '如需导出或删除个人信息，请发送邮件至 our@email.com。',
        ],
      },
      {
        heading: '7. 政策更新',
        paragraphs: ['我们可能会不时更新本隐私政策。更新后的政策将在本页面发布。'],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: '1. Information We Collect',
        paragraphs: [
          'We do not collect the contents of the archive files you upload. The health report is generated entirely in your browser locally.',
          'If you use the paid deletion feature, we record order information through our payment provider (Waffo), including email, order ID, amount, and status, for after-sales service purposes.',
        ],
      },
      {
        heading: '2. How We Use Your Information',
        paragraphs: [
          'We use order information solely for processing payments, sending order confirmations, and providing after-sales support. We will not use your email for marketing purposes.',
          'The health report file is generated locally in your browser and is never uploaded to any server.',
        ],
      },
      {
        heading: '3. Data Storage & Security',
        paragraphs: [
          'Order information is stored in Neon Postgres with encrypted transmission and access controls.',
          'Archive files are parsed only in the user\'s browser — we never store your tweet content on any server.',
        ],
      },
      {
        heading: '4. Third-Party Services',
        list: [
          'Waffo: Payment processor for deletion orders. See https://waffo.co/privacy.',
          'Neon: Database provider. See https://neon.com/privacy.',
          'Vercel: Hosting provider. See https://vercel.com/legal/privacy-policy.',
        ],
      },
      {
        heading: '5. Cookies & Tracking',
        paragraphs: [
          'We use Google Analytics (G-5NWEFJTMBZ) to collect anonymized website traffic data. This data does not contain personal information.',
          'You may choose to reject cookies, though this may affect some functionality.',
        ],
      },
      {
        heading: '6. Your Rights',
        paragraphs: [
          'You may contact us at any time to request deletion of your order records.',
          'To export or delete personal information, please email us at our@email.com.',
        ],
      },
      {
        heading: '7. Policy Updates',
        paragraphs: ['We may update this privacy policy from time to time. Updates will be posted on this page.'],
      },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  return {
    title: `${CONTENT[locale].title} | Digital Footprint Health`,
    description:
      locale === 'en'
        ? 'Privacy Policy for Digital Footprint Health — how we handle your archive files, order data, and cookies.'
        : '数字足迹体检报告隐私政策 — 关于归档文件、订单数据和 Cookie 的处理方式。',
  };
}

export default async function PrivacyPage() {
  const locale = await resolveLocale();
  const content = CONTENT[locale];

  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <Breadcrumb items={[{ labelKey: 'nav.privacy', href: '/privacy' }]} />
      <h1 className="t-2 font-bold">{content.title}</h1>
      {content.sections.map((section) => (
        <section key={section.heading} className="space-y-4">
          <h2 className="t-4 font-semibold">{section.heading}</h2>
          {section.paragraphs?.map((p) => (
            <p key={p} className="t-5 text-ink-soft leading-relaxed">
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
