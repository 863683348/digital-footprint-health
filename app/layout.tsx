import './globals.css';
import type { Metadata, Viewport } from 'next';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { I18nProvider } from '@/components/I18nProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: '数字足迹体检报告 · Digital Footprint Health Report',
  description:
    '本地生成你的 Twitter/X 数字足迹体检报告，识别隐私风险，按需清理历史推文。 / Generate a local privacy health report for your Twitter/X archive.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Digital Footprint Health Report',
    title: '数字足迹体检报告 · Digital Footprint Health Report',
    description:
      '上传你的 X 归档，本机生成隐私体检报告，标出含手机号、住址、定位等风险的推文，并可按需批量删除。',
    locale: 'zh_CN',
  },
  twitter: {
    card: 'summary_large_image',
    title: '数字足迹体检报告 · Digital Footprint Health Report',
    description:
      '上传你的 X 归档，本机生成隐私体检报告，标出隐私风险推文，并可按需批量删除。',
  },
};

// Set the theme class before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('dfh.theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
