'use client';

import { LangLink } from '@/components/LangLink';
import { Card } from '@/components/ui';
import { AdUnit } from '@/components/AdUnit';
import { useI18n } from '@/components/I18nProvider';
import { SITE_URL } from '@/lib/site';

// Replace with the real AdSense slot id from your dashboard once approved.
const HOME_AD_SLOT = '6642233840';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Digital Footprint Health Report',
  alternateName: '数字足迹体检报告',
  url: SITE_URL,
  description:
    'Upload your X/Twitter archive and generate a local privacy health report that flags risky tweets (phone, email, location, sensitive topics), with on-demand batch deletion.',
  applicationCategory: 'PrivacyApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'CNY',
  },
  inLanguage: ['zh-CN', 'en'],
};

const STEPS = [
  { n: '1', titleKey: 'landing.step1.title', descKey: 'landing.step1.desc' },
  { n: '2', titleKey: 'landing.step2.title', descKey: 'landing.step2.desc' },
  { n: '3', titleKey: 'landing.step3.title', descKey: 'landing.step3.desc' },
];

export default function HomePage() {
  const { t } = useI18n();
  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <section className="pt-6">
        <h1 className="t-1 max-w-[18ch]">{t('landing.hero.title')}</h1>
        <p className="t-4 text-ink-soft mt-3 max-w-[60ch]">{t('landing.hero.desc')}</p>
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <LangLink
            href="/upload"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl2 px-5 py-2.5 t-5 font-semibold bg-primary text-white hover:brightness-95 transition-calm"
          >
            {t('landing.cta.start')}
          </LangLink>
          <LangLink
            href="/delete/confirm"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl2 px-5 py-2.5 t-5 font-semibold bg-surface text-ink border border-line hover:bg-canvas transition-calm"
          >
            {t('landing.cta.delete')}
          </LangLink>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {STEPS.map((s) => (
          <Card key={s.n}>
            <div className="h-8 w-8 rounded-full bg-primary-weak text-primary font-bold flex items-center justify-center mono">
              {s.n}
            </div>
            <h3 className="t-4 font-semibold mt-3">{t(s.titleKey)}</h3>
            <p className="t-6 text-ink-soft mt-1.5">{t(s.descKey)}</p>
          </Card>
        ))}
      </section>

      <section>
        <Card className="border-primary-weak bg-primary-weak">
          <div className="t-4 font-semibold">{t('landing.trust.title')}</div>
          <ul className="mt-2 space-y-1.5 text-t-6 text-ink-soft list-disc list-inside">
            <li>{t('landing.trust.1')}</li>
            <li>{t('landing.trust.2')}</li>
            <li>{t('landing.trust.3')}</li>
          </ul>
        </Card>
      </section>

      <section className="space-y-4 border-t border-line pt-6">
        <h2 className="t-4 font-semibold">为什么需要做"数字足迹体检"</h2>
        <p className="t-5 text-ink-soft">
          你在 X 上多年累计的推文，可能无意中泄露了手机号、家庭住址、常去地点、真实姓名，甚至政治与宗教倾向。这些信息一旦被搜索引擎收录或被陌生人翻看，可能带来骚扰、诈骗或实名暴露的风险。数字足迹体检报告帮你把这些"隐形地雷"一次性找出来。
        </p>
        <p className="t-5 text-ink-soft">
          整个过程都在你的浏览器本地完成：归档文件不会上传到任何服务器，体检结果只保存在你自己的设备里。你既可以逐项查看风险推文，也可以在确认后批量删除，主动权始终在你手上。
        </p>
        <h2 className="t-4 font-semibold pt-2">适合谁使用</h2>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li>希望注销或重新包装个人品牌、清理历史痕迹的用户</li>
          <li>注重隐私、担心被"人肉搜索"或钓鱼的普通网民</li>
          <li>需要向 X 批量删除旧推文、降低数字风险的账号</li>
        </ul>
      </section>

      <section className="border-t border-line pt-6">
        <h2 className="t-4 font-semibold mb-3">了解更多</h2>
        <ul className="space-y-2 t-5">
          <li>
            <LangLink href="/blog" className="text-primary hover:underline">
              隐私与数字足迹指南博客
            </LangLink>
          </li>
          <li>
            <LangLink href="/faq" className="text-primary hover:underline">
              常见问题
            </LangLink>
          </li>
          <li>
            <LangLink href="/privacy" className="text-primary hover:underline">
              隐私政策
            </LangLink>
          </li>
          <li>
            <LangLink href="/terms" className="text-primary hover:underline">
              服务条款
            </LangLink>
          </li>
          <li>
            <LangLink href="/contact" className="text-primary hover:underline">
              联系我们
            </LangLink>
          </li>
        </ul>
      </section>

      <AdUnit slot={HOME_AD_SLOT} className="mt-2" minHeight="120px" />
    </div>
  );
}
