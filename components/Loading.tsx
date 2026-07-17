'use client';

import { useI18n } from '@/components/I18nProvider';

export function Loading() {
  const { t } = useI18n();
  return <div className="t-5 text-ink-soft">{t('progress.loading')}</div>;
}
