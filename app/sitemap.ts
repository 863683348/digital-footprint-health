import type { MetadataRoute } from 'next';

const SITE_URL = 'https://dfh-fgbk5c1y2-863683348s-projects.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ['', '/upload', '/delete/confirm'];
  return routes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));
}
