export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;       // ISO date
  updatedAt: string;  // ISO date
  author: string;
  category: string;
  tags: string[];
  content: string;    // HTML content
  canonical: string;
  /** English translations (optional; the EN blog pages fall back to zh when absent). */
  titleEn?: string;
  excerptEn?: string;
  categoryEn?: string;
  tagsEn?: string[];
  contentEn?: string;
}

/** All blog posts, sorted by date descending. */
export const allPosts: BlogPost[] = [
  {
    slug: 'what-is-digital-footprint-check',
    title: '你的 X 账号有"数字足迹"吗？什么是隐私体检',
    excerpt:
      '你在 X（Twitter）上发过的每一条推文，都可能留下手机号、住址、定位等隐私痕迹——这就是你的"数字足迹"。数字足迹体检通过解析你的 X 数据归档，在本机生成 0-100 健康评分与风险清单。100% 本机处理，数据不出你的电脑。',
    date: '2026-08-04',
    updatedAt: '2026-08-04',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '数字足迹', '隐私体检', '隐私保护'],
    canonical: '/blog/what-is-digital-footprint-check',
    titleEn: 'What Is a Digital Footprint Check for Your X Account?',
    excerptEn:
      'Your tweets on X (Twitter) may carry privacy traces like phone numbers, home addresses, and locations — that is your digital footprint. A digital footprint check parses your X archive on-device and produces a 0-100 health score plus a risk list. 100% on-device: your data never leaves your computer.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'digital footprint', 'privacy check', 'privacy'],
    contentEn: `
<p>You probably don't remember 90% of your old tweets. But recruiters, scammers, and search engines do.</p>
<p>Between 2009 and 2018, most of us tweeted things we would never post today — a new home address, a boarding pass, a workplace badge photo, an unflattering rant about an old employer. These tweets do not disappear. They get indexed, scraped, screenshotted, and occasionally resurrected at the worst possible moment: job applications, media controversies, background checks.</p>

<h2>What is a digital footprint?</h2>
<p>Your <strong>digital footprint</strong> is every trace you leave online. On X, the most common types fall into three buckets:</p>
<ul>
  <li><strong>Contact information</strong> — phone numbers, emails, WeChat IDs (high risk: direct entry for scams and harassment).</li>
  <li><strong>Location data</strong> — home addresses, office addresses, travel check-ins (high risk: real-world safety).</li>
  <li><strong>Sensitive content</strong> — rants about former employers, immature opinions, identity documents (medium risk: career and reputation).</li>
</ul>
<p>These traces hide inside tweet text, image EXIF, and location tags. Going through them manually is practically impossible — which is exactly why a tool is needed.</p>

<h2>Why X is the riskiest platform for your footprint</h2>
<ul>
  <li><strong>Public tweets get indexed by search engines</strong> — anyone can find your old posts via Google.</li>
  <li><strong>X only lets you delete the most recent ~3,200 tweets</strong> — your older posts are locked away from your own control.</li>
  <li><strong>The data archive is the only way through</strong> — X packages your entire history into a ZIP; only by parsing that archive can you reach and clean tweets older than 3,200.</li>
  <li><strong>Old tweets are "excavation" targets</strong> — during job hunts or controversies, a single old tweet can be screenshotted and spread.</li>
</ul>

<h2>What is a digital footprint check?</h2>
<p>A <strong>digital footprint check</strong> is an automated privacy audit. Upload your X data archive (ZIP), and the tool parses every tweet <strong>on your own device</strong>, scanning for phone numbers, emails, addresses, locations, and sensitive topics. You get:</p>
<ul>
  <li><strong>0-100 health score</strong> — how risky your account's footprint is.</li>
  <li><strong>Risk labels per tweet</strong> — phone / address / location / sensitive topic.</li>
  <li><strong>Prioritized cleanup queue</strong> — delete the dangerous stuff first.</li>
  <li><strong>Filters</strong> — by date (e.g. everything before 2018), keyword, or label.</li>
</ul>
<p>The check itself is <strong>free and read-only</strong>. It never deletes anything. Deleting is a separate, optional step — per-tweet priced, pauseable, resumable, refundable.</p>

<h2>Why on-device processing matters</h2>
<p>Privacy tools have a fundamental tension: they process your most sensitive data, yet many upload it to their servers. A trustworthy footprint check should never need to:</p>
<ul>
  <li>Upload your archive to a cloud server</li>
  <li>Call X's read API to pull more data</li>
  <li>Store your tweets in a database</li>
</ul>
<p>With a 100% on-device check, your archive is parsed locally, stored encrypted with a key that never leaves your machine, and only touched by X's write API when you explicitly choose to delete.</p>

<h2>Common misconceptions</h2>
<ul>
  <li><strong>"My account is private, so I'm safe."</strong> — Your old tweets were public for years; they have been indexed and screenshotted already.</li>
  <li><strong>"Deleted tweets are gone forever."</strong> — Deletion is damage control, not a time machine. Start early.</li>
  <li><strong>"A check means deletion."</strong> — No. A check is free, read-only analysis with zero side effects.</li>
</ul>

<h2>Get started</h2>
<p>Your X account is a public diary of the last decade of your life. A digital footprint check helps you see what is really in it, score how risky it is, and clean up what should be cleaned — before someone else finds it first.</p>
<ol>
  <li>Download your X archive: Settings → Your account → Download an archive of your data.</li>
  <li>Run a free footprint check — 100% on-device.</li>
  <li>Review your 0-100 health score and prioritized risk list.</li>
  <li>Clean up what matters, only when you decide to.</li>
</ol>
<p>Want the full walkthrough? Read our <a href="/blog/how-to-delete-old-tweets-2026">complete guide to deleting old tweets on X</a>.</p>
    `.trim(),
    content: `
<p>你在 X（原 Twitter）上发过的每一条推文，都可能留下隐私痕迹——手机号、住址、定位、旧观点。这就是你的"数字足迹"。</p>
<p>2009 年你发过一条"今天搬家到 xx 路 xx 号"；2014 年你晒了张登机牌；2018 年你在深夜吐槽前公司。这些推文当年只是情绪，今天却可能是简历上的污点、诈骗分子眼里的素材、猎头搜索你的第一个结果。</p>
<p>大多数人不知道自己到底在 X 上留下了多少隐私痕迹——因为你 90% 的旧推文，自己早就忘了。数字足迹体检（digital footprint check）就是把这个"忘了的过去"翻出来，一次看明白。</p>

<h2>什么是数字足迹？三种最常见的痕迹</h2>
<p><strong>数字足迹（digital footprint）</strong> 是指你在网上留下的一切可追踪信息。在 X 上，最常见的是三类：</p>
<table>
  <thead>
    <tr><th>类型</th><th>例子</th><th>风险等级</th></tr>
  </thead>
  <tbody>
    <tr><td>联系信息</td><td>手机号、邮箱、微信号</td><td>🔴 高——诈骗/骚扰直接入口</td></tr>
    <tr><td>位置信息</td><td>家庭住址、公司地址、旅行打卡</td><td>🔴 高——现实安全风险</td></tr>
    <tr><td>敏感内容</td><td>抱怨前公司、不成熟言论、身份信息</td><td>🟡 中——求职/名誉风险</td></tr>
  </tbody>
</table>
<p>这些内容藏在推文正文、图片 EXIF、定位标签里，人工一条条翻几乎不可能——这正是需要工具的原因。</p>

<h2>为什么 X 的数字足迹最危险</h2>
<ul>
  <li><strong>X 内容可被搜索引擎索引</strong>：你的公开推文可能出现在 Google 结果里，任何人都能搜到。</li>
  <li><strong>X 官方只允许删除最近约 3,200 条推文</strong>：早年的推文你"想删都删不了"——这是平台硬限制。</li>
  <li><strong>归档（archive）是唯一途径</strong>：X 会把你全部历史推文打包成 ZIP 归档，只有解析这份归档，才能触达并清理 3,200 条之前的旧推文。</li>
  <li><strong>旧推文是"被考古"重灾区</strong>：求职季、舆论事件时，多年前的一句话可能被截图传播。</li>
</ul>

<h2>什么是数字足迹体检</h2>
<p><strong>数字足迹体检</strong>是一种自动化隐私审计：上传你的 X 数据归档（ZIP），工具在本机解析所有推文，扫描出含手机号、邮箱、住址、定位、敏感话题的内容，并给出：</p>
<ul>
  <li><strong>0-100 健康评分</strong>：你的账号隐私风险有多高。</li>
  <li><strong>风险清单</strong>：每条高危推文 + 为什么危险。</li>
  <li><strong>清理建议</strong>：按风险优先级排序，告诉你先删哪条。</li>
  <li><strong>筛选工具</strong>：按日期、关键词、标签精确挑选要删的内容。</li>
</ul>
<p>体检本身<strong>免费且只读</strong>，不会删除任何内容。只有当你决定批量删除历史推文时，才按条计费（可暂停、续传、退款）。</p>

<h2>隐私安全：为什么可以放心上传归档</h2>
<p>隐私工具最大的矛盾是：处理隐私数据，却要上传数据。数字足迹体检的核心设计是：</p>
<ul>
  <li><strong>100% 本机解析</strong>：归档上传后在你自己的浏览器/设备上完成分析，不经过云端。</li>
  <li><strong>归档加密落盘</strong>：文件加密存储，解密密钥只存在于你的本机。</li>
  <li><strong>不调 X 读取接口</strong>：体检只读你上传的归档，不读取你账号的其他数据。</li>
  <li><strong>删除才走 X 写接口</strong>：只有执行删除时才调用 X 的删除接口，权限最小化。</li>
</ul>
<p>这意味着：你的推文数据，只有你自己看得见。</p>

<h2>常见误区</h2>
<ul>
  <li><strong>"我设置了私密账号，就安全了。"</strong> —— 你的旧推文在公开期已被收录/截图，且平台政策随时可能变化。</li>
  <li><strong>"删掉的推文就消失了。"</strong> —— 被搜索引擎、第三方归档、截图保存的内容不会因为删除而消失；删除是"止损"，越早越好。</li>
  <li><strong>"体检 = 删除。"</strong> —— 体检是只读分析，免费且无副作用；删除是独立的可选步骤，按条付费、完全可控。</li>
</ul>

<h2>如何开始</h2>
<p>你的 X 账号是你 10 年人生的公开日记。数字足迹体检帮你：看清、打分、行动。</p>
<ol>
  <li>下载 X 数据归档：设置 → 你的账号 → 下载数据归档。</li>
  <li>免费运行一次数字足迹体检——100% 本机处理。</li>
  <li>查看 0-100 健康评分与按风险排序的清理队列。</li>
  <li>按自己的节奏清理该清理的内容。</li>
</ol>
<p>想了解完整删除流程？请看我们的<a href="/blog/how-to-delete-old-tweets-2026">X 旧推文删除完整指南（2026）</a>。</p>
    `.trim(),
  },
  {
    slug: 'how-to-delete-old-tweets-2026',
    title: '如何删除 X (Twitter) 上的旧推文 — 2026 完整指南',
    excerpt:
      '想知道如何批量删除 X/Twitter 上那些陈年旧推文吗？本文详解 5 种方法，从手动删除到本地归档解析，帮你找到最安全高效的方案。',
    date: '2026-07-27',
    updatedAt: '2026-07-27',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '隐私保护', '删除推文', '数字足迹'],
    canonical: '/blog/how-to-delete-old-tweets-2026',
    titleEn: 'How to Delete Old Tweets on X (Twitter) — The Complete 2026 Guide',
    excerptEn:
      'Want to bulk-delete those old, embarrassing tweets on X/Twitter? This guide breaks down 5 methods — from manual deletion to local archive parsing — to help you find the safest, most efficient approach.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'privacy', 'delete tweets', 'digital footprint'],
    contentEn: `
<p>How many tweets are in your X (formerly Twitter) account? 50? 500? Or several thousand?</p>
<p>Whichever it is, there's always some content that makes you cringe in hindsight — edgy retweets from years ago, carelessly shared locations, a phone number leaked without thinking, old opinions you no longer hold.</p>
<p>More importantly, those old tweets may be leaking your privacy right now.</p>

<h2>Why clean up old tweets</h2>

<p>You might think: "Who would dig through my tweets from years ago?" The answer: more people than you'd expect.</p>

<ul>
  <li><strong>Recruiting background checks:</strong> Over 70% of recruiters search a candidate's social-media history before hiring. A single tweet from years ago can derail a career opportunity.</li>
  <li><strong>Privacy leaks:</strong> Tweets can contain your phone number, home address, check-in locations, and family-member information. Over time, combinations of this data can be used for identity theft or targeted scams.</li>
  <li><strong>Image management:</strong> Your taste and opinions evolve, but the internet doesn't forget. Cleaning up old tweets is the digital-age equivalent of a thorough "house cleaning."</li>
  <li><strong>X likes are public:</strong> Since 2024, X has made like records publicly visible. You may not care, but your historical likes may be tied to content you no longer endorse.</li>
</ul>

<h2>Method 1: Delete manually, one by one (huge effort)</h2>
<p>The most direct but least recommended method. Each tweet requires: tap ⋮ → delete → confirm. At an average of 5 seconds per tweet, 5,000 tweets = nearly 7 hours of non-stop mechanical work. X also enforces temporary limits after a certain volume of actions, making the whole process even more painful. Unless your account has only a few dozen tweets, we don't recommend it.</p>

<h2>Method 2: Third-party cloud services (convenient but risky for privacy)</h2>
<p>There are many online tweet-deletion tools, such as TweetDelete, Circleboom, and TweetEraser. They connect to your X account via OAuth and offer bulk filtering and deletion.</p>
<p>Pros: simple to use, no software to download.</p>
<p>Cons: your tweet data is uploaded to third-party servers. In 2023, a well-known deletion tool was hacked, exposing the tweet data of millions of users.</p>

<h2>Method 3: Browser extensions (safer)</h2>
<p>Chrome extensions like X Cleaner run directly in your browser, using your current login session without sending data to a remote server.</p>
<p>Pros: safer than cloud services.</p>
<p>Cons: still require granting the extension permission to read X's page content, and are limited by X's API limits (can only process the most recent 3,200 tweets).</p>

<h2>Method 4: X archive + local solution (most recommended)</h2>
<p>This is the safest approach and the only one that can delete your entire tweet history. How it works:</p>
<ol>
  <li>Request a download of your full data archive in X's settings (includes every tweet since you registered).</li>
  <li>Upload the archive to a tool that does <strong>pure local processing</strong> to parse it.</li>
  <li>The tool analyzes risky tweets on your device, then deletes them on demand through X's official write API.</li>
</ol>
<p>The key advantage of this approach is that your data never leaves your own device — no server upload, no third-party storage, no data-leak risk.</p>
<p>This is exactly what <strong>Digital Footprint Health</strong> does. We don't call X's read API; all analysis happens locally in your browser. Only when you want to delete tweets do we execute the deletion through X's official interface, with transparent per-tweet pricing.</p>

<h2>Method 5: Python script (for developers)</h2>
<p>If you can code, you can write a custom deletion script using the X API v2. The upside is full control, but it takes development time and API costs (the basic API is $100/month).</p>

<h2>Summary: comparing the 5 methods</h2>

<table>
  <thead>
    <tr><th>Method</th><th>Difficulty</th><th>Deletes all?</th><th>Privacy safety</th><th>Time (10k tweets)</th></tr>
  </thead>
  <tbody>
    <tr><td>Manual deletion</td><td>Simple but exhausting</td><td>Yes</td><td>Highest</td><td>~14 hours</td></tr>
    <tr><td>Third-party cloud</td><td>Simple</td><td>Partial (3,200 limit)</td><td>Low (data uploaded)</td><td>1–3 hours</td></tr>
    <tr><td>Browser extension</td><td>Simple</td><td>Partial (3,200 limit)</td><td>Medium</td><td>1–3 hours</td></tr>
    <tr><td><strong>Archive + local</strong></td><td><strong>Simple</strong></td><td><strong>Yes (all)</strong></td><td><strong>Highest (pure local)</strong></td><td><strong>1–2 hours</strong></td></tr>
    <tr><td>Custom script</td><td>Hard</td><td>Yes</td><td>Depends on implementation</td><td>Hours + dev time</td></tr>
  </tbody>
</table>

<h2>Frequently asked questions</h2>

<h3>Can deleted tweets be recovered?</h3>
<p>No. Once deleted, a tweet is gone permanently. We recommend downloading your X data archive as a backup before bulk deletion.</p>

<h3>Will X ban my account for bulk deletion?</h3>
<p>Normal deletion will not get you banned. But watch your speed and stay within X's API limits. A good deletion tool handles rate limiting automatically.</p>

<h3>Are free deletion tools safe?</h3>
<p>Not necessarily. Some free tools profit by collecting your data. Prefer tools that explicitly state "data is not uploaded to a server," or use a pure local solution.</p>

<h3>Can I delete only tweets within a specific time range?</h3>
<p>Yes. Digital Footprint Health supports filtering by year, keyword, engagement, and more, so you can precisely target the content you want to remove.</p>
    `.trim(),
    content: `
<p>你的 X（原 Twitter）账号里有多少条推文？50 条？500 条？还是几千上万条？</p>
<p>不管多少，里面总有一些"现在回头看有点尴尬"的内容——几年前转发的中二言论、随手发的定位、无意识泄露手机号的聊天、早已不信的旧观点。</p>
<p>更重要的是，这些旧推文可能正在泄露你的隐私。</p>

<h2>为什么要清理旧推文</h2>

<p>你可能会想："谁会翻我那么多年前的推文？" 答案是：比你想象的多。</p>

<ul>
  <li><strong>招聘背调：</strong>超过 70% 的招聘方会在录用前搜索候选人的社交媒体历史。一条多年前的推文可能毁掉一个职业机会。</li>
  <li><strong>隐私泄露：</strong>推文中可能包含你的手机号、住址、常去地点的定位信息、家庭成员信息等。随着时间推移，这些信息的组合可能被用于身份盗用或精准诈骗。</li>
  <li><strong>形象管理：</strong>你的品味和观点在变化，但互联网不会忘记。清理旧推文是数字时代的"房屋大扫除"。</li>
  <li><strong>X 点赞公开：</strong>2024 年起 X 把点赞记录设为公开可见。你可能觉得无所谓，但历史点赞可能关联着你早已不认同的内容。</li>
</ul>

<h2>方法一：手动逐条删除（消耗巨大）</h2>
<p>最直接但最不推荐的方法。每条推文需要：点击 ⋮ → 删除 → 确认。按平均 5 秒一条计算，5000 条推文 = 将近 7 小时不间断的机械操作。X 还会在一定操作量后触发临时限制，让整个过程更加痛苦。除非你的账号只有几十条推文，否则不建议。</p>

<h2>方法二：使用第三方云服务（便捷但有隐私风险）</h2>
<p>市面上有很多在线推文删除工具，如 TweetDelete、Circleboom、TweetEraser 等。它们通过 OAuth 授权接入你的 X 账号，提供批量过滤和删除功能。</p>
<p>优点：操作简单，无需下载软件。</p>
<p>缺点：你的推文数据会被上传到第三方服务器。2023 年就有某知名删除工具被黑客攻破，导致数百万用户的推文数据泄露。</p>

<h2>方法三：浏览器扩展（更安全）</h2>
<p>像 X Cleaner 这类 Chrome 扩展直接在浏览器中运行，利用你当前的登录会话操作，不把数据传到远程服务器。</p>
<p>优点：比云服务更安全。</p>
<p>缺点：仍需要授权扩展读取 X 的页面内容，且受限于 X 的 API 限制（最多只能处理最近 3200 条推文）。</p>

<h2>方法四：使用 X 归档 + 本地方案（最推荐）</h2>
<p>这是最安全、能删除全部历史推文的方案。原理是：</p>
<ol>
  <li>在 X 设置中请求下载你的完整数据归档（包含自注册以来的所有推文）。</li>
  <li>将归档文件上传到一个<strong>纯本地处理</strong>的工具中解析。</li>
  <li>工具在本机分析风险推文，然后通过 X 的官方写接口按需删除。</li>
</ol>
<p>这个方案的关键优势是——你的数据全程不离开自己的设备。没有上传服务器、没有第三方存储、没有数据泄露风险。</p>
<p>这恰恰是 <strong>Digital Footprint Health</strong> 的做法。我们不调用 X 的读取 API，所有分析都在你的浏览器本地完成。只有当你要删除推文时，才会通过 X 的官方接口执行删除操作，且按条透明计费。</p>

<h2>方法五：Python 脚本（适合开发者）</h2>
<p>如果你会写代码，可以用 X API v2 写一个自定义删除脚本。优点是完全可控，但需要一定的开发时间和 API 费用（基础 API 每月 $100）。</p>

<h2>总结：5 种方法对比</h2>

<table>
  <thead>
    <tr><th>方法</th><th>难度</th><th>能否删除全部</th><th>隐私安全</th><th>耗时（1 万条）</th></tr>
  </thead>
  <tbody>
    <tr><td>手动删除</td><td>简单但极累</td><td>能</td><td>最高</td><td>~14 小时</td></tr>
    <tr><td>第三方云服务</td><td>简单</td><td>部分（限 3200 条）</td><td>低（数据上传）</td><td>1-3 小时</td></tr>
    <tr><td>浏览器扩展</td><td>简单</td><td>部分（限 3200 条）</td><td>中</td><td>1-3 小时</td></tr>
    <tr><td><strong>归档+本地方案</strong></td><td><strong>简单</strong></td><td><strong>能（全部）</strong></td><td><strong>最高（纯本地）</strong></td><td><strong>1-2 小时</strong></td></tr>
    <tr><td>自写脚本</td><td>困难</td><td>能</td><td>取决于实现</td><td>数小时+开发时间</td></tr>
  </tbody>
</table>

<h2>常见问题</h2>

<h3>删除推文后还能恢复吗？</h3>
<p>不能。推文一旦删除就是永久的。建议在批量删除前先下载你的 X 数据归档备份。</p>

<h3>X 会因为我批量删除而封号吗？</h3>
<p>正常的删除操作不会导致封号。但要注意速度，控制在 X 的 API 限制范围内。优质的删除工具会自动处理速率限制。</p>

<h3>免费的删除工具安全吗？</h3>
<p>不一定。一些免费工具靠收集你的数据盈利。最好选择明确声明"数据不上传服务器"的工具，或者使用纯本地方案。</p>

<h3>能否只删除特定时间范围内的推文？</h3>
<p>可以。Digital Footprint Health 支持按年份、关键词、互动量等条件过滤，精准定位你想删除的内容。</p>
    `.trim(),
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}
