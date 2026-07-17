'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Lang, detectLang, translate, translateError } from '@/lib/i18n';

interface I18nCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
  te: (code?: string, fallback?: string) => string;
}

const Ctx = createContext<I18nCtx | null>(null);
const STORAGE_KEY = 'dfh.lang';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh');

  useEffect(() => {
    const saved = (typeof localStorage !== 'undefined' && (localStorage.getItem(STORAGE_KEY) as Lang | null)) || null;
    const initial: Lang = saved ?? detectLang();
    setLangState(initial);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = initial === 'en' ? 'en' : 'zh-CN';
    }
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
