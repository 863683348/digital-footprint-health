import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AdUnit } from '@/components/AdUnit';

// Replace with the real AdSense slot id from your dashboard once approved.
const FAQ_AD_SLOT = '6642233840';

export const metadata: Metadata = {
  title: 'FAQ | Digital Footprint Health Report',
  description:
    'Frequently asked questions about the digital footprint checkup, X/Twitter privacy checks, and bulk tweet deletion.',
  alternates: {
    canonical: '/en/faq',
    languages: { en: '/en/faq', zh: '/faq' },
  },
  openGraph: {
    title: 'FAQ | Digital Footprint Health Report',
    description: 'FAQ about X/Twitter privacy checks and bulk tweet deletion.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
};

const faqs = [
  {
    q: 'What is the Digital Footprint Health Report?',
    a: 'The Digital Footprint Health Report is a privacy-protection tool. After you upload the archive you downloaded from X, it automatically detects sensitive information in your tweets — phone numbers, emails, addresses, locations, and more — and produces a privacy health score plus a risk list. It also supports one-click bulk deletion of risky tweets. All parsing happens locally on your device; no data is uploaded to any server.',
  },
  {
    q: 'Is my data safe? Will it be uploaded to a server?',
    a: 'Very safe. We use a "pure local processing" architecture — the archive you upload in your browser is parsed directly on your machine and is never sent to our servers or any third-party server. Only when you confirm a deletion do we send a deletion request through X’s official API. See our privacy policy for full details.',
  },
  {
    q: 'Is it paid? How much does it cost?',
    a: 'Uploading your archive and generating the health report is free. If you want to bulk-delete tweets, you are charged per tweet. The deletion fee is tiered by tweet count: Small (≤1,000), Medium (1,001–10,000), and Large (>10,000). Jobs can be paused, resumed, or cancelled anytime; deletions not yet started are fully refundable, and in-progress ones are prorated by the number already deleted.',
  },
  {
    q: 'Can it delete all my old tweets on X?',
    a: 'Yes. By uploading your full X data archive (which includes every tweet since you registered), we can read tweets the normal X API cannot reach (the part beyond the 3,200-tweet limit). Combined with our bulk-deletion feature, you can delete tweets from any time range.',
  },
  {
    q: 'How do I download my X archive?',
    a: 'Log in to X (formerly Twitter), go to Settings → Your data → Download an archive of your data. X will send a verification code to your email; after confirming, archive preparation begins. It usually takes about 24 hours, after which you’ll get a notification and a download link. The download is a ZIP file.',
  },
  {
    q: 'Which file formats are supported?',
    a: 'Currently we support tweets.csv and tweets.js downloaded from X. The ZIP file needs to be unzipped before uploading the corresponding file.',
  },
  {
    q: 'Can deleted tweets be recovered?',
    a: 'No. Once a tweet is deleted through X’s official API, it is permanent. We recommend backing up your X data archive before bulk deletion. The deletion process also shows a progress bar, and you can pause or cancel at any time.',
  },
  {
    q: 'Will X ban my account for bulk deletion?',
    a: 'Normal bulk deletion will not get you banned. Our deletion flow automatically controls the rate, respects X’s API limits, and mimics normal user operation frequency, so it won’t trigger risk-control mechanisms.',
  },
  {
    q: 'Can I delete only specific types of tweets?',
    a: 'Yes. The system automatically detects tweets containing phone numbers, emails, addresses, locations, or sensitive topics, and groups them in the risk list. You can filter by risk type and choose to delete only specific categories.',
  },
  {
    q: 'Which languages does the product support?',
    a: 'Currently we support Simplified Chinese and English. The site switches automatically based on your browser language, and you can also switch manually in the top-right corner of the page.',
  },
  {
    q: 'What if I have other questions or run into a problem?',
    a: 'You can reach us through the contact email at the bottom of the site, or send us a direct message on X (formerly Twitter). We’ll reply as soon as we can.',
  },
  {
    q: 'What is the relationship between this tool and X?',
    a: 'Digital Footprint Health is an independent third-party tool and is not affiliated with X (Twitter) in any way. We use X’s official public API to perform user-authorized deletion operations.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: a,
    },
  })),
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-[720px] mx-auto space-y-6">
        <Breadcrumb items={[{ labelKey: 'nav.faq', href: '/faq' }]} />
        <h1 className="t-2 font-bold">Frequently Asked Questions</h1>
        <p className="t-5 text-ink-soft">
          Common questions about the Digital Footprint Health Report, privacy checks, and tweet
          deletion.
        </p>

        <div className="space-y-4">
          {faqs.map(({ q, a }, i) => (
            <details
              key={i}
              className="group rounded-xl2 border border-line bg-surface overflow-hidden"
            >
              <summary className="t-4 font-semibold px-5 py-4 cursor-pointer hover:bg-canvas transition-calm list-none flex items-center justify-between">
                <span>{q}</span>
                <span className="text-ink-soft group-open:rotate-180 transition-transform">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-4 t-5 text-ink-soft leading-relaxed">
                {a}
              </div>
            </details>
          ))}
        </div>

        <AdUnit slot={FAQ_AD_SLOT} minHeight="120px" />
      </div>
    </>
  );
}
