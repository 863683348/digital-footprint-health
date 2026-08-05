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

const FAQ_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '体检报告会泄露我的推文吗？', acceptedAnswer: { '@type': 'Answer', text: '不会。所有解析与扫描都在你的浏览器本地完成，归档文件不会上传到任何服务器，结果也只保存在你自己的设备里。' } },
    { '@type': 'Question', name: '支持中文以外的语言吗？', acceptedAnswer: { '@type': 'Answer', text: '支持。工具界面与报告均提供中文和英文，可随时切换；推文内容本身的语言不影响扫描。' } },
    { '@type': 'Question', name: '批量删除安全吗？会不会误删？', acceptedAnswer: { '@type': 'Answer', text: '删除前你可以逐条确认风险推文，只有你主动勾选并确认的条目才会被删除；删除动作通过 X 官方接口执行，过程透明可控。' } },
    { '@type': 'Question', name: '免费的吗？有次数限制吗？', acceptedAnswer: { '@type': 'Answer', text: '基础体检免费，可反复使用；高阶功能（如更大归档、批量删除额度）可在定价页查看对应方案。' } },
    { '@type': 'Question', name: '删除的推文还能恢复吗？', acceptedAnswer: { '@type': 'Answer', text: '不能。通过 X 官方接口删除的推文即从平台移除，X 自身也不提供恢复功能。删除前务必逐条确认，重要回忆建议先截图或备份再删。' } },
    { '@type': 'Question', name: '归档里除了推文还包含什么？', acceptedAnswer: { '@type': 'Answer', text: 'X 的数据归档是一个完整包，除了推文，通常还含私信、关注列表、点赞记录、登录记录等。本工具默认只解析推文内容用于体检，不会读取或上传其他部分。' } },
    { '@type': 'Question', name: '支持 X 以外的平台吗？', acceptedAnswer: { '@type': 'Answer', text: '目前仅支持 X/Twitter 的归档格式。其他平台的数据结构不同，若后续支持会在博客与更新日志中说明。' } },
    { '@type': 'Question', name: '用 X 官方接口删除，账号会被限流或封禁吗？', acceptedAnswer: { '@type': 'Answer', text: '批量删除走的是 X 官方提供的标准接口，属于账号持有人的正常操作，不会因此被限流或封禁；建议避免在极短时间内高频操作，以免触发风控。' } },
  ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
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

      <section className="space-y-4 border-t border-line pt-6">
        <h2 className="t-4 font-semibold">如何从 X（Twitter）导出你的数据归档</h2>
        <p className="t-5 text-ink-soft">
          生成"数字足迹体检报告"的第一步，是把你在 X 上的历史数据下载到本地。整个过程由 X 官方提供，免费且无需任何第三方授权：
        </p>
        <ol className="list-decimal list-inside space-y-1.5 t-5 text-ink-soft">
          <li>登录 X，进入「设置与隐私 → 你的账户 → 下载你的数据」。</li>
          <li>点击「请求数据归档」，X 会在几分钟到数小时内把打包链接发到你的注册邮箱。</li>
          <li>打开邮件中的链接，下载得到一份 <code className="mono">X-data-archive.zip</code>，解压后找到 <code className="mono">data/tweets.js</code> 或 <code className="mono">tweets.csv</code>。</li>
          <li>把该文件拖入本工具的「上传归档」区域，即可在浏览器本地完成解析与体检——文件不会上传到任何服务器。</li>
        </ol>
        <p className="t-5 text-ink-soft">
          整个过程都在你的设备本地完成：归档文件不会离开浏览器，体检结果只保存在你自己的机器里，解析和扫描也不依赖联网。
        </p>
      </section>

      <section className="space-y-4 border-t border-line pt-6">
        <h2 className="t-4 font-semibold">真实场景：数字足迹体检能帮你解决什么</h2>
        <div className="space-y-3 t-5 text-ink-soft">
          <p>
            <strong>场景一 · 重新包装个人品牌。</strong> 一位 freelancer 在换赛道前，用本工具扫描出 300 多条早年吐槽前雇主、暴露真实姓名的推文，批量删除后安心开启新账号，避免了被新客户"挖坟"。
          </p>
          <p>
            <strong>场景二 · 防范人肉搜索。</strong> 一位普通用户发现自己的多条推文无意中带出了家庭住址附近的地标、常去健身房和子女学校，及时删除并调整了发推习惯，降低了被定位的风险。
          </p>
          <p>
            <strong>场景三 · 注销前的清理。</strong> 准备停用 X 账号的人，先用工具导出并体检，确认没有遗留可识别身份的敏感信息，再执行注销，避免"人走了痕迹还在"。
          </p>
        </div>
      </section>

      <section className="space-y-4 border-t border-line pt-6">
        <h2 className="t-4 font-semibold">体检报告里，你能看到什么</h2>
        <p className="t-5 text-ink-soft">
          上传归档并扫描完成后，你会得到一份结构化的本地报告，而不是一堆看不懂的原始数据。它把多年推文里潜藏的隐私风险，整理成你可以直接行动的清单：
        </p>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li><strong>风险推文清单：</strong> 逐条列出被判定为高风险的推文，标注它命中了哪类信号、出现在哪一年，方便你快速定位。</li>
          <li><strong>风险类型分布：</strong> 统计你泄露得最多的信息类型（手机号、邮箱、住址、定位、政治或宗教倾向、财务等），让你知道自己的"薄弱点"在哪。</li>
          <li><strong>数字足迹健康评分：</strong> 一个 0-100 的综合分，分数越低代表历史痕迹越"危险"，分数会随你批量删除风险推文而实时回升。</li>
          <li><strong>时间线视图：</strong> 按年份展示你每年发布的敏感内容密度，帮你识别哪段时间发推最"放飞自我"。</li>
        </ul>
        <p className="t-5 text-ink-soft">
          所有这些数据都只存在于你的浏览器本地，不会上传、不会同步到任何云端，关掉页面即清空（除非你主动导出报告文件）。
        </p>
      </section>

      <section className="space-y-4 border-t border-line pt-6">
        <h2 className="t-4 font-semibold">我们扫描哪些"危险信号"</h2>
        <p className="t-5 text-ink-soft">
          工具用一套本地规则，识别推文中最常见的隐私泄露模式。以下每一类，都可能是被陌生人"顺藤摸瓜"的起点：
        </p>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li><strong>联系方式：</strong> 明文手机号、邮箱地址、微信或 QQ 等社交账号。</li>
          <li><strong>真实住址：</strong> 小区名、楼栋、附近地标、邮编，或与定位绑定的常去地点。</li>
          <li><strong>常驻定位：</strong> "家附近""公司楼下""每周三去的那家健身房"这类能反推生活半径的描述。</li>
          <li><strong>实名信息：</strong> 真实姓名、身份证片段、工牌、学生证、公司内网账号。</li>
          <li><strong>敏感立场：</strong> 强烈的政见、宗教、性别取向表达，在被定向攻击时可能成为把柄。</li>
          <li><strong>财务线索：</strong> 工资条、房产、车贷、投资收益等可被用来钓鱼或诈骗的信息。</li>
        </ul>
        <p className="t-5 text-ink-soft">
          需要说明：扫描只做"模式识别"，不会把你的内容发给任何第三方模型或服务器。它只是用关键词与正则，在你的本地文件里做匹配。
        </p>
      </section>

      <section className="space-y-4 border-t border-line pt-6">
        <h2 className="t-4 font-semibold">数字足迹健康评分是怎么算的</h2>
        <p className="t-5 text-ink-soft">
          评分不是随便给的数字，而是基于三类维度综合计算：
        </p>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li><strong>风险推文占比：</strong> 命中敏感信号的推文，占你总推文的比例越高，扣分越多。</li>
          <li><strong>风险严重程度：</strong> 暴露实名、住址、手机号这类"高危害"信号的权重，远高于暴露兴趣爱好。</li>
          <li><strong>时间新鲜度：</strong> 近一两年的高风险推文，比十年前的"黑历史"更危险，权重更高。</li>
        </ul>
        <p className="t-5 text-ink-soft">
          举个例子：一个总推文 2000 条、其中 40 条带手机号或住址、且多集中在近两年的账号，评分会明显偏低；当你确认删除这些推文后，分数会立即上升。评分的意义在于"给你一个可量化的起点"，而不是吓唬你。
        </p>
      </section>

      <section className="space-y-4 border-t border-line pt-6">
        <h2 className="t-4 font-semibold">导出 X 数据归档时，常见问题怎么处理</h2>
        <dl className="space-y-3 t-5 text-ink-soft">
          <div>
            <dt className="font-semibold text-ink">没收到归档邮件？</dt>
            <dd className="mt-1">X 处理归档通常需要几分钟到数小时，高峰期可能更久。先检查垃圾邮件，并确认邮件地址与账号绑定一致；超过 24 小时没收到，可重新请求一次。</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">下载到的是 tweets.js 还是 tweets.csv？</dt>
            <dd className="mt-1">老版本归档常用 <code className="mono">data/tweets.js</code>，新版可能提供 CSV。本工具两种都支持，直接拖入即可，无需手动转换格式。</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">归档文件太大打不开？</dt>
            <dd className="mt-1">多年重度用户的归档可能几十 MB。本工具在浏览器本地解析，不依赖上传，只要设备内存足够，大文件也能处理；若卡顿，可尝试用电脑而非手机操作。</dd>
          </div>
        </dl>
      </section>

      <section className="space-y-4 border-t border-line pt-6">
        <h2 className="t-4 font-semibold">保护数字足迹，可以养成的 6 个习惯</h2>
        <ul className="list-decimal list-inside space-y-1.5 t-5 text-ink-soft">
          <li>发带定位的推文前，想清楚"这条会不会暴露我的日常动线"。</li>
          <li>不在公开平台留手机号、邮箱等联系方式，需要联系就用私信或中转邮箱。</li>
          <li>定期（比如每半年）导出一次归档，做一次"数字足迹体检"。</li>
          <li>换工作、换城市、结束一段关系时，主动清理相关旧推文。</li>
          <li>给 X 账号开启双重验证，避免被盗后留下不属于你的"黑历史"。</li>
          <li>把"分享欲"和"隐私"分开：想记录生活，可以用仅自己可见或私密账号。</li>
        </ul>
        <p className="t-5 text-ink-soft">
          数字足迹体检报告是你的"体检仪"，但日常习惯才是真正的"免疫力"。工具只能帮你清理已发生的风险，良好的发推习惯能减少未来的风险。
        </p>
      </section>

      <section className="space-y-3 border-t border-line pt-6">
        <h2 className="t-4 font-semibold">常见问题（FAQ）</h2>
        <dl className="space-y-3 t-5 text-ink-soft">
          <div>
            <dt className="font-semibold text-ink">体检报告会泄露我的推文吗？</dt>
            <dd className="mt-1">不会。所有解析与扫描都在你的浏览器本地完成，归档文件不会上传到任何服务器，结果也只保存在你自己的设备里。</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">支持中文以外的语言吗？</dt>
            <dd className="mt-1">支持。工具界面与报告均提供中文和英文，可随时切换；推文内容本身的语言不影响扫描。</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">批量删除安全吗？会不会误删？</dt>
            <dd className="mt-1">删除前你可以逐条确认风险推文，只有你主动勾选并确认的条目才会被删除；删除动作通过 X 官方接口执行，过程透明可控。</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">免费的吗？有次数限制吗？</dt>
            <dd className="mt-1">基础体检免费，可反复使用；高阶功能（如更大归档、批量删除额度）可在定价页查看对应方案。</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">删除的推文还能恢复吗？</dt>
            <dd className="mt-1">不能。通过 X 官方接口删除的推文即从平台移除，X 自身也不提供恢复功能。删除前务必逐条确认，重要回忆建议先截图或备份再删。</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">归档里除了推文还包含什么？</dt>
            <dd className="mt-1">X 的数据归档是一个完整包，除了推文，通常还含私信、关注列表、点赞记录、登录记录等。本工具默认只解析推文内容用于体检，不会读取或上传其他部分。</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">支持 X 以外的平台吗（如微博、小红书）？</dt>
            <dd className="mt-1">目前仅支持 X/Twitter 的归档格式。其他平台的数据结构不同，若后续支持会在博客与更新日志中说明。</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">用 X 官方接口删除，账号会被限流或封禁吗？</dt>
            <dd className="mt-1">批量删除走的是 X 官方提供的标准接口，属于账号持有人的正常操作，不会因此被限流或封禁；建议避免在极短时间内高频操作，以免触发风控。</dd>
          </div>
        </dl>
      </section>

      <AdUnit slot={HOME_AD_SLOT} className="mt-2" minHeight="120px" />
    </div>
  );
}
