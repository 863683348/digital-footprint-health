import type { Metadata } from 'next';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms of Service | Digital Footprint Health Report',
  description:
    'Digital Footprint Health Terms of Service: conditions of use, paid-deletion rules, and limitations of liability.',
  alternates: {
    canonical: '/en/terms',
    languages: { en: '/en/terms', zh: '/terms' },
  },
  openGraph: {
    title: 'Terms of Service | Digital Footprint Health Report',
    description: 'Conditions of use, paid-deletion rules, and limitations of liability.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      <Breadcrumb items={[{ labelKey: 'nav.terms', href: '/terms' }]} />
      <h1 className="t-2 font-bold">Terms of Service</h1>
      <p className="t-6 text-ink-soft">Last updated: July 27, 2026</p>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">1. Acceptance of terms</h2>
        <p className="t-5 text-ink-soft">
          By accessing or using Digital Footprint Health (the "Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">2. Description of the Service</h2>
        <p className="t-5 text-ink-soft">
          The Service is a privacy-protection tool that helps you analyze and clean up the personal data you have left on X (formerly Twitter). The X archive you upload is parsed entirely in your browser; we never upload it to any server.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">3. Paid deletion</h2>
        <p className="t-5 text-ink-soft">
          Tweet deletion is a paid feature processed through Waffo. Deletions are executed through X's official write API only after you explicitly confirm and pay. Fees are generally non-refundable because deletion requests are submitted to X immediately.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">4. User responsibilities</h2>
        <ul className="list-disc list-inside space-y-1.5 t-5 text-ink-soft">
          <li>You are responsible for your X account and the actions you take in the Service.</li>
          <li>You may not use the Service for any unlawful, abusive, or X-policy-violating activity.</li>
          <li>You confirm you have the right to process your X data and understand that deletions are irreversible.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">5. Disclaimers</h2>
        <p className="t-5 text-ink-soft">
          The Service is provided "as is" without warranties of any kind, express or implied. Changes, rate limits, or policy adjustments on X's side may affect deletion results, and we are not liable for failures caused by such external factors.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">6. Limitation of liability</h2>
        <p className="t-5 text-ink-soft">
          To the maximum extent permitted by law, the Service operator is not liable for any indirect, incidental, or consequential damages arising from use or inability to use the Service. Our total liability is limited to the fees you paid for the Service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">7. Intellectual property</h2>
        <p className="t-5 text-ink-soft">
          The Service's interface, copy, code, and related content are owned by the operator and protected by copyright law. You may not copy, modify, or redistribute any part of the Service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="t-4 font-semibold">8. Changes to these terms</h2>
        <p className="t-5 text-ink-soft">
          We may update these Terms from time to time. Significant changes will be announced via an on-site notice or email (if registered). Continued use after an update constitutes acceptance of the revised Terms.
        </p>
      </section>
    </div>
  );
}
