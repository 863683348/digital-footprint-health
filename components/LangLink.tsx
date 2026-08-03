'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { langFromPath, localePath } from '@/lib/locale';

const EXTERNAL = /^(https?:|mailto:|tel:|#)/;

interface LangLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

/**
 * Locale-aware link. Internal links get the correct /en prefix based on the
 * current route; external links (http/#, mailto, tel) render a plain <a>.
 */
export function LangLink({ href, className, children, onClick }: LangLinkProps) {
  const pathname = usePathname();
  const lang = langFromPath(pathname);

  if (EXTERNAL.test(href)) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <Link href={localePath(href, lang)} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
