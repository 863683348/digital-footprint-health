'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useI18n } from '@/components/I18nProvider';
import { Button } from '@/components/ui';
import { langFromPath, localePath } from '@/lib/locale';
import { LogOut, Link2 } from 'lucide-react';

export function AccountSettings() {
  const { lang, setLang, t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const [busy, setBusy] = useState(false);

  function switchLang(target: 'zh' | 'en') {
    setLang(target);
    router.push(localePath(pathname, target));
  }

  async function handleSignout() {
    setBusy(true);
    try {
      await fetch('/api/auth/signout', { method: 'POST' });
      router.push(localePath(pathname, langFromPath(pathname)));
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4 text-t-6">
      <div className="flex items-center justify-between">
        <span className="text-ink-soft">{t('account.settings.lang')}</span>
        <div className="flex items-center gap-1 text-t-8 select-none">
          <button
            type="button"
            onClick={() => switchLang('zh')}
            className={`rounded-lg px-2 py-1 ${lang === 'zh' ? 'font-bold text-ink bg-canvas' : 'text-ink-soft hover:text-ink'}`}
          >
            中
          </button>
          <span className="text-line">/</span>
          <button
            type="button"
            onClick={() => switchLang('en')}
            className={`rounded-lg px-2 py-1 ${lang === 'en' ? 'font-bold text-ink bg-canvas' : 'text-ink-soft hover:text-ink'}`}
          >
            EN
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-ink-soft">{t('account.settings.bindX')}</span>
        <div className="flex items-center gap-2">
          <span className="t-8 text-ink-soft">{t('account.settings.comingSoon')}</span>
          <Button variant="ghost" disabled className="cursor-not-allowed opacity-60">
            <Link2 size={16} /> {t('account.settings.bindX')}
          </Button>
        </div>
      </div>

      <div className="pt-1">
        <Button variant="danger" onClick={handleSignout} disabled={busy}>
          <LogOut size={16} /> {t('account.settings.signout')}
        </Button>
      </div>
    </div>
  );
}
