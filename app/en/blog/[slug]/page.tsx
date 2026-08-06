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
  const title = post.titleEn ?? post.title;
  return {
    title: `${title} | Digital Footprint Health Report`,
    description: post.excerptEn ?? post.excerpt,
    alternates: {
      canonical: `/en/blog/${slug}`,
      languages: { en: `/en/blog/${slug}`, zh: post.canonical },
    },
    openGraph: {
      title,
      description: post.excerptEn ?? post.excerpt,
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

  const title = post.titleEn ?? post.title;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': ['Article', 'HowTo'],
    headline: title,
    description: post.excerptEn ?? post.excerpt,
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
    image: SITE_URL + '/opengraph-image.png',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/en/blog/${post.slug}`,
    },
    name: title,
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Delete manually one by one', text: 'The most direct way, but very time-consuming. Each tweet needs: tap ⋮ → delete → confirm.' },
      { '@type': 'HowToStep', position: 2, name: 'Use a third-party cloud service', text: 'Bulk-delete via OAuth authorization to a third-party tool — simple, but with a data-upload risk.' },
      { '@type': 'HowToStep', position: 3, name: 'Browser extension', text: 'Run in your local browser via a Chrome extension — safer than cloud services.' },
      { '@type': 'HowToStep', position: 4, name: 'X archive + local solution', text: 'Download your full X archive, parse it locally, then bulk-delete — safest and most complete coverage.' },
      { '@type': 'HowToStep', position: 5, name: 'Write your own Python script', text: 'Write a custom deletion script via the X API v2 — full control, but requires coding ability.' },
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
          { label: title, href: `/en/blog/${post.slug}` },
        ]} />

        <header>
          <div className="flex items-center gap-2 text-t-7 text-ink-soft mb-3">
            <span>{post.categoryEn ?? post.category}</span>
            <span>·</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            <span>·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="t-1 font-bold">{title}</h1>
        </header>

        <div
          className="prose prose-neutral max-w-none [&_h2]:t-3 [&_h2]:font-bold [&_h2]:mt-8 [&_h3]:t-5 [&_h3]:font-semibold [&_h3]:mt-6 [&_p]:t-5 [&_p]:leading-relaxed [&_p]:text-ink-soft [&_ul]:space-y-1.5 [&_ol]:space-y-1.5 [&_li]:t-5 [&_li]:text-ink-soft [&_table]:w-full [&_table]:border-collapse [&_th]:bg-primary-weak [&_th]:text-left [&_th]:p-2 [&_th]:t-6 [&_td]:border [&_td]:border-line [&_td]:p-2 [&_td]:t-6"
          dangerouslySetInnerHTML={{ __html: post.contentEn ?? post.content }}
        />

        <footer className="border-t border-line pt-6 flex flex-wrap gap-2">
          {(post.tagsEn ?? post.tags).map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-primary-weak px-3 py-0.5 text-t-7 text-primary"
            >
              #{tag}
            </span>
          ))}
        </footer>
      </article>
    </>
  );
}
