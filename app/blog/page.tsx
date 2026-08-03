import type { Metadata } from 'next';
import { allPosts } from '@/content/posts';
import { SITE_URL } from '@/lib/site';
import { Breadcrumb } from '@/components/Breadcrumb';
import { LangLink } from '@/components/LangLink';

export const metadata: Metadata = {
  title: '博客 | 数字足迹与隐私保护指南 — 数字足迹体检报告',
  description:
    '了解数字足迹管理、社交媒体隐私保护和 X/Twitter 账户清理的最佳实践。',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: '博客 | 数字足迹与隐私保护指南',
    description: '了解数字足迹管理、社交媒体隐私保护和 X/Twitter 账户清理的最佳实践。',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
};

export default function BlogIndex() {
  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ labelKey: 'nav.blog', href: '/blog' }]} />
      <h1 className="t-2 font-bold">博客 · 数字足迹与隐私指南</h1>
      <p className="t-5 text-ink-soft max-w-[60ch]">
        从隐私风险识别到社交媒体清理实操，帮你全面管理自己的数字足迹。
      </p>

      <div className="grid gap-6">
        {allPosts.map((post) => (
          <LangLink
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-xl2 border border-line bg-surface p-5 hover:border-primary transition-calm"
          >
            <div className="flex items-center gap-2 text-t-7 text-ink-soft mb-2">
              <span>{post.category}</span>
              <span>·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <h2 className="t-4 font-semibold text-ink mb-2">{post.title}</h2>
            <p className="t-6 text-ink-soft">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full bg-primary-weak px-3 py-0.5 text-t-7 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </LangLink>
        ))}
      </div>

      {allPosts.length === 0 && (
        <p className="t-5 text-ink-soft">还没有文章，敬请期待。</p>
      )}
    </div>
  );
}
