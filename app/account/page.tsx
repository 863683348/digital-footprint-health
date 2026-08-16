import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AccountView } from '@/components/AccountView';
import type { Lang } from '@/lib/i18n';

async function resolveLocale(): Promise<Lang> {
  const h = await headers();
  return h.get('x-locale') === 'en' ? 'en' : 'zh';
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await resolveLocale();
  return {
    title: locale === 'en' ? 'Account | Digital Footprint Health' : '个人中心 | 数字足迹体检报告',
    description:
      locale === 'en'
        ? 'View your membership status, orders, and account settings.'
        : '查看会员状态、订单记录和个人账户设置。',
  };
}

export default async function AccountPage() {
  const locale = await resolveLocale();
  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <Breadcrumb items={[{ labelKey: 'nav.account', href: '/account' }]} />
      <AccountView lang={locale} />
    </div>
  );
}
