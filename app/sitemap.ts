import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { allPosts } from '@/content/posts';

// Crawlers hit /sitemap.xml frequently; cache the generated route for a day so
// it isn't recomputed on every request (cuts Fast Origin Transfer).
export const revalidate = 86400;

// Build timestamp — update this when you deploy significant content changes.
const BUILD_DATE = '2026-08-14';

export default function sitemap(): MetadataRoute.Sitemap {
  // Each route is listed in both languages. /en/* URLs are served by the
  // middleware rewrite (same page, English rendering) and are intentionally
  // canonicalized to the original /path (see generateMetadata).
  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/en', priority: 0.9 },
    { path: '/upload', priority: 0.7 },
    { path: '/en/upload', priority: 0.7 },
    { path: '/delete/confirm', priority: 0.7 },
    { path: '/en/delete/confirm', priority: 0.7 },
    { path: '/blog', priority: 0.8 },
    { path: '/en/blog', priority: 0.8 },
    { path: '/pricing', priority: 0.6 },
    { path: '/en/pricing', priority: 0.6 },
    { path: '/terms', priority: 0.3 },
    { path: '/en/terms', priority: 0.3 },
    { path: '/report', priority: 0.4 },
    { path: '/en/report', priority: 0.4 },
  ];

  const staticPages = staticRoutes.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(BUILD_DATE),
    changeFrequency: path === '' ? 'weekly' as const : 'monthly' as const,
    priority,
  }));

  const blogPages = allPosts.flatMap((post) => [
    {
      url: `${SITE_URL}${post.canonical}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/en${post.canonical}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]);

  return [...staticPages, ...blogPages];
}
