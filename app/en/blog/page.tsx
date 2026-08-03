import type { Metadata } from 'next';
import Link from 'next/link';
import { allPosts } from '@/content/posts';
import { SITE_URL } from '@/lib/site';
import { Breadcrumb } from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Blog | Digital Footprint & Privacy Guide — Digital Footprint Health Report',
  description:
    'Best practices for digital-footprint management, social-media privacy protection, and X/Twitter account cleanup.',
  alternates: {
    canonical: '/en/blog',
    languages: { en: '/en/blog', zh: '/blog' },
  },
  openGraph: {
    title: 'Blog | Digital Footprint & Privacy Guide',
    description:
      'Best practices for digital-footprint management, social-media privacy protection, and X/Twitter account cleanup.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
};

export default function BlogIndex() {
  return (
    <div className="space-y-8">
      <Breadcrumb items={[{ labelKey: 'nav.blog', href: '/blog' }]} />
      <h1 className="t-2 font-bold">Blog · Digital Footprint &amp; Privacy Guide</h1>
      <p className="t-5 text-ink-soft max-w-[60ch]">
        From spotting privacy risks to practical social-media cleanup — everything you need to
        manage your digital footprint.
      </p>

      <div className="grid gap-6">
        {allPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/en/blog/${post.slug}`}
            className="block rounded-xl2 border border-line bg-surface p-5 hover:border-primary transition-calm"
          >
            <div className="flex items-center gap-2 text-t-7 text-ink-soft mb-2">
              <span>{post.categoryEn ?? post.category}</span>
              <span>·</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            <h2 className="t-4 font-semibold text-ink mb-2">{post.titleEn ?? post.title}</h2>
            <p className="t-6 text-ink-soft">{post.excerptEn ?? post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {(post.tagsEn ?? post.tags).map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full bg-primary-weak px-3 py-0.5 text-t-7 text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {allPosts.length === 0 && (
        <p className="t-5 text-ink-soft">No articles yet — stay tuned.</p>
      )}
    </div>
  );
}
