import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { allPosts } from '@/content/posts';

// Crawlers hit /sitemap.xml frequently; cache the generated route for a day so
// it isn't recomputed on every request (cuts Fast Origin Transfer).
export const revalidate = 86400;

// Build timestamp — update this when you deploy significant content changes.
const BUILD_DATE = '2026-07-27';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/en', priority: 0.9 },
    { path: '/upload', priority: 0.7 },
    { path: '/delete/confirm', priority: 0.7 },
    { path: '/blog', priority: 0.8 },
    { path: '/privacy', priority: 0.5 },
    { path: '/faq', priority: 0.8 },
    { path: '/about', priority: 0.5 },
  ];

  const staticPages = staticRoutes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(BUILD_DATE),
    changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
    priority,
  }));

  const blogPages = allPosts.map((post) => ({
    url: `${SITE_URL}${post.canonical}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
