import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/site';
import { AdUnit } from '@/components/AdUnit';

// Replace with the real AdSense slot id from your dashboard once approved.
const EN_HOME_AD_SLOT = '6642233840';

export const metadata: Metadata = {
  title: 'Digital Footprint Health Report | Check X/Twitter Privacy & Delete Old Tweets',
  description:
    'Upload your X/Twitter archive and generate a local privacy health report. Auto-detect tweets with phone numbers, addresses, locations — batch delete risky tweets. Your data never leaves your device.',
  alternates: {
    canonical: '/en',
    languages: {
      'zh-CN': '/',
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    url: `${SITE_URL}/en`,
    siteName: 'Digital Footprint Health Report',
    title: 'Digital Footprint Health Report | Check X/Twitter Privacy & Delete Old Tweets',
    description:
      'Upload your X/Twitter archive and generate a local privacy health report. Auto-detect risky tweets and batch delete them. Your data never leaves your device.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Footprint Health Report | Check X/Twitter Privacy',
    description:
      'Generate a local privacy health report for your X/Twitter archive. Detect risky tweets and batch delete them — all on your device.',
    images: ['/opengraph-image.png'],
  },
};

const STEPS = [
  {
    n: '1',
    title: 'Download & upload your archive',
    desc: 'Request your archive under X "Settings → Your data", download it, then upload. It is parsed entirely on your device.',
  },
  {
    n: '2',
    title: 'Generate the health report locally',
    desc: 'Auto-detect tweets with phone numbers, emails, addresses, locations, or sensitive topics, and produce a 0–100 health score with a risk list.',
  },
  {
    n: '3',
    title: 'Clean up old tweets on demand',
    desc: 'After confirming the fee, batch-delete old tweets. Pause, resume, and cancel anytime — pricing stays transparent.',
  },
];

const TRUST_ITEMS = [
  'Reports are generated 100% from your local archive — no X read API is ever called.',
  'Only deletion touches X\'s write API, charged per tweet, pausable and refundable.',
  'Archives are stored encrypted on disk; keys stay only on your device.',
];

export default function EnglishHomePage() {
  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Digital Footprint Health Report',
            url: `${SITE_URL}/en`,
            description:
              'Upload your X/Twitter archive and generate a local privacy health report that flags risky tweets, with on-demand batch deletion.',
            applicationCategory: 'PrivacyApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            inLanguage: 'en',
          }),
        }}
      />

      <section className="pt-6">
        <h1 className="t-1 max-w-[18ch]">See every digital trace you left on X</h1>
        <p className="t-4 text-ink-soft mt-3 max-w-[60ch]">
          Upload the archive you downloaded from X and generate a privacy health report locally —
          flagging tweets that leak phone numbers, addresses, locations, and more, with one-click
          batch deletion. Your data never leaves this device; the report is instant.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href="/en/upload"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl2 px-5 py-2.5 t-5 font-semibold bg-primary text-white hover:brightness-95 transition-calm"
          >
            Start checkup
          </Link>
          <Link
            href="/en/delete/confirm"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl2 px-5 py-2.5 t-5 font-semibold bg-surface text-ink border border-line hover:bg-canvas transition-calm"
          >
            I want to delete tweets
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="rounded-xl2 border border-line bg-surface p-5"
          >
            <div className="h-8 w-8 rounded-full bg-primary-weak text-primary font-bold flex items-center justify-center mono">
              {s.n}
            </div>
            <h2 className="t-4 font-semibold mt-3">{s.title}</h2>
            <p className="t-6 text-ink-soft mt-1.5">{s.desc}</p>
          </div>
        ))}
      </section>

      <section>
        <div className="rounded-xl2 border border-primary-weak bg-primary-weak p-5">
          <h2 className="t-4 font-semibold">Why you can trust it</h2>
          <ul className="mt-2 space-y-1.5 text-t-6 text-ink-soft list-disc list-inside">
            {TRUST_ITEMS.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Internal links for SEO */}
      <section className="border-t border-line pt-6">
        <h2 className="t-4 font-semibold mb-3">Learn more</h2>
        <ul className="space-y-2 t-5">
          <li>
            <Link href="/en/blog/how-to-delete-old-tweets-2026" className="text-primary hover:underline">
              How to Delete Old Tweets — Complete Guide 2026
            </Link>
          </li>
          <li>
            <Link href="/en/faq" className="text-primary hover:underline">
              Frequently Asked Questions
            </Link>
          </li>
          <li>
            <Link href="/en/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="/en/blog" className="text-primary hover:underline">
              Blog — Privacy & Digital Footprint Guides
            </Link>
          </li>
        </ul>
      </section>

      <AdUnit slot={EN_HOME_AD_SLOT} minHeight="120px" />
    </div>
  );
}
