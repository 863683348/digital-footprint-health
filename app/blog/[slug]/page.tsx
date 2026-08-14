import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { allPosts, getPost } from '@/content/posts';
import { SITE_URL } from '@/lib/site';
import { BlogPostContent } from './post-content';

interface PostParams {
  params: Promise<{ slug: string }>;
}

// Static blog: pre-render every post at build time so each URL is a static
// page with its own metadata (title/description/canonical/OG/Twitter).
export function generateStaticParams() {
  return allPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostParams): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  // post.canonical is a relative path (e.g. /blog/what-is-digital-footprint-check);
  // absolute it against the production origin so canonical/OG URLs never drift.
  const url = `${SITE_URL}${post.canonical}`;
  const title = post.title;
  const description = post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: PostParams) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return <BlogPostContent post={post} slug={slug} />;
}
