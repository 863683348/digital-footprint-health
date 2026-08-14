'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { use } from 'react';
import { allPosts, getPost } from '@/content/posts';
import { useI18n } from '@/components/I18nProvider';
import { SITE_URL } from '@/lib/site';

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { lang } = useI18n();
  const { slug } = use(params);
  const post = getPost(slug);

  if (!post) notFound();

  const content = lang === 'en' ? (post.contentEn || post.content) : post.content;
  const title = lang === 'en' ? (post.titleEn || post.title) : post.title;
  const category = lang === 'en' ? (post.categoryEn || post.category) : post.category;
  const tags = lang === 'en' ? (post.tagsEn || post.tags) : post.tags;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: lang === 'en' ? post.excerptEn : post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', name: 'Digital Footprint Health' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${post.canonical}` },
    inLanguage: lang === 'en' ? 'en' : 'zh-CN',
  };

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/blog" className="text-sm text-muted hover:text-foreground">&larr; {lang === 'en' ? 'Back to Blog' : '返回博客'}</Link>
      <header className="mt-6 mb-8">
        <div className="flex items-center gap-3 text-sm text-muted mb-3">
          <span className="px-2 py-1 rounded bg-accent/10 text-accent">{category}</span>
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.author}</span>
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {tags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">{tag}</span>
            ))}
          </div>
        )}
      </header>
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <footer className="mt-12 pt-8 border-t border-border">
        <p className="text-sm text-muted">
          {lang === 'en'
            ? `Published on ${post.date}. Last updated ${post.updatedAt}.`
            : `发布于 ${post.date}，最后更新于 ${post.updatedAt}。`
          }
        </p>
      </footer>
    </article>
  );
}
