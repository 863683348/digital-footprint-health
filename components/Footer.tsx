'use client';

import { useI18n } from '@/components/I18nProvider';

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-line bg-surface">
      <div className="max-w-[1040px] mx-auto px-4 py-6 text-t-7 text-ink-soft">
        <p>{t('footer.privacy')}</p>
        <p className="mt-1">{t('footer.version')}</p>
      </div>
    </footer>
  );
}
