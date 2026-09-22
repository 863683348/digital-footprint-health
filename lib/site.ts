// Single source of truth for the production site URL.
// Used by metadata, sitemap, robots, and JSON-LD so the domain never drifts.
export const SITE_URL = 'https://digital-footprint-health.shop';

// post.canonical is normally a relative path (e.g. /blog/some-slug). A handful
// of auto-appended posts stored a full absolute URL there instead. Sitemap,
// canonical <link> and JSON-LD @id all build URLs by prefixing SITE_URL, so an
// absolute value produced malformed output such as
//   https://digital-footprint-health.shophttps://digital-footprint-health.shop/blog/x
//   /enhttps://digital-footprint-health.shop/blog/x
// Normalise on read so those posts resolve correctly and the bug cannot recur.
export function relPath(canonical: string): string {
  if (!canonical) return '/';
  if (/^https?:\/\//i.test(canonical)) {
    try {
      return new URL(canonical).pathname;
    } catch {
      return canonical;
    }
  }
  return canonical.startsWith('/') ? canonical : `/${canonical}`;
}

/** Absolute URL for a post canonical path — the helper every caller should use. */
export function absUrl(canonical: string): string {
  return `${SITE_URL}${relPath(canonical)}`;
}
