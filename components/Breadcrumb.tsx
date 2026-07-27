'use client';

import Link from 'next/link';

interface Crumb {
  label: string;
  href: string;
}

/**
 * Visible breadcrumb nav + hidden BreadcrumbList JSON-LD for SEO.
 *
 * Usage:
 *   <Breadcrumb items={[
 *     { label: '博客', href: '/blog' },
 *     { label: post.title, href: post.canonical },
 *   ]} />
 */
export function Breadcrumb({ items }: { items: Crumb[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
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
      <nav aria-label="面包屑导航" className="flex items-center gap-1.5 text-t-7 text-ink-soft mb-4">
        <Link href="/" className="hover:text-ink transition-calm">首页</Link>
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="text-line">/</span>
            {i === items.length - 1 ? (
              <span className="text-ink">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-ink transition-calm">
                {item.label}
              </Link>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
