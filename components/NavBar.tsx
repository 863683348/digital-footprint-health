'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const isEn = pathname.startsWith('/en');
  const { lang, setLang, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 5000);
    fetch('/api/auth/session', { signal: ctrl.signal })
      .then((r) => r.json())
      .then((d) => setUser(d?.user ?? null))
      .catch(() => setUser(null))
      .finally(() => clearTimeout(timer));
    return () => ctrl.abort();
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
            <Link
              href="/"
              onClick={() => setLang('zh')}
              className={!isEn ? 'font-bold text-ink' : 'text-ink-soft hover:text-ink'}
            >
              中
            </Link>
            <span className="text-line">/</span>
            <Link
              href="/en"
              onClick={() => setLang('en')}
              className={isEn ? 'font-bold text-ink' : 'text-ink-soft hover:text-ink'}
            >
              EN
            </Link>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-line text-ink-soft hover:text-ink hover:bg-canvas transition-calm"
            aria-label={theme === 'dark' ? t('theme.toggle.light') : t('theme.toggle.dark')}
            title={theme === 'dark' ? t('theme.toggle.light') : t('theme.toggle.dark')}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {user ? (
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
            )}
        </nav>
      </div>
    </header>
  );
}
