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
  /** Bilingual FAQ (used to render a FAQ section + FAQPage JSON-LD). */
  faq?: {
    q: string;
    a: string;
    qEn: string;
    aEn: string;
  }[];
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
    faq: [
      { q: "什么是数字足迹体检？", a: "数字足迹体检是自动化的隐私审计：上传你的 X 数据归档（ZIP），工具在本机解析每一条推文，扫描手机号、邮箱、地址、定位和敏感话题，输出 0-100 健康评分与风险清单。", qEn: "What is a digital footprint check?", aEn: "A digital footprint check is an automated privacy audit. You upload your X data archive (ZIP) and the tool parses every tweet on your own device, scanning for phone numbers, emails, addresses, locations and sensitive topics, then outputs a 0-100 health score and a prioritized risk list." },
      { q: "数字足迹体检免费吗？", a: "体检本身完全免费且只读，不会删除任何内容。只有当你决定清理时，才按需付费删除风险推文，支持暂停、恢复和退款。", qEn: "Is a digital footprint check free?", aEn: "Yes — the check itself is completely free and read-only; it never deletes anything. Only when you decide to clean up do you pay per tweet for deletion, which is pauseable, resumable and refundable." },
      { q: "体检会删除我的推文吗？", a: "不会。体检只做分析和评分，删除是独立、可选、按条计费的步骤，完全由你决定。", qEn: "Does the check delete my tweets?", aEn: "No. The check only analyzes and scores. Deletion is a separate, optional, per-tweet step that you control entirely." },
    ],
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
    faq: [
      { q: "能删除 3,200 条之前的旧推文吗？", a: "可以。X 官方界面只允许删除最近约 3,200 条推文，但通过解析 X 数据归档，可以触达并批量清理 3,200 条之前的全部历史推文。", qEn: "Can I delete tweets older than 3,200?", aEn: "Yes. X's official interface only lets you delete your most recent ~3,200 tweets, but by parsing your X data archive you can reach and batch-delete tweets older than the 3,200 wall." },
      { q: "批量删除要多久？", a: "取决于推文数量和 X 的接口限速。工具支持暂停/恢复，删除按条计费，可随时中断而不丢进度。", qEn: "How long does bulk deletion take?", aEn: "It depends on tweet count and X API rate limits. The tool is pauseable and resumable, billed per tweet, so you can interrupt at any time without losing progress." },
      { q: "批量删除安全吗？", a: "安全。删除走你本人的 X 授权，工具不会读取或存储无关数据；删除操作可暂停、可恢复、可退款。", qEn: "Is bulk tweet deletion safe?", aEn: "Yes. Deletion runs through your own X authorization, the tool does not read or store unrelated data, and the process is pauseable, resumable and refundable." },
    ],
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
    faq: [
      { q: "怎么下载 X 数据归档？", a: "在 X 网页版进入 设置 → 你的账户 → 下载数据归档，选择\"全部数据\"并确认，X 会打包你的完整推文历史为 ZIP 文件，准备完成后邮件通知下载。", qEn: "How do I download my X data archive?", aEn: "On X web: Settings → Your account → Download an archive of your data. Choose \"all data\", confirm, and X will package your full tweet history into a ZIP; you get an email when it is ready to download." },
      { q: "X 准备归档要多久？", a: "通常从几分钟到 24 小时不等，取决于账户历史数据量；数据量大的老账户可能更久。", qEn: "How long does X take to prepare the archive?", aEn: "Usually anywhere from a few minutes to 24 hours depending on account history size; older, larger accounts can take longer." },
      { q: "归档是什么格式？", a: "X 返回一个 ZIP 压缩包，内含 HTML 页面和 tweets.js 等数据文件，所有推文以 JSON 形式存在 tweets.js 中。", qEn: "What format is the X archive in?", aEn: "X returns a ZIP file containing HTML pages and data files such as tweets.js, where all tweets are stored as JSON." },
    ],
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
    faq: [
      { q: "X 归档里的 tweets.js 是什么？", a: "tweets.js 是归档中的数据文件，以 JSON 数组形式记录你发过的每一条推文的完整字段（时间、文本、ID 等），是解析历史推文的核心文件。", qEn: "What is tweets.js in the X archive?", aEn: "tweets.js is the data file inside the archive that records every tweet you ever posted as a JSON array — timestamp, text, ID and more. It is the core file for parsing your history." },
      { q: "tweets.js 包含已删除的推文吗？", a: "不包含。归档只含归档生成时刻仍然存在的推文；已删除的内容不会出现在 tweets.js 中。", qEn: "Does tweets.js include deleted tweets?", aEn: "No. The archive only contains tweets that still exist at the time it was generated; deleted content does not appear in tweets.js." },
      { q: "我能自己读取 tweets.js 吗？", a: "可以，但文件可能非常大且结构不友好。用体检工具解析更省事：自动提取文本、时间、风险标签并生成可筛选的清单。", qEn: "Can I read tweets.js myself?", aEn: "Technically yes, but the file can be huge and awkward to parse. A footprint check tool is easier: it extracts text, timestamps and risk labels automatically into a filterable list." },
    ],
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
    faq: [
      { q: "为什么 X 限制只能删除 3,200 条推文？", a: "这是 X 官方界面的硬性限制：无论是网页、App 还是官方 API，都只暴露最近约 3,200 条推文供管理，更早的推文只能通过数据归档触达。", qEn: "Why does X limit deletion to 3,200 tweets?", aEn: "It is a hard limit of X's official interface: web, app and API only expose your most recent ~3,200 tweets for management. Older tweets can only be reached through your data archive." },
      { q: "如何删除超出 3,200 条的推文？", a: "下载 X 数据归档 → 解析归档（覆盖全部历史）→ 选择要删除的风险推文 → 通过授权批量删除。这是目前唯一能清理全部历史的合规途径。", qEn: "How can I delete tweets beyond the 3,200 limit?", aEn: "Download your X archive → parse it (covers your entire history) → select risky tweets → batch-delete them through your own authorization. This is the only compliant way to clean up beyond the limit." },
      { q: "X 以后会移除 3,200 条限制吗？", a: "目前没有官方消息。在限制解除之前，归档 + 批量删除仍是清理全部历史推文的唯一可靠方案。", qEn: "Will X ever remove the 3,200 limit?", aEn: "There is no official word. Until it is lifted, archive parsing plus batch deletion remains the only reliable way to clean up your full history." },
    ],
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
    faq: [
      { q: "数字足迹健康分是怎么计算的？", a: "工具逐条扫描推文中的手机号、邮箱、地址、定位和敏感话题，按风险类型与数量加权扣分，最终映射为 0-100 的健康分：越高越安全。", qEn: "How is my digital footprint health score calculated?", aEn: "The tool scans every tweet for phone numbers, emails, addresses, locations and sensitive topics, deducts points weighted by risk type and volume, and maps the result to a 0-100 score — the higher, the safer." },
      { q: "多少分算健康？", a: "一般 80 分以上视为较健康；60-79 分存在中风险痕迹需要关注；60 分以下建议优先清理高风险推文（手机号、住址、定位）。", qEn: "What is a good digital footprint score?", aEn: "Roughly: 80+ is fairly healthy; 60-79 shows medium-risk traces worth attention; below 60 means you should prioritize deleting high-risk tweets (phone numbers, addresses, locations)." },
      { q: "怎么提升我的分数？", a: "优先删除高风险类别（联系方式、家庭地址、行程打卡），再处理敏感话题内容；清理后可重新解析归档复查分数变化。", qEn: "How can I improve my score?", aEn: "Delete the highest-risk categories first (contact info, home addresses, travel check-ins), then handle sensitive-topic content. Re-parse your archive afterwards to verify the score change." },
    ],
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
    faq: [
      { q: "工具如何识别推文里的手机号？", a: "使用针对全球常见号码格式（国家码、区号、号码长度）的正则与启发式匹配，在本机扫描推文文本和图片 EXIF 元数据。", qEn: "How does the check find phone numbers in tweets?", aEn: "It uses regex and heuristic matching for common global number formats (country codes, area codes, digit lengths), scanning tweet text and image EXIF metadata entirely on-device." },
      { q: "推文里的手机号有什么风险？", a: "手机号是诈骗、骚扰、社工攻击的直接入口：骗子可借此做号码反查、精准钓鱼，甚至用于账号接管。", qEn: "Why is a phone number in a tweet risky?", aEn: "A phone number is a direct entry point for scams, harassment and social engineering: attackers can reverse-lookup it, run targeted phishing, or use it in account takeover attempts." },
      { q: "发现手机号在旧推文里怎么办？", a: "立即删除含手机号的推文；若号码已被搜索引擎收录，可同步提交 Google 移除请求并留意后续社工钓鱼。", qEn: "What should I do if my phone number is in an old tweet?", aEn: "Delete the tweet containing it immediately. If search engines already indexed it, submit a Google removal request and stay alert for follow-up phishing." },
    ],
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
    faq: [
      { q: "为什么定位类推文最危险？", a: "家庭住址、公司地址、旅行打卡等定位信息会暴露你的现实活动轨迹，带来真实世界的人身安全风险，也是社工攻击的素材。", qEn: "Why are location tweets risky?", aEn: "Home addresses, office addresses and travel check-ins expose your real-world movement patterns, creating physical safety risks and material for social engineering." },
      { q: "怎么找出归档里的地址推文？", a: "体检工具按\"地址/定位\"风险标签自动过滤，并结合关键词（家、住、公司、搬到了、XX 路等）与坐标元数据定位相关推文。", qEn: "How do I find address tweets in my archive?", aEn: "The check filters by an \"address/location\" risk label, combining keywords (home, moved to, office, street names) with coordinate metadata to locate relevant tweets." },
      { q: "推文的定位标签能单独移除吗？", a: "X 不提供批量移除历史定位标签的功能；可行做法是删除含定位的旧推文，今后发布时关闭位置标签。", qEn: "Can X location tags be removed individually?", aEn: "X offers no bulk removal of historical location tags. The practical approach is deleting old location tweets, and turning off location tagging for future posts." },
    ],
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
  },  {
    slug: 'on-device-analysis-privacy',
    title: '体检报告 100% 本机生成，这意味着什么',
    excerpt:
      '你的 X 数据归档（tweets.js）解析时，文件有没有离开你的电脑？Digital Footprint Health 的 on-device analysis 方案：全部解析在本机完成，tweets.js 不上传、不落盘、不经过任何服务器。这篇讲清楚"本机生成"到底意味着什么。',
    date: '2026-08-11',
    updatedAt: '2026-08-11',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '本机解析', '隐私体检', 'tweets.js'],
    canonical: '/blog/on-device-analysis-privacy',
    faq: [
      { q: "\"100% 本机分析\"是什么意思？", a: "你的 X 归档在浏览器/本机完成解析与扫描，数据不上传到任何服务器；只有你主动执行删除时，才调用 X 官方写入接口。", qEn: "What does 100% on-device analysis mean?", aEn: "Your X archive is parsed and scanned locally in your browser — the data never touches any server. Only when you explicitly delete does the tool call X's official write API." },
      { q: "我的 X 归档会传到服务器吗？", a: "不会。归档解密与扫描全部在本机进行，工具不存储、不上传你的推文内容。", qEn: "Is my X archive uploaded to a server?", aEn: "No. Decryption and scanning happen entirely on your device; the tool does not store or upload your tweet content." },
      { q: "分析期间我的数据如何保护？", a: "归档在本机加密存储，密钥永不离开你的设备；删除请求仅携带必要的推文 ID 走官方授权接口。", qEn: "How is my data protected during analysis?", aEn: "The archive is stored locally with encryption whose key never leaves your device. Deletion requests only carry the necessary tweet IDs through official authorized APIs." },
    ],
    titleEn: '100% On-Device Analysis: What It Means for You',
    excerptEn:
      'When your X archive (tweets.js) gets parsed, does the file leave your computer? Digital Footprint Health runs on-device analysis: the entire parse happens locally, tweets.js is never uploaded, stored, or routed through any server. Here is what that actually means.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'on-device analysis', 'privacy scan', 'tweets.js'],
    content: `
<p>你的 X 数据归档（tweets.js）解析时，文件有没有离开你的电脑？这是隐私体检最核心的分水岭。Digital Footprint Health 的 on-device analysis 方案，全部解析在本机完成，tweets.js 不上传、不落盘、不经过任何服务器。这篇讲清楚"本机生成"到底意味着什么，以及为什么这对隐私保护是质变。</p>

<h2>什么是 100% 本机解析</h2>
<p>大多数在线服务处理你的数据，流程是"上传 → 服务器解析 → 返回结果"。你的 tweets.js 会经过对方的服务器，哪怕对方承诺"不留存"，传输过程中文件也离开了你的控制。on-device analysis 完全不同：解析代码在你自己的浏览器里跑，文件从打开到出报告，全程没有离开过你的设备。</p>
<p>这意味着三点：没有上传就没有拦截的可能；没有服务器就没有留存的问题；没有传输就没有第三方拿到的机会。local analysis privacy 的本质，是把"信任某家公司"换成"不依赖任何公司"。</p>

<h2>为什么这对归档文件尤其重要</h2>
<p>X 数据归档（tweets.js）几乎是你网络生活的完整副本：每一条推文、时间、设备、可能的位置信息。这种文件一旦泄露，比单条推文泄露严重得多。把它交给一个"处理完就删"的在线服务，本质上是在赌对方的承诺。</p>
<p>本机解析直接把这个问题消解掉：文件不需要交给任何人，也就不存在"对方怎么处理"的环节。你的归档只和你的浏览器打交道，这是 no upload archive 模式的核心价值。</p>

<h2>本机解析和服务器解析的对比</h2>
<table>
  <tr><th>维度</th><th>本机解析（on-device）</th><th>服务器解析（cloud）</th></tr>
  <tr><td>文件是否离开设备</td><td>否</td><td>是</td></tr>
  <tr><td>是否存在服务器留存</td><td>不存在</td><td>取决于对方策略</td></tr>
  <tr><td>传输过程风险</td><td>无传输</td><td>有拦截/窃听面</td></tr>
  <tr><td>结果准确性</td><td>完全一致</td><td>完全一致</td></tr>
  <tr><td>适用场景</td><td>任何，尤其是高敏归档</td><td>需谨慎评估信任</td></tr>
</table>
<p>关键结论：两者对"解析结果"没有差异，差异全在数据安全边界上。既然结果一样，为什么不选边界更安全的那一个？</p>

<h2>本机解析还意味着什么</h2>
<ul>
  <li>无需注册账号：没有账号体系，就没有"数据与账号绑定"的问题</li>
  <li>可断网使用：解析只依赖浏览器能力，断网也能出报告</li>
  <li>结果即时：不用等服务器排队，几秒出结果</li>
  <li>无痕：不设云端报告存储，报告只在你的浏览器里</li>
</ul>

<h2>FAQ</h2>

<h3>本机解析真的完全不上传吗？</h3>
<p>是的。解析代码在浏览器本地运行，tweets.js 文件全程不离开你的设备。没有上传动作，就没有服务器介入。</p>

<h3>结果和云端解析一样准确吗？</h3>
<p>完全一样。解析逻辑相同，本机解析只是把执行位置从服务器搬到了浏览器，不影响结果准确性。</p>

<h3>我可以断网使用吗？</h3>
<p>可以。本机解析不依赖服务器，断网状态下同样能完成体检。</p>

<h3>报告会保存到哪里？</h3>
<p>报告只生成在浏览器内存和你的本地下载里，我们不提供云端报告存储，报告内容不会上传。</p>

<p>上传归档到 <a href="/">首页</a> 即可开始体检，数据不出你的电脑。想先理解体检的整体逻辑，看 <a href="/blog/what-is-digital-footprint-check">数字足迹体检是什么</a> 那篇。</p>
`,
    contentEn: `
<p>When your X archive (tweets.js) gets parsed, does the file leave your computer? That is the dividing line in privacy scanning. Digital Footprint Health runs <strong>on-device analysis</strong>: the entire parse happens locally, tweets.js is never uploaded, never stored, never routed through any server. This post explains what "generated on your machine" actually means, and why it changes the privacy calculus.</p>

<h2>What 100% on-device parsing means</h2>
<p>Most online services process your data as: upload, parse on server, return results. Your tweets.js passes through their servers, and even with a "we do not keep it" promise, the file left your control in transit. On-device analysis is different: the parsing code runs inside your own browser. From file open to report out, the data never leaves your device.</p>
<p>Three consequences follow. No upload means nothing to intercept. No server means nothing to retain. No transfer means no third party ever gets a handle on it. The essence of local analysis privacy is swapping "trust this company" for "depend on no company".</p>

<h2>Why this matters for archive files specifically</h2>
<p>An X data archive is close to a complete copy of your online life: every tweet, timestamp, device, possibly locations. A leak of that file is far more serious than a leaked single tweet. Handing it to an online service that promises to delete it after processing is essentially betting on that promise.</p>
<p>On-device parsing dissolves the problem: the file needs no intermediary, so there is no "how does the other side handle it" step. Your archive only ever talks to your browser. That is the core value of the no upload archive model.</p>

<h2>On-device vs server-side parsing</h2>
<table>
  <tr><th>Dimension</th><th>On-device</th><th>Cloud</th></tr>
  <tr><td>File leaves your device</td><td>No</td><td>Yes</td></tr>
  <tr><td>Server-side retention</td><td>None</td><td>Depends on their policy</td></tr>
  <tr><td>In-transit risk</td><td>No transfer</td><td>Interception surface</td></tr>
  <tr><td>Result accuracy</td><td>Identical</td><td>Identical</td></tr>
  <tr><td>Best fit</td><td>Any, especially sensitive archives</td><td>Only with careful trust review</td></tr>
</table>
<p>The key takeaway: the parse results are the same. The difference is entirely in the data-security boundary. When the output is identical, why not pick the safer boundary?</p>

<h2>What else on-device parsing means</h2>
<ul>
  <li>No account needed: no account system, no data tied to an identity</li>
  <li>Works offline: parsing relies on browser capability, reports generate without a network</li>
  <li>Instant results: no server queue, results in seconds</li>
  <li>No trail: no cloud report storage, the report lives only in your browser</li>
</ul>

<h2>FAQ</h2>

<h3>Does on-device analysis really never upload?</h3>
<p>Yes. The parsing code runs locally in your browser, and the tweets.js file never leaves your device. No upload action means no server involvement.</p>

<h3>Is the result as accurate as cloud parsing?</h3>
<p>Identical. The logic is the same; on-device just moves the execution from a server to your browser.</p>

<h3>Can I use it offline?</h3>
<p>Yes. On-device parsing does not depend on a server, so the scan works without a network connection.</p>

<h3>Where is my report stored?</h3>
<p>The report is generated in your browser memory and your local downloads. We do not offer cloud report storage, and report content is never uploaded.</p>

<p>Upload your archive on the <a href="/">homepage</a> to start the scan, your data never leaves your computer. New to the concept? Read <a href="/blog/what-is-digital-footprint-check">What Is a Digital Footprint Check</a> first.</p>
`,
  },  {
    slug: 'how-old-tweets-cost-people-jobs',
    title: '旧推文是如何"杀死"求职者的',
    excerpt:
      '一条多年前的推文，让候选人当场出局。旧推文翻车不是段子，是真实的招聘背景调查环节。这篇讲它怎么发生、HR 到底搜什么、以及你现在就该做的清理动作。',
    date: '2026-08-12',
    updatedAt: '2026-08-12',
    author: 'Digital Footprint Health Team',
    category: '求职安全',
    tags: ['旧推文', '求职', '背景调查', '数字足迹'],
    canonical: '/blog/how-old-tweets-cost-people-jobs',
    faq: [
      { q: "旧推文真的会导致丢工作吗？", a: "会。招聘方、HR 和背景调查机构会搜索候选人公开推文，一条多年前的种族/性别言论或对前雇主的吐槽，就可能导致 offer 撤回或解雇。", qEn: "Can old tweets really cost people jobs?", aEn: "Yes. Recruiters, HR and background-check firms search candidates' public tweets; one old racial/sexist remark or rant about a former employer can cost you an offer or your job." },
      { q: "雇主会真的搜索候选人的推文吗？", a: "会的。大量招聘流程包含社交媒体筛查（social media screening），公开推文是最容易获取的候选人信息源之一。", qEn: "Do employers really search candidates' tweets?", aEn: "Yes. Many hiring processes include social media screening, and public tweets are one of the easiest sources of candidate information." },
      { q: "怎么保护职业生涯不受旧推文影响？", a: "定期体检并清理高风险旧推文；删除前先评估、删除后提交搜索引擎移除；未来发布时避免争议性话题和可识别个人信息。", qEn: "How can I protect my career from old tweets?", aEn: "Run periodic checks and clean high-risk old tweets; request search-engine removal after deleting; and avoid controversial topics and identifying personal info in future posts." },
    ],
    titleEn: 'How Old Tweets Cost People Their Jobs',
    excerptEn:
      'One old tweet can end a job candidacy in a single click. Old tweets getting people fired is not a meme, it is a real part of modern hiring background checks. This post covers how it happens, what HR actually searches, and the cleanup moves you can make today.',
    content: `
<p>old tweets job 这四个词背后是一个真实的招聘场景：候选人简历漂亮、面试顺利，然后 HR 在背景调查环节搜了搜他的 X 账号，翻出一条三年前的推文，offer 没了。旧推文翻车不是段子，是 2026 年招聘流程里的一环。这篇讲它怎么发生、HR 到底搜什么、以及你现在就该做的清理动作。</p>

<h2>旧推文为什么会"杀死"求职</h2>
<p>招聘背景调查早就从"打电话给前雇主"扩展到了"搜遍公开社交"。X 的搜索框是其中最低成本的一环：输入候选人姓名，几秒内就能看到历史推文。多数 HR 不会刻意找茬，但他们会看三样东西：立场极端化、歧视性言论、以及和简历不符的言行。</p>
<p>问题在于推文的半衰期很长。X 的公开搜索索引保留着多年前的推文，而人的观点和处境会变。五年前开的一句没头没尾的玩笑，今天被断章取义地截图放进面试讨论里，你没有解释的机会。这就是 old tweets 求职事故的典型路径。</p>

<h2>HR 到底在搜什么</h2>
<ul>
<li>立场极端化：激进的政治或宗教言论，尤其是涉歧视的</li>
<li>言行不一致：公开吐槽前雇主、泄露工作内容、和简历宣称的人设冲突</li>
<li>不当行为：霸凌、骚扰、违法内容的痕迹</li>
</ul>
<p>注意：HR 搜的不是"完美无瑕"，是"风险信号"。哪怕只有一条高危推文，都会触发"再想想"的犹豫，而在候选人池足够大的岗位，犹豫就是出局。</p>

<h2>现在就该做的清理动作</h2>
<p>别慌，大部分人有救。第一步：以"招聘者视角"搜索自己。用几个不同关键词组合搜你的名字，看看公开能看到的都是什么。第二步：逐条清理高危内容——删除、设为仅自己可见、或者发一条澄清推文都行。第三步：把旧的私人账号和现在的主账号分开，或者彻底注销不用的旧号。</p>
<p>更主动的做法：在 X 数据归档里跑一次本地扫描。X 允许你导出完整数据归档，包含所有推文和元数据。在本地解析这份归档，你就能看到自己发过的每一条推文的完整历史，比在网页上翻页高效得多，也更彻底。</p>

<h2>数据归档扫描怎么做</h2>
<p>X 的归档导出包含 tweets.js 等文件，里面是全部历史推文的 JSON 数据。在本地解析它，可以按关键词、时间、互动量筛选出高风险推文。整个过程在本地完成，归档不出你的电脑，不涉及任何上传。这也是数字足迹健康检查的核心思路：先看清自己的足迹，再决定怎么清。</p>
<p>注意两个常见陷阱：一是旧推文的转发（quote）也可能被别人截图为证，删原推不等于销毁证据；二是改名不解决问题，X 的归档和搜索引擎快照仍可能关联到旧内容。</p>

<h2>长期策略：让新内容盖过旧内容</h2>
<p>清理是防守，持续发布高质量内容是进攻。求职季开始前 3-6 个月，持续在公开渠道输出与你目标岗位相关的内容：行业观点、项目复盘、专业分享。当 HR 搜索你时，看到的是这些，而不是那条三年前的玩笑。搜索引擎排序更看重新鲜和相关性，新内容自然会压过旧内容。</p>

<p>想知道自己的公开数字足迹是什么样？在<a href="/">首页</a>上传你的 X 数据归档，本地解析你的推文历史，看看哪些内容会成为招聘者的风险信号。数据全程留在你的电脑上。</p>
`,
    contentEn: `
<p>The phrase old tweets job describes a real hiring scenario: strong resume, smooth interviews, then HR digs up a three-year-old tweet during background checks and the offer evaporates. People getting hurt by old tweets is not a meme, it is a standard part of hiring in 2026. This post covers how it happens, what HR actually searches, and the cleanup moves you can make today.</p>

<h2>Why old tweets sink candidacies</h2>
<p>Background checks grew from "call the previous employer" to "search all public social media". X's search box is the cheapest step: type a candidate's name and their tweet history appears in seconds. Most HR people are not hunting for trouble, but they check three things: extreme positions, discriminatory language, and behavior that contradicts the resume.</p>
<p>The core problem is that tweets have a long half-life. X's public search index keeps tweets from years ago, while people's views and circumstances change. A throwaway joke from five years back gets screenshotted out of context and dropped into the interview discussion. You never get to explain. That is the typical path of an old tweet hiring incident.</p>

<h2>What HR actually searches for</h2>
<ul>
<li>Extreme positions: aggressive political or religious posts, especially discriminatory ones</li>
<li>Inconsistency: trashing a former employer, leaking work content, clashing with the resume persona</li>
<li>Misconduct: traces of bullying, harassment, or illegal behavior</li>
</ul>
<p>Note that HR is not hunting for "flawless", they are hunting for "risk signal". Even one high-risk tweet triggers a "let's think twice" hesitation, and in a deep candidate pool, hesitation is elimination.</p>

<h2>Cleanup moves you can make today</h2>
<p>Do not panic, most people are salvageable. Step one: search yourself from a recruiter's perspective. Run several keyword combos and see what is publicly visible. Step two: clean the high-risk content one by one, delete it, set it to followers-only, or post a clarifying thread. Step three: separate old personal accounts from your main one, or fully deactivate accounts you no longer use.</p>
<p>A more thorough approach: run a local scan of your X data archive. X lets you export your full archive including every tweet and its metadata. Parsing that archive locally shows you your complete tweet history, far more efficient than paging through the web UI, and more complete.</p>

<h2>How the archive scan works</h2>
<p>The X archive export includes files like tweets.js containing all your historical tweets as JSON. Parsing it locally lets you filter by keyword, time, and engagement to surface high-risk posts. The whole process runs on your machine, the archive never leaves your computer, nothing is uploaded. That is the core idea of a digital footprint health check: see your footprint first, then decide what to clean.</p>
<p>Two common traps: quote-tweets of your posts can be screenshotted by others, so deleting the original does not destroy the evidence; and changing your handle does not solve anything, archives and search snapshots can still link back to old content.</p>

<h2>The long game: let new content bury the old</h2>
<p>Cleaning is defense, consistent publishing is offense. In the 3-6 months before job season, keep publishing public content related to your target role: industry takes, project post-mortems, professional shares. When HR searches you, they see those, not the three-year-old joke. Search engines favor fresh and relevant, so new content naturally pushes old content down.</p>

<p>Curious about your public digital footprint? Upload your X archive on the <a href="/">homepage</a>, parse your tweet history locally, and see which posts would read as risk signals to a recruiter. The data stays on your computer the whole time.</p>
`,
  },  {
    slug: 'cancel-culture-101-old-tweets',
    title: '网红翻车学：被考古的推文有多可怕',
    excerpt:
      '一条五年前的推文，能让一个百万粉博主一夜掉粉。被考古的推文不是娱乐圈专属，任何有公开账号的人都可能中招。这篇讲翻车的完整路径、为什么"删了也没用"、以及怎么把风险按下来。',
    date: '2026-08-13',
    updatedAt: '2026-08-13',
    author: 'Digital Footprint Health Team',
    category: '社交安全',
    tags: ['旧推文', '翻车', '数字足迹', '社交账号'],
    canonical: '/blog/cancel-culture-101-old-tweets',
    faq: [
      { q: "什么是\"推文考古\"（tweet excavating）？", a: "指他人翻出你多年前的旧推文并传播，使其成为公众舆论靶子的行为，常见于社会事件、求职和声誉纠纷中。", qEn: "What is tweet excavating?", aEn: "It is when someone digs up your old tweets from years ago and spreads them, turning them into a public-relations target — common during controversies, job hunts and reputation disputes." },
      { q: "删除的推文还能被找到吗？", a: "可能。已被搜索引擎索引或他人截图保存的内容，删除后仍可能残留；所以清理越早越好，且删除后要请求搜索引擎移除。", qEn: "Can deleted tweets still be found?", aEn: "Possibly. Content already indexed by search engines or screenshotted by others can survive deletion — so clean up early and request search-engine removal afterwards." },
      { q: "怎么降低被\"冲\"的风险？", a: "尽早清理历史高风险推文、避免发表争议性言论、删除后可提交搜索引擎移除请求；保持账号内容与你的现实身份一致。", qEn: "How do I minimize my risk of being canceled?", aEn: "Clean high-risk tweets early, avoid controversial posts, request search-engine removal after deleting, and keep your account content consistent with your real identity." },
    ],
    titleEn: 'Cancel Culture 101: When Old Tweets Get Excavated',
    excerptEn:
      'One five-year-old tweet can tank a million-follower account overnight. Tweet excavation is not an influencer-only problem, anyone with a public account is exposed. This post covers the full pipeline, why deleting does not help, and how to press the risk down.',
    content: `
<p>old tweets cancel 的故事几乎每个月都在上演：某个博主或品牌账号被人翻出五年前、甚至十年前的一条推文，截图迅速传播，当事人连夜删号。被考古的推文听起来是娱乐圈的事，其实任何有公开账号的人都可能中招。这篇拆开翻车的完整路径，讲清楚为什么"删了也没用"，以及现在能做的风险管理。</p>

<h2>翻车是怎么发生的</h2>
<p>路径通常是这样：有人（可能是对手、前同事、或者单纯闲的网友）用关键词搜索挖出一张旧截图，发到传播快的平台，配上一句引导性的文案。转发滚起来后，媒体和营销号跟进，当事人开始被要求回应。整个过程从第一条截图到全网传播，往往不超过 48 小时。</p>
<p>被挖的推文有个共同特征：脱离语境后显得特别糟。当年的梗、当时的政治气候、你那时候的圈子，全都看不见了，只剩一行字被截出来。这解释了为什么很多翻车当事人喊冤：他们确实发过，但截图背后的上下文已经没有人关心。</p>

<h2>为什么"删了"没用</h2>
<ul>
<li>截图传播后，删除动作反而成了"认罪"证据，截图会更广地传</li>
<li>搜索引擎快照和第三方归档服务保存了历史版本，删原推不等于删除记录</li>
<li>下载过数据的账号手里有完整档案，随时可以再发一次</li>
</ul>
<p>换句话说，删除处理的是"源头"，但传播已经离开了源头。翻车一旦启动，你能控制的只剩回应方式，而不是内容本身。</p>

<h2>回应的正确姿势</h2>
<p>先别急着删号和写长文。翻车回应的第一原则是快但不过度：24 小时内给出简短、具体、不推卸的回应。承认发过，说明当时的语境，表达现在的立场，然后闭嘴。长篇道歉信在传播语境里只会被逐句拆解，继续喂给舆论。</p>
<p>第二个原则是别删评论区和转发。删评论会制造"心虚"的信号，而且截图工具会保留你删之前的记录。让讨论自然降温，比对抗传播更有效。</p>

<h2>怎么把风险按下来</h2>
<p>翻车不可预测，但风险可以管理。第一步：用几个不同关键词组合搜自己的公开账号，以"路人视角"看看能搜到什么。第二步：把高危内容清理一遍，删除或者设私密，尤其是有争议立场、歧视性内容、和职场冲突相关的推文。第三步：给旧账号和新账号划清界限，长期不用的旧号直接注销。</p>
<p>更系统一点的做法是导出账号数据归档，在本地扫描一遍历史推文，按关键词和时间筛出潜在风险项。整个过程在本地完成，不需要上传任何内容。这也是数字足迹健康检查的核心思路：先把自家院子扫一遍，再谈风险管理。</p>

<h2>长期视角：翻车免疫不存在，但可以降低概率</h2>
<p>任何人都有翻车的可能，因为人都会变，而互联网不让你变。能做的不是追求"永不出错"，而是让公开形象经得起考古：减少立场极端的内容、减少情绪化发言、定期清理旧内容、让新内容占比持续变大。搜索引擎排序看新鲜度和相关性，持续发布高质量内容，旧推文的排名自然会被压下去。</p>

<p>想知道自己的公开账号经不经得起考古？用 <a href="/">数字足迹健康检查</a> 从本机扫描你的数据归档，看看历史内容里藏着哪些风险项。</p>
`,
  },  {
    slug: 'anatomy-of-a-footprint-report',
    title: '体检报告长什么样？逐项解读每个风险标签',
    excerpt:
      '一份体检报告（footprint report）把几年旧推文压缩成隐私健康分加风险清单。这篇逐项解读每个板块，把手机号、邮箱、住址、定位、敏感话题等风险标签都翻译清楚，并告诉你该先清什么。',
    date: '2026-08-14',
    updatedAt: '2026-08-14',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['体检报告', '风险标签', '数字足迹', '隐私体检'],
    canonical: '/blog/anatomy-of-a-footprint-report',
    faq: [
      { q: "数字足迹体检报告包含什么？", a: "报告包含 0-100 健康评分、风险推文清单（按手机号/邮箱/地址/定位/敏感话题分类）、时间与关键词筛选器，以及清理优先级建议。", qEn: "What does a footprint report include?", aEn: "A 0-100 health score, a risk-tweet list categorized by phone/email/address/location/sensitive topic, filters by date and keyword, plus prioritized cleanup recommendations." },
      { q: "风险标签有什么区别？", a: "🔴 高风险（手机号、住址、定位）直接影响现实安全与诈骗风险；🟡 中风险（敏感话题、身份信息）影响求职与名誉。", qEn: "What is the difference between risk labels?", aEn: "🔴 High-risk (phone numbers, home addresses, locations) affects physical safety and scam exposure; 🟡 Medium-risk (sensitive topics, identity documents) affects jobs and reputation." },
      { q: "拿到报告后第一步做什么？", a: "先清理 🔴 高风险类别（联系方式、住址、定位），再处理敏感话题；清理完成可重新解析归档复查分数变化。", qEn: "What is the first step after getting my report?", aEn: "Delete the 🔴 high-risk categories first (contact info, addresses, locations), then handle sensitive topics. Re-parse your archive afterwards to verify the score change." },
    ],
    titleEn: 'Anatomy of a Footprint Report: Every Risk Label Decoded',
    excerptEn:
      'A footprint report turns years of old tweets into one privacy score and a list of flagged posts. This guide decodes every section and each risk label (phone, email, address, location, sensitive topic), and tells you what to clean first.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['footprint report', 'risk labels', 'digital footprint', 'privacy check'],
    content: `
<p>体检报告（footprint report）是你上传 X（Twitter）归档、跑完一次数字足迹体检后看到的第一样东西。它把你几年的旧推文压缩成一个隐私健康分，外加一份被标记的高风险推文清单。问题是，大多数人打开报告，看到"手机号""定位""敏感话题"这类标签，却根本不知道哪个真要紧。这篇就把一份体检报告的每个板块拆开讲，把每个风险标签都翻译清楚，让你知道该清什么，而不是瞎猜。</p>

<h2>一份体检报告到底由什么组成</h2>
<p>报告完全由你的 X 数据导出文件在本机解析生成，不会再去 X 服务器拉任何新数据。真正有分量的是两个数字：0-100 的健康分（越高越安全），以及按标签分组统计的被标记推文数量。往下是你会花最多时间的逐条推文列表。整个过程都在本地，这也是隐私体检的核心。</p>

<h2>体检报告解读：从上往下怎么看</h2>
<p>按顺序读报告最省时间。头部是健康分和总标记数；分类汇总把标记分组，让你一眼看出风险集中在联系方式、定位还是内容；推文列表按严重程度排序，最危险的排在前面；最后是筛选栏，可以按标签、年份、关键词收窄范围。如果你已经知道要找什么，直接跳到筛选栏。</p>

<h2>每个风险标签到底是什么意思</h2>
<p>下面是各标签的含义，以及大致该担心的程度：</p>
<table>
  <thead>
    <tr><th>风险标签</th><th>抓到什么</th><th>典型风险</th></tr>
  </thead>
  <tbody>
    <tr><td>手机号</td><td>推文正文或图片里的电话号码</td><td>高——诈骗和垃圾信息的直接入口</td></tr>
    <tr><td>邮箱</td><td>邮箱地址，包括已经弃用的</td><td>高——账号被盗风险</td></tr>
    <tr><td>住址</td><td>家庭或公司地址</td><td>高——现实安全</td></tr>
    <tr><td>定位</td><td>打卡、城市标签、出行帖</td><td>中——生活规律暴露</td></tr>
    <tr><td>敏感话题</td><td>吐槽前公司、政治、身份相关内容</td><td>中——求职与名誉</td></tr>
  </tbody>
</table>
<p>这些标签是模式匹配出来的猜测，不是判决。一条"打我电话 555"的玩笑被标成"手机号"，就是可以无视的误报；住址和邮箱的命中才是要认真处理的。</p>

<h2>风险标签在 Twitter 上为什么专挑旧推文</h2>
<p>报告标记出来的推文，绝大多数都是旧的。Twitter 把你的历史一直保留并能被搜索引擎索引，2015 年一条带旧住址的推文，今天照样能被 Google 搜到。所以报告翻出来的，往往是你早忘了发过的东西。风险标签盯的不是你现在发的，而是这些年一直公开挂在那里的历史。招聘者或陌生人能读到，而你完全不知道。</p>

<h2>该先处理哪些</h2>
<p>先动手机号、邮箱、住址这三类，它们是具体、可被利用的。定位次之，尤其是你发过固定日常路线的话。敏感话题帖在你求职或处在公众视角时最要紧，所以结合自己的情况权衡，别恐慌式全删。用筛选功能把真正危险的批量挑出来，剩下的再慢慢判断。</p>

<h3>体检报告会删东西吗？</h3>
<p>不会。报告是只读的，只告诉你有什么、风险多高。删除是另一个你主动选择的步骤，一条条来，随时能停。</p>

<h3>报告能离线打开吗？</h3>
<p>可以。解析在本机完成，不需要联网，报告也不会存到任何云端。</p>

<h3>风险标签准吗？</h3>
<p>够你行动，但不完美。模式匹配抓真实手机号和住址相当可靠，也会把玩笑式的引用一起标出来。清理前每条都看一眼。</p>

<h3>我的报告会被别人看到吗？</h3>
<p>不会。报告只存在你的浏览器内存和本机下载里，不上传，工具方也没有你归档的服务器副本。</p>

<p>想看看自己的体检报告长什么样？在 <a href="/">digital-footprint-health.shop 首页</a> 上传你的 X 归档，几分钟拿到隐私评分和带标签的风险清单，全程在本机处理，数据不出你的电脑。</p>
`,
    contentEn: `
<p>A footprint report is the first thing you see after running a digital footprint check on your X (Twitter) archive. It takes years of old tweets and boils them down to one privacy score plus a list of flagged posts. The catch is that most people open the report, see labels like phone, address, or sensitive topic, and have no idea which ones actually matter. This guide breaks down every section of a footprint report and decodes each risk label, so you can decide what to clean instead of guessing.</p>

<h2>What a footprint report is actually made of</h2>
<p>The report comes straight from your X data export, parsed on your own device. It does not pull anything new from X's servers. Two numbers do most of the work: a 0-100 health score where higher means safer, and a count of flagged tweets grouped by label. Underneath sits the per-tweet list, the part you'll spend real time in. None of it leaves your machine, which is the whole point of a privacy check.</p>

<h2>Report sections explained, top to bottom</h2>
<p>Read the report in order and you save time. The header shows the score and the total flagged count. The category breakdown groups those flags so you can see at a glance whether your risk is contact info, location, or content. The tweet list is sorted by severity, so the worst posts sit at the top. Last is a filter bar where you can narrow by label, year, or keyword. If you already know what you're hunting for, skip to the filter.</p>

<h2>Every risk label decoded</h2>
<p>Here is what each label means and roughly how worried you should be:</p>
<table>
  <thead>
    <tr><th>Risk label</th><th>What it catches</th><th>Typical risk</th></tr>
  </thead>
  <tbody>
    <tr><td>Phone</td><td>Phone numbers in tweet text or images</td><td>High: direct scam and spam entry</td></tr>
    <tr><td>Email</td><td>Email addresses, including old ones</td><td>High: account takeover attempts</td></tr>
    <tr><td>Address</td><td>Home or workplace addresses</td><td>High: real-world safety</td></tr>
    <tr><td>Location</td><td>Check-ins, city tags, travel posts</td><td>Medium: reveals your routine</td></tr>
    <tr><td>Sensitive topic</td><td>Rants about employers, politics, identity</td><td>Medium: hiring and reputation</td></tr>
  </tbody>
</table>
<p>These labels are guesses from pattern matching, not verdicts. A phone hit on a joke like "call me at 555" is a false positive you can ignore. The address and email hits are the ones to take seriously.</p>

<h2>Risk labels on Twitter and why old tweets get flagged</h2>
<p>Most posts a footprint report flags are old. Twitter keeps your history indexed for years, and a single 2015 tweet with your old address is still reachable through Google today. That's why the report surfaces tweets you forgot you posted. The risk labels on Twitter are not about what you post now; they're about what has sat public the whole time. A hiring manager or a stranger can read it without you ever knowing.</p>

<h2>What to fix first</h2>
<p>Start with phone, email, and address labels. Those are the concrete, exploitable ones. Location comes next if you posted a regular routine. Sensitive topic posts matter most when you're job hunting or in a visible role, so weigh them against your situation instead of deleting everything in a panic. Use the filters to batch the genuinely dangerous ones, then reconsider the rest.</p>

<h3>Does a footprint report delete anything?</h3>
<p>No. The report is read-only. It shows you what's there and scores the risk. Deleting is a separate step you choose, tweet by tweet, and you can stop at any time.</p>

<h3>Can I open the report offline?</h3>
<p>Yes. Parsing happens on your device, so the report works without a connection. Nothing about it is stored in the cloud.</p>

<h3>How accurate are the risk labels?</h3>
<p>Good enough to act on, not perfect. Pattern matching catches real phone numbers and addresses reliably, but it also flags joking references. Read each hit before you clean it.</p>

<h3>Is my report shared with anyone?</h3>
<p>No. The report lives in your browser memory and your local downloads. It is never uploaded, and there is no server copy of your archive.</p>

<p>Want to see your own footprint report? Upload your X archive on the <a href="/">digital-footprint-health.shop homepage</a> and get a privacy score plus a labeled risk list in minutes, all processed on your computer. Your data never leaves the device.</p>
`,
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}
