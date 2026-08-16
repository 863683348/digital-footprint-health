import './globals.css';
import type { Metadata, Viewport } from 'next';
import { headers } from 'next/headers';
import Script from 'next/script';
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';
import { I18nProvider } from '@/components/I18nProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SITE_URL } from '@/lib/site';
import type { Lang } from '@/lib/i18n';

// Resolve the active language from the request. middleware.ts rewrites /en →
// / and forwards x-locale: en; the root layout reads it to set <html lang> and
// to seed I18nProvider. Without this the /en homepage would SSR Chinese — after
// a rewrite, usePathname() returns the internal target path ("/") during server
// rendering, not the public "/en" URL.
async function resolveLocale(): Promise<Lang> {
  const h = await headers();
  return h.get('x-locale') === 'en' ? 'en' : 'zh';
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'Digital Footprint Health Check: Find & Clean Risky X/Twitter Tweets',
    template: '%s | Digital Footprint Health',
  },
  description:
    'Free on-device digital footprint check for X/Twitter. Upload your archive, get a 0-100 privacy health score, and find risky tweets with phone numbers, addresses & locations — then delete them in batches.',
  keywords: [
    'digital footprint check',
    'delete old tweets',
    'X archive',
    'Twitter privacy',
    'remove personal info from tweets',
    'clean digital footprint',
    'online reputation cleanup',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'Digital Footprint Health',
    title: 'Digital Footprint Health Check: Find & Clean Risky X/Twitter Tweets',
    description:
      'Free on-device check that scores your X/Twitter footprint 0-100 and flags tweets with phone numbers, addresses & locations — then batch-delete the risky ones.',
    locale: 'en_US',
    alternateLocale: ['zh_CN'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Footprint Health Check: Find & Clean Risky Tweets',
    description:
      'Free on-device check that scores your X/Twitter footprint 0-100 and flags risky tweets — then batch-delete them.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Set the theme class before paint to avoid a flash of the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('dfh.theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await resolveLocale();
  return (
    <html lang={locale === 'en' ? 'en' : 'zh-CN'}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5NWEFJTMBZ"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-5NWEFJTMBZ');`}
        </Script>
      </head>
      <body>
        <ThemeProvider>
          <I18nProvider initialLang={locale}>
            <NavBar />
            <main className="min-h-[70vh] max-w-[1040px] mx-auto px-4 py-6 sm:py-8">{children}</main>
            <Footer />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};
