import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AdUnit } from '@/components/AdUnit';

// Replace with the real AdSense slot id from your dashboard once approved.
const ABOUT_AD_SLOT = '6642233840';

export const metadata: Metadata = {
  title: '关于我们 | 数字足迹体检报告',
  description: '了解 Digital Footprint Health 团队和我们的使命——帮你安全、便捷地管理自己的数字足迹。',
  alternates: { canonical: '/about' },
  openGraph: {
    title: '关于我们 | 数字足迹体检报告',
    description: '了解 Digital Footprint Health 团队和我们的使命。',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-[720px] mx-auto space-y-8">
      <Breadcrumb items={[{ label: '关于我们', href: '/about' }]} />
      <h1 className="t-2 font-bold">关于我们</h1>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">我们的使命</h2>
        <p className="t-5 text-ink-soft leading-relaxed">
          Digital Footprint Health 的使命很简单：让每个人都能轻松、安全地管理自己在社交媒体上的数字足迹。
        </p>
        <p className="t-5 text-ink-soft leading-relaxed">
          我们的社交媒体账号随着时间推移积累了海量内容——其中很多可能包含我们早已忘记的个人信息、隐私数据和过时的观点。
          但大多数工具要么需要你把数据上传到第三方服务器（有泄露风险），要么操作复杂，普通人难以使用。
        </p>
        <p className="t-5 text-ink-soft leading-relaxed">
          所以我们做了这个工具：纯本地解析，数据不上传任何服务器，操作简单直观，任何人都能在几分钟内完成一次完整的数字足迹体检。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">我们的原则</h2>
        <ul className="space-y-3 t-5 text-ink-soft">
          <li>
            <strong className="text-ink">隐私第一：</strong>你的数据属于你自己。所有解析操作在本地完成，不经过任何服务器。我们不存储、不分析、不出售你的任何数据。
          </li>
          <li>
            <strong className="text-ink">透明可信：</strong>删除操作按条透明计费，可随时暂停、续传或取消。未开始的删除可以全额退款。
          </li>
          <li>
            <strong className="text-ink">简单好用：</strong>三步完成——上传归档、生成报告、按需删除。不需要技术背景，任何人都能操作。
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">为什么选择我们</h2>
        <p className="t-5 text-ink-soft leading-relaxed">
          市面上的推文删除工具大多需要授权访问你的 X 账号、上传你的数据到云服务器，或者只能删除最近 3200 条推文。
        </p>
        <p className="t-5 text-ink-soft leading-relaxed">
          Digital Footprint Health 的不同之处在于：
        </p>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li>纯浏览器本地解析，数据不上传任何服务器</li>
          <li>支持 X 完整数据归档，突破 3200 条限制</li>
          <li>自动检测手机号、邮箱、地址等隐私风险</li>
          <li>生成可视化的隐私健康评分</li>
          <li>按需删除，按条计费，可随时暂停</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">技术栈</h2>
        <p className="t-5 text-ink-soft leading-relaxed">
          网站构建于 Next.js 之上，部署在 Vercel Edge Network。数据解析使用 Web 原生 API 在前端完成，删除操作通过 X 官方 API v2 执行。支付由 PayPal 处理。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">联系我们</h2>
        <p className="t-5 text-ink-soft leading-relaxed">
          如果你有任何问题、建议或反馈，欢迎通过以下方式与我们取得联系：
        </p>
        <ul className="space-y-2 t-5 text-ink-soft">
          <li>
            <strong>邮件：</strong>
            <a href="mailto:hello@digital-footprint-health.shop" className="text-primary hover:underline">
              hello@digital-footprint-health.shop
            </a>
          </li>
          <li>
            <strong>隐私相关：</strong>
            <a href="mailto:privacy@digital-footprint-health.shop" className="text-primary hover:underline">
              privacy@digital-footprint-health.shop
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-4 rounded-xl2 border border-line bg-surface p-5">
        <p className="t-5 text-ink-soft leading-relaxed">
          Digital Footprint Health 是独立开发项目，与 X（Twitter）公司没有任何关联。
        </p>
        <p className="t-6 text-ink-soft">
          最后更新：2026 年 7 月
        </p>
      </section>

      <AdUnit slot={ABOUT_AD_SLOT} minHeight="120px" />
    </div>
  );
}
