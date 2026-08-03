'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Lang, detectLang, translate, translateError } from '@/lib/i18n';

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  te: (code?: string, fallback?: string) => string;
}

const Ctx = createContext<I18nCtx | null>(null);
const STORAGE_KEY = 'dfh.lang';

function langFromRoute(pathname: string): Lang {
  return pathname.startsWith('/en') ? 'en' : 'zh';
}

/**
 * Language is bound to the route: /en* → en, anything else → zh.
 * - NavBar's 中/EN clicks call setLang() (persists preference) AND navigate,
 *   so route + state stay in sync.
 * - localStorage only seeds the very first render as a fallback for
 *   first-time visitors; after that the route is authoritative.
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const routeLang = langFromRoute(pathname);

  // Seed once from localStorage / browser, then the route takes over.
  const [lang, setLangState] = useState<Lang>(routeLang);

  // Adjust state during render when the route changes (no effect cascade).
  const [prevRoute, setPrevRoute] = useState<Lang>(routeLang);
  if (prevRoute !== routeLang) {
    setPrevRoute(routeLang);
    setLangState(routeLang);
  }

  useEffect(() => {
    // Only for the very first client render on a non-/en route: fall back to
    // the browser language so a fresh English visitor gets a usable page.
    // localStorage is an external system — reading it here is the documented
    // pattern (useState initializers would crash during SSR).
    if (routeLang === 'zh' && typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- external storage read
      if (saved === 'en') setLangState('en');
      else if (!saved && detectLang() === 'en') setLangState('en');
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = routeLang === 'en' ? 'en' : 'zh-CN';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, l);
    if (typeof document !== 'undefined') document.documentElement.lang = l === 'en' ? 'en' : 'zh-CN';
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars),
    [lang],
  );
  const te = useCallback(
    (code?: string, fallback?: string) => translateError(lang, code, fallback),
    [lang],
  );

  return <Ctx.Provider value={{ lang, setLang, t, te }}>{children}</Ctx.Provider>;
}

export function useI18n(): I18nCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useI18n must be used within I18nProvider');
  return c;
}
