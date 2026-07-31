'use client';

import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="max-w-[1040px] mx-auto px-4 py-6">
        <nav className="flex flex-wrap gap-x-5 gap-y-2 mb-4 text-t-7 text-ink-soft">
          <Link href="/" className="hover:text-ink transition-calm">{t('nav.home')}</Link>
          <Link href="/upload" className="hover:text-ink transition-calm">{t('nav.upload')}</Link>
          <Link href="/delete/confirm" className="hover:text-ink transition-calm">{t('nav.delete')}</Link>
          <Link href="/blog" className="hover:text-ink transition-calm">{t('nav.blog')}</Link>
          <Link href="/faq" className="hover:text-ink transition-calm">{t('nav.faq')}</Link>
          <Link href="/privacy" className="hover:text-ink transition-calm">{t('nav.privacy')}</Link>
          <Link href="/about" className="hover:text-ink transition-calm">{t('nav.about')}</Link>
        </nav>
        <p className="text-t-7 text-ink-soft">{t('footer.privacy')}</p>
        <p className="mt-1 text-t-7 text-ink-soft">{t('footer.version')}</p>
      </div>
    </footer>
  );
}
