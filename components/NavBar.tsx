'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { useI18n } from '@/components/I18nProvider';
import { useTheme } from '@/components/ThemeProvider';

interface SessionUser {
  sub: string;
  email: string;
  name: string;
  picture?: string;
}

export function NavBar() {
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/session')
      .then((r) => r.json())
      .then((d) => setUser(d.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  async function handleSignout() {
    await fetch('/api/auth/signout', { method: 'POST' });
    setUser(null);
  }
  return (
    <header className="border-b border-line bg-surface">
      <div className="max-w-[1040px] mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 min-w-0">
          <span className="inline-block h-3 w-3 shrink-0 rounded-sm bg-primary" />
          <span className="t-4 font-bold hidden sm:inline truncate">{t('brand')}</span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5 text-t-7 sm:text-t-6 text-ink-soft">
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
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-line text-ink-soft hover:text-ink hover:bg-canvas transition-calm"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? '浅色' : '深色'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {!loading &&
            (user ? (
              <div className="flex items-center gap-2 ml-2">
                <span
                  className="hidden sm:inline text-t-7 text-ink-soft truncate max-w-[120px]"
                  title={user.email}
                >
                  {user.name}
                </span>
                <button
                  type="button"
                  onClick={handleSignout}
                  className="inline-flex h-7 items-center rounded-lg border border-line px-2 text-t-7 text-ink-soft hover:text-ink hover:bg-canvas transition-calm"
                >
                  {t('auth.signout')}
                </button>
              </div>
            ) : (
              <a
                href="/api/auth/google"
                className="ml-2 inline-flex h-7 items-center rounded-lg border border-line px-2 text-t-7 text-ink-soft hover:text-ink hover:bg-canvas transition-calm"
                title={t('auth.withGoogle')}
              >
                {t('auth.signin')}
              </a>
            ))}
        </nav>
      </div>
    </header>
  );
}
