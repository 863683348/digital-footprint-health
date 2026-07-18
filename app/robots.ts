import type { MetadataRoute } from 'next';

const SITE_URL = 'https://dfh-fgbk5c1y2-863683348s-projects.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/delete/progress', '/report/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
