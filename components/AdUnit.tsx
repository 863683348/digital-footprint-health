'use client';

import { useEffect, useRef } from 'react';
import { useI18n } from '@/components/I18nProvider';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;

export interface AdUnitProps {
  /** AdSense ad slot ID (data-ad-slot), provided by your AdSense account. */
  slot: string;
  /**
   * Ad layout format. 'auto' lets AdSense pick the best size for the container;
   * 'fluid' + in-article layout is for native in-article placements.
   */
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal' | 'fluid';
  /** Stretch to full container width on mobile (data-full-width-responsive). */
  responsive?: boolean;
  /** Render the "广告 / Advertisement" disclosure label above the unit. */
  label?: boolean;
  className?: string;
  /** Fixed height for display slots, e.g. '250px'. Omit for responsive auto. */
  height?: string;
  /** Minimum height reserved before the ad loads — reduces layout shift. */
  minHeight?: string;
}

/**
 * Renders a single Google AdSense ad slot.
 *
 * The global AdSense loader script is mounted once in the root layout
 * (see app/layout.tsx). This component only emits the <ins> element and
 * pushes it to window.adsbygoogle after mount. When NEXT_PUBLIC_GOOGLE_
 * ADSENSE_CLIENT is unset (local dev / pre-config), nothing is rendered so
 * pages stay clean and builds never error on a missing publisher id.
 */
export function AdUnit({
  slot,
  format = 'auto',
  responsive = true,
  label = true,
  className = '',
  height,
  minHeight,
}: AdUnitProps) {
  const { t } = useI18n();
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!CLIENT_ID || !insRef.current || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // Ad blocker or loader error — fail silently, keep the page usable.
    }
  }, []);

  if (!CLIENT_ID) return null;

  return (
    <div
      className={`ad-slot rounded-xl2 border border-line bg-surface p-4 ${className}`}
      aria-label={t('ad.label')}
    >
      {label && (
        <div className="text-t-8 uppercase tracking-wider text-ink-soft mb-2">
          {t('ad.label')}
        </div>
      )}
      <ins
        ref={insRef}
        className="adsbygoogle block"
        style={{
          display: 'block',
          ...(height ? { height } : null),
          ...(minHeight ? { minHeight } : null),
        }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
}
