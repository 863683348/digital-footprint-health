'use client';

import Link from 'next/link';
import { Card } from '@/components/ui';
import { useI18n } from '@/components/I18nProvider';
import { SITE_URL } from '@/lib/site';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Digital Footprint Health Report',
  alternateName: '数字足迹体检报告',
  url: SITE_URL,
  description:
    'Upload your X/Twitter archive and generate a local privacy health report that flags risky tweets (phone, email, location, sensitive topics), with on-demand batch deletion.',
  applicationCategory: 'PrivacyApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
  },
  inLanguage: ['zh-CN', 'en'],
};

const STEPS = [
  { n: '1', titleKey: 'landing.step1.title', descKey: 'landing.step1.desc' },
  { n: '2', titleKey: 'landing.step2.title', descKey: 'landing.step2.desc' },
  { n: '3', titleKey: 'landing.step3.title', descKey: 'landing.step3.desc' },
];

export default function HomePage() {
  const { t } = useI18n();
  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <section className="pt-6">
        <h1 className="t-1 max-w-[18ch]">{t('landing.hero.title')}</h1>
        <p className="t-4 text-ink-soft mt-3 max-w-[60ch]">{t('landing.hero.desc')}</p>
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href="/upload"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl2 px-5 py-2.5 t-5 font-semibold bg-primary text-white hover:brightness-95 transition-calm"
          >
            {t('landing.cta.start')}
          </Link>
          <Link
            href="/delete/confirm"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl2 px-5 py-2.5 t-5 font-semibold bg-surface text-ink border border-line hover:bg-canvas transition-calm"
          >
            {t('landing.cta.delete')}
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {STEPS.map((s) => (
          <Card key={s.n}>
            <div className="h-8 w-8 rounded-full bg-primary-weak text-primary font-bold flex items-center justify-center mono">
              {s.n}
            </div>
            <h3 className="t-4 font-semibold mt-3">{t(s.titleKey)}</h3>
            <p className="t-6 text-ink-soft mt-1.5">{t(s.descKey)}</p>
          </Card>
        ))}
      </section>

      <section>
        <Card className="border-primary-weak bg-primary-weak">
          <div className="t-4 font-semibold">{t('landing.trust.title')}</div>
          <ul className="mt-2 space-y-1.5 text-t-6 text-ink-soft list-disc list-inside">
            <li>{t('landing.trust.1')}</li>
            <li>{t('landing.trust.2')}</li>
            <li>{t('landing.trust.3')}</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
