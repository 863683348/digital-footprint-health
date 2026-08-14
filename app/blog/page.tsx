import type { Metadata } from 'next';
import { allPosts } from '@/content/posts';
import { SITE_URL } from '@/lib/site';
import { BlogList } from './blog-list';

const PAGE_URL = `${SITE_URL}/blog`;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Guides on protecting your X/Twitter digital footprint: how to check your archive, find tweets that leak personal data, and delete old risky posts.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    url: PAGE_URL,
    title: 'Blog | Digital Footprint Health',
    description:
      'Guides on protecting your X/Twitter digital footprint: how to check your archive, find tweets that leak personal data, and delete old risky posts.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Digital Footprint Health',
    description:
      'Guides on protecting your X/Twitter digital footprint: check your archive, find risky tweets, delete old posts.',
  },
};

export default function BlogPage() {
  const posts = [...allPosts].sort((a, b) => b.date.localeCompare(a.date));

  // Structured data so search engines can treat /blog as a real index page.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Blog',
    url: PAGE_URL,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogList posts={posts} />
    </>
  );
}
