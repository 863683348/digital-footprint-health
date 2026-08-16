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
  {
    slug: 'which-tweets-to-clean-by-risk',
    title: '我该清理哪些推文？按风险优先级排序',
    excerpt:
      '两万条推文一条条看，人早就疯了。删推文不该靠感觉，该靠优先级：P0 直接暴露身份的今天就得清，P1 能画出生活轨迹的尽快处理，P2 对职业有影响的择机清理。这套分级框架帮你先删最危险的。',
    date: '2026-08-15',
    updatedAt: '2026-08-15',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '数字足迹', '推文清理', '风险优先级'],
    canonical: '/blog/which-tweets-to-clean-by-risk',
    faq: [],
    titleEn: 'Which Tweets Should You Clean? Rank by Risk',
    excerptEn:
      'Going through twenty thousand tweets one by one would drive anyone mad. Deleting tweets should not run on feelings; it should run on priority. This tiered framework ranks P0 identity-exposing tweets first, then P1 location-routine traces, then P2 career-sensitive posts, so you clean the dangerous ones first.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'digital footprint', 'tweet cleanup', 'risk priority'],
    content: `
    <p>上周有个朋友发来一张截图，是他 X 账号的隐私体检报告：7 年、两万三千条推文，红色高危标签挂了 61 处。他盯着屏幕问我："我总不能全删吧？到底该先删哪些？"</p>
    <p>这个问题特别实在。两万条推文一条条看，人早就疯了，而且大多数确实不用动。删推文不该靠感觉，该靠优先级。下面这套分级，是我自己扫完五万条历史推文以后总结出来的，你照着排就行。</p>
    <h2>P0：直接暴露身份的东西，今天就得清</h2>
    <p>这是最高风险等级，标准就一条：**陌生人拿到这条推文，能不能直接定位到"现实中的你"**。</p>
    <p>典型例子：</p>
    <ul>
    <li>手机号——哪怕只发过一次，哪怕是在回复里</li>
    <li>私人邮箱——尤其那种拼着自己真名的</li>
    <li>家庭住址、门牌号，或者"今晚收快递"这种暗示在家的推文</li>
    <li>证件照、身份证、护照、驾照的照片</li>
    <li>入职/离职时间配合实名公司名，能把你的档案拼出来</li>
    </ul>
    <p>判断标准很简单：删之前问自己一句，"发这条推的时候，我是不是忘了这世界上有陌生人在看？"如果答案是肯定的，P0。</p>
    <h2>P1：能画出你生活轨迹的，尽快处理</h2>
    <p>这一档的推文不直接暴露身份，但能拼出你的行动规律。风险标签会帮你把这类内容单独标出来。</p>
    <ul>
    <li>打卡式定位——"刚到虹桥站""在望京开会，堵死了"</li>
    <li>家庭地址周边——"楼下的煎饼摊""小区今晚停水"</li>
    <li>固定的通勤路线、常去的健身房和医院</li>
    <li>旅行行程——"周五飞东京，住新宿"</li>
    </ul>
    <p>单独一条没什么，攒起来就是一份很完整的行动地图。它们对应的风险标签通常和 location、行程相关，体检报告里会给你标好。</p>
    <h2>P2：跟人、跟事有关，容易反噬的</h2>
    <p>这一档更"软"，但麻烦起来更头疼。</p>
    <ul>
    <li>对前雇主、前同事的负面评价——你换工作了，下家 HR 会搜</li>
    <li>政治敏感发言、地域/性别/年龄段子的截图——脱离当时语境，会被单独拎出来</li>
    <li>跟别人吵架的旧推文，尤其是被转发过的</li>
    <li>吐槽合作方、供应商的，哪怕当时说的是对的</li>
    </ul>
    <p>判断标准换成："如果这条被单独截图发到新同事群里，我还能圆场吗？"不能就删。</p>
    <h2>P3：尴尬但无害的，看心情</h2>
    <p>中二时期的诗、深夜感伤、给爱豆转发的八百条物料。这类不构成实际风险，留着反而像人生痕迹，删不删纯看你心情。不过如果一条推文让你现在点开就脚趾抠地，删了也没坏处。</p>
    <h2>风险标签就是你的排序工具</h2>
    <p>不用自己一条条判断。上传 X 数据归档之后，体检报告会给每条高危推文打上风险标签（phone、email、address、location、sensitive 这些），评分从高到低排好。你要做的只是从 P0 开始往下扫，批量选中、删除，一分钟的事。</p>
    <h2>实际怎么操作：五分钟流程</h2>
    <p>说点具体的，别光看理论。整个清理过程我是这么走的：</p>
    <ol>
    <li>导出 X 数据归档（设置里能下，ZIP 文件，几十分钟到几小时不等）</li>
    <li>把 ZIP 拖进体检工具，等它本机解析完</li>
    <li>按 P0 过滤，先看那几条高危推文的原文，确认没有误判，全选删除</li>
    <li>顺手把 P1 里跟定位、住址相关的也清了</li>
    <li>P2 留到周末，心情好的时候一条条过，看到原文截图走人就删</li>
    </ol>
    <p>一共十分钟出头。别想着一次清完，P0、P1 先清零，这个账号的安全底线就立住了，剩下的慢慢来。</p>
    <p>关键点在于：**删除发生在你自己设备上，用你自己的账号凭证执行**。工具只负责把"该删什么"列出来，动手的还是你。这样既放心，也留得住后悔药——真要删错了，个别平台还有恢复窗口。</p>
    <p>优先级表：</p>
    <table><tr><td>等级</td><td>风险标签</td><td>典型内容</td><td>建议动作</td><td>例子</td></tr></table>
    <table><tr><td>P0</td><td>phone / email / identity</td><td>手机号、私人邮箱、证件照、住址</td><td>今天删，全部删</td><td>回复里贴过手机号</td></tr></table>
    <table><tr><td>P1</td><td>location / address</td><td>打卡定位、家庭周边、行程</td><td>一周内处理</td><td>"刚到虹桥站"</td></tr></table>
    <table><tr><td>P2</td><td>sensitive</td><td>前雇主吐槽、政治发言、骂战</td><td>一个月内清理</td><td>吐槽前同事被转发过</td></tr></table>
    <table><tr><td>P3</td><td>无高风险标签</td><td>中二旧推、深夜感伤</td><td>可选</td><td>十年前的诗</td></tr></table>
    <h2>常见问题</h2>
    <p>**Q：删掉以后就彻底消失了吗？**</p>
    <p>A：删除是生效的，但被截图、被存下来的内容你删不掉。所以重点永远是"别再留新的"。这也是为什么删完之后，建议把容易口嗨的类型记下来，发之前想两秒。</p>
    <p>**Q：有些推文我舍不得删，怎么办？**</p>
    <p>A：P0 和 P1 没有商量的余地。P2、P3 舍不得就留着，报告只提醒，不逼你。真正的自由是"能删"，不是"必须删"。</p>
    <p>**Q：批量删除会不会误删有用的？**</p>
    <p>A：按风险等级过滤后再选，基本不会。报告里每条高风险推文都带原文预览，先看再勾，别全选。</p>
    <p>**Q：为什么我之前删过，报告里还有？**</p>
    <p>A：你手动删的可能只是某条推文的一个版本，或者删得不彻底。体检基于整份归档重新解析，会把你以为已经删掉的东西重新翻出来。</p>
    <p>**Q：多久做一次体检合适？**</p>
    <p>A：新号可以半年一次，老账号建议一个季度。推文是持续生产的，报告只反映你上传那一刻的状态。</p>
    <h2>别让旧推文替你说话</h2>
    <p>你现在回头看五年前的中二发言，会尴尬；五年前的陌生人也可能正在用你当年的手机号那条推文骚扰你。清理推文不是要消灭过去，是把"想被别人看到的那部分"和"不想被别人看到的那部分"分开。从 P0 开始，花十分钟，剩下的交给风险标签。</p>
    <p>**<a href="/zh">把 X 数据归档传上来，本机生成你的风险优先级清单 →</a>**</p>
    `,
    contentEn: `
    <p>Last week a friend sent me a screenshot of his X account's privacy checkup: seven years, 23,000 tweets, 61 red high-risk labels. He stared at the screen and asked, "I can't delete everything, can I? What tweets to delete first?"</p>
    <p>Fair question. Nobody reads twenty thousand tweets one by one, and most of them honestly don't need to go. Cleaning your timeline shouldn't run on vibes. It should run on priority. The tiers below are what I landed on after scanning 50,000 of my own historical tweets, and you can copy the order directly.</p>
    <h2>P0: Anything that exposes who you really are, clean today</h2>
    <p>One test for this tier: **could a stranger reading this tweet point straight to the real-life you?**</p>
    <p>Typical examples:</p>
    <ul>
    <li>A phone number, even if posted once, even in a reply</li>
    <li>A personal email, especially one built around your real name</li>
    <li>Home address, door number, or something like "waiting for my package tonight" that implies you're home</li>
    <li>Photos of ID cards, passports, driver's licenses</li>
    <li>A real-name company paired with start and end dates, which lets people reconstruct your work history</li>
    </ul>
    <p>The rule is simple. Before deleting, ask yourself: when I wrote this, did I forget strangers were watching? If yes, P0.</p>
    <h2>P1: Things that map your daily life, handle soon</h2>
    <p>This tier doesn't expose identity directly. It exposes patterns. The risk labels in your report will flag this kind of content for you.</p>
    <ul>
    <li>Check-in geotags, like "just landed at the station" or "in the office, traffic is a nightmare"</li>
    <li>Anything around your home, the pancake stand downstairs, the neighborhood water outage</li>
    <li>Fixed commute routes, the gym and hospital you always go to</li>
    <li>Travel plans, "flying to Tokyo on Friday, staying in Shinjuku"</li>
    </ul>
    <p>One post alone means nothing. Fifty of them are a very complete map of your movements. These usually carry location-related labels, and the report marks them for you.</p>
    <h2>P2: Person-related and easy to weaponize</h2>
    <p>This tier is softer, but when it bites, it hurts more.</p>
    <ul>
    <li>Negative takes on former employers or coworkers, because your next HR will search</li>
    <li>Screenshots of politically sensitive posts or jokes about regions and genders, which get taken out of context and shared on their own</li>
    <li>Old fights with people, especially anything that got quote-tweeted</li>
    <li>Complaints about clients or suppliers, even when you were right</li>
    </ul>
    <p>Try this test instead: if this tweet got screenshotted into your new team's group chat, could you smooth it over? If not, it goes.</p>
    <h2>P3: Embarrassing but harmless, your call</h2>
    <p>Angsty poetry from your twenties, 2 a.m. sorrow, eight hundred reposts for your favorite idol. These don't pose real risk, and keeping them actually makes the account look human. Delete them if you want, or leave them alone. If one tweet makes you cringe every time you see it, deleting costs you nothing.</p>
    <h2>Risk labels are your sorting tool</h2>
    <p>You don't have to judge each tweet yourself. Upload your X data archive, and the report tags every high-risk tweet with labels like phone, email, address, location, and sensitive, ranked from highest to lowest risk. Your job is to sweep from P0 downward, batch-select, delete. Takes about a minute.</p>
    <h2>What this looks like in practice: a five-minute flow</h2>
    <p>Let me get concrete, because theory only gets you so far. This is how I run a cleanup myself:</p>
    <ol>
    <li>Export your X data archive from the settings menu. It arrives as a ZIP, and depending on account age it can take anywhere from twenty minutes to a few hours to generate.</li>
    <li>Drag the ZIP into the checkup tool and let it parse locally.</li>
    <li>Filter by P0 first. Read the original text of those few high-risk tweets, make sure nothing was mislabeled, then batch-delete the whole tier.</li>
    <li>Move on to P1 and clear out the location and home-address related posts while you're in the zone.</li>
    <li>Save P2 for the weekend. Go through them one by one when you're in a decent mood, and if reading the original screenshot makes you wince, it goes.</li>
    </ol>
    <p>All in, about ten minutes. Don't aim for one perfect sweep. Getting P0 and P1 to zero sets the safety floor for your whole account, and everything after that can wait.</p>
    <p>One thing worth stressing: **the deletions run on your own device, using your own account credentials**. The tool only tells you what to remove. You press the buttons. That keeps control in your hands and leaves room for second thoughts, since some platforms keep a short undelete window if you do hit the wrong thing.</p>
    <p>Priority table:</p>
    <table><tr><td>Tier</td><td>Risk labels</td><td>Typical content</td><td>Suggested action</td><td>Example</td></tr></table>
    <table><tr><td>P0</td><td>phone / email / identity</td><td>Phone number, personal email, ID photos, address</td><td>Delete today, all of it</td><td>Posted your number in a reply</td></tr></table>
    <table><tr><td>P1</td><td>location / address</td><td>Geotag check-ins, home surroundings, trips</td><td>Handle within a week</td><td>"Just arrived at the station"</td></tr></table>
    <table><tr><td>P2</td><td>sensitive</td><td>Employer rants, political posts, flame wars</td><td>Clean within a month</td><td>A coworker rant that got shared</td></tr></table>
    <table><tr><td>P3</td><td>No high-risk labels</td><td>Angsty old tweets, late-night feelings</td><td>Optional</td><td>A poem from ten years ago</td></tr></table>
    `,
  },

  {
    slug: 'risk-labels-explained',
    title: '体检报告里的每个风险标签代表什么',
    excerpt:
      '手机号、邮箱、住址、定位、敏感话题——体检报告里的每个风险标签都有明确的触发条件和风险等级。这篇逐个拆解标签含义、对应风险与建议动作，让你看得懂报告、知道先处理哪一类。',
    date: '2026-08-15',
    updatedAt: '2026-08-15',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '数字足迹', '风险标签', '体检报告'],
    canonical: '/blog/risk-labels-explained',
    faq: [],
    titleEn: 'Every Risk Label in Your Report, Explained',
    excerptEn:
      'Phone, email, address, location, sensitive topic: every risk label in a footprint report has a clear trigger and a risk level. This guide explains each label, what triggers it, and what action it recommends, so you can read your report and know what to clean first.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'digital footprint', 'risk labels', 'report'],
    content: `
    <p>第一次打开体检报告的人，多半会被一屏的标签搞懵：phone、email、address、location、sensitive、identity……红橙黄绿一片。我当时也是。这篇就把每个标签拆开讲清楚：它为什么出现、风险有多高、你该做什么。</p>
    <p>先说结论：标签不是判死刑，是给你一张地图。知道每个标签在说什么，你才知道先处理哪一块。</p>
    <h2>phone 和 email：你的联系方式</h2>
    <p>这两个标签含义直白：这条推文里出现了疑似手机号或邮箱。触发条件也简单——匹配到一串 11 位手机号格式的数字，或者标准邮箱格式的字符串。</p>
    <p>风险很高，因为联系方式是陌生人接触你的最短路径。看到这两个标签，不用犹豫，直接看原文，是真的就删。也要留意一种情况：号码是别人发的、你转发过，这种照样算，因为你账号的关联性会让号码和你绑在一起。</p>
    <h2>address 和 location：你在哪、住哪</h2>
    <p>address 指的是住址类信息：门牌号、小区名、街道加城市。location 更宽泛，覆盖打卡定位、公司位置、常去的地点。</p>
    <p>风险等级有差别。address 是直接的住址暴露，接近 P0；location 是轨迹类，单条无害，攒起来就是行动地图。报告里同一级别的 address 会排在 location 前面，就是提醒你先后顺序。</p>
    <h2>sensitive：敏感话题</h2>
    <p>这是最需要人工判断的一个标签。它捕捉的是政治敏感发言、种族/地域/性别类玩笑、对特定群体的攻击性言论。</p>
    <p>它不是说你"说错了"，而是说这条推文脱离了原语境很容易被单独截图传播。你当年在群里吐槽朋友的口嗨，被截图发出去就是另一个故事。风险等级中高，处理方式是看原文、自己掂量。</p>
    <h2>identity：身份拼图</h2>
    <p>identity 是你个人身份信息的集合：实名、证件照、出生日期、工作单位、教育经历。它跟前面几个标签不同，不靠单一匹配，而是靠"组合"触发——比如一条推文里同时出现你的真名和公司名，或者实名邮箱。</p>
    <p>单一信息风险有限，组合起来就能精准定位到你。这个标签一旦出现，基本可以按 P0 对待。</p>
    <h2>标签怎么组合工作</h2>
    <p>真实情况里，一条推文往往同时挂好几个标签。比如"入职 XX 公司第三天，工牌晒一个"——既有 identity（公司名+工牌照），又有 location（可能带公司定位）。体检报告按"最高风险标签"给整条推文定级，这样你按等级排序清理时，不会漏掉组合型风险。</p>
    <p>标签对照表：</p>
    <table><tr><td>标签</td><td>含义</td><td>触发条件</td><td>风险等级</td><td>建议动作</td></tr></table>
    <table><tr><td>phone</td><td>手机号</td><td>11 位号码格式</td><td>高（P0）</td><td>核实后删除</td></tr></table>
    <table><tr><td>email</td><td>邮箱</td><td>标准邮箱格式</td><td>高（P0）</td><td>核实后删除</td></tr></table>
    <table><tr><td>address</td><td>住址</td><td>门牌号/小区/街道</td><td>高（P0）</td><td>删除，别留档</td></tr></table>
    <table><tr><td>location</td><td>定位轨迹</td><td>打卡/公司/常去地</td><td>中高（P1）</td><td>批量清理</td></tr></table>
    <table><tr><td>sensitive</td><td>敏感话题</td><td>政治/地域/攻击性言论</td><td>中高（P2）</td><td>人工判断</td></tr></table>
    <table><tr><td>identity</td><td>身份拼图</td><td>真名+公司/证件/出生日期</td><td>高（P0）</td><td>单独核对每条</td></tr></table>
    <h2>常见问题</h2>
    <p>**Q：标签会不会误报？**</p>
    <p>A：会。正则匹配不是人眼，"111"开头的生日或座机号可能被标成 phone。所以每个标签你都要看原文确认，报告里也都能展开原文。误报不等于假报告，多数标签准，个别的要你过目。</p>
    <p>**Q：没有标签的推文就完全安全吗？**</p>
    <p>A：不是。标签只抓"机器能识别的规律"，你随口提的同事全名、抱怨过的体检机构，标签未必抓得到。低风险不等于零风险，只是说明不需要优先处理。</p>
    <p>**Q：同一个标签为什么颜色不一样？**</p>
    <p>A：颜色对应整条推文的综合风险分，不只是标签本身。一条被转发过 500 次的手机号推文，比没转发的同款更红，因为传播范围大。</p>
    <p>**Q：标签体系是固定的吗？**</p>
    <p>A：不是。规则会随新暴露方式更新，比如短链接、名片二维码这些。隔几个月重跑一次体检，标签也会变。</p>
    <h2>看懂标签，才算看懂报告</h2>
    <p>标签是报告的语言。花十分钟弄懂 phone 和 identity 的差别，比你瞎删两百条有用得多。优先级清楚，动作就干净。</p>
    <p>**<a href="/zh">上传 X 数据归档，本机解析生成完整风险标签报告 →</a>**</p>
    `,
    contentEn: `
    <p>The first time you open a footprint report, the wall of tags is overwhelming. phone, email, address, location, sensitive, identity, all in a mess of reds and oranges and greens. I felt the same way when I saw mine. This post breaks down every label one by one: why it shows up, how risky it is, and what you should do about it.</p>
    <p>Here's the short version first. Labels aren't a death sentence. They're a map. Once you know what each one is telling you, you know which corner of the account to clean first.</p>
    <h2>phone and email: your contact lines</h2>
    <p>These two are straightforward. The label means a tweet contains something that looks like a mobile number or an email address. The trigger is simple: a string matching an 11-digit phone format, or a standard email pattern.</p>
    <p>The risk is high, because contact details are the shortest route a stranger has to reach you. When you see these tags, don't overthink it. Open the original tweet, confirm it's real, delete. One edge case worth knowing: if someone else posted the number and you reposted it, it still counts. Your account's association ties that number to you either way.</p>
    <h2>address and location: where you are, where you live</h2>
    <p>address means home-type information: door numbers, neighborhood names, a street plus a city. location is broader. It covers check-in geotags, your office, the places you frequent.</p>
    <p>The risk levels differ. address is direct exposure of where you live, close to P0. location is pattern-based, harmless one post at a time, dangerous when fifty of them stack into a movement map. When both appear, the report ranks address above location, which is your ordering hint.</p>
    <h2>sensitive: conversations that age badly</h2>
    <p>This is the label that most needs human judgment. It catches politically sensitive remarks, jokes about regions, genders, or ethnic groups, and attack-style comments toward specific communities.</p>
    <p>It's not saying you were wrong. It's saying this tweet, ripped out of its original context, travels really well as a screenshot. That late-night rant you aimed at a friend reads like a completely different story when it circulates on its own. Risk is medium-high, and the fix is reading the original and deciding for yourself.</p>
    <h2>identity: the puzzle pieces</h2>
    <p>identity is the collection of personal identifiers: your real name, ID photos, birth date, employer, education history. Unlike the other labels, it doesn't trigger on a single match. It fires on combinations, like a tweet that pairs your full name with your company, or a personal email built on your real name.</p>
    <p>One data point on its own is limited. Several combined pinpoint you precisely. When this label appears, treat it like P0.</p>
    <h2>How labels work together</h2>
    <p>In the wild, one tweet usually carries several labels at once. Take "third day at Acme Corp, here's my badge" which bundles identity, company name plus badge photo, with a possible location tag if the office is geotagged. The report grades the whole tweet by its highest-risk label, so when you sort by tier for cleanup, combined risks don't slip past you.</p>
    <p>Label reference table:</p>
    <table><tr><td>Label</td><td>Meaning</td><td>Trigger</td><td>Risk level</td><td>Suggested action</td></tr></table>
    <table><tr><td>phone</td><td>Mobile number</td><td>11-digit pattern</td><td>High (P0)</td><td>Verify, then delete</td></tr></table>
    <table><tr><td>email</td><td>Email address</td><td>Standard email pattern</td><td>High (P0)</td><td>Verify, then delete</td></tr></table>
    <table><tr><td>address</td><td>Home address</td><td>Door number / neighborhood / street</td><td>High (P0)</td><td>Delete, don't archive</td></tr></table>
    <table><tr><td>location</td><td>Movement traces</td><td>Check-ins / office / frequent spots</td><td>Medium-high (P1)</td><td>Batch cleanup</td></tr></table>
    <table><tr><td>sensitive</td><td>Sensitive topics</td><td>Politics / region / attack comments</td><td>Medium-high (P2)</td><td>Human judgment</td></tr></table>
    <table><tr><td>identity</td><td>Identity puzzle</td><td>Real name + employer / ID / birth date</td><td>High (P0)</td><td>Check each one</td></tr></table>
    `,
  },

  {
    slug: 'health-score-calculated-1min',
    title: '一分钟看懂 0-100 健康分怎么算',
    excerpt:
      '0-100 健康分到底怎么算的？风险推文占比、高风险类别权重、时间衰减、数量影响——四个维度合出一个分。分数低不等于必须删，它只是提醒你风险集中在哪。',
    date: '2026-08-15',
    updatedAt: '2026-08-15',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '数字足迹', '健康分', '评分机制'],
    canonical: '/blog/health-score-calculated-1min',
    faq: [],
    titleEn: 'How Your 0-100 Health Score Is Calculated in 1 Minute',
    excerptEn:
      'How is the 0-100 health score actually calculated? Four dimensions combine into one number: risky tweet ratio, high-risk category weights, time decay, and volume impact. A low score does not mean you must delete; it only shows where your risk concentrates.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'digital footprint', 'health score', 'scoring'],
    content: `
    <p>报告出来第一眼，谁都会先看那个分数。79 分，到底算好算坏？为什么朋友 91 分我只有 79？这篇不背公式给你听，只讲清打分的思路，看完你自己就能估出个大概。</p>
    <p>先把最重要的说在前面：**这个分数不是考试，不是越高越好，更没有及格线。**它是一面镜子，只反映你账号当下的暴露程度。</p>
    <h2>四个维度在打架，最后加权求和</h2>
    <p>健康分不是拍脑袋出来的。它由四块拼成，每块权重不同：</p>
    <ul>
    <li>**风险推文占比**：高危推文数 ÷ 总推文数。这是最大的变量，权重最重。账号大、风险推文多，这一项直接拉垮。</li>
    <li>**高风险类别权重**：不是所有风险等价。挂 phone、email、identity 的推文，比挂 sensitive 的推文扣分更狠。类别越危险，单条扣分越多。</li>
    <li>**时间衰减**：这是很多人没想到的。2016 年的手机号推文，比 2024 年的同款危害小，因为号码可能早注销了。越久远的推文，扣分越轻，但不算清零，毕竟别人手里可能还留着截图。</li>
    <li>**数量效应**：不是线性累加。一条手机号推文和十条手机号推文，危害差距不是十倍，是"一条是偶然，十条是习惯"的差别。数量越多，边际危害越大。</li>
    </ul>
    <p>四个维度加权求和，再映射到 0-100，就是你的数字足迹健康分。</p>
    <h2>分数区间大概长什么样</h2>
    <table><tr><td>分数区间</td><td>含义</td><td>典型账号</td><td>优先动作</td></tr></table>
    <table><tr><td>90-100</td><td>干净</td><td>新号、克制型账号</td><td>保持即可</td></tr></table>
    <table><tr><td>70-89</td><td>基本健康</td><td>老号但有零散暴露</td><td>清 P1、留意敏感</td></tr></table>
    <table><tr><td>40-69</td><td>风险累积</td><td>多年口嗨史、有定位打卡</td><td>从 P0 开始清</td></tr></table>
    <table><tr><td>0-39</td><td>高危</td><td>联系方式+身份信息外泄</td><td>立即处理 P0/P1</td></tr></table>
    <p>区间是我按观察划的，不是精确刻度，但方向是对的：分数跌进 40 以下，别等了。</p>
    <h2>为什么"分数低"不等于"必须删"</h2>
    <p>这条要反复强调。分数低只说明暴露多，不说明你要把账号清空。</p>
    <p>三个原因。第一，你舍不得的、有情感价值的推文，不在扣分清单里，除非它带风险标签。第二，分数低但全是 P3 级的尴尬内容，那叫"社死但不危险"，优先级低。第三，有些暴露你根本控制不了，比如别人发的、截图出去的，删自己账号只是止损的第一步。</p>
    <p>分数是提醒，不是判决。它告诉你"这里有雷"，至于排不排雷、先排哪个，是你的决定。</p>
    <h2>评分维度表</h2>
    <table><tr><td>维度</td><td>权重思路</td><td>扣分逻辑</td><td>常见场景</td></tr></table>
    <table><tr><td>风险推文占比</td><td>最重</td><td>占比越高扣越多</td><td>老号两万条里有 200 条高危</td></tr></table>
    <table><tr><td>类别权重</td><td>次重</td><td>identity &gt; phone &gt; location &gt; sensitive</td><td>手机号比吐槽推文扣得多</td></tr></table>
    <table><tr><td>时间衰减</td><td>中</td><td>越久远越轻，不归零</td><td>2016 年的旧号码推文</td></tr></table>
    <table><tr><td>数量效应</td><td>中</td><td>非线性，越多越狠</td><td>一条 vs 十条手机号推文</td></tr></table>
    <h2>常见问题</h2>
    <p>**Q：删掉几条推文，分数会立刻涨吗？**</p>
    <p>A：会，但要看删的是什么。删掉一条 identity 级别的，比删掉十张自拍明显。分数是加权结果，动的越多，涨得越明显。</p>
    <p>**Q：分数会随时间自己变化吗？**</p>
    <p>A：在报告生成那一刻是固定的。时间衰减是按推文发布年份算的，不会因为你隔三个月再看就自动变化，除非重跑体检。</p>
    <p>**Q：为什么分数只给到 100？**</p>
    <p>A：100 是"当前报告范围内没发现可识别风险"，不代表绝对安全，也不代表永远安全。你明天发一条带手机号的推文，重跑就下来了。</p>
    <p>**Q：分数低的账号还有救吗？**</p>
    <p>A：有。分数低通常意味着 P0、P1 的推文没清。按优先级清一轮，占比和类别两项会立刻改善，重跑体检分数能明显回升。</p>
    <p>**Q：这个分数是行业标准吗？**</p>
    <p>A：不是。各家隐私工具算法不同，分数不可直接比较。它在本工具内部有稳定的含义，纵向看自己账号的变化比横向跟别人比更有意义。</p>
    <h2>分数只是起点</h2>
    <p>79 分和 91 分的差别，往往就是二十条 P1 定位推文的距离。看懂算法，你就知道往哪用力。分数低先清 P0 和 P1，分数高也别松懈，保持现状就好。</p>
    <p>**<a href="/zh">上传 X 数据归档，一分钟拿到你的 0-100 健康分 →</a>**</p>
    `,
    contentEn: `
    <p>When a report opens, everybody looks at the number first. 79. Is that good or bad? Why does my friend have 91 and I'm stuck at 79? I'm not going to recite formulas at you. I'll explain the thinking behind the score, and you'll be able to estimate your own in your head.</p>
    <p>The most important thing first: **this score is not an exam. Higher isn't automatically better, and there's no passing line.** It's a mirror. It only reflects how exposed your account is right now.</p>
    <h2>Four dimensions fight each other, then get weighted</h2>
    <p>The score doesn't come out of thin air. Four blocks build it, each with a different weight:</p>
    <ul>
    <li>**Share of risky tweets**: risky tweets divided by total tweets. This is the biggest variable and carries the most weight. Big account, lots of risk, this number drags everything down.</li>
    <li>**High-risk category weight**: not all risk is equal. A tweet tagged phone, email, or identity costs more points than one tagged sensitive. The more dangerous the category, the heavier the single-tweet penalty.</li>
    <li>**Time decay**: most people don't see this coming. A phone number tweeted in 2016 is less dangerous than the same tweet from 2024, because the number has probably been deactivated. Older tweets lose fewer points, but not zero, since screenshots stick around in other people's hands.</li>
    <li>**Quantity effect**: this isn't linear. One phone number tweet versus ten phone number tweets isn't a tenfold difference. It's the difference between "an accident" and "a habit." More posts mean higher marginal harm.</li>
    </ul>
    <p>Those four get weighted, summed, and mapped onto 0-100. That's your digital footprint score.</p>
    <h2>Roughly what the bands look like</h2>
    <table><tr><td>Band</td><td>Meaning</td><td>Typical account</td><td>Priority action</td></tr></table>
    <table><tr><td>90-100</td><td>Clean</td><td>New accounts, restrained posters</td><td>Just maintain</td></tr></table>
    <table><tr><td>70-89</td><td>Mostly healthy</td><td>Older account with scattered exposure</td><td>Clear P1, mind sensitive</td></tr></table>
    <table><tr><td>40-69</td><td>Risk building up</td><td>Years of loose talk, geotag check-ins</td><td>Start at P0</td></tr></table>
    <table><tr><td>0-39</td><td>High risk</td><td>Contact details and identity leaked</td><td>Handle P0/P1 now</td></tr></table>
    <p>The bands are my own observation, not a precise scale, but the direction is right. If you drop below 40, don't wait.</p>
    <h2>Why a low score doesn't mean you must delete</h2>
    <p>I want to repeat this one. A low score means more exposure. It does not mean you have to empty your account.</p>
    <p>Three reasons. First, the tweets you treasure, the ones with real emotional value, aren't on the penalty list unless they carry a risk label. Second, a low score can come entirely from P3-level embarrassment, which is cringe but not dangerous, so the priority stays low. Third, some exposure you never controlled, posts from other people, screenshots already out there. Deleting your own account is only the first step of damage control.</p>
    <p>The score reminds, it doesn't sentence. It tells you mines are here. Whether to clear them, and in what order, is your call.</p>
    <h2>Scoring dimension table</h2>
    <table><tr><td>Dimension</td><td>Weight logic</td><td>Penalty logic</td><td>Common scenario</td></tr></table>
    <table><tr><td>Share of risky tweets</td><td>Heaviest</td><td>Higher share, bigger penalty</td><td>20k-tweet account with 200 high-risk</td></tr></table>
    <table><tr><td>Category weight</td><td>Second</td><td>identity &gt; phone &gt; location &gt; sensitive</td><td>A phone number costs more than a rant</td></tr></table>
    <table><tr><td>Time decay</td><td>Medium</td><td>Older is lighter, never zero</td><td>A stale number from 2016</td></tr></table>
    <table><tr><td>Quantity effect</td><td>Medium</td><td>Nonlinear, more means worse</td><td>One vs ten phone number tweets</td></tr></table>
    `,
  },

  {
    slug: 'bulk-delete-old-tweets-walkthrough',
    title: '批量删除历史推文：完整操作流程',
    excerpt:
      '几千条旧推文怎么批量删？这篇给出完整操作流程：从下载归档、本地解析、按风险筛选，到批量删除和验证，每一步都有具体做法，适合第一次清理的人照做。',
    date: '2026-08-16',
    updatedAt: '2026-08-16',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '数字足迹', '批量删除', '清理教程'],
    canonical: '/blog/bulk-delete-old-tweets-walkthrough',
    faq: [
      {
        q: '批量删除推文会被 X 封号吗？',
        a: '用官方接口按正常频率删不会。真正的风险来自第三方工具频繁调用导致限流，以及删太快被系统当成异常行为。稳妥的做法是控制速率、分批进行，不用一次性删光。',
        qEn: 'Can bulk deleting tweets get me banned on X?',
        aEn: 'Deleting through official APIs at a normal rate will not. The real risk is rate-limiting from third-party tools calling too often, or deleting so fast the system flags it as abnormal. Control the pace, batch it, and you are fine.'
      },
      {
        q: '删掉的推文还能恢复吗？',
        a: '不能。删除是永久操作，X 不提供回收站。所以删除前一定要先下载完整归档，确认你想保留的推文都在里面，再动手。',
        qEn: 'Can deleted tweets be restored?',
        aEn: 'No. Deletion is permanent, X has no recycle bin. Download a full archive first and confirm everything you want to keep is in it before you start.'
      },
      {
        q: '批量删除要多久？',
        a: '看数量。几百条的话，一次会话内分批删完；几千条建议分几天，每天删一批，既安全又不影响正常使用。',
        qEn: 'How long does bulk deletion take?',
        aEn: 'Depends on volume. A few hundred can be done in one session in batches; a few thousand is better spread over several days, one batch per day, which is safer and does not disrupt normal use.'
      },
      {
        q: '只删有风险的推文可以吗？',
        a: '可以，而且更推荐。先用报告筛出带风险标签的推文，只删高风险的，保留普通内容。这样你的账号历史还在，暴露面却大幅缩小。',
        qEn: 'Can I delete only risky tweets?',
        aEn: 'Yes, and it is recommended. Use the report to filter tweets with risk labels and delete only high-risk ones. Your account history stays, your exposure shrinks.'
      }
    ],
    titleEn: 'Bulk Delete Old Tweets: The Complete Walkthrough',
    excerptEn:
      'How to bulk delete thousands of old tweets: download your archive, parse it locally, filter by risk, delete in batches, and verify. A step-by-step walkthrough for first-time cleaners.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'digital footprint', 'bulk delete', 'cleanup tutorial'],
    content: `
    <p>账号十年，推文几千条，想清理却不知道从哪下手——这是大多数人第一次接触批量删除时的状态。这篇不灌鸡汤，直接给你一套能照做的流程：怎么下载归档、怎么把几万条推文变成一份可筛选的清单，最后怎么安全地批量删除。</p>
    <p>先说核心思路：<strong>先备份，再筛选，最后删</strong>。顺序不能反。</p>
    <h2>第一步：下载完整归档</h2>
    <p>X 的设置里有"下载归档"入口，会打包你账号的全部数据，包括每一条推文、时间、设备来源。归档生成要几个小时到一两天，收到邮件再下载。这一步是保命用的：删除不可逆，归档是你唯一的后悔药。</p>
    <h2>第二步：本地解析，变成可筛选清单</h2>
    <p>归档解压后是一堆 HTML 和 JSON，直接看没法用。你需要把 tweets.js 之类的文件解析成表格：每条推文的 ID、时间、内容。解析在自己电脑上做，归档文件不出本机，这也是 bulk delete tweets 流程里隐私最稳的一环。</p>
    <h2>第三步：按风险筛选，别一锅端</h2>
    <p>几千条推文不是都该删。先用体检报告或规则筛出风险推文：含手机号、邮箱、住址、定位的优先；政治口嗨和情绪发言其次；纯日常碎碎念可以留着。批量删除的智慧不是删得多，是删得准。</p>
    <h2>第四步：分批删除</h2>
    <p>把筛选结果按时间分批，每天处理一批。控制频率，给 X 的接口留出喘息空间，避免触发限流或异常行为检测。几百条一次会话搞定，几千条分几天，别贪快。</p>
    <h2>第五步：验证结果</h2>
    <p>删完别急着关页面。随机抽几条已删除的推文 ID，确认返回"不存在"；再看一遍剩余推文里有没有漏网的高危项。清理完成后再跑一次报告，对比健康分变化，你会看到风险条数明显下降。</p>
    <h2>FAQ</h2>
    <p><strong>批量删除推文会被 X 封号吗？</strong> 用官方接口按正常频率删不会。真正的风险来自第三方工具频繁调用导致限流，以及删太快被系统当成异常行为。稳妥的做法是控制速率、分批进行，不用一次性删光。</p>
    <p><strong>删掉的推文还能恢复吗？</strong> 不能。删除是永久操作，X 不提供回收站。所以删除前一定要先下载完整归档，确认你想保留的推文都在里面，再动手。</p>
    <p><strong>批量删除要多久？</strong> 看数量。几百条的话，一次会话内分批删完；几千条建议分几天，每天删一批，既安全又不影响正常使用。</p>
    <p><strong>只删有风险的推文可以吗？</strong> 可以，而且更推荐。先用报告筛出带风险标签的推文，只删高风险的，保留普通内容。这样你的账号历史还在，暴露面却大幅缩小。</p>
    <p>想先看清自己有哪些高危推文？来 digital-footprint-health.shop 上传归档，体检报告会按风险排好优先级，删起来心里有数。</p>
    `,
    contentEn: `
    <p>Ten years, a few thousand tweets, and no idea where to start cleaning — that is where most people meet bulk deletion. This walkthrough skips the motivation speech and gives you a repeatable process: how to download your archive, turn tens of thousands of tweets into a filterable list, and finally delete safely at scale.</p>
    <p>The core sequence: <strong>back up first, then filter, then delete</strong>. Do not reorder it.</p>
    <h2>Step 1: Download the full archive</h2>
    <p>X settings has a "download your archive" option that packages your entire account: every tweet, timestamp, and device source. Generation takes hours to a day, and you get an email when it is ready. This step saves your life later: deletion is irreversible, and the archive is your only undo button.</p>
    <h2>Step 2: Parse locally into a filterable list</h2>
    <p>The archive unzips into HTML and JSON files that are useless to eyeball. You need to parse tweets.js into a table: tweet ID, time, content. Parse it on your own machine, keep the archive local, which is also the most privacy-safe part of the whole bulk delete tweets flow.</p>
    <h2>Step 3: Filter by risk, do not nuke everything</h2>
    <p>Not all thousands of tweets deserve deletion. Use a report or rule set to find risky ones: tweets with phone numbers, emails, addresses, and locations come first; political rants and venting second; harmless day-to-day chatter can stay. Smart bulk deletion is not about deleting a lot, it is about deleting the right ones.</p>
    <h2>Step 4: Delete in batches</h2>
    <p>Split the filtered list by time and process one batch per day. Control the rate, give X's API room to breathe, and avoid rate limits or abnormal-behavior flags. A few hundred in one session, a few thousand across several days. Do not rush it.</p>
    <h2>Step 5: Verify the result</h2>
    <p>Do not close the tab right after deleting. Sample a few deleted tweet IDs and confirm they return "not found". Scan the remaining tweets for missed high-risk items. Then run the report again and watch the risk count drop.</p>
    <h2>FAQ</h2>
    <p><strong>Can bulk deleting tweets get me banned on X?</strong> Deleting through official APIs at a normal rate will not. The real risk is rate-limiting from third-party tools calling too often, or deleting so fast the system flags it as abnormal. Control the pace, batch it, and you are fine.</p>
    <p><strong>Can deleted tweets be restored?</strong> No. Deletion is permanent, X has no recycle bin. Download a full archive first and confirm everything you want to keep is in it before you start.</p>
    <p><strong>How long does bulk deletion take?</strong> Depends on volume. A few hundred can be done in one session in batches; a few thousand is better spread over several days, one batch per day, which is safer and does not disrupt normal use.</p>
    <p><strong>Can I delete only risky tweets?</strong> Yes, and it is recommended. Use the report to filter tweets with risk labels and delete only high-risk ones. Your account history stays, your exposure shrinks.</p>
    <p>Want to see which of your tweets are high-risk first? Upload your archive at digital-footprint-health.shop and the report will rank priorities so you can delete with confidence.</p>
    `,
  },
  {
    slug: 'tweet-deletion-cost',
    title: '删除要花多少钱？按条计费全透明',
    excerpt:
      '批量删除推文到底要花多少钱？这篇把删除服务的计费方式拆开：按条计费怎么算、订阅和一次性套餐哪个划算、免费方案能做到什么程度，避免被隐形收费坑到。',
    date: '2026-08-16',
    updatedAt: '2026-08-16',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '数字足迹', '删除费用', '定价'],
    canonical: '/blog/tweet-deletion-cost',
    faq: [
      {
        q: '删除推文收费正常吗？',
        a: '正常。X 官方不提供批量删除接口给普通用户，第三方服务需要维护接口、处理限流，按条或按订阅收费是行业惯例。重点是费用透明、没有隐藏扣费。',
        qEn: 'Is it normal for tweet deletion to cost money?',
        aEn: 'Yes. X does not offer a bulk deletion API to regular users, and third-party services have to maintain integrations and handle rate limits, so per-tweet or subscription pricing is standard. The key is transparency and no hidden charges.'
      },
      {
        q: '按条计费和订阅哪个划算？',
        a: '看你的量。几百条一次性清理，按条计费更划算；常年维护、定期清理，订阅更省。选之前先算总价，别只看单价。',
        qEn: 'Which is better: per-tweet or subscription?',
        aEn: 'Depends on volume. For a one-time cleanup of a few hundred tweets, per-tweet pricing wins. For ongoing maintenance, a subscription saves more. Total the real cost before choosing.'
      },
      {
        q: '有免费删除推文的方案吗？',
        a: '有。X 官方允许逐条手动删除，免费但很慢；少量推文可以自己写脚本调接口删，需要一点技术基础。免费的代价是时间或技术门槛，适合量小的人。',
        qEn: 'Is there a free way to delete tweets?',
        aEn: 'Yes. X allows manual deletion one by one, free but slow. For a small volume you can write a script against the API, which needs some technical skill. Free means paying in time or effort.'
      },
      {
        q: '删除服务会不会偷跑我的数据？',
        a: '这取决于服务商。选择的原则是：本地解析、不把归档上传到云端、删除只在你的账号授权范围内执行。服务商如果要求你上传整个归档，要格外谨慎。',
        qEn: 'Could a deletion service misuse my data?',
        aEn: 'Depends on the provider. The rule: it should parse locally, never upload your archive to a cloud, and only act within the account authorization you granted. Be extra careful if a provider demands your full archive upload.'
      }
    ],
    titleEn: 'How Much Does Tweet Deletion Cost? Per-Tweet Pricing',
    excerptEn:
      'What does bulk tweet deletion actually cost? Breaking down per-tweet pricing, subscriptions vs one-time packages, and what free options can do, so you never get hit by hidden fees.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'digital footprint', 'deletion cost', 'pricing'],
    content: `
    <p>搜"批量删除推文"，跳出来的服务价格从"免费"到"几百美元年费"都有，新手很容易懵。这篇把 tweet deletion cost 这件事彻底算清楚：按条计费怎么算、订阅和一次性套餐哪个坑、免费方案到底能做到什么。</p>
    <h2>为什么删除推文要花钱</h2>
    <p>先破除一个误解：不是"删个推文还要收钱"，而是 X 官方只给普通用户逐条删除的入口，没有批量接口。第三方服务要自己对接接口、处理限流、维护应用，这些都有成本。收费本身合理，不合理的只有不透明。</p>
    <h2>按条计费：明码标价，量少划算</h2>
    <p>按条计费的模式很直接：删一条收一条的钱，通常单价不高，但条数多了总价会涨。适合一次性清理的场景，比如手头就几百条要删。下单前算一笔总账：单价 × 数量，再和订阅价比一比。</p>
    <h2>订阅制：适合长期维护</h2>
    <p>按月或按年订阅，通常不限条数或给一个大额度。适合打算养成定期清理习惯的人：每个月花一点钱，把新积累的风险推文顺手清掉。注意看订阅的隐藏条款：自动续费、额度清零规则、取消门槛，这些才是真正的坑。</p>
    <h2>免费方案：时间换钱</h2>
    <p>免费路径真实存在：逐条手动删，慢但零成本；或者自己写脚本调接口删，省了钱但费技术。适合量小、不着急、或想先体验流程的人。免费没有错，错的是把免费当卖点却偷偷限速或植入广告的服务。</p>
    <h2>怎么算你的真实成本</h2>
    <p>三笔账一起算：① 条数 × 单价（按条）；② 年费（订阅）；③ 你的时间成本（免费方案）。选总成本最低的。另外无论选哪个，先确认服务商是否要求上传归档——凡是"把整个归档发给我们"的，都要打个问号，本地解析才是隐私底线。</p>
    <h2>FAQ</h2>
    <p><strong>删除推文收费正常吗？</strong> 正常。X 官方不提供批量删除接口给普通用户，第三方服务需要维护接口、处理限流，按条或按订阅收费是行业惯例。重点是费用透明、没有隐藏扣费。</p>
    <p><strong>按条计费和订阅哪个划算？</strong> 看你的量。几百条一次性清理，按条计费更划算；常年维护、定期清理，订阅更省。选之前先算总价，别只看单价。</p>
    <p><strong>有免费删除推文的方案吗？</strong> 有。X 官方允许逐条手动删除，免费但很慢；少量推文可以自己写脚本调接口删，需要一点技术基础。免费的代价是时间或技术门槛，适合量小的人。</p>
    <p><strong>删除服务会不会偷跑我的数据？</strong> 这取决于服务商。选择的原则是：本地解析、不把归档上传到云端、删除只在你的账号授权范围内执行。服务商如果要求你上传整个归档，要格外谨慎。</p>
    <p>想先看看自己的清理量有多大、大概要花多少时间？来 digital-footprint-health.shop 免费上传归档生成报告，先摸底再决定用哪种方案。</p>
    `,
    contentEn: `
    <p>Search "bulk delete tweets" and you will see everything from "free" to hundreds of dollars a year. Newcomers get confused fast. This post does the math on tweet deletion cost once and for all: how per-tweet pricing works, which of subscription versus one-time packages hides traps, and what free options really deliver.</p>
    <h2>Why deleting tweets costs money</h2>
    <p>Clear up one myth first: it is not "you pay to delete a tweet", it is that X only offers single-tweet deletion to regular users, with no bulk API. Third-party services maintain integrations, handle rate limits, and run apps, all of which costs money. Charging is fair; hiding the pricing is not.</p>
    <h2>Per-tweet pricing: transparent, cheap at low volume</h2>
    <p>Per-tweet models are straightforward: pay per deletion, unit price is usually low, but the total climbs with volume. They fit one-time cleanups, say a few hundred tweets. Before ordering, do the math: unit price times quantity, then compare with subscription rates.</p>
    <h2>Subscriptions: built for ongoing maintenance</h2>
    <p>Monthly or yearly plans usually include unlimited or a large quota of deletions. They suit people who plan to clean regularly: spend a little each month and sweep newly accumulated risky tweets. Watch the hidden terms: auto-renewal, quota resets, cancellation friction. Those are the real traps.</p>
    <h2>Free options: trading time for money</h2>
    <p>Free paths are real: delete manually one by one, slow but zero cost, or write your own script against the API, which saves money but costs technical skill. Good for small volumes, unhurried timelines, or trying the flow first. Free is fine; using "free" as bait while silently rate-limiting or injecting ads is not.</p>
    <h2>How to compute your real cost</h2>
    <p>Run three numbers: quantity times unit price (per-tweet), yearly fee (subscription), and your own time (free). Pick the lowest total. And before choosing any provider, check whether it demands your archive upload. Anything that says "send us your whole archive" deserves a hard question; local parsing is the privacy baseline.</p>
    <h2>FAQ</h2>
    <p><strong>Is it normal for tweet deletion to cost money?</strong> Yes. X does not offer a bulk deletion API to regular users, and third-party services have to maintain integrations and handle rate limits, so per-tweet or subscription pricing is standard. The key is transparency and no hidden charges.</p>
    <p><strong>Which is better: per-tweet or subscription?</strong> Depends on volume. For a one-time cleanup of a few hundred tweets, per-tweet pricing wins. For ongoing maintenance, a subscription saves more. Total the real cost before choosing.</p>
    <p><strong>Is there a free way to delete tweets?</strong> Yes. X allows manual deletion one by one, free but slow. For a small volume you can write a script against the API, which needs some technical skill. Free means paying in time or effort.</p>
    <p><strong>Could a deletion service misuse my data?</strong> Depends on the provider. The rule: it should parse locally, never upload your archive to a cloud, and only act within the account authorization you granted. Be extra careful if a provider demands your full archive upload.</p>
    <p>Curious how big your cleanup is and how long it will take? Upload your archive for a free report at digital-footprint-health.shop, size up the job first, then pick a plan.</p>
    `,
  },
  {
    slug: 'pause-resume-refund-deletion',
    title: '删除可以暂停、续传、退款',
    excerpt:
      '删除任务进行到一半想停？删错了想退款？这篇讲清楚删除服务的暂停、续传和退款机制：什么情况下能暂停、怎么安全续传、退款规则怎么判断，让你花得放心。',
    date: '2026-08-16',
    updatedAt: '2026-08-16',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['X/Twitter', '数字足迹', '删除任务', '暂停续传退款'],
    canonical: '/blog/pause-resume-refund-deletion',
    faq: [
      {
        q: '删除任务可以随时暂停吗？',
        a: '正规服务都可以。暂停的意义在于：删除不可逆，你随时可能发现某类推文不该删，或者担心速度太快触发限流。暂停不是半途而废，是给你留一个重新判断的窗口。',
        qEn: 'Can a deletion task be paused anytime?',
        aEn: 'Legitimate services allow it. Pausing matters because deletion is irreversible: you may realize a category should stay, or worry the pace will trigger rate limits. Pausing is not quitting; it is a window to re-decide.'
      },
      {
        q: '暂停后怎么续传？',
        a: '续传的关键是断点记录。好的服务会记录已删的推文 ID，续传时自动跳过，不重复删。如果服务商连进度都不保存，换个服务更稳妥。',
        qEn: 'How do I resume after pausing?',
        aEn: 'Resuming depends on checkpoint tracking. Good services record deleted tweet IDs and skip them on resume. If a provider cannot even save progress, find a better one.'
      },
      {
        q: '删错了能退款吗？',
        a: '看退款规则，删错本身不构成退款理由，因为删除是你的授权操作。但服务故障导致任务失败、或未按约定删除，这类属于服务方责任，正规服务会退款。下单前把退款条款看清楚。',
        qEn: 'Can I get a refund if I delete the wrong tweets?',
        aEn: "Depends on the refund policy. Deleting wrong tweets is not a refund reason by itself, because deletion is your authorized action. But service failure or not deleting what was agreed is the provider’s fault, and legitimate services refund that. Read the terms before paying."
      },
      {
        q: '删除到一半账号换了怎么办？',
        a: '绑定的是账号授权而不是你的邮箱，换账号等于换授权，旧任务自然停止。重新在新账号上授权并开始新任务即可，之前的进度通常不迁移。',
        qEn: 'What if I switch accounts mid-deletion?',
        aEn: 'Authorization is tied to the account, not your email. Switching accounts ends the old task automatically. Authorize the new account and start a new task; progress usually does not carry over.'
      }
    ],
    titleEn: 'Pause, Resume, Refund: Deletion That Puts You in Control',
    excerptEn:
      'Can you pause a deletion task halfway? Get a refund if something goes wrong? This post explains pause, resume, and refund mechanisms for tweet deletion, so you spend with confidence.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['X/Twitter', 'digital footprint', 'pause resume', 'deletion refund'],
    content: `
    <p>买任何线上服务，我都会先翻退款条款。删除推文这种不可逆操作，更应该把"能不能停、能不能退"问清楚再付款。这篇把删除服务的暂停、续传、退款三件事拆开讲：什么情况能暂停、续传靠什么机制、退款怎么判断。</p>
    <h2>暂停：删除不可逆，所以更要能停</h2>
    <p>正规的删除服务都会允许随时暂停任务。这不是功能冗余，而是风险控制：删除是永久操作，你完全可能在任务进行到一半时发现"这类推文不该删"或者"删太快怕触发限流"。pause tweet deletion 不是半途而废，是给你留一个重新判断的窗口。</p>
    <h2>续传：断点记录是关键</h2>
    <p>暂停之后能不能安全继续，全看服务商有没有断点记录。好的服务会记录已经删除的推文 ID，续传时自动跳过，绝不重复删、不遗漏。判断标准很简单：暂停后重新开始，如果任务从头跑，说明它没存进度，换个服务。</p>
    <h2>退款：分清责任再谈钱</h2>
    <p>退款规则分两种情形。第一种，你删错了推文——这不构成退款理由，因为删除是你的授权操作，服务商照做了。第二种，服务故障导致任务失败、或根本没按约定删除——这是服务方责任，正规服务会退款或补偿。下单前把退款条款截图存好，出了问题有依据。</p>
    <h2>换账号：授权跟着账号走</h2>
    <p>删除服务绑定的是账号授权，不是你的邮箱。换账号等于换授权，旧任务自动停止，进度一般不迁移。换号前先确认旧任务的暂停或完成状态，别让一个半截任务悬着。</p>
    <h2>怎么判断一个服务靠不靠谱</h2>
    <ul>
    <li>有暂停按钮，且暂停立即生效，不是"排队取消"</li>
    <li>续传自动跳过已删推文，有进度可视化</li>
    <li>退款条款白纸黑字，区分用户责任和服务方责任</li>
    <li>本地解析归档，不上传云端</li>
    </ul>
    <p>四条全中，基本可以放心用；缺一半以上，建议再找找。</p>
    <h2>FAQ</h2>
    <p><strong>删除任务可以随时暂停吗？</strong> 正规服务都可以。暂停的意义在于：删除不可逆，你随时可能发现某类推文不该删，或者担心速度太快触发限流。暂停不是半途而废，是给你留一个重新判断的窗口。</p>
    <p><strong>暂停后怎么续传？</strong> 续传的关键是断点记录。好的服务会记录已删的推文 ID，续传时自动跳过，不重复删。如果服务商连进度都不保存，换个服务更稳妥。</p>
    <p><strong>删错了能退款吗？</strong> 看退款规则，删错本身不构成退款理由，因为删除是你的授权操作。但服务故障导致任务失败、或未按约定删除，这类属于服务方责任，正规服务会退款。下单前把退款条款看清楚。</p>
    <p><strong>删除到一半账号换了怎么办？</strong> 绑定的是账号授权而不是你的邮箱，换账号等于换授权，旧任务自然停止。重新在新账号上授权并开始新任务即可，之前的进度通常不迁移。</p>
    <p>删除不该是一次押上全部筹码的赌博。来 digital-footprint-health.shop 看看，删除任务怎么做成可暂停、可续传、明码标价的样子。</p>
    `,
    contentEn: `
    <p>For any paid online service, I read the refund terms first. For irreversible operations like tweet deletion, asking "can I stop, can I get my money back" before paying matters even more. This post breaks down pause, resume, and refund for deletion services: when you can pause, what makes resume safe, and how refunds are judged.</p>
    <h2>Pause: deletion is irreversible, so it must be stoppable</h2>
    <p>Legitimate deletion services let you pause a task anytime. That is not feature bloat, it is risk control: deletion is permanent, and you may well discover halfway that "this category should stay" or that "this pace will trigger rate limits". Pausing a tweet deletion is not quitting; it is a window to re-decide.</p>
    <h2>Resume: checkpoint tracking is everything</h2>
    <p>Whether you can safely continue after a pause depends entirely on checkpoint records. Good services log deleted tweet IDs and skip them on resume, never deleting twice, never missing any. The test is simple: pause, restart, and if the task starts from zero, it never saved progress. Find another service.</p>
    <h2>Refund: assign responsibility before talking money</h2>
    <p>Refund rules split into two cases. First, you deleted the wrong tweets. That is not a refund reason, because deletion is your authorized action and the provider did what you asked. Second, a service failure broke the task or it never deleted what was agreed. That is the provider's fault, and legitimate services refund or compensate. Screenshot the refund terms before paying.</p>
    <h2>Switching accounts: authorization follows the account</h2>
    <p>Deletion services bind to account authorization, not your email. Switching accounts revokes the old authorization and stops the old task; progress usually does not carry over. Confirm the old task is paused or completed before switching, so no half-finished job hangs around.</p>
    <h2>How to tell a solid service from the rest</h2>
    <ul>
    <li>A pause button that takes effect immediately, not "queued for cancellation"</li>
    <li>Resume that skips already-deleted tweets, with visible progress</li>
    <li>Refund terms in black and white, separating user fault from provider fault</li>
    <li>Local archive parsing, no cloud upload</li>
    </ul>
    <p>All four, and you can trust it. Missing half or more, keep looking.</p>
    <h2>FAQ</h2>
    <p><strong>Can a deletion task be paused anytime?</strong> Legitimate services allow it. Pausing matters because deletion is irreversible: you may realize a category should stay, or worry the pace will trigger rate limits. Pausing is not quitting; it is a window to re-decide.</p>
    <p><strong>How do I resume after pausing?</strong> Resuming depends on checkpoint tracking. Good services record deleted tweet IDs and skip them on resume. If a provider cannot even save progress, find a better one.</p>
    <p><strong>Can I get a refund if I delete the wrong tweets?</strong> Depends on the refund policy. Deleting wrong tweets is not a refund reason by itself, because deletion is your authorized action. But service failure or not deleting what was agreed is the provider's fault, and legitimate services refund that. Read the terms before paying.</p>
    <p><strong>What if I switch accounts mid-deletion?</strong> Authorization is tied to the account, not your email. Switching accounts ends the old task automatically. Authorize the new account and start a new task; progress usually does not carry over.</p>
    <p>Deletion should not be an all-in bet. See how a deletion task can be pausable, resumable, and clearly priced at digital-footprint-health.shop.</p>
    `,
  },
];


export function getPost(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}
