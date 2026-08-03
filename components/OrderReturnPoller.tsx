'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

/**
 * After a Waffo redirect back to /account (waffo=return&orderId=...), poll the
 * order status until it leaves 'created', then refresh the server-rendered page
 * so membership / order state appears without a manual reload.
 * Invisible — renders nothing.
 */
export function OrderReturnPoller() {
  const router = useRouter();
  const search = useSearchParams();
  const orderId = search.get('orderId');
  const isReturn = search.get('waffo') === 'return';
  const refreshed = useRef(false);

  useEffect(() => {
    if (!isReturn || !orderId || refreshed.current) return;
    let cancelled = false;
    let attempts = 0;
    const timer = setInterval(async () => {
      attempts += 1;
      try {
        const res = await fetch(`/api/orders?id=${encodeURIComponent(orderId)}`);
        const json = await res.json();
        const status = json?.data?.status as string | undefined;
        if (status && status !== 'created') {
          if (!cancelled) {
            refreshed.current = true;
            router.refresh();
            // Refresh once more shortly after to catch late webhook writes.
            setTimeout(() => {
              if (!cancelled) router.refresh();
            }, 2000);
          }
          clearInterval(timer);
        } else if (attempts > 40) {
          // ~60s: give up; a manual reload still works.
          clearInterval(timer);
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
  }, [isReturn, orderId, router]);

  return null;
}
