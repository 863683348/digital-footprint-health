'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loadArchive, saveSim } from '@/lib/store';
import { estimateDelete } from '@/lib/payment';
import { simulateDeletion } from '@/lib/delete-sim';
import { useI18n } from '@/components/I18nProvider';
import { Button, Card, FeeEstimateCard, Callout } from '@/components/ui';
import { Loading } from '@/components/Loading';
import { WaffoPaymentButton } from '@/components/WaffoPaymentButton';
import type { ArchiveData, DeleteEstimate, BillingPlan } from '@/lib/types';

const CNY_TO_USD_RATE = 1 / 7.2;

function ConfirmInner() {
  const router = useRouter();
  const { t } = useI18n();
  const search = useSearchParams();
  const archiveId = search.get('archiveId');
  const wasCanceled = search.get('canceled') === '1';
  const waffoReturn = search.get('waffo') === 'return';
  const returnOrderId = search.get('orderId');

  // undefined = loading, null = not found
  const [archive, setArchive] = useState<ArchiveData | null | undefined>(undefined);
  const [estimate, setEstimate] = useState<DeleteEstimate | null>(null);
  // On a Waffo return we are paying for real, so dry-run must be off.
  const [dryRun, setDryRun] = useState(!waffoReturn);
  const [busy, setBusy] = useState(false);
  const [paid, setPaid] = useState(false);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const deletingRef = useRef(false);

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

  // After Waffo redirects back (waffo=return&orderId=...), poll the order
  // status until the webhook marks it paid, then run the real deletion.
  useEffect(() => {
    if (!waffoReturn || !returnOrderId || !archive || deletingRef.current) return;
    let cancelled = false;
    let attempts = 0;
    setConfirming(true);
    const timer = setInterval(async () => {
      attempts += 1;
      try {
        const res = await fetch(`/api/orders?id=${encodeURIComponent(returnOrderId)}`);
        const json = await res.json();
        if (json.ok && json.data?.status === 'paid') {
          clearInterval(timer);
          if (!cancelled) runPaidDeletion();
        } else if (json.ok && json.data?.status === 'failed') {
          clearInterval(timer);
          if (!cancelled) {
            setConfirming(false);
            setConfirmError(t('pay.payFailedStatus'));
          }
        } else if (attempts > 40) {
          clearInterval(timer);
          if (!cancelled) {
            setConfirming(false);
            setConfirmError(t('pay.confirmTimeout'));
          }
        }
      } catch {
        // transient network error — keep polling
      }
    }, 1500);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waffoReturn, returnOrderId, archive]);

  function startDryRun() {
    if (!archive) return;
    setBusy(true);
    const result = simulateDeletion(archive.tweets, { dryRun: true });
    saveSim(archive.id, result);
    router.push(`/delete/progress?archiveId=${archive.id}`);
  }

  function runPaidDeletion() {
    if (!archive || deletingRef.current) return;
    deletingRef.current = true;
    setPaid(true);
    setConfirming(false);
    const result = simulateDeletion(archive.tweets, { dryRun: false });
    saveSim(archive.id, result);
    router.push(`/delete/progress?archiveId=${archive.id}&paid=1`);
  }

  // Waffo uses a top-level redirect; payment success is detected via the
  // return-polling effect above. This callback is kept for API symmetry.
  function handlePaid(_orderId: string) {
    runPaidDeletion();
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
      {confirmError && (
        <Callout tone="danger">{confirmError}</Callout>
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
      ) : confirming ? (
        <div className="t-5 text-ink-soft">{t('pay.confirming')}</div>
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
            <WaffoPaymentButton
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
