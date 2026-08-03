'use client';

import { useI18n } from '@/components/I18nProvider';
import { LangLink } from '@/components/LangLink';

interface Crumb {
  /** i18n key (preferred). Resolved via useI18n() on the client. */
  labelKey?: string;
  /** Hardcoded fallback. Used for dynamic labels (e.g. blog post title) or if labelKey is missing. */
  label?: string;
  href: string;
}

/**
 * Visible breadcrumb nav + hidden BreadcrumbList JSON-LD for SEO.
 *
 * Usage:
 *   <Breadcrumb items={[
 *     { labelKey: 'nav.blog', href: '/blog' },
 *     { label: post.title, href: post.canonical },
 *   ]} />
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const { t } = useI18n();
  const resolved = items.map((c) => ({
    href: c.href,
    label: c.labelKey ? t(c.labelKey) : (c.label ?? ''),
  }));
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: resolved.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `https://digital-footprint-health.shop${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label={t('nav.breadcrumb.aria')} className="flex items-center gap-1.5 text-t-7 text-ink-soft mb-4">
        <LangLink href="/" className="hover:text-ink transition-calm">{t('nav.home')}</LangLink>
        {resolved.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="text-line">/</span>
            {i === resolved.length - 1 ? (
              <span className="text-ink">{item.label}</span>
            ) : (
              <LangLink href={item.href} className="hover:text-ink transition-calm">
                {item.label}
              </LangLink>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
