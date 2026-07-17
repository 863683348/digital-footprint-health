'use client';

import { useI18n } from '@/components/I18nProvider';
import type { DeleteEstimate, RiskFlag as RiskFlagType } from '@/lib/types';

type ButtonVariant = 'primary' | 'ghost' | 'danger';

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: { variant?: ButtonVariant } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl2 px-4 py-2 text-t-5 font-semibold transition-calm disabled:opacity-50 disabled:cursor-not-allowed';
  const styles =
    variant === 'primary'
      ? 'bg-primary text-white hover:brightness-95'
      : variant === 'danger'
        ? 'bg-danger text-white hover:brightness-95'
        : 'bg-surface text-ink border border-line hover:bg-canvas';
  return (
    <button className={`${base} ${styles} ${className}`} {...props} />
  );
}

export function Card({ className = '', children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={`bg-surface border border-line rounded-xl2 shadow-card p-5 ${className}`}>
      {children}
    </div>
  );
}

export function Badge({
  tone = 'ok',
  children,
}: { tone?: 'ok' | 'warn' | 'danger'; children: React.ReactNode }) {
  const m =
    tone === 'ok'
      ? 'bg-ok-weak risk-ok'
      : tone === 'warn'
        ? 'bg-warn-weak risk-warn'
        : 'bg-danger-weak risk-danger';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-t-8 font-semibold ${m}`}>
      {children}
    </span>
  );
}

export function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full rounded-full bg-line overflow-hidden">
      <div className="h-full bg-primary transition-calm" style={{ width: `${v}%` }} />
    </div>
  );
}

export function RiskFlag({
  severity,
  label = '',
}: {
  severity: RiskFlagType['severity'];
  label?: string;
}) {
  const c = severity === 'danger' ? 'risk-danger' : 'risk-warn';
  const bg = severity === 'danger' ? 'bg-danger-weak' : 'bg-warn-weak';
  return (
    <li className={`flex items-start gap-2 rounded-lg px-3 py-2 ${bg}`}>
      <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${severity === 'danger' ? 'bg-danger' : 'bg-warn'}`} />
      <span className={`text-t-6 ${c}`}>{label}</span>
    </li>
  );
}

export function FeeEstimateCard({ estimate }: { estimate: DeleteEstimate }) {
  const { t } = useI18n();
  const tierName = t(`fee.tier.${estimate.tier}`);
  return (
    <Card>
      <div className="t-4 font-semibold mb-3">{t('fee.title')}</div>
      <div className="flex items-end justify-between mb-4">
        <div>
          <div className="text-t-8 text-ink-soft">{t('fee.tier')}</div>
          <div className="t-3 font-semibold">{tierName}</div>
        </div>
        <div className="text-right">
          <div className="text-t-8 text-ink-soft">{t('fee.total')}</div>
          <div className="t-1 mono">¥{estimate.total.toFixed(2)}</div>
        </div>
      </div>
      <dl className="text-t-6 space-y-1 text-ink-soft">
        <div className="flex justify-between">
          <dt>{t('fee.base')}</dt>
          <dd className="mono">¥{estimate.baseFee.toFixed(2)}</dd>
        </div>
        {estimate.perTweetFee > 0 && (
          <div className="flex justify-between">
            <dt>{t('fee.pertweet', { count: estimate.tweetCount, rate: estimate.perTweetFee })}</dt>
            <dd className="mono">¥{(estimate.perTweetFee * estimate.tweetCount).toFixed(2)}</dd>
          </div>
        )}
        <div className="flex justify-between">
          <dt>{t('fee.rate')}</dt>
          <dd className="mono">¥{estimate.ratePerTweet}/条</dd>
        </div>
      </dl>
    </Card>
  );
}

export function Callout({
  tone = 'info',
  children,
}: { tone?: 'info' | 'warn' | 'danger'; children: React.ReactNode }) {
  const bg = tone === 'warn' ? 'bg-warn-weak' : tone === 'danger' ? 'bg-danger-weak' : 'bg-primary-weak';
  const c = tone === 'warn' ? 'risk-warn' : tone === 'danger' ? 'risk-danger' : 'text-ink';
  return (
    <div className={`rounded-xl2 px-4 py-3 text-t-6 ${bg} ${c}`}>{children}</div>
  );
}
