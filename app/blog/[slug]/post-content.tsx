'use client';

import Link from 'next/link';
import { allPosts, type BlogPost } from '@/content/posts';
import { useI18n } from '@/components/I18nProvider';
import { SITE_URL } from '@/lib/site';

/**
 * Client-rendered blog post body. Kept as a client component because the
 * language is resolved client-side (route prefix + localStorage/browser
 * fallback); the page shell in ./page.tsx is a server component that owns
 * the per-post generateMetadata.
 */
export function BlogPostContent({ post, slug }: { post: BlogPost; slug: string }) {
  const { lang } = useI18n();

  const content = lang === 'en' ? (post.contentEn || post.content) : post.content;
  const title = lang === 'en' ? (post.titleEn || post.title) : post.title;
  const category = lang === 'en' ? (post.categoryEn || post.category) : post.category;
  const tags = lang === 'en' ? (post.tagsEn || post.tags) : post.tags;

  // FAQ in the current language (fall back to the other language when absent).
  const faqs = (post.faq || []).map((f) =>
    lang === 'en'
      ? { q: f.qEn || f.q, a: f.aEn || f.a }
      : { q: f.q, a: f.a },
  );

  const jsonLd: Record<string, unknown>[] = [
    {
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
    },
  ];

  if (faqs.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  // Related posts: same category first, then shared tags; exclude current post.
  const related = allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const score =
        (p.category === post.category ? 2 : 0) +
        (p.tags.some((t) => post.tags.includes(t)) ? 1 : 0);
      return { post: p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.post);

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      {jsonLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}
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

      {faqs.length > 0 && (
        <section className="mt-12 rounded-2xl border border-border bg-card p-6">
          <h2 className="text-xl font-bold mb-4">
            {lang === 'en' ? 'Frequently Asked Questions' : '常见问题'}
          </h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <details
                key={i}
                className="rounded-xl border border-border bg-background px-4 py-3"
                itemScope
                itemType="https://schema.org/Question"
              >
                <summary className="cursor-pointer font-semibold" itemProp="name">
                  {f.q}
                </summary>
                <p
                  className="mt-2 text-sm text-muted leading-relaxed"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <span itemProp="text">{f.a}</span>
                </p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA: internal link back to the tool */}
      <section className="mt-10 rounded-2xl bg-accent/10 border border-accent/20 p-6 text-center">
        <h2 className="text-lg font-bold">
          {lang === 'en' ? 'Check your own X/Twitter footprint' : '检查你自己的 X/Twitter 数字足迹'}
        </h2>
        <p className="mt-1 text-sm text-muted">
          {lang === 'en'
            ? 'Free on-device scan. Your archive never leaves your computer.'
            : '免费本机扫描，你的归档永不离开电脑。'}
        </p>
        <Link
          href="/upload"
          className="mt-4 inline-flex items-center justify-center rounded-xl px-5 py-2.5 font-semibold bg-primary text-white hover:brightness-95"
        >
          {lang === 'en' ? 'Start Free Check' : '免费开始体检'}
        </Link>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">
            {lang === 'en' ? 'Related Reads' : '相关阅读'}
          </h2>
          <div className="space-y-3">
            {related.map((p) => {
              const rTitle = lang === 'en' ? (p.titleEn || p.title) : p.title;
              const rExcerpt = lang === 'en' ? (p.excerptEn || p.excerpt) : p.excerpt;
              return (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block p-4 rounded-xl border border-border hover:border-accent transition-colors bg-card"
                >
                  <h3 className="font-semibold hover:text-accent">{rTitle}</h3>
                  <p className="text-sm text-muted mt-1 line-clamp-2">{rExcerpt}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

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
