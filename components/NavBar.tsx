'use client';

import Link from 'next/link';
import { useI18n } from '@/components/I18nProvider';

export function NavBar() {
  const { lang, setLang, t } = useI18n();
  return (
    <header className="border-b border-line bg-surface">
      <div className="max-w-[1040px] mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-sm bg-primary" />
          <span className="t-4 font-bold">{t('brand')}</span>
        </Link>
        <nav className="flex items-center gap-5 text-t-6 text-ink-soft">
          <Link href="/" className="hover:text-ink transition-calm">
            {t('nav.home')}
          </Link>
          <Link href="/upload" className="hover:text-ink transition-calm">
            {t('nav.upload')}
          </Link>
          <Link href="/delete/confirm" className="hover:text-ink transition-calm">
            {t('nav.delete')}
          </Link>
          <div className="flex items-center gap-1 ml-2 text-t-8 select-none">
            <button
              type="button"
              onClick={() => setLang('zh')}
              className={lang === 'zh' ? 'font-bold text-ink' : 'text-ink-soft hover:text-ink'}
              aria-pressed={lang === 'zh'}
            >
              中
            </button>
            <span className="text-line">/</span>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={lang === 'en' ? 'font-bold text-ink' : 'text-ink-soft hover:text-ink'}
              aria-pressed={lang === 'en'}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
