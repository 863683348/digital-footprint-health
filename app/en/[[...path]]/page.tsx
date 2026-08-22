import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// /en/report/:id has unbounded ids (per-user reports held in the browser), so
// unknown paths must render on demand instead of 404ing. generateStaticParams
// still pre-renders the known marketing/blog routes at build time.
export const dynamicParams = true;
import AboutPage from '@/app/about/page';
import BlogPage from '@/app/blog/page';
import ContactPage from '@/app/contact/page';
import FaqPage from '@/app/faq/page';
import PricingPage from '@/app/pricing/page';
import PrivacyPage from '@/app/privacy/page';
import TermsPage from '@/app/terms/page';
import AccountPage from '@/app/account/page';
import UploadPage from '@/app/upload/page';
import DeleteConfirmPage from '@/app/delete/confirm/page';
import DeleteProgressPage from '@/app/delete/progress/page';
import ReportPage from '@/app/report/[id]/page';
import BlogPostPage from '@/app/blog/[slug]/page';
import HomePage from '@/app/page';
import { allPosts } from '@/content/posts';
import type { Lang } from '@/lib/i18n';

interface EnPathParams {
  params: Promise<{ path?: string[] }>;
}

// Static English pages — the /en route renders the same component with
// lang="en" so the SSR HTML is correct English with zero server-side APIs.
const STATIC_MAP: Record<string, React.ComponentType<{ lang?: Lang }>> = {
  about: AboutPage,
  blog: BlogPage,
  contact: ContactPage,
  faq: FaqPage,
  pricing: PricingPage,
  privacy: PrivacyPage,
  terms: TermsPage,
  upload: UploadPage,
  'delete/confirm': DeleteConfirmPage,
  'delete/progress': DeleteProgressPage,
};

const ROUTE_TITLES: Record<string, string> = {
  '': 'Digital Footprint Health Check: Find & Clean Risky X/Twitter Tweets',
  about: 'About | Digital Footprint Health',
  blog: 'Blog | Digital Footprint Health',
  contact: 'Contact | Digital Footprint Health',
  faq: 'FAQ | Digital Footprint Health',
  pricing: 'Pricing | Digital Footprint Health',
  privacy: 'Privacy Policy | Digital Footprint Health',
  terms: 'Terms of Service | Digital Footprint Health',
  upload: 'Upload Your X Archive | Digital Footprint Health',
  'delete/confirm': 'Confirm Deletion | Digital Footprint Health',
  'delete/progress': 'Deletion Progress | Digital Footprint Health',
};

/**
 * English routes are real URL segments (/en/...) rendered here — no middleware
 * rewrite, so usePathname() returns the public path even during SSR and the
 * client I18nProvider renders correct English in the first HTML. The root
 * layout is fully static; these pages are pre-rendered at build time
 * (generateStaticParams below) and served from Vercel's CDN, which eliminates
 * the per-visit origin FOT that the old headers()-based i18n caused.
 *
 * Dynamic leftovers (intentional, low-traffic): /en/account (session cookie)
 * and /en/report/:id (per-user report id) render on demand.
 */
export function generateStaticParams() {
  return [
    { path: [] },
    { path: ['about'] },
    { path: ['blog'] },
    { path: ['contact'] },
    { path: ['faq'] },
    { path: ['pricing'] },
    { path: ['privacy'] },
    { path: ['terms'] },
    { path: ['upload'] },
    { path: ['delete', 'confirm'] },
    { path: ['delete', 'progress'] },
    ...allPosts.map((p) => ({ path: ['blog', p.slug] })),
  ];
}

export async function generateMetadata({ params }: EnPathParams): Promise<Metadata> {
  const { path = [] } = await params;
  const route = path.join('/');
  const title = ROUTE_TITLES[route] ?? 'Digital Footprint Health';
  return {
    title,
    description:
      'Free on-device digital footprint check for X/Twitter. Upload your archive, get a 0-100 privacy health score, and find risky tweets — then delete them in batches.',
    alternates: { canonical: route === '' ? '/' : `/${route}` },
  };
}

export default async function EnCatchAll({ params }: EnPathParams) {
  const { path = [] } = await params;
  const route = path.join('/');

  if (route === '') return <HomePage />;

  if (route.startsWith('report/')) {
    // ReportPage is a client component that reads useParams() — the real
    // /en/report/:id segment resolves automatically. No props needed.
    return <ReportPage />;
  }

  if (route.startsWith('blog/')) {
    const slug = route.slice('blog/'.length);
    return <BlogPostPage params={Promise.resolve({ slug })} />;
  }

  if (route === 'account') return <AccountPage lang="en" />;

  const Page = STATIC_MAP[route];
  if (Page) return <Page lang="en" />;

  notFound();
}
