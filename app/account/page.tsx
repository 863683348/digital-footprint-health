import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AccountView } from '@/components/AccountView';
import type { Lang } from '@/lib/i18n';

const METADATA: Record<Lang, Metadata> = {
  zh: {
    title: '个人中心 | 数字足迹体检报告',
    description: '查看会员状态、订单记录和个人账户设置。',
  },
  en: {
    title: 'Account | Digital Footprint Health',
    description: 'View your membership status, orders, and account settings.',
  },
};

/**
 * Account is intentionally dynamic: it reads the session cookie (private user
 * data), so it stays a server-rendered per-request route. /account = zh,
 * /en/account (catch-all) = en. This single route's origin cost is
 * negligible next to the static marketing/blog pages this refactor fixed.
 */
export function generateMetadata(): Metadata {
  return METADATA.zh;
}

export default function AccountPage({ lang = 'zh' }: { lang?: Lang }) {
  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <Breadcrumb items={[{ labelKey: 'nav.account', href: '/account' }]} />
      <AccountView lang={lang} />
    </div>
  );
}
