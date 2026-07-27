import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: '隐私政策 | 数字足迹体检报告',
  description: 'Digital Footprint Health 的数据处理与隐私保护政策。你的归档文件仅在本机处理，不上传任何服务器。',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: '隐私政策 | 数字足迹体检报告',
    description: '了解我们如何处理你的数据——全程本地处理，不上传服务器。',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <Breadcrumb items={[{ label: '隐私政策', href: '/privacy' }]} />
      <h1 className="t-2 font-bold">隐私政策</h1>
      <p className="t-6 text-ink-soft">最后更新：2026 年 7 月 27 日</p>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">1. 我们是谁</h2>
        <p className="t-5 text-ink-soft">
          Digital Footprint Health（数字足迹体检报告）是一款隐私保护工具，帮助用户分析并清理 X（原 Twitter）平台上的个人数据。我们坚信隐私是基本权利，因此在产品设计的每个环节都将用户数据安全置于首位。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">2. 我们收集什么数据</h2>
        <p className="t-5 text-ink-soft">
          <strong>我们尽可能少地收集数据，这是我们的核心设计原则。</strong>
        </p>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li><strong>X 归档文件：</strong>你上传的归档文件（tweets.csv / tweets.js）仅在你本机的浏览器内存中解析。文件内容不会发送到我们的服务器或任何第三方服务器。</li>
          <li><strong>必要账户信息：</strong>当你进行删除操作时，我们需要通过 X 的 OAuth 流程获取必要的删除权限。我们只请求删除推文所需的最低权限，不会读取你的私信、关注列表或其他隐私数据。</li>
          <li><strong>支付信息：</strong>删除推文为付费服务，我们使用 PayPal 处理支付。我们不会存储你的信用卡信息。</li>
          <li><strong>网站分析：</strong>我们使用 Google Analytics 4 收集匿名的网站使用数据（页面浏览量、功能使用情况等），以帮助我们改进产品。这些数据不能用于识别你的个人身份。</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">3. 你的数据如何被处理</h2>
        <ol className="list-decimal list-inside space-y-2 t-5 text-ink-soft">
          <li><strong>上传与解析：</strong>你从 X 下载的归档文件通过浏览器上传。所有解析操作（检测手机号、邮箱、地址、敏感话题等）都在你的设备上本地完成。</li>
          <li><strong>存储：</strong>解析后的数据以加密形式保存在你浏览器的本地存储中。解密密钥仅存在于你的设备上。</li>
          <li><strong>删除操作：</strong>只有当你确认并支付删除费用后，我们才会通过 X 的官方写接口执行删除。每次删除操作都会在请求中明确记录。</li>
          <li><strong>隐私保护策略：</strong>整个过程中，你的归档内容和推文数据不会离开你的设备。我们不维护数据库，不记录你的推文内容。</li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">4. 数据保留</h2>
        <p className="t-5 text-ink-soft">
          解析后的归档数据在你的浏览器本地存储中保留。如果你清除浏览器数据（缓存、本地存储），或者超过一定时间未访问网站，数据将自动删除。我们建议你在完成删除操作后手动清除浏览器本地存储。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">5. 第三方服务</h2>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li><strong>X（Twitter）API：</strong>仅用于执行推文删除操作，受 X 的<a href="https://x.com/en/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">隐私政策</a>约束。</li>
          <li><strong>PayPal：</strong>用于处理支付，受 PayPal 的<a href="https://www.paypal.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">隐私政策</a>约束。</li>
          <li><strong>Google Analytics：</strong>用于网站分析，受 Google 的<a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">隐私政策</a>约束。</li>
          <li><strong>Vercel：</strong>网站托管在 Vercel 上，受 Vercel 的<a href="https://vercel.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">隐私政策</a>约束。</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">6. 你的权利</h2>
        <p className="t-5 text-ink-soft">
          根据适用的隐私法律（如 GDPR、CCPA），你拥有以下权利：
        </p>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li>了解我们收集了哪些关于你的数据</li>
          <li>要求删除你的数据</li>
          <li>限制或反对数据处理</li>
          <li>数据可携带性</li>
        </ul>
        <p className="t-5 text-ink-soft">
          由于我们的设计原则是尽可能少地收集数据，你可能发现我们本来就持有极少（或零）关于你的个人信息。如需行使以上权利，请通过下方联系方式与我们联系。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">7. 联系我们</h2>
        <p className="t-5 text-ink-soft">
          如果你对本隐私政策有任何疑问，或希望行使你的隐私权利，请通过以下方式联系我们：
        </p>
        <p className="t-5 text-ink-soft">
          邮箱：privacy@digital-footprint-health.shop
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">8. 政策更新</h2>
        <p className="t-5 text-ink-soft">
          我们可能会不时更新本隐私政策。重大变更时，我们会通过网站通知或电子邮件（如已注册）的方式告知。建议你定期查阅本页面以了解最新信息。
        </p>
      </section>
    </div>
  );
}
