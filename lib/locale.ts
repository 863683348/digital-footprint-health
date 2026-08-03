// Locale routing helpers — binds language to the URL path.
// /en*  → English, everything else → Chinese.

export const EN_PREFIX = '/en';

export function stripLocale(path: string): string {
  if (path.startsWith(EN_PREFIX)) {
    const rest = path.slice(EN_PREFIX.length);
    return rest || '/';
  }
  return path;
}

export function langFromPath(path: string): 'zh' | 'en' {
  return path.startsWith(EN_PREFIX) ? 'en' : 'zh';
}

// Resolve an href to the correct locale-prefixed path.
// External links (http:, mailto:, tel:, #) are returned unchanged.
export function localePath(href: string, lang: 'zh' | 'en'): string {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  const clean = href.startsWith('/') ? href : `/${href}`;
  if (lang === 'en') {
    return clean.startsWith(EN_PREFIX) ? clean : `${EN_PREFIX}${clean}`;
  }
  return clean.startsWith(EN_PREFIX) ? clean.slice(EN_PREFIX.length) || '/' : clean;
}
