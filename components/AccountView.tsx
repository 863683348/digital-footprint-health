import { cookies } from 'next/headers';
import { User, Crown, CreditCard, CalendarDays, ArrowUpRight, Receipt } from 'lucide-react';
import { parseSession, SESSION_COOKIE, SessionUser } from '@/lib/session';
import { listUserOrders, findPlan } from '@/lib/order';
import { translate, Lang } from '@/lib/i18n';
import { Card, Badge } from '@/components/ui';
import { AccountSettings } from '@/components/AccountSettings';

const PRO_PLANS = new Set(['pro_monthly', 'pro_annual']);

function fmtDate(iso: string | null, lang: Lang): string {
  if (!iso) return '—';
  try {
    return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function statusTone(status: string): 'ok' | 'warn' | 'danger' {
  if (status === 'paid') return 'ok';
  if (status === 'created') return 'warn';
  if (status === 'refunded') return 'warn';
  return 'danger';
}

export async function AccountView({ lang }: { lang: Lang }) {
  const t = (k: string, v?: Record<string, string | number>) => translate(lang, k, v);
  const cookieStore = await cookies();
  const user: SessionUser | null = parseSession(cookieStore.get(SESSION_COOKIE)?.value);

  if (!user) {
    const base = lang === 'en' ? '/en' : '';
    return (
      <Card>
        <div className="py-10 text-center space-y-4">
          <p className="t-3 font-bold">{t('account.notSignedIn')}</p>
          <p className="t-6 text-ink-soft">{t('account.notSignedIn.desc')}</p>
          <a
            href={`${base}/api/auth/google`}
            className="inline-flex h-9 items-center rounded-xl2 bg-primary px-4 text-t-5 font-semibold text-white hover:brightness-95 transition-calm"
          >
            {t('account.goSignIn')}
          </a>
        </div>
      </Card>
    );
  }

  const orders = await listUserOrders(user.sub);
  const paidOrders = orders.filter((o) => o.status === 'paid');
  const proOrder = paidOrders.find((o) => PRO_PLANS.has(o.plan)) ?? null;
  const isMember = Boolean(proOrder);
  const memberSince = proOrder?.paidAt ?? null;
  const totalSpentCny = paidOrders.reduce((s, o) => s + (o.cnyAmount || 0), 0);
  const plan = proOrder ? findPlan(proOrder.plan) : undefined;

  const base = lang === 'en' ? '/en' : '';
  const quotaKey =
    proOrder?.plan === 'pro_annual' ? 'account.member.quota.annual' : 'account.member.quota.monthly';

  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary-weak text-primary">
          <User size={20} />
        </span>
        <div>
          <h1 className="t-2 font-bold">{t('account.title')}</h1>
          <p className="t-7 text-ink-soft">{user.name || user.email}</p>
        </div>
      </div>

      {/* 1. Account info */}
      <Card>
        <div className="t-4 font-semibold mb-4 flex items-center gap-2">
          <User size={16} className="text-primary" /> {t('account.section.profile')}
        </div>
        <dl className="text-t-6 space-y-2">
          <div className="flex justify-between">
            <dt className="text-ink-soft">{t('account.profile.name')}</dt>
            <dd className="font-medium">{user.name || '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">{t('account.profile.email')}</dt>
            <dd className="font-medium">{user.email || '—'}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">{t('account.profile.loginMethod')}</dt>
            <dd className="font-medium">Google</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">{t('account.profile.joined')}</dt>
            <dd className="font-medium">{fmtDate(proOrder?.paidAt ?? null, lang)}</dd>
          </div>
        </dl>
      </Card>

      {/* 2. Membership */}
      <Card>
        <div className="t-4 font-semibold mb-4 flex items-center gap-2">
          <Crown size={16} className="text-primary" /> {t('account.section.member')}
        </div>
        {isMember ? (
          <div className="space-y-2 text-t-6">
            <div className="flex justify-between">
              <dt className="text-ink-soft">{t('account.member.status')}</dt>
              <dd>
                <Badge tone="ok">{t('account.member.active')}</Badge>
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">{t('account.orders.plan')}</dt>
              <dd className="font-medium">{plan ? t(`plan.${plan.id}.name`) : proOrder!.plan}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">{t('account.member.since')}</dt>
              <dd className="font-medium">{fmtDate(memberSince, lang)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">{t('account.member.quota')}</dt>
              <dd className="font-medium">{t(quotaKey)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">{t('account.member.spent')}</dt>
              <dd className="font-medium">¥{totalSpentCny.toFixed(2)}</dd>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`${base}/delete/confirm`}
                className="inline-flex items-center gap-1 rounded-xl2 bg-primary px-4 py-2 text-t-5 font-semibold text-white hover:brightness-95 transition-calm"
              >
                {t('account.member.upgrade')} <ArrowUpRight size={16} />
              </a>
              <a
                href={`${base}/delete/confirm`}
                className="inline-flex items-center gap-1 rounded-xl2 border border-line px-4 py-2 text-t-5 font-semibold text-ink hover:bg-canvas transition-calm"
              >
                {t('account.member.renew')}
              </a>
            </div>
          </div>
        ) : (
          <div className="py-6 text-center text-t-6 text-ink-soft">
            <Crown size={28} className="mx-auto mb-2 text-ink-soft" />
            <p>{t('account.member.none')}</p>
            <a
              href={`${base}/delete/confirm`}
              className="inline-flex items-center gap-1 mt-3 rounded-xl2 bg-primary px-4 py-2 text-t-5 font-semibold text-white hover:brightness-95 transition-calm"
            >
              {t('account.member.upgrade')} <ArrowUpRight size={16} />
            </a>
          </div>
        )}
      </Card>

      {/* 3. Orders */}
      <Card>
        <div className="t-4 font-semibold mb-4 flex items-center gap-2">
          <Receipt size={16} className="text-primary" /> {t('account.section.orders')}
        </div>
        {orders.length === 0 ? (
          <p className="t-6 text-ink-soft py-4 text-center">{t('account.orders.empty')}</p>
        ) : (
          <div className="space-y-3">
            {orders.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between gap-3 rounded-xl2 border border-line p-3"
              >
                <div className="min-w-0">
                  <div className="t-7 font-mono text-ink-soft truncate">{o.id}</div>
                  <div className="t-6 text-ink">{t(`plan.${o.plan}.name`)}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="t-6 font-semibold">¥{o.cnyAmount.toFixed(2)}</div>
                  <div className="t-8 text-ink-soft">${o.amount.value}</div>
                </div>
                <div className="shrink-0 flex flex-col items-end gap-1">
                  <Badge tone={statusTone(o.status)}>{t(`order.status.${o.status}`)}</Badge>
                  <span className="t-8 text-ink-soft">{fmtDate(o.createdAt, lang)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 4. Settings */}
      <Card>
        <div className="t-4 font-semibold mb-4 flex items-center gap-2">
          <CreditCard size={16} className="text-primary" /> {t('account.section.settings')}
        </div>
        <AccountSettings />
      </Card>
    </div>
  );
}
