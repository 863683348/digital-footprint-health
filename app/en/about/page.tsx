import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AdUnit } from '@/components/AdUnit';

// Replace with the real AdSense slot id from your dashboard once approved.
const ABOUT_AD_SLOT = '6642233840';

export const metadata: Metadata = {
  title: 'About Us | Digital Footprint Health Report',
  description:
    'Meet the Digital Footprint Health team and our mission — helping you manage your digital footprint safely and easily.',
  alternates: {
    canonical: '/en/about',
    languages: { en: '/en/about', zh: '/about' },
  },
  openGraph: {
    title: 'About Us | Digital Footprint Health Report',
    description: 'Meet the Digital Footprint Health team and our mission.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-[720px] mx-auto space-y-8">
      <Breadcrumb items={[{ labelKey: 'nav.about', href: '/about' }]} />
      <h1 className="t-2 font-bold">About Us</h1>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">Our mission</h2>
        <p className="t-5 text-ink-soft leading-relaxed">
          The mission of Digital Footprint Health is simple: let anyone manage the digital footprint
          they have left on social media — safely and easily.
        </p>
        <p className="t-5 text-ink-soft leading-relaxed">
          Over time, our social-media accounts accumulate a huge amount of content — much of which
          may contain personal information, private data, or outdated opinions we have long
          forgotten.
        </p>
        <p className="t-5 text-ink-soft leading-relaxed">
          But most tools either require you to upload your data to a third-party server (leaking
          risk) or are too complicated for ordinary people to use.
        </p>
        <p className="t-5 text-ink-soft leading-relaxed">
          So we built this tool: pure local parsing, no data uploaded to any server, simple and
          intuitive — anyone can complete a full digital-footprint checkup in minutes.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">Our principles</h2>
        <ul className="space-y-3 t-5 text-ink-soft">
          <li>
            <strong className="text-ink">Privacy first:</strong> Your data belongs to you. All
            parsing happens locally and never touches a server. We do not store, analyze, or sell any
            of your data.
          </li>
          <li>
            <strong className="text-ink">Transparent &amp; trustworthy:</strong> Deletions are priced
            transparently per tweet, and can be paused, resumed, or cancelled at any time. Deletions
            not yet started are fully refundable.
          </li>
          <li>
            <strong className="text-ink">Simple &amp; easy:</strong> Three steps — upload archive,
            generate report, delete on demand. No technical background required.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">Why choose us</h2>
        <p className="t-5 text-ink-soft leading-relaxed">
          Most tweet-deletion tools require authorization to access your X account, upload your data
          to a cloud server, or can only delete your most recent 3,200 tweets.
        </p>
        <p className="t-5 text-ink-soft leading-relaxed">
          Here is what makes Digital Footprint Health different:
        </p>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li>Pure in-browser local parsing — data never uploaded to any server</li>
          <li>Supports your full X data archive, breaking the 3,200-tweet limit</li>
          <li>Automatically detects privacy risks like phone numbers, emails, and addresses</li>
          <li>Generates a visualized privacy health score</li>
          <li>Delete on demand, priced per tweet, pausable at any time</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">Tech stack</h2>
        <p className="t-5 text-ink-soft leading-relaxed">
          The site is built on Next.js and deployed on the Vercel Edge Network. Data parsing uses
          native Web APIs and runs entirely on the front end; deletions are executed through
          X&apos;s official API v2. Payments are processed by Waffo.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">Contact us</h2>
        <p className="t-5 text-ink-soft leading-relaxed">
          If you have any questions, suggestions, or feedback, we&apos;d love to hear from you:
        </p>
        <ul className="space-y-2 t-5 text-ink-soft">
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:hello@digital-footprint-health.shop" className="text-primary hover:underline">
              hello@digital-footprint-health.shop
            </a>
          </li>
          <li>
            <strong>Privacy:</strong>{' '}
            <a href="mailto:privacy@digital-footprint-health.shop" className="text-primary hover:underline">
              privacy@digital-footprint-health.shop
            </a>
          </li>
        </ul>
      </section>

      <section className="space-y-4 rounded-xl2 border border-line bg-surface p-5">
        <p className="t-5 text-ink-soft leading-relaxed">
          Digital Footprint Health is an independent project and is not affiliated with X
          (Twitter) in any way.
        </p>
        <p className="t-6 text-ink-soft">Last updated: July 2026</p>
      </section>

      <AdUnit slot={ABOUT_AD_SLOT} minHeight="120px" />
    </div>
  );
}
