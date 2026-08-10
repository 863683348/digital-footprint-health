'use client';

import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';
import { LangLink } from '@/components/LangLink';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="max-w-[1040px] mx-auto px-4 py-6">
        <nav className="flex flex-wrap gap-x-5 gap-y-2 mb-4 text-t-7 text-ink-soft">
          <LangLink href="/" className="hover:text-ink transition-calm">{t('nav.home')}</LangLink>
          <LangLink href="/upload" className="hover:text-ink transition-calm">{t('nav.upload')}</LangLink>
          <LangLink href="/delete/confirm" className="hover:text-ink transition-calm">{t('nav.delete')}</LangLink>
          <LangLink href="/account" className="hover:text-ink transition-calm">{t('nav.account')}</LangLink>
          <LangLink href="/faq" className="hover:text-ink transition-calm">{t('nav.faq')}</LangLink>
          <LangLink href="/privacy" className="hover:text-ink transition-calm">{t('nav.privacy')}</LangLink>
          <LangLink href="/terms" className="hover:text-ink transition-calm">{t('nav.terms')}</LangLink>
          <LangLink href="/contact" className="hover:text-ink transition-calm">{t('nav.contact')}</LangLink>
          <LangLink href="/about" className="hover:text-ink transition-calm">{t('nav.about')}</LangLink>
        </nav>
        <p className="text-t-7 text-ink-soft">{t('footer.privacy')}</p>
        <p className="mt-1 text-t-7 text-ink-soft">{t('footer.version')}</p>
      </div>
    </footer>
  );
}
