import './globals.css';
import type { Metadata } from 'next';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { I18nProvider } from '@/components/I18nProvider';

export const metadata: Metadata = {
  title: '数字足迹体检报告 · Digital Footprint Health Report',
  description:
    '本地生成你的 Twitter/X 数字足迹体检报告，识别隐私风险，按需清理历史推文。 / Generate a local privacy health report for your Twitter/X archive.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <I18nProvider>
          <NavBar />
          <main className="min-h-[70vh] max-w-[1040px] mx-auto px-4 py-8">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
