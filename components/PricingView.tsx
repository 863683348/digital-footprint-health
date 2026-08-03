'use client';

import { useI18n } from '@/components/I18nProvider';
import { Card, Badge } from '@/components/ui';
import { WaffoPaymentButton } from '@/components/WaffoPaymentButton';
import { LangLink } from '@/components/LangLink';
import { BILLING_PLANS } from '@/lib/payment';

// Waffo charges in USD. Plan prices in lib/payment.ts are CNY; display the
// same converted amount the checkout will actually charge (1 USD = 7.2 CNY).
const CNY_TO_USD = 1 / 7.2;
const SINGLE = new Set(['single_small', 'single_medium', 'single_large']);

function usd(cny: number): string {
  return (cny * CNY_TO_USD).toFixed(2);
}

export function PricingView() {
  const { t } = useI18n();
  const monthly = BILLING_PLANS.find((p) => p.id === 'pro_monthly');
  const annual = BILLING_PLANS.find((p) => p.id === 'pro_annual');
  const singles = BILLING_PLANS.filter((p) => SINGLE.has(p.id));

  return (
    <div className="max-w-[1000px] mx-auto space-y-12 py-4">
      <div className="text-center space-y-2">
        <h1 className="t-1 font-bold">{t('pricing.title')}</h1>
        <p className="t-5 text-ink-soft">{t('pricing.subtitle')}</p>
      </div>

      {/* Membership tiers */}
      <div className="grid gap-5 sm:grid-cols-3">
        {/* Free */}
        <Card className="flex flex-col">
          <div className="t-4 font-semibold">{t('pricing.free')}</div>
          <div className="mt-3 t-1 font-bold">$0</div>
          <p className="mt-3 t-7 text-ink-soft flex-1">{t('pricing.freeInclude')}</p>
          <LangLink
            href="/upload"
            className="mt-4 inline-flex items-center justify-center rounded-xl2 border border-line px-4 py-2 text-t-5 font-semibold text-ink hover:bg-canvas transition-calm"
          >
            {t('pricing.freeCta')}
          </LangLink>
        </Card>

        {/* Pro Monthly */}
        {monthly && (
          <Card className="flex flex-col border-primary">
            <div className="t-4 font-semibold">{t('plan.pro_monthly.name')}</div>
            <div className="mt-3 t-1 font-bold">
              ${usd(monthly.price)}
              <span className="t-6 font-normal text-ink-soft">{t('pricing.perMonth')}</span>
            </div>
            <p className="mt-3 t-7 text-ink-soft flex-1">{t('pricing.proMonthlyInclude')}</p>
            <div className="mt-4">
              <WaffoPaymentButton usdAmount={usd(monthly.price)} plan="pro_monthly" archiveId="" tweetCount={0} />
            </div>
          </Card>
        )}

        {/* Pro Annual (popular) */}
        {annual && (
          <Card className="flex flex-col border-primary">
            <div className="flex items-center justify-between gap-2">
              <span className="t-4 font-semibold">{t('plan.pro_annual.name')}</span>
              <Badge tone="ok">{t('pricing.popular')}</Badge>
            </div>
            <div className="mt-3 t-1 font-bold">
              ${usd(annual.price)}
              <span className="t-6 font-normal text-ink-soft">{t('pricing.perYear')}</span>
            </div>
            <p className="mt-3 t-7 text-ink-soft flex-1">{t('pricing.proAnnualInclude')}</p>
            <div className="mt-4">
              <WaffoPaymentButton usdAmount={usd(annual.price)} plan="pro_annual" archiveId="" tweetCount={0} />
            </div>
          </Card>
        )}
      </div>

      {/* One-time deletion */}
      <div className="space-y-4">
        <h2 className="t-3 font-bold">{t('pricing.oneTime')}</h2>
        <p className="t-6 text-ink-soft">{t('pricing.oneTimeDesc')}</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {singles.map((p) => (
            <Card key={p.id} className="flex flex-col">
              <div className="t-5 font-semibold">{t(`plan.${p.id}.name`)}</div>
              <div className="mt-1 t-3 font-bold">
                {p.price > 0 ? `$${usd(p.price)}` : t('pricing.usage')}
              </div>
              <p className="mt-2 t-7 text-ink-soft flex-1">{t(`plan.${p.id}.desc`)}</p>
              <LangLink
                href="/delete/confirm"
                className="mt-4 inline-flex items-center justify-center rounded-xl2 border border-line px-4 py-2 text-t-5 font-semibold text-ink hover:bg-canvas transition-calm"
              >
                {t('pricing.startDelete')}
              </LangLink>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
