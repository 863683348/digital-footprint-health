import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import type { Lang } from '@/lib/i18n';

const CONTENT: Record<Lang, { title: string; paragraphs: string[]; contact: { label: string; value: string; href: string }[] }> = {
  zh: {
    title: '联系我们',
    paragraphs: [
      '如果你在使用过程中遇到任何问题，或有任何建议，欢迎通过以下方式联系我们。',
      '我们通常会在 1-2 个工作日内回复。',
    ],
    contact: [
      { label: '邮箱', value: 'contact@digital-footprint-health.shop', href: 'mailto:contact@digital-footprint-health.shop' },
    ],
  },
  en: {
    title: 'Contact',
    paragraphs: [
      'If you encounter any issues or have suggestions, please reach out to us through the following channels.',
      'We typically respond within 1-2 business days.',
    ],
    contact: [
      { label: 'Email', value: 'contact@digital-footprint-health.shop', href: 'mailto:contact@digital-footprint-health.shop' },
    ],
  },
};

const METADATA: Record<Lang, Metadata> = {
  zh: {
    title: '联系我们 | 数字足迹体检报告',
    description: '联系我们 — 如有问题、建议或反馈，欢迎通过以下方式联系。',
  },
  en: {
    title: 'Contact | Digital Footprint Health',
    description:
      'Contact Digital Footprint Health — reach us for support, questions, or feedback.',
  },
};

/**
 * Static bilingual page: /contact = zh, /en/contact (catch-all) = en.
 * No request-scoped APIs — pre-rendered at build time, served from CDN.
 */
export function generateMetadata(): Metadata {
  return METADATA.zh;
}

export default function ContactPage({ lang = 'zh' }: { lang?: Lang }) {
  const content = CONTENT[lang];

  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <Breadcrumb items={[{ labelKey: 'nav.contact', href: '/contact' }]} />
      <h1 className="t-2 font-bold">{content.title}</h1>
      <div className="space-y-4">
        {content.paragraphs.map((p) => (
          <p key={p} className="t-5 text-ink-soft leading-relaxed">
            {p}
          </p>
        ))}
      </div>
      <div className="space-y-2 pt-2 border-t border-line">
        {content.contact.map((c) => (
          <div key={c.href}>
            <span className="t-5 font-semibold">{c.label}: </span>
            <a href={c.href} className="t-5 text-primary hover:underline">
              {c.value}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
