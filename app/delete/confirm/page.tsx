'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api, ApiError } from '@/lib/api-client';
import { useI18n } from '@/components/I18nProvider';
import { Button, Card, FeeEstimateCard, Callout } from '@/components/ui';
import { Loading } from '@/components/Loading';
import type { DeleteEstimate } from '@/lib/types';

function ConfirmInner() {
  const router = useRouter();
  const { t, te } = useI18n();
  const search = useSearchParams();
  const archiveId = search.get('archiveId');

  const [estimate, setEstimate] = useState<DeleteEstimate | null>(null);
  const [dryRun, setDryRun] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!archiveId) return;
    api
      .estimate(archiveId)
      .then(setEstimate)
      .catch((e: any) => {
        const err = e instanceof ApiError ? e : new ApiError(e?.message || '', e?.code);
        setError(te(err.code, err.message));
      });
  }, [archiveId, t, te]);

  async function start() {
    if (!archiveId) return;
    setBusy(true);
    try {
      const { jobId } = await api.createJob(archiveId, dryRun);
      router.push(`/delete/progress?jobId=${jobId}`);
    } catch (e: any) {
      const err = e instanceof ApiError ? e : new ApiError(e?.message || '', e?.code);
      setError(te(err.code, err.message) || t('delete.createFail'));
      setBusy(false);
    }
  }

  if (!archiveId) {
    return <Callout tone="warn">{t('delete.confirm.noArchive')}</Callout>;
  }
  if (error) return <Callout tone="danger">{error}</Callout>;
  if (!estimate) return <div className="t-5 text-ink-soft">{t('delete.confirm.calc')}</div>;

  return (
    <div className="max-w-[640px] mx-auto space-y-5">
      <h1 className="t-2 font-bold">{t('delete.confirm.title')}</h1>

      <FeeEstimateCard estimate={estimate} />

      <Card>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={dryRun}
            onChange={(e) => setDryRun(e.target.checked)}
            className="mt-1 h-4 w-4 accent-[var(--color-primary)]"
          />
          <span>
            <span className="t-5 font-semibold">{t('delete.dryrun.title')}</span>
            <span className="block t-6 text-ink-soft">{t('delete.dryrun.desc')}</span>
          </span>
        </label>
      </Card>

      <Callout>{t('delete.confirm.callout')}</Callout>

      <div className="flex justify-end">
        <Button onClick={start} disabled={busy}>
          {busy ? t('delete.creating') : dryRun ? t('delete.start.dryrun') : t('delete.start.real')}
        </Button>
      </div>
    </div>
  );
}

export default function DeleteConfirmPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ConfirmInner />
    </Suspense>
  );
}
