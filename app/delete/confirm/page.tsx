'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadArchive, saveSim } from '@/lib/store';
import { estimateDelete } from '@/lib/payment';
import { simulateDeletion } from '@/lib/delete-sim';
import { useI18n } from '@/components/I18nProvider';
import { Button, Card, FeeEstimateCard, Callout } from '@/components/ui';
import { Loading } from '@/components/Loading';
import { PayPalPaymentButton } from '@/components/PayPalPaymentButton';
import type { ArchiveData, DeleteEstimate, BillingPlan } from '@/lib/types';

const CNY_TO_USD_RATE = 1 / 7.2;

function ConfirmInner() {
  const router = useRouter();
  const { t } = useI18n();
  const search = useSearchParams();
  const archiveId = search.get('archiveId');
  const wasCanceled = search.get('canceled') === '1';

  // undefined = loading, null = not found
  const [archive, setArchive] = useState<ArchiveData | null | undefined>(undefined);
  const [estimate, setEstimate] = useState<DeleteEstimate | null>(null);
  const [dryRun, setDryRun] = useState(true);
  const [busy, setBusy] = useState(false);
  const [paid, setPaid] = useState(false);

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

  function startDryRun() {
    if (!archive) return;
    setBusy(true);
    const result = simulateDeletion(archive.tweets, { dryRun: true });
    saveSim(archive.id, result);
    router.push(`/delete/progress?archiveId=${archive.id}`);
  }

  function handlePaid(_orderId: string, _captureId: string) {
    setPaid(true);
    if (!archive) return;
    // After successful payment, proceed to real deletion.
    const result = simulateDeletion(archive.tweets, { dryRun: false });
    saveSim(archive.id, result);
    router.push(`/delete/progress?archiveId=${archive.id}&paid=1`);
  }

  if (archive === undefined) return <div className="t-5 text-ink-soft">{t('delete.confirm.calc')}</div>;
  if (!archiveId || archive === null) return <Callout tone="warn">{t('delete.confirm.noArchive')}</Callout>;
  if (!estimate) return <div className="t-5 text-ink-soft">{t('delete.confirm.calc')}</div>;

  // Determine billing plan from estimate tier.
  const plan: BillingPlan['id'] =
    estimate.tier === 'large' ? 'single_large' :
    estimate.tier === 'medium' ? 'single_medium' :
    'single_small';

  const usdAmount = (estimate.total * CNY_TO_USD_RATE).toFixed(2);

  return (
    <div className="max-w-[640px] mx-auto space-y-5">
      <h1 className="t-2 font-bold">{t('delete.confirm.title')}</h1>

      {wasCanceled && (
        <Callout tone="warn">{t('pay.canceled')}</Callout>
      )}

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

      {dryRun ? (
        <>
          <div className="t-5 text-ink-soft">{t('pay.dryrun.free')}</div>
          <div className="flex justify-end">
            <Button className="w-full sm:w-auto" onClick={startDryRun} disabled={busy}>
              {busy ? t('delete.creating') : t('delete.start.dryrun')}
            </Button>
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-line">
            <div>
              <div className="t-5 font-semibold">{t('pay.amount')}</div>
              <div className="t-6 text-ink-soft">
                {t('pay.usd.equivalent', { usd: usdAmount })}
              </div>
            </div>
            <div className="t-3 font-bold">${usdAmount}</div>
          </div>

          {!paid && (
            <PayPalPaymentButton
              usdAmount={usdAmount}
              plan={plan}
              archiveId={archive.id}
              tweetCount={archive.rowCount}
              onPaid={handlePaid}
            />
          )}
        </div>
      )}
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
