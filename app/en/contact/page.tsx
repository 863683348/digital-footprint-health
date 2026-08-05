import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Contact Us | Digital Footprint Health Report',
  description:
    'Need help, want to exercise your privacy rights, or discuss partnership? Contact the Digital Footprint Health team.',
  alternates: {
    canonical: '/en/contact',
    languages: { en: '/en/contact', zh: '/contact' },
  },
  openGraph: {
    title: 'Contact Us | Digital Footprint Health Report',
    description: 'Need help, privacy requests, or partnership? Reach out to us.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <Breadcrumb items={[{ labelKey: 'nav.contact', href: '/contact' }]} />
      <h1 className="t-2 font-bold">Contact Us</h1>
      <p className="t-6 text-ink-soft">We usually reply within 2 business days.</p>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">1. Support & account issues</h2>
        <p className="t-5 text-ink-soft">
          If you run into problems with uploading, parsing, or deletion, email us at:
        </p>
        <p className="t-5 text-ink-soft">Email: support@digital-footprint-health.shop</p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">2. Privacy & data rights</h2>
        <p className="t-5 text-ink-soft">
          To exercise your right to access, correct, or delete your personal data, or for privacy-policy questions, contact:
        </p>
        <p className="t-5 text-ink-soft">Email: privacy@digital-footprint-health.shop</p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">3. Business & partnership</h2>
        <p className="t-5 text-ink-soft">
          For media, partnership, or business inquiries, reach us at:
        </p>
        <p className="t-5 text-ink-soft">Email: business@digital-footprint-health.shop</p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">4. Response time</h2>
        <p className="t-5 text-ink-soft">
          We aim to reply to all messages within 2 business days. For urgent deletion failures, put "URGENT" in the subject line and we will prioritize it.
        </p>
      </section>
    </div>
  );
}
