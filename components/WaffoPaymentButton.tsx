'use client';

import { useState } from 'react';
import { useI18n } from '@/components/I18nProvider';
import { Button } from '@/components/ui';
import type { BillingPlan } from '@/lib/types';

interface Props {
  usdAmount: string;
  plan: BillingPlan['id'];
  archiveId: string;
  tweetCount: number;
  onPaid?: (orderId: string) => void;
}

/**
 * Starts a Waffo checkout: POST /api/orders → get checkoutUrl → redirect.
 * Payment success is detected on the return URL by the parent page's poller;
 * `onPaid` is kept for API symmetry (not fired in the redirect flow).
 */
export function WaffoPaymentButton({ usdAmount, plan, archiveId, tweetCount, onPaid }: Props) {
  const { t } = useI18n();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePay() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          plan,
          archiveId,
          tweetCount,
          lang: document.documentElement.lang.startsWith('en') ? 'en' : 'zh',
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json?.error?.message || t('pay.waffoNotConfigured'));
        return;
      }
      const { checkoutUrl, orderId } = json.data as { checkoutUrl: string; orderId: string };
      if (onPaid) onPaid(orderId);
      window.location.href = checkoutUrl;
    } catch {
      setError(t('error.default'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-3">
      {error && <p className="t-7 text-danger">{error}</p>}
      <div className="flex justify-end">
        <Button className="w-full sm:w-auto" onClick={handlePay} disabled={busy}>
          {busy ? t('pay.creating') : t('pay.button')}
        </Button>
      </div>
      <p className="t-8 text-ink-soft text-right">${usdAmount} · Waffo</p>
    </div>
  );
}
