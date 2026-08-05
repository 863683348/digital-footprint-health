import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: '联系我们 | 数字足迹体检报告',
  description: '如需帮助、行使隐私权利或商务合作，请通过以下方式联系 Digital Footprint Health 团队。',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: '联系我们 | 数字足迹体检报告',
    description: '如需帮助、行使隐私权利或商务合作，请通过以下方式联系我们。',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <Breadcrumb items={[{ labelKey: 'nav.contact', href: '/contact' }]} />
      <h1 className="t-2 font-bold">联系我们</h1>
      <p className="t-6 text-ink-soft">我们通常在 2 个工作日内回复。</p>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">1. 技术支持与账户问题</h2>
        <p className="t-5 text-ink-soft">
          如果你在使用上传、解析或删除功能时遇到问题，请发送邮件至：
        </p>
        <p className="t-5 text-ink-soft">邮箱：support@digital-footprint-health.shop</p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">2. 隐私与数据权利</h2>
        <p className="t-5 text-ink-soft">
          如需行使访问、更正或删除你的个人数据的权利，或对隐私政策有疑问，请联系：
        </p>
        <p className="t-5 text-ink-soft">邮箱：privacy@digital-footprint-health.shop</p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">3. 商务合作</h2>
        <p className="t-5 text-ink-soft">
          媒体、合作或商务咨询，欢迎通过以下邮箱与我们联系：
        </p>
        <p className="t-5 text-ink-soft">邮箱：business@digital-footprint-health.shop</p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">4. 响应时间</h2>
        <p className="t-5 text-ink-soft">
          我们尽量在 2 个工作日内回复所有来信。涉及删除失败的紧急问题，请在邮件标题中注明"紧急"，我们会优先处理。
        </p>
      </section>
    </div>
  );
}
