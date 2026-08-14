'use client';

import Link from 'next/link';
import type { BlogPost } from '@/content/posts';
import { useI18n } from '@/components/I18nProvider';

/**
 * Client-rendered blog index. The page shell in ./page.tsx is a server
 * component that owns metadata + JSON-LD; this component keeps the
 * client-side language switching intact.
 */
export function BlogList({ posts }: { posts: BlogPost[] }) {
  const { lang } = useI18n();

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">
        {lang === 'en' ? 'Blog' : '博客'}
      </h1>
      <div className="space-y-8">
        {posts.map(post => {
          const title = lang === 'en' ? (post.titleEn || post.title) : post.title;
          const excerpt = lang === 'en' ? (post.excerptEn || post.excerpt) : post.excerpt;
          const category = lang === 'en' ? (post.categoryEn || post.category) : post.category;
          const href = `/blog/${post.slug}`;
          return (
            <Link
              key={post.slug}
              href={href}
              className="block p-6 rounded-lg border border-border hover:border-accent transition-colors bg-card"
            >
              <div className="flex items-center gap-3 text-sm text-muted mb-2">
                <span className="px-2 py-1 rounded bg-accent/10 text-accent">{category}</span>
                <span>{post.date}</span>
              </div>
              <h2 className="text-xl font-semibold mb-2 hover:text-accent">{title}</h2>
              <p className="text-muted">{excerpt}</p>
            </Link>
          );
        })}
      </div>
    </article>
  );
}
