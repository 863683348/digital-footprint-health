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

      <section className="space-y-4 border-t border-line pt-6">
        <h2 className="t-4 font-semibold">Why run a digital-footprint checkup</h2>
        <p className="t-5 text-ink-soft">
          Years of tweets can unintentionally reveal your phone number, home address, daily locations, real name, and even political or religious leanings. Once indexed by search engines or browsed by strangers, that trail can lead to spam, scams, or unwanted exposure. Digital Footprint Health finds these hidden landmines in one pass.
        </p>
        <p className="t-5 text-ink-soft">
          Everything runs locally in your browser: your archive is never uploaded to any server, and the report stays on your own device. You can review risky tweets one by one or batch-delete them after confirmation — you stay in control the whole time.
        </p>
        <h2 className="t-4 font-semibold pt-2">Who it is for</h2>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li>Anyone rebranding or cleaning up their personal history on X</li>
          <li>Privacy-conscious users worried about doxxing or phishing</li>
          <li>Accounts that need to batch-delete old tweets and reduce digital risk</li>
        </ul>
      </section>

      <section className="space-y-4 border-t border-line pt-6">
        <h2 className="t-4 font-semibold">How to download your X data archive</h2>
        <p className="t-5 text-ink-soft">
          The first step to a footprint checkup is downloading your history from X. It is an
          official, free X feature — no third-party access is ever required:
        </p>
        <ol className="list-decimal list-inside space-y-1.5 t-5 text-ink-soft">
          <li>Sign in to X, then go to Settings and privacy → Your account → Download an archive of your data.</li>
          <li>Click Request archive. X packages your full history and emails you a download link — usually within minutes to a few hours.</li>
          <li>Open the email link and download the ZIP. Unzip it and find <code className="mono">data/tweets.js</code> or <code className="mono">tweets.csv</code>.</li>
          <li>Drop the file into the upload area of this tool. It is parsed entirely in your browser — the file is never uploaded to any server.</li>
        </ol>
        <p className="t-5 text-ink-soft">
          Everything runs on your device: the archive never leaves your browser, the report is
          saved only on your machine, and the scan works without any network round-trips.
        </p>
      </section>

      <section className="space-y-4 border-t border-line pt-6">
        <h2 className="t-4 font-semibold">Real scenarios: what a footprint checkup solves</h2>
        <div className="space-y-3 t-5 text-ink-soft">
          <p>
            <strong>Scenario 1 · Rebranding.</strong> Before switching careers, a freelancer
            scanned their account and found 300+ old tweets that badmouthed a former employer and
            exposed their real name. After batch deletion they started fresh with confidence — no
            more "digging up dirt" by new clients.
          </p>
          <p>
            <strong>Scenario 2 · Doxxing defense.</strong> A regular user discovered tweets that
            hinted at home-area landmarks, their usual gym, and their kids' school. Removing those
            posts — and adjusting how they post — significantly cut their real-world exposure.
          </p>
          <p>
            <strong>Scenario 3 · Before deactivating.</strong> Someone closing their X account
            exported and checked their history first, confirmed no identifying information
            remained, then deactivated — so their "digital ghost" was not left behind.
          </p>
        </div>
      </section>

      <section className="space-y-3 border-t border-line pt-6">
        <h2 className="t-4 font-semibold">Frequently asked questions</h2>
        <dl className="space-y-3 t-5 text-ink-soft">
          <div>
            <dt className="font-semibold text-ink">Will the report leak my tweets?</dt>
            <dd className="mt-1">No. All parsing and scanning happens locally in your browser. Your archive is never uploaded to a server, and the report stays on your own device.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Is English supported?</dt>
            <dd className="mt-1">Yes — the interface and report are available in both English and Chinese, and you can switch at any time. The language of your tweets does not affect the scan.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Is bulk deletion safe? Could it delete the wrong tweets?</dt>
            <dd className="mt-1">You review risky tweets one by one before anything is deleted. Only tweets you explicitly select and confirm are removed, through X's official API — transparent and under your control at every step.</dd>
          </div>
          <div>
            <dt className="font-semibold text-ink">Is it free? Is there a limit?</dt>
            <dd className="mt-1">The basic checkup is free and repeatable. Advanced features (larger archives, more deletion quota) are available on the pricing page.</dd>
          </div>
        </dl>
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
