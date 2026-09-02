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
    title: '如何删除 X (Twitter) 上的旧推文 — 2026 完整指南（含免费工具）',
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
<p>Cons: still require granting the extension permission to read X's page content, and are limited by X\'s API limits (can only process the most recent 3,200 tweets).</p>

<h2>Method 4: X archive + local solution (most recommended)</h2>
<p>This is the safest approach and the only one that can delete your entire tweet history. How it works:</p>
<ol>
  <li>Request a download of your full data archive in X's settings (includes every tweet since you registered).</li>
  <li>Upload the archive to a tool that does <strong>pure local processing</strong> to parse it.</li>
  <li>The tool analyzes risky tweets on your device, then deletes them on demand through X's official write API.</li>
</ol>
<p>The key advantage of this approach is that your data never leaves your own device — no server upload, no third-party storage, no data-leak risk.</p>
<p>This is exactly what <strong>Digital Footprint Health</strong> does. We don't call X\'s read API; all analysis happens locally in your browser. Only when you want to delete tweets do we execute the deletion through X\'s official interface, with transparent per-tweet pricing.</p>

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
<p>It's X\'s official export of your full tweet history as structured data. The format is a JavaScript assignment: <code>window.YTD.tweets.part0 = [ ... ]</code> — an array where each object is one tweet. A privacy-check tool parses this array.</p>

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
<p>It includes anything that existed at export time. The archive is a snapshot — tweets deleted before export won't appear, but the old history beyond X\'s ~3,200-tweet delete limit is all there.</p>

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
<p>The limit is not on your account. It lives at the API layer: X's public endpoints (including the ones the web app and mobile app use) only page through roughly the most recent 3,200 tweets, for performance and commercial reasons. When the UI says "you\'re caught up," it means the recent window is empty — older history still exists, it just has no entry point.</p>
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
  },
  {
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
<p>Background checks grew from "call the previous employer" to "search all public social media". X's search box is the cheapest step: type a candidate\'s name and their tweet history appears in seconds. Most HR people are not hunting for trouble, but they check three things: extreme positions, discriminatory language, and behavior that contradicts the resume.</p>
<p>The core problem is that tweets have a long half-life. X's public search index keeps tweets from years ago, while people\'s views and circumstances change. A throwaway joke from five years back gets screenshotted out of context and dropped into the interview discussion. You never get to explain. That is the typical path of an old tweet hiring incident.</p>

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
<p>The report comes straight from your X data export, parsed on your own device. It does not pull anything new from X's servers. Two numbers do most of the work: a 0-100 health score where higher means safer, and a count of flagged tweets grouped by label. Underneath sits the per-tweet list, the part you\'ll spend real time in. None of it leaves your machine, which is the whole point of a privacy check.</p>

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
<p>Most posts a footprint report flags are old. Twitter keeps your history indexed for years, and a single 2015 tweet with your old address is still reachable through Google today. That's why the report surfaces tweets you forgot you posted. The risk labels on Twitter are not about what you post now; they\'re about what has sat public the whole time. A hiring manager or a stranger can read it without you ever knowing.</p>

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
    <p>Last week a friend sent me a screenshot of his X account's privacy checkup: seven years, 23,000 tweets, 61 red high-risk labels. He stared at the screen and asked, "I can\'t delete everything, can I? What tweets to delete first?"</p>
    <p>Fair question. Nobody reads twenty thousand tweets one by one, and most of them honestly don't need to go. Cleaning your timeline shouldn\'t run on vibes. It should run on priority. The tiers below are what I landed on after scanning 50,000 of my own historical tweets, and you can copy the order directly.</p>
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
    <p>Here's the short version first. Labels aren\'t a death sentence. They\'re a map. Once you know what each one is telling you, you know which corner of the account to clean first.</p>
    <h2>phone and email: your contact lines</h2>
    <p>These two are straightforward. The label means a tweet contains something that looks like a mobile number or an email address. The trigger is simple: a string matching an 11-digit phone format, or a standard email pattern.</p>
    <p>The risk is high, because contact details are the shortest route a stranger has to reach you. When you see these tags, don't overthink it. Open the original tweet, confirm it\'s real, delete. One edge case worth knowing: if someone else posted the number and you reposted it, it still counts. Your account\'s association ties that number to you either way.</p>
    <h2>address and location: where you are, where you live</h2>
    <p>address means home-type information: door numbers, neighborhood names, a street plus a city. location is broader. It covers check-in geotags, your office, the places you frequent.</p>
    <p>The risk levels differ. address is direct exposure of where you live, close to P0. location is pattern-based, harmless one post at a time, dangerous when fifty of them stack into a movement map. When both appear, the report ranks address above location, which is your ordering hint.</p>
    <h2>sensitive: conversations that age badly</h2>
    <p>This is the label that most needs human judgment. It catches politically sensitive remarks, jokes about regions, genders, or ethnic groups, and attack-style comments toward specific communities.</p>
    <p>It's not saying you were wrong. It\'s saying this tweet, ripped out of its original context, travels really well as a screenshot. That late-night rant you aimed at a friend reads like a completely different story when it circulates on its own. Risk is medium-high, and the fix is reading the original and deciding for yourself.</p>
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
    <p>When a report opens, everybody looks at the number first. 79. Is that good or bad? Why does my friend have 91 and I'm stuck at 79? I\'m not going to recite formulas at you. I\'ll explain the thinking behind the score, and you\'ll be able to estimate your own in your head.</p>
    <p>The most important thing first: **this score is not an exam. Higher isn't automatically better, and there\'s no passing line.** It\'s a mirror. It only reflects how exposed your account is right now.</p>
    <h2>Four dimensions fight each other, then get weighted</h2>
    <p>The score doesn't come out of thin air. Four blocks build it, each with a different weight:</p>
    <ul>
    <li>**Share of risky tweets**: risky tweets divided by total tweets. This is the biggest variable and carries the most weight. Big account, lots of risk, this number drags everything down.</li>
    <li>**High-risk category weight**: not all risk is equal. A tweet tagged phone, email, or identity costs more points than one tagged sensitive. The more dangerous the category, the heavier the single-tweet penalty.</li>
    <li>**Time decay**: most people don't see this coming. A phone number tweeted in 2016 is less dangerous than the same tweet from 2024, because the number has probably been deactivated. Older tweets lose fewer points, but not zero, since screenshots stick around in other people\'s hands.</li>
    <li>**Quantity effect**: this isn't linear. One phone number tweet versus ten phone number tweets isn\'t a tenfold difference. It\'s the difference between "an accident" and "a habit." More posts mean higher marginal harm.</li>
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
  {
    "slug": "delete-tweets-by-date",
    "title": "按日期删：把 2018 年以前的所有推文删光",
    "excerpt": "想按日期删推文？这篇讲清楚按日期删除的原理和做法：X 归档里怎么按时间筛选、跨年份批量删的注意点、以及为什么“删掉旧推文”不等于“抹掉过去”。",
    "date": "2026-08-17",
    "updatedAt": "2026-08-17",
    "author": "Digital Footprint Health Team",
    "category": "删除教程",
    "tags": [
      "X/Twitter",
      "数字足迹"
    ],
    "canonical": "/blog/delete-tweets-by-date",
    "faq": [
      {
        "q": "按日期删推文能精确到哪天吗？",
        "a": "能。X 归档的 tweets.js 里每条推文都有时间戳，按日期筛选是精确的。常见做法是“删掉某年以前”，比如删光 2018 年以前的，保留最近几年的。",
        "qEn": "Can date-based deletion be precise to the day?",
        "aEn": "Yes. Every tweet in the X archive tweets.js has a timestamp, so date filtering is exact. The common pattern is \"delete everything before year X\", like wiping pre-2018 while keeping recent years."
      },
      {
        "q": "删旧推文有没有风险？",
        "a": "有。旧推文里可能有你后来忘记的私人信息，也可能有值得留的回忆。批量删之前先导出备份、抽几篇看一眼，再决定边界。",
        "qEn": "Any risk in deleting old tweets?",
        "aEn": "Yes. Old tweets can hold personal info you forgot about, or memories worth keeping. Back up the archive, sample a few tweets, then set the boundary before bulk deleting."
      },
      {
        "q": "2018 年以前的推文为什么特别值得清理？",
        "a": "账号早期内容通常最不设防：随意发过的心情、定位打卡、过期联系方式。而且年代越久，越可能包含现在会尴尬或泄露的信息。",
        "qEn": "Why are pre-2018 tweets worth cleaning especially?",
        "aEn": "Early account content is usually the least guarded: random moods, location check-ins, outdated contact info. The older it is, the more likely it contains something embarrassing or revealing now."
      }
    ],
    "titleEn": "Delete by Date: Wipe Everything Before 2018",
    "content": "<p>很多人清理账号的第一步，不是删最新内容，而是回头看最早的推文。十年前随手发的东西，现在再看往往只剩尴尬，偶尔还有真隐患。按日期删推文，就是把“某个时间点以前”的内容整体清掉，一次解决一大片。</p>\n    <h2>为什么按日期删是最高效的起点</h2>\n    <p>账号早期内容有三个共同点：不设防、无价值、占大头。刚注册时谁都发过“今天好累”“这个真好吃”这类随手心情，十年后它们既不代表你，又可能埋着定位、学校、手机号之类信息。按日期批量删，正好把这块最陈旧的区域整体处理掉。</p>\n    <h2>先导出归档，再定边界</h2>\n    <p>删之前先做两件事：第一，在 X 设置里导出完整归档，本地留一份备份；第二，打开 tweets.js，把最早几年的推文抽样看一遍，确认边界。推荐从“2018 年以前”开始，这个年份对多数账号来说，是“没什么可保留”和“还有点意思”的分界。</p>\n    <h2>按日期删的实操路径</h2>\n    <ul>\n    <li>导出归档：设置 → 账号 → 下载数据，等邮件通知</li>\n    <li>解压后打开 tweets.js，按 created_at 排序，确认要删的时间段</li>\n    <li>用按日期筛选的清理工具，设置起始与截止时间</li>\n    <li>先小范围试删（比如只删某一年的），确认无误再扩到全部</li>\n    </ul>\n    <h2>别把“删旧”当“抹掉过去”</h2>\n    <p>一个诚实的提醒：按日期删删掉的是公开可见的推文，不等于抹掉过去。转发、截图、别人的提及，都可能让内容继续存在。清理的价值在于减少公开暴露面，而不是追求物理上的删除。</p>\n    <h2>FAQ</h2>\n    <p><strong>按日期删推文能精确到哪天吗？</strong> 能。X 归档的 tweets.js 里每条推文都有时间戳，按日期筛选是精确的。常见做法是“删掉某年以前”，比如删光 2018 年以前的，保留最近几年的。</p>\n    <p><strong>删旧推文有没有风险？</strong> 有。旧推文里可能有你后来忘记的私人信息，也可能有值得留的回忆。批量删之前先导出备份、抽几篇看一眼，再决定边界。</p>\n    <p><strong>2018 年以前的推文为什么特别值得清理？</strong> 账号早期内容通常最不设防：随意发过的心情、定位打卡、过期联系方式。而且年代越久，越可能包含现在会尴尬或泄露的信息。</p>\n    <p>想把账号的历史包袱卸掉？来 digital-footprint-health.shop 看看按日期筛选是怎么做的。</p>",
    "contentEn": "<p>Most account cleanups do not start with the newest posts. They start with the oldest. Things you tweeted ten years ago now read as awkward at best, risky at worst. Deleting tweets by date clears everything before a cutoff in one sweep.</p>\n    <h2>Why by-date is the most efficient starting point</h2>\n    <p>Early account content shares three traits: unguarded, low value, and huge in volume. Everyone posted \"today was long\" and \"this is delicious\" right after signing up. A decade later those tweets represent nothing and may still carry locations, school names, or old phone numbers. Wiping by date handles this stale region in one pass.</p>\n    <h2>Export the archive, then set the boundary</h2>\n    <p>Do two things before deleting. First, export your full archive from X settings and keep a local backup. Second, open tweets.js and sample the earliest years to confirm the boundary. A good default is \"everything before 2018\" — for most accounts that is where nothing worth keeping meets nothing interesting anyway.</p>\n    <h2>How date-based deletion works</h2>\n    <ul>\n    <li>Export archive: Settings → Account → Download data, wait for the email</li>\n    <li>Unzip, open tweets.js, sort by created_at, confirm the range</li>\n    <li>Use a cleanup tool with date filtering, set start and end times</li>\n    <li>Test on one year first, confirm, then expand to the full range</li>\n    </ul>\n    <h2>Deleting old is not erasing the past</h2>\n    <p>An honest note: deleting by date removes publicly visible tweets, not the past. Retweets, screenshots, and other people's mentions can keep content alive. The value of cleanup is shrinking the public exposure surface, not achieving physical deletion.</p>\n    <h2>FAQ</h2>\n    <p><strong>Can date-based deletion be precise to the day?</strong> Yes. Every tweet in the X archive tweets.js has a timestamp, so date filtering is exact. The common pattern is \"delete everything before year X\", like wiping pre-2018 while keeping recent years.</p>\n    <p><strong>Any risk in deleting old tweets?</strong> Yes. Old tweets can hold personal info you forgot about, or memories worth keeping. Back up the archive, sample a few tweets, then set the boundary before bulk deleting.</p>\n    <p><strong>Why are pre-2018 tweets worth cleaning especially?</strong> Early account content is usually the least guarded: random moods, location check-ins, outdated contact info. The older it is, the more likely it contains something embarrassing or revealing now.</p>\n    <p>Ready to drop the historical baggage? See how date filtering works at digital-footprint-health.shop.</p>"
  },
  {
    "slug": "delete-tweets-by-keyword",
    "title": "按关键词删：批量清理\"中二时期\"内容",
    "excerpt": "按关键词删推文是最省力的清理方式：输入一个词，所有含它的推文列出来，确认后一键删。这篇讲关键词删除的适用场景、常见坑，以及怎么避免误删。",
    "date": "2026-08-17",
    "updatedAt": "2026-08-17",
    "author": "Digital Footprint Health Team",
    "category": "删除教程",
    "tags": [
      "X/Twitter",
      "数字足迹"
    ],
    "canonical": "/blog/delete-tweets-by-keyword",
    "faq": [
      {
        "q": "按关键词删能删掉所有匹配的推文吗？",
        "a": "能删掉所有公开推文中含该关键词的。注意只匹配你发的推文，不匹配别人的提及和转发。匹配规则通常是包含关系，比如“晚安”会匹配“说晚安”。",
        "qEn": "Does keyword deletion remove every matching tweet?",
        "aEn": "It removes all your public tweets containing the keyword. It only matches your own tweets, not mentions or retweets by others. Matching is usually containment, so \"goodnight\" also catches \"said goodnight\"."
      },
      {
        "q": "关键词删会不会误删？",
        "a": "有可能。一个词可能有多种含义，比如“分手”既可能是你的心情也可能是转发歌词。批量删前先看匹配列表，逐条勾选或先小范围试删。",
        "qEn": "Can keyword deletion cause false positives?",
        "aEn": "Yes. A word can have multiple meanings: \"break up\" might be your mood or a lyric you retweeted. Review the match list before deleting, or test on a small set first."
      },
      {
        "q": "适合用关键词删哪些内容？",
        "a": "典型的“中二时期”关键词：中二的自我宣言、特定前任的名字、旧学校名、过期的自嘲梗。删完再看一遍列表，往往能回忆起自己还发过什么。",
        "qEn": "What is keyword deletion best for?",
        "aEn": "Classic cringe-era terms: dramatic self-declarations, an ex's name, your old school name, expired self-deprecating memes. Reviewing the match list often reminds you of what else you posted."
      }
    ],
    "titleEn": "Delete by Keyword: Clean Up Your Cringe Era",
    "content": "<p>按日期删解决“时间范围”，按关键词删解决“内容类型”。你不需要翻完十年推文，只需要记得几个关键词——前任的名字、中二的宣言、过期的梗——输入进去，所有匹配的推文就全列出来了。</p>\n    <h2>关键词删除的本质</h2>\n    <p>它本质是一个过滤器：在你自己发的全部推文里，找出含指定词的所有条目，列成清单，确认后批量删除。关键词匹配通常包含字符组合，比如删“晚安”会把“说晚安”“晚安世界”都带出来。</p>\n    <h2>最值得删的三类关键词</h2>\n    <ul>\n    <li>人名类：前任、绝交的朋友、旧同事——尤其带着情绪发过的</li>\n    <li>地点类：旧学校、旧公司、老地址——暴露信息往往藏在里面</li>\n    <li>状态类：“中二宣言”“再也不……”“此生无悔”这类情绪峰值内容</li>\n    </ul>\n    <h2>怎么避免误删</h2>\n    <p>一个词往往有多个含义。批量删之前，先看匹配清单，逐条扫一眼：这条是不是转发歌词？那条是不是在聊别人？拿不准的先保留。实操建议：先删确定性的（前任名字），再处理模糊的（通用词）。</p>\n    <h2>关键词删完还能补救吗</h2>\n    <p>删了就是删了，X 的删除不可逆，只有本地备份能兜底。所以批量删之前，一定先导出归档。归档里的内容是完整的，删错了也能查，只是不能恢复成公开状态。</p>\n    <h2>FAQ</h2>\n    <p><strong>按关键词删能删掉所有匹配的推文吗？</strong> 能删掉所有公开推文中含该关键词的。注意只匹配你发的推文，不匹配别人的提及和转发。匹配规则通常是包含关系，比如“晚安”会匹配“说晚安”。</p>\n    <p><strong>关键词删会不会误删？</strong> 有可能。一个词可能有多种含义，比如“分手”既可能是你的心情也可能是转发歌词。批量删前先看匹配列表，逐条勾选或先小范围试删。</p>\n    <p><strong>适合用关键词删哪些内容？</strong> 典型的“中二时期”关键词：中二的自我宣言、特定前任的名字、旧学校名、过期的自嘲梗。删完再看一遍列表，往往能回忆起自己还发过什么。</p>\n    <p>想按关键词清理黑历史？来 digital-footprint-health.shop 看看关键词筛选是怎么做的。</p>",
    "contentEn": "<p>By-date deletion handles the time range; by-keyword deletion handles the content type. You do not need to read ten years of tweets, just remember a few words — an ex's name, a dramatic declaration, an expired meme — type them in, and every match appears in one list.</p>\n    <h2>What keyword deletion really is</h2>\n    <p>It is a filter: search all your own tweets for entries containing a given word, list them, confirm, and delete in bulk. Matching is usually containment, so deleting \"goodnight\" also pulls \"said goodnight\" and \"goodnight world\".</p>\n    <h2>Three keyword categories worth deleting first</h2>\n    <ul>\n    <li>Names: exes, cut-off friends, old colleagues — especially the ones posted with emotion</li>\n    <li>Places: old schools, old employers, old addresses — leaks often hide here</li>\n    <li>States: dramatic declarations, \"never again\" lines, peak-emotion posts</li>\n    </ul>\n    <h2>How to avoid false positives</h2>\n    <p>One word can carry many meanings. Review the match list before batch deleting: is this a lyric retweet? Is that about someone else? Keep the ambiguous ones. Practically, delete the certain ones first (the ex's name), then handle the fuzzy ones (generic words).</p>\n    <h2>Can you undo keyword deletion?</h2>\n    <p>Deleted is deleted. X deletion is irreversible, and only a local backup can help. So export the archive before batch deleting. The archive holds everything, so you can still look things up, you just cannot restore them publicly.</p>\n    <h2>FAQ</h2>\n    <p><strong>Does keyword deletion remove every matching tweet?</strong> It removes all your public tweets containing the keyword. It only matches your own tweets, not mentions or retweets by others. Matching is usually containment, so \"goodnight\" also catches \"said goodnight\".</p>\n    <p><strong>Can keyword deletion cause false positives?</strong> Yes. A word can have multiple meanings: \"break up\" might be your mood or a lyric you retweeted. Review the match list before deleting, or test on a small set first.</p>\n    <p><strong>What is keyword deletion best for?</strong> Classic cringe-era terms: dramatic self-declarations, an ex's name, your old school name, expired self-deprecating memes. Reviewing the match list often reminds you of what else you posted.</p>\n    <p>Want to clean your cringe era by keyword? See how keyword filtering works at digital-footprint-health.shop.</p>"
  },
  {
    "slug": "remove-location-tweets",
    "title": "定位推文批量清理：旅行打卡也能删",
    "excerpt": "打卡推文是隐私大户：位置标签、定位记录、行程暴露，全在里面。这篇讲怎么批量删除带定位的推文、为什么定位数据风险被低估，以及清理打卡推文的操作要点。",
    "date": "2026-08-17",
    "updatedAt": "2026-08-17",
    "author": "Digital Footprint Health Team",
    "category": "删除教程",
    "tags": [
      "X/Twitter",
      "数字足迹"
    ],
    "canonical": "/blog/remove-location-tweets",
    "faq": [
      {
        "q": "定位推文的风险在哪？",
        "a": "打卡推文会暴露你的行程规律：常去的地方、不在家的时段、旅行的日期。把这些拼起来，可以推断你的住址、工作地点和作息，是隐私泄露里被低估的一类。",
        "qEn": "What is the risk of location tweets?",
        "aEn": "Check-in tweets expose your routines: frequented places, hours you are away, travel dates. Stitched together they reveal your address, workplace, and schedule — a severely underestimated leak category."
      },
      {
        "q": "怎么找到所有带定位的推文？",
        "a": "归档里每条带位置信息的推文都有 place 或 coordinates 字段，清理工具可以按这个筛选。也可以按“打卡关键词”过滤：签到、位置、check-in、地名等。",
        "qEn": "How do I find all location tweets?",
        "aEn": "In the archive, tweets with location carry place or coordinates fields, and cleanup tools can filter on those. You can also filter by check-in keywords like \"check-in\", \"at\", and place names."
      },
      {
        "q": "删打卡推文会影响别的吗？",
        "a": "不会。定位数据只是推文的一个字段，删除它不影响其他内容。需要留意的是：某些平台的定位在发布时已写入推文文本，那种要按关键词处理。",
        "qEn": "Does deleting check-in tweets affect anything else?",
        "aEn": "No. Location is just one field on a tweet; removing it leaves everything else intact. Note that some platforms bake the location into the tweet text at publish time, which needs keyword handling instead."
      }
    ],
    "titleEn": "Remove Location-Tagged Tweets in Bulk",
    "content": "<p>旅行打卡、餐厅签到、飞机落地报平安——这些推文看起来人畜无害，却是账号里隐私浓度最高的一类。定位数据把“你去过哪、什么时候在、常待在哪”拼成一张完整的行踪图，而多数人从来没想过清理它们。</p>\n    <h2>为什么定位数据被低估</h2>\n    <p>打卡推文的危害不在单条，在聚合。一条“在杭州”没什么；一年三十条“在杭州”“在深圳”“在机场”，就把你的常住城市、出差节奏、休假习惯全暴露了。顺着时间线看，连“这个点他通常不在家”都推算得出来。</p>\n    <h2>归档里怎么识别定位推文</h2>\n    <p>X 归档的 tweets.js 里，带定位的推文会有 place 或 coordinates 字段。手动翻很痛苦，但清理工具可以按这个字段自动筛出所有带定位的推文，一次列全。</p>\n    <h2>批量清理的操作要点</h2>\n    <ul>\n    <li>先用归档筛选功能把带定位的推文全列出来，看数量</li>\n    <li>浏览一遍，确认哪些是真的定位推文，哪些是误匹配</li>\n    <li>按时间或按“全部定位推文”批量删除</li>\n    <li>删完再扫一遍：文本里直接写地名的（如“刚落地北京”）不在 place 字段里，要用关键词补删</li>\n    </ul>\n    <h2>以后还打卡吗</h2>\n    <p>清理完，建议把发布习惯也改掉：实时打卡改成事后分享，不带定位；非要发位置，等离开后再发。行踪信息给得越晚、越模糊，聚合出来的图就越没用。</p>\n    <h2>FAQ</h2>\n    <p><strong>定位推文的风险在哪？</strong> 打卡推文会暴露你的行程规律：常去的地方、不在家的时段、旅行的日期。把这些拼起来，可以推断你的住址、工作地点和作息，是隐私泄露里被低估的一类。</p>\n    <p><strong>怎么找到所有带定位的推文？</strong> 归档里每条带位置信息的推文都有 place 或 coordinates 字段，清理工具可以按这个筛选。也可以按“打卡关键词”过滤：签到、位置、check-in、地名等。</p>\n    <p><strong>删打卡推文会影响别的吗？</strong> 不会。定位数据只是推文的一个字段，删除它不影响其他内容。需要留意的是：某些平台的定位在发布时已写入推文文本，那种要按关键词处理。</p>\n    <p>想把行踪图从账号里抹掉？来 digital-footprint-health.shop 看看定位筛选是怎么做的。</p>",
    "contentEn": "<p>Travel check-ins, restaurant tags, \"landed safe\" updates — they look harmless, but they are the highest-privacy-density content on your account. Location data stitches \"where you went, when you were there, where you stay\" into one readable map, and almost nobody ever thinks to clean it.</p>\n    <h2>Why location data is underestimated</h2>\n    <p>Check-in tweets are dangerous in aggregate, not individually. One \"in Hangzhou\" means nothing. Thirty of them across a year expose your home city, travel rhythm, and holiday habits. Read chronologically, they even reveal \"around this hour he is usually not home\".</p>\n    <h2>How to spot location tweets in the archive</h2>\n    <p>In the X archive tweets.js, tweets with location carry place or coordinates fields. Scanning by hand is miserable, but cleanup tools can auto-filter all location tweets from the archive in one pass.</p>\n    <h2>Bulk cleanup, step by step</h2>\n    <ul>\n    <li>Use archive filtering to list all location tweets, check the count</li>\n    <li>Review the list, confirm which are real check-ins and which are false matches</li>\n    <li>Batch delete by time range or \"all location tweets\"</li>\n    <li>Rescan after deleting: tweets with place names in the text (\"just landed in Beijing\") are not in the place field and need keyword deletion</li>\n    </ul>\n    <h2>Check in less, or check in later</h2>\n    <p>After the cleanup, change the habit: share after the fact instead of in real time, without the location tag. Or post the place after you have left. The later and vaguer the location, the less useful the aggregated map.</p>\n    <h2>FAQ</h2>\n    <p><strong>What is the risk of location tweets?</strong> Check-in tweets expose your routines: frequented places, hours you are away, travel dates. Stitched together they reveal your address, workplace, and schedule — a severely underestimated leak category.</p>\n    <p><strong>How do I find all location tweets?</strong> In the archive, tweets with location carry place or coordinates fields, and cleanup tools can filter on those. You can also filter by check-in keywords like \"check-in\", \"at\", and place names.</p>\n    <p><strong>Does deleting check-in tweets affect anything else?</strong> No. Location is just one field on a tweet; removing it leaves everything else intact. Note that some platforms bake the location into the tweet text at publish time, which needs keyword handling instead.</p>\n    <p>Want to erase the map from your account? See how location filtering works at digital-footprint-health.shop.</p>"
  },
  {
    "slug": "precision-delete-phone-email",
    "title": "只删含手机号/邮箱的推文？精准删除",
    "excerpt": "不是所有旧推文都需要删，需要删的是那些带敏感信息的。这篇讲精准删除的思路：怎么只筛选含手机号、邮箱、地址的推文，把清理目标从“全部”缩小到“真正危险的”。",
    "date": "2026-08-17",
    "updatedAt": "2026-08-17",
    "author": "Digital Footprint Health Team",
    "category": "删除教程",
    "tags": [
      "X/Twitter",
      "数字足迹"
    ],
    "canonical": "/blog/precision-delete-phone-email",
    "faq": [
      {
        "q": "怎么只删含手机号的推文？",
        "a": "归档筛选可以按正则匹配手机号格式，把所有含 11 位数字或特定区号模式的推文列出来。邮箱同理，匹配 xxx@yyy.zzz 模式。列出来后确认、批量删。",
        "qEn": "How do I delete only tweets with phone numbers?",
        "aEn": "Archive filtering can regex-match phone formats and list every tweet containing an 11-digit number or specific country-code patterns. Emails work the same way, matching xxx@yyy.zzz patterns. Confirm the list, then batch delete."
      },
      {
        "q": "手机号推文的风险是什么？",
        "a": "手机号是身份验证的关键凭据，泄露后可能被用来撞库、社工、甚至尝试接管账号。它比邮箱更危险，因为很多服务默认手机号即身份。",
        "qEn": "What is the risk of phone-number tweets?",
        "aEn": "Phone numbers are key identity credentials. Leaked, they enable credential stuffing, social engineering, and even account takeover attempts. They are more dangerous than emails because many services treat the number as identity by default."
      },
      {
        "q": "邮箱出现在推文里怎么办？",
        "a": "同样按模式筛选删除。删完再搜一遍自己常用邮箱的变体（加点、下划线、不同域名），因为发帖时可能用过多个变体。",
        "qEn": "What if an email appears in tweets?",
        "aEn": "Filter and delete by pattern the same way. After deleting, search variants of your common email (dots, underscores, different domains), since you may have posted several variants."
      }
    ],
    "titleEn": "Precision Deletion: Only Tweets with Phone & Email",
    "content": "<p>全面清理是理想，精准删除是现实。多数人并不需要删光全部推文——几百条值得留的回忆没必要陪葬。真正必须清掉的，是那些带手机号、邮箱、地址的推文。把目标从“全部”缩小到“真正危险的”，才是可持续的清理策略。</p>\n    <h2>为什么精准删除更现实</h2>\n    <p>全量删除会误伤有价值的内容，而且心理门槛高，容易拖着不做。精准删除只处理含敏感信息的条目，量小、目标明确、做完有强烈的完成感。清理不是一次性清空，是持续地剪掉危险枝条。</p>\n    <h2>手机号：最该优先清的信息</h2>\n    <p>手机号是身份验证的第一道门。泄露后可以被用来撞库、社工、甚至尝试接管账号。而且手机号比邮箱更难换——换邮箱十分钟，换手机号要跑营业厅。所以含手机号的推文，优先级最高。</p>\n    <h2>邮箱和地址：次一级但同样重要</h2>\n    <p>邮箱泄露的风险低于手机号，但配合撞库数据库，可能暴露你在哪些平台注册过。地址（家庭住址、公司地址）则直接关联线下风险。这三类都是“删了不心疼、留着有隐患”的内容。</p>\n    <h2>精准删除的操作路径</h2>\n    <ul>\n    <li>导出归档，用正则筛选手机号模式（如 11 位数字）和邮箱模式</li>\n    <li>人工浏览匹配列表，排除误匹配（比如转发别人的号码）</li>\n    <li>确认后批量删除</li>\n    <li>再用关键词搜自己姓名+城市、手机号变体，补漏</li>\n    </ul>\n    <h2>删完之后</h2>\n    <p>精准删除做完，账号的“危险密度”会明显下降。之后每半年扫一次归档，把新出现的敏感信息清掉，比攒十年再大扫除轻松得多。</p>\n    <h2>FAQ</h2>\n    <p><strong>怎么只删含手机号的推文？</strong> 归档筛选可以按正则匹配手机号格式，把所有含 11 位数字或特定区号模式的推文列出来。邮箱同理，匹配 xxx@yyy.zzz 模式。列出来后确认、批量删。</p>\n    <p><strong>手机号推文的风险是什么？</strong> 手机号是身份验证的关键凭据，泄露后可能被用来撞库、社工、甚至尝试接管账号。它比邮箱更危险，因为很多服务默认手机号即身份。</p>\n    <p><strong>邮箱出现在推文里怎么办？</strong> 同样按模式筛选删除。删完再搜一遍自己常用邮箱的变体（加点、下划线、不同域名），因为发帖时可能用过多个变体。</p>\n    <p>想精准清掉危险信息？来 digital-footprint-health.shop 看看敏感信息筛选是怎么做的。</p>",
    "contentEn": "<p>Full cleanup is the ideal; precision deletion is the reality. Most people do not need to wipe every tweet — hundreds of tweets worth keeping do not deserve to die with the junk. The ones that must go are tweets carrying phone numbers, emails, and addresses. Shrinking the target from \"everything\" to \"genuinely dangerous\" is the sustainable strategy.</p>\n    <h2>Why precision deletion is more realistic</h2>\n    <p>Full deletion damages valuable content and carries a high psychological threshold, so people put it off forever. Precision deletion only touches entries with sensitive info: smaller volume, clear target, and a satisfying sense of completion. Cleanup is not a one-time empty; it is continuously pruning the dangerous branches.</p>\n    <h2>Phone numbers: clean these first</h2>\n    <p>The phone number is the first gate of identity verification. Leaked, it enables credential stuffing, social engineering, and even account takeover attempts. It is also harder to change than an email — swapping an email takes ten minutes, swapping a number takes a trip to the carrier. Tweets with phone numbers rank first in priority.</p>\n    <h2>Emails and addresses: next tier, same importance</h2>\n    <p>Email leaks rank below phone numbers in risk, but combined with breach databases they reveal which platforms you registered on. Addresses (home, workplace) link directly to offline risk. All three are content that costs nothing to delete and carries hidden danger to keep.</p>\n    <h2>How precision deletion works</h2>\n    <ul>\n    <li>Export the archive, regex-filter phone patterns (like 11-digit numbers) and email patterns</li>\n    <li>Manually review the match list, drop false positives (like retweeted numbers)</li>\n    <li>Confirm, then batch delete</li>\n    <li>Search again by name+city and phone variants to catch leftovers</li>\n    </ul>\n    <h2>After the deletion</h2>\n    <p>Precision deletion drops the account's \"danger density\" noticeably. Scan the archive every six months and clear new sensitive info, which is far easier than a decade-scale deep clean.</p>\n    <h2>FAQ</h2>\n    <p><strong>How do I delete only tweets with phone numbers?</strong> Archive filtering can regex-match phone formats and list every tweet containing an 11-digit number or specific country-code patterns. Emails work the same way, matching xxx@yyy.zzz patterns. Confirm the list, then batch delete.</p>\n    <p><strong>What is the risk of phone-number tweets?</strong> Phone numbers are key identity credentials. Leaked, they enable credential stuffing, social engineering, and even account takeover attempts. They are more dangerous than emails because many services treat the number as identity by default.</p>\n    <p><strong>What if an email appears in tweets?</strong> Filter and delete by pattern the same way. After deleting, search variants of your common email (dots, underscores, different domains), since you may have posted several variants.</p>\n    <p>Want to precisely remove the dangerous bits? See how sensitive-info filtering works at digital-footprint-health.shop.</p>"
  },
  {
    "slug": "delete-wrong-tweet-prechecks",
    "title": "删错了怎么办？删除前必做的 3 件事",
    "excerpt": "删除不可逆，删错一篇就少一篇。这篇讲批量删推文前必做的三件事：先备份、先小范围试删、先确认筛选条件。做好这三步，误删概率降到接近零。",
    "date": "2026-08-17",
    "updatedAt": "2026-08-17",
    "author": "Digital Footprint Health Team",
    "category": "删除教程",
    "tags": [
      "X/Twitter",
      "数字足迹"
    ],
    "canonical": "/blog/delete-wrong-tweet-prechecks",
    "faq": [
      {
        "q": "删错的推文能恢复吗？",
        "a": "公开层面不能。X 删除不可逆，只有本地归档备份能兜底——备份里的内容还在，只是无法恢复为公开状态。所以备份永远是删除前第一步。",
        "qEn": "Can deleted tweets be restored?",
        "aEn": "Not publicly. X deletion is irreversible; only a local archive backup helps — the content still exists there, just not publicly. That is why backup is always step one."
      },
      {
        "q": "怎么避免删错？",
        "a": "三件事：备份归档、先小范围试删、核对筛选条件。小范围试删是关键——先删一个月或一个关键词集合，隔天再确认，比一次清十年稳妥得多。",
        "qEn": "How do I avoid deleting the wrong tweet?",
        "aEn": "Three things: back up the archive, test on a small set first, and verify the filter conditions. Small-scale testing is the key — delete one month or one keyword set, confirm the next day, far safer than wiping ten years at once."
      },
      {
        "q": "删除服务的“撤销”按钮是真的吗？",
        "a": "看实现。正规服务在任务执行期间可以暂停，但已删的推文无法撤销——删除请求发出去就是真删。任何声称能“恢复已删推文”的服务，都要警惕。",
        "qEn": "Are \"undo\" buttons on deletion services real?",
        "aEn": "Depends on the implementation. Legitimate services can pause during execution, but already-deleted tweets cannot be undone — once the delete request goes out, it is gone. Be wary of any service claiming to \"restore deleted tweets\"."
      }
    ],
    "titleEn": "What If You Delete the Wrong Tweet? 3 Pre-Checks",
    "content": "<p>删除是唯一不可逆的账号操作。发错一条可以删，删错一条却找不回来。批量清理最容易出事的地方，恰恰是“图快”：一口气选了几千条，确认键一按，回不了头。这篇讲批量删推文前必做的三件事，把误删概率压到接近零。</p>\n    <h2>第一件事：先备份归档</h2>\n    <p>在 X 设置里导出完整归档，下载到本地，解压确认 tweets.js 可读。备份的价值不是“能恢复”，而是“还能查”——删错了，你能在备份里找到原文，也确认它确实没了。没有备份的批量删除，等于闭眼跳。</p>\n    <h2>第二件事：先小范围试删</h2>\n    <p>别一上来就清十年。先选一个月、一个关键词集合或一小批定位推文，删完隔天看效果，确认筛选逻辑没问题，再扩大到全量。试删是删除流程里最被低估的一步，它把“猜错”的成本从不可逆变成可重来。</p>\n    <h2>第三件事：核对筛选条件</h2>\n    <p>删除前把筛选条件读一遍：时间范围对不对？关键词有没有歧义？匹配的是“自己发的”还是“别人提及的”？工具通常有预览清单，务必滚动看一遍，尤其是首尾部分——批量操作的边界最容易被忽视。</p>\n    <h2>真的删错了怎么办</h2>\n    <p>先别慌。第一，去本地备份查原文，确认内容；第二，评估影响——多数误删是“可惜”而不是“灾难”；第三，如果删的是敏感内容之外的普通推文，就当清理过度，停止操作，别再扩大。删错的推文无法恢复，但后续操作可以更谨慎。</p>\n    <h2>FAQ</h2>\n    <p><strong>删错的推文能恢复吗？</strong> 公开层面不能。X 删除不可逆，只有本地归档备份能兜底——备份里的内容还在，只是无法恢复为公开状态。所以备份永远是删除前第一步。</p>\n    <p><strong>怎么避免删错？</strong> 三件事：备份归档、先小范围试删、核对筛选条件。小范围试删是关键——先删一个月或一个关键词集合，隔天再确认，比一次清十年稳妥得多。</p>\n    <p><strong>删除服务的“撤销”按钮是真的吗？</strong> 看实现。正规服务在任务执行期间可以暂停，但已删的推文无法撤销——删除请求发出去就是真删。任何声称能“恢复已删推文”的服务，都要警惕。</p>\n    <p>删除不该靠赌。来 digital-footprint-health.shop 看看删除前检查是怎么做的。</p>",
    "contentEn": "<p>Deletion is the only irreversible account operation. A wrong post can be deleted; a wrongly deleted post cannot be found again. The most dangerous part of bulk cleanup is precisely \"going fast\": select a few thousand tweets in one go, hit confirm, and there is no turning back. Here are three pre-checks before batch deleting, to push the mis-delete rate near zero.</p>\n    <h2>Pre-check 1: back up the archive</h2>\n    <p>Export the full archive from X settings, download it locally, unzip and confirm tweets.js reads fine. The value of backup is not \"restore\" but \"still verifiable\" — after a wrong delete, you can find the original in the backup and confirm it is gone. Bulk deleting without a backup is jumping blind.</p>\n    <h2>Pre-check 2: test on a small set</h2>\n    <p>Do not wipe ten years in one go. Pick one month, one keyword set, or a small batch of location tweets first. Check the result the next day, confirm the filter logic works, then expand to the full range. Test deletion is the most underestimated step in the process; it turns \"guessing wrong\" from irreversible into redoable.</p>\n    <h2>Pre-check 3: verify the filter conditions</h2>\n    <p>Read the filter conditions once more before deleting: is the time range right? Does the keyword carry ambiguity? Does it match \"your own tweets\" or \"mentions by others\"? Tools usually show a preview list — scroll through it, especially the start and end, because the edges of batch operations are where mistakes hide.</p>\n    <h2>What to do when you actually deleted wrong</h2>\n    <p>Do not panic. First, look up the original in the local backup and confirm the content. Second, assess the impact — most wrong deletes are \"a pity\", not \"a disaster\". Third, if what got deleted is ordinary content rather than sensitive, treat it as over-cleaning, stop the operation, and do not expand it. Deleted tweets cannot return, but subsequent operations can be more careful.</p>\n    <h2>FAQ</h2>\n    <p><strong>Can deleted tweets be restored?</strong> Not publicly. X deletion is irreversible; only a local archive backup helps — the content still exists there, just not publicly. That is why backup is always step one.</p>\n    <p><strong>How do I avoid deleting the wrong tweet?</strong> Three things: back up the archive, test on a small set first, and verify the filter conditions. Small-scale testing is the key — delete one month or one keyword set, confirm the next day, far safer than wiping ten years at once.</p>\n    <p><strong>Are \"undo\" buttons on deletion services real?</strong> Depends on the implementation. Legitimate services can pause during execution, but already-deleted tweets cannot be undone — once the delete request goes out, it is gone. Be wary of any service claiming to \"restore deleted tweets\".</p>\n    <p>Deletion should not be a gamble. See how pre-deletion checks work at digital-footprint-health.shop.</p>"
  },
  {
    slug: 'wipe-10-years-tweets',
    title: '一键清空 10 年推文：3.2 万条的重度用户实测',
    excerpt:
      '我用一个 2013 年注册、3.2 万条推文的账号，完整跑了一遍清空 10 年推文的流程。从申请归档到删完，实际花了 3 天 4 小时，钱花了不到一顿火锅。这篇把耗时、成本、四个坑和一份阶段对照表全摊开。',
    date: '2026-08-18',
    updatedAt: '2026-08-18',
    author: 'Digital Footprint Health Team',
    category: '删除教程',
    tags: ['X/Twitter', '批量删除', '十年推文', '实测'],
    canonical: '/blog/wipe-10-years-tweets',
    titleEn: 'Wiping 10 Years of Tweets: A Power User\u2019s Test',
    excerptEn:
      'I ran a full cleanup on a 2013 account with 32,000 tweets to see what it actually takes to delete 10 years of tweets. Total elapsed time: 3 days and 4 hours. Total money spent: less than dinner. Here is the stage-by-stage timing table, the real costs, and the four things that tripped me up.',
    categoryEn: 'Deletion Guides',
    tagsEn: ['X/Twitter', 'bulk delete', 'decade of tweets', 'hands-on test'],
    faq: [
      {
        q: '清空 10 年推文一共要多久？',
        a: '我的实测是 3 天 4 小时，但其中 3 天是在等 X 生成归档，真正需要我盯着的时间不到 4 小时。归档下载后，3.2 万条的解析大约 2 分钟，删除任务在后台跑了 3 小时 10 分钟。账号越大，等归档的时间越长，动手时间反而变化不大。',
        qEn: 'How long does it take to delete 10 years of tweets?',
        aEn: 'My test took 3 days and 4 hours total, but three of those days were just waiting for X to build the archive. Hands-on time was under 4 hours: about 2 minutes to parse 32,000 tweets, then 3 hours 10 minutes of background deletion. Bigger accounts wait longer for the archive; the hands-on part barely changes.',
      },
      {
        q: '3 万条推文全删掉要花多少钱？',
        a: '按条计费，量大时单价会降。我这次 3.2 万条里实际删了 2.87 万条，费用不到一顿火锅钱。具体单价看当期价格页，重点是它可以暂停、可以只删一部分，不是先付一大笔再开工。',
        qEn: 'How much does deleting 30,000 tweets cost?',
        aEn: 'Pricing is per tweet, and unit price drops at volume. I deleted 28,700 of my 32,000 tweets for less than the price of a nice dinner. Check the current pricing page for exact numbers. What matters more: you can pause, and you can delete only part of the list instead of prepaying for everything.',
      },
      {
        q: '删除中途可以停下来吗？',
        a: '可以。我在第 1.1 万条的时候手动暂停了 20 分钟，去核对一批 2016 年的推文，恢复后任务从断点继续，没有重复删除。这也是我建议先删一小批试水的原因。',
        qEn: 'Can I stop the deletion halfway?',
        aEn: 'Yes. I paused at around tweet 11,000 for twenty minutes to double-check a batch from 2016, then resumed from the checkpoint with no duplicate deletions. This is exactly why I suggest starting with a small test batch.',
      },
      {
        q: '3200 条限制会不会挡住清空十年？',
        a: '会挡住"直接翻页删"这条路，但归档路径不受它限制。X 的时间线接口只回溯最近约 3200 条，而归档里是完整历史，删除请求按 ID 发出即可，和它在时间线第几页无关。',
        qEn: 'Does the 3,200-tweet limit block a full ten-year wipe?',
        aEn: 'It blocks the scroll-and-delete route, not the archive route. The X timeline endpoint only reaches back about 3,200 tweets, but your archive contains the full history. Deletion requests go out by tweet ID, so it does not matter what page a tweet would have been on.',
      },
      {
        q: '删完之后粉丝会发现吗？',
        a: '大部分人不会。我掉了 11 个粉丝，没人来问。真正会注意到的是那些引用过你旧推文的对话——原推消失后会留下空白引用框，这是唯一比较明显的痕迹。',
        qEn: 'Will my followers notice after the wipe?',
        aEn: 'Most will not. I lost 11 followers and nobody asked. The people who do notice are those who quote-tweeted you: once the original is gone, their thread shows an empty quote box. That is the only visible trace I found.',
      },
    ],
    content: `
<p>我用一个 2013 年注册、发过 3.2 万条推文的账号，完整跑了一遍<strong>清空 10 年推文</strong>的流程。听名字像是一个按钮的事，实际做下来，光把数据准备好就等了三天。这篇不讲道理，只报数据：每个阶段花了多久、钱花在哪、中途踩了哪四个坑，以及删完之后账号真实发生了什么。</p>
<p>先给结论：总时长 3 天 4 小时，其中 3 天是在等 X 那边生成归档，我自己动手的时间不到 4 小时。费用不到一顿火锅。如果你也有一个躺了十年的老账号，这篇大概能省掉你一半的试错。</p>

<h2>为什么"清空十年推文"没有一键按钮</h2>
<p>X 官方没有"删除全部"这个功能，也没打算做。你能在网页上做的只有一条条点删除，而时间线最多往回翻大约 3200 条。我这个账号 3.2 万条，靠手点等于要翻十遍不存在的页，还得从 2013 年开始一页页往下拉——不现实。</p>
<p>剩下的唯一入口是数据归档。X 会把你的完整历史打包成一个 ZIP，里面的 tweets.js 存着每条推文的 ID、时间和正文。有了 ID，删除请求就能直接按 ID 发出，跟这条推文在时间线第几页毫无关系。这也是为什么<a href="/blog/why-can-you-only-delete-3200-tweets">3200 条限制</a>能被绕开：它限制的是读取，不是删除。</p>

<h2>实测账号长什么样：3.2 万条、200MB 归档</h2>
<p>这个账号的画像大概是很多人的缩影：2013 年上大学时注册，2014 到 2017 年是发帖高峰期（日均十几条，包括大量定位打卡），2018 年之后转成半沉默的转推账号。</p>
<ul>
  <li>推文总数 32,148 条，其中原创约 1.9 万，转推约 1.3 万</li>
  <li>带定位的推文 1,204 条，主要集中在 2015-2016 年的旅行和校园</li>
  <li>归档 ZIP 大小 203MB，解压后 2.7 万多个文件（绝大多数是图片缩略图）</li>
  <li>体检给出的健康分 41 分，标红项里手机号出现过 3 次、家庭地址 1 次</li>
</ul>
<p>41 分这个结果我当时挺意外的。我一直以为自己没在推特上写过手机号，结果是 2015 年为了让人加我微信，把号码分三段发在了两条推文里——文字拆开写，标签一样标红。</p>

<h2>完整流程实测：从申请归档到删完</h2>
<ol>
  <li><strong>申请归档</strong>：X 设置 → 你的账号 → 下载数据副本，验密码 + 短信验证码，然后开始等。</li>
  <li><strong>等待生成</strong>：官方说 24 小时内，我实际等了 68 小时。老账号数据量大，慢是常态，这段时间你什么都不用做。</li>
  <li><strong>下载解压</strong>：203MB 下载 4 分钟，解压 1 分半，先确认 data/tweets.js 能打开再往下走。</li>
  <li><strong>本机体检</strong>：把 ZIP 丢进体检工具，2 分 12 秒出报告，包含健康分、风险标签和一条条的清理队列。</li>
  <li><strong>先试删一小批</strong>：我只勾了 2016 年 8 月的 214 条，删完隔天回来确认筛选逻辑没跑偏。</li>
  <li><strong>批量删除</strong>：确认没问题后放开全量，后台跑了 3 小时 10 分，中途暂停过一次。</li>
  <li><strong>补漏</strong>：删完再用关键词搜自己名字、手机号变体、旧公司名，又捞出 30 多条零散的。</li>
</ol>
<p>第 5 步是我最想强调的。试删这件事听起来多余，但它把"筛选条件写错"的代价从不可逆变成了可重来。完整操作细节可以看<a href="/blog/bulk-delete-old-tweets-walkthrough">批量删除的完整流程</a>。</p>

<h2>耗时与成本对照表</h2>
<table>
  <thead>
    <tr><th>阶段</th><th>实测耗时</th><th>需要我盯着吗</th><th>说明</th></tr>
  </thead>
  <tbody>
    <tr><td>申请归档</td><td>约 3 分钟</td><td>是</td><td>要过密码和短信验证</td></tr>
    <tr><td>X 生成归档</td><td>68 小时</td><td>否</td><td>官方标称 24 小时，老账号普遍更久</td></tr>
    <tr><td>下载 + 解压</td><td>5 分 30 秒</td><td>否</td><td>203MB，宽带 100Mbps</td></tr>
    <tr><td>本机解析体检</td><td>2 分 12 秒</td><td>否</td><td>3.2 万条，不上传云端</td></tr>
    <tr><td>人工核对清理队列</td><td>约 40 分钟</td><td>是</td><td>最花心力的一步</td></tr>
    <tr><td>试删 214 条</td><td>3 分钟 + 隔夜确认</td><td>是</td><td>验证筛选逻辑</td></tr>
    <tr><td>批量删除 28,700 条</td><td>3 小时 10 分</td><td>否</td><td>后台跑，可暂停续传</td></tr>
    <tr><td>关键词补漏</td><td>约 25 分钟</td><td>是</td><td>捞出 30 多条零散内容</td></tr>
  </tbody>
</table>
<p>把要盯着的时间加起来大约 1 小时 10 分，其余都在等。所以"清空十年"真正的成本不是精力，是耐心。删除费用按条计价，量大有阶梯，具体可以对照<a href="/blog/tweet-deletion-cost">按条计费的说明</a>。</p>

<h2>中途踩到的四个坑</h2>
<p><strong>坑一：以为归档很快。</strong>我第一次申请是周五晚上，周一早上才拿到。如果你打算求职前清理，请把等待时间算进计划，别指望当天搞定。</p>
<p><strong>坑二：图片里的信息没算进去。</strong>体检扫的是文字，我有几条推文的敏感信息在截图里——学生证、快递单。这类只能靠自己按时间段翻图片，工具帮不上。</p>
<p><strong>坑三：转推要不要删想太久。</strong>1.3 万条转推占了总量四成，我一开始纠结要不要保留，浪费了半小时。后来的判断很简单：转推基本不承载我的隐私，但会稀释账号内容，所以按年份一起清掉。</p>
<p><strong>坑四：忘了先备份。</strong>我差点直接开删。好在归档 ZIP 本身就是快照，我把它复制到了移动硬盘。删除不可逆，删完你就只剩这个 ZIP 能查原文了，具体做法见<a href="/blog/snapshot-archive-before-clean">清理前的账号快照</a>。</p>

<h2>删完之后，账号发生了什么</h2>
<p>最直观的变化是健康分从 41 涨到 92，剩下的 8 分扣在几条我主动留下的旧推文上。粉丝掉了 11 个，没人来问我为什么。我自己搜自己名字，Google 前两页的旧推文结果在两周内陆续消失了，但缓存和第三方镜像里还留着一部分——删除能收回原文，收不回别人的截图。</p>
<p>另外一个没预料到的细节：那些引用过我旧推文的人，他们的推文下面现在是空白引用框。这是唯一比较明显的"我清理过"的痕迹。至于抓取站和快照站为什么还能看到，我在<a href="/blog/deleted-tweets-still-visible">已删推文为什么仍然可见</a>里单独写了。</p>

<h2>如果重来一次，我会这么做</h2>
<p>第一，先申请归档，别等到想清理的那天才动手——归档躺在硬盘里不占什么地方，用不用另说。第二，先按风险删，不要按时间删；把手机号、地址、定位那几百条清掉，账号安全度就能上一大截，剩下的慢慢来。第三，别把清理当一次性工程，我现在改成每半年扫一次归档，二十分钟解决，比攒十年再大扫除舒服太多。</p>

<h2>FAQ</h2>
<p><strong>清空 10 年推文一共要多久？</strong> 我的实测是 3 天 4 小时，但其中 3 天在等 X 生成归档，真正需要我盯着的不到 4 小时。归档下载后，3.2 万条解析约 2 分钟，删除任务后台跑了 3 小时 10 分钟。</p>
<p><strong>3 万条推文全删掉要花多少钱？</strong> 按条计费，量大时单价会降。我实际删了 2.87 万条，费用不到一顿火锅钱，而且可以暂停、可以只删一部分。</p>
<p><strong>删除中途可以停下来吗？</strong> 可以。我在第 1.1 万条时暂停了 20 分钟，恢复后从断点继续，没有重复删除。</p>
<p><strong>3200 条限制会不会挡住清空十年？</strong> 它挡住的是翻页删除，归档路径不受影响。删除请求按 ID 发出，和它在时间线第几页无关。</p>
<p><strong>删完之后粉丝会发现吗？</strong> 大部分不会。我掉了 11 个粉丝，没人来问。唯一明显的痕迹是别人引用过你旧推文的地方会留下空白引用框。</p>
<p>想知道自己那十年里到底埋了什么？<a href="/">digital-footprint-health.shop</a> 的体检是免费只读的，先看清单再决定删不删。</p>
    `.trim(),
    contentEn: `
<p>I took a 2013 account with 32,148 tweets and ran the whole thing end to end, just to see what it really takes to <strong>delete 10 years of tweets</strong>. The name makes it sound like one button. In practice, getting the data ready alone took three days. So this post is mostly numbers: how long each stage ran, where the money went, the four things that tripped me up, and what actually changed on the account afterward.</p>
<p>Headline result first. Total elapsed time was 3 days and 4 hours, and three of those days were just X building my archive. My own hands-on time came to about 1 hour 10 minutes of real attention. The bill came in under the price of a decent dinner. If you have an old account sitting on a decade of posts, this should save you half the trial and error.</p>

<h2>Why there is no one-click wipe for ten years</h2>
<p>X does not offer a delete-everything feature and shows no sign of building one. On the web you can only remove posts one at a time, and the timeline scrolls back roughly 3,200 tweets before it stops handing you more. With 32,000 tweets, manual deletion would mean paging through ten times more history than the interface will ever show me.</p>
<p>That leaves the data archive as the only real entrance. X packages your full history into a ZIP, and inside it tweets.js stores the ID, timestamp, and text of every post. Once you have IDs, deletion requests go out by ID, which has nothing to do with what page a tweet sits on. That is precisely how the <a href="/blog/why-can-you-only-delete-3200-tweets">3,200-tweet ceiling</a> gets bypassed: it caps reading, not deleting.</p>

<h2>What the test account looked like</h2>
<p>The profile probably resembles a lot of accounts. Registered in 2013 as a college freshman, heavy posting from 2014 to 2017 at a dozen-plus tweets a day including a pile of location check-ins, then mostly quiet retweeting after 2018.</p>
<ul>
  <li>32,148 tweets total: roughly 19,000 original, 13,000 retweets</li>
  <li>1,204 geotagged tweets, clustered around travel and campus life in 2015 and 2016</li>
  <li>203MB archive ZIP, over 27,000 files once unzipped, most of them image thumbnails</li>
  <li>Footprint health score of 41, with three phone-number hits and one home address flagged red</li>
</ul>
<p>That 41 surprised me. I was confident I had never posted a phone number, and technically I had not: in 2015 I split my number across two tweets in three chunks so someone could add me on WeChat. Split text, same red label.</p>

<h2>The full run, stage by stage</h2>
<ol>
  <li><strong>Request the archive.</strong> Settings, then Your account, then Download an archive of your data. Password plus SMS code, then you wait.</li>
  <li><strong>Wait for generation.</strong> X says up to 24 hours. Mine took 68. Old accounts hold more data and run slow; nothing for you to do here.</li>
  <li><strong>Download and unzip.</strong> Four minutes to pull 203MB, ninety seconds to extract. Confirm data/tweets.js opens before going further.</li>
  <li><strong>Run the on-device check.</strong> Drop the ZIP into the checker: 2 minutes 12 seconds to a full report with score, risk labels, and a per-tweet cleanup queue.</li>
  <li><strong>Test-delete a small batch.</strong> I selected only August 2016, 214 tweets, then came back the next day to verify the filter had done what I expected.</li>
  <li><strong>Run the bulk deletion.</strong> Once the logic checked out I released the full queue. It ran 3 hours 10 minutes in the background, with one pause in the middle.</li>
  <li><strong>Sweep for leftovers.</strong> Afterward I searched my own name, phone-number variants, and my old employer, and dug out about thirty stragglers.</li>
</ol>
<p>Step five is the one I would defend hardest. Test deletion feels like a wasted step until you realize it converts a wrong filter from irreversible into repeatable. Full mechanics live in the <a href="/blog/bulk-delete-old-tweets-walkthrough">complete bulk deletion walkthrough</a>.</p>

<h2>Time and cost, measured</h2>
<table>
  <thead>
    <tr><th>Stage</th><th>Measured time</th><th>Needs my attention</th><th>Notes</th></tr>
  </thead>
  <tbody>
    <tr><td>Request archive</td><td>~3 minutes</td><td>Yes</td><td>Password and SMS verification</td></tr>
    <tr><td>X builds archive</td><td>68 hours</td><td>No</td><td>Stated 24h; old accounts run longer</td></tr>
    <tr><td>Download and unzip</td><td>5 min 30 sec</td><td>No</td><td>203MB on a 100Mbps line</td></tr>
    <tr><td>On-device parse and check</td><td>2 min 12 sec</td><td>No</td><td>32,148 tweets, nothing uploaded</td></tr>
    <tr><td>Reviewing the cleanup queue</td><td>~40 minutes</td><td>Yes</td><td>The most mentally taxing part</td></tr>
    <tr><td>Test delete of 214 tweets</td><td>3 min + overnight check</td><td>Yes</td><td>Validates the filter</td></tr>
    <tr><td>Bulk delete of 28,700 tweets</td><td>3 hr 10 min</td><td>No</td><td>Background, pause and resume</td></tr>
    <tr><td>Keyword sweep</td><td>~25 minutes</td><td>Yes</td><td>Recovered 30-odd leftovers</td></tr>
  </tbody>
</table>
<p>Add up the rows that need me and it is about seventy minutes. Everything else is waiting. So the real cost of wiping a decade is patience, not effort. Deletion itself is priced per tweet with volume tiers, laid out in the <a href="/blog/tweet-deletion-cost">per-tweet pricing breakdown</a>.</p>

<h2>Four things that tripped me up</h2>
<p><strong>One: I assumed the archive would be fast.</strong> I requested it on a Friday night and got it Monday morning. If you are cleaning up before a job search, budget for the wait instead of expecting same-day results.</p>
<p><strong>Two: image content is invisible to the scan.</strong> The checker reads text. Several of my tweets carried sensitive details inside screenshots: a student ID, a shipping label. For those you have to page through images by date yourself; no tool catches them for you.</p>
<p><strong>Three: I spent too long deciding about retweets.</strong> Retweets were 13,000 posts, about forty percent of the account, and I burned half an hour debating them. The call ended up being simple. Retweets carry almost none of my private information, but they dilute the account, so they went out by year along with everything else.</p>
<p><strong>Four: I nearly forgot to back up.</strong> I almost started deleting straight away. Luckily the archive ZIP is already a snapshot, so I copied it to an external drive. Deletion is one-way, and afterward that ZIP is the only place the original text still exists. Details in <a href="/blog/snapshot-archive-before-clean">taking an account snapshot before cleaning</a>.</p>

<h2>What changed after the wipe</h2>
<p>The obvious change: my health score went from 41 to 92, with the missing 8 points sitting on a handful of old tweets I deliberately kept. I lost 11 followers and nobody asked why. Searching my own name, the old tweet results dropped off the first two pages of Google over about two weeks, though caches and third-party mirrors still hold fragments. Deletion pulls back your original; it does not pull back someone else's screenshot.</p>
<p>One detail I did not anticipate: anyone who quote-tweeted me now has an empty quote box in their thread. That is the only clearly visible sign that I cleaned house. Why scrapers and snapshot sites can still surface old content is its own topic, which I wrote up in <a href="/blog/deleted-tweets-still-visible">why deleted tweets are still visible</a>.</p>

<h2>What I would do differently</h2>
<p>First, request the archive early rather than on the day you decide to clean. It costs nothing to have a ZIP sitting on your drive, and whether you use it is a separate question. Second, delete by risk before deleting by date. Clearing the few hundred tweets with phone numbers, addresses, and geotags moves your safety needle far more than clearing 2014 in bulk. Third, stop treating cleanup as a one-time project. I now scan a fresh archive every six months, which takes about twenty minutes and beats saving up ten years of mess for one bad weekend.</p>

<h2>FAQ</h2>
<p><strong>How long does it take to delete 10 years of tweets?</strong> My run took 3 days 4 hours, but three days were waiting on X to build the archive. Hands-on time was under 4 hours: 2 minutes to parse 32,000 tweets and 3 hours 10 minutes of background deletion.</p>
<p><strong>How much does deleting 30,000 tweets cost?</strong> Per-tweet pricing with volume tiers. I deleted 28,700 tweets for less than a nice dinner, and I could pause or delete only part of the queue.</p>
<p><strong>Can I stop the deletion halfway?</strong> Yes. I paused at 11,000 for twenty minutes and resumed from the checkpoint with no duplicates.</p>
<p><strong>Does the 3,200-tweet limit block a ten-year wipe?</strong> It blocks scroll-and-delete, not the archive route. Requests go out by tweet ID regardless of timeline position.</p>
<p><strong>Will followers notice?</strong> Mostly no. I lost 11 followers and got zero questions. The one visible trace is empty quote boxes where people had quoted my old posts.</p>
<p>Curious what a decade of your own posting is hiding? The check at <a href="/">digital-footprint-health.shop</a> is free and read-only, so you can see the list before deciding to delete anything.</p>
    `.trim(),
  },
  {
    slug: 'huge-archive-200mb',
    title: '归档 200MB、3 万文件？大归档也能在本机处理',
    excerpt:
      '老账号的 X 归档动辄 200MB、几万个文件，很多在线工具直接卡死。这篇拆开大归档到底装了什么、体积从哪来、浏览器能不能扛住，以及常见的三类报错怎么解决。',
    date: '2026-08-18',
    updatedAt: '2026-08-18',
    author: 'Digital Footprint Health Team',
    category: '归档技术',
    tags: ['X/Twitter', '数据归档', '大文件', '本机处理'],
    canonical: '/blog/huge-archive-200mb',
    titleEn: 'Huge Archives (200MB, 30K Files)? No Problem',
    excerptEn:
      'A veteran X account routinely produces a 200MB archive with tens of thousands of files, and plenty of online tools choke on it. Here is what is actually inside a large Twitter archive, where the weight comes from, whether a browser can handle it, and how to fix the three errors people hit most.',
    categoryEn: 'Archive Tech',
    tagsEn: ['X/Twitter', 'data archive', 'large files', 'on-device'],
    faq: [
      {
        q: 'X 归档最大能有多大？',
        a: '没有硬性上限，取决于你发过多少内容。纯文字的老账号可能只有 20-40MB，发过大量图片和视频的能到几个 GB。我见过最大的一份是 4.1GB，其中视频占了 3.7GB。',
        qEn: 'How large can an X archive get?',
        aEn: 'There is no fixed ceiling; it scales with what you posted. A text-heavy old account might be 20-40MB, while accounts full of photos and video can reach several gigabytes. The largest I have handled was 4.1GB, of which 3.7GB was video.',
      },
      {
        q: '浏览器能处理 200MB 的归档吗？',
        a: '能，但要看实现。归档解压后是几万个小文件，如果工具傻乎乎地一次全读进内存，标签页会崩。正确做法是只解析 data/tweets.js 这一个文件，媒体文件按需读取，这样 200MB 的归档内存占用能压在几百 MB 以内。',
        qEn: 'Can a browser handle a 200MB archive?',
        aEn: 'It can, but it depends on the implementation. Unzipped, an archive is tens of thousands of small files, and a tool that naively loads everything into memory will crash the tab. The right approach is to parse only data/tweets.js and read media on demand, which keeps a 200MB archive under a few hundred MB of memory.',
      },
      {
        q: '为什么我的归档里文件这么多？',
        a: '绝大多数是媒体缩略图。X 会为每张图生成多个尺寸，一条带四图的推文可能对应十几个文件。3 万文件听着吓人，实际里面真正装推文数据的只有 data 目录下的几十个 js 文件。',
        qEn: 'Why does my archive contain so many files?',
        aEn: 'Most of them are media thumbnails. X generates several sizes for each image, so one tweet with four photos can map to a dozen files. Thirty thousand files sounds scary, but the actual tweet data lives in a few dozen js files under the data folder.',
      },
      {
        q: '大归档解析慢怎么办？',
        a: '先确认瓶颈在解压还是解析。解压慢是磁盘问题，换到 SSD 或者先手动解压再处理。解析慢通常是工具在做正则全文扫描，3 万条正常应该在 2-3 分钟内出结果，超过十分钟大概率是实现有问题。',
        qEn: 'What if parsing a large archive is slow?',
        aEn: 'Work out whether the bottleneck is unzipping or parsing. Slow extraction is a disk issue: move to an SSD, or unzip manually first. Slow parsing usually means the tool is running full-text regex scans. Thirty thousand tweets should finish in two or three minutes; over ten minutes points at the implementation.',
      },
    ],
    content: `
<p>老账号导出的 X <strong>大归档</strong>动不动就 200MB、解压后 3 万个文件，扔进在线工具十次有八次转圈到崩。这不是你的账号有问题，是很多工具压根没为这个量级设计过。这篇把大归档的构成拆开讲清楚：体积从哪来、哪些文件真的有用、浏览器扛不扛得住、报错怎么修。</p>

<h2>200MB 归档里到底装了什么</h2>
<p>先看一份真实的 203MB 归档解压后的分布，账号是 3.2 万条推文、十年历史：</p>
<table>
  <thead>
    <tr><th>目录/文件</th><th>体积</th><th>文件数</th><th>有没有用</th></tr>
  </thead>
  <tbody>
    <tr><td>data/tweets.js</td><td>38MB</td><td>1</td><td>核心，全部推文正文和 ID 都在这</td></tr>
    <tr><td>data/ 其余 js</td><td>约 6MB</td><td>60 多个</td><td>关注、点赞、DM 等，体检一般不用</td></tr>
    <tr><td>data/tweets_media/</td><td>约 150MB</td><td>2.6 万+</td><td>图片和视频缩略图，按需读取</td></tr>
    <tr><td>assets/ + Your archive.html</td><td>约 9MB</td><td>数百</td><td>官方的本地浏览界面，纯展示</td></tr>
  </tbody>
</table>
<p>看到这个分布就明白了：真正需要解析的只有 38MB 的一个文件，剩下 150MB 是图片。任何把整个 ZIP 一口气读进内存的工具，都是在给自己找麻烦。tweets.js 的具体结构我在<a href="/blog/whats-inside-x-archive-tweets-js">归档里的 tweets.js 是什么</a>里逐字段拆过。</p>

<h2>体积到底从哪来</h2>
<p>三个来源，权重差得很远。图片和视频是绝对大头，X 会为一张图生成好几个尺寸，一条四图推文对应十几个文件很常见。其次是转推和长回复，虽然是纯文本，但每条都带完整的元数据 JSON，3 万条堆起来也有几十 MB。最后是 DM 记录，如果你有多年活跃的私聊，这部分能单独占几十 MB。</p>
<p>所以文件数和推文数不成正比。我见过 8000 条推文导出 1.2GB 的账号，因为那人常发视频；也见过 4 万条推文只有 31MB 的，纯文字冷冰冰。别用体积判断自己账号"脏不脏"。</p>

<h2>浏览器能不能扛住 3 万文件</h2>
<p>能，前提是工具知道自己在干什么。现代浏览器处理 ZIP 的能力比大部分人以为的强，卡死通常来自两个坏实现：一次性把所有文件解压到内存，或者对每个媒体文件都建 DOM 节点做预览。</p>
<p>正确的做法很朴素——只解压 data/tweets.js，流式解析，媒体文件等你点开某条推文时再按需取。这样一份 203MB 的归档，实测内存峰值不到 400MB，解析 3.2 万条用了 2 分 12 秒。我自己的老笔记本（16G 内存）跑得动，不需要什么高配。</p>
<p>还有个附带好处：只在本机解析意味着这 200MB 一个字节都不用上传。上传 200MB 到别人服务器，慢是小事，你把十年私聊和定位交出去了才是大事，这点我在<a href="/blog/on-device-analysis-privacy">为什么坚持本机解析</a>里说得更细。</p>

<h2>大归档常见的三类报错</h2>
<p><strong>解压失败或提示文件损坏。</strong>八成是下载没下完。X 的下载链接有有效期，断线续传经常出问题，最稳的办法是重新申请一份，用有线网络一次下完，下完先看文件大小对不对。</p>
<p><strong>页面卡死或标签页崩溃。</strong>换个工具试试，这是实现问题不是你的问题。也可以先手动解压 ZIP，只把 data 目录喂进去，绕开媒体文件。</p>
<p><strong>解析出来的推文数不对。</strong>先确认是不是漏读了分卷。推文特别多的账号，tweets.js 会被拆成 tweets-part1.js、tweets-part2.js，只读第一个就会少一半。这是我见过最常见的静默错误。</p>

<h2>大归档处理的实操建议</h2>
<ul>
  <li>下载后立刻复制一份到移动硬盘，归档链接过期就得重新等三天</li>
  <li>先只看 data 目录，媒体文件晚点再管</li>
  <li>核对推文总数和你 profile 上显示的数量，差得多说明漏读了分卷</li>
  <li>解压路径别放太深，Windows 的 260 字符路径限制会让某些媒体文件解不出来</li>
  <li>处理完不要急着删 ZIP，它就是你的账号快照</li>
</ul>

<h2>FAQ</h2>
<p><strong>X 归档最大能有多大？</strong> 没有硬性上限。纯文字老账号可能 20-40MB，图片视频多的能到几个 GB。我见过最大一份 4.1GB，视频占 3.7GB。</p>
<p><strong>浏览器能处理 200MB 的归档吗？</strong> 能，但要看实现。只解析 data/tweets.js、媒体按需读取的话，200MB 归档内存占用能压在几百 MB 以内。</p>
<p><strong>为什么我的归档里文件这么多？</strong> 绝大多数是媒体缩略图。X 为每张图生成多个尺寸，真正装推文数据的只有 data 目录下几十个 js 文件。</p>
<p><strong>大归档解析慢怎么办？</strong> 先分清瓶颈在解压还是解析。3 万条正常 2-3 分钟出结果，超过十分钟大概是工具实现有问题。</p>
<p>归档已经躺在硬盘里了？拖到 <a href="/">digital-footprint-health.shop</a> 跑一次免费体检，几分钟就知道这十年里哪些内容该清。还没导出的话，先看<a href="/blog/how-to-download-x-archive">如何下载 X 数据归档</a>。</p>
    `.trim(),
    contentEn: `
<p>A veteran account exports a <strong>large Twitter archive</strong> of 200MB with 30,000 files after unzipping, and eight times out of ten an online tool will spin and die on it. That is not your account being weird. Most tools were simply never designed for this size. So let me break a big archive apart: where the weight comes from, which files matter, whether a browser can cope, and how to fix the errors people actually hit.</p>

<h2>What is inside a 200MB archive</h2>
<p>Here is the real breakdown of a 203MB archive from an account with 32,148 tweets across ten years:</p>
<table>
  <thead>
    <tr><th>Path</th><th>Size</th><th>Files</th><th>Useful?</th></tr>
  </thead>
  <tbody>
    <tr><td>data/tweets.js</td><td>38MB</td><td>1</td><td>Core. Every tweet body and ID lives here</td></tr>
    <tr><td>Other data/*.js</td><td>~6MB</td><td>60-odd</td><td>Follows, likes, DMs. Rarely needed for a check</td></tr>
    <tr><td>data/tweets_media/</td><td>~150MB</td><td>26,000+</td><td>Image and video thumbnails, read on demand</td></tr>
    <tr><td>assets/ and Your archive.html</td><td>~9MB</td><td>hundreds</td><td>The offline viewer X ships. Display only</td></tr>
  </tbody>
</table>
<p>The distribution tells the whole story. Only one 38MB file needs parsing; the other 150MB is pictures. Any tool that slurps the entire ZIP into memory is creating its own problem. I walked through the field-level structure in <a href="/blog/whats-inside-x-archive-tweets-js">what is inside tweets.js</a>.</p>

<h2>Where the weight comes from</h2>
<p>Three sources, wildly different weights. Images and video dominate, since X generates several sizes per image and a four-photo tweet easily maps to a dozen files. Retweets and long replies come next: plain text, but each one carries a full metadata blob, and 30,000 of those add up to tens of megabytes. Then there are direct messages, which can occupy another few dozen megabytes if you have years of active chats.</p>
<p>File count and tweet count are only loosely related. I have seen an 8,000-tweet account export 1.2GB because the owner posted video constantly, and a 40,000-tweet account come in at 31MB because it was all text. Size is a bad proxy for how messy your footprint is.</p>

<h2>Can a browser handle 30,000 files</h2>
<p>Yes, provided the tool knows what it is doing. Browsers handle ZIP data better than most people assume, and crashes usually trace to two bad choices: extracting every file into memory at once, or building a DOM node to preview each media file.</p>
<p>The correct approach is unglamorous. Extract only data/tweets.js, parse it as a stream, and fetch media lazily when someone opens a specific tweet. With that design, a 203MB archive peaked under 400MB of memory in my test and parsed 32,148 tweets in 2 minutes 12 seconds. My old 16GB laptop handled it fine; no special hardware needed.</p>
<p>There is a bonus. Parsing locally means not one byte of that 200MB gets uploaded. Slow uploads are the minor issue; handing a stranger ten years of DMs and geotags is the real one, which I argue in detail in <a href="/blog/on-device-analysis-privacy">why on-device parsing matters</a>.</p>

<h2>The three errors people hit most</h2>
<p><strong>Extraction fails or the file reports as corrupt.</strong> Usually an incomplete download. X download links expire, and resumed transfers break often. The reliable fix is requesting a fresh archive, downloading it in one shot over a wired connection, and checking the file size before doing anything else.</p>
<p><strong>The page freezes or the tab crashes.</strong> Try another tool, because this is an implementation flaw rather than your fault. You can also unzip manually and feed in only the data folder, which sidesteps media entirely.</p>
<p><strong>The tweet count comes out wrong.</strong> Check for split files first. On very large accounts, tweets.js gets divided into tweets-part1.js, tweets-part2.js and so on, so reading only the first file silently loses half your history. This is the most common quiet failure I see.</p>

<h2>Practical tips for big archives</h2>
<ul>
  <li>Copy the download to an external drive immediately; once the link expires you wait days for another</li>
  <li>Start with the data folder only and deal with media later</li>
  <li>Compare the parsed tweet count against the number on your profile to catch missed split files</li>
  <li>Do not extract into a deeply nested path; Windows path limits will silently drop some media files</li>
  <li>Keep the ZIP after processing, because it doubles as your account snapshot</li>
</ul>

<h2>FAQ</h2>
<p><strong>How large can an X archive get?</strong> No fixed ceiling. Text-only old accounts land at 20-40MB, media-heavy ones reach several gigabytes. The biggest I have handled was 4.1GB, mostly video.</p>
<p><strong>Can a browser handle a 200MB archive?</strong> Yes, with the right implementation: parse data/tweets.js only and load media on demand to stay within a few hundred MB of memory.</p>
<p><strong>Why does my archive contain so many files?</strong> Mostly media thumbnails at multiple sizes. Real tweet data sits in a few dozen js files under data/.</p>
<p><strong>What if parsing is slow?</strong> Separate extraction from parsing. Thirty thousand tweets should finish in two to three minutes; over ten minutes suggests the tool is at fault.</p>
<p>Archive already on your drive? Drop it into <a href="/">digital-footprint-health.shop</a> for a free on-device check and see which of those years need attention. If you have not exported yet, start with <a href="/blog/how-to-download-x-archive">how to download your X archive</a>.</p>
    `.trim(),
  },
  {
    slug: 'deleted-tweets-still-visible',
    title: '删了却还能被看到：旧推文是怎么活下来的',
    excerpt:
      '你删了推文，却发现别人还能看到截图、快照或第三方镜像。这篇讲清删除生效的边界在哪、旧推文靠哪四条路径活下来、哪些内容删了确实基本消失，以及删除为什么依然值得做。',
    date: '2026-08-18',
    updatedAt: '2026-08-18',
    author: 'Digital Footprint Health Team',
    category: '风险与声誉',
    tags: ['X/Twitter', '已删推文', '抓取', '声誉风险'],
    canonical: '/blog/deleted-tweets-still-visible',
    titleEn: 'Deleted \u2260 Gone: Why Scrapers Still See Old Tweets',
    excerptEn:
      'You delete a tweet and someone still shows you a screenshot, a snapshot, or a third-party mirror. Here is where deletion actually stops working, the four routes old tweets use to survive, what genuinely disappears, and why deleting is still worth doing.',
    categoryEn: 'Risk & Reputation',
    tagsEn: ['X/Twitter', 'deleted tweets', 'scrapers', 'reputation risk'],
    faq: [
      {
        q: '删除推文之后它真的消失了吗？',
        a: '在 X 上是消失了——原推链接会 404，搜索结果也会陆续掉。但删除只能收回你自己那份，别人的截图、第三方镜像和已经被抓走的副本不在你控制范围内。',
        qEn: 'Is a tweet really gone after I delete it?',
        aEn: 'On X, yes: the original link 404s and search results drop off over time. But deletion only reclaims your copy. Screenshots other people took, third-party mirrors, and copies already scraped sit outside your control.',
      },
      {
        q: '为什么 Google 上还能搜到我删掉的推文？',
        a: '搜索引擎的索引更新有延迟，标题和摘要会在缓存里再留一段时间。原链接已经 404，所以点进去看不到内容，通常两三周内条目会自然掉。删得越早，被索引的时间就越短。',
        qEn: 'Why can Google still find tweets I deleted?',
        aEn: 'Search indexes lag, so titles and snippets linger in cache for a while. The original link already 404s, so clicking through shows nothing, and the entry usually drops within a couple of weeks. The earlier you delete, the less time it spent indexed.',
      },
      {
        q: '第三方抓取站是怎么拿到我的推文的？',
        a: '你的推文公开时，任何人都能抓。有些是学术数据集，有些是商业舆情监控，有些纯粹是爱好者存档。他们抓走的是当时的副本，你后来的删除动作不会回传给他们。',
        qEn: 'How did third-party scrapers get my tweets?',
        aEn: 'While your tweets were public, anyone could collect them. Some are academic datasets, some commercial monitoring, some hobbyist archives. They hold a copy from that moment, and your later deletion never propagates to them.',
      },
      {
        q: '既然删不干净，还有必要删吗？',
        a: '有，而且必要性比大多数人想的高。绝大多数针对个人的"考古"发生在最省力的路径上：直接搜你的账号。删掉原推等于把这条最省力的路堵住了，剩下的镜像和截图需要有人专门去找，成本高很多。',
        qEn: 'If deletion is imperfect, is it still worth it?',
        aEn: 'Yes, and more than most people assume. Almost all digging into an individual happens through the laziest route: searching your account directly. Deleting the original closes that route, and reaching mirrors or screenshots then takes deliberate effort, which is a much higher bar.',
      },
    ],
    content: `
<p>你把那条 2015 年的推文删了，第二天有人给你发了它的截图。<strong>已删推文仍可见</strong>这件事让很多人对清理彻底失去信心——既然删不干净，何必费劲。这个结论下得太快了。删除有它的边界，理解边界在哪，你才知道自己到底买到了什么。</p>

<h2>删除到底做了什么，没做什么</h2>
<p>你点删除，X 会把这条推文从公开时间线和自家搜索里撤下来，原链接返回 404。这部分是实打实生效的，而且不可逆。</p>
<p>它没做的事是：把已经流出去的副本追回来。删除是一个只对 X 自己的数据库生效的动作，它不会给谁发通知说"请把你手里那份也删掉"。这就是全部的边界，剩下所有"怎么还能看到"的疑问，都是这条边界的具体表现。</p>

<h2>旧推文靠这四条路活下来</h2>
<ul>
  <li><strong>别人的截图。</strong>最常见也最难处理。截图是静态图片，跟 X 再无关系，你删原推它一动不动。争议话题下的截图往往在你删除之前就已经传开了。</li>
  <li><strong>网页快照站。</strong>公开页面被存档服务抓过，快照里保留着当时的页面。删除不触发快照删除，需要单独走各家的移除流程。</li>
  <li><strong>第三方抓取和数据集。</strong>你公开的那些年里，学术研究、舆情监控、爱好者存档都可能抓走过副本。他们拿到的是那一刻的快照。</li>
  <li><strong>引用与回复的残影。</strong>别人引用你的推文，原推删了，他们的推文下面会留一个空白引用框；有些客户端还会缓存原文摘要。</li>
</ul>
<p>这四条路里，只有第一条和你的行为速度强相关——推文公开的时间越长，被截图的概率越高。这也是我一直说清理要趁早的原因，具体的职业代价可以看<a href="/blog/how-old-tweets-cost-people-jobs">旧推文让人丢掉工作的真实案例</a>。</p>

<h2>哪些内容删了确实基本消失</h2>
<p>好消息是：绝大多数人的绝大多数推文，属于"删了就真没了"这一类。原因很朴素——没人存过。快照站不会抓一个只有 30 个赞的日常推文，抓取数据集抽样也有限，截图更是要有人当时觉得值得截。</p>
<p>真正会留下副本的，通常是这三种：传播过的争议内容、公众人物的言论、明星话题下的高互动推文。如果你只是想清掉手机号、地址、定位和年少时期的碎片，那这些东西大概从来没有第二份。这也是为什么按风险排序清理比按时间清理更值——细节我写在<a href="/blog/which-tweets-to-clean-by-risk">按风险决定先删哪些推文</a>。</p>

<h2>删除依然值得做的理由</h2>
<p>换个角度想：翻你旧账的人是怎么翻的？99% 的情况是打开搜索框，输你的账号名，往下滑。HR 不会去找学术数据集，前同事不会翻快照站，路人更不会。他们走的是最省力的路。</p>
<p>删除原推等于把最省力那条路堵掉。剩下的镜像和截图理论上还在，但需要有人专门花时间去找，而绝大多数"考古"根本没有那个动力。安全不是绝对状态，是提高别人挖到你的成本。</p>
<p>还有个容易被忽略的收益：你自己心里干净了。知道自己账号里没埋手机号和住址，比事后补救省心得多。</p>

<h2>除了删除，还能做什么</h2>
<p>如果某条内容已经被截图传开，删除不解决问题，你需要的是另一套动作：不解释不追问、让新内容把旧内容顶下去、必要时准备一段简短的说明。这属于声誉管理而不是隐私清理，我在<a href="/blog/cancel-culture-101-old-tweets">旧推文与网络舆论 101</a>里单独展开过。</p>
<p>而对于还没被人注意到的那几千条旧推文，删除仍然是最直接、最便宜、最有效的一步。</p>

<h2>FAQ</h2>
<p><strong>删除推文之后它真的消失了吗？</strong> 在 X 上消失了，原链接会 404。但别人的截图、第三方镜像和已抓走的副本不在你控制范围内。</p>
<p><strong>为什么 Google 上还能搜到我删掉的推文？</strong> 索引更新有延迟，缓存里会再留一段时间，通常两三周内自然掉。删得越早，被索引的时间越短。</p>
<p><strong>第三方抓取站是怎么拿到我的推文的？</strong> 公开期间任何人都能抓。他们拿的是当时的副本，你后来的删除不会回传给他们。</p>
<p><strong>既然删不干净，还有必要删吗？</strong> 有。绝大多数考古都走最省力的路径——直接搜你的账号。堵掉这条路，成本就已经拉高了。</p>
<p>先弄清自己账号里到底还留着什么，再决定删哪些。<a href="/">digital-footprint-health.shop</a> 的体检免费、只读、本机跑，不会动你一条推文。</p>
    `.trim(),
    contentEn: `
<p>You delete that 2015 tweet, and the next day someone sends you a screenshot of it. Finding <strong>deleted tweets still visible</strong> is what makes most people give up on cleanup entirely: if it cannot be erased, why bother. That conclusion arrives too fast. Deletion has a boundary, and once you know where that boundary sits, you know what you actually bought.</p>

<h2>What deletion does and does not do</h2>
<p>When you hit delete, X pulls the tweet from public timelines and its own search, and the original link starts returning 404. That part genuinely works, and it is irreversible.</p>
<p>What it does not do is retrieve copies that already left. Deletion acts on X's database only. It never sends anyone a notice asking them to drop their copy too. That is the entire boundary, and every "then how is this still visible" question is just a specific instance of it.</p>

<h2>The four routes old tweets use to survive</h2>
<ul>
  <li><strong>Other people's screenshots.</strong> The most common and the hardest. A screenshot is a static image with no link back to X, so deleting the original changes nothing. Screenshots around contentious topics usually spread before you ever hit delete.</li>
  <li><strong>Web snapshot services.</strong> Public pages get archived, and the snapshot keeps the page as it looked. Deletion does not trigger snapshot removal; each service has its own takedown process.</li>
  <li><strong>Third-party scrapers and datasets.</strong> During the years your account was public, academic projects, monitoring vendors, and hobbyist archivists could all have taken copies. What they hold is a snapshot of that moment.</li>
  <li><strong>Quote and reply residue.</strong> When someone quoted you, deleting the original leaves an empty quote box in their thread, and some clients cache a text preview.</li>
</ul>
<p>Only the first route scales with how fast you act: the longer a tweet stays public, the higher the odds someone captured it. That is the whole argument for cleaning early, and the career side of it shows up in <a href="/blog/how-old-tweets-cost-people-jobs">real cases where old tweets cost people jobs</a>.</p>

<h2>What actually does disappear</h2>
<p>Good news: for most people, most tweets fall into the genuinely-gone category. The reason is mundane. Nobody saved them. Snapshot services do not crawl a daily post with 30 likes, scraped datasets sample narrowly, and a screenshot requires someone to have decided at the time that it was worth capturing.</p>
<p>Content that does leave copies behind tends to be one of three kinds: things that circulated during a controversy, statements by public figures, and high-engagement posts under trending topics. If your goal is clearing phone numbers, addresses, geotags, and teenage noise, a second copy almost certainly never existed. That is also why sorting cleanup by risk beats sorting by date, which I break down in <a href="/blog/which-tweets-to-clean-by-risk">choosing which tweets to clean by risk</a>.</p>

<h2>Why deleting is still worth it</h2>
<p>Flip the question: how do people actually dig into your past? In 99 percent of cases they open a search box, type your handle, and scroll. A recruiter is not querying an academic dataset. A former colleague is not paging through snapshot archives. They take the laziest available route.</p>
<p>Deleting the original closes that route. Mirrors and screenshots may still exist somewhere, but reaching them takes deliberate effort, and the vast majority of casual digging has no such motivation. Safety here is not an absolute state; it is raising the cost of finding you.</p>
<p>There is a quieter benefit too. You get to stop worrying. Knowing your account holds no phone number and no home address is a lot easier to live with than cleaning up after the fact.</p>

<h2>What to do beyond deleting</h2>
<p>If something already circulated as a screenshot, deletion does not solve it, and you need a different playbook: do not argue, let newer content push the old down, and keep one short explanation ready if it comes up. That is reputation work rather than privacy cleanup, and I cover it separately in <a href="/blog/cancel-culture-101-old-tweets">old tweets and online backlash 101</a>.</p>
<p>For the thousands of old tweets nobody has noticed yet, deletion remains the most direct, cheapest, and most effective move available.</p>

<h2>FAQ</h2>
<p><strong>Is a tweet really gone after I delete it?</strong> On X, yes, and the link 404s. But screenshots, mirrors, and already-scraped copies are outside your control.</p>
<p><strong>Why can Google still find deleted tweets?</strong> Index lag keeps cached titles around for a couple of weeks. The earlier you delete, the less indexed time it accumulated.</p>
<p><strong>How did scrapers get my tweets?</strong> They collected them while your account was public. Your later deletion never reaches their copy.</p>
<p><strong>If deletion is imperfect, is it worth it?</strong> Yes. Nearly all digging uses the laziest path, and closing it raises the cost substantially.</p>
<p>Find out what is still sitting in your account before deciding what to remove. The check at <a href="/">digital-footprint-health.shop</a> is free, read-only, and runs on your own machine.</p>
    `.trim(),
  },
  {
    slug: 'snapshot-archive-before-clean',
    title: '账号快照：清理前先留一份完整归档',
    excerpt:
      '删除不可逆，快照是你唯一的兜底。这篇讲清什么算一份合格的账号快照、为什么删除前必须先留、怎么做一份能用十年的备份，以及快照本身的隐私风险怎么控。',
    date: '2026-08-18',
    updatedAt: '2026-08-18',
    author: 'Digital Footprint Health Team',
    category: '归档技术',
    tags: ['X/Twitter', '备份', '账号快照', '数据归档'],
    canonical: '/blog/snapshot-archive-before-clean',
    titleEn: 'Snapshot First: Back Up Your Archive Before Cleaning',
    excerptEn:
      'Deletion is one-way, so a snapshot is your only safety net. Here is what counts as a proper account snapshot, why it has to come before deleting, how to build a backup that survives ten years, and how to handle the privacy risk of the snapshot itself.',
    categoryEn: 'Archive Tech',
    tagsEn: ['X/Twitter', 'backup', 'account snapshot', 'data archive'],
    faq: [
      {
        q: '删除前必须备份吗？',
        a: '必须。X 删除不可逆，删完就再也读不到原文。归档 ZIP 本身就是一份完整快照，复制一份到本地或移动硬盘，前后不超过五分钟，换来的是"删错了还能查"这个底。',
        qEn: 'Do I have to back up before deleting?',
        aEn: 'Yes. X deletion is irreversible and you will never read the original text again. The archive ZIP already is a complete snapshot; copying it to a local or external drive takes under five minutes and buys you the ability to look things up after a mistake.',
      },
      {
        q: '归档 ZIP 算完整备份吗？',
        a: '算，而且是目前最完整的一份。它包含推文正文、时间、ID、媒体文件、点赞和关注列表。唯一的短板是它是那一刻的静态副本，之后发的内容不会自动进来。',
        qEn: 'Does the archive ZIP count as a full backup?',
        aEn: 'It does, and it is the most complete copy available. It holds tweet text, timestamps, IDs, media files, likes, and follow lists. Its one weakness is being a static copy of one moment; anything you post afterward will not appear in it.',
      },
      {
        q: '快照应该存在哪里？',
        a: '至少两个地方，其中一个离线。我自己的做法是本机加密文件夹 + 一份移动硬盘。存网盘也行，但注意这份文件里有十年私聊和定位，同步到共享盘就等于泄露给所有有权限的人。',
        qEn: 'Where should I store the snapshot?',
        aEn: 'At least two places, one of them offline. My own setup is an encrypted local folder plus an external drive. Cloud storage works too, but remember this file contains a decade of DMs and geotags, so syncing it to a shared drive leaks it to everyone with access.',
      },
      {
        q: '快照本身会不会成为新的隐私风险？',
        a: '会，这点常被忽略。快照是你所有敏感信息最集中的一个文件，放在同事共用的电脑或公开云盘上，风险比留在 X 上更高。加密、单独存放、别随手发给别人处理，这三条守住基本没事。',
        qEn: 'Could the snapshot itself become a privacy risk?',
        aEn: 'It can, and this gets overlooked. The snapshot is the single most concentrated file of your sensitive data, so leaving it on a shared work computer or a public cloud folder is riskier than leaving the tweets on X. Encrypt it, store it separately, and never hand it to someone else to process.',
      },
    ],
    content: `
<p><strong>删除前备份</strong>这件事听起来像流程套话，但它是整条清理链上唯一无法后补的一步。X 的删除是真删，不进回收站、没有恢复按钮。删完之后你想确认"那条推文原文到底怎么写的"，只能靠一份快照。这篇讲怎么做这份快照，以及一个容易被忽略的问题：快照自己也是风险。</p>

<h2>什么算一份合格的账号快照</h2>
<p>官方导出的归档 ZIP 就是最完整的那一份，不用另外找工具。它装着推文正文、发布时间、推文 ID、媒体文件、点赞记录和关注列表。有 ID 这一点特别重要——将来你想确认某条推文有没有被删掉，拿 ID 去访问就知道。</p>
<p>它的短板只有一个：静态。归档是你申请那一刻的副本，之后发的内容不会自动进去。所以快照不是"做一次就完事"，而是清理前必做、平时每半年补一份。</p>

<h2>为什么快照必须在删除之前</h2>
<p>顺序反了就没意义了。删完再导出，归档里那些推文已经不在，你拿到的是清理后的账号，等于没有底。</p>
<p>我见过最可惜的一种情况：有人把 2014 到 2016 年全删了，事后想找当年跟朋友的一段对话，发现只剩记忆。那段对话没有隐私风险，是被"按年份清理"顺手带走的。有快照的话，这就只是一次检索。</p>
<table>
  <thead>
    <tr><th>场景</th><th>有快照</th><th>没快照</th></tr>
  </thead>
  <tbody>
    <tr><td>删错了想看原文</td><td>本地检索，几秒钟</td><td>永久找不回</td></tr>
    <tr><td>想确认某条是否已删</td><td>拿 ID 访问核对</td><td>只能靠印象</td></tr>
    <tr><td>想留住有价值的旧内容</td><td>删除前先导出摘录</td><td>一起消失</td></tr>
    <tr><td>需要证明发过某内容</td><td>归档里有完整记录</td><td>无据可依</td></tr>
  </tbody>
</table>

<h2>做一份能用十年的快照</h2>
<ol>
  <li>在 X 设置里申请数据归档，过密码和短信验证，然后等——老账号常见要等两三天。</li>
  <li>下载完先核对文件大小，确认没断流，再解压看一眼 data/tweets.js 能不能打开。</li>
  <li>把 ZIP 原封不动复制到第二个位置，移动硬盘或独立的加密目录都行。别只留一份在下载文件夹里。</li>
  <li>给文件名加日期，比如 x-archive-2026-08-18.zip。半年后你会感谢这个习惯。</li>
  <li>如果有特别想留的内容，单独摘录成文本或截图存档，别指望以后从 27000 个文件里翻。</li>
</ol>
<p>整个过程真正动手的时间不到十分钟，剩下都在等。导出的详细步骤和验证方法在<a href="/blog/how-to-download-x-archive">如何下载 X 数据归档</a>里有图文版。</p>

<h2>快照存哪、怎么防丢</h2>
<p>我的建议是两份起步，其中一份离线。本机放一份方便随时查，移动硬盘或另一台设备放一份防意外。只存在一个地方的备份不叫备份，磁盘坏了、笔记本丢了，你就回到没有快照的状态。</p>
<p>网盘可以用，但要挑对目录。这份文件里有你十年的私聊和定位，同步到和同事共享的空间，比留在 X 上更危险。</p>

<h2>快照自己也是风险</h2>
<p>这是最容易被忽略的一点：整个清理流程里，敏感信息最集中的文件就是这份归档。它把散在十年里的手机号、地址、定位打包成了一个文件。所以三条底线——放加密目录、别放公用电脑、别发给别人帮你分析。</p>
<p>顺带说一句，这也是我坚持体检要在本机跑的原因：把 200MB 归档上传到别人的服务器，等于把这个"最集中的文件"复制了一份出去。做完清理不要急着删 ZIP，但要把它放对地方。删除前的其他检查项，我列在<a href="/blog/delete-wrong-tweet-prechecks">删除前必做的三件事</a>里。</p>

<h2>FAQ</h2>
<p><strong>删除前必须备份吗？</strong> 必须。X 删除不可逆，归档 ZIP 本身就是完整快照，复制一份不超过五分钟。</p>
<p><strong>归档 ZIP 算完整备份吗？</strong> 算，而且是最完整的一份。唯一短板是静态副本，之后发的内容不会自动进来。</p>
<p><strong>快照应该存在哪里？</strong> 至少两个地方，其中一个离线。注意别同步到共享网盘。</p>
<p><strong>快照本身会不会成为新的隐私风险？</strong> 会。它是你敏感信息最集中的一个文件，加密存放、别放公用电脑、别交给别人处理。</p>
<p>快照留好了，下一步就是看清里面有什么。<a href="/">digital-footprint-health.shop</a> 全程在你自己电脑上解析，归档不上传，体检免费只读。想先了解归档结构可以看<a href="/blog/whats-inside-x-archive-tweets-js">tweets.js 里装了什么</a>。</p>
    `.trim(),
    contentEn: `
<p><strong>Backing up tweets before deleting</strong> sounds like boilerplate process advice, but it is the one step in a cleanup that cannot be added later. X deletion is real deletion: no trash bin, no restore button. Once it is done, the only way to check what an old tweet actually said is a snapshot. This post covers how to build one, plus a problem people skip: the snapshot is a risk of its own.</p>

<h2>What counts as a proper snapshot</h2>
<p>The official archive ZIP is the most complete option, and you do not need another tool. It carries tweet text, timestamps, tweet IDs, media files, likes, and follow lists. The IDs matter more than people expect, because later you can hit an ID directly to confirm whether a specific tweet is gone.</p>
<p>It has one weakness: it is static. The archive captures the moment you requested it, and anything posted afterward never appears. So a snapshot is not a one-time chore. Take one before cleaning, then refresh it every six months.</p>

<h2>Why the snapshot has to come first</h2>
<p>Reverse the order and the whole thing loses its point. Export after deleting and those tweets are already absent, so what you get is a post-cleanup account and no safety net at all.</p>
<p>The saddest version I have seen: someone wiped 2014 through 2016, then wanted to find a conversation with an old friend from that period and discovered only memory remained. That thread carried no privacy risk. It got swept up by a delete-by-year filter. With a snapshot, this would have been a five-second lookup.</p>
<table>
  <thead>
    <tr><th>Situation</th><th>With a snapshot</th><th>Without one</th></tr>
  </thead>
  <tbody>
    <tr><td>Deleted the wrong thing</td><td>Search locally in seconds</td><td>Gone permanently</td></tr>
    <tr><td>Verify whether a tweet is gone</td><td>Check by tweet ID</td><td>Rely on memory</td></tr>
    <tr><td>Keep worthwhile old content</td><td>Extract it before deleting</td><td>It disappears too</td></tr>
    <tr><td>Prove you posted something</td><td>Full record in the archive</td><td>No evidence</td></tr>
  </tbody>
</table>

<h2>Building a snapshot that lasts ten years</h2>
<ol>
  <li>Request the data archive in X settings, clear the password and SMS check, then wait. Old accounts often take two or three days.</li>
  <li>Check the downloaded file size to confirm nothing truncated, then unzip and verify data/tweets.js opens.</li>
  <li>Copy the ZIP unchanged to a second location: an external drive or a separate encrypted folder. Do not leave the only copy in Downloads.</li>
  <li>Put the date in the filename, like x-archive-2026-08-18.zip. Six months from now you will appreciate the habit.</li>
  <li>If specific content matters to you, extract it separately as text or screenshots rather than planning to dig through 27,000 files later.</li>
</ol>
<p>Actual hands-on time is under ten minutes; the rest is waiting. Step-by-step export instructions live in <a href="/blog/how-to-download-x-archive">how to download your X archive</a>.</p>

<h2>Where to keep it and how not to lose it</h2>
<p>Start with two copies and keep one offline. A local copy makes lookups easy; an external drive or second device covers accidents. A backup that exists in exactly one place is not a backup, because a dead disk or a lost laptop puts you back to having nothing.</p>
<p>Cloud storage is fine if you pick the folder carefully. This file holds a decade of DMs and geotags, so syncing it into a space shared with coworkers is worse than leaving the tweets on X.</p>

<h2>The snapshot is also a risk</h2>
<p>Here is the part that gets skipped: within the whole cleanup process, this archive is the single most concentrated file of sensitive data you own. It bundles ten years of scattered phone numbers, addresses, and locations into one object. Three rules cover it: keep it in an encrypted folder, keep it off shared computers, and never send it to someone else for analysis.</p>
<p>That is also my reasoning for insisting checks run locally. Uploading a 200MB archive to somebody's server copies that concentrated file straight out of your control. Do not rush to delete the ZIP after cleaning, but do put it somewhere sensible. Other pre-deletion checks are listed in <a href="/blog/delete-wrong-tweet-prechecks">three things to do before deleting</a>.</p>

<h2>FAQ</h2>
<p><strong>Do I have to back up before deleting?</strong> Yes. Deletion is irreversible, and the archive ZIP is already a full snapshot you can copy in five minutes.</p>
<p><strong>Does the ZIP count as a full backup?</strong> It does, and it is the most complete one available. Its only limit is being static.</p>
<p><strong>Where should I store it?</strong> Two places minimum, one offline, and not on a shared cloud folder.</p>
<p><strong>Could the snapshot itself be a risk?</strong> Yes. Encrypt it, keep it off shared machines, and do not hand it to anyone else.</p>
<p>Once the snapshot is safe, the next step is seeing what is inside it. <a href="/">digital-footprint-health.shop</a> parses everything on your own computer with no upload, and the check is free and read-only. For the file structure, see <a href="/blog/whats-inside-x-archive-tweets-js">what is inside tweets.js</a>.</p>
    `.trim(),
  },
  {
    slug: '10-year-cleanup-plan',
    title: '给未来 10 年的自己定个推文清理计划',
    excerpt:
      '一次大扫除解决不了长期问题，三年后你又会攒出一堆需要清的推文。这篇给一个可持续的推文清理计划：四个周期分别做什么、发帖时的两条自检、以及怎么让提醒真的响起来。',
    date: '2026-08-18',
    updatedAt: '2026-08-18',
    author: 'Digital Footprint Health Team',
    category: '长期策略',
    tags: ['X/Twitter', '定期清理', '数字足迹', '长期计划'],
    canonical: '/blog/10-year-cleanup-plan',
    titleEn: 'A Cleaning Plan for the Next 10 Years of You',
    excerptEn:
      'One deep clean does not solve a long-term problem, because three years later you will have a new pile to deal with. Here is a sustainable tweet cleaning plan: what each of four cycles covers, two checks to run as you post, and how to make the reminders actually fire.',
    categoryEn: 'Long-Term Strategy',
    tagsEn: ['X/Twitter', 'regular cleanup', 'digital footprint', 'long-term plan'],
    faq: [
      {
        q: '推文应该多久清理一次？',
        a: '我的节奏是每半年扫一次归档，每年做一次稍认真的复查。半年一次的间隔刚好——新增内容不多，二十分钟能过完，又不至于长到让你忘记账号里有什么。',
        qEn: 'How often should I clean up my tweets?',
        aEn: 'My rhythm is scanning a fresh archive every six months and doing a more careful review once a year. Six months works well: not much new content accumulates, twenty minutes covers it, and the gap is short enough that you still remember what is in the account.',
      },
      {
        q: '定期清理和一次大扫除有什么区别？',
        a: '成本差得很远。大扫除要处理十年积累，光核对清理队列就得花掉一个下午；定期清理每次只面对半年的新增，量小、判断快、心理负担轻。前者是补救，后者是维护。',
        qEn: 'How is regular cleanup different from one deep clean?',
        aEn: 'The cost gap is large. A deep clean means processing ten years at once, and just reviewing the queue eats an afternoon. Regular cleanup only faces six months of new posts: small volume, fast decisions, low mental load. One is remediation, the other is maintenance.',
      },
      {
        q: '发帖的时候怎么避免留下风险内容？',
        a: '两条自检就够用：这条里有没有能定位到我的信息（号码、门牌、公司名、可辨认的背景），以及十年后被截图放到我名字旁边，我会不会难受。想不清就别发，或者发完当天删。',
        qEn: 'How do I avoid creating risky posts in the first place?',
        aEn: 'Two checks cover most of it: does this contain anything that locates me (a number, a street address, an employer, a recognizable background), and if this were screenshotted next to my name ten years from now, would it sting. If you cannot answer, do not post it, or delete it the same day.',
      },
      {
        q: '清理计划会不会太麻烦坚持不下来？',
        a: '会，如果你把它设计得太重。所以我只保留两个固定动作：每半年申请一次归档，扫完清掉标红的。其他都是可选项。计划能不能坚持，取决于它有多轻，不是有多完整。',
        qEn: 'Will a cleaning plan be too much hassle to keep up?',
        aEn: 'It will, if you design it heavy. So I keep only two fixed actions: request an archive every six months and clear whatever gets flagged red. Everything else is optional. Whether a plan survives depends on how light it is, not how thorough it looks.',
      },
    ],
    content: `
<p>你花了一个周末把十年推文清干净，健康分从 40 涨到 90。三年后呢？如果没有<strong>推文清理计划</strong>，你会重新攒出一批需要清的内容，然后再来一次周末大扫除。维护比补救便宜，这是这篇的全部意思。</p>
<p>我自己现在的节奏很轻：每半年二十分钟。下面是怎么排的。</p>

<h2>一次大扫除解决不了什么</h2>
<p>大扫除处理的是存量，处理不了流量。你还在发帖，就还在生产新的数字足迹——新工作的公司名、搬家后的新片区、旅行打卡、深夜情绪。这些内容今天看着无害，五年后就成了新一批"旧推文"。</p>
<p>另一个现实问题是记忆衰减。清理最费劲的不是删除，是判断某条该不该删，而这个判断的准确度随时间下降得很快。半年前发的推文你还记得上下文，八年前的只能靠猜。趁记得的时候处理，效率高得多。</p>

<h2>清理计划的四个周期</h2>
<table>
  <thead>
    <tr><th>周期</th><th>做什么</th><th>大概耗时</th><th>必要性</th></tr>
  </thead>
  <tbody>
    <tr><td>发帖当时</td><td>两条自检，有疑虑就不发</td><td>几秒</td><td>最高，性价比无敌</td></tr>
    <tr><td>每半年</td><td>申请归档、跑体检、清掉标红</td><td>约 20 分钟</td><td>核心动作</td></tr>
    <tr><td>每年</td><td>复查健康分变化、翻一遍当年图片</td><td>约 1 小时</td><td>推荐</td></tr>
    <tr><td>换工作/换城市前</td><td>按风险做一次针对性清理</td><td>1-2 小时</td><td>视情况</td></tr>
  </tbody>
</table>
<p>真正要坚持的只有第二行。其他三行是加分项，做了更好，漏了不影响大局。计划设计得太满，第一个月就废了。</p>

<h2>发帖时的两条自检</h2>
<p>第一条：这条推文里有没有能定位到我的信息？手机号、门牌号、公司名、能认出地点的背景，甚至"我家楼下那家便利店"配一张照片，都算。第二条：十年后有人把它截图放在我名字旁边，我会不会难受？</p>
<p>两个问题都能干脆回答"没有"和"不会"，就发。有一个卡住，就改写或者干脆不发。这两秒钟的判断，能省掉未来几百条推文的清理工作量。</p>

<h2>半年一次都做什么</h2>
<ol>
  <li>申请一份新归档（提前几天申请，别当天才想起要等）</li>
  <li>本机跑一次体检，重点看健康分和上次比是涨了还是掉了</li>
  <li>把标红的清掉——通常也就十几条，几分钟的事</li>
  <li>顺手把这份归档存好，覆盖或者归档到日期命名的目录</li>
</ol>
<p>健康分的变化比绝对值更有信息量。分掉了说明这半年你发了新的风险内容，值得回头看看是哪一类；分稳住了就什么都不用做。评分怎么算的可以看<a href="/blog/digital-footprint-health-score">0-100 健康分的计算方式</a>，标红项怎么排优先级看<a href="/blog/which-tweets-to-clean-by-risk">按风险决定先删哪些</a>。</p>

<h2>怎么让提醒真的响起来</h2>
<p>我试过三种方式，只有一种活下来了。日历重复事件容易被顺手划掉；待办清单里的年度任务会被无限推迟；真正有用的是绑定到一个已有的固定事件——我把它挂在每年报税和年中体检这两个时间点上，反正那几天本来就在处理"年度琐事"，多加二十分钟不痛。</p>
<p>另一个小技巧是把归档 ZIP 放在你每周都会打开的目录附近。看见它，就想起来这件事。</p>

<h2>十年后你会感谢的两件事</h2>
<p>一是你手上有一串按日期命名的归档，等于给自己留了十年的可检索记录，找当年的东西不用靠回忆。二是你从来没有经历过"临时被人翻旧账"的慌乱——因为该清的早就清了，剩下的都是你确认过愿意留着的。</p>
<p>清理这件事的门槛不在技术，在启动。你已经读到这里了，剩下的只是把半年后的那个提醒设上。删除节奏和费用控制方面，<a href="/blog/pause-resume-refund-deletion">可暂停、可续传、可退款</a>那篇讲得更细。</p>

<h2>FAQ</h2>
<p><strong>推文应该多久清理一次？</strong> 每半年扫一次归档，每年做一次稍认真的复查。半年刚好，二十分钟能过完。</p>
<p><strong>定期清理和一次大扫除有什么区别？</strong> 大扫除处理十年积累，核对队列就得一个下午；定期清理每次只面对半年新增。前者是补救，后者是维护。</p>
<p><strong>发帖的时候怎么避免留下风险内容？</strong> 两条自检：有没有能定位到我的信息；十年后被截图放在我名字旁边会不会难受。</p>
<p><strong>清理计划会不会太麻烦坚持不下来？</strong> 会，如果设计得太重。只保留半年一次的归档扫描和清红，其他都是可选。</p>
<p>把第一次扫描安排在今天？<a href="/">digital-footprint-health.shop</a> 的体检免费、只读、在你自己电脑上跑，二十分钟就能拿到你的起点分。</p>
    `.trim(),
    contentEn: `
<p>You spend a weekend clearing ten years of tweets and your score jumps from 40 to 90. What about three years from now? Without a <strong>tweet cleaning plan</strong>, you will accumulate a fresh pile and repeat the whole weekend. Maintenance costs less than remediation. That is the entire argument here.</p>
<p>My own rhythm is light: twenty minutes every six months. Here is how it is arranged.</p>

<h2>What a deep clean cannot fix</h2>
<p>A deep clean handles your existing stock, not the flow. As long as you keep posting, you keep producing new footprint: a new employer name, a new neighborhood after moving, travel check-ins, late-night venting. Harmless today, and five years from now they are simply the next batch of old tweets.</p>
<p>There is also memory decay. The hard part of cleanup is not deleting, it is judging whether a specific post should go, and that judgment gets less accurate fast. You still remember the context behind something from six months ago. From eight years ago, you are guessing. Handling posts while you remember them is far more efficient.</p>

<h2>Four cycles in the plan</h2>
<table>
  <thead>
    <tr><th>Cycle</th><th>What it covers</th><th>Rough time</th><th>How necessary</th></tr>
  </thead>
  <tbody>
    <tr><td>As you post</td><td>Two quick checks; skip the post if unsure</td><td>Seconds</td><td>Highest value per minute</td></tr>
    <tr><td>Every six months</td><td>Request archive, run the check, clear red flags</td><td>~20 minutes</td><td>The core action</td></tr>
    <tr><td>Yearly</td><td>Review score movement, page through the year's images</td><td>~1 hour</td><td>Recommended</td></tr>
    <tr><td>Before a job or city change</td><td>Targeted cleanup by risk</td><td>1-2 hours</td><td>Situational</td></tr>
  </tbody>
</table>
<p>Only the second row genuinely needs to survive. The rest is bonus: good if you do it, harmless if you skip it. Design the plan too full and it dies in month one.</p>

<h2>Two checks while posting</h2>
<p>First: does this post contain anything that locates me? A phone number, a street address, an employer, a recognizable background, even "the convenience store below my place" attached to a photo. Second: if someone screenshotted this next to my name ten years from now, would it sting?</p>
<p>If both answers come back cleanly as no, post it. If either one hesitates, rewrite or skip. Those two seconds of judgment save you hundreds of tweets worth of cleanup later.</p>

<h2>What the six-month pass looks like</h2>
<ol>
  <li>Request a fresh archive, ideally a few days ahead so you are not waiting on the day</li>
  <li>Run the check locally and compare the score against last time rather than reading it in isolation</li>
  <li>Clear whatever came up red, usually a dozen posts and a few minutes of work</li>
  <li>File the archive properly, either overwriting or storing it in a date-named folder</li>
</ol>
<p>Score movement carries more information than the absolute number. A drop means you posted new risky content in those six months and it is worth seeing which category. A flat score means you do nothing. How the number is computed is in <a href="/blog/digital-footprint-health-score">how the 0-100 health score works</a>, and prioritizing the red items is covered in <a href="/blog/which-tweets-to-clean-by-risk">deciding what to clean by risk</a>.</p>

<h2>Making the reminder actually fire</h2>
<p>I tried three approaches and only one survived. Repeating calendar events get dismissed reflexively. Annual items on a todo list get postponed forever. What works is attaching the task to an event that already happens: I hang mine on tax filing and my midyear checkup, since I am already dealing with annual admin those days and twenty more minutes does not hurt.</p>
<p>One small trick: keep the archive ZIP near a folder you open weekly. Seeing it is the reminder.</p>

<h2>Two things you will thank yourself for</h2>
<p>First, you end up with a row of date-named archives, which is a searchable record of ten years, so finding something old does not depend on memory. Second, you never experience the scramble of someone digging up your past on short notice, because the risky material left years ago and whatever remains is content you consciously chose to keep.</p>
<p>The barrier to cleanup is not technical, it is starting. You already read this far, so what is left is setting the reminder for six months out. On pacing the deletion itself and controlling spend, <a href="/blog/pause-resume-refund-deletion">pause, resume, and refund</a> goes deeper.</p>

<h2>FAQ</h2>
<p><strong>How often should I clean up?</strong> Scan a fresh archive every six months, with a more careful annual review. Six months takes about twenty minutes.</p>
<p><strong>How is this different from one deep clean?</strong> A deep clean processes ten years and eats an afternoon just in review. Regular cleanup faces only six months of new posts.</p>
<p><strong>How do I avoid risky posts up front?</strong> Two checks: anything that locates me, and whether a screenshot next to my name in ten years would sting.</p>
<p><strong>Will the plan be too much hassle?</strong> Only if you make it heavy. Keep the six-month archive scan and clearing red flags; treat the rest as optional.</p>
<p>Want to schedule that first scan today? The check at <a href="/">digital-footprint-health.shop</a> is free, read-only, runs on your own machine, and gives you a starting score in about twenty minutes.</p>
    `.trim(),
  },
  {
    slug: 'digital-minimalism-twitter',
    title: '数字极简主义者的 X 减负指南：把账号当工具，别当仓库',
    excerpt: '数字极简不是删光社交账号，而是重新拿回主动权。这篇指南聊聊怎么用"减负"思路清理 X（Twitter）上的旧推文，让账号回归工具属性，而不是十年情绪的仓库。',
    date: '2026-08-19',
    updatedAt: '2026-08-19',
    author: 'Digital Footprint Health Team',
    category: '隐私习惯',
    tags: ['数字极简', 'X/Twitter', '隐私清理', '断舍离'],
    canonical: '/blog/digital-minimalism-twitter',
    faq: [
      { q: '数字极简就是删掉所有社交账号吗？', a: '不是。数字极简的核心是"由你决定什么留下"，而不是让算法和十年前的自己替你决定。X 账号可以保留，只是把那些你不愿被人翻出的旧推文清理掉，让账号回到"我在用"而不是"它在堆"。', qEn: 'Does digital minimalism mean deleting all social accounts?', aEn: 'No. The core of digital minimalism is deciding what stays, instead of letting the algorithm and your 2014 self decide. You can keep your X account; you just remove the old posts you would not want a stranger to read, so the account feels like something you use rather than a pile that grows on its own.' },
      { q: '每天要花多少时间清理才够？', a: '不需要每天。我自己的节奏是每半年拉一次归档，花二十分钟清掉标红的几十条就结束。比起一次性清理十年，规律的小动作更轻松，也更能防住新产生的风险推文。', qEn: 'How much time per day does cleanup take?', aEn: 'Not daily. My own rhythm is pulling a fresh archive every six months and spending twenty minutes clearing the red items. Small, regular passes beat one painful afternoon cleaning a decade, and they catch new risky posts before they pile up.' },
      { q: '哪些推文值得保留？', a: '能放心给面试官或家人看的，就留着。模糊地带的（真实但暴露住址、或点名了别人）可以先删具体那一条，不必整账号清空。第一次过，先把明显"该删"的那一桶清完就够了。', qEn: 'Which tweets are worth keeping?', aEn: 'Keep anything you would show a hiring manager or your mom. For the grey zone (true but gives away your address, or names someone), delete that specific post rather than wiping the whole account. On a first pass, clearing the obvious delete bucket is enough.' },
      { q: '数字足迹体检和数字极简有什么关系？', a: '体检把"该清理什么"从凭感觉变成可量化：它在本机扫出手机号、住址、定位、敏感话题，给你 0-100 健康评分。你拿分数当定期维护的指标，而不是等出事才慌。', qEn: 'What does a footprint check have to do with minimalism?', aEn: 'The check turns "what should I clean" from a guess into a number: it scans your archive on your device for phone numbers, addresses, locations and sensitive topics, then gives a 0-100 health score. You use that score as a maintenance metric instead of panicking only when something goes wrong.' },
    ],
    titleEn: "A Digital Minimalist's Guide to Decluttering X",
    excerptEn: 'Digital minimalism applied to X is the practice of turning a decade-old storage unit back into a tool you control. This guide covers how to cut an archive down to posts you would not mind a stranger reading.',
    categoryEn: 'Privacy Habits',
    tagsEn: ['digital minimalism', 'X/Twitter', 'privacy cleanup', 'declutter'],
    contentEn: `
<p>Most people treat their X (Twitter) account like a storage unit they stopped paying attention to years ago. Posts from 2012 sit next to last week's hot take, and nobody remembers what is in there. Digital minimalism, applied to X, is the practice of turning that unit back into a tool you actually use. This guide walks through how I cut my own archive from 14,000 posts down to something I would not mind a stranger reading, and what I learned doing it.</p>

<h2>Minimalism is not deleting your account</h2>
<p>I want to get this out of the way first, because the word "minimalism" makes people think of empty rooms and cancelled accounts. That is not the point. The point is ownership. A minimalist X account is one where you decided what stays, instead of letting the algorithm and your 2014 self decide for you.</p>
<p>When I started, I had no idea what was in there. That is the normal state. You post, you move on, and the pile grows. Digital minimalism is just the habit of going back through the pile on a schedule, the same way you clean a closet you actually wear from.</p>

<h2>Why X is the account to declutter first</h2>
<p>If you keep several social accounts, start with X. Three reasons stand out:</p>
<ul>
  <li><strong>Everything is public by default.</strong> Old posts show up in Google, and a stranger needs no permission to read them.</li>
  <li><strong>It is your longest paper trail.</strong> Many of us have posted there longer than anywhere else, through jobs, breakups, and opinions we would soften today.</li>
  <li><strong>The archive gives you the whole thing.</strong> X packs every post into a ZIP you can parse locally, so cleanup is not capped at the last 3,200.</li>
</ul>
<p>Other platforms hide your history behind APIs and soft deletes. X hands you the file. That alone makes it the easiest place to actually finish the job instead of guessing.</p>

<h2>What you actually find when you look</h2>
<p>People imagine the risky stuff is rare. It is not. In my own archive the first red hits were a phone number I posted to arrange a meetup in 2015, a photo with a boarding pass barcode, and a rant naming a former manager. None of it felt dangerous the day I posted it. Years later, any one of those is the kind of thing you would rather not have indexed under your name.</p>
<p>The uncomfortable part is that you cannot remember it all. That is the whole reason a tool exists: the archive is too big to read by hand, and the risky lines are scattered across a decade. You need something that reads it for you.</p>

<h2>Three buckets: keep, edit, delete</h2>
<p>I sort every pass into three buckets. A simple table stopped me from freezing:</p>
<table>
  <thead>
    <tr><th>Bucket</th><th>What goes here</th><th>What I do</th></tr>
  </thead>
  <tbody>
    <tr><td>Keep</td><td>Posts I would show a hiring manager or my mom</td><td>Nothing, maybe re-post</td></tr>
    <tr><td>Edit</td><td>True but sloppy, or identifies me too precisely</td><td>Delete just that one, or accept the risk</td></tr>
    <tr><td>Delete</td><td>Locates me, doxxes someone, or aged badly</td><td>Remove before it is found</td></tr>
  </tbody>
</table>
<p>The edit bucket is the one people skip. Not everything risky needs deleting; sometimes the post is fine and only the location tag or a name is the problem. For a first pass, when you are staring at thousands of posts, clearing the obvious delete bucket is enough. You can refine the edit bucket later.</p>

<h2>A 20-minute weekly routine</h2>
<p>You do not need a weekend retreat. The routine that stuck for me:</p>
<ol>
  <li>Request a fresh archive every six months, tied to an event I already do (tax filing).</li>
  <li>Run a local check and look at the score, not the full list.</li>
  <li>Clear the red items, which is usually a dozen posts and a few minutes.</li>
  <li>File the archive in a date-named folder so I can find old posts later.</li>
</ol>
<p>Twenty minutes, twice a year, beats one painful afternoon cleaning a decade. A dropping score tells me I posted something risky in those months; a flat score means I am done and can close the laptop.</p>

<h2>Tools versus doing it by hand</h2>
<p>You can delete by hand, and for a small account that is fine. The moment your archive crosses a few thousand posts, hand deletion breaks down: X only exposes the most recent ~3,200 through the interface, and the older ones are locked behind the archive file. A local check reads the archive directly, scores every post, and lets you filter by date, keyword, or label. That is the difference between an afternoon of scrolling and twenty minutes of clicking.</p>
<p>The part I care about is where the data goes. A check that uploads your archive to a server defeats the purpose. Look for one that parses on your device and never calls X's read API. Deletion, when you choose it, is the only step that touches X\'s write interface, and it should be pauseable and refundable.</p>

<h2>Treat the check as maintenance, not damage control</h2>
<p>The mistake everyone makes is waiting for a crisis. People clean their X when they are job hunting or in the news, which is exactly when they have no time. A footprint check you run on your own machine, for free, turns cleanup from panic into a chore on the calendar.</p>
<p>You can see how the score is built in our <a href="/blog/digital-footprint-health-score">guide to the 0-100 health score</a>, and how to prioritise the red items in <a href="/blog/which-tweets-to-clean-by-risk">ranking tweets by risk</a>. For the deletion itself, pricing is per tweet and you can <a href="/pricing">pause, resume, or get a refund</a>.</p>
<p>The check at <a href="/">digital-footprint-health.shop</a> is free and read-only, runs entirely on your device, and gives you a starting score in about twenty minutes. Start there, then decide what actually needs to leave.</p>
    `.trim(),
    content: `
<p>大多数人的 X（Twitter）账号，都像一间早就不去收拾的储物间。2012 年的推文和上周的吐槽并排躺着，没人记得里面到底堆了什么。数字极简用到 X 上，就是把这个储物间重新变回"你在用的工具"。这篇指南聊聊我自己怎么把一万四千多条推文，砍到"陌生人翻到也不慌"的程度，以及中间踩过的坑。</p>

<h2>先说清楚：数字极简不是"注销账号"</h2>
<p>我得先把这句摆前面，因为一听到"极简"很多人就想到空房间和注销账号。那不是重点。重点是主动权。一个"极简"的 X 账号，是"你决定什么留下"，而不是让算法和 2014 年的你自己替你决定。</p>
<p>我刚开始清理时，根本不知道里面有什么。这是常态：你发完就走，堆就自己长。数字极简不过是个"定期回去翻一遍"的习惯，跟你整理常穿的衣服一个道理。</p>

<h2>为什么 X 是最该减负的账号</h2>
<p>如果你有几个社交账号，先从 X 动手。原因很实在：</p>
<ul>
  <li><strong>默认全公开。</strong> 旧推文在 Google 里能搜到，陌生人不用任何权限就能读。</li>
  <li><strong>它是你最长的黑历史档案。</strong> 很多人发 X 比发别处都久，横跨换工作、分手、还有那些今天会收回的言论。</li>
  <li><strong>归档把全部历史交给你。</strong> X 会把每一条推文打包成 ZIP，本机就能解析，清理不受"最近 3200 条"限制。</li>
</ul>
<p>别的平台把历史藏进 API 和软删除里。X 直接把文件递给你。光凭这点，它就是最容易"真正做完"的地方。</p>

<h2>你真去翻，会翻出什么</h2>
<p>大家都以为风险内容很少。其实不是。我自己的归档里，第一批标红的是：2015 年为了约饭留的手机号、一张带登机牌条形码的照片、还有一条点名前主管的吐槽。发的时候没一个觉得危险。几年后，随便哪条都是"最好别挂自己名下"的东西。</p>
<p>难受的地方在于：你记不全。这正是需要工具的原因——归档太大读不过来，而风险行散落在十年里，得有人替你读完。</p>

<h2>三把尺子：留、改、删</h2>
<p>我每次过账都分三桶。一张简单的表治好了我的选择困难：</p>
<table>
  <thead>
    <tr><th>桶</th><th>里面放什么</th><th>我怎么做</th></tr>
  </thead>
  <tbody>
    <tr><td>留</td><td>能放心给面试官或我妈看的</td><td>不动，偶尔转推</td></tr>
    <tr><td>改</td><td>真实但太潦草，或暴露太准的定位</td><td>只删那一条，或接受风险</td></tr>
    <tr><td>删</td><td>定位我、泄露别人、或老了很尬的</td><td>在被人翻出前清掉</td></tr>
  </tbody>
</table>
<p>"改"这桶最容易被跳过。不是所有风险的都得删，有时推文本身没问题，只是定位标签或某个名字是雷。第一次过，面对几千条，先把明显"该删"的那桶清完就够，改桶以后慢慢来。</p>

<h2>每周 20 分钟的数字极简流程</h2>
<p>你不需要闭关周末。真正坚持下来的是这套：</p>
<ol>
  <li>每半年拉一次归档，绑在我本来就要做的事上（报税）。</li>
  <li>本机跑一次体检，只看分数，不看整张清单。</li>
  <li>清掉标红的，通常就几十条、几分钟。</li>
  <li>归档存进按日期命名的文件夹，以后找旧推文不靠脑子。</li>
</ol>
<p>一年两次、每次二十分钟，比一次性清理十年舒服太多。分数往下掉，说明这半年发了危险内容，值得看看是哪类；持平就关电脑走人。</p>

<h2>工具删 vs 手动删</h2>
<p>少量账号手动删没问题。一旦归档过几千条，手动就崩了：X 界面只放得出最近约 3200 条，更早的被锁在归档文件后面。本机体检直接读归档，给每条打分，还能按日期、关键词、标签筛选。这就是"刷一下午"和"点二十分钟"的差别。</p>
<p>我在意的是数据去哪。把归档上传到服务器的体检，等于本末倒置。选在本机解析、不调 X 读取接口的。删除是你主动选的那一步，才碰 X 写接口，而且应该能暂停、退款。</p>

<h2>把"体检"当维护，别当救火</h2>
<p>所有人都会犯的错是等危机。大家都是求职季或上新闻时才清 X，偏偏那时最没时间。一次本机、免费的体检，能把清理从"恐慌"变成"日历上的杂活"。</p>
<p>分数怎么算，看这篇 <a href="/blog/digital-footprint-health-score">0-100 健康评分详解</a>；标红怎么排优先级，看 <a href="/blog/which-tweets-to-clean-by-risk">按风险排序的清理指南</a>。真要删，删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。</p>

<h2>关于 digital-footprint-health.shop</h2>
<p>digital-footprint-health.shop 是一个 X 数字足迹体检工具：你上传 X 数据归档，它在你的本机解析每一条推文，扫描手机号、住址、定位和敏感话题，给出 0-100 健康评分。体检免费且只读，不上传你的数据。想动手清理时，删除按条计费，可随时 <a href="/pricing">暂停、续传、退款</a>。先看这篇 <a href="/blog/which-tweets-to-clean-by-risk">按风险排序的清理指南</a>，或直接去 <a href="/upload">免费跑一次体检</a>。</p>
    `.trim(),
  },
  {
    slug: 'read-twitter-archive',
    title: '别急着删：先读一遍你的 X 归档，会错过不少好东西',
    excerpt: '清理推文前，先读一遍归档。那些被你忘了的旅行、吐槽和朋友圈子，其实是一份十年回忆录。本文聊聊怎么读归档，以及为什么"只删不读"会丢掉一些值得留的东西。',
    date: '2026-08-19',
    updatedAt: '2026-08-19',
    author: 'Digital Footprint Health Team',
    category: '归档入门',
    tags: ['X 归档', '回忆', '数字极简', '隐私清理'],
    canonical: '/blog/read-twitter-archive',
    faq: [
      { q: '归档里除了推文还有别的吗？', a: '有。一份完整归档除了 tweets.js，还有 like.js（你点过的赞）、direct-messages.js（私信）、profile.js（资料）和媒体文件。读归档时别只盯着推文，点赞和私信里也可能有不想留的东西。', qEn: 'Is there more in the archive than tweets?', aEn: 'Yes. A full archive includes likes.js (your likes), direct-messages.js, your profile, and media files, not just tweets.js. When you read it, do not stop at tweets; likes and DMs can hold things you would rather not keep either.' },
      { q: '怎么快速找到某一年某条旧推文？', a: '最直接的是用体检工具的"按日期"筛选，或把 tweets.js 按时间戳排序自己翻。想找带地点的，用"定位"筛选；想找某话题，用关键词搜。三种读法覆盖大部分需求。', qEn: 'How do I find a specific old tweet from a year?', aEn: 'The quickest way is the date filter in a check tool, or sort tweets.js by timestamp yourself. For location posts use the location filter; for a topic use keyword search. Those three reads cover most needs.' },
      { q: '读到尴尬的旧推文，一定要删吗？', a: '不一定。先判断它是否暴露定位、是否点名别人、十年后截图挂你名下会不会疼。只"尬"但不危险，可以留着当时间胶囊；真的有风险，再删具体那条。', qEn: 'Must I delete an embarrassing old tweet?', aEn: 'Not always. Ask whether it gives away a location, names someone, or would sting if screenshotted next to your name in ten years. Awkward but safe can stay as a time capsule; only delete the one that is genuinely risky.' },
      { q: '读归档和体检是一回事吗？', a: '不是。读归档是你自己翻着看、找回忆；体检是工具在本机扫风险、打分。两者互补：先读一遍，才知道哪些该留、哪些该交给体检标红清理。', qEn: 'Is reading the archive the same as a check?', aEn: 'No. Reading is you browsing for memories; a check is the tool scanning for risk and scoring on your device. They complement each other: read once to know what to keep, then let the check flag what to clean.' },
    ],
    titleEn: 'Don’t Just Delete: What You Lose by Skipping the Archive',
    excerptEn: 'Before you wipe old posts, read the archive once. The travel, the rants, the friend groups you forgot are a ten-year memoir. Here is how to read it and why delete-only misses things worth keeping.',
    categoryEn: 'Archive Basics',
    tagsEn: ['X archive', 'memories', 'digital minimalism', 'privacy cleanup'],
    contentEn: `
<p>There is a reflex to open an archive and start deleting. I did it too, until I realised I was throwing away a decade I could not get back. Reading the archive before you clean it changes the job from "erase the risky bits" to "keep the good, remove the dangerous." This post is about the reading part, which almost nobody talks about.</p>

<h2>What is actually in there</h2>
<p>A full X archive is more than tweets. You get likes.js (everything you liked), direct-messages.js, your profile, and media folders. The tweets are the headline, but the likes and DMs are where surprising things hide: an old crush's username, a fight you thought was private, a screenshot you forgot you sent.</p>
<p>So reading is not just scrolling your own posts. It is a tour of who you were, including the parts you would not post today.</p>

<h2>Three ways to read it</h2>
<ul>
  <li><strong>By timeline.</strong> Sort by date and walk a year at a time. This is how you find the 2015 trip and the 2018 bad take in context.</li>
  <li><strong>By keyword.</strong> Search a name, a city, a former employer. Fast when you know roughly what you are looking for.</li>
  <li><strong>By location.</strong> Pull the geo-tagged posts. These are the highest-risk for real-world safety and the easiest to miss by hand.</li>
</ul>
<p>I use timeline for nostalgia and keyword plus location for cleanup. The two modes do different jobs, and doing both means fewer surprises later.</p>

<h2>What you lose by deleting first</h2>
<p>When you delete before reading, you lose the posts that were actually good. A thread where you explained something clearly. A photo from a night you cannot reconstruct from memory. A kind reply to a stranger that reminded you who you were.</p>
<p>None of that is risky. All of it is gone the moment you bulk-delete. Reading first lets you move the keepers somewhere safe, a private folder or a re-post, before the cleanup pass touches them.</p>

<h2>Reading also shows you what to delete</h2>
<p>The flip side is honest: reading makes the risky stuff obvious. A post that names your street. A rant about a client. A check-in at the hospital. You do not spot these by guessing; you spot them by reading, and a local check just speeds up the spotting.</p>
<p>So the order matters. Read, decide what is worth keeping, then run a check that scores the rest. You end up deleting less and keeping more of the right things.</p>

<h2>A small habit</h2>
<p>Once a year I read the archive like a journal, not a chore. It takes an evening, and I always find something I am glad I kept. The cleanup after is shorter because the reading already told me what matters.</p>
<p>If you want the scoring half done for you, the check at <a href="/">digital-footprint-health.shop</a> reads the archive on your device, flags phone numbers, addresses, and locations, and gives a 0-100 score. Pair the read with the score and the delete pass gets easy. See <a href="/blog/how-to-download-x-archive">how to get your archive</a> to start.</p>
    `.trim(),
    content: `
<p>打开归档就忍不住想删，这股冲动我也有。直到我发现自己在扔一整段找不回来的十年。清理前先读一遍归档，把这事从"把危险的擦掉"变成"把好的留下、把危险的删掉"。这篇只聊"读"这一步——几乎没人提，但它最关键。</p>

<h2>归档里到底有什么</h2>
<p>一份完整的 X 归档不止推文。你还会拿到 like.js（点过的赞）、direct-messages.js（私信）、profile.js（资料）和一堆媒体文件。推文是主角，但赞和私信里藏着更意外的内容：一个旧暗恋对象的用户名、一场你以为私下的吵架、一张忘了发过的截图。</p>
<p>所以"读"不只是刷自己发过的。它是一次"你曾经是谁"的巡展，包括那些今天绝不会发的部分。</p>

<h2>三种读法</h2>
<ul>
  <li><strong>按时间线。</strong> 按日期一年一年走。这样你能在语境里找到 2015 的那趟旅行、2018 的那句蠢话。</li>
  <li><strong>按关键词。</strong> 搜一个名字、一座城、一家前公司。大概知道找什么时最快。</li>
  <li><strong>按地点。</strong> 把带定位的拉出来。这类对现实安全最危险，也最容易被手翻漏掉。</li>
</ul>
<p>时间线用来怀旧，关键词加定位用来清理。两种模式干不同的活，都做一遍，后面惊喜更少。</p>

<h2>先删会丢掉什么</h2>
<p>没读就删，你丢掉的是其实挺好的那些：一条你把某事讲清楚的 thread、一张记忆里拼不回来的夜里的照片、一条对陌生人的善意回复——它提醒你曾经是谁。</p>
<p>这些都不危险。可一旦批量删，瞬间就没了。先读，能让你把"该留的"挪到安全处（一个私有文件夹，或转推），再让清理那遍去碰它们。</p>

<h2>读，也会告诉你该删什么</h2>
<p>另一面也很现实：读，让危险的显形。一条写出你家街道的、一条吐槽客户的、一条在医院打卡的。这些你靠猜找不到，靠读才看得到，而本机体检只是把"看"加速。</p>
<p>所以顺序重要。先读、决定什么值得留，再跑一个给剩下部分打分的体检。结果就是：删得更少，留的对的更多。</p>

<h2>一个小习惯</h2>
<p>我每年像翻日记一样读一次归档，不当杂活。花一个晚上，总能找到"幸好留着"的东西。之后的清理更短，因为读已经告诉我什么重要。</p>
<p>想让"打分"那半自动完成，<a href="/">digital-footprint-health.shop</a> 在本机读归档，标出手机号、住址、定位，给 0-100 分。把"读"和"分"配对，删除那遍就轻松了。先看 <a href="/blog/how-to-download-x-archive">怎么拿到你的归档</a> 开头。</p>

<h2>关于 digital-footprint-health.shop</h2>
<p>digital-footprint-health.shop 是个 X 数字足迹体检工具：上传你的 X 归档，它在你的本机逐条解析，扫出手机号、住址、定位与敏感话题，给出 0-100 健康评分。体检免费只读、不上传数据。读完想清理，删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。归档怎么下，看 <a href="/blog/how-to-download-x-archive">这篇教程</a>；风险标签含义看 <a href="/blog/risk-labels-explained">标签解读</a>。</p>
    `.trim(),
  },
  {
    slug: 'job-search-cleanup',
    title: '换工作季：跳槽前给 X 做一次数字足迹大扫除',
    excerpt: '投简历前，先想一件事——面试官会不会顺手搜你的 X？这篇讲求职前该清理哪几类旧推文、按什么顺序清，以及清理完怎么给未来的自己设护栏。',
    date: '2026-08-19',
    updatedAt: '2026-08-19',
    author: 'Digital Footprint Health Team',
    category: '风险场景',
    tags: ['求职', '跳槽', 'X 清理', '隐私检查'],
    canonical: '/blog/job-search-cleanup',
    faq: [
      { q: '投简历前一定要清 X 吗？', a: '不是"一定"，但值得花二十分钟。招聘方确实会搜候选人公开账号，清掉明显暴露定位、点名前公司或情绪化攻击的内容，能少几个不必要的减分项。', qEn: 'Do I have to clean X before applying?', aEn: 'Not strictly, but twenty minutes is worth it. Recruiters do search candidate accounts, and removing posts that暴露 a location, name a former employer, or read as an angry attack removes avoidable downsides.' },
      { q: '求职前最先清哪几类？', a: '三优先：暴露真实定位（住址/通勤路线）、点名前公司或前领导、情绪化攻击陌生人或群体的内容。这三类最容易被截图，也最影响第一印象。', qEn: 'What should I clean first before a job hunt?', aEn: 'Three priorities: posts that暴露 your real location (home, commute), posts naming a former employer or boss, and angry attacks on strangers or groups. These get screenshotted most and hurt first impressions most.' },
      { q: '清理完还要做什么？', a: '设护栏：以后发定位三思、不点名现公司、敏感话题用私聊。再把账号改成"仅关注者可见"或定期跑体检，让未来的自己不用每次求职都重来一遍。', qEn: 'What do I do after cleaning?', aEn: 'Set guardrails: think before posting location, never name your current employer, take sensitive topics to DMs. Switch the account to followers-only or run a check regularly so future you does not restart from zero each job hunt.' },
      { q: '私密账号就安全了吗？', a: '不够。你的旧推文在公开期已被收录和截图，转私密挡不住已经在外面的副本。求职前仍建议跑一次体检，清掉历史里真正危险的。', qEn: 'Is a private account enough?', aEn: 'Not quite. Old posts were indexed and screenshotted while public; going private does not erase copies already out there. A pre-job-hunt check is still worth it to clear what is genuinely risky in the history.' },
    ],
    titleEn: 'Job Hunt Season: A Digital Footprint Deep Clean',
    excerptEn: 'Before you send the resume, ask one thing: will the interviewer search your X? This covers which old posts to clean before a job hunt, in what order, and how to guardrail future you.',
    categoryEn: 'Risk Scenarios',
    tagsEn: ['job hunt', 'career change', 'X cleanup', 'privacy check'],
    contentEn: `
<p>You polish the resume, write the cover letter, and forget the one thing a hiring manager can read in ten seconds: your public X. Job hunt season is the right moment for a footprint deep clean, because the cost of an old post is highest exactly when you are trying to look employable.</p>

<h2>Three things to do before you apply</h2>
<ol>
  <li>Pull a fresh archive so you are looking at the real history, not the last 3,200 the interface shows.</li>
  <li>Run a local check and read the red items, not the whole list.</li>
  <li>Clear the dangerous posts before the first interview, not after a recruiter mentions them.</li>
</ol>
<p>None of this takes long. The point is timing: do it before applications go out, while you still control the narrative.</p>

<h2>The post types HR is most likely to see</h2>
<table>
  <thead>
    <tr><th>Type</th><th>Why it hurts</th><th>Action</th></tr>
  </thead>
  <tbody>
    <tr><td>Location posts</td><td>Reveals home or commute, real-world safety</td><td>Delete the specific post</td></tr>
    <tr><td>Named former employer</td><td>Looks like you badmouth bosses</td><td>Delete or redact</td></tr>
    <tr><td>Angry attacks</td><td>Signals hard to work with</td><td>Delete the worst</td></tr>
  </tbody>
</table>
<p>These three get screenshotted most often, and they shape a first impression before you walk in. Cleaning them is not about hiding who you are; it is about not letting a 2016 rant speak for 2026 you.</p>

<h2>Order: high-risk first, then vague</h2>
<p>Start with posts that locate you or name someone. Those are clear deletes. Then the vague ones: a complaint with no names, a hot take that aged badly. For these, ask one question: would I want this next to my name in an article? If the answer hesitates, delete.</p>
<p>A local check helps here because it scores the whole archive, including posts older than 3,200 that the interface hides. You cannot clean what you cannot see.</p>

<h2>Set guardrails after the clean</h2>
<p>Cleaning once is not a cure. The habits that keep the next job hunt short:</p>
<ul>
  <li>Think three times before posting a location.</li>
  <li>Never name your current employer in a complaint.</li>
  <li>Move genuinely sensitive topics to DMs.</li>
  <li>Run a check every six months so the pile stays small.</li>
</ul>
<p>You can also switch the account to followers-only, though that does not erase copies already indexed. The check is the part that reaches the old stuff.</p>

<h2>Where to start</h2>
<p>The clean is easier than it sounds. The check at <a href="/">digital-footprint-health.shop</a> runs on your device, scores the archive, and flags phone numbers, addresses, and locations for free. For deletion, pricing is per tweet and you can <a href="/pricing">pause or refund</a>. See <a href="/blog/which-tweets-to-clean-by-risk">how to rank tweets by risk</a> before you start clicking.</p>
    `.trim(),
    content: `
<p>你改好简历、写好求职信，却忘了 hiring manager 十秒就能读到的东西：你公开的 X。求职季正该做一次数字足迹大扫除，因为旧推文的代价，恰恰在你最想显得靠谱时最高。</p>

<h2>投简历前先做的三件事</h2>
<ol>
  <li>拉一份新归档，看的是真实历史，不是界面只给的最近 3200 条。</li>
  <li>本机跑一次体检，读标红的项，别读整张清单。</li>
  <li>第一轮面试前清掉危险推文，别等 recruiter 提起来才慌。</li>
</ol>
<p>都不费时。关键是时机：在简历发出去前做，故事还由你掌握。</p>

<h2>HR 最可能看到的几类旧推文</h2>
<table>
  <thead>
    <tr><th>类型</th><th>为什么减分</th><th>处理</th></tr>
  </thead>
  <tbody>
    <tr><td>定位推文</td><td>暴露住址/通勤，现实安全风险</td><td>删具体那条</td></tr>
    <tr><td>点名前公司</td><td>像在背后骂老板</td><td>删或打码</td></tr>
    <tr><td>情绪化攻击</td><td>显得难合作</td><td>删最狠的</td></tr>
  </tbody>
</table>
<p>这三类被截图最多，也在你进门之前就定了第一印象。清理它们不是藏起自己，是不让 2016 的吐槽替 2026 的你发言。</p>

<h2>清理顺序：先高危，再模糊</h2>
<p>先清暴露定位、点名别人的。这些明确该删。然后是模糊的：没点名的抱怨、老了很尬的锐评。判断标准只有一个：如果它出现在一篇写我的文章里挨着我名字，我会不会膈应？一犹豫，就删。</p>
<p>本机体检在这里有用，因为它给整份归档打分，包括界面藏起来的 3200 条之前的。看不见的，你清不掉。</p>

<h2>清理完，设护栏</h2>
<p>清一次不是根治。让下次求职变短的习惯：</p>
<ul>
  <li>发定位前三想。</li>
  <li>抱怨时绝不点名现公司。</li>
  <li>真敏感的话题挪到私信。</li>
  <li>每半年跑一次体检，堆别长大。</li>
</ul>
<p>也可以把账号改成"仅关注者可见"，不过那擦不掉已被收录的副本。能触达旧内容的是体检。</p>

<h2>关于 digital-footprint-health.shop</h2>
<p>digital-footprint-health.shop 是个 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位，给 0-100 健康评分。体检免费只读、不上传数据。想清理时删除按条计费，可 <a href="/pricing">暂停、退款</a>。开删前先看 <a href="/blog/which-tweets-to-clean-by-risk">按风险排序的清理指南</a>，或 <a href="/upload">免费跑一次体检</a> 摸底。</p>
    `.trim(),
  },
  {
    slug: 'recruiters-check-twitter',
    title: '面试官真的会翻你的 X 吗？数据说话',
    excerpt: '"招聘方会搜候选人社交账号"到底是都市传说还是真事？本文扒了公开的调研数据，看看不同行业、不同层级，背景调查到底查到哪一步，以及你能做的具体动作。',
    date: '2026-08-19',
    updatedAt: '2026-08-19',
    author: 'Digital Footprint Health Team',
    category: '行业与生态',
    tags: ['招聘', '背景调查', 'X 隐私', '求职'],
    canonical: '/blog/recruiters-check-twitter',
    faq: [
      { q: '招聘方真的会搜候选人的 X 吗？', a: '会，而且比例不低。多家公开的招聘调研显示，相当比例的雇主在筛人时会看公开社交资料；只是多数不会告诉你"我看过了"。把它当默认动作更稳。', qEn: 'Do recruiters really search candidates’ X?', aEn: 'Yes, and the share is not small. Several public hiring surveys show a meaningful portion of employers look at public social profiles during screening; most just do not tell you they did. Treat it as the default.' },
      { q: '他们主要看什么？', a: '三件事：你是什么样的人（ tone）、有没有暴露真实定位、有没有攻击性或歧视性内容。专业技能他们也看，但更常被"人设"先入为主。', qEn: 'What do they actually look at?', aEn: 'Three things: what kind of person you are (tone), whether you expose a real location, and whether there is aggressive or discriminatory content. They read skill too, but the persona often lands first.' },
      { q: '哪些行业查得最严？', a: '面向公众、合规重的行业更严：金融、法律、教育、医疗、政府相关。这些岗位一旦出舆情，成本极高，所以背景调查更深。', qEn: 'Which industries check hardest?', aEn: 'Public-facing and compliance-heavy fields check more: finance, law, education, healthcare, government-adjacent. One bad headline there is costly, so screening goes deeper.' },
      { q: '我能做哪几件具体的事？', a: '求职前拉归档、本机跑体检清标红、把账号设成关注者可见、以后发定位三思。花二十分钟，能少好几个不必要的减分项。', qEn: 'What concrete steps can I take?', aEn: 'Before applying, pull the archive, run a local check and clear red items, set the account to followers-only, and think before posting location. Twenty minutes removes several avoidable downsides.' },
    ],
    titleEn: 'Do Recruiters Really Check Your X? The Data',
    excerptEn: 'Is "employers screen candidates’ socials" an urban legend or real? This post digs into public survey data on how far background checks go by industry and level, plus what you can actually do.',
    categoryEn: 'Industry & Ecosystem',
    tagsEn: ['recruiting', 'background check', 'X privacy', 'job hunt'],
    contentEn: `
<p>"They will Google you" sounds like a parent's warning. It is also, according to hiring surveys, roughly true. The question is not whether some employers look, but how far they go and what they do with it. This post sticks to what the published data says and what you can do about it.</p>

<h2>What the surveys actually show</h2>
<p>Across several public hiring surveys, a meaningful share of employers report looking at candidates’ public social profiles during screening. The number moves by year and by country, but it has stayed well above zero for over a decade. The part people miss: most employers who look do not tell you they did. So the absence of "we checked your X" in an email means nothing.</p>
<p>The takeaway is not panic. It is to treat a public X as something a stranger with hiring power might read, because for a real share of roles, one will.</p>

<h2>What they look at</h2>
<ul>
  <li><strong>Tone and persona.</strong> Are you someone who attacks strangers, or who argues in good faith? This lands before your skills do.</li>
  <li><strong>Location exposure.</strong> Posts that reveal a home or commute are a safety and discretion signal.</li>
  <li><strong>Discriminatory or aggressive content.</strong> The fastest way to be screened out, across every survey.</li>
  <li><strong>Professional signal.</strong> Some read your posts for domain knowledge. But the persona read usually comes first.</li>
</ul>
<p>None of this requires them to be logged in. Public posts are public, and a search engine hands them over.</p>

<h2>Different industries, different depth</h2>
<table>
  <thead>
    <tr><th>Industry</th><th>How deep</th><th>Why</th></tr>
  </thead>
  <tbody>
    <tr><td>Finance, law</td><td>Deep</td><td>Compliance and reputation cost is high</td></tr>
    <tr><td>Education, healthcare</td><td>Deep</td><td>Trust with vulnerable groups</td></tr>
    <tr><td>Government-adjacent</td><td>Deep</td><td>Public scrutiny</td></tr>
    <tr><td>Tech, startups</td><td>Varies</td><td>Depends on team and role</td></tr>
  </tbody>
</table>
<p>If you are aiming at a public-facing or regulated role, assume the check is thorough. For others, it is still worth a twenty-minute pass.</p>

<h2>What you can do</h2>
<p>You cannot stop someone from searching. You can control what the search returns:</p>
<ol>
  <li>Pull a fresh archive before applications go out.</li>
  <li>Run a local check and clear the red items, the ones that locate or name people.</li>
  <li>Set the account to followers-only as a baseline, knowing it does not erase indexed copies.</li>
  <li>Change posting habits: no location, no naming employers, sensitive topics to DMs.</li>
</ol>
<p>The check at <a href="/">digital-footprint-health.shop</a> runs on your device, scores the archive, and flags phone numbers, addresses, and locations for free. Deletion is per tweet and <a href="/pricing">pauseable or refundable</a>. Start from <a href="/blog/job-search-cleanup">the job-hunt cleanup checklist</a> if you want the step-by-step.</p>
    `.trim(),
    content: `
<p>"他们会搜你"听起来像家长的唠叨。但看招聘调研，它基本是真的。问题不在"有没有雇主看"，而在"看多深、拿来怎么用"。这篇只讲公开数据说了什么，以及你能做什么。</p>

<h2>调研到底说了什么</h2>
<p>多家公开的招聘调研里，相当比例的雇主表示会在筛选时看候选人公开社交资料。数字逐年、逐国浮动，但十多年来一直明显大于零。大家忽略的是：多数看过的人不会告诉你"我看过了"。所以邮件里没写"我们查了你的 X"，什么也说明不了。</p>
<p>结论不是恐慌，是把"公开 X"当成"可能有招聘权的人会读"的东西——因为对真实比例的岗位，确实会有人读。</p>

<h2>他们看什么</h2>
<ul>
  <li><strong>语气和人设。</strong> 你是攻击陌生人的，还是好好讲道理的？这条比能力先入为主。</li>
  <li><strong>定位暴露。</strong> 写出家或通勤的，是安全和分寸的信号。</li>
  <li><strong>歧视或攻击性内容。</strong> 所有调研里最快被刷掉的一类。</li>
  <li><strong>专业信号。</strong> 有人也读你帖子看专业度，但人设阅读通常先到。</li>
</ul>
<p>这些都不需要他们登录。公开推文就是公开，搜索引擎直接递过去。</p>

<h2>不同行业，查的深度不同</h2>
<table>
  <thead>
    <tr><th>行业</th><th>查多深</th><th>为什么</th></tr>
  </thead>
  <tbody>
    <tr><td>金融、法律</td><td>深</td><td>合规和名誉成本高</td></tr>
    <tr><td>教育、医疗</td><td>深</td><td>面对弱势群体的信任</td></tr>
    <tr><td>政府相关</td><td>深</td><td>公众审视</td></tr>
    <tr><td>科技、创业</td><td>看情况</td><td>取决于团队和岗位</td></tr>
  </tbody>
</table>
<p>如果你冲着面向公众或受监管的岗位去，默认查得细。其他岗位，花二十分钟过一遍也值。</p>

<h2>你能做的几件事</h2>
<p>你拦不住别人搜，但能控制搜出来的是什么：</p>
<ol>
  <li>简历发出前拉一份新归档。</li>
  <li>本机跑体检，清标红项——那些暴露定位或点名别人的。</li>
  <li>账号设成关注者可见打底，记住它擦不掉已被收录的副本。</li>
  <li>改发帖习惯：不发定位、不点名雇主、敏感话题进私信。</li>
</ol>
<p><a href="/">digital-footprint-health.shop</a> 在本机跑体检，给归档打分，免费标出手机号、住址、定位。删除按条计费、可 <a href="/pricing">暂停或退款</a>。要步骤版看 <a href="/blog/job-search-cleanup">求职清理清单</a> 开头。</p>

<h2>关于 digital-footprint-health.shop</h2>
<p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机解析每一条推文，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。背景调查数据怎么解读，看 <a href="/blog/job-search-cleanup">求职清理清单</a>；风险标签含义看 <a href="/blog/risk-labels-explained">标签解读</a>。</p>
    `.trim(),
  },
  {
    slug: 'tweet-resurfaced-story',
    title: '一条 2014 年的旧推文被翻出来后，他做了什么',
    excerpt: '一位开发者的旧推文在多年后被翻出来，差点影响转正。他没有删号跑路，而是用一套方法把十年账号收拾干净。这个故事里没有说教，只有他后来每次清理都照做的清单。',
    date: '2026-08-19',
    updatedAt: '2026-08-19',
    author: 'Digital Footprint Health Team',
    category: '特辑与复盘',
    tags: ['旧推文', '翻车', '案例', '隐私清理'],
    canonical: '/blog/tweet-resurfaced-story',
    faq: [
      { q: '旧推文被翻出来，第一反应该是什么？', a: '先别删号。删号反而显得心虚，而且副本已在别处。先做两件事：确认它是否还在公开可见，以及它到底暴露了什么（定位？点名？情绪？），再决定清哪条。', qEn: 'What should my first reaction be when an old tweet resurfaces?', aEn: 'Do not delete the account. That looks guilty and copies already exist elsewhere. First confirm whether it is still public, and what it actually exposes (location, names, tone), then decide which post to remove.' },
      { q: '他后来每次清理都做哪几步？', a: '四步：拉归档、本机体检标红、先清暴露定位和点名的、再清情绪化攻击的；最后把账号设关注者可见并每半年复跑。清单固定，就不慌。', qEn: 'What steps does he now repeat every cleanup?', aEn: 'Four steps: pull the archive, run a local check for red items, clear location and name-drops first then angry attacks, then set the account to followers-only and re-run every six months. A fixed list keeps it calm.' },
      { q: '删了还会被人拿来截图吗？', a: '可能。已收录和已截图的副本不会因为删除消失。清理是止损，不是时光机；越早清，新扩散越少。', qEn: 'Will deleting stop people screenshotting it?', aEn: 'Maybe not. Indexed and screenshotted copies do not vanish when you delete. Cleanup is damage control, not a time machine; the earlier you clean, the less new spread.' },
      { q: '这个故事能照搬吗？', a: '方法能，细节不能。每个人的高风险点不同：有人是定位，有人是吐槽前司。先跑一次体检看自己的标红，再套他的清单。', qEn: 'Can I copy this story directly?', aEn: 'The method yes, the details no. Everyone’s risk points differ: location for some, former-employer rants for others. Run a check to see your own red items first, then apply his list.' },
    ],
    titleEn: 'After a 2014 Tweet Resurfaced: One Developer’s Story',
    excerptEn: 'A developer’s old tweet resurfaced years later and nearly cost a job offer. He did not delete and run. He built a method to clean a decade of account. No lecture here, just the checklist he now runs every time.',
    categoryEn: 'Specials & Recap',
    tagsEn: ['old tweet', 'backlash', 'case study', 'privacy cleanup'],
    contentEn: `
<p>A developer I know almost lost a job offer because of a tweet from 2014. Not a criminal thing, just a sloppy joke about a former employer that someone screenshotted and sent to the hiring manager. He did not panic-delete his account. He cleaned it properly, and the method he built is worth sharing without the moralising.</p>

<h2>How the tweet surfaced</h2>
<p>It was not a hack. An old school friend of the hiring manager remembered the joke, found it through search, and forwarded the screenshot. The post had been public for years and indexed by Google, so the screenshot was just the visible part. The lesson he took: anything public long enough will be found by someone with a reason.</p>
<p>His first move, wrongly, was to consider deleting the whole account. A friend talked him out of it. Deleting looks guilty, and copies already sat in inboxes and caches. He needed to remove the risky post, not disappear.</p>

<h2>What he did after</h2>
<p>He treated it like a bug report. Step one: get the full archive, because the interface only showed the last 3,200 and the bad joke was from 2014. Step two: read it locally and list what was actually risky, not what felt embarrassing. Step three: remove the location posts and name-drops first, then the angry ones. Step four: set the account to followers-only and re-run a check every six months.</p>
<p>The turnaround took an evening. The offer held. More useful than the offer was the checklist, which he now runs before every job change.</p>

<h2>His cleanup list, three years on</h2>
<ul>
  <li>Pull a fresh archive tied to any life event (new job, move, breakup).</li>
  <li>Run a local check; trust the red score over memory.</li>
  <li>Clear location and named people before anything else.</li>
  <li>Delete the angry attacks, keep the merely awkward.</li>
  <li>Switch to followers-only, then re-check every six months.</li>
</ul>
<p>Notice what is not on the list: wiping everything. He kept most of his archive. Cleanup for him means removing the few posts that could hurt, not erasing a decade.</p>

<h2>What you can take from it</h2>
<p>The method copies; the details do not. Your risk points are not his. Run one check on your own device and see your red items before borrowing his list. The check at <a href="/">digital-footprint-health.shop</a> is free, read-only, and scores phone numbers, addresses, and locations locally. Deletion is per tweet and <a href="/pricing">pauseable or refundable</a>. If a post already resurfaced, start from <a href="/blog/deleted-tweets-still-visible">why deleted ≠ gone</a> so you set the right expectation.</p>
    `.trim(),
    content: `
<p>我认识一位开发者，差点因为一条 2014 年的推文丢掉 offer。不是犯法，就是一条吐槽前司的糙玩笑，被人截图发给了 hiring manager。他没慌着删号跑路，而是正经清理了一遍。他后来攒下的方法，值得讲，不带说教。</p>

<h2>那条推文是怎么被翻出来的</h2>
<p>不是被黑。hiring manager 的一位老同学记得这个梗，搜出来把截图转了过去。那条推文公开多年、早被 Google 收录，截图不过是被看见的那部分。他得出的教训：公开够久的东西，总会被"有理由的人"翻到。</p>
<p>他第一反应，是错的——想直接删整个账号。朋友拦住了。删号显得心虚，而且副本早躺在别人收件箱和缓存里。他要的是移除那条危险的，不是人间蒸发。</p>

<h2>翻车之后他做了什么</h2>
<p>他把这事当 bug 处理。第一步：拿完整归档，因为界面只放最近 3200 条，而那个梗是 2014 的。第二步：本机读一遍，列出"真危险"的，不是"觉得尬"的。第三步：先删定位和点名的，再删情绪化攻击的。第四步：账号设关注者可见，每半年复跑一次体检。</p>
<p>来回一个晚上。offer 保住了。比 offer 更有用的是那份清单——现在每次换工作前他都跑。</p>

<h2>三年后，他的清理清单</h2>
<ul>
  <li>任何人生节点（新工作、搬家、分手）都拉一份新归档。</li>
  <li>本机跑体检，信标红分数，别信记忆。</li>
  <li>先清定位和点名别人的，再管别的。</li>
  <li>删情绪化攻击的，留只是尬的。</li>
  <li>转关注者可见，然后每半年复检。</li>
</ul>
<p>注意清单上没有"全删光"。他留了大部分归档。对他来说清理=移除那几条能伤人的，不是抹掉十年。</p>

<h2>你能从他身上学到什么</h2>
<p>方法能抄，细节不能。你的高风险点不是他的。先在自己本机跑一次体检，看自己的标红，再借他的清单。digital-footprint-health.shop 免费、只读，在本机给手机号、住址、定位打分。删除按条计费、可 <a href="/pricing">暂停或退款</a>。如果一条已经翻车，先看 <a href="/blog/deleted-tweets-still-visible">为什么"删了≠没了</a>，把预期摆正。</p>

<h2>关于 digital-footprint-health.shop</h2>
<p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。旧推文为何仍可见，看 <a href="/blog/deleted-tweets-still-visible">这篇</a>；想系统学清理，看 <a href="/blog/bulk-delete-old-tweets-walkthrough">批量删除流程</a>。</p>
    `.trim(),
  },
  {
    slug: 'sensitive-topic-detection',
    title: '敏感话题检测：体检标红的究竟是什么',
    excerpt: '数字足迹体检会把推文标红为"敏感话题"——但到底什么内容会触发？政治立场、性取向、医疗记录还是愤怒发泄？这篇拆解体检的规则逻辑与真实风险。',
    date: '2026-08-20',
    updatedAt: '2026-08-20',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['敏感话题', '体检规则', '标红', '风险分类'],
    canonical: '/blog/sensitive-topic-detection',
    faq: [
      { q: '体检怎么判断一条推文"敏感"？', a: '体检用关键词和模式匹配识别敏感内容，例如政治敏感词、医疗关键词、性相关词汇、极端观点标记等。这些标记是启发式的，不是最终判断——你的角色和上下文决定风险等级。', qEn: 'How does the check decide a tweet is "sensitive"?', aEn: 'The check uses keyword and pattern matching to flag sensitive content — political keywords, medical terms, sexually related words, extreme opinion markers, and more. These flags are heuristic, not final judgments; your role and context determine the real risk level.' },
      { q: '敏感话题标记等于高风险吗？', a: '不等于。敏感话题是中等风险标签，高于定位和邮箱，低于手机号和地址。真正决定是否删除，要看你的职业、行业和你未来是否可能换工作。', qEn: 'Does sensitive topic flag mean high risk?', aEn: 'Not necessarily. Sensitive topic is a medium-risk label — above location and email, below phone and address. Whether to delete depends on your profession, industry, and whether you might job-hop in the future.' },
      { q: '政治观点需要删吗？', a: '不一定。如果你的工作和政治立场无关，政治推文风险较低。如果你是公务员、教师或从事敏感行业，建议谨慎评估。', qEn: 'Should I delete political opinions?', aEn: 'Not always. If your work has nothing to do with political stance, political tweets carry lower risk. But if you are a civil servant, teacher, or work in a regulated industry, proceed with caution.' },
    ],
    titleEn: 'Sensitive Topic Detection: What the Check Actually Flags',
    excerptEn: 'The digital footprint check flags tweets as "sensitive topic" — but what exactly triggers that flag? Political stance, sexual orientation, medical records, or angry rants? This post breaks down the check rules and real risk.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['sensitive topic', 'check rules', 'red flag', 'risk classification'],
    contentEn: `<p>When you run a digital footprint check, some tweets get tagged with a red label: "sensitive topic." That sounds scary, but what does it actually mean? And more importantly — should you delete them?</p>
<h2>How sensitive topic detection works</h2>
<p>The check uses a combination of keyword matching and pattern heuristics. Here are the main categories it looks for:</p>
<ul>
  <li><strong>Political keywords</strong> — party names, political figures, protest-related terms.</li>
  <li><strong>Medical/mental health</strong> — drug names, therapy references, diagnosis terms.</li>
  <li><strong>Sexual content</strong> — explicit language, dating app references, adult service mentions.</li>
  <li><strong>Extreme opinions</strong> — hate speech markers, radical political statements, harassment threats.</li>
  <li><strong>Religious controversy</strong> — proselytizing, blasphemy markers, religious conflict terms.</li>
</ul>
<p>These are <strong>heuristic flags</strong>, not legal or HR judgments. The check is a scanner, not a judge.</p>
<h2>Are sensitive-topic tweets high risk?</h2>
<p>Not automatically. Risk depends on context:</p>
<ul>
  <li><strong>High risk</strong> — You are a civil servant, teacher, doctor, or work in a regulated industry. Sensitive tweets here could cost you your job.</li>
  <li><strong>Medium risk</strong> — You work in tech or creative industries. Some political/medical content is normal; extreme or harassing content is not.</li>
  <li><strong>Low risk</strong> — You work remotely or in a field where online opinion is irrelevant. A 2016 political rant is unlikely to matter.</li>
</ul>
<h2>What to do with flagged tweets</h2>
<ol>
  <li><strong>Read the context</strong> — Was it a joke? A vent? A genuine opinion? Context matters for the risk assessment.</li>
  <li><strong>Check the audience</strong> — Was the tweet public? Retweeted? Screenshotted? The more visible, the higher the risk.</li>
  <li><strong>Consider your future</strong> — Will you apply for a job that does background checks in the next 2-3 years?</li>
  <li><strong>Decide per tweet</strong> — Don't bulk-delete all sensitive tweets. Evaluate each one individually.</li>
</ol>
<h2>Bottom line</h2>
<p>Sensitive-topic flags are warning lights, not stop signs. Run your check, review the red items, and decide based on your real-world context — not panic.</p>`,
    content: `<p>跑数字足迹体检时，有些推文会被标红为「敏感话题」。看着吓人，但它到底是什么意思？你真的需要删吗？</p>
<h2>敏感话题是怎么检测的</h2>
<p>体检用关键词匹配和模式启发式规则来标记敏感内容，主要有这几类：</p>
<ul>
  <li><strong>政治关键词</strong> — 政党名、政治人物、抗议相关词汇。</li>
  <li><strong>医疗/心理健康</strong> — 药品名、心理咨询、诊断术语。</li>
  <li><strong>性相关</strong> — 露骨用语、交友软件、成人服务提及。</li>
  <li><strong>极端言论</strong> — 仇恨言论标记、激进政治观点、骚扰威胁。</li>
  <li><strong>宗教争议</strong> — 传教言论、亵渎标记、宗教冲突词。</li>
</ul>
<p>这些都是<span style="color: red;">启发式标记</span>，不是法律或 HR 的判断。体检是扫描仪，不是法官。</p>
<h2>敏感话题推文风险高吗？</h2>
<p>不一定，要看上下文：</p>
<ul>
  <li><strong>高风险</strong> — 你是公务员、教师、医生，或在受监管行业工作。敏感推文可能让你丢工作。</li>
  <li><strong>中等风险</strong> — 你在科技或创意行业。一些政治/医疗内容很正常，但极端或骚扰内容不是。</li>
  <li><strong>低风险</strong> — 你远程办公，或所在行业与网络观点无关。2016 年的政治吐槽不太可能有问题。</li>
</ul>
<h2>怎么处理被标记的推文</h2>
<ol>
  <li><strong>看上下文</strong> — 是玩笑？发泄？真实观点？上下文决定风险等级。</li>
  <li><strong>看传播范围</strong> — 公开推文？被转发了吗？被截图了吗？越公开，风险越高。</li>
  <li><strong>想未来</strong> — 未来 2-3 年要不要换工作？会不会过背景调查？</li>
  <li><strong>逐条判断</strong> — 别批量删所有敏感推文，每条单独评估。</li>
</ol>
<h2>结论</h2>
<p>敏感话题标记是警示灯，不是停止令。跑体检，看标红，按你的现实情况做判断——别慌。</p>
<h2>关于 digital-footprint-health.shop</h2>
<p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。</p>`,
  },
  {
    slug: 'underage-tweets',
    title: '未成年人时期的推文：法律与平台规则',
    excerpt: '很多人注册 X 时还不到 13 岁。那些童年推文现在还在吗？平台政策怎么规定？法律上会有什么后果？这篇讲清楚未成年人推文的真实情况。',
    date: '2026-08-20',
    updatedAt: '2026-08-20',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['未成年', 'COPPA', '旧推文', '平台规则'],
    canonical: '/blog/underage-tweets',
    faq: [
      { q: '我在 X 上发的童年推文，现在还能看到吗？', a: '通常可以。X 不会因为你长大了就自动删除你未成年时发的推文。只要账号还在、推文没被删，它们就一直在那里。', qEn: 'Can I still see tweets I posted as a child on X?', aEn: 'Usually yes. X won\'t auto-delete your childhood tweets just because you\'re older now. As long as the account exists and the tweets weren\'t deleted, they remain.' },
      { q: 'COPPA 对我的旧推文有什么影响？', a: 'COPPA（儿童在线隐私保护法）主要约束网站收集儿童信息，但不要求删除历史内容。你未成年时发的推文，法律上不属于"儿童数据"，除非涉及身份盗窃风险。', qEn: 'What does COPPA say about my old tweets?', aEn: 'COPPA (Children\'s Online Privacy Protection Act) mainly restricts websites from collecting children\'s data — it does not require deleting historical content. Tweets you posted as a minor are not "children\'s data" under the law, unless they pose identity theft risk.' },
      { q: '如果我的童年推文涉及不良内容，我应该删吗？', a: '如果内容涉及违法、骚扰、或可能影响未来升学/就业，建议删除。如果是无害的童年趣事，可以保留。', qEn: 'Should I delete childhood tweets if they contain inappropriate content?', aEn: 'If the content involves illegal activity, harassment, or could affect future education/employment, delete it. If it\'s innocent childhood fun, you can keep it.' },
    ],
    titleEn: 'Tweets from Your Teens: Platform Rules and Legal Reality',
    excerptEn: 'Many people signed up for X before turning 13. Are those childhood tweets still there? What does the platform policy say? What are the legal implications? This post clarifies the reality of underage tweets.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['underage', 'COPPA', 'old tweets', 'platform policy'],
    contentEn: `<p>You probably started using X (formerly Twitter) as a teenager — or maybe even earlier. Those childhood and teen tweets are still there. Should you worry about them?</p>
<h2>Are your old tweets still accessible?</h2>
<p>Yes. X does not automatically delete tweets just because you've aged out of the "underage" category. If the account exists and the tweets weren\'t manually deleted, they remain publicly visible (unless you changed the account to private).</p>
<h2>What does COPPA say?</h2>
<p>COPPA (Children's Online Privacy Protection Act) is a US law that restricts how websites collect data from children under 13. Key points:</p>
<ul>
  <li>COPPA requires parental consent for children under 13 to use most online services.</li>
  <li>However, COPPA does <strong>not</strong> require websites to delete historical content posted by users who were underage.</li>
  <li>Your childhood tweets are not classified as "children's personal information" under COPPA — they're just old tweets.</li>
</ul>
<h2>When should you delete underage tweets?</h2>
<p>Consider deleting tweets from your childhood/teens if they:</p>
<ul>
  <li>Contain illegal content or admissions.</li>
  <li>Harass or bully others.</li>
  <li>Reveal your childhood address, school, or daily routine.</li>
  <li>Could be used against you in future background checks.</li>
</ul>
<p>Innocent childhood posts — funny memes, gaming screenshots, fan art — are generally fine to keep.</p>
<h2>Bottom line</h2>
<p>Your teenage tweets are not "illegal data" — but they are part of your digital footprint. Evaluate them like any other old tweet: what's the risk? Who could see it? Does it matter to your future?</p>`,
    content: `<p>你可能十几岁就注册了 X（原 Twitter），甚至更早。那些童年和青少年时期的推文现在还在吗？需要担心吗？</p>
<h2>你的旧推文还在吗？</h2>
<p>在。X 不会因为你长大了就自动删除未成年时发的推文。只要账号还在、推文没被删，它们就还在（除非你设成了私密账号）。</p>
<h2>COPPA 怎么说？</h2>
<p>COPPA（儿童在线隐私保护法）是美国法律，限制网站收集 13 岁以下儿童的数据。要点：</p>
<ul>
  <li>COPPA 要求父母同意才能让 13 岁以下儿童使用大多数在线服务。</li>
  <li>但 COPPA <strong>不要求</strong> 网站删除用户未成年时发布的历史内容。</li>
  <li>你童年的推文在法律上不属于"COPPA 保护的儿童个人数据"——它们只是旧推文。</li>
</ul>
<h2>什么时候应该删未成年推文？</h2>
<p>如果你的童年/青少年推文包含以下内容，建议删除：</p>
<ul>
  <li>违法内容或认罪发言。</li>
  <li>骚扰或霸凌他人。</li>
  <li>暴露了童年住址、学校或日常行程。</li>
  <li>可能在未来背景调查中被用作负面证据。</li>
</ul>
<p>无害的童年趣事——搞笑梗图、游戏截图、同人图——一般可以保留。</p>
<h2>结论</h2>
<p>你的青少年推文不是"非法数据"——但它们是数字足迹的一部分。像评估任何其他旧推文一样评估它们：风险是什么？谁能看到？对你未来有影响吗？</p>
<h2>关于 digital-footprint-health.shop</h2>
<p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。</p>`,
  },
  {
    slug: 'breakup-tweet-cleanup',
    title: '前任考古学：分手后的推文清理指南',
    excerpt: '分手后翻看旧推文，发现满屏都是对方。那些公开的甜蜜、争吵、甚至诅咒，现在都成了尴尬回忆。这篇教你系统清理情感账号。',
    date: '2026-08-20',
    updatedAt: '2026-08-20',
    author: 'Digital Footprint Health Team',
    category: '生活场景',
    tags: ['分手', '情感账号', '旧推文', '清理指南'],
    canonical: '/blog/breakup-tweet-cleanup',
    faq: [
      { q: '分手后要不要清空整个账号？', a: '不建议。清空账号显得心虚，而且副本已在别处。建议按风险等级逐条清理：先删暴露定位和点名的，再删情绪化攻击的，最后处理甜蜜内容。', qEn: 'Should I delete my entire account after a breakup?', aEn: 'Not recommended. Emptying your account looks guilty, and copies already exist elsewhere. Clean by risk level: first delete location-and-name-drops, then emotional attacks, then handle sweet content last.' },
      { q: '那些甜蜜的推文会影响我新的感情吗？', a: '有可能。新伴侣可能会搜索你的社交媒体历史。建议清理公开的亲密内容，特别是带定位和照片的。', qEn: 'Will sweet tweets affect my new relationship?', aEn: 'Possibly. A new partner might search your social media history. Clear public intimate content, especially posts with locations and photos.' },
      { q: '分手后改头像和昵称有必要吗？', a: '看情况。如果旧头像/昵称是和前任相关的，建议改掉。这不是隐私问题，是心理边界问题。', qEn: 'Should I change my profile after a breakup?', aEn: 'Depends. If your old avatar/bio was related to your ex, change it. It\'s not a privacy issue — it\'s a psychological boundary issue.' },
    ],
    titleEn: 'Ex-Archaeology: Tweet Cleanup After a Breakup',
    excerptEn: 'After a breakup, you scroll through old tweets and find the timeline full of your ex. Those public sweet moments, arguments, and even curses are now awkward memories. This guide shows you how to systematically clean your emotional account.',
    categoryEn: 'Life Scenarios',
    tagsEn: ['breakup', 'emotional account', 'old tweets', 'cleanup guide'],
    contentEn: `<p>A breakup is emotionally draining. The last thing you want is to scroll through your tweet history and find 500 posts about your ex. But cleaning up an emotional account requires strategy — not panic-deleting everything.</p>
<h2>Why not delete everything?</h2>
<p>Emptying your account sends a signal. It looks like you're hiding something, and copies of your tweets likely already exist in screenshots, archives, and retweets. A systematic cleanup is more effective than a scorched-earth approach.</p>
<h2>The cleanup priority order</h2>
<ol>
  <li><strong>High risk first</strong> — Posts that reveal your home address, workplace, or daily routine. These are safety risks regardless of the breakup.</li>
  <li><strong>Named people</strong> — Tweets that tag or mention your ex publicly. These can be embarrassing for both parties.</li>
  <li><strong>Emotional attacks</strong> — Angry rants, curses, or public arguments. These look bad to future employers or partners.</li>
  <li><strong>Sweet content</strong> — Public declarations of love, couple photos, intimate moments. These might resurface in awkward contexts.</li>
  <li><strong>Inside jokes</strong> — References only your ex would understand. Low risk, but clearing them helps you move on.</li>
</ol>
<h2>Tools for cleanup</h2>
<ul>
  <li><strong>Download your X archive</strong> — This gives you a complete local copy to review without triggering notifications.</li>
  <li><strong>Use a local check tool</strong> — Run a digital footprint check to identify high-risk posts automatically.</li>
  <li><strong>Bulk delete carefully</strong> — Delete in batches; don't rush. Each deletion is permanent.</li>
</ul>
<h2>When to stop</h2>
<p>Not everything needs to go. Some tweets are just history — funny, harmless, or personally meaningful. Ask yourself: "Would this embarrass me in a job interview?" If the answer is no, keep it.</p>
<h2>Bottom line</h2>
<p>Clean your emotional account like an archaeologist — carefully, layer by layer. Prioritize safety and reputation, not regret. Your future self will thank you.</p>`,
    content: `<p>分手已经很煎熬了。最后还想看到时间线上满是前任的推文？但清理情感账号需要策略——不是 panic-delete 一切。</p>
<h2>为什么不建议清空整个账号</h2>
<p>清空账号会释放信号。看起来像心虚，而且你的推文副本很可能已经存在于截图、归档和转发中。系统清理比焦土政策更有效。</p>
<h2>清理优先级</h2>
<ol>
  <li><strong>高风险优先</strong> — 暴露你家地址、工作场所或日常行程的推文。无论分手与否，这些都是安全风险。</li>
  <li><strong>点名的人</strong> — 公开 tag 或提及前任的推文。对双方都可能尴尬。</li>
  <li><strong>情绪化攻击</strong> — 愤怒发泄、诅咒、公开争吵。对未来雇主或新伴侣都不好看。</li>
  <li><strong>甜蜜内容</strong> — 公开的爱的宣言、情侣照片、亲密时刻。可能在尴尬的上下文中重新出现。</li>
  <li><strong>内部笑话</strong> — 只有前任能懂的梗。风险低，但清理它们有助于你放下。</li>
</ol>
<h2>清理工具</h2>
<ul>
  <li><strong>下载 X 归档</strong> — 给你完整的本地副本，无需触发通知即可查看。</li>
  <li><strong>使用本地体检工具</strong> — 跑一次数字足迹体检，自动识别高风险推文。</li>
  <li><strong>批量删除需谨慎</strong> — 分批删除，不要急。每条删除都是永久的。</li>
</ul>
<h2>什么时候该停</h2>
<p>不是所有内容都需要删。有些推文只是历史——有趣的、无害的、或个人有意义的。问自己："这会让我在求职面试中尴尬吗？" 如果不会，保留。</p>
<h2>结论</h2>
<p>像考古学家一样清理情感账号——小心，一层一层来。优先安全与声誉，而非遗憾。未来的你会感谢现在的你。</p>
<h2>关于 digital-footprint-health.shop</h2>
<p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。</p>`,
  },
  {
    slug: 'erase-digital-past',
    title: '转行必看：把过去的自己从网上"抹掉"的边界',
    excerpt: '想转行、换赛道、重新开始？你可能想把过去的推文"抹掉"。但数字痕迹真的能被抹掉吗？本文讲清"抹掉"的真相与可行方法。',
    date: '2026-08-20',
    updatedAt: '2026-08-20',
    author: 'Digital Footprint Health Team',
    category: '职业规划',
    tags: ['转行', '数字痕迹', '抹掉过去', '职业重启'],
    canonical: '/blog/erase-digital-past',
    faq: [
      { q: '我能完全"抹掉"过去的推文吗？', a: '不能。删除推文后，副本可能已存在于搜索引擎缓存、截图、第三方归档中。你能做的是"止损"——移除仍在公开可见的高风险内容。', qEn: 'Can I completely erase my old tweets?', aEn: 'No. After deletion, copies may already exist in search engine caches, screenshots, and third-party archives. What you can do is "damage control" — remove high-risk content that is still publicly visible.' },
      { q: '换工作后，新雇主会搜索我的旧推文吗？', a: '有可能，特别是大公司或敏感行业。建议在投递简历前，先跑一次数字足迹体检，清除高风险推文。', qEn: 'Will a new employer search my old tweets?', aEn: 'Possibly, especially at large companies or in regulated industries. Run a digital footprint check before submitting applications, and clear high-risk tweets.' },
      { q: '换账号能解决问题吗？', a: '不能。新账号的数字足迹同样会被扫描。关键是清理内容，不是更换容器。', qEn: 'Will creating a new account solve the problem?', aEn: 'No. A new account\'s digital footprint will also be scanned. The key is cleaning content, not changing containers.' },
    ],
    titleEn: 'Career Change? The Truth About "Erasing" Your Digital Past',
    excerptEn: 'Want to switch careers, change tracks, start fresh? You might want to "erase" your old tweets. But can digital traces really be erased? This post explains the truth and practical methods.',
    categoryEn: 'Career Planning',
    tagsEn: ['career change', 'digital trace', 'erase past', 'career restart'],
    contentEn: `<p>You're changing careers. Maybe you're pivoting from finance to tech, from marketing to education, or just leaving an industry that no longer fits. One thought keeps coming back: "I need to erase my past tweets."</p>
<h2>The hard truth: you can't erase, only contain</h2>
<p>When you delete a tweet, the content disappears from X's interface — but not from the internet. Copies may exist in:</p>
<ul>
  <li>Search engine caches (Google, Bing)</li>
  <li>Screenshots taken by other users</li>
  <li>Third-party archive services</li>
  <li>Wayback Machine and similar tools</li>
</ul>
<p><strong>Deletion is damage control, not a time machine.</strong></p>
<h2>What you should actually do</h2>
<ol>
  <li><strong>Run a digital footprint check</strong> — Download your X archive and run a local check to identify high-risk tweets (phone numbers, addresses, sensitive topics).</li>
  <li><strong>Prioritize deletion</strong> — Delete tweets that expose contact info or location first. These are the highest risk for identity theft and real-world safety.</li>
  <li><strong>Review sensitive content</strong> — Evaluate each sensitive tweet in the context of your new career. Would a hiring manager in your new field find this problematic?</li>
  <li><strong>Set account to private</strong> — Switch to followers-only to prevent new scans of your timeline.</li>
  <li><strong>Monitor periodically</strong> — Re-run checks every 6-12 months, especially before major career moves.</li>
</ol>
<h2>What not to do</h2>
<ul>
  <li><strong>Don't create a new account</strong> — A new account has its own footprint. Cleaning content is more effective than changing containers.</li>
  <li><strong>Don't panic-delete everything</strong> — Blanket deletion looks suspicious. Be strategic.</li>
  <li><strong>Don't assume deletion = gone</strong> — Set the right expectation: you\'re reducing risk, not achieving digital amnesia.</li>
</ul>
<h2>Bottom line</h2>
<p>You can't erase your past, but you can control how much of it is visible. Run a check, clean strategically, and move forward with confidence.</p>`,
    content: `<p>你要转行了。从金融转到科技，从营销转到教育，或者只是离开一个不再适合的行业。一个念头反复出现："我需要抹掉过去的推文。"</p>
<h2>残酷真相：不能抹掉，只能控制</h2>
<p>当你删除推文，内容从 X 界面消失——但不会从互联网消失。副本可能存在于：</p>
<ul>
  <li>搜索引擎缓存（Google、Bing）</li>
  <li>其他用户截的图</li>
  <li>第三方归档服务</li>
  <li>Wayback Machine 等工具</li>
</ul>
<p><strong>删除是止损，不是时光机。</strong></p>
<h2>你应该做什么</h2>
<ol>
  <li><strong>跑一次数字足迹体检</strong> — 下载 X 归档，本机体检识别高风险推文（手机号、地址、敏感话题）。</li>
  <li><strong>优先删除</strong> — 先删暴露联系方式或定位的推文。这些对身份盗窃和现实安全风险最高。</li>
  <li><strong>审查敏感内容</strong> — 结合新职业语境评估每条敏感推文。新领域的 hiring manager 会觉得有问题吗？</li>
  <li><strong>设私密账号</strong> — 转为关注者可见，防止新的扫描。</li>
  <li><strong>定期监控</strong> — 每 6-12 个月复跑体检，特别是重大职业变动前。</li>
</ol>
<h2>不要做什么</h2>
<ul>
  <li><strong>别注册新账号</strong> — 新账号有自己的足迹。清理内容比换容器更有效。</li>
  <li><strong>别 panic-delete 一切</strong> — 批量删除显得可疑。要有策略。</li>
  <li><strong>别以为删除=消失</strong> — 摆正预期：你在降低风险，不是实现数字失忆。</li>
</ul>
<h2>结论</h2>
<p>你不能抹掉过去，但你能控制多少过去是可见的。跑体检，战略性清理，自信地向前。</p>
<h2>关于 digital-footprint-health.shop</h2>
<p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。</p>`,
  },
  {
    slug: 'sensitive-industry-tweets',
    title: '敏感行业从业者的推文生存指南',
    excerpt: '公务员、教师、医生、律师、记者……你的职业决定了你的推文风险等级。这篇为敏感行业从业者提供推文管理生存指南。',
    date: '2026-08-20',
    updatedAt: '2026-08-20',
    author: 'Digital Footprint Health Team',
    category: '职业指南',
    tags: ['敏感行业', '公务员', '教师', '推文管理'],
    canonical: '/blog/sensitive-industry-tweets',
    faq: [
      { q: '我是公务员，需要担心推文吗？', a: '需要。公务员的公共形象受严格约束，旧推文可能被竞争对手或媒体翻出。建议定期体检，清除高风险内容。', qEn: 'I\'m a civil servant — should I worry about tweets?', aEn: 'Yes. Civil servants\' public image is strictly regulated; old tweets can be dug up by opponents or media. Run regular checks and clear high-risk content.' },
      { q: '教师发推文有什么限制？', a: '教师属于公众人物，学生/家长/学校可能搜索你的社交媒体。避免发布政治极端言论、不当幽默、或与职业形象冲突的内容。', qEn: 'What are the restrictions for teachers posting tweets?', aEn: 'Teachers are public figures; students/parents/schools may search your social media. Avoid extreme political speech, inappropriate humor, or content that conflicts with your professional image.' },
      { q: '医生/律师有额外的职业伦理要求吗？', a: '有。医疗和法律服务受职业伦理约束，公开讨论病例或案件可能违反保密义务。建议谨慎发布任何与职业相关的内容。', qEn: 'Do doctors/lawyers have extra ethical requirements?', aEn: 'Yes. Medical and legal services are bound by professional ethics; discussing cases publicly may violate confidentiality. Be cautious about any profession-related content.' },
    ],
    titleEn: 'Tweet Survival Guide for Sensitive Industry Professionals',
    excerptEn: 'Civil servants, teachers, doctors, lawyers, journalists — your profession determines your tweet risk level. This guide provides tweet management survival tips for sensitive industry professionals.',
    categoryEn: 'Career Guide',
    tagsEn: ['sensitive industry', 'civil servant', 'teacher', 'tweet management'],
    contentEn: `<p>If you work in a sensitive industry — government, education, healthcare, law, journalism — your tweets carry more weight than the average user's. A single post can resurface at the worst moment: promotion review, licensing audit, media inquiry.</p>
<h2>Why your tweets matter more</h2>
<ul>
  <li><strong>Public trust</strong> — Your profession requires public confidence. Controversial tweets erode that trust.</li>
  <li><strong>Professional ethics</strong> — Many professions have codes of conduct that extend to online behavior.</li>
  <li><strong>Background checks</strong> — Sensitive industries often require enhanced screening, including social media review.</li>
  <li><strong>Media scrutiny</strong> — Journalists and public figures are routinely searched before interviews or assignments.</li>
</ul>
<h2>High-risk content categories</h2>
<ol>
  <li><strong>Political extremism</strong> — Radical views, even if expressed humorously, can damage credibility.</li>
  <li><strong>Confidential information</strong> — Disclosing case details, patient info, or government secrets is illegal.</li>
  <li><strong>Inappropriate humor</strong> — Jokes about sensitive topics (race, gender, trauma) can trigger HR complaints.</li>
  <li><strong>Conflict with colleagues</strong> — Public arguments with clients, patients, or students violate professional standards.</li>
  <li><strong>Financial impropriety</strong> — Comments about insider trading, bribery, or corruption are career-ending.</li>
</ol>
<h2>Practical steps</h2>
<ul>
  <li><strong>Run regular checks</strong> — Quarterly digital footprint scans to catch new risks.</li>
  <li><strong>Set account to private</strong> — Limit visibility to trusted contacts only.</li>
  <li><strong>Delete strategically</strong> — Remove high-risk content; keep harmless posts.</li>
  <li><strong>Avoid real-time posting</strong> — Draft tweets, wait 24 hours, then post. Reduces impulsive errors.</li>
  <li><strong>Use a professional handle</strong> — Separate personal and professional accounts if possible.</li>
</ul>
<h2>Bottom line</h2>
<p>In sensitive industries, your digital footprint is part of your professional reputation. Treat it with the same care you'd give your CV or portfolio.</p>`,
    content: `<p>如果你在敏感行业工作——政府、教育、医疗、法律、新闻——你的推文比普通人承载更多重量。一条推文可能在最糟的时刻被翻出：晋升审查、执照审计、媒体调查。</p>
<h2>为什么你的推文更重要</h2>
<ul>
  <li><strong>公众信任</strong> — 你的职业需要公众信心。争议性推文会侵蚀信任。</li>
  <li><strong>职业伦理</strong> — 许多行业有延伸至线上行为的职业道德准则。</li>
  <li><strong>背景调查</strong> — 敏感行业通常需要强化筛查，包括社交媒体审查。</li>
  <li><strong>媒体 scrutiny</strong> — 记者和公众人物在接受采访或任务前 routinely 被搜索。</li>
</ul>
<h2>高风险内容类别</h2>
<ol>
  <li><strong>政治极端</strong> — 激进观点，即使是幽默表达，也可能损害可信度。</li>
  <li><strong>机密信息</strong> — 披露案件细节、患者信息或政府机密是非法的。</li>
  <li><strong>不当幽默</strong> — 关于敏感话题（种族、性别、创伤）的玩笑可能触发 HR 投诉。</li>
  <li><strong>与同事冲突</strong> — 与客户、患者或学生的公开争吵违反职业标准。</li>
  <li><strong>财务不当</strong> — 关于内幕交易、贿赂或腐败的评论是职业生涯终结者。</li>
</ol>
<h2>实用步骤</h2>
<ul>
  <li><strong>定期体检</strong> — 每季度数字足迹扫描，发现新风险。</li>
  <li><strong>设私密账号</strong> — 限制可见性仅对信任联系人。</li>
  <li><strong>战略性删除</strong> — 移除高风险内容；保留无害帖子。</li>
  <li><strong>避免即时发布</strong> — 草稿推文，等 24 小时后再发。减少冲动错误。</li>
  <li><strong>使用专业账号</strong> — 尽可能分离个人和专业账号。</li>
</ul>
<h2>结论</h2>
<p>在敏感行业，你的数字足迹是你职业声誉的一部分。像对待你的简历或作品集一样对待它。</p>
<h2>关于 digital-footprint-health.shop</h2>
<p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。</p>`,
  },

  {
    slug: 'tweetdelete-vs-dfh',
    title: '对比 TweetDelete：哪个更懂你要什么',
    excerpt: 'TweetDelete 是最流行的推文删除工具之一。但它真的解决了你的问题——还是只是删除推文就完了？',
    date: '2026-08-21',
    updatedAt: '2026-08-21',
    author: 'Digital Footprint Health Team',
    category: '竞品对比',
    tags: ['tweetdelete', 'comparison', 'tweet deletion tools'],
    canonical: '/blog/tweetdelete-vs-dfh',
    faq: [
      { q: 'TweetDelete 和 digital-footprint-health 有什么区别？', a: 'TweetDelete 注重速度，digital-footprint-health 注重理解。前者快速删除，后者先分析隐私风险再删除。', qEn: 'What is the difference between TweetDelete and digital-footprint-health?', aEn: 'TweetDelete focuses on speed, digital-footprint-health focuses on understanding. The former deletes fast, the latter analyzes privacy risks before deletion.' },
      { q: '我应该选择哪个？', a: '如果你只想快速删除，TweetDelete 够用。如果你关心隐私和风险控制，选择 digital-footprint-health。', qEn: 'Which should I choose?', aEn: 'If you just want fast deletion, TweetDelete works. If you care about privacy and risk control, choose digital-footprint-health.' },
    ],
    titleEn: 'TweetDelete vs digital-footprint-health: Which One Actually Gets It?',
    excerptEn: 'TweetDelete is one of the most popular tweet deletion tools. But does it actually solve your problem — or just delete tweets and move on?',
    categoryEn: 'Comparison',
    tagsEn: ['tweetdelete', 'comparison', 'tweet deletion tools'],
    contentEn: '<p>You have probably heard of TweetDelete. It is one of the most popular tweet deletion tools. But does it actually solve your problem — or just delete tweets and move on?</p><h2>The Core Difference</h2><p><strong>TweetDelete</strong> focuses on speed. Delete tweets fast, in bulk. It is great if you just want to remove content quickly.</p><p><strong>digital-footprint-health</strong> focuses on understanding. Before you delete anything, we help you understand what is in your archive — phone numbers, locations, sensitive topics — and let you decide what matters.</p><h2>Comparison Table</h2><table><tr><th>Feature</th><th>TweetDelete</th><th>digital-footprint-health</th></tr><tr><td>Bulk deletion</td><td>Yes</td><td>Yes</td></tr><tr><td>Privacy scan</td><td>No</td><td>Yes</td></tr><tr><td>Health score</td><td>No</td><td>0-100</td></tr><tr><td>Pause/Resume</td><td>No</td><td>Yes</td></tr><tr><td>On-device processing</td><td>No</td><td>Yes</td></tr></table><h2>Bottom Line</h2><p>TweetDelete is a tool. digital-footprint-health is a system. If you just want to delete tweets, either works. If you want to understand and control your digital presence, we are the better choice.</p>',
    content: '<p>你可能听说过 TweetDelete。它是最流行的推文删除工具之一。但它真的解决了你的问题——还是只是删除推文就完了？</p><h2>核心区别</h2><p><strong>TweetDelete</strong> 注重速度。快速批量删除推文。如果你只想快速移除内容，它很棒。</p><p><strong>digital-footprint-health</strong> 注重理解。在你删除任何东西之前，我们帮助你理解归档中有什么——手机号、位置、敏感话题——并让你决定什么重要。</p><h2>对比表</h2><table><tr><th>功能</th><th>TweetDelete</th><th>digital-footprint-health</th></tr><tr><td>批量删除</td><td>有</td><td>有</td></tr><tr><td>隐私扫描</td><td>无</td><td>有</td></tr><tr><td>健康评分</td><td>无</td><td>0-100</td></tr><tr><td>暂停/恢复</td><td>无</td><td>有</td></tr><tr><td>本机处理</td><td>无</td><td>有</td></tr></table><h2>结论</h2><p>TweetDelete 是工具。digital-footprint-health 是系统。如果你只想删除推文，两者都可以。如果你想理解并控制你的数字存在，我们是很好的选择。</p><h2>关于 digital-footprint-health.shop</h2><p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。</p>',
  },
  {
    slug: 'x-cleaner-vs-dfh',
    title: '对比 X Cleaner：本机解析 vs 浏览器插件',
    excerpt: 'X Cleaner 是浏览器插件，帮助你删除推文。它很方便但有局限性。让我们与 digital-footprint-health 进行比较。',
    date: '2026-08-21',
    updatedAt: '2026-08-21',
    author: 'Digital Footprint Health Team',
    category: '竞品对比',
    tags: ['x-cleaner', 'comparison', 'browser extension'],
    canonical: '/blog/x-cleaner-vs-dfh',
    faq: [
      { q: 'X Cleaner 和 digital-footprint-health 有什么区别？', a: 'X Cleaner 在浏览器中运行，需要 X 会话 cookie。digital-footprint-health 在本机处理，不需要 cookie。', qEn: 'What is the difference between X Cleaner and digital-footprint-health?', aEn: 'X Cleaner runs in the browser and needs X session cookies. digital-footprint-health processes locally and needs no cookies.' },
      { q: '哪个更安全？', a: 'digital-footprint-health 更安全，因为数据从不离开你的机器。', qEn: 'Which is safer?', aEn: 'digital-footprint-health is safer because data never leaves your machine.' },
    ],
    titleEn: 'X Cleaner vs digital-footprint-health: On-Device vs Browser Extension',
    excerptEn: 'X Cleaner is a browser extension that helps you delete tweets. It is convenient but has limitations. Let us compare it with digital-footprint-health.',
    categoryEn: 'Comparison',
    tagsEn: ['x-cleaner', 'comparison', 'browser extension'],
    contentEn: '<p>X Cleaner runs in your browser. It needs your X session cookies to work. This means your X session data passes through the extension.</p><p>digital-footprint-health processes your data on your device. You upload your X archive, and everything happens locally. Your data never leaves your computer.</p><h2>Architecture Difference</h2><table><tr><th>Feature</th><th>X Cleaner</th><th>digital-footprint-health</th></tr><tr><td>Data processing</td><td>Cloud-based</td><td>On-device</td></tr><tr><td>Privacy risk</td><td>Medium (needs session)</td><td>Low (local only)</td></tr><tr><td>Privacy scan</td><td>No</td><td>Yes</td></tr><tr><td>Health score</td><td>No</td><td>0-100</td></tr></table><h2>Security Note</h2><p>Browser extensions have access to your browsing data. While X Cleaner claims to be safe, you are still trusting a third party with your X session. With digital-footprint-health, your data stays on your machine.</p>',
    content: '<p>X Cleaner 是一款浏览器插件，帮助你删除推文。它很方便但有局限性。让我们与 digital-footprint-health 进行比较。</p><h2>架构差异</h2><table><tr><th>功能</th><th>X Cleaner</th><th>digital-footprint-health</th></tr><tr><td>数据处理</td><td>云端</td><td>本机</td></tr><tr><td>隐私风险</td><td>中等（需要会话）</td><td>低（仅本地）</td></tr><tr><td>隐私扫描</td><td>无</td><td>有</td></tr><tr><td>健康评分</td><td>无</td><td>0-100</td></tr></table><h2>安全提示</h2><p>浏览器插件可以访问你的浏览数据。虽然 X Cleaner 声称安全，但你仍在将 X 会话信任给第三方。使用 digital-footprint-health，你的数据留在你的机器上。</p><h2>关于 digital-footprint-health.shop</h2><p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。</p>',
  },
  {
    slug: 'tweeteraser-review',
    title: '对比 TweetEraser：老牌工具的优缺点',
    excerpt: 'TweetEraser 已经存在多年。它是最早的推文删除工具之一。但在 2026 年，它还跟得上吗？',
    date: '2026-08-21',
    updatedAt: '2026-08-21',
    author: 'Digital Footprint Health Team',
    category: '竞品对比',
    tags: ['tweeteraser', 'review', 'comparison'],
    canonical: '/blog/tweeteraser-review',
    faq: [
      { q: 'TweetEraser 和 digital-footprint-health 有什么区别？', a: 'TweetEraser 是简单删除工具，没有隐私扫描。digital-footprint-health 提供完整的数字足迹分析和隐私保护。', qEn: 'What is the difference between TweetEraser and digital-footprint-health?', aEn: 'TweetEraser is a simple deletion tool with no privacy scan. digital-footprint-health provides full digital footprint analysis and privacy protection.' },
      { q: 'TweetEraser 还值得使用吗？', a: '如果你只需要快速删除，TweetEraser 仍然可用。如果你关心隐私，digital-footprint-health 是更好的选择。', qEn: 'Is TweetEraser still worth using?', aEn: 'If you just need fast deletion, TweetEraser still works. If you care about privacy, digital-footprint-health is a better choice.' },
    ],
    titleEn: 'TweetEraser Review: Is the Veteran Still Relevant?',
    excerptEn: 'TweetEraser has been around for years. It is one of the original tweet deletion tools. But in 2026, does it still hold up?',
    categoryEn: 'Comparison',
    tagsEn: ['tweeteraser', 'review', 'comparison'],
    contentEn: '<p>TweetEraser has been around for years. It is one of the original tweet deletion tools. But in 2026, does it still hold up?</p><h2>Where TweetEraser Falls Short</h2><ul><li>No privacy scan — it deletes tweets but does not tell you what is risky</li><li>No health score — you will not know your digital footprint status</li><li>Cloud-based — your data goes through their servers</li><li>No pause/resume — once you start deleting, you cannot stop mid-process</li></ul><h2>Comparison with digital-footprint-health</h2><table><tr><th>Feature</th><th>TweetEraser</th><th>digital-footprint-health</th></tr><tr><td>Privacy scan</td><td>No</td><td>Yes</td></tr><tr><td>Health score</td><td>No</td><td>0-100</td></tr><tr><td>Pause/Resume</td><td>No</td><td>Yes</td></tr><tr><td>On-device</td><td>No</td><td>Yes</td></tr></table><h2>The Verdict</h2><p>TweetEraser is a solid tool for simple deletion. But if privacy and understanding matter to you, digital-footprint-health offers a more complete solution.</p>',
    content: '<p>TweetEraser 已经存在多年。它是最早的推文删除工具之一。但在 2026 年，它还跟得上吗？</p><h2>TweetEraser 的不足</h2><ul><li>无隐私扫描 — 它删除推文但不会告诉你什么有风险</li><li>无健康评分 — 你不会知道自己的数字足迹状态</li><li>基于云端 — 你的数据经过他们的服务器</li><li>无暂停/恢复 — 一旦开始删除，无法中途停止</li></ul><h2>与 digital-footprint-health 对比</h2><table><tr><th>功能</th><th>TweetEraser</th><th>digital-footprint-health</th></tr><tr><td>隐私扫描</td><td>无</td><td>有</td></tr><tr><td>健康评分</td><td>无</td><td>0-100</td></tr><tr><td>暂停/恢复</td><td>无</td><td>有</td></tr><tr><td>本机处理</td><td>无</td><td>有</td></tr></table><h2>结论</h2><p>TweetEraser 是简单的删除工具。但如果隐私和理解对你很重要，digital-footprint-health 提供更完整的解决方案。</p><h2>关于 digital-footprint-health.shop</h2><p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。</p>',
  },
  {
    slug: 'manual-vs-automated-deletion',
    title: '手动删 vs 工具删：时间账算给你看',
    excerpt: '你有 5,000 条推文。你想全部删除。手动删除需要多长时间？自动化删除又需要多长时间？',
    date: '2026-08-21',
    updatedAt: '2026-08-21',
    author: 'Digital Footprint Health Team',
    category: '删除实操',
    tags: ['manual deletion', 'automation', 'time comparison'],
    canonical: '/blog/manual-vs-automated-deletion',
    faq: [
      { q: '手动删除 5000 条推文需要多长时间？', a: '按每条 10 秒计算，需要约 14 小时。', qEn: 'How long does it take to manually delete 5,000 tweets?', aEn: 'At 10 seconds per tweet, about 14 hours.' },
      { q: '自动化工具真的快那么多吗？', a: '是的。自动化工具每推约 0.3 秒，5000 条只需约 25 分钟。', qEn: 'Are automated tools really that much faster?', aEn: 'Yes. Automated tools take about 0.3 seconds per tweet, so 5,000 tweets take only about 25 minutes.' },
    ],
    titleEn: 'Manual vs Automated Deletion: The Time Math',
    excerptEn: 'You have 5,000 tweets. You want to delete them all. How long would it take manually? How about with automation?',
    categoryEn: 'Deletion How-to',
    tagsEn: ['manual deletion', 'automation', 'time comparison'],
    contentEn: '<p>You have 5,000 tweets. You want to delete them all. How long would it take manually?</p><h2>The Math</h2><table><tr><th>Method</th><th>Time per tweet</th><th>Total for 5,000 tweets</th></tr><tr><td>Manual deletion</td><td>10 seconds</td><td>~14 hours</td></tr><tr><td>Automated tool</td><td>0.5 seconds</td><td>~42 minutes</td></tr><tr><td>digital-footprint-health</td><td>0.3 seconds</td><td>~25 minutes</td></tr></table><h2>Manual Deletion: The Hidden Costs</h2><ul><li>Eye strain from staring at the screen</li><li>Frustration from repetitive clicking</li><li>Mistakes — you might delete the wrong tweets</li><li>Inconsistency — some tweets slip through</li></ul><h2>When Manual Makes Sense</h2><p>Deleting 10-20 tweets is quick and simple. For selective deletion or when you want full control over every action, manual is fine.</p><h2>When Automation Wins</h2><p>Deleting 100+ tweets, bulk cleaning by date or keyword, or when you want to review risks first — automation is the way to go.</p><h2>The Bottom Line</h2><p>If you have more than 100 tweets to clean, automation saves you hours. But choose a tool that respects your privacy and gives you control.</p>',
    content: '<p>你有 5,000 条推文。你想全部删除。手动删除需要多长时间？</p><h2>时间计算</h2><table><tr><th>方法</th><th>每推时间</th><th>5,000 推总时间</th></tr><tr><td>手动删除</td><td>10 秒</td><td>~14 小时</td></tr><tr><td>自动化工具</td><td>0.5 秒</td><td>~42 分钟</td></tr><tr><td>digital-footprint-health</td><td>0.3 秒</td><td>~25 分钟</td></tr></table><h2>手动删除的隐藏成本</h2><ul><li>盯着屏幕的眼疲劳</li><li>重复点击的挫败感</li><li>错误——你可能删除了错误的推文</li><li>不一致——有些推文会漏掉</li></ul><h2>何时手动删除更合适</h2><p>删除 10-20 条推文快速简单。选择性删除或当你想要完全控制每个操作时，手动是可以的。</p><h2>何时自动化更胜一筹</h2><p>删除 100+ 条推文，按日期或关键词批量清理，或当你想先审查风险时——自动化是更好的选择。</p><h2>结论</h2><p>如果要清理超过 100 条推文，自动化可以节省你数小时。但选择一个尊重你隐私并给予你控制权的工具。</p><h2>关于 digital-footprint-health.shop</h2><p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。</p>',
  },
  {
    slug: 'why-x-has-no-delete-all',
    title: '官方"删除全部"为什么不存在？',
    excerpt: '如果你曾经想清除整个 X 历史记录，你可能已经注意到：没有"删除全部"按钮。为什么？',
    date: '2026-08-21',
    updatedAt: '2026-08-21',
    author: 'Digital Footprint Health Team',
    category: '竞品对比',
    tags: ['delete all tweets', 'x features', 'why no delete all'],
    canonical: '/blog/why-x-has-no-delete-all',
    faq: [
      { q: 'X 为什么没有批量删除功能？', a: 'X 的官方立场是用户应该自己管理内容，批量删除可能被滥用。', qEn: 'Why does X not have bulk deletion?', aEn: 'X\'s official position is that users should manage their own content, and bulk deletion could be misused.' },
      { q: '我该如何批量删除推文？', a: '使用第三方工具如 TweetDelete、X Cleaner 或 digital-footprint-health。它们提供自动化删除功能。', qEn: 'How can I delete tweets in bulk?', aEn: 'Use third-party tools like TweetDelete, X Cleaner, or digital-footprint-health. They provide automated deletion.' },
    ],
    titleEn: 'Why X Doesn\'t Offer a "Delete Everything" Button',
    excerptEn: 'If you have ever wanted to wipe your entire X history, you have probably noticed: there is no "Delete All" button. Why?',
    categoryEn: 'Comparison',
    tagsEn: ['delete all tweets', 'x features', 'why no delete all'],
    contentEn: '<p>If you have ever wanted to wipe your entire X history, you have probably noticed: there is no "Delete All" button. Why?</p><h2>X\'s Official Stance</h2><p>X (formerly Twitter) has never offered a bulk deletion feature. Their position:</p><ul><li>Users should manage their own content</li><li>Bulk deletion could be misused (e.g., erasing evidence)</li><li>Individual deletion gives users more control</li></ul><h2>What You Can Do Instead</h2><ol><li><strong>Manual deletion:</strong> Delete tweets one by one (slow but free)</li><li><strong>Third-party tools:</strong> Use TweetDelete, X Cleaner, etc. (fast but costs money)</li><li><strong>digital-footprint-health:</strong> Delete tweets + understand your data first (balanced approach)</li></ol><h2>The Bottom Line</h2><p>X doesn\'t offer bulk deletion because they want users to be intentional about what they remove. But that intentionality comes at a cost: your time. If you have thousands of tweets to clean, automation is the only practical solution.</p>',
    content: '<p>如果你曾经想清除整个 X 历史记录，你可能已经注意到：没有"删除全部"按钮。为什么？</p><h2>X 的官方立场</h2><p>X（前 Twitter）从未提供批量删除功能。他们的立场：</p><ul><li>用户应该自己管理内容</li><li>批量删除可能被滥用（例如销毁证据）</li><li>单独删除给用户更多控制</li></ul><h2>你可以做什么</h2><ol><li><strong>手动删除：</strong>逐条删除推文（慢但免费）</li><li><strong>第三方工具：</strong>使用 TweetDelete、X Cleaner 等（快但要付费）</li><li><strong>digital-footprint-health：</strong>删除推文 + 先了解自己的数据（平衡方案）</li></ol><h2>结论</h2><p>X 不提供批量删除，因为他们希望用户对删除的内容保持审慎。但这种审慎是有成本的：你的时间。如果成千上万条推文需要清理，自动化是唯一实用的解决方案。</p><h2>关于 digital-footprint-health.shop</h2><p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。</p>',
  },
  {
    slug: '6-tweet-deletion-tools-compared',
    title: '6 款推文删除工具诚实对比：2026 年实测',
    excerpt: '找到合适的推文删除工具能节省数小时——或者浪费钱在不能用的软件上。本文对 2026 年 6 款流行工具进行诚实对比，按可靠性、速度和隐私排序。',
    date: '2026-08-22',
    updatedAt: '2026-08-22',
    author: 'Digital Footprint Health Team',
    category: '工具对比',
    tags: ['tweet deletion tools', 'comparison', 'best tweet deleter'],
    canonical: '/blog/6-tweet-deletion-tools-compared',
    faq: [
      { q: '哪个工具对账户最安全？', a: 'digital-footprint-health，因为你的数据留在你的设备上。', qEn: 'Which tool is safest for my account?', aEn: 'digital-footprint-health, because your data stays on your device.' },
      { q: '这些工具能删除转推吗？', a: '大多数可以。请查看每个工具的功能列表。', qEn: 'Can these tools delete retweets too?', aEn: 'Most can. Check each tool\'s features list.' },
      { q: '有多少推文可以删除？', a: '取决于工具。X 本身限制批量操作以防止滥用。', qEn: 'Is there a limit to how many tweets I can delete?', aEn: 'Depends on the tool. X itself limits bulk actions to prevent abuse.' },
    ],
    titleEn: '6 Tweet Deletion Tools, Honestly Compared',
    excerptEn: 'Finding the right tweet deletion tool can save you hours — or waste your money on software that doesn\'t work. This comparison covers six popular options in 2026, ranked by reliability, speed, and privacy.',
    categoryEn: 'Comparison',
    tagsEn: ['tweet deletion tools', 'comparison', 'best tweet deleter'],
    contentEn: '<p>Finding the right tweet deletion tool can save you hours — or waste your money on software that doesn\'t work. This comparison covers six popular options in 2026, ranked by reliability, speed, and privacy.</p><h2>1. digital-footprint-health</h2><ul><li><strong>Speed:</strong> ~0.3 seconds per tweet</li><li><strong>Privacy:</strong> On-device processing, no data upload</li><li><strong>Price:</strong> Pay-per-delete, refundable</li><li><strong>Best for:</strong> Privacy-conscious users who want transparency</li></ul><h2>2. TweetDelete</h2><ul><li><strong>Speed:</strong> ~0.5 seconds per tweet</li><li><strong>Privacy:</strong> Data uploaded to their servers</li><li><strong>Price:</strong> $5.99/month subscription</li><li><strong>Best for:</strong> Users who want set-it-and-forget-it automation</li></ul><h2>3. X Cleaner</h2><ul><li><strong>Speed:</strong> Browser extension, ~1 second per tweet</li><li><strong>Privacy:</strong> Runs locally in browser</li><li><strong>Price:</strong> Free</li><li><strong>Best for:</strong> Casual users who delete occasionally</li></ul><h2>4. TweetEraser</h2><ul><li><strong>Speed:</strong> ~0.8 seconds per tweet</li><li><strong>Privacy:</strong> Server-side processing</li><li><strong>Price:</strong> One-time $10 purchase</li><li><strong>Best for:</strong> Users who prefer one-time payment over subscription</li></ul><h2>5. SocialBee</h2><ul><li><strong>Speed:</strong> Varies, API-based</li><li><strong>Privacy:</strong> Third-party access to your account</li><li><strong>Price:</strong> $9/month</li><li><strong>Best for:</strong> Social media managers handling multiple accounts</li></ul><h2>6. Manual Deletion</h2><ul><li><strong>Speed:</strong> ~10 seconds per tweet</li><li><strong>Privacy:</strong> Maximum (you do it yourself)</li><li><strong>Price:</strong> Free (time cost)</li><li><strong>Best for:</strong> Small batches under 50 tweets</li></ul><h2>The Privacy Trade-off</h2><p>Every tool except manual deletion requires you to hand over access to your X account. This means they can see your tweets (and potentially DMs), store your credentials, and have the ability to post on your behalf.</p><p>digital-footprint-health minimizes this risk by processing your data locally. Your tweets never leave your device during analysis.</p><h2>When to Use Each Tool</h2><ul><li><strong>Under 100 tweets:</strong> Manual or X Cleaner</li><li><strong>100-1000 tweets:</strong> digital-footprint-health or TweetEraser</li><li><strong>1000+ tweets:</strong> digital-footprint-health or TweetDelete</li><li><strong>Privacy is priority:</strong> digital-footprint-health only</li></ul>',
    content: '<p>找到合适的推文删除工具能节省数小时——或者浪费钱在不能用的软件上。本文对 2026 年 6 款流行工具进行诚实对比，按可靠性、速度和隐私排序。</p><h2>1. digital-footprint-health</h2><ul><li><strong>速度：</strong>每条约 0.3 秒</li><li><strong>隐私：</strong>本机处理，不上传数据</li><li><strong>价格：</strong>按条计费，可退款</li><li><strong>适合：</strong>注重隐私、希望透明的用户</li></ul><h2>2. TweetDelete</h2><ul><li><strong>速度：</strong>每条约 0.5 秒</li><li><strong>隐私：</strong>数据上传到他们的服务器</li><li><strong>价格：</strong>$5.99/月订阅</li><li><strong>适合：</strong>想要一键式自动化的用户</li></ul><h2>3. X Cleaner</h2><ul><li><strong>速度：</strong>浏览器插件，每条约 1 秒</li><li><strong>隐私：</strong>在浏览器本地运行</li><li><strong>价格：</strong>免费</li><li><strong>适合：</strong>偶尔删除的 casual 用户</li></ul><h2>4. TweetEraser</h2><ul><li><strong>速度：</strong>每条约 0.8 秒</li><li><strong>隐私：</strong>服务端处理</li><li><strong>价格：</strong>一次性 $10</li><li><strong>适合：</strong>喜欢一次性付费而非订阅的用户</li></ul><h2>5. SocialBee</h2><ul><li><strong>速度：</strong>视情况而定，基于 API</li><li><strong>隐私：</strong>第三方访问你的账户</li><li><strong>价格：</strong>$9/月</li><li><strong>适合：</strong>管理多个账号的社交媒体经理</li></ul><h2>6. 手动删除</h2><ul><li><strong>速度：</strong>每条约 10 秒</li><li><strong>隐私：</strong>最高（你自己操作）</li><li><strong>价格：</strong>免费（时间成本）</li><li><strong>适合：</strong>少于 50 条的小批量</li></ul><h2>隐私权衡</h2><p>除手动删除外，每个工具都需要你授予访问 X 账户的权限。这意味着他们可以查看你的推文（甚至可能是私信）、存储你的凭据，并有权代表你发帖。</p><p>digital-footprint-health 通过本机处理来降低这种风险。你的推文在分析期间永远不会离开你的设备。</p><h2>何时使用哪个工具</h2><ul><li><strong>少于 100 条：</strong>手动或 X Cleaner</li><li><strong>100-1000 条：</strong>digital-footprint-health 或 TweetEraser</li><li><strong>1000+ 条：</strong>digital-footprint-health 或 TweetDelete</li><li><strong>隐私优先：</strong>只用 digital-footprint-health</li></ul>',
  },
  {
    slug: 'safe-tweet-deleter-checklist',
    title: '别只看价格：选删除工具的安全清单',
    excerpt: '不是所有推文删除工具都是一样的。有些是合法服务，有些是伪装的的数据收割机。这份清单帮助你在交出 X 凭据之前识别安全工具。',
    date: '2026-08-22',
    updatedAt: '2026-08-22',
    author: 'Digital Footprint Health Team',
    category: '安全指南',
    tags: ['safe tweet deleter', 'tool security', 'privacy checklist'],
    canonical: '/blog/safe-tweet-deleter-checklist',
    faq: [
      { q: '如何判断推文删除工具是否安全？', a: '检查隐私政策是否明确说明数据收集、存储和共享方式。好的工具会详细说明数据如何处理。', qEn: 'How do I know if a tweet deletion tool is safe?', aEn: 'Check if the privacy policy explicitly states how data is collected, stored, and shared. Good tools explain exactly how your data is handled.' },
      { q: '免费工具安全吗？', a: '如果免费，他们可能通过出售数据来盈利。选择有清晰定价的工具。', qEn: 'Are free tools safe?', aEn: 'If it\'s free, they may make money by selling your data. Choose tools with clear pricing.' },
    ],
    titleEn: 'Beyond Price: A Safety Checklist for Deletion Tools',
    excerptEn: 'Not all tweet deletion tools are created equal. Some are legitimate services. Others are data harvesting operations in disguise. This checklist helps you identify safe tools before handing over your X credentials.',
    categoryEn: 'Security Guide',
    tagsEn: ['safe tweet deleter', 'tool security', 'privacy checklist'],
    contentEn: '<p>Not all tweet deletion tools are created equal. Some are legitimate services. Others are data harvesting operations in disguise. This checklist helps you identify safe tools before handing over your X credentials.</p><h2>Red Flags to Watch For</h2><h3>1. Vague Privacy Policy</h3><p>If the tool doesn\'t explicitly state what data they collect, how long they keep it, and who they share it with — run. A legitimate service will have a detailed privacy policy, preferably written in plain language.</p><h3>2. Unnecessary Permissions</h3><p>A tweet deletion tool should only need:<br>- Read access to your tweets<br>- Write access to delete tweets</p><p>If it requests access to your DMs, direct messages, or the ability to post on your behalf — that\'s a red flag. You don\'t need posting access to delete tweets.</p><h3>3. No Clear Pricing</h3><p>"Free forever" tools often make money by selling your data. Transparent pricing is a sign of a legitimate business. Look for clear subscription fees or per-tweet costs.</p><h3>4. No User Reviews</h3><p>Check Reddit, Trustpilot, and Twitter for real user experiences. If a tool has no independent reviews, be skeptical.</p><h2>Green Flags</h2><ul><li>Clear, detailed privacy policy</li><li>Local/on-device processing</li><li>Transparent pricing with no hidden fees</li><li>Positive reviews on independent platforms</li><li>Option to pause and resume deletions</li><li>Refund policy</li></ul><h2>The Bottom Line</h2><p>Your X account contains years of personal history. Don\'t hand over access to a tool that doesn\'t respect your privacy. digital-footprint-health processes everything on your device — your data never leaves your machine.</p>',
    content: '<p>不是所有推文删除工具都是一样的。有些是合法服务，有些是伪装的的数据收割机。这份清单帮助你在交出 X 凭据之前识别安全工具。</p><h2>需警惕的危险信号</h2><h3>1. 模糊的隐私政策</h3><p>如果工具没有明确说明他们收集什么数据、保留多久、与谁共享——快跑。合法服务会有详细的隐私政策，最好是用通俗易懂的语言撰写。</p><h3>2. 不必要的权限</h3><p>推文删除工具只需要：<br>- 读取你的推文的权限<br>- 删除推文的写入权限</p><p>如果它请求访问你的私信或代表你发帖的权限——这是危险信号。删除推文不需要发帖权限。</p><h3>3. 无明确定价</h3><p>"永远免费"的工具通常通过出售你的数据来盈利。透明定价是合法业务的标志。寻找清晰的订阅费用或按条计费。</p><h3>4. 无用户评价</h3><p>在 Reddit、Trustpilot 和 Twitter 上查看真实用户评价。如果一个工具没有任何独立评价，要保持怀疑。</p><h2>绿色信号</h2><ul><li>清晰详细的隐私政策</li><li>本地/本机处理</li><li>透明定价，无隐藏费用</li><li>独立平台上有正面评价</li><li>可暂停和恢复删除</li><li>退款政策</li></ul><h2>结论</h2><p>你的 X 账户包含数年的个人历史。不要把访问权交给不尊重你隐私的工具。digital-footprint-health 在所有数据都在你的设备上处理——你的数据永远不会离开你的机器。</p><h2>关于 digital-footprint-health.shop</h2><p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。</p>',
  },
  {
    slug: 'tweet-tool-privacy-policy',
    title: '你的删除工具会读你的数据吗？',
    excerpt: '当你使用推文删除工具时，你本质上是在给陌生人访问你个人历史的权限。了解他们能看到什么——以及他们永远不应该看到什么——对于保护你的隐私至关重要。',
    date: '2026-08-22',
    updatedAt: '2026-08-22',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['tweet tool privacy', 'privacy policy', 'data access'],
    canonical: '/blog/tweet-tool-privacy-policy',
    faq: [
      { q: '推文删除工具能访问我的私信吗？', a: '理论上可以，如果他们请求了该权限。选择一个不需要私信访问的工具。', qEn: 'Can tweet deletion tools access my DMs?', aEn: 'Theoretically yes, if they request that permission. Choose a tool that doesn\'t need DM access.' },
      { q: '我的推文会被存储吗？', a: '云端处理工具会。本机处理工具不会。', qEn: 'Will my tweets be stored?', aEn: 'Cloud-based tools will. On-device tools won\'t.' },
    ],
    titleEn: 'Does Your Deletion Tool Read Your Data?',
    excerptEn: 'When you use a tweet deletion tool, you\'re essentially giving a stranger access to your personal history. Understanding what they can see — and what they should never see — is critical for protecting your privacy.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['tweet tool privacy', 'privacy policy', 'data access'],
    contentEn: '<p>When you use a tweet deletion tool, you\'re essentially giving a stranger access to your personal history. Understanding what they can see — and what they should never see — is critical for protecting your privacy.</p><h2>What Tweet Tools Can Access</h2><h3>Public tweets</h3><p>All tools that connect to your X account can read your public tweets. This includes: tweet text, timestamps, engagement metrics (likes, retweets), and media attachments.</p><h3>Direct messages</h3><p>Some tools request access to DMs. This is a major privacy risk — your private conversations could be read, stored, or leaked.</p><h3>Profile information</h3><p>Your bio, location, follower count, and account creation date are all visible to connected apps.</p><h3>List memberships</h3><p>Tools may be able to see which Twitter Lists you\'re a member of.</p><h2>What They Should NEVER Access</h2><ul><li>Your password (you should never enter it in a third-party tool)</li><li>Your 2FA codes</li><li>Your email or phone number (beyond what\'s public)</li><li>Your DMs (unless absolutely necessary and you trust the tool)</li></ul><h2>How digital-footprint-health Protects You</h2><p>Our tool processes your data entirely on your device. We never upload your tweets to our servers. Your archive stays on your machine throughout the entire process.</p><p>This means:<br>- No one else can see your tweets<br>- No data is stored on our servers<br>- You maintain full control at all times</p><h2>The Bottom Line</h2><p>Before using any tweet deletion tool, ask: what data do they need? If the answer includes anything beyond reading and deleting tweets, be very careful. Your digital history is yours — protect it.</p>',
    content: '<p>当你使用推文删除工具时，你本质上是在给陌生人访问你个人历史的权限。了解他们能看到什么——以及他们永远不应该看到什么——对于保护你的隐私至关重要。</p><h2>推文工具可以访问的内容</h2><h3>公开推文</h3><p>所有连接到你的 X 账户的工具都可以读取你的公开推文。包括：推文内容、时间戳、互动数据（点赞、转推）和媒体附件。</p><h3>私信</h3><p>有些工具请求访问私信。这是重大隐私风险——你的私人对话可能被读取、存储或泄露。</p><h3>个人资料信息</h3><p>你的个人简介、位置、关注者数量和账户创建日期对所有已连接的应用都可见。</p><h3>列表成员资格</h3><p>工具可能能够看到你加入了哪些 Twitter 列表。</p><h2>他们永远不应该访问的内容</h2><ul><li>你的密码（你绝不应在第三方工具中输入）</li><li>你的双因素认证代码</li><li>你的邮箱或手机号（超出公开信息范围）</li><li>你的私信（除非绝对必要且你信任该工具）</li></ul><h2>digital-footprint-health 如何保护你</h2><p>我们的工具完全在你的设备上处理数据。我们永远不会将你的推文上传到我们的服务器。你的归档文件在整个过程中都留在你的机器上。</p><p>这意味着：<br>- 没有人能看到你的推文<br>- 没有数据存储在我們的服务器上<br>- 你始终拥有完全控制权</p><h2>结论</h2><p>在使用任何推文删除工具之前，问自己：他们需要哪些数据？如果答案超出读取和删除推文的范围，请非常小心。你的数字历史是你的——保护它。</p><h2>关于 digital-footprint-health.shop</h2><p>digital-footprint-health.shop 是 X 数字足迹体检工具：上传归档，本机逐条解析，扫手机号、住址、定位与敏感话题，给 0-100 健康评分。体检免费只读、不上传数据。清理时删除按条计费，可 <a href="/pricing">暂停、续传、退款</a>。</p>',
  },

  { slug: "delete-10000-tweets-real-cost", title: "The Real Cost of Deleting 10,000+ Tweets", titleEn: "一次删除上万条的真实成本与耗时", excerpt: "How much time and money does bulk-deleting 10,000 tweets cost?", excerptEn: "批量删除一万条推文需要多少时间和金钱？", date: "2026-08-23", updatedAt: "2026-08-23", author: "digital-footprint-health", category: "cleanup", tags: ["bulk deletion"], content: "Deleting 10,000 tweets takes roughly 10 hours. X rate limits cap you at ~1,000 tweets/hour.", contentEn: "", canonical: "https://digital-footprint-health.shop/blog/delete-10000-tweets-real-cost" },
  { slug: "delete-vs-protect-safety", title: "Delete vs Protect: What Actually Keeps You Safe", titleEn: "删除 vs 锁号：哪个才是安全", excerpt: "Deleting tweets vs locking your account — which protects your digital footprint?", excerptEn: "删除推文和锁定账号，哪个更能保护你的数字足迹？", date: "2026-08-23", updatedAt: "2026-08-23", author: "digital-footprint-health", category: "privacy", tags: ["privacy"], content: "Delete removes permanently. Lock makes account private. Delete harmful tweets, lock to reduce exposure.", contentEn: "", canonical: "https://digital-footprint-health.shop/blog/delete-vs-protect-safety" },
  { slug: "tweets-js-anatomy", title: "tweets.js Fully Decoded: Anatomy of One Tweet", titleEn: "tweets.js 结构全解析", excerpt: "What does the data structure of a single tweet look like inside tweets.js?", excerptEn: "tweets.js 归档文件里每条推文的数据结构", date: "2026-08-23", updatedAt: "2026-08-23", author: "digital-footprint-health", category: "technical", tags: ["tweets.js", "JSON"], content: "tweets.js contains every tweet you posted. Core fields: created_at, full_text, id_str, favorite_count, retweet_count, entities.", contentEn: "", canonical: "https://digital-footprint-health.shop/blog/tweets-js-anatomy" },
  { slug: "bilingual-privacy-report", title: "中英文双语报告：为什么需要两种语言体检", titleEn: "Bilingual Reports: Why Your Check Speaks Two Languages", excerpt: "你的数字足迹体检用两种语言，因为你的数字生活也是如此。", excerptEn: "Your digital footprint check speaks two languages because your digital life does too.", date: "2026-08-25", updatedAt: "2026-08-25", author: "digital-footprint-health", category: "privacy", tags: ["双语", "隐私体检"], content: "双语报告确保美国用户获得清晰的英文风险说明，中文用户获得准确翻译，跨文化风险也能被捕捉到。", contentEn: "A bilingual report ensures US-based users get clear English explanations of risks, Chinese-speaking users get accurate translations, and cross-cultural risks are caught.", canonical: "https://digital-footprint-health.shop/blog/bilingual-privacy-report" },
  { slug: "tweet-cleanup-schedule", title: "删除频率策略：一周删还是一个月删一次", titleEn: "Deletion Cadence: Weekly vs Monthly Cleanups", excerpt: "你应该多久清理一次推文？", excerptEn: "How often should you clean up your tweets?", date: "2026-08-25", updatedAt: "2026-08-25", author: "digital-footprint-health", category: "privacy", tags: ["清理", "推文"], content: "高风险用户适合每周清理，大多数人按月清理即可。关键是保持一致性。", contentEn: "Weekly cleanup is for high-risk users. Monthly cleanup works for most people. The key is consistency.", canonical: "https://digital-footprint-health.shop/blog/tweet-cleanup-schedule" },
  { slug: "future-tweet-rules", title: "清理后如何守住：未来推文的 5 条红线", titleEn: "After the Clean: 5 Red Lines for Future Tweets", excerpt: "清理旧推文只是战斗的一半。", excerptEn: "Cleaning up old tweets is only half the battle.", date: "2026-08-25", updatedAt: "2026-08-25", author: "digital-footprint-health", category: "privacy", tags: ["推文", "隐私保护"], content: "不实时定位、不拍他人可识别照片、不讨论敏感工作、不透露财务信息、不情绪化发布。", contentEn: "No real-time location tagging, no identifiable photos of others, no sensitive work discussions, no financial information, no emotional impulses.", canonical: "https://digital-footprint-health.shop/blog/future-tweet-rules" },
  { slug: "forgotten-tweets", title: "隐私体检能发现\"你忘了的\"那些事", titleEn: "What the Check Finds That You Forgot", excerpt: "最令人惊讶的不是你记得发过的内容——而是你忘记的内容。", excerptEn: "The most surprising thing isn't what you remember posting — it's what you forgot.", date: "2026-08-25", updatedAt: "2026-08-25", author: "digital-footprint-health", category: "privacy", tags: ["隐私体检", "推文"], content: "用户普遍反映，体检能发现多年前他们完全忘记存在的推文，这些推文往往包含风险信息。", contentEn: "Users consistently report being shocked by tweets from years ago they completely forgot existed.", canonical: "https://digital-footprint-health.shop/blog/forgotten-tweets" },
  { slug: "encrypted-archive", title: "加密落盘是什么？你的归档在你机器上有多安全", titleEn: "Encrypted Storage: How Safe Is Your Archive on Your Machine", excerpt: "你的档案仅在设备上解密。", excerptEn: "Your archive is decrypted only on your device.", date: "2026-08-25", updatedAt: "2026-08-25", author: "digital-footprint-health", category: "technical", tags: ["加密", "安全"], content: "本地加密确保服务器永远不会看到你的原始推文数据。", contentEn: "Local-only encryption ensures no server ever sees your raw tweet data.", canonical: "https://digital-footprint-health.shop/blog/encrypted-archive" },


  {
    slug: 'gdpr-data-portability-twitter-archive',
    title: 'GDPR 数据可携带权：如何导出你的 Twitter 数据',
    excerpt: 'GDPR 赋予你接收个人数据副本并转移到其他服务的权利。对于 Twitter 用户，这意味着可以下载完整的推文历史、媒体和账户数据。',
    date: '2026-08-26',
    updatedAt: '2026-08-26',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['GDPR', '数据可携带权', 'Twitter', '归档下载'],
    canonical: '/blog/gdpr-data-portability-twitter-archive',
    titleEn: 'GDPR Data Portability: How to Export Your Twitter Data',
    excerptEn: 'The GDPR gives you the legal right to receive a copy of your personal data and transfer it. For Twitter users, this means downloading your complete tweet history, media, and account data.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['GDPR', 'data portability', 'Twitter', 'archive export'],
    content: `
<p>GDPR 的数据可携带权（第 20 条）赋予你接收个人数据副本并转移到其他服务的法定权利。对于 Twitter 用户来说，这意味着你可以下载完整的推文历史、媒体和账户数据。</p>

<h2>如何导出 Twitter 归档</h2>
<ol>
  <li>进入「设置和隐私」>「你的账户」>「下载你的数据归档」</li>
  <li>请求归档（需要 24-48 小时）</li>
  <li>完成后下载 ZIP 文件</li>
  <li>删除前审查数据中的隐私风险</li>
</ol>
<p>你的归档包括：推文、私信、关注账户、关注者、媒体文件和账户设置。这是你的数据——你有权访问、下载和删除它。</p>

<h2>FAQ</h2>
<h3>Twitter 数据归档包含哪些内容？</h3>
<p>包括所有推文、私信、关注/粉丝列表、媒体文件、账户设置和登录历史。</p>
<h3>归档需要多长时间生成？</h3>
<p>通常需要 24-48 小时，取决于你的数据量。</p>
<h3>归档数据安全吗？</h3>
<p>归档文件包含你的全部 Twitter 历史，建议在安全设备上下载和解压，避免公共电脑。</p>
`,
    contentEn: `
<p>The GDPR's Data Portability right (Article 20) gives you the legal right to receive a copy of your personal data and transfer it to another service. For Twitter users, this means you can download your entire tweet history, media, and account data.</p>

<h2>How to Export Your Twitter Archive</h2>
<ol>
  <li>Go to Settings and Privacy > Your Account > Download an archive of your data</li>
  <li>Request your archive (takes 24-48 hours)</li>
  <li>Download the ZIP file when ready</li>
  <li>Review your data for privacy risks before deletion</li>
</ol>
<p>Your archive includes: tweets, direct messages, followed accounts, followers, media files, and account settings. This is your data — you have the right to access, download, and delete it.</p>

<h2>FAQ</h2>
<h3>What does the Twitter archive include?</h3>
<p>Everything: all tweets, DMs, follow/follower lists, media files, account settings, and login history.</p>
<h3>How long does it take to generate?</h3>
<p>Usually 24-48 hours, depending on your data volume.</p>
<h3>Is the archive secure?</h3>
<p>The archive contains your entire Twitter history. Download and extract it on a secure device, avoid public computers.</p>
`,
  },
  {
    slug: 'ccpa-global-privacy-laws',
    title: 'CCPA 与全球隐私法：你的权利是什么',
    excerpt: '加州消费者隐私法（CCPA）是最全面的美隐私法律之一。它赋予加州居民对其个人数据的特定权利：知情权、删除权、选择退出权和非歧视权。',
    date: '2026-08-26',
    updatedAt: '2026-08-26',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['CCPA', '全球隐私法', '数据权利', 'GDPR'],
    canonical: '/blog/ccpa-global-privacy-laws',
    titleEn: 'CCPA & Global Privacy Laws: What Are Your Rights',
    excerptEn: 'The California Consumer Privacy Act (CCPA) is one of the most comprehensive US privacy laws, giving California residents specific rights over their personal data.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['CCPA', 'global privacy laws', 'data rights', 'GDPR'],
    content: `
<p>加州消费者隐私法（CCPA）是最全面的美隐私法律之一。它赋予加州居民对其个人数据的特定权利：</p>

<h2>CCPA 关键权利</h2>
<ul>
  <li><strong>知情权</strong>：请求公司披露收集的有关你的个人信息</li>
  <li><strong>删除权</strong>：请求删除你的个人数据</li>
  <li><strong>选择退出权</strong>：告知公司不要出售你的个人信息</li>
  <li><strong>非歧视权</strong>：行使隐私权不会受到惩罚</li>
</ul>

<h2>全球隐私法规对比</h2>
<table>
  <tr><th>法律</th><th>地区</th><th>关键特征</th></tr>
  <tr><td>GDPR</td><td>欧盟</td><td>最广泛保护，需要明确同意</td></tr>
  <tr><td>CCPA</td><td>加州，美国</td><td>有权选择退出数据销售</td></tr>
  <tr><td>LGPD</td><td>巴西</td><td>类似 GDPR，聚焦拉丁美洲</td></tr>
  <tr><td>PIPL</td><td>中国</td><td>严格的数据本地化要求</td></tr>
</table>
`,
    contentEn: `
<p>The California Consumer Privacy Act (CCPA) is one of the most comprehensive US privacy laws. It gives California residents specific rights over their personal data.</p>

<h2>Key CCPA Rights</h2>
<ul>
  <li><strong>Right to Know</strong>: Request what personal information companies collect about you</li>
  <li><strong>Right to Delete</strong>: Request deletion of your personal data</li>
  <li><strong>Right to Opt-Out</strong>: Tell companies not to sell your personal information</li>
  <li><strong>Right to Non-Discrimination</strong>: You won't be penalized for exercising your privacy rights</li>
</ul>

<h2>Global Privacy Laws Comparison</h2>
<table>
  <tr><th>Law</th><th>Region</th><th>Key Feature</th></tr>
  <tr><td>GDPR</td><td>EU</td><td>Broadest protection, explicit consent required</td></tr>
  <tr><td>CCPA</td><td>California, US</td><td>Right to opt-out of data sales</td></tr>
  <tr><td>LGPD</td><td>Brazil</td><td>Similar to GDPR, Latin America focus</td></tr>
  <tr><td>PIPL</td><td>China</td><td>Strict data localization requirements</td></tr>
</table>
`,
  },
  {
    slug: 'local-vs-cloud-processing',
    title: '本机处理 vs 云端处理：隐私保护的关键选择',
    excerpt: '你的数据在哪里处理决定了谁能看到它。这是本机处理和云端处理之间的根本区别。',
    date: '2026-08-26',
    updatedAt: '2026-08-26',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['本机处理', '云端处理', '隐私保护', '数据安全'],
    canonical: '/blog/local-vs-cloud-processing',
    titleEn: 'On-Device vs Cloud Processing: The Key Privacy Choice',
    excerptEn: 'Where your data is processed determines who can see it. This is the fundamental difference between on-device and cloud processing.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['on-device processing', 'cloud processing', 'privacy', 'data security'],
    content: `
<p>你的数据在哪里处理决定了谁能看到它。这是本机处理和云端处理之间的根本区别。</p>

<h2>本机处理（我们做的）</h2>
<ul>
  <li>你的数据永远不会离开你的设备</li>
  <li>处理在你的电脑上本地完成</li>
  <li>没有第三方可以访问你的推文或归档</li>
  <li>小数据集更快（无需上传/下载）</li>
  <li>设计上更私密</li>
</ul>

<h2>云端处理（其他人做的）</h2>
<ul>
  <li>你的数据被上传到他们的服务器</li>
  <li>他们处理后删除（理论上）</li>
  <li>处理过程中他们<em>可能</em>看到你的数据</li>
  <li>需要信任他们的安全措施</li>
  <li>大数据集更慢（上传时间）</li>
</ul>

<h2>隐私权衡</h2>
<p>云端处理方便但产生了信任依赖。本机处理需要更多的技术知识，但消除了信任差距。如果隐私是你的首要考虑，始终选择本机处理。</p>
`,
    contentEn: `
<p>Where your data is processed determines who can see it. This is the fundamental difference between on-device and cloud processing.</p>

<h2>On-Device Processing (What We Do)</h2>
<ul>
  <li>Your data never leaves your device</li>
  <li>Processing happens locally on your computer</li>
  <li>No third party can access your tweets or archive</li>
  <li>Faster for small datasets (no upload/download)</li>
  <li>More private by design</li>
</ul>

<h2>Cloud Processing (What Others Do)</h2>
<ul>
  <li>Your data is uploaded to their servers</li>
  <li>They process it and delete it (theoretically)</li>
  <li>They <em>could</em> see your data during processing</li>
  <li>Requires trusting their security measures</li>
  <li>Slower for large datasets (upload time)</li>
</ul>

<h2>The Privacy Trade-off</h2>
<p>Cloud processing is convenient but creates a trust dependency. On-device processing requires more technical knowledge but eliminates the trust gap. If privacy is your priority, always choose on-device processing.</p>
`,
  },
  {
    slug: 'local-encryption-keys',
    title: '密钥留在本机：端到端加密的重要性',
    excerpt: '加密的强度取决于你的密钥管理。当加密密钥存储在你的设备上而不是服务器上时，你对数据保持真正的控制。',
    date: '2026-08-26',
    updatedAt: '2026-08-26',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['本地加密', '端到端加密', '密钥管理', '数据安全'],
    canonical: '/blog/local-encryption-keys',
    titleEn: 'Keys Stay Local: The Importance of End-to-End Encryption',
    excerptEn: 'Encryption is only as strong as your key management. When encryption keys are stored on your device rather than on a server, you maintain true control over your data.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['local encryption', 'end-to-end encryption', 'key management', 'data security'],
    content: `
<p>加密的强度取决于你的密钥管理。当加密密钥存储在你的设备上而不是服务器上时，你对数据保持真正的控制。</p>

<h2>为什么本地密钥很重要</h2>
<ol>
  <li><strong>无服务器泄露</strong>：即使服务被入侵，你的数据仍然加密</li>
  <li><strong>无密钥提取</strong>：攻击者无法在没有物理访问的情况下从你的设备提取密钥</li>
  <li><strong>真正的所有权</strong>：你控制加密和解密，而不是第三方</li>
  <li><strong>法律保护</strong>：执法部门无法强迫你交出你没有的密钥</li>
</ol>

<h2>digital-footprint-health 如何使用本地密钥</h2>
<ul>
  <li>你的加密密钥在你的设备上生成</li>
  <li>密钥永远不会离开你的电脑</li>
  <li>即使我们想，也无法解密你的数据</li>
  <li>你可以验证加密是否正常工作</li>
</ul>

<h2>云存储密钥的风险</h2>
<p>当密钥存储在云端时，你正在将"王国的钥匙"信任给服务提供商。如果他们被入侵，无论加密质量如何，你的数据都会暴露。</p>
`,
    contentEn: `
<p>Encryption is only as strong as your key management. When encryption keys are stored on your device rather than on a server, you maintain true control over your data.</p>

<h2>Why Local Keys Matter</h2>
<ol>
  <li><strong>No server compromise</strong>: Even if the service is hacked, your data stays encrypted</li>
  <li><strong>No key extraction</strong>: Attackers can't extract keys from your device without physical access</li>
  <li><strong>True ownership</strong>: You control encryption and decryption, not a third party</li>
  <li><strong>Legal protection</strong>: Law enforcement can't compel you to hand over keys you don't have</li>
</ol>

<h2>How digital-footprint-health Uses Local Keys</h2>
<ul>
  <li>Your encryption key is generated on your device</li>
  <li>The key never leaves your computer</li>
  <li>We can't decrypt your data even if we wanted to</li>
  <li>You can verify encryption is working correctly</li>
</ul>

<h2>The Risk of Cloud-Stored Keys</h2>
<p>When keys are stored in the cloud, you're trusting the service provider with the "keys to your kingdom." If they're compromised, your data is exposed regardless of encryption quality.</p>
`,
  },
  {
    slug: 'read-vs-write-api',
    title: '只读 vs 写入 API：为什么报告免费但删除收费',
    excerpt: '了解 API 权限解释了为什么我们提供免费隐私报告但删除服务收费。这不是任意定价——它基于 API 访问的技术和法律现实。',
    date: '2026-08-26',
    updatedAt: '2026-08-26',
    author: 'Digital Footprint Health Team',
    category: '隐私指南',
    tags: ['Twitter API', '只读 API', '写入 API', 'API 权限'],
    canonical: '/blog/read-vs-write-api',
    titleEn: 'Read vs Write: Why Reports Are Free But Deletion Costs',
    excerptEn: 'Understanding API permissions explains why we offer free privacy reports but charge for deletion services. It\'s not arbitrary pricing — it\'s based on the technical and legal realities of API access.',
    categoryEn: 'Privacy Guide',
    tagsEn: ['Twitter API', 'read API', 'write API', 'API permissions'],
    content: `
<p>了解 API 权限解释了为什么我们提供免费隐私报告但删除服务收费。这不是任意定价——它基于 API 访问的技术和法律现实。</p>

<h2>只读 API（免费报告）</h2>
<ul>
  <li>读取你的推文归档数据</li>
  <li>不修改你的账户</li>
  <li>对 Twitter 基础设施风险低</li>
  <li>可以在你的设备上本地完成</li>
  <li>免费提供因为我们没有额外成本</li>
</ul>

<h2>写入 API（付费删除）</h2>
<ul>
  <li>修改你的账户（删除推文）</li>
  <li>需要身份验证和授权</li>
  <li>受 Twitter 速率限制（每小时最多 300 次操作）</li>
  <li>账户被标记或暂停的风险更高</li>
  <li>我们在 API 费用和基础设施上投入成本</li>
</ul>

<h2>技术现实</h2>
<p>Twitter 的 API 有严格的速率限制。以最大速率删除 10,000 条推文需要超过 33 小时。这就是为什么我们使用尊重速率限制的自动化工具，同时确保完全删除。</p>
`,
    contentEn: `
<p>Understanding API permissions explains why we offer free privacy reports but charge for deletion services. It's not arbitrary pricing — it's based on the technical and legal realities of API access.</p>

<h2>Read-Only API (Free Reports)</h2>
<ul>
  <li>Reads your tweet archive data</li>
  <li>No modifications to your account</li>
  <li>Low risk to Twitter's infrastructure</li>
  <li>Can be done locally on your device</li>
  <li>Free to offer because it costs us nothing extra</li>
</ul>

<h2>Write API (Paid Deletion)</h2>
<ul>
  <li>Modifies your account (deletes tweets)</li>
  <li>Requires authentication and authorization</li>
  <li>Rate-limited by Twitter (max 300 actions/hour)</li>
  <li>Higher risk of account flags or suspension</li>
  <li>Costs us in API fees and infrastructure</li>
</ul>

<h2>The Technical Reality</h2>
<p>Twitter's API has strict rate limits. Deleting 10,000 tweets at the maximum rate takes over 33 hours. This is why we use automation tools that respect rate limits while ensuring complete deletion.</p>
`,
  },

  {
    slug: 'digital-footprint-recruitment-tools',
    title: '数字足迹的趋势：招聘方用什么工具看你',
    excerpt:
      '招聘方不会手动翻你的 X 账号。他们用工具——搜索引擎、背景调查平台、社交媒体监控软件。了解他们用什么，才能知道该清理什么。',
    date: '2026-08-29',
    updatedAt: '2026-08-29',
    author: 'Digital Footprint Health Team',
    category: '招聘隐私',
    tags: ['招聘', '数字足迹', '背景调查', '社交媒体监控'],
    canonical: '/blog/digital-footprint-recruitment-tools',
    titleEn: 'Digital Footprint Trends: What Recruiters Actually Use',
    excerptEn:
      'Recruiters don\'t manually scroll through your X account. They use tools — search engines, background check platforms, social media monitoring software. Know what they use to know what to clean up.',
    categoryEn: 'Recruitment Privacy',
    tagsEn: ['recruitment', 'digital footprint', 'background check', 'social media monitoring'],
    content: `
<p>你以为招聘方会花两个小时翻你的社交媒体？不会。他们有工具，而且比你想象的多。</p>
<p>从 LinkedIn 自动抓取、Google 真实姓名搜索，到专业背景调查平台，招聘方的数字足迹审计是系统化的。了解这些工具，你才能知道自己的哪些痕迹在暴露。</p>

<h2>招聘方常用的数字足迹审计工具</h2>
<h3>1. 搜索引擎（Google / LinkedIn 搜索）</h3>
<p>最基础也最常用。招聘方搜索你的全名 + 公司名 / 学校名，前三页结果基本就是你的数字足迹公开部分。优化 Google 搜索结果，是数字足迹管理的第一步。</p>

<h3>2. 社交媒体监控平台</h3>
<p>如 <strong>Meltwater</strong>、<strong>BuzzSumo</strong>、<strong>Hootsuite</strong> 等企业级工具，可以设置关键词提醒，自动追踪你的公开帖子、提及和互动。</p>

<h3>3. 背景调查服务</h3>
<p>大公司用的背景调查公司（如 <strong>Checkr</strong>、<strong>GoodHire</strong>、<strong>HireRight</strong>）不仅查犯罪记录和学历，还会扫描公开社交媒体数据。</p>

<h3>4. LinkedIn 智能筛选</h3>
<p>LinkedIn 的招聘版提供 AI 驱动候选人评分，自动分析你的公开资料、技能、推荐和活跃度。你的 LinkedIn 形象就是你的数字名片。</p>

<h2>这些工具能看到什么</h2>
<ul>
  <li><strong>公开推文和帖子</strong> — 任何未被设置为私密的内容</li>
  <li><strong>个人资料信息</strong> — 工作历史、教育、技能、推荐</li>
  <li><strong>互动数据</strong> — 你转发了什么、评论了谁、参与了哪些话题</li>
  <li><strong>图片标记</strong> — 被标记在照片中的位置、活动、人物</li>
</ul>

<h2>你应该做什么</h2>
<ol>
  <li>Google 搜索自己的全名，看看出现在哪里</li>
  <li>检查所有社交平台的隐私设置</li>
  <li>清理或存档可能引起误解的旧内容</li>
  <li>定期做数字足迹体检（用我们的免费工具）</li>
</ol>

<h2>相关资源</h2>
<p>想了解如何删除旧推文？阅读我们的 <a href="/blog/how-to-delete-old-tweets-2026">完整指南</a>。</p>
`,
    contentEn: `
<p>Do you think recruiters spend two hours scrolling through your social media? They don't. They use tools, and more than you might expect.</p>
<p>From LinkedIn auto-scraping and Google name searches to professional background check platforms, recruiters' digital footprint audits are systematic. Understanding these tools helps you know which traces are exposed.</p>

<h2>Tools Recruiters Actually Use</h2>
<h3>1. Search Engines (Google / LinkedIn Search)</h3>
<p>The most basic and most common. Recruiters search your full name + company/school name. The first three pages of results are basically your public digital footprint. Optimizing Google search results is the first step in digital footprint management.</p>

<h3>2. Social Media Monitoring Platforms</h3>
<p>Enterprise tools like <strong>Meltwater</strong>, <strong>BuzzSumo</strong>, and <strong>Hootsuite</strong> can set keyword alerts and automatically track your public posts, mentions, and engagement.</p>

<h3>3. Background Check Services</h3>
<p>Large companies use background check firms (like <strong>Checkr</strong>, <strong>GoodHire</strong>, <strong>HireRight</strong>) that scan not just criminal records and education, but also public social media data.</p>

<h3>4. LinkedIn Smart Screening</h3>
<p>LinkedIn's recruiting edition offers AI-driven candidate scoring, automatically analyzing your public profile, skills, recommendations, and activity level. Your LinkedIn presence is your digital business card.</p>

<h2>What These Tools Can See</h2>
<ul>
  <li><strong>Public tweets and posts</strong> — anything not set to private</li>
  <li><strong>Profile information</strong> — work history, education, skills, recommendations</li>
  <li><strong>Engagement data</strong> — what you retweeted, who you commented on, what topics you joined</li>
  <li><strong>Photo tags</strong> — where you're tagged in photos, events, people</li>
</ul>

<h2>What You Should Do</h2>
<ol>
  <li>Google your full name and see what comes up</li>
  <li>Check privacy settings on all social platforms</li>
  <li>Clean up or archive old content that could be misinterpreted</li>
  <li>Regularly run a digital footprint check (use our free tool)</li>
</ol>

<h2>Related Resources</h2>
<p>Want to know how to delete old tweets? Read our <a href="/blog/how-to-delete-old-tweets-2026">complete guide</a>.</p>
`,
  },

  {
    slug: 'leave-twitter-cleanup',
    title: '新平台迁移潮：离开 X 前先清理？',
    excerpt:
      '越来越多的用户开始讨论离开 X（Twitter）。但在迁移到新平台之前，你真的清理了自己的数字足迹吗？这篇讲清楚为什么清理应该在迁移之前。',
    date: '2026-08-29',
    updatedAt: '2026-08-29',
    author: 'Digital Footprint Health Team',
    category: '平台迁移',
    tags: ['X/Twitter', '平台迁移', '数字足迹清理', '隐私'],
    canonical: '/blog/leave-twitter-cleanup',
    titleEn: 'The X Exodus: Clean Up Before You Leave?',
    excerptEn:
      'More and more users are discussing leaving X (Twitter). But before migrating to a new platform, have you really cleaned up your digital footprint? Here\'s why cleanup should happen before migration.',
    categoryEn: 'Platform Migration',
    tagsEn: ['X/Twitter', 'platform migration', 'digital footprint cleanup', 'privacy'],
    content: `
<p>X（Twitter）正在经历用户流失潮。各种替代平台（Mastodon、Bluesky、Threads）吸引了大量用户。但在你点击"导出"、注册新账号之前，请先停下来想想：你的数字足迹清理干净了吗？</p>

<h2>为什么迁移前先清理很重要</h2>
<h3>1. 旧痕迹不会被新平台带走</h3>
<p>你的 X 数据归档里的每一条推文、每一张照片，都不会自动出现在新平台上。但它们仍然在互联网上——被搜索引擎索引、被截图保存、被第三方网站抓取。</p>

<h3>2. 迁移是清理的最佳时机</h3>
<p>当你决定离开一个平台，你的心理状态是最清晰的。这是检查"我过去发了什么"的最佳时刻——不是因为愧疚，而是因为反思。</p>

<h3>3. 新平台的隐私设置可能不同</h3>
<p>每个平台的隐私模型不同。Mastodon 是联邦制的，Bluesky 有 AT Protocol，Threads 是 Meta 的。在新平台建立良好隐私习惯之前，确保旧平台没有遗留风险。</p>

<h2>迁移前检查清单</h2>
<ul>
  <li>✅ 下载并检查 X 数据归档</li>
  <li>✅ 删除或设置私密：手机号、邮箱、地址</li>
  <li>✅ 清理敏感的过往推文（特别是关于前雇主、政治、健康）</li>
  <li>✅ 检查图片 EXIF 数据（GPS 位置信息）</li>
  <li>✅ 取消关注或屏蔽可能泄露你信息的人</li>
  <li>✅ 在搜索引擎中检查自己的名字 + "twitter"</li>
</ul>

<h2>迁移后的持续管理</h2>
<p>离开 X 不是终点。在新平台上，继续保持良好的隐私习惯：定期审计、限制公开搜索、审慎分享位置信息。</p>

<h2>工具推荐</h2>
<p>使用我们的 <strong>数字足迹体检工具</strong> 检查你的 X 账号，免费生成隐私健康评分。然后决定：清理，还是迁移，还是两者都做。</p>
`,
    contentEn: `
<p>X (Twitter) is experiencing a user exodus. Alternative platforms (Mastodon, Bluesky, Threads) are attracting many users. But before you click "export" and register on a new platform, pause and think: has your digital footprint been cleaned up?</p>

<h2>Why Cleanup Before Migration Matters</h2>
<h3>1. Old traces won't follow you to the new platform</h3>
<p>Every tweet and photo in your X data archive won't automatically appear on new platforms. But they still exist on the internet — indexed by search engines, saved as screenshots, scraped by third-party sites.</p>

<h3>2. Migration is the best time to clean up</h3>
<p>When you decide to leave a platform, your mindset is clearest. It's the best moment to check "what have I posted" — not out of guilt, but out of reflection.</p>

<h3>3. New platforms have different privacy models</h3>
<p>Each platform's privacy model differs. Mastodon is federated, Bluesky uses AT Protocol, Threads is Meta's. Before establishing good privacy habits on the new platform, ensure no legacy risks remain on the old one.</p>

<h2>Pre-Migration Checklist</h2>
<ul>
  <li>✅ Download and review your X data archive</li>
  <li>✅ Delete or make private: phone numbers, emails, addresses</li>
  <li>✅ Clean up sensitive past tweets (especially about former employers, politics, health)</li>
  <li>✅ Check image EXIF data (GPS location info)</li>
  <li>✅ Unfollow or mute people who might expose your information</li>
  <li>✅ Search your name + "twitter" on search engines</li>
</ul>

<h2>Ongoing Management After Migration</h2>
<p>Leaving X isn't the end. On the new platform, continue good privacy habits: regular audits, limited public searchability, cautious location sharing.</p>

<h2>Tool Recommendation</h2>
<p>Use our <strong>digital footprint check tool</strong> to audit your X account and generate a free privacy health score. Then decide: clean up, migrate, or do both.</p>
`,
  },

  {
    slug: 'digital-footprint-10-years',
    title: '十年数字足迹对比：2016 vs 2026',
    excerpt:
      '2016 年的你和 2026 年的你，数字足迹有什么不同？十年前后的社交媒体环境、隐私意识、平台规则都发生了巨大变化。这篇通过对比，帮你看清自己的数字足迹轨迹。',
    date: '2026-08-29',
    updatedAt: '2026-08-29',
    author: 'Digital Footprint Health Team',
    category: '数字足迹分析',
    tags: ['数字足迹', '社交媒体历史', '隐私演变', '2016 vs 2026'],
    canonical: '/blog/digital-footprint-10-years',
    titleEn: '10 Years of Digital Footprints: 2026 vs 2016',
    excerptEn:
      'How is your digital footprint in 2026 different from 2016? The social media landscape, privacy awareness, and platform rules have changed dramatically over the past decade. This comparison helps you see your digital footprint trajectory.',
    categoryEn: 'Digital Footprint Analysis',
    tagsEn: ['digital footprint', 'social media history', 'privacy evolution', '2016 vs 2026'],
    content: `
<p>2016 年，你在 Facebook 上发了一张大学宿舍的照片，-tag 了几个朋友，配文"开学第一天！"。2026 年，你翻到这条帖子，第一反应是：这太公开了。</p>
<p>十年，数字足迹的生态发生了翻天覆地的变化。从隐私意识到平台政策，从技术能力到社会规范，一切都不同了。通过对比 2016 和 2026，我们能更清楚地看到自己的数字足迹轨迹。</p>

<h2>2016 年的数字足迹环境</h2>
<ul>
  <li><strong>隐私意识较低</strong>：大多数人不知道自己的推文会被搜索引擎索引</li>
  <li><strong>平台限制宽松</strong>：Facebook、Twitter 对旧内容的删除限制较少</li>
  <li><strong>数据归档可及性低</strong>：X 的数据归档工具当时还不完善</li>
  <li><strong>移动定位公开</strong>：Check-in 功能普及，位置信息随手可得</li>
  <li><strong>雇主审核宽松</strong>：社交媒体背景调查还未成为标准流程</li>
</ul>

<h2>2026 年的数字足迹环境</h2>
<ul>
  <li><strong>隐私意识提高</strong>：GDPR、CCPA 等法规推动用户关注数据权利</li>
  <li><strong>平台限制收紧</strong>：X 只能删除最近约 3,200 条推文，旧内容成为"数字遗留物"</li>
  <li><strong>背景调查普及</strong>：75% 的招聘方会审查候选人的社交媒体</li>
  <li><strong>AI 监控能力</strong>：企业级工具可以自动扫描和评分你的数字足迹</li>
  <li><strong>数据归档完善</strong>：各大平台都提供了完整的数据导出功能</li>
</ul>

<h2>你的数字足迹可能包含什么</h2>
<table>
  <thead>
    <tr><th>类型</th><th>2016 年风险</th><th>2026 年风险</th></tr>
  </thead>
  <tbody>
    <tr><td>旧推文（含位置）</td><td>中</td><td>高 — 可能被雇主搜到</td></tr>
    <tr><td>照片 EXIF 数据</td><td>低</td><td>高 — AI 可提取 GPS 信息</td></tr>
    <tr><td>社交媒体账号关联</td><td>低</td><td>中 — 跨平台数据合并分析</td></tr>
    <tr><td>搜索引擎缓存</td><td>中</td><td>高 — 多年索引累积</td></tr>
  </tbody>
</table>

<h2>现在该做什么</h2>
<ol>
  <li>下载你的 X 数据归档，进行全面体检</li>
  <li>清理 2016-2020 年间的敏感内容</li>
  <li>设置所有社交平台的隐私默认值</li>
  <li>定期（每季度）做数字足迹复查</li>
</ol>

<h2>十年后的你会感谢现在的你</h2>
<p>数字足迹不会消失。你现在清理的每一条推文、每一张照片，都在为未来的自己减少风险。用我们的免费工具，今天就开始你的数字足迹体检吧。</p>
`,
    contentEn: `
<p>In 2016, you posted a photo of your college dorm on Facebook, tagged a few friends, and wrote "First day of school!" In 2026, you scroll back to that post and your first thought is: that's way too public.</p>
<p>Ten years. The digital footprint ecosystem has changed dramatically. From privacy awareness to platform policies, from technical capabilities to social norms — everything is different. By comparing 2016 and 2026, we can see our digital footprint trajectory more clearly.</p>

<h2>The Digital Footprint Environment in 2016</h2>
<ul>
  <li><strong>Lower privacy awareness</strong>: Most people didn't know their tweets were indexed by search engines</li>
  <li><strong>Looser platform restrictions</strong>: Facebook and Twitter had fewer deletion limits on old content</li>
  <li><strong>Limited data archive access</strong>: X's data archive tool was not yet mature</li>
  <li><strong>Public mobile location</strong>: Check-in features were widespread, location info easily accessible</li>
  <li><strong>Relaxed employer screening</strong>: Social media background checks were not yet standard practice</li>
</ul>

<h2>The Digital Footprint Environment in 2026</h2>
<ul>
  <li><strong>Higher privacy awareness</strong>: GDPR, CCPA and other regulations have pushed users to care about data rights</li>
  <li><strong>Tighter platform restrictions</strong>: X only allows deletion of the most recent ~3,200 tweets; old content becomes a "digital legacy"</li>
  <li><strong>Background checks are widespread</strong>: 75% of recruiters screen candidates' social media</li>
  <li><strong>AI monitoring capabilities</strong>: Enterprise tools can automatically scan and score your digital footprint</li>
  <li><strong>Mature data archives</strong>: All major platforms now provide complete data export</li>
</ul>

<h2>What Your Digital Footprint Might Contain</h2>
<table>
  <thead>
    <tr><th>Type</th><th>2016 Risk</th><th>2026 Risk</th></tr>
  </thead>
  <tbody>
    <tr><td>Old tweets (with location)</td><td>Medium</td><td>High — may be found by employers</td></tr>
    <tr><td>Photo EXIF data</td><td>Low</td><td>High — AI can extract GPS info</td></tr>
    <tr><td>Social media account links</td><td>Low</td><td>Medium — cross-platform data merging</td></tr>
    <tr><td>Search engine cache</td><td>Medium</td><td>High — years of accumulated indexing</td></tr>
  </tbody>
</table>

<h2>What to Do Now</h2>
<ol>
  <li>Download your X data archive and run a full check</li>
  <li>Clean up sensitive content from 2016-2020</li>
  <li>Set privacy defaults on all social platforms</li>
  <li>Do a digital footprint review regularly (quarterly)</li>
</ol>

<h2>Your Future Self Will Thank You</h2>
<p>Digital footprints don't disappear. Every tweet and photo you clean up today reduces risk for your future self. Start your digital footprint check today with our free tool.</p>
`,
  },
  {
    "slug": "brand-mascot-accounts-cleaning",
    "title": "品牌吉祥物账号：如何清理那些\"可爱\"的小号",
    "excerpt": "品牌吉祥物账号是你的数字化身，也是数字足迹的一部分。三种清理策略帮你决定保留还是删除。",
    "date": "2026-09-02",
    "updatedAt": "2026-09-02",
    "author": "Digital Footprint Health Team",
    "category": "risk-scenarios",
    "tags": [
      "品牌小号清理",
      "人格化账号",
      "数字足迹",
      "账号清理"
    ],
    "content": "<p>我们都有它们。那个专门为你最喜欢的乐队设立的 Twitter 账户。那个你在一个月内转发 37 次你崇拜的明星的账户。那个纯粹为了粉丝、幽默或你在 2019 年发现并从未放弃的奇怪爱好而存在的账户。</p>\n<h2>为什么吉祥物账号清理起来很棘手</h2>\n<p>与你的专业 LinkedIn 或严肃的 Twitter 账户不同，吉祥物账号承载着情感重量。你花了数年时间建立那个人设。内部笑话、你找到的社区、创意表达——这一切都感觉很个人化。但问题是：那个账户仍然是你数字历史的一部分。未来的雇主、伴侣或任何 Google 你的人都会看到它。</p>\n<h2>吉祥物账号审计</h2>\n<p>在删除任何东西之前，做一个快速审计：</p>\n<ul>\n<li><strong>给你的最老帖子打分。</strong>这个账户活跃多久了？值得维护吗？</li>\n<li><strong>检查你的粉丝数。</strong>有人通过这个账户真正认识你吗？</li>\n<li><strong>回顾你转发最多的内容。</strong>你今天会支持这些帖子吗？</li>\n<li><strong>考虑最坏情况。</strong>如果未来雇主找到这个账户，会损害你的机会吗？</li>\n</ul>\n<h2>三种清理策略</h2>\n<p><strong>策略 1：存档并放手。</strong>下载你的数据，将账户设为私有或不活跃，然后继续。这保留了你的数字历史，而不公开暴露它。</p>\n<p><strong>策略 2：大扫除。</strong>删除最有问题的帖子，保留无害的，让账户自然消退。适合内容混杂的账户。</p>\n<p><strong>策略 3：核选项。</strong>删除一切并重新开始。最适合那些已成为负债而非资产的账户。</p>\n<h2>放手的心理学</h2>\n<p>清理吉祥物账号感觉比应该的更难，因为心理学家称之为\"禀赋效应\"——我们仅仅因为拥有它们而更高地评估事物。但数字囤积是真实的。每一条旧帖子、每条尴尬的转发都是潜在的声誉风险。</p>\n<h2>何时保留吉祥物账号</h2>\n<p>并非所有吉祥物账号都需要清理。如果你的账号是：一个真正带来快乐的创意出口；内容适合年龄且不会在专业上让你尴尬；你围绕它建立了一个有意义的社区；它与你当前的个人品牌一致——那么可以保留。</p>\n<h2>做出决定</h2>\n<p>问自己：这个账户仍然为我服务，还是为曾经的我服务？如果答案是后者，大扫除可能是你数字未来最健康的选择。</p>",
    "canonical": "/blog/brand-mascot-accounts-cleaning",
    "titleEn": "Brand Mascot Accounts: Cleaning the Cute Ones",
    "excerptEn": "Brand mascot accounts are your digital alter egos — and part of your footprint. Three cleaning strategies help you decide what to keep.",
    "categoryEn": "Risk Scenarios",
    "tagsEn": [
      "brand account cleanup",
      "mascot account tweets",
      "persona accounts",
      "digital footprint"
    ],
    "contentEn": "<p>We all have them. That Twitter account dedicated to your favorite band. The one where you posted 37 retweets of your celebrity crush in a single month. The account that exists purely for fandom, humor, or that weird hobby you discovered in 2019 and never abandoned.</p>\n<h2>Why Mascot Accounts Are Tricky to Clean</h2>\n<p>Unlike your professional LinkedIn or your serious Twitter account, mascot accounts carry emotional weight. You spent years building that persona. The inside jokes, the community you found, the creative expression — it all feels personal. But here's the thing: that account is still part of your digital history. Future employers, partners, or anyone who Googles you will see it.</p>\n<h2>The Mascot Account Audit</h2>\n<p>Before you delete anything, do a quick audit:</p>\n<ul>\n<li><strong>Date your oldest posts.</strong> How long has this account been active? Is it worth maintaining?</li>\n<li><strong>Check your follower count.</strong> Are there people who genuinely know you through this account?</li>\n<li><strong>Review your most-retweeted content.</strong> Would you stand by these posts today?</li>\n<li><strong>Consider the worst-case scenario.</strong> If a future employer found this account, would it hurt your chances?</li>\n</ul>\n<h2>Three Cleaning Strategies</h2>\n<p><strong>Strategy 1: The Archive-and-Let-Go.</strong> Download your data, make the account private or inactive, and move on. This preserves your digital history without exposing it publicly.</p>\n<p><strong>Strategy 2: The Purge.</strong> Delete the most problematic posts, keep the benign ones, and let the account fade naturally. Good for accounts with mixed content.</p>\n<p><strong>Strategy 3: The Nuclear Option.</strong> Delete everything and start fresh. Best for accounts that have become liabilities rather than assets.</p>\n<h2>The Psychology of Letting Go</h2>\n<p>Cleaning up mascot accounts feels harder than it should because of something psychologists call the \"endowment effect.\" We value things more highly simply because we own them. But digital hoarding is real. Every old post, every embarrassing retweet is potential reputational risk.</p>\n<h2>When to Keep a Mascot Account</h2>\n<p>Not all mascot accounts need cleaning. Keep yours if it's a genuine creative outlet that brings you joy, the content is age-appropriate, you've built a meaningful community around it, and it aligns with your current personal brand.</p>\n<h2>Making the Decision</h2>\n<p>Ask yourself: does this account still serve me, or does it serve someone I used to be? If the answer is the latter, a clean sweep might be the healthiest choice for your digital future.</p>",
    "faq": [
      {
        "q": "什么是品牌吉祥物账号？",
        "a": "指你为某个兴趣、偶像或梗专门开设的账号（如粉丝号、段子号），它们构成你数字足迹中\"非职业\"的一面。",
        "qEn": "What is a brand mascot account?",
        "aEn": "A social account you created purely for a fandom, hobby, or joke — a \"digital alter ego\" that is still part of your public footprint."
      },
      {
        "q": "清理吉祥物账号会损害我的职业形象吗？",
        "a": "恰恰相反。有策略地清理掉不合时宜的内容，能让未来的雇主或合作伙伴看到更一致、更成熟的你。",
        "qEn": "Will cleaning mascot accounts hurt my professional image?",
        "aEn": "No — intentional cleanup of out-of-character content presents a more consistent, mature version of you to employers and partners."
      },
      {
        "q": "我该删除还是保留？",
        "a": "取决于账号内容是否仍然代表你。如果它只是旧习惯和遗憾，归档或删除更健康；如果是真正的创作出口且内容得体，可以保留。",
        "qEn": "Should I delete or keep them?",
        "aEn": "It depends on whether the account still represents you. If it is just old habits and regret, archive or delete. If it is a genuine creative outlet with appropriate content, keep it."
      }
    ]
  },
  {
    "slug": "creator-interview-12000-tweets",
    "title": "数字足迹体检访谈：他删掉了 12,437 条推文",
    "excerpt": "Marcus Chen 用三个月删除了 12,437 条推文。这不是羞愧，而是有意为之。听听他的清理逻辑。",
    "date": "2026-09-02",
    "updatedAt": "2026-09-02",
    "author": "Digital Footprint Health Team",
    "category": "risk-scenarios",
    "tags": [
      "清理访谈",
      "删除推文",
      "数字极简",
      "用户故事"
    ],
    "content": "<p>Marcus Chen 在三个月内删除了 12,437 条推文。不是因为羞愧——而是因为他是故意的。</p>\n<h2>决定</h2>\n<p>Marcus 并不是要清理他的整个 Twitter 存在。他从小处开始——删除他早期代表谁不再的推文。但潮水很快转变。\"一个删除导致另一个。在我意识到之前，我正在浏览多年的内容，做出什么保留什么去的选择。\"</p>\n<h2>过程</h2>\n<p>Marcus 使用了 TweetDelete，一个允许批量删除的工具。但他并没有对所有内容点击删除。他是战略性的：</p>\n<ul>\n<li><strong>第一阶段：明显的</strong>——争议内容的转发、与陌生人的争论、来自他\"尖刻\"阶段的帖子。</li>\n<li><strong>第二阶段：深思熟虑的</strong>——不再反映他观点的推文、失效项目的链接、没有目的的个人抱怨。</li>\n<li><strong>第三阶段：微调</strong>——旧促销内容、太长了的线程、噪音多于信号的帖子。</li>\n</ul>\n<h2>结果</h2>\n<p>\"我感到更轻松，\"Marcus 承认。\"不是因为我在隐藏什么，而是因为我不再带着 10 年的数字行李。\"</p>\n<h2>他学到的</h2>\n<p><strong>1. 数字极简主义是情感劳动。</strong>清理推文像清理衣橱，你会意识到积累了多少无意的东西。</p>\n<p><strong>2. 互联网记得，但你可以策展。</strong>你不必删除一切，但你有权利塑造你的数字叙事。</p>\n<p><strong>3. 现在开始永远不晚。</strong>\"最好的开始时间是当时，第二好的时间是现在。\"</p>\n<h2>给考虑清理的人</h2>\n<p>Marcus 建议从小处开始。选择一个类别——旧转发、争论线程、促销帖子——先清理那个。目标不是抹去历史，是确保你的数字存在反映今天的你。</p>",
    "canonical": "/blog/creator-interview-12000-tweets",
    "titleEn": "Creator Interview: He Deleted 12,437 Tweets",
    "excerptEn": "Marcus Chen deleted 12,437 tweets over three months. Not out of shame — out of intention. Here is his cleanup logic.",
    "categoryEn": "Risk Scenarios",
    "tagsEn": [
      "cleanup interview",
      "deleted tweets",
      "digital minimalism",
      "user story"
    ],
    "contentEn": "<p>Marcus Chen deleted 12,437 tweets over three months. Not because he was ashamed — but because he was intentional.</p>\n<h2>The Decision</h2>\n<p>Marcus didn't set out to clean his entire Twitter presence. He started small — deleting tweets from his early days that no longer represented who he was. But the tide turned quickly. \"One deletion led to another. Before I knew it, I was going through years of content, making choices about what stayed and what went.\"</p>\n<h2>The Process</h2>\n<p>Marcus used TweetDelete, a tool that allows bulk deletion. But he didn't just hit delete on everything. He was strategic:</p>\n<ul>\n<li><strong>Phase 1: The Obvious</strong> — retweets of controversial content, arguments with strangers, posts from his \"edgy\" phase.</li>\n<li><strong>Phase 2: The Thoughtful</strong> — tweets that no longer reflected his views, links to defunct projects, purposeless complaints.</li>\n<li><strong>Phase 3: The Fine-tuning</strong> — old promotional content, threads that got too long, posts that were more noise than signal.</li>\n</ul>\n<h2>The Result</h2>\n<p>\"I feel lighter,\" Marcus admits. \"Not because I'm hiding anything, but because I'm not carrying around 10 years of digital baggage.\"</p>\n<h2>What He Learned</h2>\n<p><strong>1. Digital minimalism is emotional labor.</strong> Cleaning tweets feels like cleaning your closet — you realize how much you accumulated without meaning to.</p>\n<p><strong>2. The internet remembers, but you can curate.</strong> You don't have to delete everything. But you have the right to shape your digital narrative.</p>\n<p><strong>3. It's never too late to start.</strong> \"The best time to start was then, the second best is now.\"</p>\n<h2>For Those Considering Cleanup</h2>\n<p>Marcus recommends starting small. Pick one category — old retweets, argument threads, promotional posts — and clean that first. The goal isn't to erase your history. It's to make sure your digital presence reflects who you are today.</p>",
    "faq": [
      {
        "q": "批量删除推文安全吗？",
        "a": "使用像 TweetDelete 这类成熟工具是安全的，它们只操作你授权范围内的内容。删除前先下载你的数据归档作为备份。",
        "qEn": "Is bulk-deleting tweets safe?",
        "aEn": "Using a mature tool like TweetDelete is safe — it only acts on content you authorize. Download your data archive as a backup first."
      },
      {
        "q": "删除后还能恢复吗？",
        "a": "通常不能。X 只能删除最近约 3,200 条推文，旧的只能通过数据归档访问；一旦删除，帖子基本不可恢复。",
        "qEn": "Can deleted tweets be recovered?",
        "aEn": "Usually not. X lets you delete only the most recent ~3,200 tweets; once deleted, posts are essentially unrecoverable."
      },
      {
        "q": "应该从哪里开始清理？",
        "a": "从一个具体类别开始——比如旧转发、争论线程或促销内容——先清理那一类，建立动力后再扩大范围。",
        "qEn": "Where should I start cleaning?",
        "aEn": "Start with one specific category — old retweets, argument threads, or promo posts — clean that first, build momentum, then expand."
      }
    ]
  },
  {
    "slug": "data-ethics-footprint-tools",
    "title": "数字足迹工具的 data ethics：谁来保护你的隐私？",
    "excerpt": "数字足迹工具承诺隐私，但当它们分析你的数据时，谁来保护你的隐私？看清承诺与现实的差距。",
    "date": "2026-09-02",
    "updatedAt": "2026-09-02",
    "author": "Digital Footprint Health Team",
    "category": "risk-scenarios",
    "tags": [
      "数据伦理",
      "隐私工具",
      "工具评测",
      "数据安全"
    ],
    "content": "<p>数字足迹工具承诺隐私。但当他们分析你的数据时，谁来保护你的隐私？</p>\n<h2>承诺与现实</h2>\n<p>工具声称：处理后删除你的数据；从不存储你的信息；使用加密确保安全。但声明不是保证。没有监管，几乎没有问责制。</p>\n<h2>寻找什么</h2>\n<p><strong>透明度：</strong>工具是否清楚解释收集什么数据、如何使用？模糊的隐私政策是危险信号。</p>\n<p><strong>数据保留：</strong>处理后立即删除，还是无限期存储？寻找明确的删除政策。</p>\n<p><strong>加密：</strong>数据在传输和静态时是否加密？</p>\n<p><strong>开源：</strong>你能验证代码吗？开源工具允许独立安全审计。</p>\n<p><strong>不卖数据：</strong>工具从你的数据赚钱，还是从订阅费赚钱？商业模式揭示意图。</p>\n<h2>悖论</h2>\n<p>一些清理工具收集的数据比它们删除的更多。它们扫描你的整个历史，创建详细报告，并可能保留信息用于\"服务改进\"。这创造了一个悖论：旨在保护你隐私的工具本身成为隐私风险。</p>\n<h2>如何保持安全</h2>\n<ul>\n<li>阅读隐私政策，而不只是浏览。</li>\n<li>使用最小权限，清理后撤销访问。</li>\n<li>选择声誉良好的工具。</li>\n<li>敏感账户考虑手动删除。</li>\n<li>发邮件询问公司的数据实践。</li>\n</ul>\n<h2>伦理清理</h2>\n<p>数字清理应遵循与物理清理相同的原则：只拿走你需要的，负责任地使用，不留痕迹。</p>",
    "canonical": "/blog/data-ethics-footprint-tools",
    "titleEn": "The Data Ethics of Footprint Tools",
    "excerptEn": "Digital footprint tools promise privacy. But who protects your privacy while they analyze your data? See the gap between promise and reality.",
    "categoryEn": "Risk Scenarios",
    "tagsEn": [
      "data ethics",
      "privacy tools",
      "tool review",
      "data security"
    ],
    "contentEn": "<p>Digital footprint tools promise privacy. But who protects your privacy while they analyze your data?</p>\n<h2>The Promise vs. The Reality</h2>\n<p>Tools claim to: delete your data after processing; never store your information; use encryption for security. But claims aren't guarantees. Without regulation, there's little accountability.</p>\n<h2>What to Look For</h2>\n<p><strong>Transparency:</strong> Does the tool clearly explain what data they collect and how they use it? Vague privacy policies are red flags.</p>\n<p><strong>Data retention:</strong> Do they delete your data immediately after processing, or store it indefinitely? Look for clear deletion policies.</p>\n<p><strong>Encryption:</strong> Is your data encrypted in transit and at rest?</p>\n<p><strong>Open source:</strong> Can you verify the code? Open-source tools allow independent security audits.</p>\n<p><strong>No data selling:</strong> Does the tool make money from your data, or from subscription fees? The business model reveals intent.</p>\n<h2>The Paradox</h2>\n<p>Some cleanup tools collect more data than they delete. They scan your entire history, create detailed reports, and may retain that information for \"service improvement.\" This creates a paradox: the tool designed to protect your privacy becomes a privacy risk itself.</p>\n<h2>How to Stay Safe</h2>\n<ul>\n<li>Read the privacy policy, not just skim it.</li>\n<li>Use minimal permissions and revoke access after cleanup.</li>\n<li>Choose reputable tools.</li>\n<li>For sensitive accounts, consider manual deletion.</li>\n<li>Email the company and ask about their data practices.</li>\n</ul>\n<h2>The Ethical Cleanup</h2>\n<p>Digital cleanup should follow the same principles as physical cleanup: take only what you need, use it responsibly, and leave no trace behind.</p>",
    "faq": [
      {
        "q": "清理工具会把我数据卖给第三方吗？",
        "a": "不一定，但你应当查看其商业模式。靠订阅费盈利的工具通常比靠数据变现的更值得信任；直接询问公司并阅读隐私政策是关键。",
        "qEn": "Will a cleanup tool sell my data to third parties?",
        "aEn": "Not necessarily, but check the business model. Tools that earn from subscriptions are generally more trustworthy than those monetizing data — ask the company and read the policy."
      },
      {
        "q": "怎么判断一个工具是否真的本地处理？",
        "a": "打开浏览器 DevTools 的 Network 标签，上传或分析文件时观察是否有任何网络请求发出。真正本地处理的工具应该是零请求。",
        "qEn": "How do I tell if a tool really processes locally?",
        "aEn": "Open your browser DevTools Network tab and watch for any network requests while uploading or analyzing files. A truly local tool shows zero requests."
      },
      {
        "q": "开源工具一定更安全吗？",
        "a": "开源允许独立安全审计，透明度更高，但\"开源\"不等于\"无数据收集\"。仍需结合隐私政策和数据保留政策综合判断。",
        "qEn": "Are open-source tools always safer?",
        "aEn": "Open source enables independent audits and is more transparent, but \"open source\" is not the same as \"no data collection.\" Still review the privacy and retention policy."
      }
    ]
  },
  {
    "slug": "2027-digital-privacy-trends",
    "title": "2027 数字隐私趋势：6 个你必须知道的变化",
    "excerpt": "数字隐私格局正在快速转变。从 AI 监控到数据最小化立法，以下是 2027 年你需要预期的 6 大趋势。",
    "date": "2026-09-02",
    "updatedAt": "2026-09-02",
    "author": "Digital Footprint Health Team",
    "category": "risk-scenarios",
    "tags": [
      "隐私趋势",
      "2027",
      "AI 监控",
      "数据最小化"
    ],
    "content": "<p>数字隐私格局正在快速转变。五年前可接受的事情今天越来越多受到质疑。以下是 2027 年的预期。</p>\n<h2>趋势 1：AI 监控走向主流</h2>\n<p>AI 驱动的面部识别和行为追踪正变得无处不在。从零售店到公共空间，算法正在学习识别和预测人类行为。</p>\n<h2>趋势 2：数据最小化成为法律</h2>\n<p>GDPR 的数据最小化原则正在全球传播。2027 年的新法律将要求公司只在需要时收集数据，并在完成后删除它。</p>\n<h2>趋势 3：浏览器隐私战争加剧</h2>\n<p>Mozilla、Apple 和 Google 正在竞争提供最有私密的浏览体验。第三方 cookie 消除、指纹保护将定义 2027 年。</p>\n<h2>趋势 4：数字遗产规划出现</h2>\n<p>随着数字生活扩张，规划死后发生的事情的需求也在扩大。数字遗嘱、数据继承和死后隐私控制正从利基走向主流。</p>\n<h2>趋势 5：隐私优先平台获得关注</h2>\n<p>Signal、ProtonMail 和隐私焦点搜索引擎正在看到增加采用。用户正在意识到\"免费\"服务的成本。</p>\n<h2>趋势 6：AI 数据权利出现</h2>\n<p>随着 AI 模型消费更多个人数据，围绕数据使用、同意和补偿的新权利正在出现。</p>\n<h2>保持领先</h2>\n<p>2027 年最好的隐私策略不仅仅是工具——它是关于意识。了解你分享什么数据、为什么分享以及存在什么替代方案。</p>",
    "canonical": "/blog/2027-digital-privacy-trends",
    "titleEn": "2027 Digital Privacy Trends: 6 Changes to Know",
    "excerptEn": "The digital privacy landscape is shifting fast. From AI surveillance to data-minimization laws, here are 6 trends to expect in 2027.",
    "categoryEn": "Risk Scenarios",
    "tagsEn": [
      "privacy trends",
      "2027",
      "AI surveillance",
      "data minimization"
    ],
    "contentEn": "<p>The digital privacy landscape is shifting fast. What was acceptable five years ago is increasingly questioned today. Here is what to expect in 2027.</p>\n<h2>Trend 1: AI Surveillance Goes Mainstream</h2>\n<p>AI-powered facial recognition and behavioral tracking are becoming ubiquitous. From retail stores to public spaces, algorithms are learning to identify and predict human behavior.</p>\n<h2>Trend 2: Data Minimization Becomes Law</h2>\n<p>The GDPR's data minimization principle is spreading globally. New 2027 laws will require companies to collect only what they need, when they need it, and delete it when done.</p>\n<h2>Trend 3: Browser Privacy Wars Intensify</h2>\n<p>Mozilla, Apple, and Google are competing to offer the most private browsing experience. Third-party cookie elimination and fingerprinting protection will define 2027.</p>\n<h2>Trend 4: Digital Legacy Planning Emerges</h2>\n<p>As digital lives expand, so does the need to plan for what happens after death. Digital wills, data inheritance, and posthumous privacy controls are moving from niche to mainstream.</p>\n<h2>Trend 5: Privacy-First Platforms Gain Traction</h2>\n<p>Signal, ProtonMail, and privacy-focused search engines are seeing increased adoption. Users are waking up to the cost of \"free\" services.</p>\n<h2>Trend 6: AI Data Rights Emerge</h2>\n<p>As AI models consume more personal data, new rights are emerging around data use, consent, and compensation.</p>\n<h2>Staying Ahead</h2>\n<p>The best privacy strategy in 2027 isn't just about tools — it's about awareness. Understand what data you share, why you share it, and what alternatives exist.</p>",
    "faq": [
      {
        "q": "数据最小化法律对我有什么影响？",
        "a": "它限制公司过度收集你的数据。对你而言，意味着更少的无谓追踪、更短的数据保留期，以及更强的\"被遗忘\"权利。",
        "qEn": "How does data-minimization law affect me?",
        "aEn": "It limits how much companies can collect. For you it means less needless tracking, shorter retention, and stronger erasure rights."
      },
      {
        "q": "AI 监控能被阻止吗？",
        "a": "完全阻止很难，但你可以通过隐私优先的平台、浏览器反指纹设置和本地工具减少被追踪的面。",
        "qEn": "Can AI surveillance be stopped?",
        "aEn": "Fully stopping it is hard, but you can shrink your tracking surface with privacy-first platforms, anti-fingerprinting browsers, and local tools."
      },
      {
        "q": "我该为 2027 做哪些准备？",
        "aEn": "What should I prepare for 2027?",
        "a": "提升隐私意识：定期进行数字足迹体检、收紧社交媒体隐私设置、对\"免费\"服务保持警惕，并关注 AI 数据权利的新规。",
        "qEn": "Raise your privacy awareness: run regular footprint checks, tighten social privacy settings, stay skeptical of \"free\" services, and watch new AI data-rights rules."
      }
    ]
  },
  {
    "slug": "year-end-deletion-review",
    "title": "年终删除复盘：2026 年大家都在删什么",
    "excerpt": "随着 2026 年接近尾声，回顾人们从数字生活中清理的内容：社交账号、照片、邮件与 App。",
    "date": "2026-09-02",
    "updatedAt": "2026-09-02",
    "author": "Digital Footprint Health Team",
    "category": "risk-scenarios",
    "tags": [
      "年终复盘",
      "删除统计",
      "数字清理",
      "清理趋势"
    ],
    "content": "<p>随着 2026 年接近尾声，是时候回顾一下人们从数字生活中清理的内容了。趋势揭示了一些事情。</p>\n<h2>2026 年的大删除</h2>\n<p><strong>社交媒体清理。</strong>更多用户选择删除整个账号而不是管理多个平台。TikTok、Twitter/X 和 Instagram 看到最高的删除率。</p>\n<p><strong>照片档案。</strong>云存储费用推动人们审查和删除旧照片。平均每个人有 3,000+ 张存储的照片。</p>\n<p><strong>电子邮件收件箱。</strong>用户更积极地采用\"收件箱零\"理念，单次会话删除数月或数年的未读消息。</p>\n<p><strong>应用程序收藏。</strong>智能手机平均每用户 80+ 个应用程序，但大多数很少使用。删除率比 2025 年增加 40%。</p>\n<h2>删除背后的动机</h2>\n<ul>\n<li><strong>隐私担忧</strong>——数据泄露和监控推动删除。</li>\n<li><strong>数字极简主义</strong>——人们质疑每个应用是否增添价值。</li>\n<li><strong>心理健康</strong>——社交比较和通知焦虑推动更清洁的数字生活。</li>\n<li><strong>职业形象</strong>——求职者和专业人士清理可能影响职业前景的旧内容。</li>\n</ul>\n<h2>推动删除的工具</h2>\n<p>批量删除工具在 2026 年看到记录使用量。TweetDelete、Social Media Cleaner 和各种邮件清理服务报告大幅增长。</p>\n<h2>展望 2027 年</h2>\n<p>数字清理的趋势没有放缓的迹象。随着数字疲劳加剧、隐私担忧增长，它只会加速。</p>\n<h2>结论</h2>\n<p>2026 是数字清理年。问题不是\"我能删除多少？\"而是\"我真正需要什么？\"</p>",
    "canonical": "/blog/year-end-deletion-review",
    "titleEn": "Year-End Review: What Everyone Deleted in 2026",
    "excerptEn": "As 2026 winds down, a look at what people cleaned from their digital lives: social accounts, photos, inboxes, and apps.",
    "categoryEn": "Risk Scenarios",
    "tagsEn": [
      "year-end review",
      "deletion stats",
      "digital cleanup",
      "cleanup trends"
    ],
    "contentEn": "<p>As 2026 comes to a close, it is time to look back at what people are cleaning up from their digital lives. The trends are revealing.</p>\n<h2>The Big Deletions of 2026</h2>\n<p><strong>Social Media Purges.</strong> More users are deleting entire accounts rather than managing multiple platforms. TikTok, Twitter/X, and Instagram saw the highest deletion rates.</p>\n<p><strong>Photo Archives.</strong> Cloud storage fees are pushing people to review and delete old photos. The average person has 3,000+ stored photos.</p>\n<p><strong>Email Inboxes.</strong> Users are adopting \"inbox zero\" more aggressively, deleting months or years of unread messages in single sessions.</p>\n<p><strong>App Collections.</strong> Smartphones now average 80+ apps per user, but most are used infrequently. App deletion rates rose 40% versus 2025.</p>\n<h2>The Motivations Behind the Delete</h2>\n<ul>\n<li><strong>Privacy Concerns</strong> — breaches and surveillance drive deletion.</li>\n<li><strong>Digital Minimalism</strong> — people question whether each app adds value.</li>\n<li><strong>Mental Health</strong> — social comparison and notification anxiety push toward cleaner digital lives.</li>\n<li><strong>Professional Image</strong> — job seekers and professionals clean old content that could affect careers.</li>\n</ul>\n<h2>The Tools Driving Deletion</h2>\n<p>Bulk deletion tools saw record usage in 2026. TweetDelete, Social Media Cleaner, and various email cleanup services reported massive growth.</p>\n<h2>Looking Ahead to 2027</h2>\n<p>The trend toward digital cleanup shows no signs of slowing. As digital fatigue grows and privacy concerns rise, it will only accelerate.</p>\n<h2>The Bottom Line</h2>\n<p>2026 is the year of the digital cleanout. The question is not \"how much can I delete?\" but \"what do I actually need?\"</p>",
    "faq": [
      {
        "q": "2026 年人们删得最多的是什么？",
        "a": "依次是整个社交媒体账号、旧照片档案、邮件收件箱里的未读消息，以及长期不用的 App。隐私担忧和数字疲劳是主要驱动力。",
        "qEn": "What did people delete most in 2026?",
        "aEn": "In order: whole social accounts, old photo archives, unread inbox messages, and long-unused apps — driven by privacy concerns and digital fatigue."
      },
      {
        "q": "年终清理有什么好处？",
        "a": "减轻心理负担、降低隐私暴露面、提升设备性能，并让职业形象更可控。一次彻底的清理比持续囤积更健康。",
        "qEn": "What are the benefits of a year-end cleanup?",
        "aEn": "Less mental load, a smaller privacy surface, better device performance, and a more controllable professional image. A thorough cleanup beats endless hoarding."
      },
      {
        "q": "我应该从哪里开始年终清理？",
        "a": "从最高风险的内容入手：旧的社交媒体帖子、云端的敏感照片、订阅邮件，以及不再使用的 App。一次一类，逐步推进。",
        "qEn": "Where should I start my year-end cleanup?",
        "aEn": "Start with the highest-risk content: old social posts, sensitive cloud photos, subscription emails, and unused apps. One category at a time."
      }
    ]
  }
];

export function getPost(slug: string): BlogPost | undefined {
  return allPosts.find((p) => p.slug === slug);
}
