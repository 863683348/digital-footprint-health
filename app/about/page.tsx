import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import type { Lang } from '@/lib/i18n';

const CONTENT: Record<Lang, { title: string; paragraphs: string[]; contact?: { label: string; value: string; href: string }[] }> = {
  zh: {
    title: '关于我们',
    paragraphs: [
      'Digital Footprint Health（数字足迹体检报告）是一款专注于 X/Twitter 平台隐私保护的工具。',
      '我们的使命是帮助每一位用户在社交媒体上管理好自己的数字足迹，让个人隐私不再因无意间分享的信息而暴露。',
      '所有体检报告均在浏览器本地生成，不依赖任何服务端处理，确保你的数据始终掌控在你手中。',
    ],
    contact: [
      { label: '邮箱', value: 'contact@digital-footprint-health.shop', href: 'mailto:contact@digital-footprint-health.shop' },
    ],
  },
  en: {
    title: 'About',
    paragraphs: [
      'Digital Footprint Health is a privacy-protection tool focused on the X/Twitter platform.',
      'Our mission is to help every user manage their digital footprint on social media, so personal privacy is no longer exposed by information shared unintentionally.',
      'All health reports are generated locally in your browser — no server-side processing is involved — ensuring your data stays in your control.',
    ],
    contact: [
      { label: 'Email', value: 'contact@digital-footprint-health.shop', href: 'mailto:contact@digital-footprint-health.shop' },
    ],
  },
};

const METADATA: Record<Lang, Metadata> = {
  zh: {
    title: '关于我们 | 数字足迹体检报告',
    description: '关于数字足迹体检报告 — 我们帮助你在 X/Twitter 上保护隐私的使命。',
  },
  en: {
    title: 'About | Digital Footprint Health',
    description:
      'About Digital Footprint Health — our mission to help you protect your privacy on X/Twitter.',
  },
};

/**
 * Static bilingual page. /about serves Chinese (default), /en/about is served
 * by the /en catch-all which passes lang="en". No request-scoped APIs — the
 * page pre-renders at build time, so repeated visits hit Vercel's CDN
 * (no origin FOT). The client I18nProvider keeps the interactive chrome
 * (nav/footer/breadcrumb) in sync with the route on hydration.
 */
export function generateMetadata(): Metadata {
  return METADATA.zh;
}

export default function AboutPage({ lang = 'zh' }: { lang?: Lang }) {
  const content = CONTENT[lang];

  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <Breadcrumb items={[{ labelKey: 'nav.about', href: '/about' }]} />
      <h1 className="t-2 font-bold">{content.title}</h1>
      <div className="space-y-4">
        {content.paragraphs.map((p) => (
          <p key={p} className="t-5 text-ink-soft leading-relaxed">
            {p}
          </p>
        ))}
      </div>
      {content.contact && (
        <div className="space-y-2 pt-2 border-t border-line">
          <p className="t-5 font-semibold">Contact</p>
          {content.contact.map((c) => (
            <a key={c.href} href={c.href} className="t-5 text-primary hover:underline">
              {c.label}: {c.value}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
