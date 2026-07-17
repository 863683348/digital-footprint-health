'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadArchive, saveSim } from '@/lib/store';
import { estimateDelete } from '@/lib/payment';
import { simulateDeletion } from '@/lib/delete-sim';
import { useI18n } from '@/components/I18nProvider';
import { Button, Card, FeeEstimateCard, Callout } from '@/components/ui';
import { Loading } from '@/components/Loading';
import type { ArchiveData, DeleteEstimate } from '@/lib/types';

function ConfirmInner() {
  const router = useRouter();
  const { t } = useI18n();
  const search = useSearchParams();
  const archiveId = search.get('archiveId');

  // undefined = loading, null = not found
  const [archive, setArchive] = useState<ArchiveData | null | undefined>(undefined);
  const [estimate, setEstimate] = useState<DeleteEstimate | null>(null);
  const [dryRun, setDryRun] = useState(true);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!archiveId) {
      setArchive(null);
      return;
    }
    setArchive(loadArchive(archiveId));
  }, [archiveId]);

  useEffect(() => {
    if (!archive) return;
    setEstimate(estimateDelete(archive.rowCount));
  }, [archive]);

  function start() {
    if (!archive) return;
    setBusy(true);
    // Dry-run simulation is pure compute — no server, no X API, no charge.
    const result = simulateDeletion(archive.tweets, { dryRun });
    saveSim(archive.id, result);
    router.push(`/delete/progress?archiveId=${archive.id}`);
  }

  if (archive === undefined) return <div className="t-5 text-ink-soft">{t('delete.confirm.calc')}</div>;
  if (!archiveId || archive === null) return <Callout tone="warn">{t('delete.confirm.noArchive')}</Callout>;
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
