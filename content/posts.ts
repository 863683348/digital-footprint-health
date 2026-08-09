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

  {
    slug: 'how-to-download-x-archive',
    title: '如何下载 X 数据归档（2026 版 4 步教程）',
    excerpt:
      'X（Twitter）的数据归档是清理旧推文、做隐私体检的唯一切入点——尤其对 3200 条限制之外的推文。这篇教程教你 4 步下载你的完整 X 数据 ZIP，并说明归档里到底有什么。',
    date: '2026-08-05',
    updatedAt: '2026-08-05',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '数据归档', '教程', '隐私保护'],
    canonical: '/blog/how-to-download-x-archive',
    titleEn: 'How to Download Your X Data Archive (2026, 4 Steps)',
    excerptEn:
      'Your X (Twitter) data archive is the only way to clean up tweets older than the ~3,200-tweet limit and to run a privacy check. This tutorial walks you through the 4 steps to download your full X data ZIP and what is inside it.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'data archive', 'tutorial', 'privacy'],
    content: `
<p>X 的数据归档（Data Archive）是清理旧推文、做隐私体检的<strong>唯一切入点</strong>——尤其对超过 3,200 条限制的旧推文，界面上一页页翻根本翻不完，归档才能拿到全部历史。</p>

<h2>为什么需要数据归档？</h2>
<ul>
  <li><strong>X 只允许你删除最近约 3,200 条推文</strong>——更早的推文界面里根本看不到，只有归档里才有。</li>
  <li><strong>归档包含全部历史</strong>——2009 年以来的每条推文、转推、点赞、媒体文件。</li>
  <li><strong>隐私体检必须基于归档</strong>——只有解析归档，才能扫描出手机号、住址、定位等风险内容。</li>
</ul>

<h2>4 步下载 X 数据归档（2026 版）</h2>

<h3>第 1 步：登录 X 并进入设置</h3>
<p>打开 X（twitter.com）→ 左侧菜单 → <strong>更多 / More</strong> → <strong>设置与隐私 / Settings and privacy</strong>。</p>

<h3>第 2 步：找到"下载数据"入口</h3>
<p>设置 → <strong>你的账号 / Your account</strong> → <strong>下载 X 数据 / Download an archive of your data</strong>。系统会要求重新验证密码和邮箱。</p>

<h3>第 3 步：请求归档并等待</h3>
<p>点击「请求归档 / Request archive」→ X 会处理你的全部历史数据。处理时间取决于账号历史量——通常几小时到 1-2 天，完成后会收到邮件或站内通知，链接有效期通常 24 小时。</p>

<h3>第 4 步：下载并解压 ZIP</h3>
<p>点通知里的下载链接 → 得到一个 ZIP（可能几百 MB）→ 解压后你会看到：</p>
<ul>
  <li><strong>tweets.js</strong>——全部推文（含日期、文本、URL、媒体引用），隐私体检的核心文件</li>
  <li><strong>data/ 目录</strong>——图片、视频、头像等媒体文件</li>
  <li><strong>account.js / following.js 等</strong>——账号资料、关注列表等元数据</li>
</ul>

<h2>拿到归档之后</h2>
<p>把 ZIP（或解压后的文件夹）交给数字足迹体检工具，它会在<strong>你本机</strong>解析归档，扫描手机号、邮箱、地址、定位等风险内容，生成 0-100 健康评分和风险清单。全程数据不出你的电脑。</p>

<h2>常见问题（FAQ）</h2>

<h3>下载归档要钱吗？</h3>
<p>不要钱，X 官方功能，免费。</p>

<h3>归档包含已删除的推文吗？</h3>
<p>不包含——已删除的推文不会出现在归档里。如果你之前删过推文，它们已经消失了。</p>

<h3>归档多久生成一次？</h3>
<p>每次点「请求归档」都会重新生成一份最新的；通常建议每 3-6 个月拉一次最新归档做体检。</p>

<h3>解压后的文件夹可以只传 tweets.js 吗？</h3>
<p>可以——tweets.js 包含全部文本数据，体检工具主要用它；媒体文件不影响扫描结果。</p>
`,
    contentEn: `
<p>Your X data archive is the <strong>only way</strong> to clean up tweets older than the ~3,200-tweet limit and to run a privacy check — scrolling through the UI will never get you there.</p>

<h2>Why you need the archive</h2>
<ul>
  <li><strong>X only lets you delete the most recent ~3,200 tweets</strong> — older ones are invisible in the UI; only the archive has them.</li>
  <li><strong>The archive holds your full history</strong> — every tweet, retweet, like, and media file since 2009.</li>
  <li><strong>A privacy check must be archive-based</strong> — only by parsing the archive can you scan for phone numbers, addresses, locations, and other risky content.</li>
</ul>

<h2>4 steps to download your X archive (2026)</h2>

<h3>Step 1: Sign in and open settings</h3>
<p>Open X (twitter.com) → left menu → <strong>More</strong> → <strong>Settings and privacy</strong>.</p>

<h3>Step 2: Find the data download entry</h3>
<p>Settings → <strong>Your account</strong> → <strong>Download an archive of your data</strong>. X will ask you to re-verify your password and email.</p>

<h3>Step 3: Request the archive and wait</h3>
<p>Click <strong>Request archive</strong> → X processes your full history. Depending on account size this takes from a few hours to 1-2 days; you'll get an email or in-app notification with a link valid for ~24 hours.</p>

<h3>Step 4: Download and unzip</h3>
<p>Open the link → download the ZIP (can be hundreds of MB) → unzip and you'll find:</p>
<ul>
  <li><strong>tweets.js</strong> — all tweets (dates, text, URLs, media references); the core file for a privacy check</li>
  <li><strong>data/ folder</strong> — images, videos, profile media</li>
  <li><strong>account.js / following.js etc.</strong> — profile, follow lists, and other metadata</li>
</ul>

<h2>After you have the archive</h2>
<p>Hand the ZIP (or the unzipped folder) to a digital footprint check tool — it parses the archive <strong>on your own device</strong>, scans for phone numbers, emails, addresses, locations, and other risky content, and produces a 0-100 health score plus a risk list. Your data never leaves your computer.</p>

<h2>FAQ</h2>

<h3>Does downloading the archive cost money?</h3>
<p>No — it's an official, free X feature.</p>

<h3>Does the archive include deleted tweets?</h3>
<p>No — deleted tweets are gone and won't appear. If you deleted tweets before, they are permanently removed.</p>

<h3>How often is the archive generated?</h3>
<p>Each time you request it, X generates a fresh copy. A good cadence is every 3-6 months for a routine check.</p>

<h3>Can I just upload tweets.js instead of the whole folder?</h3>
<p>Yes — tweets.js holds all the text data and is what a check tool mainly uses; media files don't affect the scan.</p>
`,
  },
  {
    slug: 'whats-inside-x-archive-tweets-js',
    title: '归档文件里到底有什么？tweets.js 大揭秘',
    excerpt:
      'X 数据归档解压后，tweets.js 是最重要的文件——里面是全部推文的结构化数据。本文拆解它的内部格式（window.YTD.tweets 数组、每条的 createdAt/full_text/entities 字段），以及它如何支撑隐私体检。',
    date: '2026-08-06',
    updatedAt: '2026-08-06',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', 'tweets.js', '数据归档', '隐私体检'],
    canonical: '/blog/whats-inside-x-archive-tweets-js',
    titleEn: "What's Inside the X Archive? tweets.js Explained",
    excerptEn:
      'After you download your X archive, tweets.js is the file that matters — structured JSON of every tweet you ever posted. This post breaks down its internal format and how a privacy check reads it.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'tweets.js', 'data archive', 'privacy check'],
    content: `
<p>X（Twitter）数据归档解压后你会看到一堆文件，但真正藏着你全部隐私痕迹的是 <strong>tweets.js</strong>。这篇把它彻底拆开：里面长什么样、每个字段什么意思、以及为什么隐私体检只看它就够。</p>

<h2>tweets.js 是什么</h2>
<p>它是 X 官方导出的<strong>全部推文的结构化数据</strong>，格式是 JavaScript 赋值语句：<code>window.YTD.tweets.part0 = [ ... ]</code>，括号里是一个数组，数组里每个对象代表一条推文。隐私体检工具就是解析这个数组。</p>

<h2>每条推文里有什么</h2>
<ul>
  <li><strong>created_at</strong>——发布时间（UTC 字符串，例如 "Fri Jan 15 02:45:00 +0000 2010"）</li>
  <li><strong>full_text</strong>——推文全文，手机号、邮箱、住址等风险内容主要藏在这里</li>
  <li><strong>entities</strong>——URL、媒体、提及的结构化引用（截图里的网址也在此）</li>
  <li><strong>id_str</strong>——推文唯一 ID，删除操作按它定位</li>
  <li><strong>retweeted_status / in_reply_to_status_id</strong>——转发、回复的关联信息</li>
</ul>

<h2>为什么它支撑隐私体检</h2>
<p>体检原理很简单：逐条扫描 <code>full_text</code> 和 <code>entities</code>，用正则与规则匹配手机号、邮箱、地址、定位和敏感话题，给每条推文打风险标签（<code>phone</code>/<code>address</code>/<code>location</code>/<code>sensitive</code>），再汇总成 0-100 健康评分。整个过程在<strong>你本机</strong>完成，tweets.js 不出你的电脑。</p>

<h2>归档里还有哪些文件</h2>
<ul>
  <li><strong>data/ 目录</strong>——图片、视频、头像等媒体（不影响文本扫描）</li>
  <li><strong>account.js</strong>——账号资料（用户名、创建时间、邮箱前缀掩码）</li>
  <li><strong>following.js / follower.js</strong>——关注与被关注列表</li>
  <li><strong>direct-messages.js</strong>——私信（同样含敏感内容）</li>
</ul>

<h2>常见问题（FAQ）</h2>

<h3>tweets.js 能直接打开看吗？</h3>
<p>可以，但建议用工具解析——文件可能几 MB 到几十 MB，人眼翻不完。交给数字足迹体检，几分钟出结果。</p>

<h3>tweets.js 包含已删除的推文吗？</h3>
<p>包含<strong>你删除之前</strong>的推文。归档是你账号在导出时刻的快照，已删推文若在导出前删掉就不在内；但更早的、平台 3,200 条限制之外的历史推文，这里都有。</p>

<h3>只上传 tweets.js 够吗？</h3>
<p>够。隐私体检的核心是文本扫描，tweets.js 包含全部文本与 URL；媒体文件不参与扫描。</p>
`,
    contentEn: `
<p>After you unzip your X archive, the file that actually matters is <strong>tweets.js</strong> — structured data of every tweet you've ever posted. This post opens it up: what the format looks like, what each field means, and why a privacy check only needs this one file.</p>

<h2>What tweets.js is</h2>
<p>It's X's official export of your full tweet history as structured data. The format is a JavaScript assignment: <code>window.YTD.tweets.part0 = [ ... ]</code> — an array where each object is one tweet. A privacy-check tool parses this array.</p>

<h2>What's inside each tweet</h2>
<ul>
  <li><strong>created_at</strong> — posting time (UTC string, e.g. "Fri Jan 15 02:45:00 +0000 2010")</li>
  <li><strong>full_text</strong> — the tweet body; phone numbers, emails and addresses mostly hide here</li>
  <li><strong>entities</strong> — structured references to URLs, media, mentions</li>
  <li><strong>id_str</strong> — unique tweet ID; deletions target it</li>
  <li><strong>retweeted_status / in_reply_to_status_id</strong> — retweet and reply links</li>
</ul>

<h2>Why it powers a privacy check</h2>
<p>The check is simple: scan <code>full_text</code> and <code>entities</code> tweet by tweet, match phones, emails, addresses, locations and sensitive topics, tag each tweet (<code>phone</code>/<code>address</code>/<code>location</code>/<code>sensitive</code>), then roll everything into a 0-100 health score. All of it runs <strong>on your device</strong> — tweets.js never leaves your computer.</p>

<h2>What else is in the archive</h2>
<ul>
  <li><strong>data/ folder</strong> — images, videos, profile media (irrelevant to text scanning)</li>
  <li><strong>account.js</strong> — profile info (handle, creation date, masked email prefix)</li>
  <li><strong>following.js / follower.js</strong> — follow lists</li>
  <li><strong>direct-messages.js</strong> — DMs (equally sensitive)</li>
</ul>

<h2>FAQ</h2>

<h3>Can I open tweets.js directly?</h3>
<p>You can, but a tool is better — the file can be several MB to tens of MB. Hand it to a digital footprint check and get results in minutes.</p>

<h3>Does tweets.js include deleted tweets?</h3>
<p>It includes anything that existed at export time. The archive is a snapshot — tweets deleted before export won't appear, but the old history beyond X's ~3,200-tweet delete limit is all there.</p>

<h3>Is uploading just tweets.js enough?</h3>
<p>Yes. The check is text-based; tweets.js has all the text and URLs, and media files don't affect the scan.</p>
`,
  },
  {
    slug: 'why-can-you-only-delete-3200-tweets',
    title: '为什么只能删 3,200 条？X 的硬限制与破解',
    excerpt:
      'X 的删除接口只允许你动最近 3,200 条推文，更早的历史推文在界面上"删不到"。但你的数据归档里有全部历史——用归档批量删除，就是绕过这堵墙的正规路子。',
    date: '2026-08-07',
    updatedAt: '2026-08-07',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '3200 限制', '批量删推', '数据归档'],
    canonical: '/blog/why-can-you-only-delete-3200-tweets',
    titleEn: 'Why Can You Only Delete 3,200 Tweets? The Wall and How to Beat It',
    excerptEn:
      'X\'s delete path only touches your most recent 3,200 tweets — older history is unreachable in the UI. Your data archive contains everything, though, and batch-deleting from the archive is the legitimate way around the wall.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', '3200 limit', 'bulk delete', 'data archive'],
    content: `
<p>很多人第一次想清理自己 X（Twitter）账号的时候，都会撞上同一堵墙：<strong>3,200 条限制</strong>。界面里往前翻，最多翻到大约 3,200 条，再早的推文就好像不存在一样。删除操作也一样——你只能删最近这 3,200 条，更早的想删都删不到。这篇讲清这堵墙是怎么回事，以及怎么正规地绕过它。</p>

<h2>3,200 条限制到底卡在哪一层</h2>
<p>限制不在你的账号里，而在接口层。X 的公开接口（包括网页端和 App 用的那套）出于性能和商业考虑，只提供最近约 3,200 条推文的分页访问。你看到的"删完了"，只是把最近这 3,200 条删光了；更早的历史推文还在，只是没有入口。</p>
<p>注意区分：你的<strong>数据归档</strong>（Settings → Your account → Download an archive）里是全部历史，不受 3,200 限制。这也是为什么隐私体检工具能扫到十年前的老推文——它读的是归档，不是网页。</p>

<h2>为什么这堵墙值得认真对待</h2>
<ul>
  <li>老推文是隐私重灾区：十年前随手发的手机号、住址、打卡定位，现在还挂在网上</li>
  <li>搜索引擎会索引旧推文：招聘方、背景调查方搜得到你早已忘记的内容</li>
  <li>手动删不现实：几千条推文逐条删，一天都删不完，而且永远删不到 3,200 条以外的</li>
</ul>

<h2>正规破解：用归档 + 批量删除</h2>
<p>绕过 3,200 限制的合法路径只有一条：先下载完整数据归档，从归档里拿到全部推文 ID，再对每一条调用删除接口。步骤是：</p>
<ol>
  <li><strong>下载归档</strong>：设置 → 你的账号 → 下载数据归档。X 打包可能需要几小时到一两天，做好心理准备</li>
  <li><strong>解析 tweets.js</strong>：归档里所有推文 ID 和全文都在这个文件里（详见我们之前写的 <a href="/blog/whats-inside-x-archive-tweets-js">tweets.js 拆解</a>）</li>
  <li><strong>批量删除</strong>：用脚本或工具按 ID 逐条删除。速度取决于 X 的接口限流，通常每分钟能删几十到几百条</li>
  <li><strong>验证</strong>：删完后重新下载一份归档，确认旧内容确实没了</li>
</ol>
<p>这一步之后，你的账号才是真正清空了——包括 3,200 条之外的旧账。</p>

<h2>常见问题（FAQ）</h2>

<h3>3,200 条限制会永久存在吗？</h3>
<p>短期内不会消失。这是接口设计层面的限制，除非 X 重做时间线 API，否则旧推文只能通过归档访问。</p>

<h3>删除后真的消失了吗？</h3>
<p>删除会从公开界面和搜索结果中移除；已删内容是否残留于第三方缓存属于另一个话题。至少你自己的账号层面是清干净了。</p>

<h3>批量删除会被封号吗？</h3>
<p>按正常速率逐条删除是合规操作，X 官方文档也支持通过 API 删除自己的推文。真正危险的是超高速率的第三方"清粉删推"工具，注意别用那些。</p>
`,
    contentEn: `
<p>The first time most people try to clean up their X (Twitter) account, they hit the same wall: the <strong>3,200 tweet limit</strong>. Scroll back far enough in the UI and the timeline simply stops around 3,200 tweets, as if the older ones never existed. Deletion works the same way — you can only delete the most recent 3,200, and anything older is unreachable. This post explains where the wall lives and how to get around it legitimately.</p>

<h2>Where the 3,200 limit actually sits</h2>
<p>The limit is not on your account. It lives at the API layer: X's public endpoints (including the ones the web app and mobile app use) only page through roughly the most recent 3,200 tweets, for performance and commercial reasons. When the UI says "you're caught up," it means the recent window is empty — older history still exists, it just has no entry point.</p>
<p>One important distinction: your <strong>data archive</strong> (Settings → Your account → Download an archive) contains your full history, with no 3,200 cap. That is why a privacy check tool can scan decade-old tweets — it reads the archive, not the web timeline.</p>

<h2>Why the wall is worth caring about</h2>
<ul>
  <li>Old tweets are privacy landmines: phone numbers, home addresses, and check-ins posted years ago are still live</li>
  <li>Search engines index old tweets: recruiters and background checkers can find things you forgot you posted</li>
  <li>Manual deletion is hopeless: thousands of tweets one by one, and it never reaches past 3,200 anyway</li>
</ul>

<h2>The legitimate workaround: archive + bulk delete</h2>
<p>There is exactly one legal path around the 3,200 wall: download your full archive, collect every tweet ID from it, then call the delete endpoint for each one. The steps:</p>
<ol>
  <li><strong>Download the archive</strong>: Settings → Your account → Download data archive. X can take hours to a couple of days to pack it — plan accordingly</li>
  <li><strong>Parse tweets.js</strong>: every tweet ID and full text lives in this file (see our <a href="/blog/whats-inside-x-archive-tweets-js">tweets.js deep dive</a>)</li>
  <li><strong>Bulk delete</strong>: run a script or tool that deletes by ID, respecting X's rate limits — typically tens to hundreds per minute</li>
  <li><strong>Verify</strong>: download a fresh archive afterwards and confirm the old content is actually gone</li>
</ol>
<p>After that, your account is truly clean — including everything beyond the 3,200 window.</p>

<h2>FAQ</h2>

<h3>Will the 3,200 limit ever go away?</h3>
<p>Not anytime soon. It is baked into the API design; unless X rebuilds the timeline endpoints, old tweets stay archive-only.</p>

<h3>Are deleted tweets really gone?</h3>
<p>Deletion removes them from public views and search results. Whether third-party caches still hold copies is a separate story — at the account level, though, you are clean.</p>

<h3>Can bulk deletion get me banned?</h3>
<p>Deleting your own tweets at a normal rate is supported by X's API and is not a violation. What gets accounts flagged is third-party tools that hammer the API at extreme speeds — avoid those.</p>
`,
  },
  {
    slug: 'digital-footprint-health-score',
    title: '0-100 健康评分：你的数字足迹有多"健康"',
    excerpt:
      '数字足迹体检的核心输出是一个 0-100 的健康评分：扣分项包括暴露的手机号、邮箱、住址、定位打卡和敏感话题。这篇讲评分怎么算、什么行为最扣分、以及怎么把分数救回来。',
    date: '2026-08-08',
    updatedAt: '2026-08-08',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '数字足迹', '健康评分', '隐私体检'],
    canonical: '/blog/digital-footprint-health-score',
    titleEn: 'Your 0-100 Score: How Healthy Is Your Digital Footprint?',
    excerptEn:
      'The core output of a digital footprint check is a 0-100 health score. Deductions come from exposed phone numbers, emails, home addresses, check-ins, and sensitive topics. This post explains how the score works, what costs you points, and how to get it back up.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'digital footprint', 'health score', 'privacy check'],
    content: `
<p>体检报告拿到手，第一个看的永远是那个数字：<strong>0-100 的数字化足迹健康评分</strong>。它把"我的旧推文有没有问题"这个模糊的问题，变成一个可以比较、可以追踪的分数。这篇讲清楚评分是怎么算出来的、哪些行为最扣分，以及把分数救回来要做什么。</p>

<h2>评分是怎么来的</h2>
<p>评分不是玄学，是对你 X 数据归档逐条扫描后的加权结果。工具会识别出推文里包含的隐私敏感信息，按风险等级扣分：</p>
<ul>
  <li><strong>高危险</strong>：手机号、家庭住址、身份证件号——单条就扣大头</li>
  <li><strong>中危险</strong>：邮箱、精确定位打卡、裸照类敏感内容</li>
  <li><strong>低危险</strong>：工作吐槽、政治/宗教观点、可推断出身份的信息</li>
</ul>
<p>0 分意味着账号里几乎全是公开敏感信息；100 分意味着扫描后没有发现明显的隐私暴露。多数人第一次扫描在 40-70 分之间——不是因为你"脏"，而是因为十年推文里总会攒下几颗雷。</p>

<h2>什么最扣分：一个真实分布</h2>
<table>
  <tr><th>风险类型</th><th>占比（典型账号）</th><th>单条扣分</th></tr>
  <tr><td>手机号</td><td>1-3%</td><td>重</td></tr>
  <tr><td>邮箱</td><td>2-5%</td><td>中</td></tr>
  <tr><td>住址/门牌</td><td>0.5-2%</td><td>重</td></tr>
  <tr><td>定位打卡</td><td>5-15%</td><td>中</td></tr>
  <tr><td>敏感话题</td><td>10-30%</td><td>轻</td></tr>
</table>
<p>注意：扣分看的是<strong>风险条数 × 风险等级</strong>，不是推文总量。一个 2014 年手滑发出的手机号，比一百条无关紧要的日常推文都更拉分。</p>

<h2>为什么 3,200 条限制让评分变得必要</h2>
<p>手动删除永远只碰得到最近 3,200 条，而风险最高的老推文恰恰在更早的历史里（详见我们之前写的 <a href="/blog/why-can-you-only-delete-3200-tweets">3,200 条限制拆解</a>）。体检读的是完整归档，所以评分覆盖全部历史——这也是"评分 + 批量删除"要配套用的原因：先让分数告诉你问题在哪，再按风险优先级清理。</p>

<h2>怎么把分数救回来</h2>
<ol>
  <li><strong>按风险排序删</strong>：先删手机号、住址这类高危险推文，分数回升最快</li>
  <li><strong>处理定位打卡</strong>：旅行晒图是重灾区，批量删掉打卡类推文</li>
  <li><strong>白名单保留</strong>：有纪念意义的推文留下，别一刀切</li>
  <li><strong>定期复查</strong>：每季度重新扫描一次，把新增的暴露及时清掉</li>
</ol>
<p>分数回到 90+ 并不是"完美"，而是"当前扫描没发现明显暴露"。数字足迹是动态的，评分是体检表，不是毕业证——保持定期复查的习惯，比追求一次性的 100 分更重要。想从零开始，先看这篇<a href="/blog/what-is-digital-footprint-check">数字足迹体检是什么</a>。</p>

<h2>常见问题（FAQ）</h2>

<h3>100 分代表绝对安全吗？</h3>
<p>不代表。它只说明扫描范围内没有发现已识别的敏感信息模式。第三方缓存、已删内容的残留属于另一个话题，评分覆盖的是你账号内仍然可见的内容。</p>

<h3>评分会因为我发新推文而变低吗？</h3>
<p>会。如果你新发的推文里又带了手机号、定位或敏感话题，分数会相应下降。这也是为什么建议定期复查，而不是只做一次。</p>

<h3>怎么知道哪条推文扣了分？</h3>
<p>体检报告会按风险标签列出具体推文和原文，并标出命中的敏感字段。你可以逐条核对后再决定删除，避免误删。</p>
`,
    contentEn: `
<p>The first thing anyone looks at in a footprint report is the number: a <strong>0-100 digital footprint health score</strong>. It turns the vague question "are my old tweets a problem?" into something you can compare and track over time. This post explains how the score is calculated, what costs you points, and what it takes to bring it back up.</p>

<h2>Where the score comes from</h2>
<p>The score is not a vibe. It is a weighted result of scanning your X archive tweet by tweet. The tool detects privacy-sensitive information and deducts points by risk level:</p>
<ul>
  <li><strong>High risk</strong>: phone numbers, home addresses, ID numbers — each one is a big deduction</li>
  <li><strong>Medium risk</strong>: emails, precise location check-ins, sensitive media</li>
  <li><strong>Low risk</strong>: workplace rants, political or religious opinions, anything that could identify you indirectly</li>
</ul>
<p>0 means your account is almost all exposed sensitive information; 100 means the scan found no obvious exposure. Most people land between 40 and 70 on their first scan. Not because you are "dirty" — because ten years of tweets always accumulate a few landmines.</p>

<h2>What costs the most: a typical distribution</h2>
<table>
  <tr><th>Risk type</th><th>Share (typical account)</th><th>Per-tweet deduction</th></tr>
  <tr><td>Phone number</td><td>1-3%</td><td>Heavy</td></tr>
  <tr><td>Email</td><td>2-5%</td><td>Medium</td></tr>
  <tr><td>Home address</td><td>0.5-2%</td><td>Heavy</td></tr>
  <tr><td>Location check-in</td><td>5-15%</td><td>Medium</td></tr>
  <tr><td>Sensitive topic</td><td>10-30%</td><td>Light</td></tr>
</table>
<p>Note that the score weighs <strong>risk count times risk level</strong>, not raw tweet volume. A phone number slipped out in 2014 costs more than a hundred harmless daily posts.</p>

<h2>Why the 3,200 limit makes the score necessary</h2>
<p>Manual deletion only ever touches the most recent 3,200 tweets, and the riskiest old content sits further back (see our <a href="/blog/why-can-you-only-delete-3200-tweets">3,200 limit deep dive</a>). A footprint check reads the full archive, so the score covers your whole history — which is why "score plus bulk delete" is the combo that works: let the score tell you where the problems are, then clean by risk priority.</p>

<h2>How to bring the score back up</h2>
<ol>
  <li><strong>Delete by risk first</strong>: phone numbers and addresses first, fastest recovery</li>
  <li><strong>Handle check-ins</strong>: travel posts are a minefield; batch-delete location-tagged tweets</li>
  <li><strong>Whitelist what matters</strong>: keep the tweets with real meaning to you</li>
  <li><strong>Re-check regularly</strong>: rescan quarterly and clear new exposures before they pile up</li>
</ol>
<p>Getting back above 90 does not mean "perfect," it means "no obvious exposure found in the current scan." A digital footprint is dynamic; the score is a checkup, not a diploma. Keeping a regular re-scan habit matters more than chasing a one-time 100. New to all this? Start with <a href="/blog/what-is-digital-footprint-check">what a digital footprint check is</a>.</p>

<h2>FAQ</h2>

<h3>Does 100 mean I am absolutely safe?</h3>
<p>No. It only means the scan found no recognized sensitive patterns in scope. Third-party caches and deleted-content residue are a separate story; the score covers what is still visible on your account.</p>

<h3>Can my score drop as I keep posting?</h3>
<p>Yes. New tweets with phone numbers, locations, or sensitive topics will lower it. That is why regular re-scans beat a one-time check.</p>

<h3>How do I know which tweet cost me points?</h3>
<p>The report lists flagged tweets by risk label with the original text and the matched sensitive field. You can review each one before deciding to delete, so you do not over-delete.</p>
`,
  },
  {
    slug: 'phone-number-in-tweets-check',
    title: '手机号暴露在推文里？体检怎么发现它',
    excerpt:
      '你的手机号可能就躺在一句十几年前的推文里，而你自己早就忘了。体检是怎么在几千条旧推文中找出它的？匹配逻辑、误报处理，以及发现后怎么办。',
    date: '2026-08-09',
    updatedAt: '2026-08-09',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '手机号', '隐私泄露', '数字足迹体检'],
    canonical: '/blog/phone-number-in-tweets-check',
    titleEn: 'Is Your Phone Number in Your Tweets? How the Check Finds It',
    excerptEn:
      'Your phone number may be sitting inside a tweet from a decade ago, and you have probably forgotten it exists. How the check finds it across thousands of old tweets, how it handles false positives, and what to do once it is found.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'phone number', 'privacy leak', 'footprint check'],
    content: `
<p>手机号是数字足迹里最危险的一类信息，因为它几乎无法回收：号码换不了，泄露了就是泄露了。而很多人不知道，自己的手机号可能就躺在一句十几年前的推文里——比如当年随手发过"打车打不到，谁打我电话 13X..."。这篇讲体检是怎么在几千条旧推文中把这种手机号找出来的，以及找到之后怎么办。</p>

<h2>体检怎么发现推文里的手机号</h2>
<p>逻辑比你想象的老实：体检会把每条推文的全文切成小块，然后跑两套匹配。第一套是格式识别，识别国际区号、号码分段和常见写法（包括用空格、短横线、括号分隔的变体）；第二套是上下文命中，比如"打我电话""call me""text me"+ 数字组合，这类推文即使格式不规范也会被捞出来。两套结果合并去重后，再按风险级别排序。</p>

<h2>误报是怎么处理的</h2>
<p>识别器会把一些不是手机号的数字也捞进来：订单号、账号 ID、电话号码列表里的座机号。处理方式是三层过滤：第一层排除明显过短或过长的数字串；第二层用号码库交叉验证区号和号段（比如区号不存在的直接判负）；第三层是把疑似项列进"待确认"清单，由你在报告里人工勾选，而不是直接当成泄露。所以报告的结论是"发现 N 条疑似，其中 M 条已确认"，不会一上来就吓你。</p>

<h2>找到之后怎么办</h2>
<ol>
  <li><strong>优先删掉确认的推文</strong>：手机号的扣分权重最高，删一条的收益大于删一百条普通推文</li>
  <li><strong>检查同账号的其他平台</strong>：同一个号码可能也在你的简介、置顶推文或回复里出现过，体检只扫推文正文</li>
  <li><strong>评估是否要换号</strong>：如果号码和实名信息绑定很深（银行、外卖、社交验证），删除推文足够；如果被骚扰或人肉过，才考虑换号</li>
  <li><strong>以后别发</strong>：发号前停三秒，这是唯一不需要补救的做法</li>
</ol>
<p>发现手机号在推文里只是第一步，删完之后记得重新体检一次确认干净。想先理解体检的整体逻辑，可以看 <a href="/blog/digital-footprint-health-score">0-100 健康评分</a> 那篇，或者从 <a href="/blog/what-is-digital-footprint-check">数字足迹体检是什么</a> 开始。</p>

<h2>FAQ</h2>

<h3>体检能识别带空格的手机号吗？</h3>
<p>能。识别器覆盖了空格、短横线、括号、国际区号等常见写法变体，不是只认纯数字连写。</p>

<h3>座机号会被误报成手机号吗？</h3>
<p>会有疑似项，但会被区号、号段交叉验证过滤，剩下无法确认的会进入"待确认"清单由你勾选，不会直接定性为泄露。</p>

<h3>删掉手机号推文后我的号码还安全吗？</h3>
<p>公开渠道删掉后，主要的搜索路径就断了。第三方缓存和存档站点是另一回事，但账号层面的暴露已经被清除。</p>
`,
  },
  {
    slug: 'address-location-tweets-risk',
    title: '住址与定位：最危险的一类旧推文',
    excerpt:
      '定位推文的危险在于它是"可叠加的"：一条定位 + 一条工作 + 一条生日，生活半径就拼出来了。体检怎么识别这类推文、为什么它们最危险、以及怎么清理。',
    date: '2026-08-10',
    updatedAt: '2026-08-10',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '定位', '住址', '数字足迹体检'],
    canonical: '/blog/address-location-tweets-risk',
    titleEn: 'Addresses and Locations: The Riskiest Old Tweets',
    excerptEn:
      'Location tweets stack: one location tweet plus one work tweet plus one birthday tweet maps your life radius. How the check finds them, why they are riskier than they look, and how to clean up.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'location', 'address', 'footprint check'],
    content: `
<p>如果说手机号是数字足迹里最贵的一类信息，那 location in tweets 就是最危险的一类。原因很简单：手机号泄露是"号码被知道了"，住址泄露是"你家被知道了"。一条十年前随手发的定位推文，配合其他公开信息，足以把一个人从互联网上"找出来"。这篇讲体检怎么识别这类推文、为什么它们最危险、以及怎么清理。</p>

<h2>为什么定位推文比想象中危险</h2>
<p>先看一个常见误区：很多人觉得"我又没发过家庭住址"。但推文里的定位不一定是文字，还有三种隐蔽形态：</p>
<ul>
  <li>平台定位标签：发推时附带的 GPS 坐标，精确到街区和时间</li>
  <li>照片 EXIF：手机照片自带拍摄地点，部分平台的缩略图会暴露</li>
  <li>文本里的位置：随口一句"刚从 XX 小区门口路过""在 XX 医院陪床"，都是线索</li>
</ul>
<p>单独看每一条都很"普通"，但组合起来就是一张移动轨迹。address in tweets 的危险在于它是"可叠加的"：一条定位推文 + 一条工作相关推文 + 一条生日相关推文，你的生活半径就拼出来了。</p>

<h2>体检怎么识别定位类推文</h2>
<p>识别逻辑分三层：</p>
<ol>
  <li><strong>坐标与标签</strong>：直接命中推文自带的 GPS 定位标签和地点标签</li>
  <li><strong>地点名匹配</strong>：识别文本中的省市、街道、小区、地标名称，与常用地点库比对</li>
  <li><strong>时间-地点关联</strong>：把定位推文与同一时段的其他推文关联，判断这条推文暴露的是"路过"还是"常驻"</li>
</ol>
<p>第三层最关键：在某个城市出差一周的定位推文，和连续 20 条深夜发在同一个小区附近的推文，风险等级完全不同。体检按"常驻地点"和"一次性地点"分开标注，而不是一刀切。</p>

<h2>清理优先级：先动这三类</h2>
<table>
  <tr><th>优先级</th><th>推文类型</th><th>为什么</th></tr>
  <tr><td>高</td><td>家庭住址相关（小区/楼栋/门牌）</td><td>直接暴露常驻地点，配合快递、外卖信息可定位到人</td></tr>
  <tr><td>高</td><td>工作地点 + 通勤路线</td><td>暴露每日行踪规律，容易推算上下班时间</td></tr>
  <tr><td>中</td><td>度假定位（含"不在家"信号）</td><td>等于公开告诉别人你家空着</td></tr>
  <tr><td>低</td><td>公共场所打卡（餐厅、景点）</td><td>暴露的是过去，风险可控</td></tr>
</table>

<h2>清理之后还要做什么</h2>
<p>删推文只是第一步。定位信息会被复制：第三方存档、截图、搜索引擎缓存。所以删完后：</p>
<ol>
  <li>在 X 的隐私设置里关闭"显示位置"默认开关，防止新推文继续带定位</li>
  <li>检查照片上传设置，关闭照片地理位置信息</li>
  <li>重新体检一次，确认没有残留的定位类推文</li>
</ol>
<p>把体检当作月度习惯，而不是一次性的"大扫除"。数字足迹是持续产生的，检查也要持续。</p>

<h2>FAQ</h2>

<h3>推文定位标签删掉推文就彻底消失了吗？</h3>
<p>账号层面是的，但第三方存档（如 archive.org）和搜索引擎缓存可能还有残留。删除后做一次搜索自查，发现残留可以申请从存档移除。</p>

<h3>体检能识别图片里的定位吗？</h3>
<p>目前体检主要覆盖文本和推文元数据中的定位信息，图片 EXIF 需要结合照片元数据检测，属于更高阶的能力，正在迭代中。</p>

<h3>我没发过定位，也需要担心吗？</h3>
<p>需要。文本里的地名、照片位置、平台自动添加的定位标签都可能暴露位置，未必是你主动发的。建议做一次全量体检，看看"你以为的没有"和"实际上的有"差多少。</p>

<h3>删掉定位推文会影响账号吗？</h3>
<p>不会。删除推文不影响账号状态、粉丝和关注列表，只是内容不再公开可见。</p>

<p>删完定位推文之后，记得做一次完整体检确认干净。想先理解体检的整体逻辑，可以看 <a href="/blog/digital-footprint-health-score">0-100 健康评分</a> 那篇，或者从 <a href="/blog/what-is-digital-footprint-check">数字足迹体检是什么</a> 开始。如果你还没处理过手机号类推文，先看 <a href="/blog/phone-number-in-tweets-check">手机号暴露在推文里</a> 那篇，这两类是最值得优先清理的。</p>
`,
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}
