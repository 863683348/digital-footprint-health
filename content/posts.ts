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
