'use client';

import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useI18n } from '@/components/I18nProvider';
import { Callout } from '@/components/ui';

interface PayPalPaymentButtonProps {
  /** Amount in USD, e.g. '4.03'. */
  usdAmount: string;
  /** Billing plan id, used to create the order. */
  plan: 'free' | 'single_small' | 'single_medium' | 'single_large' | 'pro_monthly' | 'pro_annual';
  /** Archive id from the confirm page. */
  archiveId: string;
  /** Number of tweets this order covers. */
  tweetCount: number;
  /** Called after successful payment — host proceeds to deletion. */
  onPaid: (orderId: string, captureId: string) => void;
  /** PayPal client id — exposed to the browser (safe, it's a public id). */
  clientId?: string;
}

type Phase = 'idle' | 'creating' | 'approving' | 'capturing' | 'done' | 'error';

export function PayPalPaymentButton({
  usdAmount: _usdAmount,
  plan,
  archiveId,
  tweetCount,
  onPaid,
  clientId,
}: PayPalPaymentButtonProps) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>('idle');
  const [error, setError] = useState<string | null>(null);
  // Internal order id returned by our /api/orders — needed to call capture.
  const [internalOrderId, setInternalOrderId] = useState<string | null>(null);

  const pubClientId =
    clientId ?? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';

  if (!pubClientId) {
    return (
      <Callout tone="warn">
        {t('pay.paypalNotConfigured')}
      </Callout>
    );
  }

  const phaseLabel: Record<Phase, string> = {
    idle: '',
    creating: t('pay.creating'),
    approving: t('pay.approving'),
    capturing: t('pay.capturing'),
    done: t('pay.success'),
    error: '',
  };

  return (
    <PayPalScriptProvider
      options={{
        clientId: pubClientId,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <div className="space-y-3">
        {phase !== 'done' && phase !== 'error' && phase !== 'idle' && (
          <div className="t-5 text-ink-soft">{phaseLabel[phase]}</div>
        )}

        {error && (
          <Callout tone="danger">
            {t('pay.failed', { reason: error })}
          </Callout>
        )}

        {phase !== 'done' && (
          <PayPalButtons
            style={{ layout: 'vertical', color: 'black', shape: 'rect', label: 'pay' }}
            disabled={phase !== 'idle' && phase !== 'approving'}
            // createOrder: call our server to create a PayPal order, return
            // the PayPal order id so the SDK can open the approval popup.
            createOrder={async () => {
              setPhase('creating');
              setError(null);
              try {
                const res = await fetch('/api/orders', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ plan, archiveId, tweetCount }),
                });
                const json = await res.json();
                if (!json.ok) {
                  throw new Error(json.error?.message ?? 'createOrder failed');
                }
                const { orderId, paypalOrderId } = json.data;
                setInternalOrderId(orderId);
                setPhase('approving');
                return paypalOrderId as string;
              } catch (e) {
                setPhase('error');
                setError((e as Error).message);
                throw e;
              }
            }}
            // onApprove: buyer approved in the PayPal popup. Call our capture
            // endpoint with the INTERNAL order id to finalize the payment.
            onApprove={async (data) => {
              setPhase('capturing');
              setError(null);
              try {
                const captureId = internalOrderId ?? data.orderID;
                const res = await fetch(`/api/orders/${captureId}/capture`, {
                  method: 'POST',
                });
                const json = await res.json();
                if (!json.ok) {
                  throw new Error(json.error?.message ?? 'capture failed');
                }
                setPhase('done');
                onPaid(json.data.id, json.data.captureId);
              } catch (e) {
                setPhase('error');
                setError((e as Error).message);
              }
            }}
            onError={(err) => {
              setPhase('error');
              const msg = err instanceof Error ? err.message : 'PayPal error';
              setError(msg);
            }}
            onCancel={() => {
              setPhase('idle');
              setInternalOrderId(null);
            }}
          />
        )}

        {phase === 'done' && (
          <Callout tone="info">{t('pay.success')}</Callout>
        )}
      </div>
    </PayPalScriptProvider>
  );
}
