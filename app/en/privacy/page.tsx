import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy | Digital Footprint Health Report',
  description:
    'How Digital Footprint Health handles your data. Your archive is processed locally on your device and never uploaded to any server.',
  alternates: {
    canonical: '/en/privacy',
    languages: { en: '/en/privacy', zh: '/privacy' },
  },
  openGraph: {
    title: 'Privacy Policy | Digital Footprint Health Report',
    description: 'How we handle your data — processed locally, never uploaded to a server.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <Breadcrumb items={[{ labelKey: 'nav.privacy', href: '/privacy' }]} />
      <h1 className="t-2 font-bold">Privacy Policy</h1>
      <p className="t-6 text-ink-soft">Last updated: July 27, 2026</p>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">1. Who we are</h2>
        <p className="t-5 text-ink-soft">
          Digital Footprint Health Report is a privacy-protection tool that helps users analyze and
          clean up the personal data they have left on X (formerly Twitter). We believe privacy is a
          fundamental right, so we put the security of your data first at every step of the product
          design.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">2. What data we collect</h2>
        <p className="t-5 text-ink-soft">
          <strong>We collect as little data as possible — this is our core design principle.</strong>
        </p>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li>
            <strong>Your X archive:</strong> The archive file you upload (tweets.csv / tweets.js) is
            parsed entirely in your browser&apos;s local memory. Its contents are never sent to our
            servers or any third-party server.
          </li>
          <li>
            <strong>Required account info:</strong> When you perform a deletion, we obtain the
            necessary deletion permission through X&apos;s OAuth flow. We request only the minimum
            permission needed to delete tweets — we never read your direct messages, follow list, or
            other private data.
          </li>
          <li>
            <strong>Payment info:</strong> Tweet deletion is a paid service; we use Waffo to process
            payments. We never store your credit card information.
          </li>
          <li>
            <strong>Website analytics:</strong> We use Google Analytics 4 to collect anonymous
            website-usage data (page views, feature usage, etc.) to help us improve the product.
            This data cannot be used to identify you personally.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">3. How your data is processed</h2>
        <ol className="list-decimal list-inside space-y-2 t-5 text-ink-soft">
          <li>
            <strong>Upload &amp; parsing:</strong> The archive you downloaded from X is uploaded via
            the browser. All parsing (detecting phone numbers, emails, addresses, sensitive topics,
            etc.) happens locally on your device.
          </li>
          <li>
            <strong>Storage:</strong> Parsed data is stored encrypted in your browser&apos;s local
            storage. The decryption key exists only on your device.
          </li>
          <li>
            <strong>Deletion:</strong> Only after you confirm and pay the deletion fee do we execute
            the deletion through X&apos;s official write API. Every deletion operation is explicitly
            recorded in the request.
          </li>
          <li>
            <strong>Privacy policy:</strong> Throughout the process, your archive contents and tweet
            data never leave your device. We keep no database and store none of your tweet content.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">4. Data retention</h2>
        <p className="t-5 text-ink-soft">
          Parsed archive data is retained in your browser&apos;s local storage. If you clear your
          browser data (cache, local storage), or after a long period without visiting the site, the
          data is deleted automatically. We recommend manually clearing your browser&apos;s local
          storage after you finish deleting.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">5. Third-party services</h2>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li>
            <strong>X (Twitter) API:</strong> Used only to execute tweet deletions, bound by X&apos;s{' '}
            <a href="https://x.com/en/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Waffo:</strong> Used to process payments, bound by Waffo&apos;s{' '}
            <a href="https://www.waffo.ai" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              privacy policy
            </a>
            .
          </li>
          <li>
            <strong>Google Analytics:</strong> Used for website analytics, bound by Google&apos;s{' '}
            <a href="https://policies.google.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Vercel:</strong> The site is hosted on Vercel, bound by Vercel&apos;s{' '}
            <a href="https://vercel.com/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">6. Your rights</h2>
        <p className="t-5 text-ink-soft">
          Under applicable privacy laws (such as GDPR and CCPA), you have the following rights:
        </p>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li>To know what data we hold about you</li>
          <li>To request deletion of your data</li>
          <li>To restrict or object to data processing</li>
          <li>To data portability</li>
        </ul>
        <p className="t-5 text-ink-soft">
          Because our design principle is to collect as little data as possible, you may find we hold
          little (or zero) personal information about you in the first place. To exercise any of the
          above rights, please contact us using the details below.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">7. Contact us</h2>
        <p className="t-5 text-ink-soft">
          If you have any questions about this privacy policy, or wish to exercise your privacy
          rights, please contact us via:
        </p>
        <p className="t-5 text-ink-soft">Email: privacy@digital-footprint-health.shop</p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">8. Policy updates</h2>
        <p className="t-5 text-ink-soft">
          We may update this privacy policy from time to time. For significant changes, we will
          notify you via an on-site notice or email (if registered). We recommend reviewing this page
          periodically for the latest information.
        </p>
      </section>
    </div>
  );
}
