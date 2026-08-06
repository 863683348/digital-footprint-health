import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allPosts, getPost } from '@/content/posts';
import { SITE_URL } from '@/lib/site';
import { Breadcrumb } from '@/components/Breadcrumb';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | 数字足迹体检报告`,
    description: post.excerpt,
    alternates: { canonical: post.canonical },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 4);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'HowTo'],
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updatedAt,
    author: {
      '@type': 'Organization',
      name: 'Digital Footprint Health Report',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Digital Footprint Health Report',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${post.canonical}`,
    },
    name: post.title,
    step: [
      { '@type': 'HowToStep', position: 1, name: '手动逐条删除', text: '最直接的方式，但耗时可观。每条推文需点击 ⋮ → 删除 → 确认。' },
      { '@type': 'HowToStep', position: 2, name: '使用第三方云服务', text: '通过 OAuth 授权第三方工具批量删除，操作简单但有数据上传风险。' },
      { '@type': 'HowToStep', position: 3, name: '浏览器扩展', text: '使用 Chrome 扩展在本地浏览器中操作，比云服务更安全。' },
      { '@type': 'HowToStep', position: 4, name: '使用 X 归档 + 本地方案', text: '下载 X 完整数据归档，用本地工具解析后批量删除，最安全、覆盖最全。' },
      { '@type': 'HowToStep', position: 5, name: '自写 Python 脚本', text: '通过 X API v2 编写自定义删除脚本，完全可控但需要开发能力。' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <article className="max-w-[720px] mx-auto space-y-6">
        <Breadcrumb items={[
          { labelKey: 'nav.blog', href: '/blog' },
          { label: post.title, href: post.canonical },
        ]} />

        <header>
          <div className="flex items-center gap-2 text-t-7 text-ink-soft mb-3">
            <span>{post.category}</span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="t-1 font-bold">{post.title}</h1>
        </header>

        <div
          className="prose prose-neutral max-w-none [&_h2]:t-3 [&_h2]:font-bold [&_h2]:mt-8 [&_h3]:t-5 [&_h3]:font-semibold [&_h3]:mt-6 [&_p]:t-5 [&_p]:leading-relaxed [&_p]:text-ink-soft [&_ul]:space-y-1.5 [&_ol]:space-y-1.5 [&_li]:t-5 [&_li]:text-ink-soft [&_table]:w-full [&_table]:border-collapse [&_th]:bg-primary-weak [&_th]:text-left [&_th]:p-2 [&_th]:t-6 [&_td]:border [&_td]:border-line [&_td]:p-2 [&_td]:t-6"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <footer className="border-t border-line pt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-primary-weak px-3 py-0.5 text-t-7 text-primary"
            >
              #{tag}
            </span>
          ))}
        </footer>

        <section className="border-t border-line pt-6 mt-6">
          <h2 className="t-3 font-bold mb-3">相关阅读</h2>
          <ul className="space-y-2">
            {relatedPosts.map((p) => (
              <li key={p.slug}>
                <Link href={p.canonical} className="text-primary hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}
