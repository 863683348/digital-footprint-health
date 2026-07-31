import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { I18nProvider } from '@/components/I18nProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SITE_URL } from '@/lib/site';

// Google AdSense publisher id (ca-pub-xxxxxxxx). Empty in local dev / before
// the user configures it — the loader script is skipped and AdUnit renders null.
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '数字足迹体检报告 | 在线检查 Twitter/X 隐私泄露 批量删除旧推文',
  description:
    '免费上传你的 X/Twitter 归档文件，本地生成隐私体检报告，自动检测手机号、地址、定位等风险推文，一键批量删除。数据全程不出本机，报告即时可得。',
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/',
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Digital Footprint Health Report',
    title: '数字足迹体检报告 | 在线检查 Twitter/X 隐私泄露 批量删除旧推文',
    description:
      '免费上传你的 X/Twitter 归档文件，本地生成隐私体检报告，自动检测手机号、地址、定位等风险推文，一键批量删除。数据全程不出本机。',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: '数字足迹体检报告 - Digital Footprint Health Report',
      },
    ],
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '数字足迹体检报告 | 在线检查 Twitter/X 隐私泄露 批量删除旧推文',
    description:
      '免费上传你的 X/Twitter 归档文件，本地生成隐私体检报告，自动检测风险推文，一键批量删除。数据不出本机。',
    images: ['/opengraph-image.png'],
  },
};

// Set the theme class before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('dfh.theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

// Set <html lang> + <title> before paint based on the route, so the browser
// tab / SEO sees the right language immediately (route + lang stay in sync).
const langScript = `(function(){try{var en=location.pathname.indexOf('/en')===0;var saved=localStorage.getItem('dfh.lang');var lang=en?'en':(saved||'zh');document.documentElement.lang=lang==='en'?'en':'zh-CN';}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: langScript }} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4Q62GFVX40"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-4Q62GFVX40');`}
        </Script>
        {ADSENSE_CLIENT && (
          <Script
            id="adsbygoogle-client"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          />
        )}
      </head>
      <body>
        <ThemeProvider>
          <I18nProvider>
            <NavBar />
            <main className="min-h-[70vh] max-w-[1040px] mx-auto px-4 py-6 sm:py-8">{children}</main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};
