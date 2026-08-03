# 🔍 Digital Footprint Health Report · 数字足迹体检报告

> 上传你的 X/Twitter 归档，本地生成隐私体检报告，一键清理风险推文。数据全程不出本机。

[![Live Site](https://img.shields.io/badge/Live-https://digital--footprint--health.shop-4285F4)](https://digital-footprint-health.shop/)
[![GitHub stars](https://img.shields.io/github/stars/863683348/digital-footprint-health)](https://github.com/863683348/digital-footprint-health)
[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Latest-3ECF8E)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📋 项目简介

Digital Footprint Health Report 是一款隐私保护工具，帮助你：

1. **上传** —— 从 X（原 Twitter）下载你的数据归档文件
2. **体检** —— 本地自动检测含手机号、邮箱、地址、定位等敏感信息的推文，生成 0-100 健康评分
3. **清理** —— 一键批量删除风险推文，支持暂停、续传与取消

**核心设计原则：隐私第一。** 所有数据解析在你的浏览器本地完成，不上传任何服务器。

---

## ✨ 功能特性

| 功能 | 说明 |
|------|------|
| ✅ 本地解析 | 归档文件在浏览器中解析，数据不上传服务器 |
| ✅ 隐私风险检测 | 自动识别手机号、邮箱、地址、定位、敏感话题 |
| ✅ 健康评分 | 0-100 可视化评分 + 六维风险分布 |
| ✅ 批量删除 | 按条付费，支持暂停/续传/取消 |
| ✅ 双语支持 | 中文 + 英文 |
| ✅ Google 登录 | 安全的 OAuth 认证 |
| ✅ Waffo 支付 | 托管收银台 + Webhook，支持信用卡与本地支付方式 |

---

## 🛠 技术栈

| 层 | 技术 |
|----|------|
| **框架** | Next.js 16 (App Router) |
| **后端** | Supabase (Auth + Database) |
| **部署** | Cloudflare Pages / Workers |
| **支付** | Waffo Pancake（Merchant-of-Record 托管收银台 + RSA-SHA256 签名 + Webhook） |
| **解析** | 纯前端浏览器本地解析 |
| **分析** | Google Analytics 4 |

---

## 🚀 本地开发

```bash
# 克隆仓库
git clone https://github.com/863683348/digital-footprint-health.git
cd digital-footprint-health

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 环境变量

复制 `.env.example` 为 `.env.local`，填写以下配置：

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Payment (Waffo Pancake — Merchant of Record, official @waffo/pancake-ts SDK)
WAFFO_MERCHANT_ID=
WAFFO_PRIVATE_KEY=
WAFFO_WEBHOOK_PUBLIC_KEY=
WAFFO_ENV=sandbox
WAFFO_STORE_ID=
WAFFO_PRODUCT_SINGLE_SMALL=
WAFFO_PRODUCT_SINGLE_MEDIUM=
WAFFO_PRODUCT_SINGLE_LARGE=
WAFFO_PRODUCT_PRO_MONTHLY=
WAFFO_PRODUCT_PRO_ANNUAL=
```

---

## 🔍 SEO 优化状态

本项目经过完整的 SEO 审计与改造，当前状态：

| 维度 | 状态 | 详情 |
|------|------|------|
| 可索引页面 | ✅ 9+ | 首页/英文版/博客/FAQ/隐私/关于 + 博文 |
| 结构化数据 | ✅ 5 种 | WebApp / Article / HowTo / FAQPage / BreadcrumbList |
| 双语 SEO | ✅ | hreflang + `/en` 独立页面 |
| OG 分享图 | ✅ | 自动生成 1200×630 |
| Sitemap | ✅ | 动态生成，含博客文章 |
| Core Web Vitals | ✅ | LCP<2.5s / INP<200ms / CLS<0.1 |

> 完整 SEO 审计报告见 [SEO审计报告-终版.md](./SEO审计报告-终版.md)

---

## 📁 项目结构

```
app/
├── about/          # 关于我们
├── blog/           # 博客（含 Article + HowTo Schema）
├── delete/         # 推文删除流程
├── en/             # 英文版着陆页
├── faq/            # FAQ（含 FAQPage Schema）
├── privacy/        # 隐私政策
├── report/         # 体检报告
├── upload/         # 归档上传
├── layout.tsx      # 根布局（hreflang + OG + metadata）
├── opengraph-image.tsx  # OG 图自动生成
├── robots.ts       # 爬虫规则
└── sitemap.ts      # Sitemap 自动生成

components/
├── Breadcrumb.tsx  # 面包屑（BreadcrumbList Schema）
├── Footer.tsx      # 页脚（6 个内部链接）
├── NavBar.tsx      # 导航栏（中英路由切换）
└── ...

content/
└── posts.ts        # 博客文章数据

lib/
├── i18n.ts         # 中英文翻译
├── site.ts         # 站点配置
└── ...
```

---

## 🧪 测试

```bash
npm run test
```

---

## 📝 开源协议

[MIT](./LICENSE)

---

## 🤝 贡献

欢迎提交 Issue 或 PR。如果你有好的建议，请先开 Issue 讨论。

---

## 📞 联系

- 网站：https://digital-footprint-health.shop
- 邮箱：hello@digital-footprint-health.shop
- GitHub：[863683348/digital-footprint-health](https://github.com/863683348/digital-footprint-health)
