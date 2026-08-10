import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: '服务条款 | 数字足迹体检报告',
  description: 'Digital Footprint Health 服务条款：使用本服务的条件、付费删除规则与责任限制。',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: '服务条款 | 数字足迹体检报告',
    description: '使用本服务的条件、付费删除规则与责任限制。',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <Breadcrumb items={[{ labelKey: 'nav.terms', href: '/terms' }]} />
      <h1 className="t-2 font-bold">服务条款</h1>
      <p className="t-6 text-ink-soft">最后更新：2026 年 7 月 27 日</p>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">1. 条款的接受</h2>
        <p className="t-5 text-ink-soft">
          访问或使用 Digital Footprint Health（数字足迹体检报告，以下简称"本服务"）即表示你同意受本服务条款约束。如果你不同意本条款，请勿使用本服务。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">2. 服务描述</h2>
        <p className="t-5 text-ink-soft">
          本服务是一款隐私保护工具，帮助你分析并清理在 X（原 Twitter）平台上留下的个人数据。你上传的 X 归档文件仅在你本机浏览器中解析，我们不会将其上传至任何服务器。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">3. 付费删除</h2>
        <p className="t-5 text-ink-soft">
          删除推文为付费功能，通过 Waffo 处理支付。删除操作仅在你明确确认并支付费用后，通过 X 的官方写接口执行。费用一经支付通常不可退款，因为删除请求会立即提交至 X。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">4. 用户责任</h2>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li>你须对自己的 X 账户及在本服务中的操作负责。</li>
          <li>你不得利用本服务从事任何违法、滥用或违反 X 平台规则的行为。</li>
          <li>你确认拥有对自己 X 数据的处理权限，并已了解删除操作的不可逆性。</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">5. 免责声明</h2>
        <p className="t-5 text-ink-soft">
          本服务按"现状"提供，不对其可用性、准确性或适用性作出任何明示或暗示的担保。X 平台接口的变动、限流或政策调整可能影响删除功能的执行效果，我们不对此类外部因素导致的失败承担责任。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">6. 责任限制</h2>
        <p className="t-5 text-ink-soft">
          在法律允许的最大范围内，对于因使用或无法使用本服务而产生的任何间接、偶然或后果性损害，本服务运营方不承担责任。我们的总赔偿责任不超过你为使用本服务所支付的费用。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">7. 知识产权</h2>
        <p className="t-5 text-ink-soft">
          本服务的界面、文案、代码及相关内容归运营方所有，受著作权法保护。你不得复制、修改或再分发本服务的任何部分。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">8. 条款变更</h2>
        <p className="t-5 text-ink-soft">
          我们可能不时更新本服务条款。重大变更将通过网站通知或电子邮件（如已注册）告知。更新后继续使用本服务即视为接受修订后的条款。
        </p>
      </section>
    </div>
  );
}
